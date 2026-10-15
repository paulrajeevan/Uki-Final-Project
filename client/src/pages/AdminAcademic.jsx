import { useState,useEffect } from "react";
import API from '../api/axios'
import { BookOpen, Trash2, Plus,Layers,AlertCircle } from "lucide-react";

const AdminAcademic = () => {
    const [academic, setAcademics] = useState([])
    const [loading,setLoading] = useState(true)
    const [message, setMessage] = useState('')

    const loadData = async () => {
        try {
            const res = await API.get('/academic')
            setAcademics(res.data)
        } catch (error) {
            console.error(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        loadData()
    },[])

    const handleDelete = async (id, subjectName) => {
        if (!window.confirm(`Are you sure want to delete ${subjectName}`)) return

        try {
            
        } catch (error) {
            
        }
    }
}

export default AdminAcademic;