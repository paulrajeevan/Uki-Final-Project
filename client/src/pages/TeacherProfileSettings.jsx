import { useState,useEffect } from "react";
import API from '../api/axios'
import {Briefcase, AlertCircle, CheckCircle, Clock, Save, FileText} from 'lucide-react'

const TeacherProfileSettings = () => {
    const [formData, setFormData] = useState({
        headline: '',
        bio: '',
        hourlyRate: 0,
        experienceYears: 0,
        subject: '',
        qualifications: '',
        verficationDocuments: ''
    })
    const [verficationStatus, setVerificationStatus] = useState('pending')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(()=>{
        const fetchProfile = async () => {
            try{
                const res = await API.get('/teachers/profile')
                const tp = res.data.teacherProfile || {}

                setVerificationStatus(tp.verificationStatus || 'pending')
                setFormData({
                    headline: tp.headline || '',
                    bio: tp.bio || '',
                    hourlyRate: tp.hourlyRate || 0,
                    experienceYears: tp.experienceYears || 0,
                    subject: tp.subject ? tp.subject.join(', '): '',
                    qualifications: tp.qualifications ? tp.qualifications.join(', '):'',
                    verficationDocuments: tp.verficationDocuments ? tp.verficationDocuments.join(', '):'',
                })
            }catch (err){
                setError(err.response?.data?.message || 'Failed to load teacher profile') 
            }finally{
                setLoading(false)
            }
        }
        fetchProfile();
    },[])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage('')
        setError('')

        try {
            const payload = {
                ...formData,
                subject: formData.subject.split(',').map((s) => s.trim()).filter(Boolean),
                qualifications: formData.qualifications.split(',').map((q)=>q.trim()).filter(Boolean),
                verficationDocuments: formData.verficationDocuments.split(',').map((d)=>d.trim()).filter(Boolean)
            }

            const res = await API.put('/teachers/profile', payload)

            setVerificationStatus(res.data.teacherProfile.verficationStatus)
            setMessage('Profile updated! Your chages are pending Admin approval.')
        }catch(err){
            setError(err.response?.data?.message || 'Failed to update profile')
        }finally {
            setSaving(false)
        }
    }
    if(loading){
        return <div className="p-8 text-center text-slate-500">Loading your profile...</div>
    }
}

export default TeacherProfileSettings