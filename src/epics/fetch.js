import {Observable,of,defer,from,getJSON,empty} from 'rxjs'
import {mergeMap,ignoreElements,tap,concatMap,catchError,map,switchMap,groupBy,debounceTime,toArray,filter} from 'rxjs/operators'
import  {
  FETCH_DATA,
  FETCH_SUCCEED,
  FETCH_DATA_FAILED,
  FETCH_DATA_CONCAT
} from '../actions/type';
import {
  fetchFailed,
  fetchFufilled,
  fetchConcatFufilled,
  fetchConcatFailed
}from '../actions';


const fetchCall = async (url) => {
  const res = await fetch(url);
  return await res.json();
}


const  url = 'https://jsonplaceholder.typicode.com/posts'

const multitpleFetch = Observable.create(async observer => {
    await fetchCall(`${url}/1`)
    .then(obj =>{
      if(Object.keys(obj).length === 0){
        observer.next({type:FETCH_DATA_FAILED, payload:'error occured'})
      }
      observer.next(fetchFufilled({list:1,obj}))
    })
    .catch(err => observer.next(fetchFailed(err)))

    await fetchCall(`${url}/2`)
    .then(obj => {
      if(Object.keys(obj).length === 0){
        observer.next({type:FETCH_DATA_FAILED, payload:'error occured'})
      }
      observer.next({type:FETCH_SUCCEED, payload:{list:2,obj}})
    })
    .catch(err => observer.nexr(fetchFailed(err)))
})



export const fetchEpic$ = (action$) =>
action$.ofType(FETCH_DATA)
.pipe(
  debounceTime(500),
  switchMap(() => defer(() => multitpleFetch))
)


const groupBy2 = Observable.create(async observer => {
  const a = await fetchCall(`${url}`);
  from(a)
  .pipe(
    groupBy(data => data.userId),
    mergeMap(innerObs => {
      return innerObs.pipe(toArray())
    })
  )
  .subscribe(
    (x) => observer.next(x),
    error => observer.error(error),
  )
})


const mergeMap2 = Observable.create(async observer => {
    const a = await fetchCall(`${url}`);
    from(a)
    .pipe(
      mergeMap(obj => {
        if(obj.userId % 2 === 0){
          return of(obj)
        }
        else{
          return empty()
        }
      })
    )
    .subscribe(
      (x) => observer.next(x),
      error => observer.error(error),
    )
})


export const fetchConcatEpic$ = action$ =>
action$.ofType(FETCH_DATA_CONCAT)
.pipe(
  switchMap(() => defer(() => fetchCall(url))),
  mergeMap(data => {
    return from(data)
    .pipe(
      filter(obj => obj % 2 === 0)
    )
  }),
  map(res => fetchConcatFufilled(res)),
  catchError(err => of(fetchConcatFailed(err)))
)
//
//
//
// .pipe(
//   // switchMap(() => defer(() => fetchCall(`${url}/1`)),(outer,{id}) => id + 5),
//   // concatMap(id =>defer(() => fetchCall(`${url}/${id}`))),
//   debounceTime(500),
//   switchMap(() => defer(() => mergeMap2)),
//   map(res => fetchConcatFufilled(res)),
//   catchError(err => of(fetchConcatFailed(err)))
// )






// export const fetchEpic$ = action$ =>
// action$.ofType(FETCH_DATA)
// .pipe(
//   switchMap(() =>
//     defer(() => fetchCall(`${url}/1`))
//     .pipe(
//       map(obj => fetchFufilled({list:1,obj})),
//       catchError(err => of(fetchFailed(err)))
//       )
//     )
//   )
