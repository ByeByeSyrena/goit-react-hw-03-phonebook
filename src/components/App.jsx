import React, { Component } from 'react';
import 'normalize.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  loginInputId = nanoid();

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (name, number) => {
    const { contacts } = this.state;

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));

    this.reset();
  };

  handleRemove = contactId => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== contactId
    );

    this.setState({ contacts: updatedContacts });
  };

  showSelectedContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.showSelectedContact();

    return (
      <>
        <ContactForm onSubmit={this.handleSubmit} />
        <Filter
          handleChange={this.handleChange}
          filter={filter}
          loginInputId={this.loginInputId}
        />
        <ContactList
          filteredContacts={filteredContacts}
          handleRemove={this.handleRemove}
        />
      </>
    );
  }
}
