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
        console.log(countries[index]);
        return `${countries[index].capital} is the capital of`;
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