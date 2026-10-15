import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AcademicSelector from "./components/AcademicSelector"
import AdminAcademic from "./pages/AdminAcademic";

function App(){
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <Navbar/>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Routes>
            <Route path="/" element={
              <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
                <h1 className="text-3xl font-extrabold text-slate-900">
                  Your Topic • Your Time • Your Teacher
                </h1>
                <p className="text-slate-600 max-w-xl mx-auto mb-6 text-sm">
                  The online marketplace connecting students to teachers based on exact learning requirements.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <AcademicSelector onSelect={(selected) => console.log('Chosen topic:', selected)}/>
              </div>
              </div>
            } />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/admin/academic" element={<AdminAcademic/>}/>
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App