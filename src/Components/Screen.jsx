import React, { useState } from 'react';
import Quiz from './Quiz';
const Screen = () => {
  const [quizStarted,SetQuizStarted]=useState(false);
   const handleStartQuiz=()=>{
    if (window.confirm('Would you like to enable full-screen mode for the quiz?')) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { 
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { 
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { 
          elem.msRequestFullscreen();
        }
        SetQuizStarted(true);
   }
   }
  return (
    
    <div className="mt-48 h-full flex flex-col gap-4 items-center justify-center">
    {!quizStarted ? (
       <>
          <h1 className="text-text-blue font-karla font-semibold text-3xl md:text-6xl">
             Quiz App
          </h1>
          <p className="text-text-blue font-inter md:text-xl">
             Test your knowledge!
          </p>
          <button
             onClick={handleStartQuiz}
             className="text-white bg-blue-600 hover:bg-blue-800 px-6 py-2 mt-4 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg"
          >
             Start Quiz
          </button>
          <p className='text-red-500 text-lg'>Please Enable full screen for taking the quiz!</p>
       </>
    ) : (
       <Quiz />
    )}
 </div>
  )
}

export default Screen;