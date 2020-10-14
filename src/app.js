import React, { useState, useEffect } from 'react';

//Mock API 
const countriesModel = [
    {
        "name": "Afghanistan",
        "capital": "Kabul"
    },
    {
        "name": "Åland Islands",
        "capital": "Mariehamn"
    },
    {
        "name": "Albania",
        "capital": "Tirana"
    },
    {
        "name": "Algeria",
        "capital": "Algiers"
    },
    {
        "name": "American Samoa",
        "capital": "Pago Pago"
    },
    {
        "name": "Andorra",
        "capital": "Andorra la Vella"
    },
    {
        "name": "Angola",
        "capital": "Luanda"
    },
    {
        "name": "Anguilla",
        "capital": "The Valley"
    }
]

const App = () => {

    //UI State
    const [selectedAnswer, setSelectedAnswer] = useState("");

    //Server State
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(countriesModel);
    }, []);//no dependencies - called only one tiem

    function answerChange(e) {
        setSelectedAnswer(e.target.value);
    }

    //Generate a country to fill the question
    function generateQuestion() {
        //Generate an index between 0 and countries length
        const index = Math.floor(Math.random() * countries.length);
        return `${countries[index].capital} is the capital of`;
    }

    //Return an array of possible answers
    function generateAnswer() {
        let answers = [];
        let previousIndex = -1;
        //Generate 4 indexes
        for (let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * countries.length);
            answers.push(`${countries[index].name}`);
        }
        return answers;
    }


    return (
        <div className="container">
            <div className="quiz-container">
                {/* Static */}
                <h2>country quiz</h2>
                <div className="quiz-widget">
                    {/* Dynamic */}
                    <p className="quiz-widget__question">
                        {countries.length ? generateQuestion() : null}
                    </p>
                    <fieldset onChange={answerChange}>
                        {/* Dynamic */}
                        {countries.length ?
                            generateAnswer().map(answer => {
                                return (
                                    <div>
                                        <input type="radio" id={answer} name="answer" value={answer} />
                                        <label htmlFor={answer}>{answer}</label>
                                    </div>
                                )
                            })
                            : null
                        }
                    </fieldset>
                </div>

            </div>
        </div>
    )
}

export default App;