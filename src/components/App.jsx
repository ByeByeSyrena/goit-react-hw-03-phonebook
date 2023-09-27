import React, { Component } from 'react';
import 'normalize.css';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  loginInputId = nanoid();

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

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

    localStorage.setItem('newContact', JSON.stringify(newContact));

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

  componentDidMount() {
    const savedContact = localStorage.getItem('newContact');

    if (savedContact) {
      try {
        const parsedContact = JSON.parse(savedContact);

        this.setState(prevState => ({
          contacts: [...prevState.contacts, parsedContact],
        }));
      } catch (error) {
        console.log(error.name);
        console.log(error.message);
      }
    }
  }

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
