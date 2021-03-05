import React, { useState, useEffect } from 'react';
import s from './CalcContainer.module.scss';
import CalcButton from '../../components/Button';
import CalcDisplay from '../../components/CalcDisplay';
import { Buttons } from '../../utils/constants';

const CalcContainer = ( {refClick} ) => {
	const [valueInput, setValueInput] = useState('0');
	const [valueResult, setValueResult] = useState('');
	
	
		const parseString = (str) => {
			let currentStr = '';
			let resultStr = [];
			let count = true;
			
			let reg = /([%+*/-])/;
			currentStr = str.split(reg);
			console.log(currentStr);
			currentStr.forEach(element => {
				resultStr.push(element.replace(/([^.]*\.[^.]*)\./,'$1'));
			});

			currentStr = resultStr.join('');

			if(resultStr.length >= 3) { // than write to viewResult from 3-d item include!
					
					while((resultStr.includes('*') || resultStr.includes('/')) && count) {
							
							const index = resultStr.findIndex((item) => item === '*' || item === '/');
							if(resultStr[index+1]) {
								resultStr.splice(index-1, 3, calc(resultStr[index-1], resultStr[index], resultStr[index+1]));
								
							} else {
								count = false;
							}
					}
						count = true;
				 
					while((resultStr.includes('+') || resultStr.includes('-')) && count) {
					
							const index = resultStr.findIndex((item) => item === '+' || item === '-');
							if(resultStr[index+1]) {					
								resultStr.splice(index-1, 3, calc(resultStr[index-1], resultStr[index], resultStr[index+1]));
								
							} else {
								count = false;
							}
				 }
				 		count = true;

				 while(resultStr.includes('%') && count) {
					
					const index = resultStr.findIndex((item) => item === '%');
					if(resultStr[index+1]) {					
						resultStr.splice(index-1, 3, calc(resultStr[index-1], resultStr[index], resultStr[index+1]));
						
					} else {
						count = false;
					}
		 }
				 
				 if(!resultStr === "Error" || !isNaN(resultStr)) {
					const r = resultStr.join('');
					//const r = resultStr.join('').replace(/[^0-9]/g, '');
						setValueResult(r);
				 } else {
					 	setValueResult(resultStr);
					}
			}

			return currentStr;
			
			function calc(a, operand, b) {
				let result = '';
				const op1 = parseFloat(a);
				const op2 = parseFloat(b);
				const err = "Error";
					if(operand === '*') result = (op1 * op2).toString();
					if(operand === '/') result = (op1 / op2).toString();
					if(operand === '/' && op2 === 0) result = err.toString();
					if(operand === '+') result = (op1 + op2).toString();
					if(operand === '-') result = (op1 - op2).toString();
					if(operand === '%') result = (op1 * (op2 / 100)).toString();
				return result;
			}
		};

		function funcAC() {
			setValueInput('0');
			setValueResult('');
		}

		function funcErase() {
			let str = valueInput.slice(0, -1);
			if(str === '') str = '0';
			setValueInput(str);
		}
				
		function funcResult() {
			setValueInput(valueResult);
			setValueResult('');
		}
		
		const funcWrite = value => {
			let currentValue = valueInput + value;
			currentValue = currentValue
				.replace(/^[0\\d]/g,'')
				.replace(/^[+*/-]/g,'0')
				.replace(/^[.]/g,'0.')
				.replace(/(\+|\*|-|\/|\.|%)+/g,'$1');
			
			currentValue = parseString(currentValue);
			setValueInput(currentValue);
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

	const handlerPressKey = (event) => {
		//console.log(event.keyCode);
		switch(event.keyCode) {
			case 48:
			case 96:
				handlerClickButton('0');	
				break;
			case 49:
			case 97:
				handlerClickButton('1');
				break;
			case 50:
			case 98:
				handlerClickButton('2');
				break;
			case 51:
			case 99:
				handlerClickButton('3');
				break;
			case 52:
			case 100:
				handlerClickButton('4');
				break;
			case 53:
			case 101:
				handlerClickButton('5');
				break;
			case 54:
			case 102:
				handlerClickButton('6');
				break;
			case 55:
			case 103:
				handlerClickButton('7');
				break;
			case 56:
			case 104:
				handlerClickButton('8');
				break;
			case 57:
			case 105:
				handlerClickButton('9');
				break;
			
			case 106:
				handlerClickButton('*');
				break;
			case 107:
				handlerClickButton('+');
				break;
			case 109:
			case 189:
				handlerClickButton('-');
				break;
			case 110:
				handlerClickButton('.');
				break;
			case 111:
				handlerClickButton('/');
				break;
			case 13:
			case 187:
				handlerClickButton('=');
				break;
			case 27:
				handlerClickButton('AC');
				break;
			case 8:
				handlerClickButton('x');
				break;
			
			default:
			break;
		}
	};

	useEffect(() => {
		if(refClick.current) {
			refClick.current.focus();
		}
	}, [refClick]);

	useEffect(() => {
		if(valueResult[0] === "Error" || valueResult[0] === "NaN") {
			setValueInput('');	
			setValueResult("Error");	
		}
	});
		
	return (
		<div className={s.wrapper} onKeyDown={handlerPressKey} tabIndex="0" ref={refClick} >
				
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