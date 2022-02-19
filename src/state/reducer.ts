import { Person } from "../types";
import { sortPersons } from "../utils";
import { State } from "./state";


export type Action =
  | {
    type: "SET_PERSONS";
    data: Array<Person>;
  }
  | {
    type: "ADD_PERSON";
    data: Person;
  }
  | {
    type: "UPDATE_PERSON";
    data: Person;
  }
  | {
    type: "REMOVE_PERSON";
    data: Person;
  }
  | {
    type: "CHANGE_SORT";
    data: string;
  };

export const setPersonsAction = (personList: Array<Person>): { type: "SET_PERSONS", data: Person[] } => {
  return {
    type: "SET_PERSONS",
    data: personList
  };
};

export const addPersonAction = (newPerson: Person): { type: "ADD_PERSON", data: Person } => {
  return {
    type: "ADD_PERSON",
    data: newPerson
  };
};

export const updatePersonAction = (editPerson: Person): { type: "UPDATE_PERSON", data: Person } => {
  return {
    type: "UPDATE_PERSON",
    data: editPerson
  };
};

export const removePersonAction = (removePerson: Person): { type: "REMOVE_PERSON", data: Person } => {
  return {
    type: "REMOVE_PERSON",
    data: removePerson
  };
};

export const changeSortAction = (criteria: string): { type: "CHANGE_SORT", data: string } => {
  return { 
    type: "CHANGE_SORT", 
    data: criteria 
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PERSONS":
      return {
        ...state,
        persons: sortPersons(action.data, state.sortBy)
      };

    case "ADD_PERSON":
      return {
        ...state,
        persons: sortPersons([...state.persons, action.data], state.sortBy)
      };

    case "UPDATE_PERSON":
      return {
        ...state,
        persons: sortPersons(state.persons.map(person => person.id === action.data.id ? action.data : person), state.sortBy)
      };

    case "REMOVE_PERSON":
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.data.id)
      };

    case "CHANGE_SORT":
      return {
        ...state,
        sortBy: { sortCriteria: action.data, ascending: !state.sortBy.ascending }
      };

    default:
      return state;
  }
};