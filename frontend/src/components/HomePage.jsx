import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Users, 
  CalendarDays, 
  MessageSquare, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Plus,
  ArrowUpRight,
  Stethoscope,
  ChevronRight,
  LogOut
} from 'lucide-react';

// --- Theme Constants ---
// Using the same Teal/Coral/Slate palette for consistency

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-full transition-all duration-300 mb-2
      ${active 
        ? 'bg-teal-100 text-teal-900 font-bold shadow-sm' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 font-medium'}
    `}
  >
    <Icon size={24} className={active ? "text-teal-700" : "text-slate-400"} />
    {!collapsed && (
      <motion.span 
        initial={{ opacity: 0, x: -10 }} 
        animate={{ opacity: 1, x: 0 }}
        className="text-sm tracking-wide"
      >
        {label}
      </motion.span>
    )}
  </motion.button>
);

const StatCard = ({ title, value, trend, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${color} opacity-10 group-hover:scale-150 transition-transform duration-500`} />
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-20 text-slate-800`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-100">
        <ArrowUpRight size={14} className="text-green-600" />
        <span className="text-xs font-bold text-green-700">{trend}</span>
      </div>
    </div>
    
    <div className="relative z-10">
      <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </div>
  </motion.div>
);

const AppointmentRow = ({ name, time, type, status, img }) => {
  const statusColors = {
    'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
    'Waiting': 'bg-orange-100 text-orange-700 border-orange-200',
    'Confirmed': 'bg-teal-100 text-teal-700 border-teal-200',
    'Finished': 'bg-slate-100 text-slate-600 border-slate-200'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)" }}
      className="flex items-center p-4 rounded-2xl transition-colors cursor-pointer group"
    >
      <div className="w-16 text-sm font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
        {time}
      </div>
      <div className="relative">
         <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
            <img src={img} alt={name} className="w-full h-full object-cover" />
         </div>
         {status === 'In Progress' && (
           <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
         )}
      </div>
      <div className="ml-4 flex-1">
        <h4 className="font-bold text-slate-800">{name}</h4>
        <div className="text-xs text-slate-500 font-medium">{type}</div>
      </div>
      <div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <button className="p-2 text-slate-400 hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-all">
        <MoreVertical size={18} />
      </button>
    </motion.div>
  );
};

// --- Custom Animated Chart (CSS/Framer) ---
const WeeklyActivityChart = () => {
  const data = [40, 70, 45, 90, 60, 80, 50];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="flex items-end justify-between h-40 gap-3 mt-4">
      {data.map((h, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
          <div className="relative w-full h-full flex items-end justify-center rounded-2xl bg-slate-50 overflow-hidden">
             <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                className="w-full mx-1 bg-teal-200 group-hover:bg-teal-600 transition-colors rounded-t-lg opacity-80"
             />
          </div>
          <span className="text-xs font-bold text-slate-400 group-hover:text-teal-700">{days[i]}</span>
        </div>
      ))}
    </div>
  );
};

// --- Main App ---

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard' },
    { icon: Users, label: 'Patients' },
    { icon: CalendarDays, label: 'Schedule' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: FileText, label: 'Invoices' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 selection:bg-teal-200">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:sticky top-0 h-screen z-50 bg-white border-r border-slate-100 flex flex-col transition-all duration-300
          ${sidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full lg:translate-x-0 lg:w-24 xl:w-72'}
        `}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-700/20 shrink-0">
            <Stethoscope size={20} />
          </div>
          <span className="app_title text-3xl font-bold tracking-tight hidden xl:block">Med<span className="text-teal-700">Flow</span></span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.label}
              {...item}
              active={activeTab === item.label}
              onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
              collapsed={false} // Handle responsive logic in styling above for simplicity
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <SidebarItem icon={LogOut} label="Sign Out" />
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full">
               <Menu />
             </button>
             <div className="hidden md:flex items-center gap-2 text-slate-400 bg-slate-100/50 px-4 py-2.5 rounded-full border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-all w-64">
               <Search size={18} />
               <input 
                 type="text" 
                 placeholder="Search patients, records..." 
                 className="bg-transparent outline-none text-slate-800 text-sm w-full placeholder-slate-400 font-medium"
               />
             </div>
           </div>

           <div className="flex items-center gap-4">
             <motion.button whileTap={{ scale: 0.9 }} className="relative p-3 text-slate-500 hover:bg-teal-50 hover:text-teal-700 rounded-full transition-colors">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
             </motion.button>
             
             <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
               <div className="text-right hidden md:block">
                 <div className="text-sm font-bold text-slate-800">Dr. Sarah Wilson</div>
                 <div className="text-xs text-slate-500 font-medium">Cardiologist</div>
               </div>
               <div className="w-10 h-10 rounded-full bg-teal-100 border-2 border-white shadow-sm overflow-hidden cursor-pointer hover:ring-2 ring-teal-500 transition-all">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Profile" />
               </div>
             </div>
           </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
               <h1 className="text-3xl font-bold text-slate-900 mb-2">Good Morning, Dr. Wilson 👋</h1>
               <p className="text-slate-500 font-medium">You have <span className="text-teal-700 font-bold">12 patients</span> remaining today.</p>
             </motion.div>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-teal-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-teal-700/25 flex items-center gap-2"
             >
               <Plus size={20} /> New Appointment
             </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard icon={Users} title="Total Patients" value="1,240" trend="+12%" color="bg-blue-500" delay={0.1} />
            <StatCard icon={CalendarDays} title="Appointments" value="42" trend="+5%" color="bg-teal-500" delay={0.2} />
            <StatCard icon={FileText} title="Revenue" value="$12.8k" trend="+18%" color="bg-orange-500" delay={0.3} />
            <StatCard icon={MessageSquare} title="Consultations" value="28" trend="+2%" color="bg-purple-500" delay={0.4} />
          </div>

          {/* Main Layout Split */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Col (2/3) */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Up Next Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-teal-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl"
              >
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
                 
                 <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-teal-700/50 shadow-xl overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=32" alt="Patient" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-green-500 text-teal-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-900 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live
                      </div>
                    </div>
                    
                    <div className="text-center md:text-left flex-1">
                      <div className="text-teal-300 font-bold uppercase tracking-wider text-xs mb-2">Current Consultation</div>
                      <h2 className="text-3xl font-bold mb-1">Jane Cooper</h2>
                      <p className="text-teal-100 text-lg mb-4">Routine Checkup • 10:30 AM - 11:00 AM</p>
                      
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <button className="px-6 py-2.5 bg-white text-teal-900 rounded-full font-bold text-sm hover:bg-teal-50 transition-colors">View Records</button>
                        <button className="px-6 py-2.5 bg-teal-800 text-white border border-teal-700 rounded-full font-bold text-sm hover:bg-teal-700 transition-colors">Notes</button>     
                      </div>
                    </div>

                    <div className="hidden md:block w-px h-24 bg-teal-800" />
                    
                    <div className="text-center">
                       <div className="text-4xl font-bold text-white mb-1 font-mono">14:20</div>
                       <div className="text-xs text-teal-300 font-bold uppercase">Timer</div>
                       <button className="mt-2 px-6 py-2.5 bg-teal-800 text-white border border-teal-700 rounded-full font-bold text-sm hover:bg-teal-700 transition-colors">Extend Time?</button>  
                    </div>
                 </div>
              </motion.div>

              {/* Today's Schedule */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Today's Schedule</h3>
                  <button className="text-sm font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1">
                    View Calendar <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="space-y-2">
                   <AppointmentRow name="Robert Fox" time="09:00 AM" type="Dental Checkup" status="Finished" img="https://i.pravatar.cc/150?img=11" />
                   <AppointmentRow name="Jane Cooper" time="10:30 AM" type="Routine Checkup" status="In Progress" img="https://i.pravatar.cc/150?img=32" />
                   <AppointmentRow name="Cody Fisher" time="11:15 AM" type="Post-surgery Followup" status="Waiting" img="https://i.pravatar.cc/150?img=8" />
                   <AppointmentRow name="Esther Howard" time="01:00 PM" type="Consultation" status="Confirmed" img="https://i.pravatar.cc/150?img=5" />
                   <AppointmentRow name="Jenny Wilson" time="02:30 PM" type="Emergency" status="Confirmed" img="https://i.pravatar.cc/150?img=1" />
                </div>
              </div>

            </div>

            {/* Right Col (1/3) */}
            <div className="space-y-8">
              
              {/* Analytics Card */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-lg font-bold text-slate-800">Patient Trends</h3>
                   <div className="p-2 bg-slate-50 rounded-full cursor-pointer hover:bg-slate-100"><MoreVertical size={16} className="text-slate-400"/></div>
                </div>
                <p className="text-sm text-slate-500 mb-6">Weekly patient visits analytics.</p>
                <WeeklyActivityChart />
              </div>

              {/* Quick Actions */}
              <div className="bg-teal-50 rounded-[2.5rem] p-8 border border-teal-100">
                <h3 className="text-lg font-bold text-teal-900 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Add Patient", icon: Users },
                    { label: "Prescription", icon: FileText },
                    { label: "Lab Test", icon: Stethoscope },
                    { label: "Reminder", icon: Clock },
                  ].map((action, i) => (
                    <motion.button 
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center justify-center gap-2 p-4 bg-white/60 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-teal-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                        <action.icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-teal-900">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <h3 className="text-lg font-bold text-slate-800 mb-6">Notifications</h3>
                 <div className="space-y-6">
                    {[
                      { title: "Lab Results Available", time: "10 mins ago", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100" },
                      { title: "Appointment Cancelled", time: "45 mins ago", icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
                      { title: "New Insurance Update", time: "2 hrs ago", icon: FileText, color: "text-blue-500", bg: "bg-blue-100" },
                    ].map((notif, i) => (
                      <div key={i} className="flex gap-4">
                         <div className={`w-10 h-10 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center shrink-0`}>
                           <notif.icon size={18} />
                         </div>
                         <div>
                           <div className="text-sm font-bold text-slate-800">{notif.title}</div>
                           <div className="text-xs text-slate-400 font-medium">{notif.time}</div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}