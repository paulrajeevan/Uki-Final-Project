import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { GraduationCap,Briefcase,Mail,Lock,User,Phone,BookOpen,AlertCircle } from "lucide-react";

const Register = () => {
    const [role, setRole] = useState('student')
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        phone: '',
        grade: '',
        school: '',
        hourlyRate: '',
        subjects: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {register} = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try{
            const submissionData = {
                ...formData,
                role,
                subject: role === 'teacher' && formData.subjects ? formData.subjects.split(',').map((s) => s.trim()) : []
            }

            await register(submissionData)
            navigate('/')
        }catch(err){
            setError(err.response?.data?.message || 'Registration failed. Please check your inputs.')
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="max-w-md mx-auto my-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Create your Account</h2>
                <p className="text-sm text-slate-500 mt-1">Join LearnyMo to start learning or teaching</p>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose text-rose-700 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0"/>
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-6">
                <button type="button" onClick={() => setRole('student')} className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'student' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                    <GraduationCap className="w-4 h-4"/>
                    Student
                </button>
                <button type="button" onClick={() => setRole('teacher')} className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg transition-all ${ role === 'teacher' ? 'bg-white text-brand-teal shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
                    <Briefcase className="w-4 h-4"/>
                    Teacher
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                    <div className="relative"><User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g John Doe" className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"/>
                        </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
                    <div className="relative"><Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400"/>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" /></div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Password</label>
                    <div className="relative">
                        <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400"/>
                        <input type="password" name="password" required  minLength={6} value={formData.password} onChange={handleChange} placeholder="At least 6 characters" className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register