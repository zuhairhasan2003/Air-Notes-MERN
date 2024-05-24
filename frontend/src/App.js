import Navbar from "./components/Navbar";
import YourNotes from "./components/YourNotes";
import AddNote from "./components/AddNotes";
import Login from "./components/Login";
import Signup from "./components/Signup";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NoteState from "./context/NoteState";


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><YourNotes/></>,
  },
  {
    path: "/addNotes",
    element: <><Navbar/><AddNote/></>,
  },
  {
    path: "/login",
    element: <><Login/></>,
  },
  {
    path: "/signup",
    element: <><Signup/></>,
  },
]);


function App() {
  return (
    <NoteState>
      <RouterProvider router={router} />
    </NoteState>
  );
}

export default App;
