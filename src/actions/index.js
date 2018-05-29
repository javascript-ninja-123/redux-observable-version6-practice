

import  {
  FETCH_DATA,
  FETCH_DATA_FAILED,
  FETCH_SUCCEED,
  FETCH_CONCAT_SUCCEED,
  FETCH_DATA_CONCAT,
  FETCH_CONCATDATA_FAILED
} from './type';


export const onClick = () => (
  {
    type:FETCH_DATA
  }
)

export const onClickConcat = () => (
  {
    type:FETCH_DATA_CONCAT
  }
)


export const fetchFailed = err => (
  {
    type:FETCH_DATA_FAILED,
    payload:err
  }
)

export const fetchFufilled = payload => (
  {
    type:FETCH_SUCCEED,
    payload
  }
)


export const fetchConcatFufilled = payload => (
  {
    type:FETCH_CONCAT_SUCCEED,
    payload
  }
)

export const fetchConcatFailed = err => (
  {
    type:FETCH_CONCATDATA_FAILED,
    payload:err
  }
)
