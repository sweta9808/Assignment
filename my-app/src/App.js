import React, { Component } from 'react';

//APP
class App extends Component {
    render() {
      const list = this.props.list && this.props.list.map(id => {
        return <option key={id} value={id}>{id}</option>
      })
  
      const departments = this.props.departments && this.props.departments.map(dept => {
        return <option key={dept} value={dept}>{dept}</option>
      })
  
      const details = <>
        <img src={this.props.data && this.props.data.avatar}/>
        <div><strong>ID: </strong>{this.props.data && this.props.data.id}</div>
        <div>{this.props.data && this.props.data.first_name + " "}{this.props.data && this.props.data.last_name}</div>
      </>
  
      return (<>
          <div className="Input row container">
            <div >
            <label>Department</label>
              <select id="department" data-testid="select-department" onChange={this.props.handleDepartmentChange}>
                {departments}
              </select>
            </div>
            <div>
            <label>Employment ID</label>
              <select id="emp" data-testid="emp-id" onChange={this.props.handleEmployeeIdChange}>
                {list}
              </select>
            </div>
  
            <div>
                <button id="button" data-testid="get-details" onClick={() => this.props.handleShowDetails(`https://reqres.in/api/users/${this.props.employee}`)}>Show Details</button>
            </div>
            <div>
                <button id="clear" data-testid="clear-all" onClick={this.props.handleClear}>Clear</button>
            </div>
          </div>
  
          <div className="Output">
            {this.props.showDetails && details}
          </div>
          </>
      )
    }
  
    componentDidMount() {
      this.props.adjustUI(this.props.departments[0], this.props.list[0])
    }
  }

  export default App;
