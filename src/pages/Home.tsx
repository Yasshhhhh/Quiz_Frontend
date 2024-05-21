import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => 
{

  const navigate = useNavigate();
  const navigateToTopic = () => {
    navigate('/topic');
  };

  const navigateToPdf = () => {
    navigate('/pdf');
  };

  return (
      <div className="flex items-center justify-center h-full p-4">
      <div className="w-full max-w-md p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Welcome to Quizzy</h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Take Quizzes on any prompt or PDF you want to!
        </p>
        <div className="flex items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 flex-col sm:flex-row">
          <button 
            onClick={navigateToTopic} 
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-700"
          >
            <div className="text-left rtl:text-right">
              <div className="font-sans text-sm font-semibold">Quiz on a Propmt</div>
            </div>
          </button>
          <button 
            onClick={navigateToPdf} 
            className="w-full sm:w-auto bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-700"
          >
            <div className="text-left rtl:text-right">
              <div className="font-sans text-sm font-semibold">Upload Your PDF</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
