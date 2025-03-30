import { createContext, useReducer } from "react";

export const NotesContext = createContext();

const NotesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { notes: action.payload };
    case "ADD_NOTE":
      return { notes: [...state.notes, action.payload] };
    case "EDIT_NOTE":
      return {
        notes: state.notes.map((note) =>
          note._id === action.payload._id
            ? { ...note, ...action.payload }
            : note
        ),
      };
    case "PIN_NOTE":
      return {
        notes: state.notes.map((note) =>
          note._id === action.payload ? { ...note, pinned: !note.pinned } : note
        ),
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotesReducer, { notes: [] });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
