import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
	const [timeRemaining, setTimeRemaining] = useState(timeout);

	useEffect(() => {
		const progressTimer = setInterval(() => {
			setTimeRemaining((prev) => prev - 100);
		}, 100);
		return () => {
			clearInterval(progressTimer);
		};
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			onTimeout();
		}, timeout);

		return () => {
			clearTimeout(timer);
		};
	}, [timeout, onTimeout]);
	return <progress id="question-time" value={timeRemaining} max={timeout} />;
}
