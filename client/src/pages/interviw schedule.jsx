import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../Components/Siderbar";

const InterviewSchedule = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState("");

  // Load events from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/interviews")
      .then(res => {
        const formatted = res.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
        setEvents(formatted);
      })
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // Add new event
  const handleSlotSelect = (slotInfo) => {
    const title = prompt("Enter Interview Title:");
    const notes = prompt("Enter Notes:");

    if (title) {
      const newEvent = {
        title,
        start: slotInfo.start,
        end: slotInfo.end,
        notes,
      };

      axios.post("http://localhost:5000/api/interviews", newEvent)
        .then(res => {
          const saved = res.data;
          setEvents([
            ...events,
            { ...saved, start: new Date(saved.start), end: new Date(saved.end) },
          ]);
        })
        .catch(err => console.error("Error saving event:", err));
    }
  };

  // On event click, show notes
  const handleEventSelect = (event) => {
    setSelectedNotes(event.notes || "No notes available.");
  };

  return (
    <div className="flex">
      <div className="w-72 bg-blue-900 text-white">
        <Sidebar />
      </div>
      <div className="flex flex-col lg:flex-row items-start gap-6 p-6 bg-gray-100 w-full min-h-screen">
        
        {/* Calendar Section */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Interview Schedule</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            views={["month", "week", "day", "agenda"]}
            onSelectEvent={handleEventSelect}
            onSelectSlot={handleSlotSelect}
          />
        </div>

        {/* Notes Section */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Notes</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{selectedNotes}</p>
        </div>
      </div>
    </div>
  );
};

export default InterviewSchedule;
