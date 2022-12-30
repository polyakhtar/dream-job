import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Register = () => {
const {createUser,updateUserProfile,signInWithGoogle}=useContext(AuthContext);
const handleSubmit=event=>{
    event.preventDefault();
    const form=event.target;
    const name=form.name.value;
    const image=form.image.files[0];
    const email=form.email.value;
    const password=form.password.value;
    const formData=new FormData();
    formData.append('image',image)
    const url='https://api.imgbb.com/1/upload?key=72e8bde3006068e301105fa45f5a173a';
    fetch(url,{
        method:"POST",
        body:formData
    })
    .then(res=>res.json())
    .then(imgData=>{
        updateUserProfile(name,imgData.data.display_url)
        .catch(err=>console.error(err))
    });
    // console.log(name,image,email,password);
    createUser(email,password)
    .then(result=>{
        const user=result.user;
        console.log(user);
        form.reset();
    })
    .catch(err=>console.error(err))
}
const handleGoogleSignIn=()=>{
    signInWithGoogle()
    .then(result=>{
        const user=result.user;
        console.log(user)
    })
    .catch(err=>console.error(err))
}

    return (
        <div className="hero min-h-screen bg-blue-50">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Name</span>
          </label>
          <input type="text" name='name' placeholder="name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Photo</span>
          </label>
          <input type="file" name='image' accept='image/*' className="input input-bordered py-2" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required/>
          <label className="label">
            <Link className="label-text-alt link link-hover text-lg mx-auto text-red-400" to='/login '>Login Please! </Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">SignIn</button>
        </div>
      </form>
      <button onClick={handleGoogleSignIn} className='btn btn-outline'>Sign In With Google</button>
    </div>
  </div>
</div>
    );
};

export default Register;