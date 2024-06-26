import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Topic: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('easy'); // Default difficulty
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic) {
      setLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:8000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          body: JSON.stringify({ topic, difficulty })
        });

        if (!response.ok) {
          throw new Error('Inappropriate Topic');
        }

        const data = await response.json();
        const mcq = JSON.parse(data.MCQ);
        navigate('/quiz', { state: { mcq, topic } }); // Using useNavigate with state
      } catch (error) {
        console.error('Error fetching quiz:', error);
        alert('Inappropriate Topic');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Please enter a topic');
    }
  };

  return (
    <div className="flex items-center justify-center h-full ">
      {!loading && (
        <div className="max-w-sm p-6 bg-gray-100 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className='text-xl font-semibold mb-4'>Choose a Topic for your MCQ</h2>
            <label className="block mb-4">
              <input
                type="text"
                placeholder='Enter Topic...'
                value={topic}
                onChange={handleChange}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>

            <fieldset className="mb-4">
              <legend className="text-lg font-medium">Select Difficulty</legend>
              <label className="block mt-2">
                <input
                  type="radio"
                  value="easy"
                  checked={difficulty === 'easy'}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <span className="text-green-600">Easy</span>
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  value="medium"
                  checked={difficulty === 'medium'}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <span className="text-yellow-600">Medium</span>
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  value="hard"
                  checked={difficulty === 'hard'}
                  onChange={handleDifficultyChange}
                  className="mr-2"
                />
                <span className="text-red-600">Hard</span>
              </label>
            </fieldset>

            <button type="submit" className='w-full sm:w-auto bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-700'
            >Submit</button>
          </form>
        </div>
      )}

      {loading && (
        <div role="status" className="flex flex-col items-center justify-center h-full">
          <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <h2 className="text-xl text-white font-bold mb-4 mt-3">Preparing Quiz</h2>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Topic;
