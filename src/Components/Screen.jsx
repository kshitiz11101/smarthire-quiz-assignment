import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import Header from './Header';
const Screen = () => {
  const [FullScreen,SetFullScreen]=useState(false);
  const handleFullScreen=()=>{
   if(!document.fullscreenElement){
      document.documentElement.requestFullscreen()
      .then(()=>SetFullScreen(true))
      .catch((error)=>console.error('Error in enabling full screen mode'));

   }
   else{
      document.exitFullscreen()
      .then(()=>SetFullScreen(false))
      .catch((error)=>console.error('Error in exiting full screen'));
   }

  }

  useEffect(()=>{
   const handleFullScreenChange=()=>{
      SetFullScreen(!!document.fullscreenElement);
   }
   document.addEventListener('fullscreenchange',handleFullScreenChange)
   document.addEventListener('webkitfullscreenchange',handleFullScreenChange)
   document.addEventListener('mozfullscreenchange', handleFullScreenChange)
   document.addEventListener('msfullscreenchange', handleFullScreenChange)

   return()=>{
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange)
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange)
      document.removeEventListener('msfullscreenchange', handleFullScreenChange)
   }

},[]);
  return (
    
   <main className='w-full h-[100vh]'>
      <Header/>
      {FullScreen?<Quiz/> :      

         <div className='w-full h-[calc(100vh-64px)] flex justify-center items-center'>
         <div className='h- flex gap-10 p-6 flex-col items-center max-w-[400px] w-[90%] text-center rounded-lg'
            style={{ boxShadow: 'rgb(154, 129, 237) 1px 1px 3px, rgb(154, 129, 237) 1px 1px 3px' }}
         >
            <h3 className='font-bold text-3xl'>Start Quiz</h3>
            <p className="text-blue font-inter md:text-xl">
             Test your knowledge!
          </p>
            <button
               onClick={handleFullScreen}
               className='bg-blue-500 p-2 rounded-lg text-white font-medium text-lg hover:bg-blue-800 transition-colors duration-300 ease-in-out'>
               Enter Full Screen Mode
            </button>
         </div>
         </div>
      }
 </main>
  )
}

export default Screen;