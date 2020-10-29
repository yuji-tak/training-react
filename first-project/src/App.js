import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person';

function App(props) {

  const [ personsState, setPersonsState ] = useState({
    persons: [
      {id: 'iaia', name: 'yuji', age: 32},
      {id: 'akaka', name: 'yabai', age: 28},
      {id: 'lals', name: 'sugoi', age: 29}
    ],
    otherState: 'some other value',
    showPersons: false
  })

  const switchNameHandler = (newName) => {
    setPersonsState({
      persons: [
        {name: newName, age: 33},
        {name: 'yabai', age: 28},
        {name: 'sugoi', age: 29}
      ],
      otherState: 'some other value'
    })
  }

  const nameChangedHandler = (event) => {
    setPersonsState({
      persons: [
        {name: event.target.value, age: 33},
        {name: 'yabai', age: 28},
        {name: 'sugoi', age: 29}
      ],
      otherState: 'some other value'
    })
  }

  const togglePersonsHandler = () => {
    const doesShow = personsState.showPersons
    setPersonsState({
      persons: [
        {name: 'yuji', age: 32},
        {name: 'yabai', age: 28},
        {name: 'sugoi', age: 29}
      ],
      otherState: 'some other value',
      showPersons: !doesShow
    })
  }

  const style = {
    backgroundColor: 'tomato'
  }
  if (personsState.persons[0].name === 'lucky') {
    style.backgroundColor =  'skyblue'
  }

  return (
    <div className="App">
      <h1 style={ style }>Hello world!</h1>
      <p>this is it</p>
      <button onClick={ togglePersonsHandler }>Toggle Persons</button>
      {
        personsState.showPersons ?
        <div>
          {personsState.persons.map(person => {
            return <Person
            name={ person.name }
            age={ person.age }
            key={ person.id }
            />
          })}
        </div> : null
      }
    </div>
  );
}

export default App;
