import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonTable from './PersonTable';
import { Person } from './types';

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);

  useEffect(() => {
    setPersons([
      {
        firstname: "Pekka",
        lastname: "Hyvärinen",
        age: 60,
        id: "1"
      },
      {
        firstname: "Sami",
        lastname: "Salami",
        age: 14,
        id: "2"
      },
      {
        firstname: "Liisa",
        lastname: "Loskanen",
        age: 34,
        id: "3"
      },
      {
        firstname: "Anna",
        lastname: "Tulla",
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
      console.log(`Selected person (${removableId}) => ${removedPerson.firstname} ${removedPerson.lastname}`);
      setPersons(persons.filter(person => person.id !== removableId));
    }
  };

  return (
    <div className="App">
      <PersonTable persons={persons} removeFunction={removePerson} />
    </div>
  );
};

export default App;
