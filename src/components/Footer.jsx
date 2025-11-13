import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content border-t-4 border-primary">
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        
        <aside>
          <Link 
            to="/" 
            className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Artify
          </Link>
          <p className="text-neutral-content/70 mt-2">
            A Creative Artwork Showcase Platform
          </p>
          
          <h6 className="footer-title text-primary mt-6">Stay Updated</h6>
          <p className="text-neutral-content/70">
            Subscribe for the latest art and features.
          </p>
          <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your-email@artify.com"
              className="input input-bordered w-full rounded-r-none" 
            />
            <button className="btn btn-primary rounded-l-none">
              <FiSend />
            </button>
          </form>
        </aside> 
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <nav>
            <h6 className="footer-title text-primary">Quick Links</h6> 
            <Link to="/explore" className="link link-hover hover:text-primary transition">Explore Artworks</Link>
            <Link to="/add-artwork" className="link link-hover hover:text-primary transition">Add Artwork</Link>
            <Link to="/my-gallery" className="link link-hover hover:text-primary transition">My Gallery</Link>
            <Link to="/my-favorites" className="link link-hover hover:text-primary transition">My Favorites</Link>
          </nav> 
          
          <nav>
            <h6 className="footer-title text-secondary">Contact Us</h6> 
            <a href="mailto:info@artify.com" className="link link-hover inline-flex items-center gap-2 hover:text-secondary transition">
              <FiMail /> info@artify.com
            </a>
            <a href="tel:+123456789" className="link link-hover inline-flex items-center gap-2 hover:text-secondary transition">
              <FiPhone /> +1 (234) 567-89
            </a>
          </nav>

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
        </div>
      </div>
      
      <div className="footer footer-center p-4 border-t border-neutral-content/10">
        <aside>
          <p className="text-neutral-content/70">
            © {new Date().getFullYear()} Artify. All rights reserved.
          </p>
        </aside>
      </div>
      
    </footer>
  );
}