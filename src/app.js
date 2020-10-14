import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = 'https://restcountries.eu/rest/v2/';

//Set a default base Url
axios.defaults.baseURL = apiUrl;

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
    const [question, setQuestion] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [answers, setAnswers] = useState([]);

    //Server State
    const [countries, setCountries] = useState([]);

    //Side effect sync with none of the states => called only in the first DOM rendering
    useEffect(() => {
        //Fetch name of countries and their capitals
        axios('all?fields=name;capital')
            .then(reponse => {
                //Set the countries local state the the response
                setCountries(reponse.data);
            })
    }, []);//no dependencies - called only one time

    //Side effect sync with the countries state
    useEffect(() => {
        if (countries.length) {
            //Generate an index between 0 and countries length
            const index = Math.floor(Math.random() * countries.length);
            //Store the question in the local state
            setQuestion(`${countries[index].capital} is the capital of`);
            //Store the correct answer in the local state of the app
            setCorrectAnswer(countries[index].name);
        }
    }, [countries]);

    //Side effect sync with the correctAnswer state
    useEffect(() => {
        if (correctAnswer) {
            const answers = [0, 0, 0, 0];

            //Generate a random index between 0 and 4
            let answerIndex = Math.floor(Math.random() * 4);

            //Put the answer at a random index in the anwsers array
            answers[answerIndex] = correctAnswer;

            //Then fill the empty (with a 0 value) value with a random wrong answer
            for (let i = 0; i < answers.length; i++) {
                //If there is no answer
                if (!answers[i]) {
                    const index = Math.floor(Math.random() * countries.length);
                    //Add a random wrong name of country
                    answers[i] = `${countries[index].name}`;
                }

            }
            //Set the answers local state with the array we have built
            setAnswers(answers);
        }
    }, [correctAnswer]);

    //Event handlers for change on the fieldset
    function answerChange(e) {
        setSelectedAnswer(e.target.value);
    }


    return (
        <div className="container">
            <div className="quiz-container">
                {/* Static */}
                <h2>country quiz</h2>
                <div className="quiz-widget">
                    {/* Dynamic */}
                    <p className="quiz-widget__question">
                        {question}
                    </p>
                    <fieldset onChange={answerChange}>
                        {/* Dynamic */}
                        {answers.length ?
                            answers.map((answer, index) => {
                                return (
                                    <div key={index}>
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