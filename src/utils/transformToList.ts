import { pytania } from '../consts/questions';

export const transformTextToQuestionsTab = (text: string) => {
	return text.split('\n').map((el, index) => {
		return { index: index, question: el.replace(/[0-9.]/g, '').trim() };
	});
};

export const tranformedPytania = transformTextToQuestionsTab(pytania);
