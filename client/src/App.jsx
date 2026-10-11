import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App(){
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          <Navbar/>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <span className="inline-block bg-brand-teal/10 text-brand-teal font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              LearnyMo frontend Active
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Your Topic • Your Time • Your Teacher
              </h1>
              <p className="text-slate-600 max-w-xl mx-auto mb-6 text-sm">
                The online marketplace connecting students to teacher based on exact learning requirements.
              </p>
              <div className="flex justify-center gap-3">
                <span className="px-3 py-1 bg-brand/10 text-brand-blue rounded-md text-xs font-medium">
                  Tailwind CSS OK
                </span>
                <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-md text-xs font-medium">
                  AuthContext OK
                </span>
                <span className="px-3 py-1 bg-brand-yellow/20 text-amber-800 rounded-md text-xs font-medium">
                Navbar Component OK</span>
              </div>
            </div>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App