import React from 'react';

type DataItem = {
  id: string;
  title: string;
  url: string;
};

const dummyData: DataItem[] = [
  {
    id: '1',
    title: 'Intro to Financial Literacy',
    url: 'https://youtu.be/ouvbeb2wSGA?feature=shared',
  },
  {
    id: '3',
    title: 'Financial Literacy',
    url: 'https://youtu.be/4XZIv4__sQA?feature=shared',
  },
  {
    id: '4',
    title: 'Investing 101',
    url: 'https://youtu.be/WEDIj9JBTC8',
  },
  {
    id: '5',
    title: 'Managing Debt Effectively',
    url: 'https://youtu.be/bYurCnaG1eA?feature=shared',
  },
  {
    id: '6',
    title: 'Financial Goal Setting',
    url: 'https://youtu.be/q5JWp47z4bY?feature=shared',
  },
];

const MentorDashboard: React.FC = () => {
  const getYouTubeEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

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

      <section className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyData.map((item) => (
            <div key={item.id}>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYouTubeEmbedUrl(item.url)}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MentorDashboard;