import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

function App(props) {

  const [ personsState, setPersonsState ] = useState({
    persons: [
      {name: 'yuji', age: 32},
      {name: 'yabai', age: 28},
      {name: 'sugoi', age: 29}
    ],
    otherState: 'some other value'
  })

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        {name: 'changed-yuji', age: 33},
        {name: 'yabai', age: 28},
        {name: 'sugoi', age: 29}
      ],
      otherState: 'some other value'
    })
  }

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <p>this is it</p>
      <button onClick={ switchNameHandler }>Switch Name</button>
      <Person
        name={ personsState.persons[0].name }
        age={ personsState.persons[0].age }
        click={ switchNameHandler }>My Hobbies: baseball</Person>
      <Person name={ personsState.persons[1].name } />
      <Person name={ personsState.persons[2].name } />
    </div>
  );
}

export default App;
