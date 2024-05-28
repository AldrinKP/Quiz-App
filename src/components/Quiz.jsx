// Display currently active question to user
// When question answered, switch to a different question
// Component is responsible for switching between questions and registering user answers

import { useState } from 'react';

import QUESTIONS from '../questions.js';

export default function Quiz() {
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((prev) => {
			return [...prev, selectedAnswer];
		});
	}

	return (
		<div id="question">
			<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
			<ul id="answers">
				{QUESTIONS[activeQuestionIndex].answers.map((answer) => (
					<li key={answer} className="answer">
						<button onClick={() => handleSelectAnswer(answer)}>
							{answer}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
