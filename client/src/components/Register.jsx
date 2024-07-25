import { useLoginMutation, useRegisterMutation } from '../store/authApiSlice.js';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSendExperienceDataMutation } from '../store/experiencesApiSlice.js';
import { user } from '../store/authSlice';
import { useSelector } from 'react-redux';


export default function Register() {
  const [apiRegister, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [apiAddExperience, { isLoading: isExperienceLoading }] = useSendExperienceDataMutation();
  const [apiLogin, { isLoading: isLoginLoading, isSuccess: isLoginSuccess }] = useLoginMutation();

  const currentUser = useSelector(user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('company');
  const [experience, setExperience] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const parseTextAreaValue = (value) => {
    const lines = value.split('\n');
    return lines.map(line => {
      const [company, title, interval] = line.split(';');
      return {
        company: company.trim(),
        title: title.trim(),
        interval: interval.trim(),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = {
      email,
      password,
      fullname,
      role,
    };

    try {
      // Register the user
      await apiRegister({ body: registerData }).unwrap();

      // Prepare login data
      const loginData = {
        email,
        password,
        strategy: 'local',
      };

      // Log in the user
      await apiLogin({ body: loginData }).unwrap();

      // If experience exists, save it
      if (experience) {
        const experiences = parseTextAreaValue(experience);
        console.log("experiences", experiences);

        console.log(currentUser);

        // Ensure the experiences are sent as an array
        await apiAddExperience({ experiences }).unwrap();
      }

    } catch (err) {
      if (err?.data?.message) {
        setErrorMessage(err.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  if (isLoginSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto w-fit mt-20'>
      <div className='flex justify-between'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='input input-sm input-bordered mb-2 ml-4'
        />
      </div>
      <div className='flex justify-between'>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='input input-sm input-bordered mb-2 ml-4'
        />
      </div>
      <div className='flex justify-between'>
        <label htmlFor="fullname">Full Name:</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className='input input-sm input-bordered mb-2 ml-4'
        />
      </div>
      <div className='flex justify-between'>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className='select select-sm select-bordered'
        >
          <option value="company">Company</option>
          <option value="jobseeker">Job Seeker</option>
        </select>
      </div>
      {
        role === "jobseeker" && (
          <div className='flex justify-between'>
            <label htmlFor="experience">Experience:</label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Company name;Job title;Time"
              className='textarea textarea-sm textarea-bordered mt-2'
            />
          </div>
        )
      }
      {errorMessage && <p>{errorMessage}</p>}
      <button className='btn btn-sm btn-secondary w-full mt-8' type="submit" disabled={isRegisterLoading || isLoginLoading || isExperienceLoading}>
        {isRegisterLoading || isLoginLoading || isExperienceLoading ? 'Processing...' : 'Register'}
      </button>
    </form>
  );
}



// import { useLoginMutation, useRegisterMutation } from '../store/authApiSlice.js';
// import { Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useSendExperienceDataMutation } from '../store/experiencesApiSlice .js';


// export default function Register() {
//   const [apiRegister, { isLoading: isRegisterLoading }] = useRegisterMutation();
//   const [apiAddExperience, { isLoading: isExperienceLoading }] = useSendExperienceDataMutation();
//   const [apiLogin, { isLoading: isLoginLoading, isSuccess: isLoginSuccess }] = useLoginMutation();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullname, setFullname] = useState('');
//   const [role, setRole] = useState('company');
//   const [experience, setExperience] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
  
//   //megadott experiences átalakítása
//   const parseTextAreaValue = (value) => {
//     const lines = value.split('\n');
//     return lines.map(line => {
//       const [company, title, interval] = line.split(';');
//       return {
//         company: company.trim(),
//         title: title.trim(),
//         interval: interval.trim(),
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const registerData = {
//       email,
//       password,
//       fullname,
//       role,
//     };
  
//     try {
//       // Register the user
//       await apiRegister({ body: registerData }).unwrap();
  
//       // Prepare login data
//       const loginData = {
//         email,
//         password,
//         strategy: 'local',
//       };
  
//       // Log in the user
//       await apiLogin({ body: loginData }).unwrap();
  
//       // If experience exists, save it
//       if (experience) {
//         const experiences = parseTextAreaValue(experience);
//         console.log("experiences", experiences);
        
//         await apiAddExperience({ experiences }).unwrap();
//       }
  
//     } catch (err) {
//       if (err?.data?.message) {
//         setErrorMessage(err.data.message);
//       } else {
//         setErrorMessage('An error occurred. Please try again later.');
//       }
//     }
//   };


//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const registerData = {
//   //     email,
//   //     password,
//   //     fullname,
//   //     role,
//   //   };



//   //   try {
//   //     await apiRegister({ body: registerData }).unwrap();

//   //     const loginData = {
//   //       email,
//   //       password,
//   //       strategy: 'local',
//   //     };

//   //     //experience
//   //     if(experience){
//   //       const experiences = parseTextAreaValue(experience);
//   //       console.log("experiences", experiences);
//   //     }



//   //     await apiLogin({ body: loginData }).unwrap();


//   //   } catch (err) {
//   //     if (err?.data?.message) {
//   //       // setErrorMessage(err.data.message);
//   //       setErrorMessage('An error occurred. Please try again later.');
//   //     } else {
//   //       setErrorMessage('An error occurred. Please try again later.');
//   //     }
//   //   }
//   // };

//   if (isLoginSuccess) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className='flex justify-between'>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//      className='input input-sm input-bordered mb-2 ml-4'
//         />
//       </div>
//       <div className='flex justify-between'>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//      className='input input-sm input-bordered mb-2 ml-4'
//         />
//       </div>
//       <div className='flex justify-between'>
//         <label htmlFor="fullname">Full Name:</label>
//         <input
//           type="text"
//           id="fullname"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//      className='input input-sm input-bordered mb-2 ml-4'
//         />
//       </div>
//       <div className='flex justify-between'>
//         <label htmlFor="role">Role:</label>
//         <select
//           id="role"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//      className='input input-sm input-bordered mb-2 ml-4'
//         >
//           <option value="company">Company</option>
//           <option value="jobseeker">Job Seeker</option>
//         </select>
//       </div>
//       {
//         role == "jobseeker" && (
//           <div className='flex justify-between'>
//             <label htmlFor="experience">Experience:</label>
//             <textarea
//               id="experience"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               placeholder="Company name;Job title;Time"
//             >
//             </textarea>
//           </div>
//         )
//       }
//       {errorMessage && <p>{errorMessage}</p>}
//       <button type="submit" disabled={isRegisterLoading || isLoginLoading || isExperienceLoading}>
//         {isRegisterLoading || isLoginLoading || isExperienceLoading ? 'Processing...' : 'Register'}
//       </button>
//     </form>
//   );
// }
