import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import app from '../../firebase/firebase.init'


export const AuthContext = createContext()
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  //1. Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //   2. Update Name
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }


  // 3. Google Signin
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  // 4. Logout
  const logout = () => {
    return signOut(auth)
  }

  //5. Login with Password
  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }



  useEffect(() => {
    //this part will execute once the component is mounted.
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => {
      //this part will execute once the component is unmounted.
      unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    createUser,
    updateUserProfile,
    signInWithGoogle,
    logout,
    signin
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider