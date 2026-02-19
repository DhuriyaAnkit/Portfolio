'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { siteConfig } from '@/data/content';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.href.slice(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="#" className="font-bold text-xl text-primary">
          {siteConfig.name.split(' ')[0]}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200',
                activeSection === item.href.slice(1)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.href.slice(1));
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-up">
          <div className="container-custom py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  activeSection === item.href.slice(1)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.href.slice(1));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
