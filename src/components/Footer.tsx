// src/components/Footer.tsx

import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { roadmapsData } from '../data'; // To dynamically create links

interface FooterProps {
  darkMode: boolean;
  onSelectRoadmap: (id: string) => void;
}

const socialLinks = [
  { name: 'GitHub', icon: <Github />, url: 'https://github.com/Mohamed-Yuta' }, 
  { name: 'LinkedIn', icon: <Linkedin />, url: 'https://www.linkedin.com/in/mohamed-amine-allali-608203298/' }, // <-- UPDATE
  { name: 'Twitter', icon: <Twitter />, url: '' }, 
  { name: 'Email', icon: <Mail />, url: 'mailto:allali.mohamedamine89@gmail.com' }, 
];

export const Footer: React.FC<FooterProps> = ({ darkMode, onSelectRoadmap }) => {
  return (
    <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100 dark:from-gray-800 pointer-events-none"></div>
      <footer className="relative max-w-7xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">GIS Learning Roadmaps</h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              A community-driven effort to create clear and comprehensive learning paths for mastering GIS technologies. Explore, learn, and contribute to the future of geospatial education.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Roadmaps */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Roadmaps</h3>
            <ul role="list" className="mt-4 space-y-2">
              {roadmapsData.map((roadmap) => (
                <li key={roadmap.id}>
                  <a
                    onClick={(e) => { e.preventDefault(); onSelectRoadmap(roadmap.id); }}
                    href={`/roadmap/${roadmap.id}`}
                    className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {roadmap.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Legal/Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Contact</h3>
            <ul role="list" className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Contribute</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Report an Issue</a>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-500 xl:text-center">
            © {new Date().getFullYear()} GIS Learning Roadmaps. Created by Mohamed Amine Allali.
            
          </p>
        </div>
      </footer>
    </div>
  );
};