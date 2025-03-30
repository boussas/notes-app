import { FaThumbtack, FaTrash } from "react-icons/fa";
import { NotesContext } from "../context/NotesContext";
import { useContext } from "react";
import { FiEdit2 } from "react-icons/fi";
import { format } from "date-fns";
const Note = ({ note, onNoteClick, editNote, togglePin }) => {
  const { notes, dispatch } = useContext(NotesContext);
  const formattedDate = format(new Date(note.createdAt), "dd MMMM yyyy HH:mm");
  const getAuthToken = () => {
    return JSON.parse(localStorage.getItem("user")).token;
  };
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the note");
      }

      dispatch({ type: "DELETE_NOTE", payload: id });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  return (
    <div className="bg-white p-4 rounded-xl relative h-[200px] max-h-[200px] overflow-hidden shadow-md hover:shadow-lg cursor-pointer">
      <button
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => togglePin(note._id)}
      >
        <FaThumbtack
          className={`text-lg ${
            note.pinned ? "text-yellow-500" : "text-gray-500"
          } hover:text-yellow-400`}
        />
      </button>
      <h1 className="text-blue-600 font-bold text-xl" onClick={onNoteClick}>
        {note.title}
      </h1>
      <h6 className="text-slate-400 text-[12px] italic">{formattedDate}</h6>
      <p
        className="overflow-hidden text-ellipsis line-clamp-4 whitespace-pre-wrap"
        onClick={onNoteClick}
      >
        {note.body}
      </p>
      <button
        className="absolute bottom-2 left-2 mt-1"
        onClick={() => deleteNote(note._id)}
      >
        <FaTrash className="hover:text-red-500 text-gray-600 cursor-pointer" />
      </button>
      <button className="absolute bottom-2 right-2 mt-1">
        <FiEdit2
          className="hover:text-green-500 text-gray-600 cursor-pointer"
          onClick={() => {
            editNote(note);
          }}
        />
      </button>
    </div>
  );
};

export default Note;
