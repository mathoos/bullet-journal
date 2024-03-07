import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../utilities/Slice';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import alicePhoto from "../img/people/alice.jpg";
import bobPhoto from "../img/people/bob.jpg";
import charliePhoto from "../img/people/charlie.jpg";
import charlottePhoto from "../img/people/charlotte.jpg";
import emmaPhoto from "../img/people/emma.jpg";
import "./Home.scss";
import Form from "../components/Form"

const tagColors = {
    "gestion de projet": "blue",
    "production": "green",
    "développement": "orange",
    "design": "pink",
};

const personPhotos = {
    "Alice": alicePhoto,
    "Bob": bobPhoto,
    "Charlie": charliePhoto,
    "Charlotte": charlottePhoto,
    "Emma": emmaPhoto
};

function Home() {
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const [selectedDay, setSelectedDay] = useState('');
    const [formActive, setFormActive] = useState(false);
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

    const daysWithDates = daysOfWeek.map((day, index) => {
        const currentDate = addDays(currentWeekStart, index);
        const dateForDay = format(currentDate, 'dd/MM/yyyy');
        const isCurrentDay = format(currentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
        const notesForDay = notes.filter(note => note.day === dateForDay);
        return { day, dateForDay, isCurrentDay, notesForDay };
    });

    const handleAddNote = (newNote) => {
        dispatch(addNote(newNote));
        setFormActive(false);
    };

    const handleAddNoteForDay = (day) => {
        setSelectedDay(day);
        setFormActive(true);
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(addWeeks(currentWeekStart, 1));
    };

    const handlePreviousWeek = () => {
        setCurrentWeekStart(subWeeks(currentWeekStart, 1));
    };

    return (
        <div className="container">
            <div className="container_navigation">
                <button onClick={handlePreviousWeek}> Previous </button>
                <button onClick={handleNextWeek}>Next</button>
            </div>

            <Form 
                onAddNote={handleAddNote} 
                formActive={formActive} 
                setFormActive={setFormActive} 
                selectedDayProp={selectedDay}
            />

            <div className="container_content">
                {daysWithDates.map(({ day, dateForDay, isCurrentDay, notesForDay }) => (
                    <div key={day} className={`container_content-day ${isCurrentDay ? 'active' : ''}`}>
                        <h2 className="container_content-day--title">{day}</h2>
                        <div className="container_content-day--notes">
                            {notesForDay.map(note => (
                                <div 
                                    key={note.id} 
                                    className={`note ${tagColors[note.tag] || 'default'}`}
                                >
                                    <div className="note_content">
                                        <div className="note_content-title">
                                            <h3>{note.title}</h3>
                                            <p>{note.emote}</p>
                                        </div>
                                        <p>{note.description}</p>
                                        <p>{note.time} - {dateForDay}</p>
                                        <div className="note_content-people">
                                            {note.people.map(person => (
                                                <img key={person} src={personPhotos[person]} alt={person} />
                                            ))}
                                        </div>
                                        <div className={`bouton bouton_tag ${tagColors[note.tag] || 'default'}`}>{note.tag}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="container_content-day--button">
                            <button className="bouton bouton_add" onClick={() => handleAddNoteForDay(dateForDay)}>Ajouter une note</button>
                        </div> 
                    </div>
                ))}
            </div>

            <div className="container_coucou">
                <div className="container_coucou-title">
                    <h2>Done</h2>
                </div>
            </div>
        </div>
    );
}

export default Home;