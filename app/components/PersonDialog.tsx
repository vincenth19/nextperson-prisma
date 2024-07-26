'use client'

import {Dispatch,SetStateAction} from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/en-gb'
import { Person } from "../lib/person";

interface PersonDialogProps {
  open: boolean;
  editMode: boolean;
  handleClose: () => void;
  currentPerson: Person | null;
  setCurrentPerson: Dispatch<SetStateAction<Person | null>>;
  handleSubmit: () => void;
}

const PersonDialog = ({
  open,
  editMode,
  handleClose,
  currentPerson,
  setCurrentPerson,
  handleSubmit,
}: PersonDialogProps) => {
  const formError =
    !currentPerson?.firstName ||
    !currentPerson?.lastName ||
    !currentPerson?.phoneNumber ||
    !currentPerson?.dateOfBirth;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editMode ? "Edit" : "Add"} Person</DialogTitle>
      <DialogContent>
        <FormControl sx={{ gap: "10px" }} margin="dense" fullWidth>
          <TextField
            autoFocus
            required
            label="First Name"
            fullWidth
            value={currentPerson?.firstName || ""}
            onChange={(e) =>
              setCurrentPerson((prev) => ({
                ...prev!,
                firstName: e.target.value,
              }))
            }
          />
          <TextField
            required
            label="Last Name"
            fullWidth
            value={currentPerson?.lastName || ""}
            onChange={(e) =>
              setCurrentPerson((prev) => ({
                ...prev!,
                lastName: e.target.value,
              }))
            }
          />
          <TextField
            required
            label="Phone"
            fullWidth
            value={currentPerson?.phoneNumber || ""}
            onChange={(e) =>
              setCurrentPerson((prev) => ({
                ...prev!,
                phoneNumber: e.target.value,
              }))
            }
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              value={
                currentPerson?.dateOfBirth
                  ? dayjs(currentPerson.dateOfBirth)
                  : null
              }
              onChange={(value) =>
                setCurrentPerson((prev) => ({
                  ...prev!,
                  dateOfBirth: value!.toDate(),
                }))
              }
              views={["day", "month", "year"]}
              maxDate={dayjs()}
            />
          </LocalizationProvider>
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
