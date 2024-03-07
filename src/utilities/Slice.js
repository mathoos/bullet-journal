import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;