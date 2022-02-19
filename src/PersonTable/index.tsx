import React from "react";
import { Person } from "../types";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdTrash } from 'react-icons/io';
import './Table.css';
import { changeSortAction, useStateValue } from "../state";

const PersonTable = ({ removeFunction, editModalState }: { removeFunction: (removableId: string) => void, editModalState: (id: string) => void }) => {
  const [state, dispatch] = useStateValue();

  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    removeFunction(event.currentTarget.id);
  };

  return (
    <table className="Table">
      <thead>
        <tr>
          <th onClick={() => dispatch(changeSortAction("firstName"))}>
            First Name<SortIcon  header='firstName' />
          </th>
          <th onClick={() => dispatch(changeSortAction("lastName"))}>
            Last Name<SortIcon header='lastName' />
          </th>
          <th onClick={() => dispatch(changeSortAction("age"))}>
            Age<SortIcon header='age' />
          </th>
          <th>Remove </th>
        </tr>
      </thead>
      <tbody>
        {state.persons.map(person => (
          <PersonTableRow key={person.id} person={person} handleRemove={handleRemove} editModalState={editModalState} />
        ))}
      </tbody>
    </table>
  );
};

const PersonTableRow = ({ person, handleRemove, editModalState }: { person: Person, handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void, editModalState: (id: string) => void }) => (
  <>
    <tr onClick={() => editModalState(person.id)}>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.age}</td>
      <td>
        <button id={person.id} onClick={handleRemove}><IoMdTrash /></button>
      </td>
    </tr>
  </>
);

const SortIcon = ({ header }: { header: string }) => {
  const [state] = useStateValue();
  if (state.sortBy.sortCriteria === header) {
    if (!state.sortBy.ascending) {
      return <IoMdArrowDropdown />;
    } else {
      return <IoMdArrowDropup />;
    }
  }

  return null;
};

export default PersonTable;