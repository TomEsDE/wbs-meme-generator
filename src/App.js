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
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Anton&family=Paytone+One&display=swap');
      </style>
    </div>
  );
}

export default App;
