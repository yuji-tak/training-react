import React, { Component } from 'react';

import classes from './ContactData.module.css';

import Button from '../../../Components/UI/Button/Button';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render () {
    console.log('hi')
    return (
      <div className={ classes.ContactData }>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={ classes.Input } type="text" name="name" placeholder="Your Name"/>
          <input className={ classes.Input } type="email" name="email" placeholder="Your Mail"/>
          <input className={ classes.Input } type="text" name="street" placeholder="Your Street"/>
          <input className={ classes.Input } type="text" name="postal" placeholder="Postal Code"/>
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
