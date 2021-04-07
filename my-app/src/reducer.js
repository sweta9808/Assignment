export const initialState = {
    department: null,
    employee: null,
    departments: ["HR", "ENGINEERS"],
    hrs: [1,2,3,4,5],
    engineers: [6,7,8,9],
    list: [1,2,3,4,5],
    data: null,
    showDetails: false
  };

//REDUCER
export const reducer = function(state=initialState, {type, payload}) {
    const newState = {...state}
    switch(type) {
      case "UPDATE_DEPARTMENT_AND_EMPLOYEE":
        return {...state, ...payload}
      case "UPDATE_DEPARTMENT_ASYNC":
        return {...state, ...payload}
      case "UPDATE_EMPLOYEE":
        return {...state, ...payload}
      case "UPDATE_DATA_ASYNC":
        return {...state, ...payload}
      case "CLEAR":
        return {...state, ...payload}
      default: 
        return newState
    }
  }
  