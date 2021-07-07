import React, { useState } from 'react';
import {
	tranformedPytania,
	transformTextToQuestionsTab,
} from '../utils/transformToList';
import image from '../assets/lesiu.svg';
import settings from '../assets/settings.svg';
import './App.css';

const initialState = {
	notUsed: tranformedPytania,
	used: [],
};

interface Questions {
	notUsed: { question: string; index: number }[];
	used: { question: string; index: number }[];
}

function App() {
	const [question, setQuestion] = useState(
		'Tutaj pojawi się pytanie po kliknięciu przycisku losuj'
	);
	const [questions, setQuestions] = useState<Questions>(
		JSON.parse(
			localStorage.getItem('status') || JSON.stringify(initialState)
		)
	);
	const [importedQuestions, setImportedQuestions] = useState<string>('');
	const [showSettings, setShowSettings] = useState<boolean>(false);

	const saveToLocalStorage = (name: string, data: Questions) => {
		localStorage.setItem(name, JSON.stringify(data));
	};

	const updateQuestion = () => {
		if (questions.notUsed.length === 0)
			return 'Koniec pytań. Kliknij resetruj aby zagrać ponownie';

		const randomQuestion =
			questions.notUsed[
				Math.floor(Math.random() * questions.notUsed.length)
			];

		const updatedQuestions = {
			notUsed: questions.notUsed.filter(
				({ index }) => index !== randomQuestion.index
			),
			used: [...questions.used, randomQuestion],
		};
		setQuestions(updatedQuestions);
		saveToLocalStorage('status', updatedQuestions);
		return randomQuestion.question;
	};

	const resetStatus = () => {
		setQuestions(initialState);
		saveToLocalStorage('status', initialState);
		setQuestion('Tutaj pojawi się pytanie po kliknięciu przycisku losuj');
	};

	const onClick = () => {
		setQuestions({
			notUsed: transformTextToQuestionsTab(importedQuestions.trim()),
			used: [],
		});
		setQuestion('Tutaj pojawi się pytanie po kliknięciu przycisku losuj');
		setShowSettings(false);
	};

	return (
		<div className='App'>
			<header className={`App-header ${showSettings ? 'opacity' : ''}`}>
				<div
					className='settings'
					onClick={() => setShowSettings((prev) => !prev)}>
					<img width='35px' src={settings} alt='settings' />
				</div>
				<h1>Have You Hlebek</h1>
				<img src={image} className='App-logo' alt='logo' />
				<div className='container'>
					<p>{question}</p>
				</div>
				{questions.notUsed.length === 0 ? (
					<button onClick={resetStatus}>Resetuj</button>
				) : (
					<button onClick={() => setQuestion(updateQuestion())}>
						Losuj
					</button>
				)}
				<div className='info-container'>
					<div className='split'>
						Pozostało pytań:
						<span>{questions.notUsed.length}</span>
					</div>
					<div className='split'>
						Wykorzystane: <span>{questions.used.length}</span>
					</div>
				</div>
			</header>

			<div className={showSettings ? 'settings-menu' : 'disabled'}>
				<div className='close' onClick={() => setShowSettings(false)}>
					X
				</div>
				<h1>Ustawienia</h1>
				<div className='options'>
					<textarea
						value={importedQuestions}
						onChange={(event) => {
							setImportedQuestions(event.target.value);
						}}
						placeholder='Tutaj wklej pytania'></textarea>
					<div className='button-container'>
						<button
							disabled={
								transformTextToQuestionsTab(
									importedQuestions.trim()
								).length === 1
									? true
									: false
							}
							onClick={onClick}
							className='text-area'>
							Zastąp pytania
						</button>
						<button
							onClick={() => setImportedQuestions('')}
							className='text-area'>
							Wyczyść zawartość
						</button>
					</div>
					<button
						onClick={() => {
							resetStatus();
							setShowSettings(false);
						}}>
						Resetuj
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
