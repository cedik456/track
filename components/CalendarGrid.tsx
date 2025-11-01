import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  daysInMonth: number;
  startingDayOfWeek: number;
  entries: Record<string, string>;
  onDayClick: (day: number) => void;
  currentDate: Date;
}

const CalendarGrid = ({
  daysInMonth,
  startingDayOfWeek,
  entries,
  onDayClick,
  currentDate,
}: CalendarGridProps) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayCells = Array.from({ length: daysInMonth }).map((_, i) => {
    const day = i + 1;
    const dateKey = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const hasEntry = !!entries[dateKey];
    const entryPreview = entries[dateKey] || "";

    const today = new Date();
    const isToday =
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getDate() === day;

    return (
      <CalendarDay
        key={day}
        day={day}
        hasEntry={hasEntry}
        entryPreview={entryPreview}
        onClick={() => onDayClick(day)}
        isToday={isToday}
      />
    );
  });

  return (
    <div>
      {/* Days of week */}
      <div className="grid grid-cols-7 gap-4 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center  text-gray-500 ">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {dayCells}
      </div>
    </div>
  );
};

export default CalendarGrid;
