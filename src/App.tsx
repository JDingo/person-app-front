import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import PersonTable from './PersonTable';
import { Person } from './types';

const App = () => {
  const [persons, setPersons] = useState<Array<Person>>([]);

  console.log(setPersons);

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

  return (
    <div className="App">
      <PersonTable persons={persons} />
    </div>
  );
};

export default App;
