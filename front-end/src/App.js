import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      students: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3000/getStudents')
    .then((response)=>{
      console.log(response)
      this.setState({
        students: response.data
      })
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const studentName = document.getElemebtById('new-student').value
    // console.dir(event.target);
    // We went to send studentName to the server.
    // We CANNOT use get. We neeed to use post.
    // There is an axios.post and there is axios ({})
    // axios always returns a promise, so we will send data
    // to the express server, and wait for a JSON response.
    // When we get it, we will move forward

    axios({
      method: "POST",
      url: "http://localhost:3000/addStudent",
      data: {
        studentName: studentName
      }
    }).then((data)=>{
      console.log(data);
    })
  }
  render() {
    var studentsArray = this.state.students.map((student,i)=>{
      return(<li key={i}>{student.name}</li>)
    })
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type='text' id='new-student' placeholder='New Student' />
          <button type='submit'>Add Student</button>
        </form>
        <ul>
          {studentsArray}
        </ul>
      </div>
    );
  }
}

export default App;
