"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

interface MentorOption {
  id: string;
  name: string;
}

const mentorOptions: MentorOption[] = [
  { id: "mentor1", name: "John Doe" },
  { id: "mentor2", name: "Jane Smith" },
  { id: "mentor3", name: "David Kim" },
];

export default function BookSessionPage() {
  const { data: session } = useSession();
  const [mentorId, setMentorId] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || !session.user?.accessToken) {
      toast.error("You must be logged in to book a session.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/mentorship-sessions",
        {
          mentorId,
          category,
          date,
          timeSlot,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("✅ Session booked successfully!");
        setMentorId("");
        setCategory("");
        setDate("");
        setTimeSlot("");
        setMessage("");
      }
    } catch (err) {
      toast.error("❌ Failed to book session. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8 font-montserrat">
      <h1 className="text-2xl font-bold mb-6">Book a Mentorship Session</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Mentor</option>
          {mentorOptions.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter topic (e.g., Budgeting)"
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          placeholder="Enter time slot (e.g., 10:00 AM - 11:00 AM)"
          required
          className="w-full p-2 border rounded"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Optional message or question..."
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded"
        >
          Book Session
        </button>
      </form>
    </div>
  );
}