import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonTable from './PersonTable';
import { newPerson, Person } from './types';

import './App.css';
import AddPersonModal from './AddPersonModal';

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  const [newPersonModalOpen, setNewPersonModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setPersons([
      {
        firstName: "Pekka",
        lastName: "Hyvärinen",
        age: 60,
        id: "1"
      },
      {
        firstName: "Sami",
        lastName: "Salami",
        age: 14,
        id: "2"
      },
      {
        firstName: "Liisa",
        lastName: "Loskanen",
        age: 34,
        id: "3"
      },
      {
        firstName: "Anna",
        lastName: "Tulla",
        age: 56,
        id: "4"
      }
    ]);
  }, []);

  const removePerson = (removableId: string) => {
    const removedPerson = persons.find(person => person.id === removableId);
    if (!removedPerson) {
      console.log("Not found!");
    } else {
      console.log(`Selected person (${removableId}) => ${removedPerson.firstName} ${removedPerson.lastName}`);
      setPersons(persons.filter(person => person.id !== removableId));
    }
  };

  const addPerson = ({ firstName, lastName, age }: newPerson) => {
    const newPerson: Person = {
      firstName,
      lastName,
      age,
      id: (Math.random() * 100).toString()
    };
    
    const newPersons = [...persons, newPerson];
    console.log("Added new person", newPerson);
    setPersons(newPersons);
    setNewPersonModalOpen(false);
  };

  const openNewPersonModal = () => {
    setNewPersonModalOpen(!newPersonModalOpen);
  };

  return (
    <div className="App" >
      <h1>Person Database</h1>
      <h3>Person Table</h3>
      <PersonTable persons={persons} removeFunction={removePerson}/>
      <AddPersonModal modalOpen={newPersonModalOpen} addFunction={addPerson} closeModal={openNewPersonModal}/>
      <button onClick={openNewPersonModal}>Add new person</button>
    </div>
  );
};

export default App;
