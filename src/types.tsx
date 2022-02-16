export interface Person {
  firstName: string,
  lastName: string,
  age: number,
  id: string
}

export type newPerson = Omit<Person, "id">;