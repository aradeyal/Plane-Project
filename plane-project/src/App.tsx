/*השער הראשי של האפליקציה*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Visual from './pages/Visual';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visual" element={<Visual />} />
      </Routes>
    </Router>
  );
}

export default App;
