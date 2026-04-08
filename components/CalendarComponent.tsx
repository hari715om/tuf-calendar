"use client";
import { useState, useEffect } from "react";
import { addMonths, subMonths } from "date-fns";
import HeroImage from "./HeroImage";
import DateGrid from "./DateGrid";
import NotesSection from "./NotesSection";

export const THEMES = [
  { month: "January", image: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=2000&auto=format&fit=crop", primary: "#0ea5e9", light: "#f0f9ff" }, // Winter
  { month: "February", image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop", primary: "#ec4899", light: "#fdf2f8" }, // Valentine
  { month: "March", image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=2000&auto=format&fit=crop", primary: "#10b981", light: "#ecfdf5" }, // Spring
  { month: "April", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2000&auto=format&fit=crop", primary: "#8b5cf6", light: "#f5f3ff" }, // Tulip
  { month: "May", image: "https://images.unsplash.com/photo-1443632864897-14973fa006cf?q=80&w=2000&auto=format&fit=crop", primary: "#f59e0b", light: "#fffbeb" }, // Amber
  { month: "June", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop", primary: "#06b6d4", light: "#ecfeff" }, // Cyan
  { month: "July", image: "https://images.unsplash.com/photo-1471696541604-db8386de62fb?q=80&w=2000&auto=format&fit=crop", primary: "#ef4444", light: "#fef2f2" }, // Red
  { month: "August", image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2000&auto=format&fit=crop", primary: "#f97316", light: "#fff7ed" }, // Orange
  { month: "September", image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop", primary: "#6366f1", light: "#eef2ff" }, // Indigo
  { month: "October", image: "https://images.unsplash.com/photo-1507371341162-763b5e419408?q=80&w=2000&auto=format&fit=crop", primary: "#ea580c", light: "#fff7ed" }, // Fall
  { month: "November", image: "https://images.unsplash.com/photo-1443632864897-14973fa006cf?q=80&w=2000&auto=format&fit=crop", primary: "#84cc16", light: "#f7fee7" }, // Olive
  { month: "December", image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2000&auto=format&fit=crop", primary: "#eab308", light: "#fefce8" } // Gold
];

export default function CalendarComponent() {
  const [mounted, setMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [animStatus, setAnimStatus] = useState<"idle" | "tearing" | "dropping">("idle");

  useEffect(() => {
    setCurrentMonth(new Date());
    setMounted(true);
    const savedNotes = localStorage.getItem("calendar_notes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    localStorage.setItem("calendar_notes", newNotes);
  };

  if (!mounted || !currentMonth) {
    return <div className="h-[800px] flex items-center justify-center text-lg text-gray-500 font-medium tracking-widest uppercase">Loading Premium Experience...</div>;
  }

  const activeTheme = THEMES[currentMonth.getMonth()];

  const navigateMonth = (direction: 'next' | 'prev') => {
    if (animStatus !== "idle") return;
    setAnimStatus("tearing");
    
    setTimeout(() => {
      setCurrentMonth(direction === 'next' ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
      setAnimStatus("dropping");
      
      setTimeout(() => {
         setAnimStatus("idle");
      }, 400); 
    }, 400); 
  };

  return (
    <div className={`flex flex-col w-full bg-white relative transition-all duration-1000 ${animStatus === 'tearing' ? 'animate-tear-off origin-top' : animStatus === 'dropping' ? 'animate-drop-in' : ''}`}>
      <HeroImage currentMonth={currentMonth} theme={activeTheme} />
      <div className="flex flex-col md:flex-row px-8 py-8 md:px-12 md:py-10 gap-10 md:gap-14">
        <div className="w-full md:w-[220px] shrink-0">
          <NotesSection notes={notes} setNotes={handleNotesChange} theme={activeTheme} />
        </div>
        <div className="flex-grow">
          <DateGrid
            currentMonth={currentMonth}
            handleNextMonth={() => navigateMonth('next')}
            handlePrevMonth={() => navigateMonth('prev')}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            hoverDate={hoverDate}
            setHoverDate={setHoverDate}
            notes={notes}
            theme={activeTheme}
          />
        </div>
      </div>
    </div>
  );
}