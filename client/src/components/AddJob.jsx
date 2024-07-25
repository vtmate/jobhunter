import { useAddJobMutation } from '../store/jobsApiSlice.js';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { user } from '../store/authSlice';

export default function AddJob() {
  const [addJob, { isLoading, isSuccess, isError, error }] = useAddJobMutation();

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [salaryTo, setSalaryTo] = useState('');
  const [type, setType] = useState('full-time');
  const [city, setCity] = useState('');
  const [homeOffice, setHomeOffice] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const currentUser = useSelector(user);
  if(!currentUser){
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJobData = {
      company,
      position,
      description,
      salaryFrom: parseFloat(salaryFrom),
      salaryTo: parseFloat(salaryTo),
      type,
      city,
      homeOffice
    };

    console.log(newJobData);

    try {
      await addJob(newJobData).unwrap();
    } catch (err) {
      if (err?.data?.message) {
        setErrorMessage('An error occurred. Please try again later.');
        console.log(err.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className='flex justify-center mt-8'>
      <div>
        <div className="flex justify-between mb-2">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className='input input-bordered input-sm'
          />
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className='input input-bordered input-sm'
          />
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='textarea textarea-bordered textarea-sm'
          />
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="salaryFrom">Salary From:</label>
          <input
            type="number"
            id="salaryFrom"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
            required
            className='input input-bordered input-sm ml-4'
          />
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="salaryTo">Salary To:</label>
          <input
            type="number"
            id="salaryTo"
            value={salaryTo}
            onChange={(e) => setSalaryTo(e.target.value)}
            required
            className='input input-bordered input-sm'
          />
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className='select select-bordered select-sm'
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className='input input-bordered input-sm'
          />
        </div>
        <div className="flex justify-between mb-2">
          <label htmlFor="homeOffice">Home Office:</label>
          <input
            type="checkbox"
            id="homeOffice"
            checked={homeOffice}
            onChange={(e) => setHomeOffice(e.target.checked)}
            className='checkbox checkbox-bordered checkbox-sm'
          />
        </div>
        
        {errorMessage && <p>{errorMessage}</p>}
        <div className='w-fit mx-auto mt-4'>
          <button className='btn btn-sm btn-secondary w-40' type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Add new job'}
          </button>
        </div>
      </div>
    </form>
  );
}
