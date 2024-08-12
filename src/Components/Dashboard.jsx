import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import AddNewQuestion from './AddNewQuestion';
import '../styles/Dashboard.css';
import DisplayQuestion from './DisplayQuestion';

const Dashboard = ({ questions, setQuestions }) => {
    const questionRef = useRef(null);
    const answerRef = useRef(null);
    const [qid, setQid] = useState(0);

    const [showForm, setShowForm] = useState(false);
    const [flag, setFlag] = useState(false);
    const handleOnClick = () => {
        setShowForm(true);
        setFlag(false);
        answerRef.current.value = '';
        questionRef.current.value = '';
    };

    const handleEdit = async (id) => {
        setFlag(true);
        setShowForm(true);
        setQid(id);
        try {
            const response = await fetch(`http://localhost:3000/get-question/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch question');
            }

            const data = await response.json();

            if (data.question) {
                console.log(data);
                answerRef.current.value = data.question.answer;
                questionRef.current.value = data.question.question;
            } else {
                throw new Error('Question data is missing');
            }
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };


    const handleFormSubmit = async (e, question, answer) => {
        e.preventDefault();
        if (!flag) {
            try {
                const response = await fetch('http://localhost:3000/insert-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question, answer }),
                });

                if (response.ok) {
                    const data = await response.json();

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
                        if (setError) {
                            setError('Failed to load questions');
                        }
                    }

                } else {
                    console.error('Failed to insert question:', response.statusText);

                }
            } catch (error) {
                console.error('Error occurred while inserting question:', error);

            }
        }
        else 
        {
            try {
                const response = await fetch(`http://localhost:3000/update-question/${qid}`, { // Pass the question ID in the URL
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question, answer }), // Send the updated question and answer
                });
    
                if (response.ok) {
                    console.log('Question updated successfully');
                    
                    // Fetch the updated list of questions
                    const fetchResponse = await fetch('http://localhost:3000/fetch-question');
                    if (!fetchResponse.ok) {
                        throw new Error('Failed to fetch questions');
                    }
    
                    const data = await fetchResponse.json();
                    if (Array.isArray(data.questions)) {
                        setQuestions(data.questions);
                    } else {
                        throw new Error('API response is not an array');
                    }
    
                } else {
                    console.error('Failed to update question:', response.statusText);
                }
            } catch (error) {
                console.error('Error occurred while updating question:', error);
            }
        }


        setShowForm(false);
    };

    return (
        <div className='container1'>
            <button className='action-btn' onClick={handleOnClick}>
                <FontAwesomeIcon icon={faPlus} /> Add New Question
            </button>
            <br />
            {showForm && <AddNewQuestion handleFormSubmit={handleFormSubmit} flag={flag} setFlag={setFlag} questionRef={questionRef} answerRef={answerRef} />}
            <DisplayQuestion questions={questions} setQuestions={setQuestions} handleEdit={handleEdit} />
        </div>
    );
};

export default Dashboard;
