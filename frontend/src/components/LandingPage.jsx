import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  Activity, 
  Shield, 
  Check, 
  Menu, 
  X, 
  Plus, 
  MessageCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Theme Colors (Simulating Material Tokens) ---
// Primary: Teal-700
// Secondary: Coral-500
// Surface: Gray-50 to White
// Background: Gray-100

// --- Reusable Material Components ---

const MaterialButton = ({ children, variant = 'filled', icon: Icon, className = "", onClick }) => {
  const baseStyle = "relative overflow-hidden font-medium tracking-wide rounded-full transition-all duration-300 flex items-center justify-center gap-2";
  const variants = {
    filled: "bg-teal-700 text-white shadow-lg hover:shadow-teal-700/40 hover:bg-teal-800",
    tonal: "bg-teal-100 text-teal-900 hover:bg-teal-200",
    outlined: "border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400",
    text: "text-teal-700 hover:bg-teal-50"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`${baseStyle} ${variants[variant]} ${className} px-6 py-3`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

const MaterialCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
    className={`bg-white rounded-[2rem] p-8 shadow-md border border-slate-100 ${className}`}
  >
    {children}
  </motion.div>
);

const Chip = ({ label, active }) => (
  <span className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${active ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}>
    {label}
  </span>
);

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-700 text-white rounded-xl flex items-center justify-center shadow-lg shadow-teal-700/20">
              <Stethoscope size={24} />
            </div>
            <span className="app_title text-3xl font-bold text-slate-800 tracking-tight">Med<span className="text-teal-700">Flow</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Patients', 'Schedule', 'Analytics'].map((item) => (
              <a key={item} href="#" className="text-slate-600 font-medium hover:text-teal-700 transition-colors">
                {item}
              </a>
            ))}
            <Link to='/auth'><MaterialButton variant="filled" className="!py-2 !px-5 text-sm cursor-pointer">Login</MaterialButton></Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-800">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-3/4 bg-teal-50 shadow-2xl z-50 p-6 md:hidden flex flex-col gap-4"
          >
            <div className="flex justify-end">
              <button onClick={() => setMenuOpen(false)} className="p-2 bg-teal-200 rounded-full"><X size={20}/></button>
            </div>
            <div className="mt-8 flex flex-col gap-6 text-xl font-medium text-teal-900">
               {['Dashboard', 'Patients', 'Schedule', 'Analytics'].map((item) => (
                 <a key={item} href="#" className="border-b border-teal-200 pb-2">{item}</a>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 rounded-b-[4rem]">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100 rounded-full blur-3xl opacity-50 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8 border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-600">Material Design 3.0 Interface</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Care for Patients, <br />
            <span className="text-teal-700">Not Paperwork.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
            A unified CRM & Appointment platform engineered for modern clinics. Beautifully efficient, effortlessly powerful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <MaterialButton variant="filled" icon={Calendar} className="!text-lg !px-8 !py-4">
              Book Demo
            </MaterialButton>
            <MaterialButton variant="outlined" className="!text-lg !px-8 !py-4">
              View Pricing
            </MaterialButton>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm" style={{ backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 10})`, backgroundSize: 'cover' }} />
               ))}
               <div className="w-10 h-10 rounded-full border-2 border-white bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-xs shadow-sm">+2k</div>
            </div>
            <div className="text-sm text-slate-500 font-medium">
              Trusted by 2,000+ Clinics
            </div>
          </div>
        </motion.div>

        {/* Hero Illustration - Material Cards Layering */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] hidden lg:block perspective-1000"
        >
          {/* Back Card */}
          <motion.div 
            animate={{ rotate: 3, y: -20 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 5 }}
            className="absolute top-10 right-10 w-full h-full bg-orange-200 rounded-[3rem] shadow-none transform translate-x-8 translate-y-8 opacity-60"
          />
          
          {/* Middle Card */}
          <motion.div 
             animate={{ rotate: -2 }}
             transition={{ repeat: Infinity, repeatType: "mirror", duration: 6 }}
             className="absolute top-5 right-5 w-full h-full bg-teal-800 rounded-[3rem] shadow-xl transform translate-x-4 translate-y-4"
          />

          {/* Front Card (Main UI) */}
          <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            {/* Fake App Header */}
            <div className="h-16 bg-slate-50 border-b border-slate-100 flex items-center px-6 justify-between">
              <div className="w-32 h-3 bg-slate-200 rounded-full" />
              <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-teal-100" />
              </div>
            </div>
            
            {/* Fake App Body */}
            <div className="p-8 flex-1 bg-white relative">
               <div className="flex justify-between items-end mb-8">
                 <div>
                   <div className="text-sm text-slate-400 font-bold uppercase mb-1">Total Revenue</div>
                   <div className="text-4xl font-bold text-slate-800">$124,500</div>
                 </div>
                 <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                   <TrendingUp size={14}/> +12%
                 </div>
               </div>

               {/* Chart Placeholder */}
               <div className="h-48 flex items-end justify-between gap-2 mb-8">
                 {[40, 70, 50, 90, 60, 80, 55].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                     className="w-full bg-teal-600 rounded-t-xl opacity-80 hover:opacity-100 transition-opacity"
                   />
                 ))}
               </div>

               {/* List */}
               <div className="space-y-4">
                 {[1, 2].map(i => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="w-32 h-2 bg-slate-800 rounded-full mb-2" />
                        <div className="w-20 h-2 bg-slate-300 rounded-full" />
                      </div>
                      <div className="ml-auto px-4 py-2 bg-white rounded-full text-xs font-bold shadow-sm">View</div>
                   </div>
                 ))}
               </div>

               {/* FAB in UI */}
               <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="absolute bottom-8 right-8 w-14 h-14 bg-teal-400 rounded-2xl shadow-lg shadow-teal-400/40 flex items-center justify-center text-white cursor-pointer"
               >
                 <Plus size={28} />
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: Calendar, title: "Smart Scheduling", text: "Drag-and-drop calendar with AI-powered conflict resolution.", color: "bg-blue-100 text-blue-700" },
    { icon: Users, title: "Patient CRM", text: "Complete history, notes, and documents in one secure timeline.", color: "bg-orange-100 text-orange-700" },
    { icon: MessageCircle, title: "Tele-Health", text: "HD video calls integrated directly into patient records.", color: "bg-purple-100 text-purple-700" },
    { icon: Shield, title: "HIPAA Secure", text: "Enterprise-grade encryption for all medical data storage.", color: "bg-green-100 text-green-700" },
    { icon: Activity, title: "Analytics", text: "Real-time dashboards for financial and operational health.", color: "bg-red-100 text-red-700" },
    { icon: Clock, title: "Automations", text: "Reduce no-shows with automated SMS and Email reminders.", color: "bg-teal-100 text-teal-700" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Designed for Speed</h2>
          <p className="text-slate-500 text-lg">Every feature is crafted to reduce clicks and save precious time for your medical staff.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <MaterialCard key={i} delay={i * 0.1} className="group cursor-pointer">
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {f.text}
              </p>
              <div className="mt-6 flex items-center text-teal-700 font-semibold group-hover:gap-2 transition-all">
                Learn more <ArrowRight size={16} className="ml-1" />
              </div>
            </MaterialCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-teal-900 text-white rounded-[3rem] mx-4 lg:mx-12 my-12 relative overflow-hidden shadow-2xl">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-teal-800/50">
          {[
            { num: "10k+", label: "Doctors" },
            { num: "2M+", label: "Appointments" },
            { num: "99%", label: "Satisfaction" },
            { num: "24/7", label: "Support" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{stat.num}</div>
              <div className="text-teal-200 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Seamless Clinical Flow</h2>
            <div className="space-y-8 mt-12">
              {[
                { title: "Smart Intake", desc: "Patients fill digital forms before arrival. Data syncs instantly." },
                { title: "One-Click Charting", desc: "Use AI voice-to-text to update records during consultation." },
                { title: "Instant Billing", desc: "Codes are generated automatically based on diagnosis notes." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center border-4 border-white shadow-sm z-10 group-hover:bg-teal-700 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    {i !== 2 && <div className="w-0.5 h-full bg-slate-200 -my-2" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-slate-500">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 relative z-10"
             >
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200" style={{ backgroundImage: 'url(https://i.pravatar.cc/150?img=32)', backgroundSize: 'cover' }} />
                  <div>
                    <div className="font-bold text-lg text-slate-800">Sarah Jenkins</div>
                    <div className="text-sm text-slate-400">ID: #88392 • Last Visit: 2 days ago</div>
                  </div>
                  <div className="ml-auto">
                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Active</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Diagnosis</div>
                    <p className="text-slate-700 font-medium">Seasonal Allergic Rhinitis with mild asthma symptoms.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-teal-50 rounded-xl">
                      <div className="text-xs font-bold text-teal-700 uppercase mb-2">Vitals</div>
                      <div className="font-mono text-slate-700">BP: 120/80</div>
                    </div>
                     <div className="flex-1 p-4 bg-orange-50 rounded-xl">
                      <div className="text-xs font-bold text-orange-700 uppercase mb-2">Pending</div>
                      <div className="font-mono text-slate-700">Lab Results</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2">
                     <MaterialButton variant="text" className="!px-4 !py-2">Decline</MaterialButton>
                     <MaterialButton variant="filled" className="!px-4 !py-2">Approve Rx</MaterialButton>
                  </div>
                </div>
             </motion.div>
             
             {/* Decorative blob behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Modernize Your Practice?</h2>
            <p className="text-slate-400 text-lg mb-10">Join thousands of healthcare providers who switched to MedFlow for a better work-life balance.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <MaterialButton variant="filled" className="bg-white !text-slate-900 hover:bg-slate-200 !text-lg !px-10 !py-4">
                Get Started Free
              </MaterialButton>
              <MaterialButton variant="outlined" className="border-slate-700 !text-slate-300 hover:border-white hover:text-white !text-lg !px-10 !py-4">
                Contact Sales
              </MaterialButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-teal-700 text-white rounded-lg flex items-center justify-center">
                  <Stethoscope size={18} />
                </div>
                <span className="text-xl font-bold text-slate-800">MedFlow</span>
              </div>
              <p className="text-slate-500 max-w-xs">
                Empowering healthcare providers with next-generation tools for better patient outcomes.
              </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-teal-700">Features</a></li>
              <li><a href="#" className="hover:text-teal-700">Pricing</a></li>
              <li><a href="#" className="hover:text-teal-700">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-teal-700">About</a></li>
              <li><a href="#" className="hover:text-teal-700">Contact</a></li>
              <li><a href="#" className="hover:text-teal-700">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 MedFlow Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-teal-700">Privacy Policy</a>
            <a href="#" className="hover:text-teal-700">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Floating Action Button (FAB) ---
const FloatingActionButton = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <>
            {[
              { icon: MessageCircle, label: "Support" },
              { icon: Calendar, label: "Book Demo" }
            ].map((action, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="bg-white px-3 py-1 rounded-md shadow-md text-sm font-medium text-slate-700">
                  {action.label}
                </span>
                <button className="w-12 h-12 bg-teal-100 text-teal-800 rounded-2xl shadow-md flex items-center justify-center hover:bg-teal-200 transition-colors">
                  <action.icon size={20} />
                </button>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setExpanded(!expanded)}
        className={`w-16 h-16 rounded-[1.2rem] shadow-xl flex items-center justify-center transition-colors duration-300 ${expanded ? 'bg-slate-800 text-white' : 'bg-teal-700 text-white'}`}
      >
        <motion.div animate={{ rotate: expanded ? 45 : 0 }}>
          <Plus size={32} />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-200 selection:text-teal-900">
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-teal-500 origin-left z-[60]" style={{ scaleX }} />
      
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Workflow />
      <CallToAction />
      <Footer />
      <FloatingActionButton />
    </div>
  );
}