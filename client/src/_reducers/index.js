import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({//여러가지 리듀셔를 합쳐주는 기능이다. 기능이 많아질수록 리듀서가 많아진다.
    user
})

export default rootReducer;