import React, { Component } from 'react';

import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../_axios-order';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState( { loading: true } );

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    }

    axios.post('/orders.json', order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    // 下記の方法ではshallow copyになるらしい
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[ inputIdentifier ]
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[ inputIdentifier ] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm })
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {/* map内は{}ではなく、() */}
        { formElementsArray.map(formElement => (
          <Input
            key={ formElement.id }
            elementType={ formElement.config.elementType }
            elementConfig={ formElement.config.elementConfig }
            value={ formElement.config.value }
            changed={ (event) => this.inputChangedHandler(event, formElement.id) } />
        )) }
        <Button
          btnType="Success"
          clicked={ this.orderHandler }>ORDER</Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={ classes.ContactData }>
        <h4>Enter Your Contact Data</h4>
        { form }
      </div>
    );
  }
}

export default ContactData;
