import React, { useState } from "react";

const CreateArea = ({ onAdd }) => {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const submitNote = (e) => {
    e.preventDefault();

    if (note.title.trim() === "" || note.content.trim() === "") {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    setIsExpanded(false);
    setShowAlert(false);
  };

  const expand = () => {
    setIsExpanded(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 mb-8">
      {showAlert && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-pulse">
          Please fill in both title and content fields!
        </div>
      )}

      <form
        onSubmit={submitNote}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            className="w-full mb-4 p-3 text-lg border-b-2 border-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          className="w-full p-3 text-lg border-none resize-none focus:outline-none transition-all duration-300"
        />

        {isExpanded && (
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              Add Note
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateArea;
