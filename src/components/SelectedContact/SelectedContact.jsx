import css from './SelectedContact.module.css';

const SelectedContact = ({ name, number, handleRemove, id }) => {
  return (
    <div className={css.itemWrapper}>
      <span>
        {name}: {number}
      </span>
      <button
        type="button"
        onClick={() => handleRemove(id)}
        className={css.buttonDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default SelectedContact;
