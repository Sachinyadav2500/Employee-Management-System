import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react"
import React from 'react'

const userContext = createContext()
const AuthContext = ({ children }) => {

    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    if (response.data.success) {
                        setuser(response.data.user)
                    }
                }
                else {
                    setuser(null)
                    setloading(false)
                }
            } catch (error) {
                console.log("Verify Error:", error.response?.data);
                console.log("Full Error:", error);
                setuser(null);
            }

            finally {
                setloading(false)
            }
        }
        verifyUser()
    }, [])

    const login = (user) => {
        setuser(user)
    }
    
    const logout = () => {
        setuser(null)
        localStorage.removeItem("token")
    }
    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(userContext)
};

export default AuthContext
