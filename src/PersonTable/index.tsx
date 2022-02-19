import React from "react";
import { Person, SortBy } from "../types";
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdTrash } from 'react-icons/io';
import './Table.css';

const PersonTable = ({ persons, removeFunction, sortBy, setSortBy }: { persons: Array<Person>, removeFunction: (removableId: string) => void, sortBy: SortBy, setSortBy: React.Dispatch<React.SetStateAction<SortBy>> }) => {

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFunction(e.currentTarget.id);
  };

  return (
    <table className="Table">
      <thead>
        <tr>
          <th onClick={() => setSortBy({ sortCriteria: 'firstName', ascending: !sortBy.ascending })}>
            First Name<SortIcon sortBy={sortBy} header='firstName' />
          </th>
          <th onClick={() => setSortBy({ sortCriteria: 'lastName', ascending: !sortBy.ascending })}>
            Last Name<SortIcon sortBy={sortBy} header='lastName' />
          </th>
          <th onClick={() => setSortBy({ sortCriteria: 'age', ascending: !sortBy.ascending })}>
            Age<SortIcon sortBy={sortBy} header='age' />
          </th>
          <th>Remove </th>
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
        <button id={person.id} onClick={handleRemove}><IoMdTrash /></button>
      </td>
    </tr>
  </>
);

const SortIcon = ({ sortBy, header }: { sortBy: SortBy, header: string }) => {
  if (sortBy.sortCriteria === header) {
    if (!sortBy.ascending) {
      return <IoMdArrowDropdown />;
    } else {
      return <IoMdArrowDropup />;
    }
  }

  return null;
};

export default PersonTable;