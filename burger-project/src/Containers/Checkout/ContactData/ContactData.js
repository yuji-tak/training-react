import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: '',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState( { loading: true } );

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: Number.parseFloat(this.props.price).toFixed(2),
      orderData: formData
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

  checkValidity(value, rules) {
    let isValid = false;

    // 論理積&&を用い、求める全ての条件に合致する場合のみtrueを返している
    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
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
    // checkValidityメソッドで左辺へ真偽値を代入している
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[ inputIdentifier ] = updatedFormElement;

    let formIsValid = true;
    // deliveryMethodにvalidプロパティがない為、1つでもそのような条件があると下記の式でundefinedを返してしまう
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
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
      <form onSubmit={this.orderHandler}>
        {/* map内は{}ではなく、() */}
        { formElementsArray.map(formElement => (
          <Input
            key={ formElement.id }
            elementType={ formElement.config.elementType }
            elementConfig={ formElement.config.elementConfig }
            value={ formElement.config.value }
            invalid={ !formElement.config.valid }
            shouldValidate={ formElement.config.validation }
            touched={ formElement.config.touched }
            changed={ (event) => this.inputChangedHandler(event, formElement.id) } />
        )) }
        <Button
          btnType="Success"
          disabled={ !this.state.formIsValid }>
            ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);
