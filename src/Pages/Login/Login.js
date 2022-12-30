import React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Login = () => {
const {signin,signInWithGoogle}=useContext(AuthContext);
const navigate=useNavigate();
const handleLogIn=event=>{
    event.preventDefault();
    const form=event.target;
    const email=form.email.value;
    const password=form.password.value;
    // console.log(email,password);
    signin(email,password)
    .then(result=>{
        const user=result.user;
        console.log(user);
        navigate('/');
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
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleLogIn}>
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
            <Link className="label-text-alt link link-hover text-lg mx-auto text-red-400" to='/register'>Create an account</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <button onClick={handleGoogleSignIn} className='btn btn-outline'>Sign In With Google</button>
    </div>
  </div>
</div>
    );
};

export default Login;