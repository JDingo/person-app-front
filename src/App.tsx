import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonTable from './PersonTable';
import { NewPerson, Person } from './types';

import './App.css';
import AddPersonModal from './AddPersonModal';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  const [newPersonModalOpen, setNewPersonModalOpen] = useState<boolean>(false);

  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    const fetchPersonsList = async () => {
      try {
        const response = await axios.get<Person[]>(
          `${baseUrl}/api/persons`
        );

        setPersons(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPersonsList();
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

  const addPerson = async ({ firstName, lastName, age }: NewPerson) => {
    try {
      const newPerson = {
        firstName,
        lastName,
        age
      };

      const { data: addedPerson } = await axios.post<Person>(`${baseUrl}/api/persons`, newPerson);
      
      const newPersons = [...persons, addedPerson];
      console.log("Added new person", newPerson);
      setPersons(newPersons);
      setNewPersonModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const openNewPersonModal = () => {
    setNewPersonModalOpen(!newPersonModalOpen);
  };

  return (
    <div className="App" >
      <h1>Person Database</h1>
      <h3>Person Table</h3>
      <PersonTable persons={persons} removeFunction={removePerson} />
      <AddPersonModal modalOpen={newPersonModalOpen} addFunction={addPerson} closeModal={openNewPersonModal} />
      <button onClick={openNewPersonModal}>Add new person</button>
    </div>
  );
};

export default App;