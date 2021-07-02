import React, { useState } from 'react';
import logo from '../logo.svg';
import { tranformedPytania } from '../utils/transformToList';
import './App.css';

function App() {
	const initialState = {
		notUsed: tranformedPytania,
		used: [],
	};
	const [question, setQuestion] = useState(
		'Tutaj pojawi się pytanie po kliknięciu przycisku losuj'
	);
	const [questions, setQuestions] = useState<{
		notUsed: { question: string; index: number }[];
		used: { question: string; index: number }[];
	}>(initialState);

	const getRandomQuestion = () => {
		if (questions.notUsed.length === 1) {
			setQuestions(initialState);
			setQuestion(
				'Tutaj pojawi się pytanie po kliknięciu przycisku losuj'
			);
			return 'Koniec pytań. Kliknij resetruj aby zagrać ponownie';
		}
		const randomQuestion =
			questions.notUsed[
				Math.floor(Math.random() * questions.notUsed.length)
			];
		setQuestions({
			notUsed: questions.notUsed.filter(
				({ index }) => index !== randomQuestion.index
			),
			used: [...questions.used, randomQuestion],
		});
		return randomQuestion.question;
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>{question}</p>
				<button onClick={() => setQuestion(getRandomQuestion())}>
					{questions.notUsed.length === 0 ? 'Resetuj' : 'Losuj'}
				</button>
				<div className='info-container'>
					<div>Pozostało pytań: {questions.notUsed.length}</div>
					<div>Wykorzystane: {questions.used.length}</div>
				</div>
			</header>
		</div>
	);
}

export default App;
