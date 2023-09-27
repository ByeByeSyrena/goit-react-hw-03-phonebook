import SelectedContact from 'components/SelectedContact/SelectedContact';
import css from './ContactList.module.css';

const ContactForm = ({ filteredContacts, handleRemove }) => {
  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={css.listItem}>
          <SelectedContact
            name={contact.name}
            number={contact.number}
            handleRemove={handleRemove}
            id={contact.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactForm;
