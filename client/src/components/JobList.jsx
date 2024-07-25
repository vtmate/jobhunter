import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetFilteredJobsQuery, useGetJobsQuery } from '../store/jobsApiSlice';
import { user } from '../store/authSlice';
import { useNavigate  } from "react-router-dom";


const JobList = () => {
  const currentUser = useSelector(user);

  const [salaryFrom, setSalaryFrom] = useState('0');
  const [salaryTo, setSalaryTo] = useState('2000000');
  const [filters, setFilters] = useState({});
  const [type, setType] = useState('all');
  const [city, setCity] = useState('');
  const [homeOffice, setHomeOffice] = useState(false);
  const [company, setCompany] = useState('');

  const { data: allJobsData, error: allJobsError, isLoading: allJobsLoading } = useGetJobsQuery();
  const { data: filteredJobsData, error: filteredJobsError, isLoading: filteredJobsLoading } = useGetFilteredJobsQuery(filters, { skip: !Object.keys(filters).length });

  const data = Object.keys(filters).length ? filteredJobsData : allJobsData;
  const isLoading = Object.keys(filters).length ? filteredJobsLoading : allJobsLoading;
  const error = Object.keys(filters).length ? filteredJobsError : allJobsError;

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSalaryFrom = (event) => {
    setSalaryFrom(parseInt(event.target.value));
  };

  const handleSalaryTo = (event) => {
    setSalaryTo(parseInt(event.target.value));
  };

  const handleVisitClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  const filter = (e) => {
    e.preventDefault();

    const newFilters = {};
    if (salaryFrom) newFilters['salaryFrom[$gt]'] = salaryFrom - 1;
    if (salaryTo) newFilters['salaryTo[$lt]'] = salaryTo + 1;
    if (type && type !== "all") newFilters['type'] = type;
    if (city) newFilters['city'] = city;
    if (homeOffice) newFilters['homeOffice'] = homeOffice;
    if (company) newFilters['company[$like]'] = `%${company}%`;

    setFilters(newFilters);
  };


  return (
    <div className='mb-40'>

      <h1 className='text-3xl font-bold tracking-widest text-center mt-16 mb-20'>The<span className='text-3xl font-bold text-secondary'> Best</span> Jobs... In One Place</h1>

      <div className='mx-auto w-[30rem] mb-12'>
        <form onSubmit={filter} className='flex justify-between flex-col sm:flex-row'>
          <div>
            <div>
            {/* <label htmlFor="company">Company name:</label> */}
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className='input input-bordered input-sm mb-4 input-secondary'
              placeholder='company name'
            />
            </div>
            <div>
            <p>Salary from: {salaryFrom}</p>
            <input
              type="range"
              min={0}
              max={2000000}
              step={100000}
              value={salaryFrom}
              onChange={handleSalaryFrom}
              className='range range-sm w-48'
            />
            </div>
            <div>
            <p>Salary to: {salaryTo}</p>
            <input
              type="range"
              min={0}
              max={2000000}
              step={100000}
              value={salaryTo}
              onChange={handleSalaryTo}
              className='range range-sm w-48'
            />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="type" className='mr-4'>Type:</label>
              <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  className='select select-bordered select-sm w-44'
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="all">All</option>
              </select>
            </div>
            <div className='mt-2'>
                <label htmlFor="city" className='mr-2'>City:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='input input-bordered input-sm'
                />
            </div>
            <div className='flex items-center my-2'>
                <label htmlFor="homeOffice">Home Office:</label>
                <input
                    type="checkbox"
                    id="homeOffice"
                    checked={homeOffice}
                    onChange={(e) => setHomeOffice(e.target.checked)}
                    className='checkbox checkbox-sm ml-2'
                />
            </div>
            <button className='btn btn-sm btn-secondary w-full' type="submit">Filter</button>
          </div>
        </form>
      </div>

      <h2 className='animate-bounce text-4xl font-extrabold tracking-widest text-center mt-16 mb-20'>&#8595;</h2>

      <ul>
        {data && data.map((job) => (
          <li key={job.id} className='bg-gray-700 p-4 mt-4 mx-auto w-[30rem] rounded-xl flex justify-between'>
            <div>
              <p className=' mb-2 font-bold'>{job.company}</p>
              <p className=' mb-2'>{job.type}</p>
              <p>homeoffice: {job.homeOffice ? "yes" : "no"}</p>
            </div>
            <div>
                <p className='text-right mb-2'>{job.city}</p>
                <p className='text-right mb-2'>{job.salaryFrom} - {job.salaryTo}</p>
                <div className='flex justify-end'>
                  <button className='btn btn-sm btn-success' onClick={() => handleVisitClick(job.id)}>More details</button>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
