import React from "react";
import { Twitter,  Linkedin } from "lucide-react"; // Social icons
import { Link } from "react-router-dom";
import { Container } from "@/components/container";
import { MainRoutes } from "@/lib/helpers";

// Social link component with hover color
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:${hoverColor} transition-colors duration-200`}
    >
      {icon}
    </a>
  );
};

// Footer navigation link
interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}
const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="hover:underline text-gray-300 dark:text-gray-400 hover:text-gray-100 dark:hover:text-white transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-black dark:bg-gray-900 text-gray-300 dark:text-gray-400 py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {MainRoutes.map((route) => (
                <FooterLink key={route.href} to={route.href}>
                  {route.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p>
              This platform is designed to empower job seekers with AI-driven interview guidance. 
              From personalized practice sessions to actionable feedback, it helps users build confidence, 
              improve skills, and achieve success in their career journeys.
            </p>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul>
              <FooterLink to="/services/interview-prep">Interview Preparation</FooterLink>
              <FooterLink to="/services/career-coaching">Career Coaching</FooterLink>
              <FooterLink to="/services/resume-building">Resume Building</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact & Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="mb-4">123 AI Street, Tech City, 12345</p>
            <div className="flex gap-4">
             
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter size={24} />}
                hoverColor="text-blue-400"
              />
              
              <SocialLink
                href="https://linkedin.com"
                icon={<Linkedin size={24} />}
                hoverColor="text-blue-700"
              />
            </div>
          </div>

        </div>
      </Container>
    </footer>
  );
};
