import React, { useRef } from 'react';
import s from './Home.module.scss';
import CalcContainer from '../../components/CalcContainer';

const Home = () => {
	const refClick = useRef();
	
	const onHandlerClick = () => {
		if(refClick.current) {
			refClick.current.focus();
		}
	};
	
	return (
		<div className={s.wrapper} onClick={onHandlerClick}>
			<CalcContainer refClick={refClick} />
		</div>
	);
	 
};

export default Home;