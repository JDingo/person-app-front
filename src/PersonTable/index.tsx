import React from "react";
import { Person } from "../types";

const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log(e.currentTarget.id, typeof e.currentTarget.id);
};

console.log(handleRemove);

const PersonTable = ({ persons }: { persons: Array<Person> }) => {
  console.log(persons);

  return (
    <table>
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
          <PersonTableRow key={person.id} person={person} />
        ))}
      </tbody>
    </table>
  );
};

const PersonTableRow = ({ person }: { person: Person }) => (
  <>
    <tr>
      <td>{person.firstname}</td>
      <td>{person.lastname}</td>
      <td>{person.age}</td>
      <td>
        <button id={person.id} onClick={handleRemove}>Remove</button>
      </td>
    </tr>
  </>
);

export default PersonTable;