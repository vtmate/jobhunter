import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { user } from '../store/authSlice';
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useGetJobsByUserIdQuery, useDeleteJobMutation } from '../store/jobsApiSlice';
import { useGetApplicantsByJobIdQuery } from '../store/applicationApiSlice';
import { useGetExpByUserIdQuery } from '../store/experiencesApiSlice';

const Profile = () => {
  const currentUser = useSelector(user);
  const userId = currentUser?.id;
  const { data, error, isLoading } = useGetJobsByUserIdQuery(userId, { skip: !userId });
  const { data: expData, expError, expIsLoading } = useGetExpByUserIdQuery(userId, { skip: !userId });
  const [deleteJob] = useDeleteJobMutation();
  const navigate = useNavigate();

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: applicants, error: appError, isLoading: appIsLoading } = useGetApplicantsByJobIdQuery(selectedJobId, {
    skip: !selectedJobId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleDelete = async (id) => {
    try {
      await deleteJob(id).unwrap();
      console.log(`Job with ID ${id} deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete the job:', err);
    }
  };

  const handleEditClick = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleApplicantsClick = (jobId) => {
    setSelectedJobId(jobId);
    console.log(jobId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJobId(null);
  };

  return (
    <div>
      <h1 className='text-3xl text-center mt-8 mb-4'>User Data</h1>

      <div className="flex justify-center items-center">
          <table className="table-auto rounded-lg">
            <tbody>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Email</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{currentUser.email}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 border-b-2 px-4 py-2 font-semibold">Name</td>
                <td className="border-b-2 border-base-300 px-4 py-2">{currentUser.fullname}</td>
              </tr>
              <tr>
                <td className="border-r-2 border-base-300 px-4 py-2 font-semibold">Role</td>
                <td className="px-4 py-2">{currentUser.role}</td>
              </tr>
            </tbody>
          </table>
        </div>

      {currentUser?.role === "jobseeker" && (
        <div>
          <h2 className='text-3xl text-center mt-8 mb-4'>Previous Experiences</h2>
          {expIsLoading ? (
            <p>Loading experiences...</p>
          ) : expError ? (
            <p>Error loading experiences: {expError.message}</p>
          ) : (
            <ul className='w-fit mx-auto'>
              {console.log(expData)}
              {expData && expData.length > 0 ? (
                expData.map((experience, index) => (
                  <li key={index} className='bg-gray-700 p-4 rounded-xl mb-4'>
                    <p>Company: {experience.company}</p>
                    <p>Position: {experience.title}</p>
                    <p>Duration: {experience.interval}</p>
                    {/* <button className='btn btn-sm mt-2'>delete</button> */}
                  </li>
                ))
              ) : (
                <p>No previous experiences found.</p>
              )}
            </ul>
          )}
        </div>
      )}


      {currentUser?.role === "company" && (
        <div>
          <h3 className='text-3xl text-center mt-8'>Active jobs:</h3>
          <ul>
            {data && data.map((job) => (
              <li key={job.id} className='bg-gray-700 p-4 mt-4 mx-auto w-[30rem] rounded-xl'>
                <div className='flex justify-between'>
                  <div>
                    <p className=' mb-2 font-bold'>{job.company}</p>
                    <p className=' mb-2'>{job.type}</p>
                    <p>homeoffice: {job.homeOffice ? "yes" : "no"}</p>
                  </div>
                  <div>
                      <p className='text-right mb-2'>{job.city}</p>
                      <p className='text-right mb-2'>{job.salaryFrom} - {job.salaryTo}</p>
                      {/* <div className='flex justify-end'>
                        <button className='btn btn-sm btn-success' onClick={() => handleVisitClick(job.id)}>More details</button>
                      </div> */}
                  </div>
                </div>
                <div className='mt-4 flex justify-evenly'>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleApplicantsClick(job.id)}>Applicants</button>
                  <button className='btn btn-sm' onClick={() => handleEditClick(job.id)}>Edit Job</button>
                  <button className='btn btn-sm' onClick={() => handleDelete(job.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>

          <div className='mx-auto w-32'>
            <Link className="btn btn-sm btn-success w-32 my-4" to="/addJob">Add Job</Link>
          </div>
        </div>
      )}

      {modalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Applicants</h3>
            {appIsLoading ? (
              <p>Loading applicants...</p>
            ) : appError ? (
              <p>Error loading applicants: {appError.message}</p>
            ) : (
              <div>
                {applicants && applicants.length > 0 ? (
                  <ul>
                    {applicants.map((applicant, index) => (
                      <li key={index}>{applicant.user.fullname}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No applicants found for this job.</p>
                )}
              </div>
            )}
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
