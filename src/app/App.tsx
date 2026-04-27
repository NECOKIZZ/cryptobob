import { Routes, Route } from 'react-router';
import Home from './Home';
import Projects from './Projects';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  );
}
