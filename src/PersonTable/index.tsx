import React from "react";
import { Person } from "../types";

import './Table.css';

const PersonTable = ({ persons, removeFunction }: { persons: Array<Person>, removeFunction:  (removableId: string) => void }) => {

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`Removing ${e.currentTarget.id}`);
    removeFunction(e.currentTarget.id);
  };

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {persons.map(person => (
          <PersonTableRow key={person.id} person={person} handleRemove={handleRemove} />
        ))}
      </tbody>
    </table>
  );
};

const PersonTableRow = ({ person, handleRemove }: { person: Person, handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void }) => (
  <>
    <tr>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>{person.age}</td>
      <td>
        <button id={person.id} onClick={handleRemove}>Remove</button>
      </td>
    </tr>
  </>
);

export default PersonTable;