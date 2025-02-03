import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../Components/Siderbar";


const InterviewSchedule = () => {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([
    {
      title: "Interview",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
  ]);

  const [notes, setNotes] = useState("");

  return (

    <div className="flex">
      <div className="w-72 bg-blue-900 text-white">
      <Sidebar/>
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
          onSelectEvent={(event) => alert(`Selected Event: ${event.title}`)}
          onSelectSlot={(slotInfo) =>
            alert(
              `Selected Slot: ${moment(slotInfo.start).format(
                "MMMM Do YYYY, h:mm a"
              )} to ${moment(slotInfo.end).format("MMMM Do YYYY, h:mm a")}`
            )
          }
        />
      </div>

      {/* Notes Section */}
      <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-40">Notes</h2>
       
      </div>
    </div>
    </div>
  );
};

export default InterviewSchedule;
