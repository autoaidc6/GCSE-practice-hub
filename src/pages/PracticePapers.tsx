import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Clock, ChevronRight, ExternalLink, Database } from 'lucide-react';
import { GoogleDriveService, DriveFile } from '../services/GoogleDriveService';

interface Subject {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

interface Paper {
  id: string;
  subject: string;
  title: string;
  questions: number;
  duration: number;
  type: 'practice' | 'past';
}

interface PracticePapersProps {
  subjects: Subject[];
  papers: Paper[];
}

export const PracticePapers: React.FC<PracticePapersProps> = ({ subjects, papers }) => {
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkStatus();
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        checkStatus();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkStatus = async () => {
    try {
      const status = await GoogleDriveService.getAuthStatus();
      setIsConnected(status);
      if (status) {
        fetchFiles();
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const files = await GoogleDriveService.getFiles();
      setDriveFiles(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const url = await GoogleDriveService.getAuthUrl();
      window.open(url, 'google_oauth', 'width=600,height=700');
    } catch (error) {
      console.error('Error getting auth URL:', error);
    }
  };

  const handleLogout = async () => {
    await GoogleDriveService.logout();
    setIsConnected(false);
    setDriveFiles([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-12 gap-10"
    >
      {/* Sidebar */}
      <div className="col-span-3">
        <div className="bg-slate-50 p-2 rounded-2xl space-y-1">
          <button className="w-full text-left px-6 py-4 rounded-xl text-sm font-bold bg-white shadow-sm">All subjects</button>
          {subjects.map(s => (
            <button key={s.id} className="w-full text-left px-6 py-4 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100">{s.name}</button>
          ))}
        </div>
      </div>

      {/* Papers List */}
      <div className="col-span-9 space-y-8">
        <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
          <button className="px-12 py-3 bg-white rounded-xl text-sm font-bold shadow-sm">Practice papers</button>
          <button className="px-12 py-3 text-slate-500 text-sm font-medium">Past papers</button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">All practice papers on Atom</h2>
              <p className="text-slate-500 text-sm">Atom's predicted GCSE papers are built by our experts to show you what's likely to come up in the 2026 exams</p>
            </div>
            {!isConnected ? (
              <button 
                onClick={handleConnect}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <Database className="w-4 h-4" /> Connect Google Drive
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Disconnect Drive
              </button>
            )}
          </div>
          
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for any paper" 
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="space-y-3 mt-8">
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Google Drive Files */}
            {driveFiles.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Google Drive Resources</h3>
                <div className="space-y-3">
                  {driveFiles.map((file) => (
                    <a 
                      key={file.id}
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-6 bg-blue-50/50 border border-blue-100 rounded-2xl hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <img src={file.iconLink} alt="" className="w-6 h-6" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-700 block">{file.name}</span>
                          <span className="text-xs text-blue-500 font-medium">Google Drive Resource</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <ExternalLink className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-all" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Atom Practice Papers</h3>
            {papers.map((paper) => {
              const subject = subjects.find(s => s.name === paper.subject);
              return (
                <div 
                  key={paper.id}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-10 h-10 ${subject?.color} rounded-xl flex items-center justify-center text-white`}>
                      {subject?.icon}
                    </div>
                    <span className="font-bold text-slate-700">GSCE {paper.subject}: {paper.title}</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <Clock className="w-4 h-4" /> {paper.questions} Qs
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <Clock className="w-4 h-4" /> {paper.duration} mins
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-blue-600 transition-all">
                      <ChevronRight className="w-5 h-5 text-blue-500 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
