import React, { useState } from 'react';
import { useEffect } from 'react';
import Post from '../Post/Post';

const Media = () => {

const [posts,setPosts]=useState([])
useEffect(()=>{
    fetch('https://dream-book-server-side.vercel.app/posts')
    .then(res=>res.json())
    .then(data=>{
        setPosts(data)
    })
},[])

    return (
        <div className='bg-blue-50'>
            <h2 className='text-2xl font-bold text-center py-10'>Your Posts</h2>
            <div className='grid grid-cols-1 text-center'>
               {
                posts.map(post=><Post
                key={post._id}
                post={post}
                ></Post>)
               }
            </div>
            
        </div>
    );
};

export default Media;