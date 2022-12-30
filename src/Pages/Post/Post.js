import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp,faMessage } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
const Post = ({post}) => {
const {user}=useContext(AuthContext);
const [click,setClick]=useState(false);
const [count,setCount]=useState(0);
    const {status,image}=post;
const handleLike=event=>{
setCount(count+1)
setClick(true);
const postdetail={
    userphoto:user.photoURL,
    username:user.displayName,
    postimage:post.image,
    likecount:count+1,
    status:status
}
fetch('https://dream-book-server-side.vercel.app/postdetails',{
    method:"POST",
    headers:{
        'content-type':'application/json'
    },
    body:JSON.stringify(postdetail)
})
.then(res=>res.json())
.then(data=>{
    console.log(data)
})
}
    return (
        <div className='w-70 border-2 my-6 mx-auto'>
            <div>
                <div className='text-start p-4 flex '>
                {
                    user?.photoURL && <div className="avatar">
                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-4">
                      <img src={user?.photoURL} alt=""/>
                    </div>
                  </div>
                }
                {
                    user?.displayName && <h2 className='mt-2 text-lg font-bold'>{user?.displayName}</h2>
                }
            </div>
            </div>
            <div>
            <p className='text-start px-2 py-2 text-lg font-semibold'>{status}</p>
            <div className=''>
                <img src={image} alt="" />
            </div>
            <div className='flex justify-between px-8 mt-8'>
                <p className='text-blue-400 text-lg font-bold'>Like:{count}</p>
                <p>Comment</p>
            </div>
            <div className='flex justify-between px-4 mt-4'>     
            {
                click===true ? <button onClick={handleLike} className='btn text-lg text-blue-400 bg-blue-100 font-bold text-black px-10 my-2 border-none hover:bg-blue-100' disabled><FontAwesomeIcon icon={faThumbsUp} className='mr-2'/>Like</button>
                :
                 <button onClick={handleLike} className='btn bg-blue-100 text-black px-10 my-2 border-none hover:bg-blue-100'><FontAwesomeIcon icon={faThumbsUp} className='mr-2'/>Like</button>

            }             
                      
                 <button className='btn bg-blue-100 text-black px-10 my-2 border-none hover:bg-blue-100'><FontAwesomeIcon icon={faMessage} className='mr-2'/>Comment</button>
            </div>
        </div>
        </div>
    );
};

export default Post;