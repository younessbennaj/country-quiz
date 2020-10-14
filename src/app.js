import React, { useState, useEffect } from 'react';
import axios from 'axios';
//React router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const apiUrl = 'https://restcountries.eu/rest/v2/';

//Set a default base Url
axios.defaults.baseURL = apiUrl;

const App = () => {

    //UI State

    //String that represents the current question asked to the user
    const [question, setQuestion] = useState("");
    //String that represents the answer selected by the user
    const [selectedAnswer, setSelectedAnswer] = useState("");
    //String that represents the correct answer to the current question 
    const [correctAnswer, setCorrectAnswer] = useState("");
    //Array that contains the possible answers to the question, only one is the correct
    const [answers, setAnswers] = useState([]);
    //Number that represents the number of correct answers of the user
    const [correctAnswersCounter, setCorrectAnswersCounter] = useState(0);

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
        console.log(correctAnswersCounter);
        if (countries.length) {
            //Generate an index between 0 and countries length
            const index = Math.floor(Math.random() * countries.length);
            //Store the question in the local state
            setQuestion(`${countries[index].capital} is the capital of`);
            //Store the correct answer in the local state of the app
            setCorrectAnswer(countries[index].name);
        }
    }, [countries, correctAnswersCounter]);

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

    //Side effect sync with selectedAnswer state
    useEffect(() => {
        if (selectedAnswer) {
            //Quiz validation here 
            if (correctAnswer === selectedAnswer) {
                //Increment the number of good answers
                setCorrectAnswersCounter(correctAnswersCounter + 1);
                //Generates a new question and answsers
            } else {
                //Redirect to the result page

                //Display the number of correct answers
                console.log('mauvaise réponse');
            }
        }
    }, [selectedAnswer]);

    //Event handlers for change on the fieldset
    function answerChange(e) {
        setSelectedAnswer(e.target.value);
        //Reset the checked attrubute of the radio button
        e.target.checked = false;
    }


    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route exact path="/">
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
                                <button>
                                    <Link to="/result">Next</Link>
                                </button>
                            </div>
                        </div>
                    </Route>
                    <Route exact path="/result" >
                        <div className="result-container">
                            <h2>Results</h2>
                            <p>You got {correctAnswersCounter} correct answers</p>
                            <button>
                                <Link to="/">Try again</Link>
                            </button>
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;