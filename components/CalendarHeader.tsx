const CalendarHeader = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-x-2">
        <button>Year</button>
        <button>Month</button>
        <button>Week</button>
      </div>

      <div className="flex gap-2">
        <p>View:</p>
        <div>
          <button>March</button>
          <button>2025</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
