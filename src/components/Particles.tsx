'use client';

import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: 'yellow' | 'orange' | 'white';
}

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 25; i++) {
        newParticles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.1,
          color:
            Math.random() > 0.7
              ? 'yellow'
              : Math.random() > 0.5
                ? 'orange'
                : 'white',
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const getBackgroundColor = (color: Particle['color']) => {
    switch (color) {
      case 'yellow':
        return '#EAB308';
      case 'orange':
        return '#F97316';
      default:
        return 'rgba(255,255,255,0.5)';
    }
  };

  const getBoxShadow = (color: Particle['color']) => {
    switch (color) {
      case 'yellow':
        return '0 0 10px #EAB308';
      case 'orange':
        return '0 0 8px #F97316';
      default:
        return '0 0 5px rgba(255,255,255,0.3)';
    }
  };

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className='absolute rounded-full animate-float'
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getBackgroundColor(particle.color),
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: getBoxShadow(particle.color),
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: var(--opacity, 0.3);
          }
          25% {
            transform: translateY(-30px) translateX(10px);
            opacity: calc(var(--opacity, 0.3) * 1.5);
          }
          50% {
            transform: translateY(-15px) translateX(-15px);
            opacity: var(--opacity, 0.3);
          }
          75% {
            transform: translateY(-40px) translateX(5px);
            opacity: calc(var(--opacity, 0.3) * 0.8);
          }
        }
      `}</style>
    </div>
  );
}
