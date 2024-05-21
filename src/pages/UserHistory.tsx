import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryItem {
    marks: number;
    topic: string;
    quiz_string: string; // This won't be displayed
}

const UserHistory: React.FC = () => {
    const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleRetry = (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => 
  {
    const quiz=history[index]
    const mcq=JSON.parse(quiz.quiz_string)
    const topic=quiz.topic
    navigate('/quiz', { state: { mcq, topic } });

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setHistory(data.data); 
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to fetch quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="italic text-white text-[40px] font-extralight leading-none sm:text-[64px]">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="italic text-white text-[40px] font-extralight leading-none sm:text-[64px]">Error</h2>
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-500 p-4 min-h-screen">
      <h2 className="italic text-white text-[40px] font-extralight leading-none sm:text-[64px] mb-8">User History</h2>
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-lg bg-white">
              <p className="text-lg font-semibold mb-2">Topic: {item.topic}</p>
              <p className="text-gray-700 mb-4">Marks: {item.marks}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={handleRetry(index)}>
                Retry Test
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No history available</p>
      )}
    </div>
  );
};

export default UserHistory;
