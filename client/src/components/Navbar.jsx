import React from 'react'
import { Link, Navigate } from 'react-router-dom';

import { user, logout } from '../store/authSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



const Navbar = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(user);
  console.log(currentUser);


  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className='flex justify-between bg-base-300 py-4 px-8 items-center'>
        <Link to="http://localhost:5173" className=' font-bold tracking-widest'>JOBHUNTER</Link>

        {!currentUser && (
          <div>
              <Link to="http://localhost:5173/register">Register</Link>
              <Link to="http://localhost:5173/login" className='btn btn-sm btn-secondary ml-4'>Login</Link>
          </div>
        )}
        {currentUser && (
          <div>
            <Link className='btn btn-sm btn-secondary ml-4' to="http://localhost:5173/profile">profile</Link>
              {currentUser?.role === "company" && (
                <Link className='ml-4 btn btn-sm btn-success' to="http://localhost:5173/addJob">add job</Link>
              )}  
              <button className='ml-4' onClick={handleLogout}>log out</button>
          </div>
        )}
    </div>
    
  )
}

export default Navbar