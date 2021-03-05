import React from 'react';
import s from './CalcDisplay.module.scss';

const CalcDisplay = ({ valueInput, valueResult }) => {
	return (
		<div className={s.wrapper}>
			<div>
				<span>{ valueInput }</span>
			</div>
			<div>
				<span>{ valueResult }</span>
			</div>
		</div>
	);
};

export default CalcDisplay;