"use server";

import { Person } from "./lib/person";

export async function createPerson(newPerson: Person | null) {
  const response = await fetch(`${process.env.API_URL}/people`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPerson),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error("Create error: ", error);
  }
  const result = await response.json();
  return result;
}

export async function getPeople() {
  const response = await fetch(`${process.env.API_URL}/people`, {
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Get People error: ${JSON.stringify(error)}`);
  }
  const result = await response.json();
  return result;
}

export async function updatePerson(personData: Person | null) {
  const response = await fetch(
    `${process.env.API_URL}/people/${personData?.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Update person error: ${JSON.stringify(error)}`);
  }
  const result = await response.json();
  return result;
}

export async function deletePerson(toDeletePersonId: number | null) {
  const response = await fetch(
    `${process.env.API_URL}/people/${toDeletePersonId}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Delete person error: ${JSON.stringify(error)}`);
  }
  return true;
}
