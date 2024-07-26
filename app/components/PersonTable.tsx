//'use client'

import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Person } from "../lib/person";

interface PersonTableProps {
  people: Person[];
  handleOpen: (person: Person | null) => void;
  handleDelete: (id: number) => void;
}

const PersonTable: React.FC<PersonTableProps> = ({
  people,
  handleOpen,
  handleDelete,
}) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => {
            const _date = new Date(person.dateOfBirth);

            return (
              <TableRow key={person.id}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.phoneNumber}</TableCell>
                <TableCell>{`${_date.getUTCDate()}/${_date.getUTCMonth()+1}/${_date.getUTCFullYear()}`}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(person)}>Edit</Button>
                  <Button onClick={() => handleDelete(person.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PersonTable;
