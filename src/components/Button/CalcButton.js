import React from 'react';
import s from './CalcButton.module.scss';

const CalcButton = ({ content, ...props }) => {
	return (
		<div className={s.wrapper} {...props}>
			<span>{content}</span>
		</div>
	);
	
	
};

export default CalcButton;