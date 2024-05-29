// Display currently active question to user
// When question answered, switch to a different question
// Component is responsible for switching between questions and registering user answers

import { useState, useCallback } from 'react';
import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;
	const isQuizComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(
		selectedAnswer
	) {
		setUserAnswers((prev) => {
			return [...prev, selectedAnswer];
		});
	},
	[]);

	const handleSkipAnswer = useCallback(
		() => handleSelectAnswer(null),
		[handleSelectAnswer]
	);

	if (isQuizComplete) {
		return <Summary userAnswers={userAnswers} />;
	}

	return (
		<div id="quiz">
			<Question
				key={activeQuestionIndex}
				index={activeQuestionIndex}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	);
}
