import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPDF: React.FC = () => 
{
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please select a PDF file.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/pdf', {
        method: 'POST',
        headers: {
          'Authorization':`Token ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }

      const data = await response.json();
      const mcq = JSON.parse(data.MCQ);
      
      navigate('/quiz', { state: { mcq, topic: selectedFile.name } });
    } catch (error) {
      console.error('PDF Contains Inappropriate Content:', error);
      alert('PDF Contains Inappropriate Content');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center h-full ">
        {!loading && ( 
      <div className="max-w-sm p-6 bg-gray-100 rounded-lg shadow-md">
        
        <>
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
            <label className="block mb-4">
              <span className="sr-only">Choose profile photo</span>
              <input 
                type="file" 
                accept='.pdf' 
                className="block w-full text-sm text-gray-500
                  file:me-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700
                  file:disabled:opacity-50 file:disabled:pointer-events-none
                "
                onChange={handleFileChange}
              />
            </label>

            <button 
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={handleSubmit}
            >
              Prepare My Quiz
            </button>
          </>
        </div>
        )}

        {loading && ( // Show spinner only if loading state is true
          // <div className="flex justify-center bg-backgroundBlue">
          //   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 bg-backgroundBlue" ></div>
          // </div>
          <div role="status" className="flex flex-col items-center justify-center h-full" >
    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <h2 className="text-xl text-white font-bold mb-4 mt-3">Preparing Quiz</h2>
    <span className="sr-only">Loading...</span>

</div>
        )}
    </div>
  );
};

export default UploadPDF;
