import React from 'react';

const person = (props) => {
return (
    <div>
      <p onClick={ props.click }>{ props.name } is here { props.age }</p>
      <p>{ props.children }</p>
      <input type="text" onChange={ props.changed } />
    </div>
  )
}

export default person;
