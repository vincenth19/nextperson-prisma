"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PersonTable from "./PersonTable";
import PersonDialog from "./PersonDialog";
import SnackbarAlert from "./SnackbarAlert";
import { Person } from "../lib/person";
import { getPeople, createPerson, updatePerson, deletePerson } from '../actions'

const PageHome = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPerson, setCurrentPerson] = useState<Person | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const fetchPeople = async () => {
    try {
      const data = await getPeople();
      console.log(data)
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people data:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const handleOpen = (person: Person | null) => {
    setCurrentPerson(person);
    setEditMode(!!person);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPerson(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deletePerson(id);

      setPeople((prevPeople) =>
        prevPeople.filter((person) => person.id !== id)
      );
      setSnackbarMessage("Record deleted successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error deleting the person:", error);
      setSnackbarMessage("Error deleting the record.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (editMode && currentPerson) {
        response = await updatePerson(currentPerson);
      } else {
        response = await createPerson(currentPerson);
      }

      if (editMode) {
        setPeople((prevPeople) =>
          prevPeople.map((person) =>
            person.id === response.id ? response : person
          )
        );
      } else {
        setPeople((prevPeople) => [...prevPeople, response]);
      }
      setSnackbarMessage("Record saved successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error saving the person:", error);
      setSnackbarMessage("Error saving the record.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Container
        component="main"
        style={{ flex: 1, marginTop: "64px", minHeight: "90dvh" }}
      >
        <Button variant="contained" onClick={() => handleOpen(null)}>
          Add New Person
        </Button>
        <PersonTable
          people={people}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
        />
        <PersonDialog
          open={open}
          editMode={editMode}
          handleClose={handleClose}
          currentPerson={currentPerson}
          setCurrentPerson={setCurrentPerson}
          handleSubmit={handleSubmit}
        />
        <SnackbarAlert
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
        />
      </Container>
    </>
  );
};

export default PageHome;
