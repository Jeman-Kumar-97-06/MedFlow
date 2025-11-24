import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Calendar, 
  MessageCircle, 
  FileText, 
  User, 
  Bell, 
  Search, 
  Menu, 
  Plus, 
  Clock, 
  MapPin, 
  Video, 
  Heart, 
  Activity, 
  Pill, 
  ChevronRight, 
  Star,
  Thermometer,
  LogOut
} from 'lucide-react';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
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
    <span className="text-sm tracking-wide">{label}</span>
  </motion.button>
);

const VitalCard = ({ icon: Icon, label, value, unit, color, bg, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.05)" }}
    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-start justify-between h-40 relative overflow-hidden"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${bg} opacity-50 blur-2xl`} />
    
    <div className={`p-3 rounded-2xl ${bg} ${color} mb-4`}>
      <Icon size={24} />
    </div>
    <div>
      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-slate-800">{value}</span>
        <span className="text-sm text-slate-500 font-medium">{unit}</span>
      </div>
    </div>
  </motion.div>
);

const DoctorCard = ({ name, specialty, rating, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="min-w-[240px] bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
  >
    <div className="relative mb-4">
      <div className="w-full h-40 rounded-[1.5rem] overflow-hidden bg-slate-100">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-orange-500 shadow-sm">
        <Star size={12} fill="currentColor" /> {rating}
      </div>
    </div>
    <h3 className="font-bold text-slate-800">{name}</h3>
    <p className="text-sm text-slate-500 mb-3">{specialty}</p>
    <button className="w-full py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-bold group-hover:bg-teal-700 group-hover:text-white transition-colors">
      Book Visit
    </button>
  </motion.div>
);

const MedicationRow = ({ name, dose, time, taken }) => {
  const [isTaken, setIsTaken] = useState(taken);

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isTaken ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
          <Pill size={24} />
        </div>
        <div>
          <h4 className={`font-bold transition-all ${isTaken ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{name}</h4>
          <p className="text-xs text-slate-500 font-medium">{dose} • {time}</p>
        </div>
      </div>
      <button 
        onClick={() => setIsTaken(!isTaken)}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
          ${isTaken ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 text-transparent hover:border-teal-500'}
        `}
      >
        <Heart size={14} fill="currentColor" />
      </button>
    </div>
  );
};

// --- Main Component ---

export default function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Cardiology', 'Dentist', 'Neurology', 'General'];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-teal-200">
      
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
        className={`fixed lg:sticky top-0 h-screen z-50 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 w-72
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-700/20">
            <Heart size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Med<span className="text-teal-700">Life</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {[
            { icon: LayoutGrid, label: 'Overview' },
            { icon: Calendar, label: 'Appointments' },
            { icon: User, label: 'My Doctors' },
            { icon: FileText, label: 'Prescriptions' },
            { icon: MessageCircle, label: 'Messages' },
          ].map((item) => (
            <SidebarItem 
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.label}
              onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
            />
          ))}
        </nav>

        <div className="p-6 mx-4 mb-4 bg-teal-50 rounded-3xl border border-teal-100 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-teal-700 shadow-sm">
              <Star size={20} fill="currentColor" />
            </div>
            <h4 className="font-bold text-teal-900 text-sm mb-1">Go Premium</h4>
            <p className="text-xs text-teal-700/80 mb-3">Get unlimited consultations & priority support.</p>
            <button className="w-full py-2 bg-teal-700 text-white rounded-full text-xs font-bold hover:bg-teal-800 transition-colors">Upgrade</button>
        </div>

        <div className="p-4 border-t border-slate-100">
           <SidebarItem icon={LogOut} label="Sign Out" onClick={() => {}} active={false} />
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
             <div className="hidden md:flex items-center gap-2 text-slate-400 bg-slate-100/50 px-4 py-2.5 rounded-full border border-slate-200 focus-within:border-teal-500 focus-within:bg-white transition-all w-80">
               <Search size={18} />
               <input 
                 type="text" 
                 placeholder="Find doctors, clinics, medicines..." 
                 className="bg-transparent outline-none text-slate-800 text-sm w-full placeholder-slate-400 font-medium"
               />
             </div>
           </div>

           <div className="flex items-center gap-4">
             <div className="flex items-center gap-3">
               <div className="text-right hidden md:block">
                 <div className="text-sm font-bold text-slate-800">Alex Johnson</div>
                 <div className="text-xs text-slate-500 font-medium">Premium Member</div>
               </div>
               <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-white shadow-sm overflow-hidden cursor-pointer">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" />
               </div>
             </div>
           </div>
        </header>

        {/* Content Scroll Area */}
        <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-end">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
               <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello, Alex! 👋</h1>
               <p className="text-slate-500 font-medium">How are you feeling today?</p>
            </motion.div>
            <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="hidden md:flex bg-teal-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-teal-700/25 items-center gap-2"
             >
               <Plus size={20} /> Book Appointment
            </motion.button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column (2/3) */}
            <div className="xl:col-span-2 space-y-10">
              
              {/* Hero: Up Next Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-8 items-center"
              >
                 {/* Decorative Circles */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 opacity-10 rounded-full blur-2xl pointer-events-none" />

                 {/* Date/Time Block */}
                 <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-3xl p-4 w-full md:w-28 h-28 border border-white/10">
                    <span className="text-3xl font-bold">12</span>
                    <span className="text-teal-200 font-medium uppercase tracking-widest text-xs">Oct</span>
                    <div className="w-8 h-1 bg-teal-500 rounded-full mt-2" />
                 </div>

                 {/* Info Block */}
                 <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/30 border border-teal-700/50 text-teal-300 text-xs font-bold uppercase mb-3">
                       <Video size={12} /> Tele-Consultation
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">Dr. Sarah Wilson</h2>
                    <p className="text-teal-100 mb-6">Cardiologist • 10:00 AM - 10:30 AM</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                       <button className="px-6 py-3 bg-white text-teal-900 rounded-full font-bold shadow-lg hover:bg-teal-50 transition-colors flex items-center gap-2">
                          Join Video Call <ChevronRight size={16} />
                       </button>
                       <button className="px-6 py-3 bg-teal-800/50 border border-teal-700 text-white rounded-full font-bold hover:bg-teal-800 transition-colors">
                          Reschedule
                       </button>
                    </div>
                 </div>
                 
                 {/* Doctor Avatar */}
                 <div className="relative hidden md:block">
                    <div className="w-32 h-32 rounded-full border-4 border-teal-700/50 overflow-hidden shadow-2xl">
                       <img src="https://i.pravatar.cc/150?img=5" alt="Doctor" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-teal-900 rounded-full animate-pulse" />
                 </div>
              </motion.div>

              {/* Vitals Grid */}
              <div>
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-slate-800">My Vitals</h3>
                   <button className="text-teal-700 font-bold text-sm">See History</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <VitalCard icon={Heart} label="Heart Rate" value="98" unit="bpm" color="text-red-500" bg="bg-red-50" delay={0.2} />
                   <VitalCard icon={Thermometer} label="Body Temp" value="36.6" unit="°C" color="text-orange-500" bg="bg-orange-50" delay={0.3} />
                   <VitalCard icon={Activity} label="Blood Pressure" value="120/80" unit="" color="text-blue-500" bg="bg-blue-50" delay={0.4} />
                   <VitalCard icon={Pill} label="Glucose" value="92" unit="mg/dl" color="text-purple-500" bg="bg-purple-50" delay={0.5} />
                </div>
              </div>

              {/* Top Doctors / Discovery */}
              <div>
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-slate-800">Top Specialists</h3>
                   <div className="flex gap-2">
                      {categories.map(cat => (
                        <button 
                           key={cat} 
                           onClick={() => setActiveCategory(cat)}
                           className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all
                             ${activeCategory === cat ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'}
                           `}
                        >
                           {cat}
                        </button>
                      ))}
                   </div>
                </div>
                
                <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
                   {[
                     { name: "Dr. James Reid", spec: "Neurologist", img: "https://i.pravatar.cc/150?img=11", rate: "4.9" },
                     { name: "Dr. Emily Chen", spec: "Dermatologist", img: "https://i.pravatar.cc/150?img=5", rate: "4.8" },
                     { name: "Dr. Michael Ross", spec: "Orthopedic", img: "https://i.pravatar.cc/150?img=13", rate: "5.0" },
                     { name: "Dr. Linda Kim", spec: "Pediatrician", img: "https://i.pravatar.cc/150?img=9", rate: "4.7" },
                   ].map((doc, i) => (
                      <DoctorCard 
                        key={i}
                        name={doc.name}
                        specialty={doc.spec}
                        rating={doc.rate}
                        image={doc.img}
                        delay={0.1 * i}
                      />
                   ))}
                </div>
              </div>
            </div>

            {/* Right Column (1/3) */}
            <div className="space-y-8">
              
              {/* Medication Reminder */}
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Daily Meds</h3>
                    <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">Today</span>
                 </div>
                 <div className="space-y-3">
                    <MedicationRow name="Amoxicillin" dose="500mg" time="08:00 AM" taken={true} />
                    <MedicationRow name="Vitamin D" dose="1000IU" time="09:00 AM" taken={true} />
                    <MedicationRow name="Ibuprofen" dose="200mg" time="02:00 PM" taken={false} />
                    <MedicationRow name="Melatonin" dose="5mg" time="10:00 PM" taken={false} />
                 </div>
                 <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm hover:border-teal-500 hover:text-teal-700 transition-colors flex items-center justify-center gap-2">
                    <Plus size={16} /> Add Medication
                 </button>
              </div>

              {/* Upcoming Schedule List */}
              <div className="bg-teal-50 rounded-[2.5rem] p-8 border border-teal-100">
                 <h3 className="text-lg font-bold text-teal-900 mb-6">Upcoming</h3>
                 <div className="space-y-6 relative">
                    {/* Line connector */}
                    <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-teal-200" />
                    
                    {[
                      { day: "Tomorrow", title: "Blood Test", subtitle: "Lab 3 • 09:00 AM", icon: Activity },
                      { day: "Oct 15", title: "Dentist Checkup", subtitle: "Dr. Smile • 02:00 PM", icon: Calendar },
                      { day: "Oct 22", title: "Follow up", subtitle: "Dr. Wilson • 10:00 AM", icon: Video },
                    ].map((event, i) => (
                       <div key={i} className="relative z-10 flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-200 flex items-center justify-center text-teal-700 shadow-sm shrink-0">
                             <event.icon size={16} />
                          </div>
                          <div>
                             <div className="text-xs font-bold text-teal-600 uppercase mb-0.5">{event.day}</div>
                             <div className="font-bold text-slate-800">{event.title}</div>
                             <div className="text-xs text-slate-500">{event.subtitle}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Health Tip */}
              <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                 <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl" />
                 <Heart size={32} className="mb-4 text-white/80" />
                 <h3 className="font-bold text-lg mb-2">Daily Tip</h3>
                 <p className="text-white/90 text-sm leading-relaxed">
                    "Drinking enough water can help improve your energy levels and brain function. Aim for 8 glasses today!"
                 </p>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}