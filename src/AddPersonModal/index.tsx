import React, { FormEvent } from 'react';
import { NewPerson } from '../types';
import { isNumber, isString } from '../utils';
import './AddPersonModal.css';

const AddPersonModal = ({ modalOpen, addFunction, closeModal }: 
  { modalOpen: boolean, 
    addFunction: ({ firstName, lastName, age }: NewPerson) => void,
    closeModal: () => void
  }) => {
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const firstName: unknown = e.currentTarget.firstName.value;
    const lastName: unknown = e.currentTarget.lastName.value;
    const age: unknown = e.currentTarget.age.value;

    if (isString(firstName) && isString(lastName) && isNumber(age)) {
      const newPerson: NewPerson = {
        firstName,
        lastName,
        age: parseInt(age)
      };
      addFunction(newPerson);
    } else {
      console.log("Error in form data");
    }
  };

  const handleClose = () => {
    closeModal();
  };
  
  if (!modalOpen) {
    return null;
  } else {
    return (
      <div className="Modal">
        <h3>Add New Person</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First name: </label>
            <input type="text" name="firstName" id="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">Last name: </label>
            <input type="text" name="lastName" id="lastName" required />
          </div>
          <div>
            <label htmlFor="age">Age: </label>
            <input type="text" name="age" id="age" required />
          </div>
          <div>
            <input id="Button" type="submit" value="Add" />
            <button id="Button" onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    );
  }
};

export default AddPersonModal;