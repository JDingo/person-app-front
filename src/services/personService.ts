import axios from "axios";
import { NewPerson, Person } from "../types";
import { addPersonAction, removePersonAction, updatePersonAction, useStateValue } from "../state";

const baseUrl = '/api/persons';
const [state, dispatch] = useStateValue();

export const removePerson = async (removableId: string) => {
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

export const addPerson = async ({ firstName, lastName, age }: NewPerson) => {
  try {
    const newPerson = {
      firstName,
      lastName,
      age
    };

    const { data: addedPerson } = await axios.post<Person>(`${baseUrl}`, newPerson);
    dispatch(addPersonAction(addedPerson));
    // setNewPersonModalOpen(false);
  } catch (e) {
    console.error(e);
  }
};

export const editPerson = async (editPerson: Person) => {
  try {
    const { data: editedPerson } = await axios.put<Person>(`${baseUrl}/${editPerson.id}`, editPerson);
    dispatch(updatePersonAction(editedPerson));
    // setNewPersonModalOpen(false);
  } catch (e) {
    console.error(e);
  }
};