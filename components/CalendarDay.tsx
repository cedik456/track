interface CalendarDayProps {
  day: number;
  hasEntry: boolean;
  entryPreview: string;
  onClick: () => void;
  isToday?: boolean;
}

const CalendarDay = ({
  day,
  hasEntry,
  entryPreview,
  onClick,
  isToday = false,
}: CalendarDayProps) => {
  const previewText = entryPreview
    ? entryPreview.substring(0, 40) + (entryPreview.length > 40 ? "..." : "")
    : "";

  return (
    <button
      onClick={onClick}
      className={`aspect-square p-5 rounded-xl bg-white border border-gray-200 relative group flex flex-col justify-between hover:shadow-md transition ${
        isToday ? "border-2 border-purple-500" : ""
      }`}
    >
      {/* Day number */}
      <span className="text-xl font-semibold text-gray-500 self-start">
        {day}
      </span>

      {/* Preview text */}
      {entryPreview && (
        <p className="text-sm text-gray-600 line-clamp-3 text-left overflow-hidden mt-auto">
          {previewText}
        </p>
      )}

      {/* {hasEntry && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-purple-600 rounded-full" />
        </div>
      )} */}
    </button>
  );
};

export default CalendarDay;
