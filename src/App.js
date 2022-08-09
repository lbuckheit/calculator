/* 
 * How to run:
 * npm start -> navigate to localhost:3000
 * 
 * How I'd improve if I had more time:
 * -Extract anything that might want to be reusable out into components
 * -Clean up edge case logic (there's definitely some odd sequences of actions that can result in strange behavior)
 * -Write some tests (this can go hand-in-hand with the above)
 * -More polished css/styling
 * 
 * */


import './App.css';
import { useState } from 'react';

function App() {
  const OPERATORS = ['+', '-', 'X', '/'];
  const ACTIONS = ['C', '+', '-', 'X', '/', '=', '.'];
  const DIGITS = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];

  const [inputValue, setInputValue] = useState('0');
  const [numForCalc, setNumForCalc] = useState(null);
  const [activeOperator, setActiveOperator] = useState('');
  const [runningTally, setRunningTally] = useState(0);

  const digitHandler = (digit) => {
    if (inputValue === '0' || numForCalc === null) {
      setInputValue(digit);
      setNumForCalc(Number(digit));
    }
    else {
      setInputValue(`${inputValue}${digit}`);
      setNumForCalc(Number(`${inputValue}${digit}`));
    }
  }

  const actionHandler = (action) => {
    if (action === '=') {
      if (activeOperator && numForCalc !== null) {
        switch (activeOperator) {
          case '+':
            setInputValue(runningTally + numForCalc);
            setRunningTally(runningTally + numForCalc);
            break;
          case '-':
            setInputValue(runningTally - numForCalc);
            setRunningTally(runningTally - numForCalc);
            break;
          case 'X':
            setInputValue(runningTally * numForCalc);
            setRunningTally(runningTally * numForCalc);
            break;
          case '/':
            setInputValue(runningTally / numForCalc);
            setRunningTally(runningTally / numForCalc);
            break;
          default:
            break;
        }

        setNumForCalc(null);
        setActiveOperator('');
      }
    }
    else if (action === '.') {
      const hasDecimal = !(inputValue.toString().includes('.'))
      if (!inputValue || hasDecimal) {
        setInputValue(`${inputValue}.`)
      }
    }
    else if (action === 'C') {
      resetState();
    }
    else if (OPERATORS.includes(action)) {
      if (activeOperator || numForCalc === null) {
        switch (activeOperator) {
          case '+':
            setInputValue(runningTally + numForCalc);
            setRunningTally(runningTally + numForCalc);
            break;
          case '-':
            setInputValue(runningTally - numForCalc);
            setRunningTally(runningTally - numForCalc);
            break;
          case 'X':
            setInputValue(runningTally * numForCalc);
            setRunningTally(runningTally * numForCalc);
            break;
          case '/':
            setInputValue(runningTally / numForCalc);
            setRunningTally(runningTally / numForCalc);
            break;
          default:
            break;
        }
      }
      else {
        setRunningTally(numForCalc);
      }

      setActiveOperator(action);
      setNumForCalc(null);
    }
  }

  const resetState = () => {
    setInputValue('0');
    setNumForCalc(null);
    setActiveOperator('');
    setRunningTally(0);
  }

  return (
    <div className='main'>
      <div className='viewingWindow'>
        <input className='viewingInput' value={inputValue} readOnly/>
        <div className='operationIndicators'>
          {OPERATORS.map(operator =><span key={operator} className={`${activeOperator === operator ? 'active ' : ''}operationIndicator`}>{operator}</span>)}
        </div>
      </div>
      <div className='buttons'>
        <div className='numberButtons'>
          {DIGITS.map(digit => <button key={digit} className={digit === '0' ? 'wideButton' : ''} onClick={() => digitHandler(digit)}>{digit}</button>)}
        </div>
        <div className='operationButtons'>
          {ACTIONS.map(action =><button key={action} onClick={() => actionHandler(action)}>{action}</button>)}
        </div>
      </div>
    </div>
  );
}

export default App;
