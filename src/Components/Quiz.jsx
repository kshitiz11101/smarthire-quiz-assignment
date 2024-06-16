import React, { useEffect, useState } from 'react';
import '../../public/quizData.json';
import { LuAlarmClock } from "react-icons/lu";

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
        return savedQuestionIndex ? parseInt(savedQuestionIndex) : 0;
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(() => {
        const savedTimer = localStorage.getItem('timer');
        return savedTimer ? parseInt(savedTimer) : 10 * 60;
    });

    useEffect(() => {
        fetch('/quizData.json')
            .then((response) => response.json())
            .then((data) => setQuizData(data));
    }, []);

    useEffect(() => {
        if (timer <= 0) {
            alert("Time is up! Your quiz is over.");
            setCurrentQuestionIndex(quizData.length);
            return;
        }

        const timerId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timer]);

    useEffect(() => {
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
        localStorage.setItem('timer', timer);
    }, [currentQuestionIndex, timer]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption === quizData[currentQuestionIndex].correct_answer) {
            setScore((prevScore) => prevScore + 1);
        }
        setSelectedOption(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };
    const handleBacktoHomeScreen=()=>{
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('timer');
        window.location.href='/';
    }
    if (quizData.length === 0) {
        return <div>Loading...</div>;
    }

    if (currentQuestionIndex >= quizData.length) {
        localStorage.removeItem('currentQuestionIndex');
        localStorage.removeItem('timer');
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                    <div className="text-xl font-bold">
                        Your score is {score}/{quizData.length} 🎉🎉
                    </div>
                    <div className="mt-4 flex space-x-4 py-2 justify-center">
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
                        onClick={handleBacktoHomeScreen}
                        >
                            Return to home screen
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = quizData[currentQuestionIndex];

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                <div className="flex items-center justify-center mb-4">
                    <LuAlarmClock className="text-xl mr-2" />
                    <h3 className="text-xl font-bold">
                        Time Left: {formatTime(timer)}
                    </h3>
                </div>
                <h2 className="text-2xl font-bold mb-4">Q.{currentQuestionIndex + 1} {currentQuestion.question}</h2>
                <ul className="space-y-2">
                    {currentQuestion.options.map((option) => (
                        <li key={option} className="flex items-center">
                            <input
                                type="radio"
                                id={option}
                                name="option"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => handleOptionChange(option)}
                                className="mr-2"
                            />
                            <label htmlFor={option} className="text-lg">{option}</label>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex space-x-4 py-2 justify-center">
                    <button
                        onClick={handleNextQuestion}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        disabled={!selectedOption}
                    >
                        {currentQuestionIndex < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
