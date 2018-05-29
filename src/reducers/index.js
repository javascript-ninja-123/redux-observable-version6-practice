import { combineReducers } from 'redux';
import FetchReducer from './fetch';


const rootReducer = combineReducers({
fetch:FetchReducer
});

export default rootReducer;
