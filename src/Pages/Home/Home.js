import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
// import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import TopPost from '../TopPost/TopPost';

const Home = () => {
const [topPosts,setTopPosts]=useState([]);
useEffect(()=>{
    fetch('https://dream-book-server-side.vercel.app/top-post')
    .then(res=>res.json())
    .then(data=>{
        setTopPosts(data)
    })
},[])
const {user}=useContext(AuthContext);
const date=new Date();
const navigate=useNavigate();
const handlePost=event=>{
    event.preventDefault();
    const form=event.target;
    const status=form.status.value;
    const image=form.image.files[0];
    // console.log(status,image)
    const formData=new FormData();
    formData.append('image',image)
    const url='https://api.imgbb.com/1/upload?key=72e8bde3006068e301105fa45f5a173a';
    fetch(url,{
        method:"POST",
        body:formData
    })
    .then(res=>res.json())
    .then(imgData=>{
        const image=imgData.data.display_url;
        const post={
            status:status,
            image:image,
            date:date
        }
        // console.log(post)
        fetch('https://dream-book-server-side.vercel.app/posts',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('Posted Successfully');
                form.reset('');
                navigate('/media')

            }
            // console.log(data)
        })
    })
    
        .catch(err=>console.error(err));
       
       
}
    return (
        <div className='px-5 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
            {
                user?.email &&
                <div>
            <h2 className='text-lg font-bold text-center py-3'>Create a post</h2>
            <form className='border-2 p-6' onSubmit={handlePost}>
            <div className=''>
                <p className='text-lg'>Whats on your mind?</p>
                <textarea name='status' className='w-full mt-3 p-2' cols="30" rows="4"></textarea>
            </div>
            <div className='py-6'>
                <label >
                    <span className='text-lg'>Upload Image </span>
                </label>
                <input type="file" name='image' accept='image/*' className="input input-bordered py-2" />
            </div>
            <button className='btn btn-primary w-full text-xl'>Post</button>
        </form>
        </div>
            }
            
            <div className='px-3 text-center'>
                <h2 className='text-lg font-bold'>Top Posts</h2>
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
                {
                topPosts.map(topPost=><TopPost
                key={topPost._id}
                topPost={topPost}
                ></TopPost>)
                }
                </div>
            </div>
        </div>
    );
};

export default Home;