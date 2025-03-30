import { useEffect, useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { NotesContext } from "../context/NotesContext.jsx";
import { CiCirclePlus } from "react-icons/ci";
import Note from "../Components/Note";
import Modal from "react-modal";
import { NavBar } from "../Components/NavBar.jsx";
Modal.setAppElement("#root");

const Home = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      borderRadius: "10px",
    },
  };

  const { notes, dispatch } = useContext(NotesContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [updatedAt, setUpdatedAt] = useState(null);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    if (isAdding) {
      addNewNote();
    } else if (isEditing) {
      editExistingNote();
    }
    resetForm();
  }

  const resetForm = () => {
    setTitle("");
    setBody("");
    setIsAdding(false);
    setIsEditing(false);
    setCurrentNoteId(null);
    setUpdatedAt(null);
  };

  const getAuthToken = () => {
    return JSON.parse(localStorage.getItem("user")).token;
  };

  const fetchNotes = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch("/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      dispatch({ type: "SET_NOTES", payload: data.notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(notes);
      setIsSearching(false);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredNotes(
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query)
        )
      );
      setIsSearching(true);
    }
  }, [searchQuery, notes]);

  const addNewNote = async () => {
    if (title && body) {
      const newNote = { title, body, pinned: false };
      try {
        const token = getAuthToken();
        const response = await fetch("/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newNote),
        });

        if (!response.ok) {
          throw new Error("Failed to add the new note");
        }
        const savedNote = await response.json();
        dispatch({ type: "ADD_NOTE", payload: savedNote });
      } catch (error) {
        console.error("Error adding new note:", error);
      }
    }
  };

  const togglePin = async (id) => {
    try {
      dispatch({ type: "PIN_NOTE", payload: id });
      const token = getAuthToken();
      const response = await fetch(`/api/notes/togglePin/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle pin of the note");
      }
    } catch (error) {
      console.error("Failed to toggle pin of the note:", error);
    }
  };

  const editExistingNote = async () => {
    if (title && body) {
      try {
        const updatedNote = { _id: currentNoteId, title, body, pinned: true };
        dispatch({ type: "EDIT_NOTE", payload: updatedNote });
        const token = getAuthToken();
        const response = await fetch(`/api/notes/${currentNoteId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedNote),
        });

        if (!response.ok) {
          throw new Error("Failed to edit the note");
        }
      } catch (error) {
        console.error("Error editing note:", error);
      }
    }
  };

  const editNote = (note) => {
    openModal();
    setTitle(note.title);
    setBody(note.body);
    setCurrentNoteId(note._id);
    setIsEditing(true);
  };
  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="relative  px-5">
        <CiCirclePlus
          className="fixed bottom-2 right-2 text-blue-500 text-6xl cursor-pointer hover:text-blue-600 z-100"
          onClick={() => {
            setIsAdding(true);
            openModal();
          }}
        />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4">
          {(isSearching ? filteredNotes : notes)
            .sort((a, b) => b.pinned - a.pinned)
            .map((note) => (
              <Note
                note={note}
                key={note._id}
                onNoteClick={() => {
                  setTitle(note.title);
                  setBody(note.body);
                  setUpdatedAt(note.updatedAt);
                  openModal();
                }}
                editNote={() => editNote(note)}
                setIsEditing={setIsEditing}
                togglePin={togglePin}
              />
            ))}
        </div>

        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Note Modal"
          >
            <form className="flex flex-col w-150 bg-white p-5 gap-y-2 relative">
              <h1>TITLE</h1>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Learn Programming"
                className=" p-2 rounded-md outline-none bg-slate-50"
              />
              <h1>CONTENT</h1>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Note Content Here"
                className="p-2 rounded-md outline-none resize-none w-full min-h-[150px] bg-slate-50"
              />
              {updatedAt && (
                <p className="text-right m-0 text-sm">
                  Last update:
                  {updatedAt
                    ? formatDistanceToNow(new Date(updatedAt), {
                        addSuffix: true,
                      })
                    : ""}
                </p>
              )}
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Home;
