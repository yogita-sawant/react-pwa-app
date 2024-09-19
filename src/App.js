import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import UsersPage from './components/UsersPage';
import './App.css';

function NavBar() {
  return (
    <nav className="bg-gray-800 py-4">
      <ul className="flex justify-center">
        <li className="mr-6">
          <Link className="text-white" to="/">Home</Link>
        </li>
        <li className="mr-6">
          <Link className="text-white" to="/about">About</Link>
        </li>
        <li>
          <Link className="text-white" to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <main className="container mx-auto p-4 flex flex-col md:flex-row">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

