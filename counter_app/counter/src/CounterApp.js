import React, { useState } from 'react';

function CounterApp() {
  const [count, setCount] = useState(0);
  const maxLimit = 100;

  const increaseCount = () => {
    if (count < maxLimit) {
      setCount(count + 1);
    } else {
      alert("You've reached the limit!");
    }
  }

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="bg-white text-black p-10 rounded-3xl shadow-2xl w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-4">Simple Counter App</h1>
        <h2 className="text-7xl font-extrabold text-center mb-6">{count}</h2>

        <div className="flex gap-6 justify-center">
          <button 
            onClick={increaseCount} 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105">
            Increase
          </button>

          <button 
            onClick={decreaseCount} 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105">
            Decrease
          </button>

          <button 
            onClick={() => setCount(0)} 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-105">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CounterApp;
