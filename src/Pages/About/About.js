import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const About = () => {
const {user}=useContext(AuthContext);
    return (
        <div className='bg-blue-50 py-20 px-36' style={{height:'100vh'}}>
            <div className='flex'>
           <div className="avatar mr-32">
            <div className="w-96 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
           <img src={user.photoURL} alt=""/>
          </div>
         </div>
         <div className='mt-16 border-2 p-8'>
            <h2 className='text-2xl font-bold mb-4'>My Details</h2>
            <h1 className='text-4xl font-bold mb-2'>Name: {user.displayName}</h1>
            <h3 className='text-3xl font-bold mb-2'>Current Institute: National University</h3>
            <h4 className='text-2xl font-bold mb-2'>Address: Nabiabad,Muradnagar,Cumilla</h4>
            <div className='mt-8 flex justify-between'>
                <button className='btn btn-black-100'>Edit</button>
                <button className='btn btn-primary'>Save</button>
            </div>
         </div>
        </div>
        </div>
    );
};

export default About;