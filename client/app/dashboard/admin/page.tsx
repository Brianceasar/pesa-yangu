"use client";

export default function AdminDashboard() {
  return (
    <div className="font-montserrat bg-white min-h-screen">
      <section className="bg-gradient-to-r from-primary via-primary-light to-lightblue text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Welcome to Your Admin Dashboard
          </h1>
          <p className="text-lg md:text-2xl mt-6 font-medium text-white/90">
            Manage users, monitor activities, and oversee the platform
          </p>
        </div>
      </section>
    </div>
  );
}