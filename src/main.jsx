import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Heart, Minus, Plus, Search, ShoppingBag, Star, Trash2, X } from 'lucide-react';
import './styles.css';

const coffee = [
  ['Lungo Coffee', 'A bright, generous espresso with a silky finish.', '₹199', 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=85'],
  ['Dalgona Coffee', 'Whipped coffee, cloud-soft and perfectly sweet.', '₹159', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=85'],
  ['Iced Coffee', 'Cold brewed over ice for a clean, smooth sip.', '₹149', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=85'],
  ['Filter Coffee', 'Slow brewed, fragrant, and deeply comforting.', '₹59', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=85']
];
const treats = [
  ['Gulab Jamun', 'Warm milk dumplings with rose and cardamom.', '₹199', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85'],
  ['Chocolate Tiramisu', 'Layers of mascarpone, cocoa, and espresso.', '₹250', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=85'],
  ['Churros', 'Golden, crisp, and made for dipping.', '₹170', 'https://images.unsplash.com/photo-1624371414361-e670edf4898f?auto=format&fit=crop&w=800&q=85'],
  ['Lamingtons', 'Soft sponge, chocolate, and toasted coconut.', '₹280', 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=85']
];

function ProductCard({ item, onAdd }) {
  const [liked, setLiked] = useState(false);
  return <article className="product-card">
    <div className="product-photo" style={{ backgroundImage: `url(${item[3]})` }}><button className={liked ? 'like liked' : 'like'} onClick={() => setLiked(!liked)} aria-label="Favorite"><Heart size={16} fill={liked ? 'currentColor' : 'none'} /></button><span className="photo-tag">signature</span></div>
    <div className="product-info"><div><h3>{item[0]}</h3><p>{item[1]}</p></div><strong>{item[2]}</strong></div>
    <button className="add-button" onClick={() => onAdd(item)}>Add to cart <ArrowRight size={13} /></button>
  </article>;
}

function ProductRail({ title, items, onAdd }) {
  const [offset, setOffset] = useState(0);
  return <section className="catalog-section"><div className="section-heading"><div><span className="overline">from our bar</span><h2>{title}</h2></div><div className="rail-controls"><button onClick={() => setOffset(Math.max(0, offset - 1))} disabled={!offset} aria-label="Previous"><ChevronLeft size={18} /></button><button onClick={() => setOffset(Math.min(1, offset + 1))} disabled={offset === 1} aria-label="Next"><ChevronRight size={18} /></button></div></div><div className="product-rail" style={{ transform: `translateX(calc(-${offset} * (25% + 16px)))` }}>{items.map((item) => <ProductCard key={item[0]} item={item} onAdd={onAdd} />)}</div></section>;
}

function CartDrawer({ items, onClose, onIncrease, onDecrease, onRemove, onCheckout, checkedOut }) {
  const total = items.reduce((sum, entry) => sum + Number(entry.item[2].replace(/[^0-9]/g, '')) * entry.quantity, 0);
  return <><div className="cart-scrim" onClick={onClose}></div><aside className="cart-drawer" aria-label="Shopping cart">
    <div className="cart-header"><div><span className="overline">your order</span><h2>{checkedOut ? 'Thank you.' : 'The good stuff.'}</h2></div><button className="close-cart" onClick={onClose} aria-label="Close cart"><X size={20} /></button></div>
    {checkedOut ? <div className="checkout-success"><CheckCircle2 size={46} /><h3>Order received.</h3><p>We’ll have your coffee ready for you shortly. Your order number is <strong>RR-{Math.floor(1000 + Math.random() * 9000)}</strong>.</p><button className="primary-button" onClick={onClose}>Back to menu <ArrowRight size={15} /></button></div> : items.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><h3>Your cart is waiting.</h3><p>Add a coffee or something sweet from the menu to get started.</p><button className="primary-button" onClick={onClose}>Browse the menu <ArrowRight size={15} /></button></div> : <><div className="cart-items">{items.map(({ item, quantity }) => <div className="cart-item" key={item[0]}><div className="cart-thumb" style={{ backgroundImage: `url(${item[3]})` }}></div><div className="cart-item-copy"><div><h3>{item[0]}</h3><button className="remove-item" onClick={() => onRemove(item[0])}><Trash2 size={12} /> Remove</button></div><strong>{item[2]}</strong><div className="quantity"><button onClick={() => onDecrease(item[0])} aria-label="Decrease quantity"><Minus size={12} /></button><span>{quantity}</span><button onClick={() => onIncrease(item[0])} aria-label="Increase quantity"><Plus size={12} /></button></div></div></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>₹{total}</strong></div><small>Taxes and pickup details are confirmed at checkout.</small><button className="primary-button checkout-button" onClick={onCheckout}>Continue to checkout <ArrowRight size={15} /></button></div></>}
  </aside></>;
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const addToOrder = (item) => { setCartItems((current) => { const existing = current.find((entry) => entry.item[0] === item[0]); return existing ? current.map((entry) => entry.item[0] === item[0] ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { item, quantity: 1 }]; }); setCartOpen(true); };
  const changeQuantity = (name, delta) => setCartItems((current) => current.map((entry) => entry.item[0] === name ? { ...entry, quantity: Math.max(1, entry.quantity + delta) } : entry));
  const removeItem = (name) => setCartItems((current) => current.filter((entry) => entry.item[0] !== name));
  const cartCount = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const searchMenu = (event) => { event.preventDefault(); setSearchOpen(false); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }); };
  return <div className="app">
    <header className="nav-wrap"><a className="logo" href="#top"><span>R</span> Roast<span className="amp">&</span>Ritual</a><nav><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#journal">Journal</a><a href="#visit">Visit us</a></nav><div className="nav-actions"><button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={18} /></button><button className="bag-button" onClick={() => { setCartOpen(true); setCheckedOut(false); }} aria-label="View cart"><ShoppingBag size={18} /><b>{cartCount}</b></button></div>{searchOpen && <form className="search-box" onSubmit={searchMenu}><Search size={15} /><input autoFocus placeholder="Search coffee, desserts..." /></form>}</header>

    <main id="top">
      <section className="hero-section"><div className="hero-content"><div className="eyebrow"><span></span> Est. 2018 · Bengaluru</div><h1>Good coffee.<br /><em>Better rituals.</em></h1><p className="hero-lede">Thoughtfully sourced beans, slow mornings, and the little things that make a day feel good.</p><div className="hero-actions"><a className="primary-button" href="#menu">Explore the menu <ArrowDownRight size={16} /></a><a className="text-link" href="#story">Our philosophy <ArrowRight size={15} /></a></div><div className="hero-stats"><div><strong>04</strong><span>signature<br />roasts</span></div><div><strong>12k+</strong><span>happy<br />regulars</span></div><div><strong>100%</strong><span>good<br />energy</span></div></div></div><div className="hero-visual"><div className="hero-image"></div><div className="floating-note"><span>Today's pour</span><strong>House blend</strong><small>Notes of caramel · cocoa</small></div><div className="round-stamp">SLOW<br /><i>coffee</i><br />GOOD</div></div></section>

      <section className="marquee"><div><span>☕</span> Roasted with intention</div><div><span>✦</span> Made for lingering</div><div><span>☕</span> Roasted with intention</div><div><span>✦</span> Made for lingering</div></section>

      <section className="menu-wrap" id="menu"><div className="menu-intro"><div><span className="overline">a little something</span><h2>Find your<br /><em>perfect cup.</em></h2></div><p>Every drink on our menu has a story — from farms we know by name to recipes we make in-house every morning.</p></div><ProductRail title="Our special coffee" items={coffee} onAdd={addToOrder} /><ProductRail title="Something sweet" items={treats} onAdd={addToOrder} /></section>

      <section className="story-section" id="story"><div className="story-image"></div><div className="story-copy"><span className="overline">the roast & ritual way</span><h2>It’s not just<br /><em>coffee.</em></h2><p>We believe the best parts of a day are often the quiet ones. A warm cup between your hands. A familiar face across the table. A moment that asks nothing from you.</p><a className="text-link dark" href="#visit">Read our story <ArrowRight size={15} /></a></div></section>

      <section className="reviews" id="journal"><div className="review-top"><div><span className="overline">kind words</span><h2>Loved by people<br /><em>who love coffee.</em></h2></div><div className="rating"><strong>4.9</strong><span><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></span><small>from 1,200+ cups shared</small></div></div><div className="review-grid"><blockquote><div className="quote-mark">“</div><p>The kind of place that makes you want to put your phone away. Their filter coffee is quietly perfect.</p><footer><span className="person person-one"></span><span><b>Jane Adams</b><small>Regular since 2019</small></span></footer></blockquote><blockquote className="review-featured"><div className="quote-mark">“</div><p>I came for one coffee and stayed for three hours. The people, the music, the attention to detail — everything feels considered.</p><footer><span className="person person-two"></span><span><b>Sam Williams</b><small>Neighbourhood regular</small></span></footer></blockquote><blockquote><div className="quote-mark">“</div><p>Best little ritual in the city. The tiramisu is genuinely worth crossing town for.</p><footer><span className="person person-three"></span><span><b>Angela Gonzales</b><small>Food & culture writer</small></span></footer></blockquote></div></section>

      <section className="visit-section" id="visit"><div className="visit-copy"><span className="overline">come by sometime</span><h2>Your table<br /><em>is waiting.</em></h2><p>7:00 am — 10:00 pm, every day<br />12 Church Street, Indiranagar</p><a className="primary-button" href="https://www.google.com/maps/search/?api=1&query=12+Church+Street+Indiranagar+Bengaluru" target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div><div className="visit-image"></div></section>

      <section className="subscribe"><div><span className="overline">the good stuff</span><h2>A little warmth<br /><em>in your inbox.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><input type="email" placeholder="Your email address" required /><button className="primary-button" type="submit">{subscribed ? 'You’re in ✓' : 'Subscribe'} <ArrowRight size={15} /></button></form></section>
    </main>
    <footer><a className="logo" href="#top"><span>R</span> Roast<span className="amp">&</span>Ritual</a><div className="footer-links"><a href="#menu">Menu</a><a href="#story">Our story</a><a href="#visit">Visit us</a><a href="mailto:hello@roastandritual.com">Contact</a></div><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Twitter">𝕏</a><span>© 2024 Roast & Ritual</span></div></footer>
    {cartOpen && <CartDrawer items={cartItems} checkedOut={checkedOut} onClose={() => setCartOpen(false)} onIncrease={(name) => changeQuantity(name, 1)} onDecrease={(name) => changeQuantity(name, -1)} onRemove={removeItem} onCheckout={() => setCheckedOut(true)} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
