"use client";

export default function MentorDashboard() {
  return (
    <div className="font-montserrat bg-white min-h-screen">
      <section className="bg-gradient-to-r from-primary via-primary-light to-lightblue text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Welcome to Your Mentor Dashboard
          </h1>
          <p className="text-lg md:text-2xl mt-6 font-medium text-white/90">
            Manage your mentorship sessions and connect with students
          </p>
        </div>
      </section>
    </div>
  );
}