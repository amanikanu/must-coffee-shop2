import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, ChevronDown, Clock3, Coffee, Mail, MapPin, Sparkles } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const services = [
  { icon: Coffee, title: 'Signature coffee', copy: 'Thoughtfully sourced beans, dialled in daily and brewed exactly how you like them.', detail: 'From ₹149' },
  { icon: Sparkles, title: 'Slow-made treats', copy: 'Fresh pastries and small-batch desserts made for pairing, sharing, and lingering.', detail: 'Baked every morning' },
  { icon: Clock3, title: 'Easy-going gatherings', copy: 'A warm, considered space for catch-ups, quiet work, and celebrations that feel personal.', detail: 'Mon–Sun · 7am–10pm' }
];

const faqs = [
  ['Do you offer dairy-free milk?', 'Yes. Oat, almond, and soy milk are available for every espresso drink.'],
  ['Can I order ahead?', 'Absolutely. Send us a message and we will have your order ready for a quick pickup.'],
  ['Do you take group bookings?', 'We welcome small gatherings. Contact us with your preferred date and we will help you plan it.'],
  ['Is there Wi-Fi and seating for work?', 'Yes. We have reliable Wi-Fi, comfortable tables, and plenty of outlets for a focused morning.']
];

function getPreviewId() {
  const existing = window.location.pathname.match(/^\/p\/([a-z0-9-]{8,})$/i)?.[1];
  if (existing) return existing;
  const randomPart = window.crypto?.randomUUID?.().replaceAll('-', '').slice(0, 12);
  const fallback = Math.random().toString(36).slice(2, 14);
  const id = randomPart || fallback;
  window.history.replaceState({}, '', `/p/${id}`);
  return id;
}

function FAQItem({ question, answer, open, onToggle }) {
  return <div className={open ? 'faq-item is-open' : 'faq-item'}>
    <button className="faq-question" onClick={onToggle} aria-expanded={open}>
      <span>{question}</span>
      <ChevronDown size={18} aria-hidden="true" />
    </button>
    <div className="faq-answer"><p>{answer}</p></div>
  </div>;
}

function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [previewId, setPreviewId] = useState('');

  useEffect(() => {
    setPreviewId(getPreviewId());
  }, []);

  return <div className="app" data-preview-id={previewId}>
    <div className="preview-notice" role="status">
      <span className="notice-dot" aria-hidden="true"></span>
      This preview will be deleted in 30 days
      <span className="notice-private">Private preview</span>
    </div>

    <main id="top">
      <section className="hero-section" aria-labelledby="hero-title">
        <header className="nav-wrap">
          <a className="logo" href="#top" aria-label="Roast and Ritual home"><span>R</span> Roast<span className="amp">&</span>Ritual</a>
          <nav aria-label="Primary navigation">
            <a href="#services">Services</a><a href="#why-us">Why us</a><a href="#faq">FAQ</a><a href="#contact">Contact</a>
          </nav>
          <a className="nav-cta" href="#contact">Book a table <ArrowRight size={15} /></a>
        </header>

        <div className="hero-content">
          <div className="eyebrow"><span></span> Est. 2018 · Bengaluru</div>
          <h1 id="hero-title">Good coffee.<br /><em>Better rituals.</em></h1>
          <p className="hero-lede">Thoughtfully sourced beans, slow mornings, and the little things that make a day feel good.</p>
          <div className="hero-actions"><a className="primary-button" href="#services">Explore what we do <ArrowDownRight size={16} /></a><a className="text-link" href="#contact">Find us <ArrowRight size={15} /></a></div>
          <div className="hero-stats" aria-label="Roast and Ritual highlights"><div><strong>04</strong><span>signature<br />roasts</span></div><div><strong>12k+</strong><span>happy<br />regulars</span></div><div><strong>100%</strong><span>good<br />energy</span></div></div>
        </div>
        <div className="hero-visual" aria-label="A stock photo of coffee being prepared"><div className="hero-image"></div><div className="floating-note"><span>Today's pour</span><strong>House blend</strong><small>Notes of caramel · cocoa</small></div><div className="round-stamp">SLOW<br /><i>coffee</i><br />GOOD</div></div>
      </section>

      <section className="services-section" id="services" aria-labelledby="services-title">
        <div className="section-intro"><div><span className="overline">a little something</span><h2 id="services-title">Made for your<br /><em>kind of day.</em></h2></div><p>Come in for the coffee, stay for the feeling. Everything here is made with care and served without the fuss.</p></div>
        <div className="service-grid">{services.map(({ icon: Icon, title, copy, detail }) => <article className="service-card" key={title}><div className="service-icon"><Icon size={22} strokeWidth={1.6} /></div><h3>{title}</h3><p>{copy}</p><span>{detail}</span></article>)}</div>
      </section>

      <section className="why-section" id="why-us" aria-labelledby="why-title">
        <div className="why-image" role="img" aria-label="Stock photo of a coffee shop table with coffee and pastry"></div>
        <div className="why-copy"><span className="overline">the roast & ritual way</span><h2 id="why-title">The little things<br /><em>matter here.</em></h2><p>We believe the best parts of a day are often the quiet ones. A warm cup between your hands. A familiar face across the table. A moment that asks nothing from you.</p><div className="why-list"><div><b>01</b><span><strong>People first</strong><small>Warm service that remembers your order and your name.</small></span></div><div><b>02</b><span><strong>Good by default</strong><small>Honest ingredients, careful sourcing, no shortcuts.</small></span></div><div><b>03</b><span><strong>Room to linger</strong><small>A relaxed space for whatever your day needs next.</small></span></div></div></div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro"><span className="overline">good to know</span><h2 id="faq-title">Questions,<br /><em>answered.</em></h2><p>Still curious? We are always happy to help.</p></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <FAQItem key={question} question={question} answer={answer} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />)}</div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-copy"><span className="overline">come by sometime</span><h2 id="contact-title">Your table<br /><em>is waiting.</em></h2><p>Drop in for a cup, or send us a note and we will make room for you.</p><div className="contact-details"><a href="https://www.google.com/maps/search/?api=1&query=12+Church+Street+Indiranagar+Bengaluru" target="_blank" rel="noreferrer"><MapPin size={18} />12 Church Street, Indiranagar<br />Bengaluru</a><a href="mailto:hello@roastandritual.com"><Mail size={18} />hello@roastandritual.com</a><span><Clock3 size={18} />Every day · 7:00 am — 10:00 pm</span></div></div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><span className="form-label">Say hello</span><label>Name<input type="text" placeholder="Your name" required /></label><label>Email<input type="email" placeholder="you@example.com" required /></label><label>Message<textarea placeholder="How can we help?" rows="4" required></textarea></label><button className="primary-button" type="submit">{submitted ? 'Message sent ✓' : 'Send a note'} <ArrowRight size={16} /></button></form>
      </section>
    </main>

    <footer><a className="logo" href="#top"><span>R</span> Roast<span className="amp">&</span>Ritual</a><div className="footer-links"><a href="#services">Services</a><a href="#why-us">Why us</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div><div className="footer-meta"><span>© 2026 Roast & Ritual</span><span>Made for slower mornings.</span></div></footer>

    <aside className="get-site-bar" aria-label="Get this website"><div><span className="bar-kicker">Roast & Ritual preview</span><strong>Ready for your business?</strong></div><div className="bar-action"><span className="bar-price">$499</span><a className="get-site-button" href="mailto:hello@roastandritual.com?subject=I%20want%20this%20site">Get this site <ArrowRight size={16} /></a></div></aside>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
