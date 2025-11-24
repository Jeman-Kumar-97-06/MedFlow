import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Stethoscope, 
  Github, 
  Twitter, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

// --- Reusable Material Components ---

const MaterialInput = ({ label, type = "text", icon: Icon, id }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative mb-5 group">
      {/* Icon */}
      <div className={`absolute left-4 top-4 transition-colors duration-300 ${isFocused ? 'text-teal-700' : 'text-slate-400'}`}>
        <Icon size={20} />
      </div>

      {/* Input Field */}
      <input
        type={inputType}
        id={id}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        className={`peer w-full h-14 pl-12 pr-4 bg-slate-50 rounded-t-2xl border-b-2 outline-none transition-all duration-300 placeholder-transparent font-medium text-slate-800
          ${isFocused ? 'border-teal-700 bg-teal-50/30' : 'border-slate-200 hover:border-slate-300'}
        `}
        placeholder={label}
      />

      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`absolute left-12 transition-all duration-300 pointer-events-none origin-left
          ${isFocused 
            ? 'top-1 text-xs text-teal-700 font-bold' 
            : 'top-4 text-base text-slate-500 font-medium'}
        `}
      >
        {label}
      </label>

      {/* Password Toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-slate-400 hover:text-teal-700 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};



// --- Role Selector Component ---

const RoleSelector = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-4 mb-6">
      {[
        { id: 'patient', label: 'Patient', icon: User },
        { id: 'doctor', label: 'Doctor', icon: Stethoscope }
      ].map((role) => {
        const isSelected = selected === role.id;
        return (
          <motion.button
            key={role.id}
            onClick={() => onSelect(role.id)}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-1 h-16 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all duration-300 overflow-hidden
              ${isSelected 
                ? 'border-teal-700 bg-teal-50 text-teal-800 shadow-md' 
                : 'border-slate-200 bg-white text-slate-500 hover:border-teal-200 hover:bg-slate-50'}
            `}
          >
            {isSelected && (
              <motion.div 
                layoutId="activeRole"
                className="absolute inset-0 bg-teal-100/50 mix-blend-multiply"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <role.icon size={20} className={isSelected ? "text-teal-700" : "text-slate-400"} />
            <span className="font-bold relative z-10">{role.label}</span>
            {isSelected && (
              <div className="absolute top-2 right-2 text-teal-700">
                <CheckCircle2 size={14} />
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// --- Main Component ---

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState('patient'); // 'patient' | 'doctor'

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      
      {/* Main Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[700px] flex flex-col md:flex-row relative">
        
        {/* Left Side: Decorative / Info (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-5/12 bg-teal-800 relative flex-col justify-between p-12 text-white overflow-hidden">
          {/* Abstract Shapes */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-80 h-80 bg-teal-600 rounded-[3rem] opacity-50" 
          />
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[-50px] w-64 h-64 bg-coral-500 rounded-full blur-3xl opacity-20 mix-blend-overlay" 
          />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <Stethoscope className="text-white" size={24} />
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              {userRole === 'doctor' ? 'Manage your practice with elegance.' : 'Your health journey starts here.'}
            </h2>
            <p className="text-teal-100 text-lg leading-relaxed opacity-90">
              {userRole === 'doctor' 
                ? 'Join 10,000+ doctors who trust MedFlow for appointments, CRM, and patient care.'
                : 'Book appointments, track your records, and consult with top specialists securely.'}
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1,2,3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-teal-800 bg-teal-200" style={{ backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 20})`, backgroundSize: 'cover' }} />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-teal-200">
               <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
               New updates released yesterday
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-slate-500">
              {isLogin ? 'Please enter your details to sign in.' : 'Choose your role and start your 14-day free trial.'}
            </p>
          </div>

          {/* Form Area */}
          <div className="relative overflow-hidden min-h-[550px]">
            <AnimatePresence initial={false} mode='wait' custom={isLogin ? 1 : -1}>
              <motion.form
                key={isLogin ? "login" : "signup"}
                custom={isLogin ? 1 : -1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="absolute inset-0 w-full"
                onSubmit={(e) => e.preventDefault()}
              >
                {!isLogin && (
                   <RoleSelector selected={userRole} onSelect={setUserRole} />
                )}

                {!isLogin && (
                   <MaterialInput id="name" label="Full Name" icon={User} />
                )}
                
                {/* Dynamic Field for Doctors */}
                {!isLogin && userRole === 'doctor' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                       <MaterialInput id="specialty" label="Specialization (e.g. Cardiology)" icon={Briefcase} />
                    </motion.div>
                )}

                <MaterialInput id="email" label="Email Address" type="email" icon={Mail} />
                <MaterialInput id="password" label="Password" type="password" icon={Lock} />
                
                {!isLogin && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Min 8 chars', 'Number', 'Symbol'].map((req, i) => (
                      <div key={i} className="flex items-center gap-1 text-[10px] uppercase font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                        <CheckCircle2 size={10} /> {req}
                      </div>
                    ))}
                  </div>
                )}

                {isLogin && (
                  <div className="flex justify-end mb-8">
                    <a href="#" className="text-sm font-bold text-teal-700 hover:text-teal-900 hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(15, 118, 110, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-14 bg-teal-700 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-teal-700/20 transition-all mt-2"
                >
                  {isLogin ? 'Sign In' : `Join as ${userRole === 'doctor' ? 'Doctor' : 'Patient'}`}
                  <ArrowRight size={20} />
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </div>

          {/* Toggle */}
          <div className="text-center">
             <p className="text-slate-600">
               {isLogin ? "Don't have an account?" : "Already have an account?"}
               <button 
                 onClick={() => setIsLogin(!isLogin)}
                 className="ml-2 font-bold text-teal-700 hover:text-teal-900 hover:underline outline-none"
               >
                 {isLogin ? "Sign up" : "Sign in"}
               </button>
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}