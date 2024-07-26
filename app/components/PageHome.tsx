"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PersonTable from "./PersonTable";
import PersonDialog from "./PersonDialog";
import SnackbarAlert from "./SnackbarAlert";
import { Person } from "../lib/person";

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


  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/people`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPeople(data);
        } else {
          console.error("Error fetching people data.");
        }
      } catch (error) {
        console.error("Error fetching people data:", error);
      }
    };

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/people/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPeople((prevPeople) =>
          prevPeople.filter((person) => person.id !== id)
        );
        setSnackbarMessage("Record deleted successfully!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Error deleting the record.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Error deleting the person:", error);
      setSnackbarMessage("Error deleting the record.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleSubmit = async () => {
    try {
      console.log("asdf", currentPerson);
      let response;
      if (editMode && currentPerson) {
        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/people/${currentPerson.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentPerson),
          }
        );
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/people`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentPerson),
        });
      }

      if (response.ok) {
        const updatedPerson: Person = await response.json();
        if (editMode) {
          setPeople((prevPeople) =>
            prevPeople.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          );
        } else {
          setPeople((prevPeople) => [...prevPeople, updatedPerson]);
        }
        setSnackbarMessage("Record saved successfully!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Error saving the record.");
        setSnackbarSeverity("error");
      }
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
      <Container component="main" style={{ flex: 1, marginTop: "64px", minHeight: '90dvh' }}>
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
