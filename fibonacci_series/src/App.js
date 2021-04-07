import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      fibonacciSeries:[],
      isClicked:false,
      currentPage: 1,
      todosPerPage: 10,
      value:''
    }
  }
  handleClick =(event) =>{
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  fibonacci = (event) => {
    let num = event.target.value;
    if (isNaN(num) || num < 0 || event.target.value[0] === '0' || num > 2000) {
      num = '';
     }
     this.setState({value:num,isClicked:false})
    let fib = [0, 1];
    let data = [];
    
    for(let i = 2; i <= num; i++) {
      fib[i] = fib[i - 1] + fib[i - 2]; 
      data.push(fib[i]);
    }
    let fibonacciSeries = data.filter((item) => {
      if(item<num) {
        return item;
      }
    })
    this.setState({fibonacciSeries:fibonacciSeries})
  }
  
  quicksort = (arr) => {
    if (arr.length <= 1)
    return arr;
  let pp = Math.floor(arr.length / 2), pivot = arr[pp];
  const left = [], right = [];
  for (var i = 0; i < arr.length; i++) {
    if (i == pp) continue;
    if (arr[i] < pivot) {
      left.push(arr[i]);
    }
    else {
      right.push(arr[i]);
    }
  }
  return this.quicksort(left).concat(pivot, this.quicksort(right));

  }
  handleSort =() =>{
   let sortedArray =this.quicksort(this.state.fibonacciSeries);
   this.setState({fibonacciSeries:sortedArray,isClicked:true})
  }
  render(){
    const { fibonacciSeries, currentPage, todosPerPage } = this.state;
    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = fibonacciSeries.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
      return <span className="fibonacciItem" key={index}>{todo}</span>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    console.log(fibonacciSeries);
    console.log(todosPerPage);
    for (let i = 1; i <= Math.ceil(fibonacciSeries.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <span className="pageNumber"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </span>
      );
    });

    return (
    <div className="App">
      <div className="form-group">
        <input type="number"
          className="form-control" name="number" value={this.state.value} id="number" pattern="\d+" min="1" max="2000" onChange={this.fibonacci} aria-describedby="input" />      
      </div>
     
      {this.state.fibonacciSeries?.length>1?<div>
        <button type="button" className="btn btn-primary" data-toggle="button" onClick={this.handleSort} aria-pressed="false" autocomplete="off">Sort</button>
      </div>:''}
      {this.state.isClicked?<div>
        {currentTodos.map((item, index) => {
          for(let i = 2; i < item; i++) {
            if(item % i === 0) return <span className="fibonacciItem compositeNum" key={index}>{item}-Comp </span>;
            return <span className="fibonacciItem primeNum" key={index}>{item}-Prime</span>;
          }
        })}
      </div>:<div> {renderTodos}</div>}
        <div id="page-numbers">
          {renderPageNumbers}
        </div>
    </div>
  );
 }
}

export default App;
