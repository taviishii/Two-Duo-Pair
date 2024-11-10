import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddressForm from './AddressForm'; 
import NewPage from './NewPage';
function App() {
  
  return (
      <Router>
        <div>
          <nav>
            {/* Add navigation links */}
            <a href="/new-page">Find Places</a>
          </nav>
  
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<AddressForm />} />
            <Route path="/new-page" element={<NewPage />} />
          </Routes>
        </div>
      </Router>
    );
      // <div className="content">
      //   <AddressForm/>
      // </div>
}

export default App;
