import { Link, Outlet } from 'react-router-dom';
import { Beaker, BookOpen, Terminal as TerminalIcon, Globe, Calculator } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
            <span className="font-bold text-xl tracking-tight">PracticeHub</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link to="/science" className="hover:text-blue-600 transition-colors">Science</Link>
            <Link to="/maths" className="hover:text-blue-600 transition-colors">Maths</Link>
            <Link to="/english" className="hover:text-blue-600 transition-colors">English</Link>
            <Link to="/tech" className="hover:text-blue-600 transition-colors">Tech</Link>
            <Link to="/spanish" className="hover:text-blue-600 transition-colors">Spanish</Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">G</div>
              <span className="font-bold text-xl tracking-tight">PracticeHub</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Empowering students to master the Edexcel and AQA mark schemes through interactive, data-driven practice.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Subjects</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/science" className="hover:text-white transition-colors">Biology & Physics</Link></li>
              <li><Link to="/maths" className="hover:text-white transition-colors">Mathematics</Link></li>
              <li><Link to="/english" className="hover:text-white transition-colors">English Literature</Link></li>
              <li><Link to="/tech" className="hover:text-white transition-colors">Computer Science</Link></li>
              <li><Link to="/spanish" className="hover:text-white transition-colors">Spanish & French</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Mark Scheme Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Revision Timetable</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Past Papers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2026 GCSE Exam Practice Hub. All rights reserved. Built for Edexcel Assessment Excellence.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
