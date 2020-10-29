import React from 'react';
import './App.css';
import Person from './Person/Person';

function App() {
  const persons = [
    {name: 'yuji', age: 32},
    {name: 'yabai', age: 28},
    {name: 'sugoi', age: 29}
  ]

  const switchNameHandler = () => {
    console.log('clicked!')
  }

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <p>this is it</p>
      <button onClick={ switchNameHandler }>Switch Name</button>
      <Person name={ persons[0].name } age={ persons[0].age }>My Hobbies: baseball</Person>
      <Person name={ persons[1].name } />
      <Person name={ persons[2].name } />
    </div>
  );

  // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello world!!!'));
}

// class App extends Componet {
//   render() {
//     return (
//       <div className="App">
//         <h1>Hello world!</h1>
//       </div>
//     )
//   }
// }

export default App;
