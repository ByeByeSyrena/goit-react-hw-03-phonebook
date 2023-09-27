import React, { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit(name, number);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <h1>Phonebook</h1>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
          value={name}
        />

        <h3>Number</h3>
        <input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
          value={number}
        />

        <button type="submit" className={css.buttonAddContact}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
