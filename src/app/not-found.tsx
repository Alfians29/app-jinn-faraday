'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden'>
      {/* Red overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(80, 0, 0, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className='relative z-10 text-center'>
        {/* WASTED */}
        <h1
          className={`transition-all duration-500 ${
            showText ? 'opacity-100 scale-100' : 'opacity-0 scale-150'
          }`}
          style={{
            fontFamily: 'var(--font-pricedown), Impact, sans-serif',
            fontSize: 'clamp(4rem, 20vw, 16rem)',
            lineHeight: '1',
            letterSpacing: '0.02em',
            color: '#b91c1c',
            textShadow: '0 0 60px rgba(185, 28, 28, 0.6)',
          }}
        >
          wasted
        </h1>

        {/* Subtitle */}
        <p
          className={`text-gray-500 font-[Inter] text-sm md:text-base mt-6 tracking-[0.3em] uppercase transition-all duration-500 delay-200 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          404 - Page Not Found
        </p>

        {/* Back link */}
        <Link
          href='/'
          className={`inline-flex items-center gap-2 mt-10 px-6 py-3 text-gray-400 hover:text-white font-[Inter] text-sm tracking-wider uppercase transition-all duration-500 delay-500 group ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <i className='ri-arrow-left-line group-hover:-translate-x-1 transition-transform duration-300'></i>
          Back to Los Santos
        </Link>
      </div>
    </div>
  );
}
