import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Camera, Save, Shield, Bell } from 'lucide-react';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Thompson',
    email: 'alex.thompson@school.edu',
    phone: '+44 7700 900123',
    location: 'London, UK',
    school: 'St. Mary\'s Secondary School',
    yearGroup: 'Year 11',
    targetGrade: '8',
    bio: 'Focused on achieving top grades in STEM subjects. Passionate about computer science and physics.'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to a backend
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
          <p className="text-slate-500 mt-1">Manage your personal information and preferences</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all ${
            isEditing 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
          }`}
        >
          {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><User className="w-4 h-4" /> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                <User className="w-16 h-16 text-blue-400" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-800 mt-4">{profile.name}</h2>
            <p className="text-blue-600 font-medium">{profile.yearGroup}</p>
            <div className="mt-6 pt-6 border-t border-slate-50 space-y-4 text-left">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[32px] text-white">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-emerald-400" /> Account Security
            </h3>
            <p className="text-slate-400 text-sm mb-6">Your account is protected with two-factor authentication.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors">
              Update Password
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Info & Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={e => setProfile({...profile, name: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                ) : (
                  <p className="p-3 bg-slate-50 rounded-xl text-slate-700">{profile.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                {isEditing ? (
                  <input 
                    type="email" 
                    value={profile.email} 
                    onChange={e => setProfile({...profile, email: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                ) : (
                  <p className="p-3 bg-slate-50 rounded-xl text-slate-700">{profile.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">School</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={profile.school} 
                    onChange={e => setProfile({...profile, school: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                ) : (
                  <p className="p-3 bg-slate-50 rounded-xl text-slate-700">{profile.school}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Grade Average</label>
                {isEditing ? (
                  <select 
                    value={profile.targetGrade} 
                    onChange={e => setProfile({...profile, targetGrade: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    {[4,5,6,7,8,9].map(g => <option key={g} value={g}>Grade {g}</option>)}
                  </select>
                ) : (
                  <p className="p-3 bg-slate-50 rounded-xl text-slate-700">Grade {profile.targetGrade}</p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bio</label>
              {isEditing ? (
                <textarea 
                  rows={4}
                  value={profile.bio} 
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              ) : (
                <p className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" /> Notification Preferences
            </h3>
            <div className="space-y-4">
              {[
                { id: 'reminders', label: 'Study Reminders', desc: 'Get notified when it\'s time for your scheduled revision.' },
                { id: 'grades', label: 'Grade Updates', desc: 'Receive alerts when new practice paper results are available.' },
                { id: 'tips', label: 'Weekly Study Tips', desc: 'Curated advice to help you master the mark scheme.' }
              ].map(pref => (
                <div key={pref.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{pref.label}</p>
                    <p className="text-xs text-slate-500">{pref.desc}</p>
                  </div>
                  <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
