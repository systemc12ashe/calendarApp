import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
      return auth.signOut();
    }

    function setupUser(uid) {
      return firestore.collection('users').doc(uid).set({
        calendar: "",
      });
    }

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
    })

    return unsubscribe
    }, [])
  

    const value = {
        currentUser,
        signup,
        login,
        logout,
        setupUser
    }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}