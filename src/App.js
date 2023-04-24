import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './Context/Notes/noteState';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route exact path="/about" element={<About />}>
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
