export interface Person {
  firstName: string,
  lastName: string,
  age: number,
  id: string
}

export type NewPerson = Omit<Person, "id">;

export interface SortBy {
  sortCriteria: string,
  ascending: boolean
}