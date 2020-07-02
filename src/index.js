import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers'

/* function logger(obj, next, action) */
/* logger(obj)(next)(action) where obj is destructured and dispatch and getState are taken out of it. */
// const logger=function({dispatch, getState})
// {
//     return function(next)
//     {
//         return function(action)
//         {
//             //middleware code
//             console.log('ACTION_TYPE:', action.type);
//             next(action);
//         }
//     }
// }

const logger = ({ dispatch, getState }) => (next) => (action) =>
{
    if (typeof (action) !== 'function')
        console.log('ACTION_TYPE:', action.type);
    next(action);
}

// const thunk=({dispatch, getState})=>(next)=>(action)=>
// {
//     if(typeof(action)=='function')
//     {
//         action(dispatch);
//         return;
//     }
//     next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

console.log(store);
// console.log('Before State', store.getState());
// store.dispatch(
//     {
//         type: 'ADD_MOVIES',
//         movies: [{ name: 'Superman' }]
//     }
// );
// console.log('After State', store.getState());

ReactDOM.render(<App store={store} />, document.getElementById('root'));
