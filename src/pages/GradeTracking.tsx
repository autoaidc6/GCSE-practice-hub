import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, ChevronRight, Database, RefreshCw } from 'lucide-react';
import { ProgressBar } from '../components/Common';
import { GoogleDriveService } from '../services/GoogleDriveService';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface Subject {
  id: string;
  name: string;
  color: string;
  lightColor: string;
  grade: number;
  progress: number;
}

interface GradeTrackingProps {
  subjects: Subject[];
}

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 68 },
  { name: 'Wed', score: 75 },
  { name: 'Thu', score: 72 },
  { name: 'Fri', score: 82 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 88 },
];

export const GradeTracking: React.FC<GradeTrackingProps> = ({ subjects }) => {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetData, setSheetData] = useState<any[][]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const status = await GoogleDriveService.getAuthStatus();
    setIsConnected(status);
  };

  const handleSync = async () => {
    if (!spreadsheetId) {
      alert('Please enter a Google Spreadsheet ID');
      return;
    }
    setIsSyncing(true);
    try {
      const data = await GoogleDriveService.getSheetData(spreadsheetId);
      setSheetData(data);
      // In a real app, we would process this data to update the subjects state
      console.log('Fetched sheet data:', data);
    } catch (error) {
      console.error('Error syncing with sheet:', error);
      alert('Failed to sync. Make sure the Spreadsheet ID is correct and you have access.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConnect = async () => {
    const url = await GoogleDriveService.getAuthUrl();
    window.open(url, 'google_oauth', 'width=600,height=700');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="grid grid-cols-12 gap-10"
    >
      {/* Sidebar */}
      <div className="col-span-3">
        <div className="bg-slate-50 p-2 rounded-2xl space-y-1">
          <button className="w-full text-left px-6 py-4 rounded-xl text-sm font-bold bg-white shadow-sm">Summary</button>
          {subjects.map(s => (
            <button key={s.id} className="w-full text-left px-6 py-4 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100">{s.name}</button>
          ))}
        </div>
      </div>

      {/* Main Stats */}
      <div className="col-span-9 space-y-10">
        <section className="bg-blue-600 p-8 rounded-[32px] text-white shadow-xl shadow-blue-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Sync your grades</h2>
              <p className="text-blue-100 text-sm mt-1">Connect a Google Sheet to automatically update your predicted grades</p>
            </div>
            {!isConnected ? (
              <button 
                onClick={handleConnect}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all"
              >
                Connect Google Account
              </button>
            ) : (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Spreadsheet ID" 
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  className="px-4 py-2 bg-blue-500/50 border border-blue-400 rounded-xl text-sm placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button 
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all disabled:opacity-50"
                >
                  {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                  Sync Now
                </button>
              </div>
            )}
          </div>
          
          {sheetData.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-4 border border-white/20">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Recent Sheet Data</p>
              <div className="grid grid-cols-3 gap-4">
                {sheetData.slice(0, 3).map((row, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-bold">{row[0]}:</span> {row[1]}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold">Your predicted grades</h2>
            <button className="text-blue-600 text-sm font-bold">View all insights</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {subjects.slice(0, 4).map((s) => (
              <div key={s.id} className={`p-6 rounded-2xl ${s.lightColor} border border-white shadow-sm`}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-slate-600">{s.name}</span>
                  <span className="text-4xl font-bold text-slate-900">{s.grade}</span>
                </div>
                <ProgressBar progress={s.progress} color={s.color} />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Weekly Progress</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  hide 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section className="bg-orange-50/50 p-8 rounded-[32px] border border-orange-100">
            <h2 className="text-2xl font-bold mb-8">Your streak</h2>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                <Flame className="w-10 h-10 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <div className="text-5xl font-bold">23</div>
                <div className="text-slate-500 font-medium">current streak</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border border-orange-50">
              <div>
                <div className="text-3xl font-mono tracking-widest font-bold">1 2 : 5 6 : 5 6</div>
                <div className="text-xs text-slate-400 mt-1">left to continue your streak</div>
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200">Start a session</button>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 rotate-180 text-slate-300" />
                <span className="font-bold">August</span>
                <span className="text-slate-400">2025</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
              <ChevronRight className="w-4 h-4 rotate-90 text-slate-300" />
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-300 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <div key={i}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isStreak = day >= 7 && day <= 30;
                const isToday = day === 29;
                return (
                  <div 
                    key={day} 
                    className={`aspect-square flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                      isToday ? 'bg-white border-2 border-slate-900 text-slate-900' :
                      isStreak ? 'bg-yellow-400 text-white' : 'text-slate-400'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
