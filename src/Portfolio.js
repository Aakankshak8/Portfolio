// Portfolio.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Github, Linkedin, Instagram, Download, Moon, Sun, X } from "lucide-react";
import "./Portfolio.css";

export default function Portfolio() {
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setDark(stored === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
    }
  }, []);

  // Apply theme class to body and persist
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Close modal on Escape
  const onKeyDown = useCallback((e) => {
    if (e.key === "Escape") setModal(null);
  }, []);

  useEffect(() => {
    if (modal) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [modal, onKeyDown]);

  const projects = [
    {
      title: "Online Ambulance Booking System",
      desc: "Emergency booking platform with live ambulance tracking and secure patient-side requests.",
      tags: ["Java", "Spring", "MySQL", "Realtime"],
      github: "https://github.com/Aakankshak8/Online-Ambulance-Booking-System1",
      paper: "https://share.google/tHDwc0GQLyArP9693",
    },
    {
      title: "Crop Yield Prediction",
      desc: "ML-driven insights using Linear Regression to forecast agricultural yield.",
      tags: ["Python", "ML", "Pandas", "Visualization"],
      github: "https://github.com/Aakankshak8/Crop-Yield-Prediction1",
    },
    {
      title: "College Map Assistant",
      desc: "C-based pathfinding and exploration system for colleges across the globe.",
      tags: ["C", "DSA", "Graphs"],
    },
  ];

  const skills = [
    "HTML", "CSS", "JavaScript", "ReactJS", "Java", "SQL", "C++", "C Programming", ".NET"
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <a href="#" className="logo">Aakanksha</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button
            className="icon-btn theme-toggle"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-inner">
          <h1 className="reveal-up">Aakanksha Karale</h1>
          <p className="reveal-up delay-1"> •Student at IET C-DAC ACTS ATC, Pune •Computer Science & Engineering • Web Developer Intern</p>

          <div className="hero-cta reveal-up delay-2">
            <a
              href="https://github.com/Aakankshak8"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="social-btn github"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aakanksha-karale-437060266"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-btn linkedin"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/Aakanksha_Karale_5279/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="social-btn instagram"
            >
              <Instagram size={18} /> Instagram
            </a>
            <a
              // fixed incorrect leading slash and added download attribute
              href="https://drive.google.com/file/d/1O5KdpZnrUq048wvIjwlKgdMQGUwgBjAV/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              <Download size={16} /> Resume
            </a>
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
        <div className="orb orb-3" aria-hidden="true" />
      </header>

      {/* About */}
      <section id="about" className="section soft-bg">
        <h2 className="section-title reveal-up">About me</h2>
        <p className="center-text reveal-up delay-1">
          Computer Science graduate with a strong interest in Web Development and Software Engineering.
          Immediate joiner seeking growth-oriented opportunities where I can build reliable, user-centered products.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <h2 className="section-title reveal-up">Skills</h2>
        <div className="skills-grid reveal-grid">
          {skills.map((skill) => (
            <div key={skill} className="skill-card">
              <span className="skill-dot" />
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
<section id="projects" className="section soft-bg">
  <h2 className="section-title reveal-up">Projects</h2>
  <div className="projects-grid reveal-grid">
    {projects.map((p, i) => (
      <article
        key={i}
        className="project-card"
        role="button"
        tabIndex={0}
        onClick={() => setModal(p)}
        onKeyDown={(e) => e.key === "Enter" && setModal(p)}
      >
        <div className="project-header">
          <h3>{p.title}</h3>
        </div>
        <p className="project-desc">{p.desc}</p>
        {/* Removed skill tags here */}
      </article>
    ))}
  </div>
</section>


      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${modal.title} details`}
          >
            <button
              className="modal-close"
              aria-label="Close"
              onClick={() => setModal(null)}
            >
              <X size={18} />
            </button>
            <h3 className="modal-title">{modal.title}</h3>
            <p className="modal-text">{modal.desc}</p>

            <div className="modal-links">
              {modal.github && (
                <a className="modal-link" href={modal.github} target="_blank" rel="noreferrer">
                  <Github size={16} /> GitHub Repo
                </a>
              )}
              {modal.paper && (
                <a className="modal-link" href={modal.paper} target="_blank" rel="noreferrer">
                  📄 Published Paper
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="footer">
        <h2 className="section-title">Contact</h2>
        <div className="contact-info">
          <p>
            <span role="img" aria-label="Email">📧</span> Email:&nbsp;
            <a href="mailto:karaleaakanksha.7336@gmail.com">
              karaleaakanksha.7336@gmail.com
            </a>
          </p>
          <p>
            <span role="img" aria-label="Phone">📞</span> Phone: +91-9075105104
          </p>
        </div>
      </footer>
    </div>
  );
}
