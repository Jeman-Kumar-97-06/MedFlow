import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BedDouble, 
  Siren, 
  Users, 
  ClipboardList, 
  Bell, 
  Search, 
  Menu, 
  LogOut,
  AlertTriangle,
  Stethoscope,
  Clock,
  CheckCircle2,
  Activity,
  ArrowRight,
  Plus,
  Filter,
  MoreHorizontal,
  Phone
} from 'lucide-react';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, alert }) => (
  <motion.button
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-full transition-all duration-300 mb-2 relative
      ${active 
        ? 'bg-blue-100 text-blue-900 font-bold shadow-sm' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium'}
    `}
  >
    <Icon size={24} className={active ? "text-blue-700" : "text-slate-400"} />
    <span className="text-sm tracking-wide">{label}</span>
    {alert && (
      <span className="absolute right-4 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
    )}
  </motion.button>
);

const DepartmentCard = ({ name, capacity, occupied, trend, color, icon: Icon }) => {
  const percentage = Math.round((occupied / capacity) * 100);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group"
    >
       <div className={`absolute top-0 right-0 p-4 rounded-bl-[2rem] ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          <Icon size={24} />
       </div>

       <h3 className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-2">{name}</h3>
       <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-bold text-slate-900">{occupied}</span>
          <span className="text-sm text-slate-400 font-medium mb-1">/ {capacity} Beds</span>
       </div>

       {/* Progress Bar */}
       <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${percentage > 90 ? 'bg-red-500' : 'bg-blue-500'} rounded-full`}
          />
       </div>
       <div className="mt-2 flex justify-between items-center text-xs font-bold">
          <span className={percentage > 90 ? "text-red-500" : "text-blue-600"}>{percentage}% Full</span>
          <span className="text-slate-400">{trend}</span>
       </div>
    </motion.div>
  );
};

const TaskRow = ({ type, patient, room, time, status }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group cursor-pointer">
     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
        ${type === 'Admission' ? 'bg-green-100 text-green-700' : 
          type === 'Discharge' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}
     `}>
        {type === 'Admission' ? <Plus size={18} /> : 
         type === 'Discharge' ? <LogOut size={18} /> : <ClipboardList size={18} />}
     </div>
     <div className="flex-1">
        <h4 className="font-bold text-slate-800 text-sm">{patient}</h4>
        <div className="text-xs text-slate-500 flex gap-2">
           <span>{type}</span>
           <span>•</span>
           <span className="font-mono text-slate-400">Rm {room}</span>
        </div>
     </div>
     <div className="text-right">
        <div className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md mb-1">{time}</div>
     </div>
     <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all">
        <CheckCircle2 size={16} />
     </button>
  </div>
);

const StaffAvatar = ({ img, status }) => (
  <div className="relative cursor-pointer group">
    <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden transition-transform group-hover:scale-110 group-hover:ring-2 ring-blue-400">
      <img src={img} alt="Staff" className="w-full h-full object-cover" />
    </div>
    <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full
       ${status === 'Available' ? 'bg-green-500' : status === 'Busy' ? 'bg-red-500' : 'bg-orange-500'}
    `} />
  </div>
);

// --- Main Dashboard ---

export default function HospitalStaffDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 selection:bg-blue-200">
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             onClick={() => setSidebarOpen(false)}
             className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
           />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:sticky top-0 h-screen z-50 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 w-72
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Activity size={20} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Med<span className="text-blue-600">Ops</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { icon: LayoutDashboard, label: 'Overview' },
            { icon: BedDouble, label: 'Bed Mgmt', alert: true },
            { icon: Siren, label: 'Emergency' },
            { icon: Users, label: 'Staff Roster' },
            { icon: ClipboardList, label: 'Tasks' },
          ].map((item) => (
            <SidebarItem 
              key={item.label}
              {...item}
              active={activeTab === item.label}
              onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
            />
          ))}
        </nav>

        {/* Emergency Trigger (Sidebar) */}
        <div className="p-6">
           <button className="w-full py-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all shadow-sm hover:shadow-red-500/20 group">
              <AlertTriangle size={20} className="group-hover:animate-bounce" /> Report Incident
           </button>
        </div>

        <div className="p-4 border-t border-slate-100">
           <SidebarItem icon={LogOut} label="Log Out" onClick={() => {}} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex items-center justify-between shrink-0 z-30">
           <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 rounded-full hover:bg-slate-100"><Menu /></button>
             <h1 className="text-xl font-bold text-slate-800 hidden md:block">Floor 3: General Ward</h1>
             <div className="hidden md:flex items-center gap-2 text-slate-400 bg-slate-100 px-4 py-2 rounded-full border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all ml-4 w-64">
                <Search size={16} />
                <input type="text" placeholder="Search patient or room..." className="bg-transparent outline-none text-sm w-full placeholder-slate-400" />
             </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Operational
              </div>
              <div className="w-px h-8 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <div className="text-sm font-bold text-slate-800">Head Nurse Joy</div>
                    <div className="text-xs text-slate-500">Shift Lead</div>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=44" alt="Profile" />
                 </div>
              </div>
           </div>
        </header>

        {/* Scrollable Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">

           {/* Stats Overview */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <DepartmentCard name="Emergency Room" capacity={20} occupied={18} trend="+4 in last hr" color="bg-red-500" icon={Siren} />
              <DepartmentCard name="Intensive Care" capacity={12} occupied={8} trend="Stable" color="bg-purple-500" icon={Activity} />
              <DepartmentCard name="General Ward" capacity={45} occupied={32} trend="2 Discharging" color="bg-blue-500" icon={BedDouble} />
              <DepartmentCard name="Pediatrics" capacity={15} occupied={14} trend="High Capacity" color="bg-orange-500" icon={Users} />
           </div>

           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Left Column: Shift & Tasks (2/3) */}
              <div className="xl:col-span-2 space-y-8">
                 
                 {/* ER Status Banner - Only shows if critical */}
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   className="bg-red-600 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-red-600/20 relative overflow-hidden"
                 >
                    <div className="absolute -left-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
                    <div className="relative z-10 flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                          <Siren size={24} />
                       </div>
                       <div>
                          <h3 className="font-bold text-lg">ER High Volume Alert</h3>
                          <p className="text-red-100 text-sm">Wait time exceeds 45 mins. 3 Ambulances inbound.</p>
                       </div>
                    </div>
                    <button className="bg-white text-red-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-red-50 transition-colors z-10">
                       View Protocol
                    </button>
                 </motion.div>

                 {/* Active Tasks Board */}
                 <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                       <div>
                          <h3 className="text-lg font-bold text-slate-800">Operational Tasks</h3>
                          <p className="text-slate-400 text-xs">Updated 2 mins ago</p>
                       </div>
                       <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full"><Filter size={18} /></button>
                          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full"><MoreHorizontal size={18} /></button>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Priority</div>
                       <TaskRow type="Admission" patient="John Doe (Trauma)" room="ER-04" time="Now" />
                       <TaskRow type="Lab Test" patient="Sarah Connor" room="ICU-02" time="15m ago" />
                       
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Routine</div>
                       <TaskRow type="Discharge" patient="Michael Smith" room="304-A" time="1h ago" />
                       <TaskRow type="Checkup" patient="Emily Blunt" room="305-B" time="2h ago" />
                    </div>
                 </div>
              </div>

              {/* Right Column: Staff & Quick Actions (1/3) */}
              <div className="space-y-8">
                 
                 {/* On Duty Staff */}
                 <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="text-lg font-bold text-slate-800">On Duty (Shift A)</h3>
                       <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">8 Active</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                       <StaffAvatar img="https://i.pravatar.cc/150?img=68" status="Available" />
                       <StaffAvatar img="https://i.pravatar.cc/150?img=60" status="Busy" />
                       <StaffAvatar img="https://i.pravatar.cc/150?img=52" status="Available" />
                       <StaffAvatar img="https://i.pravatar.cc/150?img=33" status="OnBreak" />
                       <StaffAvatar img="https://i.pravatar.cc/150?img=12" status="Busy" />
                       <button className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
                          <Plus size={20} />
                       </button>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                       <div className="flex justify-between items-center text-sm font-bold text-slate-700 mb-1">
                          <span>Shift Ends</span>
                          <span>18:00</span>
                       </div>
                       <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="w-[70%] h-full bg-blue-500 rounded-full" />
                       </div>
                       <div className="text-right text-xs text-slate-400 mt-1">4h 30m remaining</div>
                    </div>
                 </div>

                 {/* Quick Actions Grid */}
                 <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl" />
                    <h3 className="text-lg font-bold mb-6 relative z-10">Quick Actions</h3>
                    
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                       <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center gap-2 transition-all">
                          <Phone size={24} className="text-blue-300" />
                          <span className="text-xs font-bold">Page Doctor</span>
                       </button>
                       <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center gap-2 transition-all">
                          <BedDouble size={24} className="text-blue-300" />
                          <span className="text-xs font-bold">Assign Bed</span>
                       </button>
                       <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-2xl flex flex-col items-center gap-2 transition-all">
                          <ClipboardList size={24} className="text-blue-300" />
                          <span className="text-xs font-bold">New Task</span>
                       </button>
                       <button className="bg-red-500 hover:bg-red-600 p-4 rounded-2xl flex flex-col items-center gap-2 transition-all shadow-lg shadow-red-900/20">
                          <Siren size={24} className="text-white" />
                          <span className="text-xs font-bold">Code Blue</span>
                       </button>
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </main>
    </div>
  );
}