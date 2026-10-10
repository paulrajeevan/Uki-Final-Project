import { createContext, useContext, useState, useEffect, Children } from "react";
import API from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [loading,setLoading]= useState(true)

    useEffect(()=>{
        const savedUser = localStorage.getItem('userInfo')
        if (savedUser){
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    },[])

    const register = async (userData) => {
        const response = await API.post('/auth/register',userData)
        const data = response.data;
        localStorage.setItem('userInfo',JSON.stringify(data))
        setUser(data)
        return data
    }

    const login = async (email,password) => {
        const response = await API.post('/auth/login',{email,password})
        const data = response.data
        localStorage.setItem('userInfo',JSON.stringify(data))
        setUser(data)
        return data
    }

    const logout = () => {
        localStorage.removeItem('userInfo')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, loading, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}