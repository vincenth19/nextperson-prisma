//'use client'

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Person } from "../lib/person";

interface PersonDialogProps {
  open: boolean;
  editMode: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const month_values = [
  {
    label: "January",
    value: "Jan",
  },
  {
    label: "February",
    value: "Feb",
  },
  {
    label: "March",
    value: "Mar",
  },
  {
    label: "April",
    value: "Apr",
  },
  {
    label: "May",
    value: "May",
  },
  {
    label: "June",
    value: "Jun",
  },
  {
    label: "July",
    value: "Jul",
  },
  {
    label: "August",
    value: "Aug",
  },
  {
    label: "September",
    value: "Sep",
  },
  {
    label: "October",
    value: "Oct",
  },
  {
    label: "November",
    value: "Nov",
  },
  {
    label: "December",
    value: "Dec",
  },
];

const PersonDialog: React.FC<PersonDialogProps> = ({
  open,
  editMode,
  handleClose,
  currentPerson,
  setCurrentPerson,
  handleSubmit,
}) => {
  let personDob = currentPerson?.date_of_birth ? new Date(currentPerson.date_of_birth) : null;
  const monthIndex = personDob ? personDob.getUTCMonth() : 0;
  const [dob, setDob] = useState({
    day: personDob ? personDob.getDate() : 1,
    month: month_values[monthIndex].value,
    year: personDob ? personDob.getFullYear() : 2024,
  });
  const [dobError, setDobError] = useState({
    day: {
      isError: false,
      helperText: "",
    },
    month: {
      isError: false,
      helperText: "",
    },
    year: {
      isError: false,
      helperText: "",
    },
  });

  useEffect(() => {
    personDob = currentPerson?.date_of_birth
      ? new Date(currentPerson.date_of_birth)
      : null;
    const monthIndex = personDob ? personDob.getUTCMonth() : 0;
    setDob({
      day: personDob ? personDob.getDate() : 1,
      month: month_values[monthIndex].value,
      year: personDob ? personDob.getFullYear() : 2024,
    });
  }, [currentPerson]);

  const [formError, setFormError] = useState(false)
  
  function handleChangeDate(key: string, value: string | number) {
    const newDob = { ...dob, [key]: value };
    setDob(newDob);
    const newDate = new Date(`${newDob.day} ${newDob.month} ${newDob.year}`);
    if (isNaN(newDate.getTime())) {
      setDobError((prev)=>({
        ...prev,
        [key]: {
          isError: true,
          helperText: 'Invalid '+key
        }
      }))
      setFormError(true)
    } else {
      setDobError((prev) => ({
        ...prev,
        [key]: {
          isError: false,
          helperText: "",
        },
      }));
      setFormError(false)
      setCurrentPerson((prev) => ({
        ...prev!,
        date_of_birth: newDate,
      }));
    }

  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editMode ? "Edit" : "Add"} Person</DialogTitle>
      <DialogContent>
        <FormControl sx={{ gap: "10px" }} margin="dense">
          <TextField
            autoFocus
            required
            label="First Name"
            fullWidth
            value={currentPerson?.firstname || ""}
            onChange={(e) =>
              setCurrentPerson((prev) => ({
                ...prev!,
                firstname: e.target.value,
              }))
            }
          />
          <TextField
            required
            label="Last Name"
            fullWidth
            value={currentPerson?.lastname || ""}
            onChange={(e) =>
              setCurrentPerson((prev) => ({
                ...prev!,
                lastname: e.target.value,
              }))
            }
          />
          <TextField
            required
            label="Phone"
            fullWidth
            value={currentPerson?.phone_number || ""}
            onChange={(e) =>
              setCurrentPerson((prev) => ({
                ...prev!,
                phone_number: e.target.value,
              }))
            }
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              required
              placeholder="Day"
              label="Day"
              type="number"
              error={dobError.day.isError}
              value={dob.day}
              onChange={(e) => {
                handleChangeDate("day", e.target.value);
              }}
            />
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dob.month}
              label="Age"
              size="small"
              error={dobError.month.isError}
              onChange={(e) => {
                handleChangeDate("month", e.target.value);
              }}
            >
              {month_values.map((month) => {
                return (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              required
              placeholder="Year"
              label="Year"
              type="number"
              value={dob.year}
              error={dobError.year.isError}
              helperText={dobError.year.helperText}
              onChange={(e) => {
                handleChangeDate("year", e.target.value);
              }}
            />
          </div>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={formError}>
          {editMode ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonDialog;
