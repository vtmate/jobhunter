import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateJobMutation, useGetOneJobQuery } from '../store/jobsApiSlice';
import { user } from '../store/authSlice';
import { Navigate, useParams } from 'react-router-dom';

export default function EditJob() {
  const { jobId } = useParams();
  const [updateJob, { isLoading, isSuccess, isError, error }] = useUpdateJobMutation();
  const { data: jobData, error: jobError, isLoading: jobLoading } = useGetOneJobQuery(jobId);

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
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (jobData) {
      setCompany(jobData.company);
      setPosition(jobData.position);
      setDescription(jobData.description);
      setSalaryFrom(jobData.salaryFrom);
      setSalaryTo(jobData.salaryTo);
      setType(jobData.type);
      setCity(jobData.city);
      setHomeOffice(jobData.homeOffice);
    }
  }, [jobData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJobData = {
      company,
      position,
      description,
      salaryFrom: parseFloat(salaryFrom),
      salaryTo: parseFloat(salaryTo),
      type,
      city,
      homeOffice: !!homeOffice,
    };

    console.log('Updated Job Data:', updatedJobData);

    try {
      await updateJob({ id: jobId, ...updatedJobData }).unwrap();
    } catch (err) {
      console.log('Error:', err);
      if (err?.data?.message) {
        setErrorMessage(err.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  if (isSuccess) {
    return <Navigate to="/" />;
  }

  if (jobLoading) {
    return <p>Loading job details...</p>;
  }

  if (jobError) {
    return <p>Failed to load job details. Please try again later.</p>;
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
            {isLoading ? 'Processing...' : 'Update Job'}
          </button>
        </div>
      </div>
    </form>
  );
}
