import { useState } from 'react';

import QuestionTimer from './QuestionTimer.jsx';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js';

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
	const [answer, setAnswer] = useState({
		selectedAnswer: '',
		isCorrrect: null,
	});

	let timer = 10000;

	if (answer.selectedAnswer) {
		timer = 1000;
	}
	if (answer.isCorrrect !== null) {
		timer = 2000;
	}

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswer: answer,
			isCorrrect: null,
		});
		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrrect: QUESTIONS[index].answers[0] === answer,
			});

			setTimeout(() => {
				onSelectAnswer(answer);
			}, 2000);
		}, 1000);
	}

	let answerState = '';
	if (answer.selectedAnswer && answer.isCorrrect !== null) {
		answerState = answer.isCorrrect ? 'correct' : 'wrong';
	} else if (answer.selectedAnswer) {
		answerState = 'answered';
	}

	return (
		<div id="question">
			<QuestionTimer
				key={timer}
				onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
				timeout={timer}
				mode={answerState}
			/>
			<h2>{QUESTIONS[index].text}</h2>
			<Answers
				answers={QUESTIONS[index].answers}
				selectedAnswer={answer.selectedAnswer}
				answerState={answerState}
				onSelect={handleSelectAnswer}
			/>
		</div>
	);
}
