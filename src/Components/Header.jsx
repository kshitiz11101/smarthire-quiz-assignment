import React from 'react';

const Header = () => {
  return (
    <nav className='flex items-center justify-between h-16 bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 px-4'>
      <h1 className='text-white text-3xl font-bold flex-grow text-left'>SmartHire Quiz</h1>
      <a href="https://github.com/kshitiz11101/smarthire-quiz-assignment" target="_blank" className="text-white ml-auto">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12 0a12 12 0 00-3.789 23.381c.6.112.82-.26.82-.577v-2.162c-3.338.726-4.043-1.611-4.043-1.611-.546-1.387-1.334-1.756-1.334-1.756-1.091-.746.083-.731.083-.731 1.205.085 1.84 1.23 1.84 1.23 1.071 1.834 2.809 1.304 3.492.996.108-.776.419-1.304.763-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.311.469-2.384 1.235-3.226-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.457 11.457 0 016.002 0c2.29-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.873.118 3.176.767.842 1.234 1.915 1.234 3.226 0 4.61-2.805 5.625-5.476 5.92.43.372.823 1.105.823 2.225v3.293c0 .319.22.694.825.576A12 12 0 0012 0z" clipRule="evenodd"/>
        </svg>
      </a>
    </nav>
  );
};

export default Header;
