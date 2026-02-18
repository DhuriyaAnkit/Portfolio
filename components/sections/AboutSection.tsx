'use client';

import { about } from '@/data/content';
import Card from '@/components/ui/Card';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About Me
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Text */}
            <div
              ref={ref}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="prose prose-invert max-w-none">
                {about.content.split('\n\n').map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-lg leading-relaxed text-muted-foreground mb-4"
                  >
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Column - Highlights */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="space-y-4">
                <Card variant="elevated">
                  <h3 className="text-xl font-bold mb-2">Frontend</h3>
                  <p className="text-sm text-muted-foreground">
                    Skilled in React, TypeScript, Tailwind CSS, and modern JavaScript frameworks.
                  </p>
                </Card>

                <Card variant="elevated">
                  <h3 className="text-xl font-bold mb-2">Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    Experienced with Node.js, Express, and database design with SQL and NoSQL.
                  </p>
                </Card>

                <Card variant="elevated">
                  <h3 className="text-xl font-bold mb-2">DevOps</h3>
                  <p className="text-sm text-muted-foreground">
                    Familiar with Docker, AWS, CI/CD pipelines, and cloud infrastructure.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
