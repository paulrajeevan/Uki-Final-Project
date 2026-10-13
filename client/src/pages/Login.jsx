import { useState } from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useAuth } from "../context/AuthContext"; 
import { Mail,Lock, LogIn, AlertCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {login} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const isSessionExpired = new URLSearchParams(location.search).get('expired')

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            await login(email,password)
            navigate('/')
        } catch (error) {
            setError(
                error.response?.data?.message || 'Invalid email or password. Please try again'
            )
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                    <LogIn className="w-6 h-6"/>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                <p className="text-sm text-slate-500 mt-1">Sign in to access your classes and dashboard</p>
            </div>

            
        </div>
    )
}

export default Login;