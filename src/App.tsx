import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonTable from './PersonTable';
import { NewPerson, Person, SortBy } from './types';

import './App.css';
import AddPersonModal from './AddPersonModal';
import axios from 'axios';
import { sortPersons } from './utils';

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);
  const [newPersonModalOpen, setNewPersonModalOpen] = useState<boolean>(false);

  const startSort: SortBy = { sortCriteria: 'firstName', ascending: false };
  const [sortBy, setSortBy] = useState<SortBy>(startSort);

  const baseUrl = 'http://localhost:3001';

  useEffect(() => {
    const fetchPersonsList = async () => {
      try {
        const response = await axios.get<Person[]>(
          `${baseUrl}/api/persons`
        );

        setPersons(sortPersons(response.data, sortBy));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPersonsList();
  }, []);

  useEffect(() => {
    setPersons(sortPersons(persons, sortBy));
  }, [sortBy]);

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
      <PersonTable persons={persons} removeFunction={removePerson} sortBy={sortBy} setSortBy={setSortBy} />
      <AddPersonModal modalOpen={newPersonModalOpen} addFunction={addPerson} closeModal={openNewPersonModal} />
      <button onClick={openNewPersonModal}>Add new person</button>
    </div>
  );
};

export default App;