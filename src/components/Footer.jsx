import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content border-t-4 border-transparent bg-clip-padding backdrop-blur-md bg-neutral/90">
      
      {/* Brand Section */}
      <aside>
        <Link 
          to="/" 
          className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Artify
        </Link>
        <p className="text-neutral-content/70 mt-2">
          A Creative Artwork Showcase Platform
          <br />
          © {new Date().getFullYear()} Artify. All rights reserved.
        </p>
      </aside> 
      
      {/* Quick Links */}
      <nav>
        <h6 className="footer-title text-primary">Quick Links</h6> 
        <Link to="/explore" className="link link-hover hover:text-primary transition">Explore Artworks</Link>
        <Link to="/add-artwork" className="link link-hover hover:text-primary transition">Add Artwork</Link>
        <Link to="/my-gallery" className="link link-hover hover:text-primary transition">My Gallery</Link>
        <Link to="/my-favorites" className="link link-hover hover:text-primary transition">My Favorites</Link>
      </nav> 
      
      {/* Contact Info */}
      <nav>
        <h6 className="footer-title text-secondary">Contact Us</h6> 
        <a href="mailto:info@artify.com" className="link link-hover inline-flex items-center gap-2 hover:text-secondary transition">
          <FiMail /> info@artify.com
        </a>
        <a href="tel:+123456789" className="link link-hover inline-flex items-center gap-2 hover:text-secondary transition">
          <FiPhone /> +1 (234) 567-89
        </a>
      </nav>

      {/* Social Links */}
      <nav>
        <h6 className="footer-title text-accent">Follow Us</h6> 
        <div className="flex gap-4 mt-2">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-2xl hover:text-accent transition">
            <FiGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-2xl hover:text-accent transition">
            <FiLinkedin />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="text-2xl hover:text-accent transition">
            <FaXTwitter />
          </a>
        </div>
      </nav>
      
    </footer>
  );
}
