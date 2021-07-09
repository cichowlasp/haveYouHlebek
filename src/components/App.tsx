import React, { useState, useEffect } from 'react';
import {
	tranformedPytania,
	transformTextToQuestionsTab,
} from '../utils/transformToList';
import image from '../assets/lesiu.svg';
import settings from '../assets/settings.svg';
import darkmode from '../assets/darkmode.svg';
import './App.css';
import { darkTheme,lightTheme } from '../consts/themes';

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
	const [isDarkMode ,setIsDarkMode] = useState<boolean>(JSON.parse(
		localStorage.getItem('isDarkMode') || JSON.stringify(false)
	));

	const saveToLocalStorage = (name: string, data: Questions | boolean) => {
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

	const setColors = () => {
		const theme = isDarkMode?darkTheme:lightTheme;
		document.documentElement.style.setProperty('--color-background',theme.colorBackground);
		document.documentElement.style.setProperty('--color-background-dark',theme.colorBackgroundDark);
		document.documentElement.style.setProperty('--color-accent',theme.colorAccent);
		document.documentElement.style.setProperty('--color-accent-dark',theme.colorAccentDark);
		document.documentElement.style.setProperty('--color-font',theme.colorFont);
		document.documentElement.style.setProperty('--color-background-accent',theme.colorBackgroundAccent);
	} 

	const toogleTheme = ()=>{
		setIsDarkMode(preValue=>!preValue);
		saveToLocalStorage('isDarkMode',!isDarkMode);
		setColors();
		
	}

	useEffect(() => {
		setColors();
	})

	return (
		<div className='App'>
			<header className={`App-header ${showSettings ? 'opacity' : ''}`}>
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
				<div className='navbar'>
				<div
					className='settings'
					onClick={toogleTheme}>
					<img src={darkmode} alt='darkmode' />
				</div>
				<div
					className='settings'
					onClick={() => setShowSettings((prev) => !prev)}>
					<img src={settings} alt='settings' />
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
