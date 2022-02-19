import React, { FormEvent } from 'react';
import { Person } from '../types';
import { isNumber, isString } from '../utils';
import './EditPersonModal.css';

const EditPersonModal = ({ modalOpen, editFunction, closeModal, selectedPerson }: 
  { modalOpen: boolean, 
    editFunction: ({ firstName, lastName, age, id }: Person) => void,
    closeModal: (id: string) => void,
    selectedPerson: Person | undefined
  }) => {
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const firstName: unknown = e.currentTarget.firstName.value;
    const lastName: unknown = e.currentTarget.lastName.value;
    const age: unknown = e.currentTarget.age.value;

    if (isString(firstName) && isString(lastName) && isNumber(age) && selectedPerson) {
      const updatedPerson: Person = {
        firstName,
        lastName,
        age: parseInt(age),
        id: selectedPerson.id
      };
      editFunction(updatedPerson);
    } else {
      console.log("Error in form data");
    }

  };

  const handleClose = () => {
    closeModal("");
  };
  
  if (!modalOpen || !selectedPerson) {
    return null;
  } else {
    console.log("open");
    return (
      <div className="Modal">
        <h3>Edit Person </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First name: </label>
            <input type="text" name="firstName" id="firstName" defaultValue={selectedPerson.firstName} required />
          </div>
          <div>
            <label htmlFor="lastName">Last name: </label>
            <input type="text" name="lastName" id="lastName" defaultValue={selectedPerson.lastName} required />
          </div>
          <div>
            <label htmlFor="age">Age: </label>
            <input type="text" name="age" id="age" defaultValue={selectedPerson.age} required />
          </div>
          <div>
            <input id="Button" type="submit" value="Edit" />
            <button id="Button" onClick={handleClose}>Close</button>
          </div>
        </form>
      </div>
    );
  }
};

export default EditPersonModal;