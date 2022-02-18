import { Person, SortBy } from "./types";

export const isString = (x: unknown): x is string => {
  return typeof x === "string";
};

export const isNumber = (x: unknown): x is string => {
  return (typeof x === "string" && !isNaN(parseInt(x)));
};

export const sortPersons = (persons: Array<Person>, sortBy: SortBy) => {
  const sortedPersons = [...persons];

  switch (sortBy.sortCriteria) {
    case "firstName":
      sortedPersons.sort(sortByFirstName);
      break;

    case "lastName":
      sortedPersons.sort(sortByLastName);
      break;

    case "age":
      sortedPersons.sort(sortByAge);
      break;
  }

  console.log("Sorted:", sortedPersons);
  if (sortBy.ascending) {
    return sortedPersons.reverse();
  } else {
    return sortedPersons;
  }
};

const sortByFirstName = (a: Person, b: Person) => {
  if (a.firstName < b.firstName) {
    return -1;
  } else if (a.firstName > b.firstName) {
    return 1;
  } else {
    return 0;
  }
};

const sortByLastName = (a: Person, b: Person) => {
  if (a.lastName < b.lastName) {
    return -1;
  } else if (a.lastName > b.lastName) {
    return 1;
  } else {
    return 0;
  }
};

const sortByAge = (a: Person, b: Person) => {
  if (a.age < b.age) {
    return -1;
  } else if (a.age > b.age) {
    return 1;
  } else {
    return 0;
  }
};