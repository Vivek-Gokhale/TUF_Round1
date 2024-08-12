import React, { useEffect, useState } from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Card = ({ questions, setQuestions }) => {
    const [idx, setIdx] = useState(0);
    const [flipped, setFlipped] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:3000/fetch-question');

                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }

                const data = await response.json();

                if (Array.isArray(data.questions)) {
                    setQuestions(data.questions);  
                } else {
                    throw new Error('API response is not an array');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError('Failed to load questions');
            }
        };

        fetchQuestions();
    }, [setQuestions]);

    const hasNext = () => idx < questions.length - 1;
    const hasPrev = () => idx > 0;

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const handleNext = () => {
        if (hasNext()) {
            setIdx(idx + 1);
            setFlipped(false); // Reset flip state on next
        }
    };

    const handlePrev = () => {
        if (hasPrev()) {
            setIdx(idx - 1);
            setFlipped(false); // Reset flip state on previous
        }
    };

    const handleLike = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/like-question/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to like question');
            }

            // Update UI after successful like
            const updatedQuestions = questions.map(question => 
                question.id === id ? { ...question, qlike: question.qlike + 1 } : question
            );
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error('Error liking question:', error);
        }
    };

    const handleDislike = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/dislike-question/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to dislike question');
            }

            // Update UI after successful dislike
            const updatedQuestions = questions.map(question => 
                question.id === id ? { ...question, qdislike: question.qdislike + 1 } : question
            );
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error('Error disliking question:', error);
        }
    };

    if (!questions || questions.length === 0) {
        return <p>No questions available.</p>;
    }

    return (
        <center>
            <div className='container'>
                <div>
                    <button className='nav-btn' onClick={handlePrev} disabled={!hasPrev()}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} size='2x' />
                    </button>
                </div>
                <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <p className="title">Question {idx + 1}</p>
                            <p>{questions[idx].question}</p>
                            <div className='like-dislike'>
                                <button className='like' onClick={() => handleLike(questions[idx].id)}>
                                    <FontAwesomeIcon icon={faThumbsUp} size='2x' />
                                    <p>{questions[idx].qlike}</p>
                                </button>
                                <button className='dislike' onClick={() => handleDislike(questions[idx].id)}>
                                    <FontAwesomeIcon icon={faThumbsDown} size='2x' />
                                    <p>{questions[idx].qdislike}</p>
                                </button>
                            </div>
                        </div>
                        <div className="flip-card-back">
                            <p className="title">Answer {idx + 1}</p>
                            <p>{questions[idx].answer}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='nav-btn' onClick={handleNext} disabled={!hasNext()}>
                        <FontAwesomeIcon icon={faCircleChevronRight} size='2x' />
                    </button>
                </div>
            </div>
        </center>
    );
};

export default Card;
