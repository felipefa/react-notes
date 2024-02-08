import React from 'react';

import { Divider } from './components/divider';
import { Logo } from './components/logo';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';

interface Note {
  id: string;
  content: string;
  date: Date;
}

export function App() {
  const [notes, setNotes] = React.useState<Note[]>(() => {
    const notesFromStorage = localStorage.getItem('notes');

    if (notesFromStorage) {
      return JSON.parse(notesFromStorage);
    }

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      content,
      date: new Date(),
    };

    setNotes((prevNotes) => {
      const newNotes = [newNote, ...prevNotes];

      localStorage.setItem('notes', JSON.stringify(newNotes));

      return newNotes;
    });
  }

  return (
    <div className="max-w-6xl mx-auto my-12 space-y-6">
      <Logo />

      <form className="w-full">
        <input
          className="bg-transparent font-semibold outline-none placeholder:text-slate-500 text-3xl tracking-tight w-full"
          placeholder="Search notes..."
          type="text"
        />
      </form>

      <Divider />

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
