import { Route, Routes } from 'react-router-dom';
import './App.css';
import MemeGenerator from './views/MemeGenerator';

function App() {
  return (
    <div className="App">
      <main className="container-fluid p-0 m-0">
        <Routes>
          <Route path={`/`} element={<MemeGenerator />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
