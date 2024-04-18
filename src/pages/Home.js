import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from '../utilities/Slice';

import alicePhoto from "../img/people/alice.jpg";
import bobPhoto from "../img/people/bob.jpg";
import charliePhoto from "../img/people/charlie.jpg";
import charlottePhoto from "../img/people/charlotte.jpg";
import emmaPhoto from "../img/people/emma.jpg";

import "./Home.scss";

import Form from "../components/Form";
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";
import Nav from "../components/Nav";

const personPhotos = {
    "Alice": alicePhoto,
    "Bob": bobPhoto,
    "Charlie": charliePhoto,
    "Charlotte": charlottePhoto,
    "Emma": emmaPhoto
};

const noteContainers = [
    { title: "A faire", containerType: "A faire" },
    { title: "En cours", containerType: "En cours" },
    { title: "Fait", containerType: "Fait" }
];

function Home() {
    const dispatch = useDispatch();
    const [notes, setNotes] = useState(useSelector(state => state.notes));
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [selectedNoteId, setSelectedNoteId] = useState(null);

    const handleAddNote = (newNote) => {
        const updatedNotes = [...notes, { ...newNote, container: "A faire" }];
        setNotes(updatedNotes);
        dispatch(addNote({ ...newNote, container: "A faire" }));
    };

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleCloseNoteDetail = () => {
        setSelectedNote(null);
    };

    const handleDeleteNote = (noteId) => {
        const updatedNotes = notes.filter(note => note.id !== noteId);
        setNotes(updatedNotes);
        dispatch(deleteNote(noteId));
    };

    const handleDragStart = (noteId) => {
        setSelectedNoteId(noteId);
    };

    const handleDragEnd = () => {
        setSelectedNoteId(null);
    };

    const handleDrop = (containerType) => {
        if (selectedNoteId !== null) {
            const updatedNotes = notes.map(note => {
                if (note.id === selectedNoteId) {
                    return { ...note, container: containerType };
                }
                return note;
            });
            setNotes(updatedNotes);
        }
    };

    return (
        <div className="home">
            <Nav />
            <div className="container">
                <div className="container_header">
                    <button className="bouton bouton_add" onClick={() => setIsFormVisible(true)}>Ajouter une note</button>
                </div> 
                {isFormVisible && (
                    <Form 
                        onAddNote={handleAddNote} 
                        selectedNote={selectedNote}
                        setIsVisible={setIsFormVisible}
                    />
                )}
                <div className="container_notes">

                    {noteContainers.map(({ title, containerType }) => (
                        <div key={containerType} className="container_notes-bloc" onDrop={() => handleDrop(containerType)} onDragOver={(e) => e.preventDefault()}>
                            <div className="container_notes-bloc--title">
                                <h2>{title}</h2>
                            </div>
                            <div className="container_notes-bloc--content">
                                {notes.filter(note => note.container === containerType).map(note => (
                                    <Note 
                                        key={note.id} 
                                        note={note}
                                        onClick={() => handleNoteClick(note)}
                                        personPhotos={personPhotos}  
                                        onDragStart={() => handleDragStart(note.id)}
                                        onDragEnd={handleDragEnd} 
                                    />
                                ))}
                            </div>
                        </div>
                    ))}


                </div>
            </div>
            {selectedNote && 
                <NoteDetail 
                    note={selectedNote}
                    personPhotos={personPhotos} 
                    onClose={handleCloseNoteDetail}
                    onDelete={handleDeleteNote}
                />
            } 
        </div>
    );
}

export default Home;