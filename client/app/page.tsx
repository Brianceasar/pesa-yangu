"use client";
import { useRouter } from "next/navigation";
import React from "react";


const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="font-montserrat bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary-light to-lightblue text-black py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Your Journey to{" "}
            <span className="text-secondary">Financial Freedom</span>
          </h1>
          <p className="text-lg md:text-2xl mt-6 font-medium text-black/90">
            Mentorship and Resources to Help You Thrive
          </p>
          <button
            className="mt-10 px-10 py-4 bg-secondary hover:bg-primary-dark text-black rounded-lg text-lg font-semibold shadow-lg transition-all duration-200"
            onClick={() => router.push("/register")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-lightblue">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Learn from Trusted Mentors
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Book sessions with experienced professionals and mentors ready to
              guide you.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-lightblue">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Access Valuable Resources
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Browse our curated library of financial education materials.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
