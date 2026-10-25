import { useState,useEffect } from "react";
import API from '../api/axios'
import {Check, X, ExternalLink, ShieldCheck, Clock, User, AlertCircle} from 'lucide-react'

const AdminTeacherVerification = () => {
    const [teacher, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(null)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const loadPendingTeachers = async () => {
        try {
            const res = await API.get('/admin/teachers/pending')
            setTeachers(res.data)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load verification quene')
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        loadPendingTeachers()
    },[])

    const handleVerify = async (teacherId, status, teacherName) => {
        setActionLoading(teacherId)
        setMessage('')
        setError('')

        try {
            const res = await API.put(`/admin/teachers/${teacherId}/verify`,{status})
            setMessage(`${teacherName} has been ${status}!`)
            setTeachers((prev)=> prev.filter((t) => t._id !== teacherId))
        } catch (err) {
            setError(err.response?.data?.message || 'Action failed')
        } finally {
            setActionLoading(null)
        }
    }

    if(loading) {
        return <div className="p-8 text-center text-slate-500">Loading verification queue...</div>
    }

    return(
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Teacher Verification Queue</h2>
                    <p className="text-sm text-slate-500">Review submitted credentials and grant teaching permissions</p>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-amber-800 text-xs font-semibold">
                    <Clock className="w-4 h-4 text-amber-600"/>
                    <span>{teacher.length} Pending Review</span>
                </div>
            </div>
        

        {message && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl">
            {message}</div>
        )}

        {error && (
            <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl">
            {error}</div>
        )}
        </div>
    )
}

export default AdminTeacherVerification;