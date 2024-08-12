import React, { useRef } from 'react';

const AddNewQuestion = ({ handleFormSubmit, flag, setFlag , questionRef,  answerRef}) => {
   
    const onFormSubmit = (e) => {
        e.preventDefault();
        const question = questionRef.current.value;
        const answer = answerRef.current.value;

       

        handleFormSubmit(e, question, answer);

      
        questionRef.current.value = '';
        answerRef.current.value = '';
    };

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div className="queCon">
                    <div className="form-group">
                        <label htmlFor="question">Question</label>
                        <textarea
                            className="form-control"
                            id="question"
                            rows={3}
                            cols={20}
                            ref={questionRef}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="answer">Answer</label>
                        <textarea
                            className="form-control"
                            id="answer"
                            rows={3}
                            cols={20}
                            ref={answerRef}
                        ></textarea>
                    </div>
                </div>
                <br />
                <button type="submit" className="action-btn">{flag ? 'Save' : 'Insert'}</button>
            </form>
        </>
    );
};

export default AddNewQuestion;
