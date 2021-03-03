import React from 'react';
import s from './Home.module.scss';
import CalcContainer from '../../components/CalcContainer';

const Home = () => {
	return (
		<div className={s.wrapper}>
			<CalcContainer />
		</div>
	);
	 
};

export default Home;