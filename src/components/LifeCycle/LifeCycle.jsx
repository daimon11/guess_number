import React from 'react';
import style from './LifeCycle.module.css';

export class LifeCycle extends React.Component {
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      field: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');

    return state;
  }

  componentDidMount() {
    console.log('componentDidMount');

    // setInterval(() => {
    //   this.setState((state) => ({
    //     field: state.field + 1,
    //   }));
    // }, 3000);

    // document.addEventListener('scroll', this.handler);
    document.title = this.props.prop;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate');
    return this.state !== nextState || this.props !== nextProps;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return window.pageXOffset;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    console.log('до прокрутки', window.scrollBy);
    window.scrollBy(0, -snapshot);
    console.log('после прокрутки', window.scrollBy, window.pageXOffset);
  }

  componentWillunmount() {
    // document.removeEventListener('scroll', this.handler);
  }

  handler = () => {
    this.setState(state => ({ field: state.field + 1 }));
  };

  render() {
    console.log('render');

    return (
      <div>
        <h1 className={style.title}>Жизненный цикл</h1>

        <div className={style.container}>
          <div>
            <h2 className={style.title}>Типы</h2>
            <ul className={style.list}>
              <li>Монтирование</li>
              <li>Обновление</li>
              <li>Размонтирование</li>
              <li>Ошибки</li>
            </ul>
          </div>

          <div className='stage'>
            <h2 className={style.title}>Этапы</h2>
            <ul className={style.list}>
              <li>Render</li>
              <li>Pre-commit</li>
              <li>Commit</li>
            </ul>
          </div>
        </div>

        <button
          className={style.btn}
          onClick={this.handler}
        >Клик {this.state.field}
        </button>

      </div>


    );
  }
}
