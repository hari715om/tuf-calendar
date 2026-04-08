import { 
  format, eachDayOfInterval, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, isAfter, isBefore, isToday
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface DateGridProps {
  currentMonth: Date;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  startDate: Date | null;
  setStartDate: (d: Date | null) => void;
  endDate: Date | null;
  setEndDate: (d: Date | null) => void;
  hoverDate: Date | null;
  setHoverDate: (d: Date | null) => void;
  notes: string;
  theme: { image: string, primary: string, light: string };
}

export default function DateGrid({
  currentMonth, handleNextMonth, handlePrevMonth,
  startDate, setStartDate, endDate, setEndDate,
  hoverDate, setHoverDate, notes, theme
}: DateGridProps) {
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDateGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDateGrid, end: endDateGrid });
  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const handleDateClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const isDateInRange = (day: Date) => {
    if (startDate && endDate) {
      return (isAfter(day, startDate) && isBefore(day, endDate)) || isSameDay(day, startDate) || isSameDay(day, endDate);
    }
    if (startDate && hoverDate && !endDate) {
      const start = isBefore(startDate, hoverDate) ? startDate : hoverDate;
      const end = isAfter(startDate, hoverDate) ? startDate : hoverDate;
      return (isAfter(day, start) && isBefore(day, end)) || isSameDay(day, start) || isSameDay(day, end);
    }
    return false;
  };

  return (
    <div className="w-full flex-col flex h-full pt-2">
      <div className="grid grid-cols-7 mb-6">
        {weekDays.map((day, idx) => (
          <div key={day} className={`text-center text-[12px] font-bold tracking-wider ${idx >= 5 ? '' : 'text-[#374151]'}`} style={idx >= 5 ? { color: theme.primary } : {}}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-3 flex-grow">
        {days.map((day, i) => {
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const inRange = isDateInRange(day);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const hasNotes = notes.length > 0 && isSelectedStart;

          return (
            <div 
              key={i} 
              className="relative flex flex-col items-center justify-center py-2 w-full transition-colors duration-500"
              style={inRange && !isSelectedStart && !isSelectedEnd ? { backgroundColor: theme.light } : {}}
              onMouseEnter={() => setHoverDate(day)}
              onMouseLeave={() => setHoverDate(null)}
            >
              <button
                onClick={() => handleDateClick(day)}
                className={`
                  w-8 h-8 flex items-center justify-center font-bold text-[14px] transition-all duration-300
                  ${!isCurrentMonth ? 'text-[#d1d5db]' : 'text-[#111827]'}
                  ${(isSelectedStart || isSelectedEnd) ? 'text-white' : ''}
                `}
                style={(isSelectedStart || isSelectedEnd) ? { backgroundColor: theme.primary } : {}}
              >
                {format(day, dateFormat)}
              </button>
              
              {/* Contextual Micro-Journal Node */}
              {hasNotes && (
                 <div 
                   className="absolute bottom-0 w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500" 
                   style={{ backgroundColor: theme.primary }}
                 />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end space-x-2 mt-4 transition-colors duration-1000">
        <button onClick={handlePrevMonth} className="p-1 text-[#9ca3af] hover:opacity-70 transition-opacity">
          <ChevronLeftIcon className="h-5 w-5" style={{ color: theme.primary }} />
        </button>
        <button onClick={handleNextMonth} className="p-1 text-[#9ca3af] hover:opacity-70 transition-opacity">
          <ChevronRightIcon className="h-5 w-5" style={{ color: theme.primary }} />
        </button>
      </div>
    </div>
  );
}