import React, { useState, useEffect } from 'react';

const DisplayQuestion = ({questions, setQuestions, handleEdit}) => {
      
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/delete-question/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete question');
            }

            const result = await response.json();
            console.log(result.message);

            
            setQuestions(questions.filter((question) => question.id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };


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
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container1'>
            <table className='question-table'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q, index) => (
                        <tr key={q.id}>
                            <td>{index + 1}</td>
                            <td style={{ width: '350px' }}>{q.question}</td>
                            <td style={{ width: '400px' }}>{q.answer}</td>
                            <td>{q.qlike}</td>
                            <td>{q.qdislike}</td>
                            <td>
                                <button>
                                    <a href="#" className='edit-link' onClick={(e) => { e.preventDefault(); handleEdit(q.id); }}>Edit</a>
                                </button>
                                <button>
                                    <a href="#" className='delete-link' onClick={(e) => { e.preventDefault(); handleDelete(q.id); }}>Delete</a>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayQuestion;
