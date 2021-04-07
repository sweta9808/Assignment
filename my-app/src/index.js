import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import {Provider, connect} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import {delay, call, takeEvery, takeLatest, put, select, all} from 'redux-saga/effects'

import App from './App';

import { reducer } from './reducer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

//SAGA
const sagaMiddleware = createSagaMiddleware()

function fetchApi(url) {
    return Promise.resolve(fetch(url)
      .then(res => res.json())
      .then(data => data.data)
)}


function* dataAsync(action) {
	yield delay(500)
  const state = yield select()
  if(state.employee) {
    const data = yield call(fetchApi, action.payload.url)
    // const data = yield fetchApi(action.payload.url)
    yield put({type: "UPDATE_DATA_ASYNC", payload: {data, showDetails: true}})
  }
}

function* departmentHrAsync(action) {
  const state = yield select()
	yield put({type: "UPDATE_DEPARTMENT_ASYNC", payload: {list: state.hrs, employee: state.hrs[0]}})
}

function* departmentEngineersAsync(action) {
  const state = yield select()
 	yield put({type: "UPDATE_DEPARTMENT_ASYNC", payload: {list: state.engineers, employee: state.engineers[0]}})
}


function* watchSomething() {
  yield all([
    takeLatest("UPDATE_DATA", dataAsync),
    takeEvery("UPDATE_DEPARTMENT_HR", departmentHrAsync),
    takeEvery("UPDATE_DEPARTMENT_ENGINEERS", departmentEngineersAsync)
  ])
}





//MIDDLEWARE
const middleware = [sagaMiddleware]



//STORE
const store = createStore(reducer, applyMiddleware(...middleware))
sagaMiddleware.run(watchSomething)


//ACTION CREATORS
const adjustUI = (department, employee) => {
  return {type: "UPDATE_DEPARTMENT_AND_EMPLOYEE", payload: {department, employee}}
}

const handleDepartmentChange = (e) => {
    const value = e.target.value
    if(value === "HR") {
        return {type: "UPDATE_DEPARTMENT_HR", payload: {department: value}}
    } else {
        return {type: "UPDATE_DEPARTMENT_ENGINEERS", payload: {department: value}}
    }
}

const handleEmployeeIdChange = (e) => {
  const value = e.target.value
  return {type: "UPDATE_EMPLOYEE", payload: {employee: value}}
}

const handleClear = () => {
  return {type: "CLEAR", payload: {hrs: null, engineers: null, list: null, departments: null, department: null, employee: null, showDetails: false}}
}

const handleShowDetails = (url) => {
    return {type: "UPDATE_DATA", payload: {url}}
}



//MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  department: state.department,
  employee: state.employee,
  departments: state.departments,
  hrs: state.hrs,
  engineers: state.engineers,
  list: state.list,
  data: state.data,
  showDetails: state.showDetails
})



//MAP DISPATCH TO PROPS
const mapDispatchToProps = {
  handleDepartmentChange: handleDepartmentChange,
  handleEmployeeIdChange: handleEmployeeIdChange,
  handleShowDetails: (url) => handleShowDetails(url),
  handleClear: handleClear,
  adjustUI: adjustUI
}



//CONNECT
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
const reduxApp = (
  <Provider store={store}>
    <ConnectedApp/>
  </Provider>
)
render(reduxApp, document.getElementById('root'));
