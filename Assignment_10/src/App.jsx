import React, { useState } from 'react';
import Header from './components/Header';
import CreateArea from './components/CreateArea';
import Note from './components/Note';
import Footer from './components/Footer';
import noNotes from './assets/no_notes.png'

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...newNote, id: Date.now() }];
    });
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <CreateArea onAdd={addNote} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={noteItem.id}
                id={noteItem.id}
                title={noteItem.title}
                content={noteItem.content}
                onDelete={deleteNote}
              />
            );
          })}
        </div>
        
        {notes.length === 0 && (
          <div className="text-center ">
            <div className="text-6xl mb-4"><img src={noNotes} alt="Keeper" className="w-16 h-16 inline-block " /></div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Notes Yet</h2>
            <p className="text-gray-500">Start creating your first note above!</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
