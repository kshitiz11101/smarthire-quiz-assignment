import React, { useEffect, useState } from 'react';
import '../../public/quizData.json';
const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [timer,setTimer]=useState();

    useEffect(() => {
        fetch('/quizData.json')
        .then((response) => response.json())
        .then((data) => setQuizData(data));
    }, []);
    useEffect(()=>{
        if(timer<=0){
            alert("Time is up!Your quiz is over.");
            setCurrentQuestionIndex(quizData.length);
            return;
        }
        const timerId=setInterval(() => {
            setTimer(timer-1);
        }, 1000);

        return()=>clearInterval(timerId);
    }, [timer]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    
    const handleSubmit = () => {
        if (selectedOption) {
            if (selectedOption === quizData[currentQuestionIndex].correct_answer) {
                setScore(score + 1);
            }
            setIsSubmitted(true);
        }
    };

    const handleNextQuestion = () => {
        setIsSubmitted(false);
        setSelectedOption(null);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    if (quizData.length === 0) {
        return <div>Loading...</div>;
    }
    const currentQuestion = quizData[currentQuestionIndex];

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <>

            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <div className='absoute top-4 right-4 text-xl font-bold'>
                        {formatTime(timer)}
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
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
                                    disabled={submitted}
                                />
                                <label htmlFor={option} className="text-lg">{option}</label>
                            </li>
                        ))}
                    </ul>
                    {submitted && (
                        <div className={`mt-4 p-2 rounded-lg ${selectedOption === currentQuestion.correct_answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedOption === currentQuestion.correct_answer ? 'Correct!' : `Incorrect! The correct answer is ${currentQuestion.correct_answer}.`}
                        </div>
                    )}
                    <div className="mt-4 flex space-x-4">
                        {!submitted ? (
                            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Submit
                            </button>
                        ) : currentQuestionIndex < quizData.length - 1 ? (
                            <button onClick={handleNextQuestion} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Next Question
                            </button>
                        ) : (
                            <div className="text-xl font-bold">Quiz Completed! Your score is {score}/{quizData.length}</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quiz;
