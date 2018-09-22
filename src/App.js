import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArray: [],
      numberForInput: '0',
      displayResult: []
    };
    this.sendToArray = this.sendToArray.bind(this);
    this.clear = this.clear.bind(this);
    this.parseArray = this.parseArray.bind(this);
    this.sendOperatorToArray = this.sendOperatorToArray.bind(this);
    this.sendDotToArray = this.sendDotToArray.bind(this);

  }

  sendToArray(num) {
    this.state.numberForInput === '0' || /\+|-|\/|\*/.test(this.state.numberForInput) || this.state.displayResult.length > 0 ?
      this.setState(
      {
        numberForInput: '' + num,
        displayResult: []
      }
    ) : this.setState(
        {
          numberForInput: this.state.numberForInput + num,
          displayResult: []
        }
      )
}
sendOperatorToArray(operator) {
  /\+|-|\/|\*/.test(this.state.numberForInput) ?
  this.setState(
    {
      inputArray: this.state.inputArray.slice(0, this.state.inputArray.length - 1).concat(operator),
      numberForInput: operator,
      displayResult: []
    }
  ) : this.setState(
    {
      inputArray: this.state.inputArray.concat(this.state.numberForInput).concat(operator),
      numberForInput: operator,
      displayResult: []
    }
  )
}
sendDotToArray(dot) {
/\./.test(this.state.numberForInput) ? true : this.setState(
  {
    numberForInput: this.state.numberForInput.concat(dot),
    displayResult: []
  }
)
}
  clear() {
    this.setState (
      {
        inputArray: [],
        numberForInput: '0',
        displayResult: []
      }
    )

  }
  parseArray() {
    const RESULT = (array) => {
      let copyArray = array.slice();
      for (let i = 0; i < copyArray.length; i++) {
       if (copyArray[i] == '/' && i !== copyArray.length - 1) {
         let temp = parseFloat(copyArray[i - 1]) / parseFloat(copyArray[i + 1]);
      copyArray.splice(i - 1, 3, temp);
          i--;
          i--;
        } else if (copyArray[i] == '*' && i !== copyArray.length - 1) {
          let temp = parseFloat(copyArray[i - 1]) * parseFloat(copyArray[i + 1]);
       copyArray.splice(i - 1, 3, temp);
           i--;
           i--;
        } else if (i == copyArray.length - 1 && (copyArray[i] == '*' || copyArray[i] == '/') ){
          i++;
        } else {
          true;
        }
      }
      let resultNumber = 0;
      for (let i = 0; i < copyArray.length; i++) {
        if (copyArray[i] == '+' && i !== copyArray.length - 1) {
          resultNumber += parseFloat(copyArray[i + 1]);
          i++;
        } else if (copyArray[i] == '-' && i !== copyArray.length - 1) {
          resultNumber -= parseFloat(copyArray[i + 1]);
          i++;
        } else if (i == copyArray.length - 1 && (copyArray[i] == '+' || copyArray[i] == '-') ){
          i++;
        } else {
          resultNumber += parseFloat(copyArray[i]);
        }
      }
      return resultNumber;
    }
    if (/\+|-|\/|\*/.test(this.state.numberForInput)) {
      this.setState(
        {
          displayResult: this.state.inputArray.concat('=').concat(RESULT(this.state.inputArray)),
          inputArray: [],
        numberForInput: `${RESULT(this.state.inputArray)}`
      }
    )
    } else {
      this.setState(
        {
          displayResult: this.state.inputArray.concat(this.state.numberForInput).concat('=').concat(RESULT(this.state.inputArray.concat(this.state.numberForInput))),
          inputArray: [],
        numberForInput: `${RESULT(this.state.inputArray.concat(this.state.numberForInput))}`
      }
    )
    }


  }

  render() {
    return (
      <div className='container-fluid' id='wrapper'>
        <div id='display' className='bg-dark text-light'>
        <div id='top' className='row bg-dark text-light'>
        <div id='outputter' className='col-12'>
          {this.state.inputArray}
          {this.state.displayResult}
        </div>
        </div>
        <div className='row bg-dark text-light'>
        <div id='inputter' className='col-12'>
          {this.state.numberForInput}
        </div>
      </div>
    </div>
      <div className='row'>
      <button className='btn col-9 bg-danger text-light' id='clear' onClick={this.clear}>C</button>
      <button className='btn col-3 bg-info text-light' id='divide' onClick={() => this.sendOperatorToArray(`/`)}>/</button>
    </div>
      <div className='row'>
      <button className='btn col-3 bg-light text-dark' id='seven' onClick={() => this.sendToArray(7)}>7</button>
      <button className='btn col-3 bg-light text-dark' id='eight' onClick={() => this.sendToArray(8)}>8</button>
      <button className='btn col-3 bg-light text-dark' id='nine' onClick={() => this.sendToArray(9)}>9</button>
      <button className='btn col-3 bg-info text-light' id='multiply' onClick={() => this.sendOperatorToArray(`*`)}>*</button>
      </div>
      <div className='row'>
      <button className='btn col-3 bg-light text-dark' id='four' onClick={() => this.sendToArray(4)}>4</button>
      <button className='btn col-3 bg-light text-dark' id='five' onClick={() => this.sendToArray(5)}>5</button>
      <button className='btn col-3 bg-light text-dark' id='six' onClick={() => this.sendToArray(6)}>6</button>
      <button className='btn col-3 bg-info text-light' id='subtract' onClick={() => this.sendOperatorToArray(`-`)}>-</button>
      </div>
      <div className='row'>
        <button className='btn col-3 bg-light text-dark' id='one' onClick={() => this.sendToArray(1)}>1</button>
        <button className='btn col-3 bg-light text-dark' id='two' onClick={() => this.sendToArray(2)}>2</button>
        <button className='btn col-3 bg-light text-dark' id='three' onClick={() => this.sendToArray(3)}>3</button>
        <button className='btn col-3 bg-info text-light' id='add' onClick={() => this.sendOperatorToArray(`+`)}>+</button>
        </div>
      <div className='row'>
      <button className='btn col-6 bg-secondary text-light' id='zero' onClick={() => this.sendToArray(0)}>0</button>
      <button className='btn col-3 bg-secondary text-light' id='decimal' onClick={() => this.sendDotToArray(`.`)}>.</button>
        <button className='btn col-3 bg-success text-light' id='equals' onClick ={this.parseArray} >=</button>
    </div>
      </div>
    );
  }
}

export default App;
