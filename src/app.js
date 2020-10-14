import React, { useState } from 'react';

const App = () => {

    const [selectedAnswer, setSelectedAnswer] = useState("");

    function answerChange(e) {
        setSelectedAnswer(e.target.value);
    }
    return (
        <div className="container">
            <div className="quiz-container">
                <h2>country quiz</h2>
                <div className="quiz-widget">
                    <p className="quiz-widget__question">
                    </p>
                    <fieldset onChange={answerChange}>
                        <div>
                            <input type="radio" id="vietnam" name="answer" value="vietnam" />
                            <label htmlFor="vietnam">vietnam</label>
                        </div>
                        <div>
                            <input type="radio" id="malaysia" name="answer" value="malaysia" />
                            <label htmlFor="malaysia">malaysia</label>
                        </div>
                        <div>
                            <input type="radio" id="sweden" name="answer" value="sweden" />
                            <label htmlFor="sweden">sweden</label>
                        </div>
                        <div>
                            <input type="radio" id="austria" name="answer" value="austria" />
                            <label htmlFor="austria">austria</label>
                        </div>
                    </fieldset>
                </div>

            </div>
        </div>
    )
}

export default App;