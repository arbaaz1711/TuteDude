import React from "react";

const Note = ({ id, title, content, onDelete }) => {
  const handleClick = () => {
    onDelete(id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-xl font-bold text-gray-800 break-words">{title}</h1>
        <button
          onClick={handleClick}
          className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:scale-110 hover:cursor-pointer"
        >
          ✕
        </button>
      </div>
      <p className="text-gray-600 leading-relaxed break-words whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};

export default Note;
