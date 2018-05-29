import  {
  FETCH_DATA,
  FETCH_DATA_FAILED,
  FETCH_SUCCEED,
  FETCH_CONCAT_SUCCEED,
  FETCH_DATA_CONCAT,
  FETCH_CONCATDATA_FAILED
} from '../actions/type';


const INITIAL_STATE = {
  loading:false,
  list1:null,
  list2:null,
  error:null
}

export default (state =INITIAL_STATE,action) => {
  switch(action.type){
    case FETCH_DATA:
    return {...state, loading:true};
    case FETCH_SUCCEED:
    return {...state, loading:false, [`list${action.payload.list}`]:action.payload.obj};
    case FETCH_DATA_FAILED:
    return {...state, loading:false, error:action.payload};
    case FETCH_CONCAT_SUCCEED:
    console.log(action.payload)
    default:
    return state;
  }
}
