import { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './App.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/karthik-r-455184332/';
const CONTACT_EMAIL = 'karthik.rk0912@gmail.com';

const EMPTY_MESSAGE_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const PROJECTS = [
  {
    title: 'Catalogue Management System',
    desc: 'Flask-based catalogue management with CRUD, validation, logging, and MySQL integration.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    url: 'https://github.com/krthik-kk/flask-catalogue-app',
    featured: true,
  },
  {
    title: 'To Do App',
    desc: 'Modern to-do application with clean UI, responsive layout, and smooth interactions.',
    image:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    url: 'https://github.com/krthik-kk/JS-task',
  },
  {
    title: 'Weather App',
    desc: 'JavaScript weather application with live forecasts and a clean, responsive interface.',
    image:
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80',
    url: 'https://github.com/krthik-kk/WeatherAPP',
  },
  {
    title: 'YouTube Clone',
    desc: 'YouTube-style video UI clone with thumbnails grid, detail view, and responsive layout.',
    image:
      'https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=800&q=80',
    url: 'https://github.com/krthik-kk/YoutubeClone',
  },
];

const SKILLS = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 88 },
  { name: 'Flask', level: 92 },
  { name: 'HTML', level: 93 },
  { name: 'CSS', level: 90 },
  { name: 'Data Structures', level: 85 },
];

const TOOLS = [
  { name: 'MySQL', level: 88 },
  { name: 'Git', level: 90 },
  { name: 'GitHub', level: 92 },
  { name: 'REST APIs', level: 85 },
  { name: 'Postman', level: 82 },
  { name: 'VS Code', level: 95 },
];

function SkillList({ items }) {
  return (
    <div className="skill-list">
      {items.map((item) => (
        <div key={item.name} className="skill-item">
          <div className="skill-item__header">
            <span className="skill-item__name">{item.name}</span>
            <span className="skill-item__pct">{item.level}%</span>
          </div>
          <div className="skill-item__track">
            <div
              className="skill-item__fill"
              style={{ '--skill-level': `${item.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function useModalLock(onClose) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);
}

function ModalShell({ label, onClose, children }) {
  useModalLock(onClose);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <button
        type="button"
        className="modal__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function CertificateModal({ imageSrc, alt, onClose }) {
  return (
    <ModalShell label="Internship certificate" onClose={onClose}>
      <img className="modal__img" src={imageSrc} alt={alt} />
    </ModalShell>
  );
}

function MessageModal({ onClose }) {
  const [state, handleSubmit] = useForm('xvzydklk');
  if (state.succeeded) {
    return (
      <ModalShell label="Message sent" onClose={onClose}>
        <div className="message-form__success">
          <h3>Thank you!</h3>
          <p>Your message has been sent.</p>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </ModalShell>
    );
  }
  return (
    <ModalShell label="Send message" onClose={onClose}>
      <form className="message-form" onSubmit={handleSubmit}>
        <h3 className="message-form__title">Send a message</h3>
        <p className="message-form__hint">
          Fill in the form below. I will get back to you soon.
        </p>
        <label className="message-form__field">
          <span>Name</span>
          <input type="text" name="name" required autoComplete="name" />
          <ValidationError field="name" errors={state.errors} />
        </label>
        <label className="message-form__field">
          <span>Email</span>
          <input type="email" name="email" required autoComplete="email" />
          <ValidationError field="email" errors={state.errors} />
        </label>
        <label className="message-form__field">
          <span>Subject</span>
          <input type="text" name="subject" placeholder="How can I help?" />
        </label>
        <label className="message-form__field">
          <span>Message</span>
          <textarea name="message" rows={5} required />
          <ValidationError field="message" errors={state.errors} />
        </label>
        <ValidationError errors={state.errors} />
        <div className="message-form__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn" disabled={state.submitting}>
            Send Message
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function useParallax() {
  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.speed || '0.35');
        const rect = el.getBoundingClientRect();
        const offset = window.innerHeight - rect.top;
        const y = prefersReduced ? 0 : (offset - window.innerHeight) * speed * 0.15;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

const INTERNSHIP_CERTIFICATE = {
  src: `${process.env.PUBLIC_URL}/litmus7-internship-certificate.png`,
  alt: 'LITMUS7 internship certificate for Karthik R Kumar',
};

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1517694712202-14dd95375aa9?auto=format&fit=crop&w=1920&q=80';

const PROFILE_PHOTO = `${process.env.PUBLIC_URL}/profile-photo.png`;

export default function Portfolio() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);

  useParallax();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="portfolio">
      <nav className={`nav ${navScrolled ? 'nav--scrolled' : ''}`}>
        <a href="#home" className="nav__brand">
          Karthik
        </a>
        <div className="nav__links">
          <a href="#work">Personal Works</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#internship">Internship</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header id="home" className="hero">
        <div className="hero__bg-wrap" data-parallax data-speed="0.5">
          <img className="hero__bg" src={HERO_IMAGE} alt="" />
        </div>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__main">
            <p className="hero__tag">Portfolio</p>
            <h1 className="hero__title">
              Karthik R Kumar
              <span>Python • Full Stack • AI</span>
            </h1>
            <p className="hero__desc">
              BTech CSE AIML student building modern web applications, backend
              systems, and AI solutions — code as craft, projects as portfolio.
            </p>
            <div className="cta-row">
              <a
                href="https://github.com/krthik-kk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Connect
              </a>
            </div>
          </div>
          <div className="hero__photo-wrap">
            <img
              className="hero__photo"
              src={PROFILE_PHOTO}
              alt="Karthik R Kumar"
            />
            <span className="hero__photo-frame" aria-hidden="true" />
          </div>
        </div>
        <a href="#work" className="hero__scroll" aria-label="Scroll to work">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </a>
      </header>

      <div className="parallax-band">
        <div className="parallax-band__wrap" data-parallax data-speed="0.4">
          <img
            className="parallax-band__img"
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
            alt=""
          />
        </div>
        <div className="parallax-band__overlay" aria-hidden="true" />
        <p className="parallax-band__text">
          “Building digital experiences with clarity, structure, and purpose.”
        </p>
      </div>

      <section id="work" className="section section--dark">
        <div className="section__inner">
          <p className="section__label">Personal works</p>
          <h2 className="section__title">Projects</h2>
          <div className="work-grid">
            {PROJECTS.map((project, index) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`work-card ${
                  project.featured ? 'work-card--featured' : ''
                }`}
                aria-label={`Open ${project.title}`}
              >
                <div className="work-card__img-wrap">
                  <img
                    className="work-card__img"
                    src={project.image}
                    alt=""
                    loading="lazy"
                  />
                  <div className="work-card__shade" />
                </div>
                <div className="work-card__body">
                  <p className="work-card__num">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="work-card__title">{project.title}</h3>
                  <p className="work-card__desc">{project.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section section--dark">
        <div className="section__inner">
          <p className="section__label">Core skills</p>
          <h2 className="section__title">Skills</h2>
          <p className="skill-hint">Move mouse over a skill to view proficiency</p>
          <SkillList items={SKILLS} />

          <div className="skill-divider" />

          <p className="section__label">Stack</p>
          <h2 className="section__title section__title--sm">Tools &amp; Platforms</h2>
          <p className="skill-hint">Move mouse over a tool to view proficiency</p>
          <SkillList items={TOOLS} />
        </div>
      </section>

      <section id="about" className="section">
        <div className="section__inner about-split">
          <div className="about-split__image-wrap">
            <img
              className="about-split__image"
              src={PROFILE_PHOTO}
              alt="Karthik R Kumar"
            />
            <span className="about-split__frame" aria-hidden="true" />
          </div>
          <div>
            <p className="section__label">About</p>
            <h2 className="section__title">About Me</h2>
            <p className="about-split__text">
              I am a <strong>BTech CSE AIML student</strong> at Mentor College
              Muvattupuzha. I enjoy building backend systems, responsive
              websites, and AI-based projects.
            </p>
            <p className="about-split__text">
              My interests include Python development, Flask, full-stack web
              development, data structures, and software design — always
              learning, always shipping.
            </p>
          </div>
        </div>
      </section>

      <section id="internship" className="section">
        <div className="section__inner">
          <p className="section__label">Experience</p>
          <h2 className="section__title">Internship</h2>
          <div className="internship-block">
            <p className="internship-block__company">
              LITMUS7 Systems Consulting Pvt. Ltd.
            </p>
            <p className="internship-block__location">
              Infopark, Kochi, Kerala
            </p>
            <p className="internship-block__desc">
              Completed an internship at LITMUS7, a leading technology consulting
              firm. Gained hands-on industry experience working alongside
              professional developers in a real-world software environment,
              strengthening both technical and collaborative skills.
            </p>
            <button
              type="button"
              className="btn internship-block__btn"
              onClick={() => setShowCertificate(true)}
            >
              View Certificate
            </button>
          </div>
        </div>
      </section>

      {showCertificate && (
        <CertificateModal
          imageSrc={INTERNSHIP_CERTIFICATE.src}
          alt={INTERNSHIP_CERTIFICATE.alt}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {showMessageForm && (
        <MessageModal onClose={() => setShowMessageForm(false)} />
      )}

      <section className="section">
        <div className="section__inner">
          <p className="section__label">Background</p>
          <h2 className="section__title">Education</h2>
          <div className="edu-block">
            <p className="edu-block__degree">BTech CSE AI &amp; ML</p>
            <p className="edu-block__school">Mentor College Muvattupuzha</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section section--dark">
        <div className="section__inner">
          <p className="section__label">Get in touch</p>
          <h2 className="section__title">Contact</h2>
          <div className="contact-links">
            <a
              className="contact-item contact-item--link"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              <h3>Email</h3>
              <p>{CONTACT_EMAIL}</p>
            </a>
            <a className="contact-item contact-item--link" href="tel:+917012307958">
              <h3>Phone</h3>
              <p>7012307958</p>
            </a>
            <a
              className="contact-item contact-item--link"
              href="https://github.com/krthik-kk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>GitHub</h3>
              <p>github.com/krthik-kk</p>
            </a>
            <a
              className="contact-item contact-item--link"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/karthik-r</p>
            </a>
          </div>
          <div className="contact-message">
            <button
              type="button"
              className="btn contact-message__btn"
              onClick={() => setShowMessageForm(true)}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Karthik R Kumar — Developer Portfolio</p>
      </footer>
    </div>
  );
}
