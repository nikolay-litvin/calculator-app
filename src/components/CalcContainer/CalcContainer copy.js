import React, { useState } from 'react';
import s from './CalcContainer.module.scss';
import CalcButton from '../../components/Button';
import CalcDisplay from '../../components/CalcDisplay';
import { Buttons } from '../../utils/constants';

const CalcContainer = () => {
	const [valueInput, setValueInput] = useState('');
	const [valueResult, setValueResult] = useState('');
	
	function funcAC() {
			setValueInput('');
			setValueResult('');
		}
		
		function funcErase() {
			setValueInput(() => valueInput.slice(0, -1));
		}
				
		function funcResult() {
			setValueInput(valueResult);
			setValueResult('');

			//console.log(valueResult);
			//console.log(valueInput);
		}

		function calculate(input){

			let f = { add : '+'
							, sub : '-' 
							, div : '/'
							, mlt : '*'
							, mod : '%' };
							
			 
			// Create array for Order of Operation and precedence
			f.ooo = [[ [f.mlt] , [f.div] , [f.mod] ],
							 [ [f.add] , [f.sub] ]];

			// clean up string
			input = input.replace(/[^0-9%^*\/()\-+.]/g,'');           
	 
			let output;
			for(let i=0, n=f.ooo.length; i<n; i++ ){
					
				 // Regular Expression to look for operators between floating numbers or integers
				 let re = new RegExp('(\\d+\\.?\\d*)([\\'+f.ooo[i].join('\\')+'])(\\d+\\.?\\d*)');
				 re.lastIndex = 0;                                     // be cautious and reset re start pos
					 
				 // Loop while there is still calculation for level of precedence
				 while( re.test(input) ){
						
						output = calc_internal(RegExp.$1,RegExp.$2,RegExp.$3);
						if (isNaN(output) || !isFinite(output)) return output;   // exit early if not a number
						input  = input.replace(re,output);
				 }
			}
	 
			return output;
	 
			function calc_internal(a,op,b){
				 a=a*1; b=b*1;
				 switch(op){
						case f.add: return a+b; break;
						case f.sub: return a-b; break;
						case f.div: return a/b; break;
						case f.mlt: return a*b; break;
						case f.mod: return a%b; break;
						default: ;
				 }
			}
	 }
		
		const funcWrite = (value) => {
			
			let currentValue = valueInput + value;
			currentValue = currentValue.replace(/^[?!+-/*.]/, '');
			setValueInput(currentValue);
			
			let res = calculate(currentValue);
			setValueResult(res);
		}

		const handlerClickButton = (value) => {
			switch(value) {
				case "AC":
					funcAC();
					break;
				case "=":
					funcResult();
					break;
				case "x":
					funcErase();
					break;
				default:
					funcWrite(value);	
					break;
			}
		
	};
		
	return (
		<div className={s.wrapper}>
				
				<CalcDisplay valueInput={valueInput} valueResult={valueResult} />
				<div className={s.container}>
					{ Buttons.map((item, index) => 
						<CalcButton 
							content={item.title} 
							onClick={() => handlerClickButton(item.title)} 
							key={index.toString()} />) 
					}
				</div>
			</div>
		);
};

export default CalcContainer;