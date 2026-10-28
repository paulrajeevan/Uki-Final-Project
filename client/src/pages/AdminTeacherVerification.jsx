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
            {error}
            </div>
        )}

        {teacher.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
                <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3"/>
                <h3 className="text-lg font-bold text-slate-800">All Caught Up!</h3>
                <p className="text-sm text-slate-500 mt-1">There are no pending teacher applications right now.</p>
            </div>
        ):(
            <div className="grid grid-cols-1 gap-5">
                {teacher.map((teacher) => {
                    const tp = teacher.teacherProfile || {}

                    return (
                        <div key={teacher._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">{teacher.name}</h3>
                                        <p className="text-xs text-slate-500">{teacher.email} • {teacher.phone || 'No phone'}</p>
                                    </div>
                                </div>

                                {tp.headline && (
                                    <p className="text-sm font-medium text-brand-teal">{tp.headline}</p>
                                )}

                                {tp.bio && (
                                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">{tp.bio}</p>
                                )}

                                <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-medium">
                                        Rate: {tp.hourlyRate} LKR/hr
                                    </span>
                                    <span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg font-medium">
                                        Experience: {tp.experienceYears || 0} Years
                                    </span>
                                    {tp.subjects && tp.subjects.map((sub,i) => (
                                        <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                                {tp.verificationDocuments && tp.verificationDocuments.length > 0 && (
                                    <div className="pt-2">
                                        <p className="text-xs font-semibold text-slate-700 mb-1">Attached Documents:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {tp.verificationDocuments.map((docUrl, idx) => (
                                                <a key={idx} href={docUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-brand-blue hover:underline bg-brand-blue/5 px-2.5 py-1 rounded-lg border border-brand-blue/20">
                                                    <ExternalLink className="w-3 h-3"/>
                                                    <span>Document {idx + 1}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex sm:flex-col justify-end gap-2 border-t md:border-t-0 md:border-1 border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                                <button disabled={actionLoading === teacher._id} onClick={() => handleVerify(teacher._id,'approved',teacher.name)} className="flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm">
                                    <Check className="w-4 h-4"/>
                                    <span>Approve</span>
                                </button>
                                <button disabled={actionLoading === teacher._id} onClick={() => handleVerify(teacher._id, 'rejected', teacher.name)} className="flex items-center justify-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold transition-all">
                                    <X className="w-4 h-4"/>
                                    <span>Reject</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )}
        </div>
    )
}

export default AdminTeacherVerification;