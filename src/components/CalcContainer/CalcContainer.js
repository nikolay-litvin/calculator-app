import React, { useState } from 'react';
import s from './CalcContainer.module.scss';

const CalcContainer = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.display}></div>
			
			<div className={s.container}>
				<div className={s.item}>AC</div>
				<div className={s.item}> x </div>
				<div className={s.item}> % </div>
				<div className={s.item}> / </div>
				<div className={s.item}> 7 </div>
				<div className={s.item}> 8 </div>
				<div className={s.item}> 9 </div>
				<div className={s.item}> * </div>
				<div className={s.item}> 4 </div>
				<div className={s.item}> 5 </div>
				<div className={s.item}> 6 </div>
				<div className={s.item}> - </div>
				<div className={s.item}> 1 </div>
				<div className={s.item}> 2 </div>
				<div className={s.item}> 3 </div>
				<div className={s.item}> + </div>
				<div className={s.item}> . </div>
				<div className={s.item}> 0 </div>
				<div className={s.item}> = </div>
			</div>
			
				
			</div>

		
	);
	
	
};

export default CalcContainer;