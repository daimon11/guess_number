import React from 'react';
import style from './ClassComponent.module.css';

import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber: Math.floor(Math.random() *
        (this.props.max - this.props.min) +
        this.props.min),
      count: 0,
    };
  }

  updateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() *
      (this.props.max - this.props.min) +
      this.props.min);
    this.setState({
      randomNumber: newRandomNumber,
      result: 'Результат',
    });
  };

  handleStartOver = () => {
    this.setState(state => {
      delete this.state.btn;
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();


    this.setState(state => ({
      count: this.state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Нужно ввести число`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число равно ${state.userNumber}, число попыток ${state.count}`,
        btn: `Сыграть ещё`,
        count: 0,
      };
    });

    this.setState(state => ({
      userNumber: '',
    }));
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    console.log(this.state.randomNumber);

    let benStartOver = this.state.btn;

    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form
          className={style.form}
          onSubmit={this.handleSubmit}>
          <label
            className={style.label}
            htmlFor='user_number'>
            Угадай число
          </label>
          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />
          <button
            className={style.btn}
          >Угадать</button>
          {benStartOver &&
            <button onClick={() => {
              this.handleStartOver();
              this.updateRandomNumber();
            }} className={style.btn}
            >{benStartOver}</button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};


