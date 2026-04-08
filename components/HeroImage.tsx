import { format } from "date-fns";

export default function HeroImage({ currentMonth, theme }: { currentMonth: Date; theme: { image: string, primary: string, light: string } }) {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] bg-gray-100 overflow-hidden">
      
      {/* 1. Underlying Photo mapped to theme image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url("${theme.image}")` }}
      />

      {/* 2. Left Blue Swoosh stacked cleanly over the image using theme color */}
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="absolute bottom-0 left-0 w-[45%] h-[120px] md:h-[150px] pointer-events-none transition-all duration-1000 ease-in-out"
      >
        <path fill={theme.primary} d="M0,0 C30,60 60,100 100,100 L0,100 Z" />
      </svg>
      
      {/* 3. Right Blue Swoosh stacked smoothly over the image using theme color */}
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="absolute bottom-0 right-0 w-[60%] h-[180px] md:h-[230px] pointer-events-none transition-all duration-1000 ease-in-out"
      >
        <path fill={theme.primary} d="M100,0 C70,60 40,100 0,100 L100,100 Z" />
      </svg>

      {/* 4. Text Content mapped correctly into the safe flat area of the right swoosh */}
      <div className="absolute bottom-8 right-10 text-right z-10 pointer-events-none">
        <h2 className="text-[28px] md:text-[34px] font-normal tracking-[0.02em] text-white leading-none mb-1">
          {format(currentMonth, "yyyy")}
        </h2>
        <h1 className="text-[44px] md:text-[56px] font-bold uppercase tracking-[0.05em] text-white leading-none">
          {format(currentMonth, "MMMM")}
        </h1>
      </div>
      
      {/* 5. Hyper-Realistic Metallic Twin-Loop Wire Binding */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-10 pt-[8px] z-20">
         {[...Array(34)].map((_, i) => (
           <div key={i} className="relative flex justify-center w-[12px]">
             {/* The Punched Hole in the paper */}
             <div className="absolute top-[2px] w-[10px] h-[10px] rounded-full bg-[#111827] shadow-[inset_1px_3px_4px_rgba(0,0,0,0.9),_0px_1px_1px_rgba(255,255,255,0.5)]"></div>
             
             {/* Left Metallic Wire loop projecting upwards */}
             <div className="absolute -top-[12px] left-[1px] w-[3.5px] h-[20px] rounded-full bg-[linear-gradient(90deg,_#475569,_#f8fafc_40%,_#64748b_70%,_#334155)] shadow-[2px_4px_3px_rgba(0,0,0,0.5)]"></div>
             
             {/* Right Metallic Wire loop projecting upwards */}
             <div className="absolute -top-[12px] right-[1px] w-[3.5px] h-[20px] rounded-full bg-[linear-gradient(90deg,_#475569,_#f8fafc_40%,_#64748b_70%,_#334155)] shadow-[2px_4px_3px_rgba(0,0,0,0.5)]"></div>
           </div>
         ))}
      </div>
    </div>
  );
}