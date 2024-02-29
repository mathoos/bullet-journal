import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload);
        },
        deleteNote: (state, action) => {
            return state.filter(note => note.id !== action.payload);
        },
        editNote: (state, action) => {
            const { id, title, description, tag, time, emote, day } = action.payload;
            const existingNote = state.find(note => note.id === id);
            if (existingNote) {
                existingNote.title = title;
                existingNote.description = description;
                existingNote.tag = tag;
                existingNote.time = time;
                existingNote.emote = emote;
                existingNote.day = day;
            }
        }
    }
});

export const { addNote, deleteNote, editNote } = notesSlice.actions;
export default notesSlice.reducer;