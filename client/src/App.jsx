import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AddJob from './components/AddJob';
import EditJob from './components/EditJob';
import JobDetails from './components/JobDetails';

import { user, token } from './store/authSlice';
import { useSelector } from 'react-redux';

const App = () => {

  const User = useSelector(user);
  console.log(User);
  const Token = useSelector(token);
  console.log(Token);


  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/edit-job/:jobId" element={<EditJob />} />
        <Route path="/job-details/:jobId" element={<JobDetails />} />

        {/* <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <ProtectedPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<JobList />} /> 
      </Routes>
    </Router>
  );
};

export default App;
