import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import  * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)//프로미스와 펑션도 받게 하기 위해 미들웨어를 통한다.
ReactDOM.render(

  <Provider
    store = {createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__&&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >

  <App />
  </Provider>
  ,document.getElementById('root'));
//provider로 감싸서 리덕스랑 어플리케이션이랑 연결을 시킨다 //
//provider안에 store를 넣는다.//
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();