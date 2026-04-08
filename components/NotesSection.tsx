interface NotesSectionProps {
  notes: string;
  setNotes: (val: string) => void;
  theme: { image: string, primary: string, light: string };
}

export default function NotesSection({ notes, setNotes, theme }: NotesSectionProps) {
  return (
    <div className="h-full flex flex-col pt-1">
      <h3 className="font-bold text-[14px] uppercase tracking-widest mb-2 font-sans transition-colors duration-1000" style={{ color: theme.primary }}>
        Notes
      </h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-grow w-full resize-none border-none focus:ring-0 p-0 text-[14px] leading-[35px] text-[#111827] bg-transparent outline-none notes-lines"
        spellCheck="false"
      />
    </div>
  );
}