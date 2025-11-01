"use client";

import CalendarGrid from "@/components/CalendarGrid";
import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [entryText, setEntryText] = useState("");

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const startingDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const handleDayClick = (day: number) => {
    const key = dateKey(day);
    setSelectedDay(day);
    setEntryText(entries[key] || "");
  };

  const handleSave = () => {
    if (selectedDay === null) return;
    const key = dateKey(selectedDay);
    setEntries((prev) => ({ ...prev, [key]: entryText }));
    setSelectedDay(null);
  };

  const dateKey = (day: number) =>
    `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-10 rounded-lg  ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ◀
        </button>
        <h2 className="text-2xl font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ▶
        </button>
      </div>

      {/* Calendar */}
      <CalendarGrid
        daysInMonth={daysInMonth}
        startingDayOfWeek={startingDayOfWeek}
        entries={entries}
        onDayClick={handleDayClick}
        currentDate={currentDate}
      />

      {/* Entry Modal */}
      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h3 className="text-lg font-semibold mb-2">
              {currentDate.toLocaleString("default", {
                month: "long",
              })}{" "}
              {selectedDay}
            </h3>
            <textarea
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-3"
              placeholder="Write your journal entry..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedDay(null)}
                className="px-3 py-1 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 rounded-lg bg-purple-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
