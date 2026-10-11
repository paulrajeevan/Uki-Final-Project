import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import {BookOpen, LogOut, User as UserIcon} from 'lucide-react'

const Navbar = () => {
    const {user,logout} = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return(
        <nav className='bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <Link to="/" className='flex items-center gap-2'>
                    <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue via-brand-purple to-brand-teal flex items-center justify-center text-white shadow-md'>
                        <BookOpen className='w-6 h-6' />
                    </div>
                    <div>
                        <span className='text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent'>
                            LearnyMo
                        </span>
                        <p className='text-[10px] text-slate-400 -mt-1 font-medium tracking-tight'>
                            Your Topic • Your Time • Your Teacher
                        </p>
                    </div>
                    </Link>

                    <div className='hidden md:flex items-center gap-6'>
                        <Link to="/" className='text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors'>
                        Home
                        </Link>
                        <Link to="/classes" className='text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors'>
                        Find Classes
                        </Link>
                        <Link to='/for-students' className='text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors'>
                        For Students
                        </Link>
                        <Link to="/for-teachers" className='text-sm font-medium text-slate-600 hover:text-brand-blue transition-colors'>
                        For Teachers
                        </Link>
                    </div>

                    <div className='flex items-center gap-3'>
                        {user ? (
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full'>
                                    <UserIcon className='w-4 h-4 text-brand-purple' />
                                        <span className='text-sm font-medium text-slate-700'>
                                            {user.name}
                                        </span>
                                        <span className='text-[11px] uppercase tracking-wider font-semibold bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full'>
                                        {user.role}
                                        </span>
                                        </div>
                                            <button onClick={handleLogout} className='flex items-center gap-1 text-sm text-rose-600 hover:text-rose-700 font-medium px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors'>
                                                <LogOut className='w-4 h-4'/>
                                                <span>Logout</span>
                                            </button>
                                </div>
                        ):(
                            <div className='flex items-center gap-2'>
                                <Link to="/login" className='text-sm font-medium text-slate-700 hover:text-brand-blue px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors'>
                                Log In
                                </Link>
                                <Link to="/register" className='text-sm font-medium text-white bg-brand-blue hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm hover-shadow transition-all'>
                                Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;