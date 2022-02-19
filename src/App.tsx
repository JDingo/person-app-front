import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonTable from './PersonTable';
import { NewPerson, Person } from './types';

import './App.css';
import AddPersonModal from './AddPersonModal';
import axios from 'axios';
import EditPersonModal from './EditPersonModal';
import { addPersonAction, removePersonAction, setPersonsAction, updatePersonAction, useStateValue } from './state';

const App = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(undefined);

  const [newPersonModalOpen, setNewPersonModalOpen] = useState<boolean>(false);
  const [editPersonModalOpen, setEditPersonModalOpen] = useState<boolean>(false);

  const [state, dispatch] = useStateValue();

  const baseUrl = '/api/persons';

  useEffect(() => {
    const fetchPersonsList = async () => {
      try {
        const response = await axios.get<Person[]>(
          `${baseUrl}`
        );

        dispatch(setPersonsAction(response.data));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPersonsList();
  }, []);

  useEffect(() => {
    dispatch(setPersonsAction(state.persons));
  }, [state.sortBy]);

  const removePerson = async (removableId: string) => {
    const removedPerson = state.persons.find(person => person.id === removableId);
    if (!removedPerson) {
      console.log("Not found!");
    } else {
      const response = await axios.delete(`${baseUrl}/${removableId}`);
      if (response.status == 204) {
        dispatch(removePersonAction(removedPerson));
      } else {
        console.error("Error", response.status);
      }
    }
  };
  
  const addPerson = async ({ firstName, lastName, age }: NewPerson) => {
    try {
      const newPerson = {
        firstName,
        lastName,
        age
      };
  
      const { data: addedPerson } = await axios.post<Person>(`${baseUrl}`, newPerson);
      dispatch(addPersonAction(addedPerson));
      setNewPersonModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const editPerson = async (editPerson: Person) => {
    try {
      const { data: editedPerson } = await axios.put<Person>(`${baseUrl}/${editPerson.id}`, editPerson);
      dispatch(updatePersonAction(editedPerson));
      setEditPersonModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const changeAddModalVisibility = () => {
    setNewPersonModalOpen(!newPersonModalOpen);
  };

  const changeEditModalVisibility = (id: string) => {
    const selectedPerson = state.persons.find(person => person.id == id);
    setSelectedPerson(selectedPerson);
    setEditPersonModalOpen(!editPersonModalOpen);
  };

  return (
    <div className="App" >
      <h1>Person Database</h1>
      <h3>Person Table</h3>
      <PersonTable removeFunction={removePerson} editModalState={changeEditModalVisibility}/>
      <AddPersonModal modalOpen={newPersonModalOpen} addFunction={addPerson} closeModal={changeAddModalVisibility} />
      <EditPersonModal modalOpen={editPersonModalOpen} editFunction={editPerson} closeModal={changeEditModalVisibility} selectedPerson={selectedPerson} />
      <button onClick={changeAddModalVisibility}>Add new person</button>
    </div>
  );
};

export default App;