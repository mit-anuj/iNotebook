import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import NoteState from './Context/Notes/noteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=> {
    setAlert({
      msg: message,
      type: type
    })
    // this will automatically close the alert after 1.5 seconds.
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }
  return (
    <div className="App">
      <NoteState>
      <Router>
      <Navbar showAlert = {showAlert}/>
      <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}>
          </Route>
          <Route exact path="/about" element={<About showAlert={showAlert}/>}>
          </Route>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}>
          </Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}>
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
