import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetOneJobQuery } from '../store/jobsApiSlice';
import { user } from '../store/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddApplicationMutation } from '../store/applicationApiSlice.js';


export default function JobDetails() {
  const { jobId } = useParams();
  const { data: jobData, error: jobError, isLoading: jobLoading } = useGetOneJobQuery(jobId);
  const [ apply, { isLoading, isSuccess, isError, error }] = useAddApplicationMutation();


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
  const navigate = useNavigate();



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

  const handleBack = () => {
      navigate(`/`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const newApplication = {
      //userId: currentUser.id,
      jobId: jobData.id,
    };
console.log(newApplication);
    try {
      await apply(newApplication).unwrap();

    } catch (err) {
      if (err?.data?.message) {
        setErrorMessage('An error occurred. Please try again later.');
        console.log(err.data.message);
      } else {
        // setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  if (jobLoading) {
    return <p>Loading job details...</p>;
  }

  if (jobError) {
    return <p>Failed to load job details. Please try again later.</p>;
  }

  return (
    <div>
      <div className='flex justify-center mt-4 mb-8'>
        <div className='flex items-center'>
          <button className="btn btn-sm mr-8" onClick={handleBack}>&#x3c;Back</button>
          <h1 className="font-bold text-3xl text-center">Job Details</h1>
        </div>
      </div>
        <div className="flex justify-center items-center">
          <table className="table-auto rounded-lg">
            <tbody>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Company</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{company}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Position</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{position}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Description</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{description}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Salary From</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{salaryFrom}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Salary To</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{salaryTo}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Type</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{type}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">City</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{city}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 px-4 py-2 font-semibold">Home Office</td>
                <td className="px-4 py-2">{homeOffice ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>


        {currentUser?.role === "jobseeker" && (
          <div className='flex justify-center mt-4'>
            <button className='btn btn-sm btn-secondary w-32' onClick={handleSubmit}>Apply</button>
          </div>
        )}


          {isSuccess && (
            <div role="alert" className="alert alert-success bg-green-800 w-80 mx-auto mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className='font-bold text-white'>Application was successful!</span>
            </div>
          )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
