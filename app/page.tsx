import CalendarComponent from "../components/CalendarComponent";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center py-24 px-4 bg-[radial-gradient(ellipse_at_top_left,_#fdfbfb,_#ebedee_50%,_#d1d5db)] relative">
      
      <div className="w-full max-w-[700px] mx-auto relative pt-8">
        
        {/* The Wall Mechanism: Hook and Pin */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 w-full pointer-events-none">
          {/* Central Hammered Nail Head */}
          <div className="w-4 h-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#f8fafc,_#94a3b8_50%,_#334155_80%,_#0f172a)] shadow-[4px_6px_8px_rgba(0,0,0,0.4),_inset_1px_1px_3px_rgba(255,255,255,0.7)] relative z-20"></div>
          
          {/* Hanging Wire (Suspension) */}
          <svg viewBox="0 0 700 80" preserveAspectRatio="none" className="absolute top-[8px] w-full h-[80px] overflow-visible drop-shadow-[5px_8px_4px_rgba(0,0,0,0.15)]">
               <path d="M350,0 L200,80" stroke="url(#metalGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
               <path d="M350,0 L500,80" stroke="url(#metalGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
               <defs>
                   <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                       <stop offset="0%" stopColor="#94a3b8" />
                       <stop offset="50%" stopColor="#f8fafc" />
                       <stop offset="100%" stopColor="#475569" />
                   </linearGradient>
               </defs>
          </svg>
        </div>

        <div className="w-full h-full bg-white relative overflow-hidden mt-[64px]
          border-t border-l border-white/60
          shadow-[-1px_-1px_3px_rgba(255,255,255,0.7),_2px_2px_6px_rgba(0,0,0,0.4),_15px_30px_25px_rgba(0,0,0,0.15),_30px_50px_60px_rgba(0,0,0,0.1)]
        ">
          <CalendarComponent />
        </div>

      </div>
    </main>
  );
}