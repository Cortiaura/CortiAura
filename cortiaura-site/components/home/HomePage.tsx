import React from 'react';
import Link from 'next/link';
import { SOCIAL } from '../../lib/site';
import { writeConsent } from '../../lib/consent';

export type HomePost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tag: string;
};

type Props = { posts: HomePost[]; postCount: number };

const CHEVRON = (
  <svg width={10} height={10} viewBox="0 0 10 10" aria-hidden="true">
    <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const MENUS = [
  {
    id: 'sci',
    label: 'Science',
    items: [
      { href: '/blog/what-is-the-gut-brain-axis', title: 'The gut–brain axis', text: 'The two-way network between gut and brain.' },
      { href: '/blog/what-does-the-vagus-nerve-do', title: 'The vagus nerve', text: 'The main line of gut–brain communication.' },
      { href: '#connection', title: 'Stress and the gut', text: 'Why stress can unsettle your stomach.' },
      { href: '#safety', title: 'Safety and standards', text: 'ISO 13485 · ISO 14971 · IEC 60601.' },
      { href: '#science', title: 'How CortiAura works', text: 'Non-invasive. No implants, no drugs.' },
      { href: '#faq', title: 'References', text: 'NHS, NICE and peer-reviewed research.' },
    ],
  },
  {
    id: 'co',
    label: 'Company',
    items: [
      { href: '/about', title: 'About CortiAura', text: 'A gastroenterologist and a neuroscientist, building together.' },
      { href: '/news', title: 'News and milestones', text: 'Progress updates, newest first.' },
      { href: '#safety', title: 'Roadmap', text: 'From concept to launch readiness.' },
      { href: '/contact', title: 'Contact', text: 'Questions and collaborations welcome.' },
    ],
  },
];

const TICKER = [
  { href: '/news', node: <><b>Ranked top 15%</b> in the Blue Sky Proof-of-Concept Fund, run by Cambridge NeuroWorks in partnership with ARIA</> },
  { href: '#join', node: <><b>Founding Community now open</b>: priority access and a founding-member discount</> },
  { href: 'POST', node: null },
  { href: '/news', node: <><b>Prototype engineering underway</b> with a UK medical device partner</> },
];

const LAYERS: Record<string, React.ReactNode> = {
  brain: <><b>Brain.</b> Mood, stress response and sleep are shaped by signals arriving from the body, including the gut.</>,
  vagus: <><b>Vagus nerve.</b> The longest cranial nerve, running from the brainstem to the abdomen. Most of its fibres carry signals from the body up to the brain.</>,
  gut: <><b>Gut.</b> The gut has its own network of nerves, and sends a constant stream of signals about digestion and comfort back to the brain.</>,
};

const INTERESTS = [
  { value: 'stress', label: 'Stress and calm' },
  { value: 'sleep', label: 'Sleep' },
  { value: 'gut', label: 'Gut wellbeing' },
  { value: 'tech', label: 'Wearable tech' },
];

const COVERS = [
  { bg: 'var(--plum-soft)', svg: <g fill="var(--plum)"><circle cx={40} cy={50} r={10} opacity=".8" /><circle cx={66} cy={38} r={7} opacity=".5" /><circle cx={64} cy={66} r={6} opacity=".35" /></g> },
  { bg: 'var(--signal-soft)', svg: <path d="M0 56h28l6-22 8 40 8-30 6 12h54" fill="none" stroke="var(--signal)" strokeWidth="2.4" strokeLinejoin="round" /> },
  { bg: 'var(--plum-wash)', svg: <><circle cx={58} cy={48} r={22} fill="var(--plum)" opacity=".85" /><circle cx={68} cy={40} r={20} fill="var(--plum-wash)" /></> },
  { bg: 'var(--deep)', svg: <path d="M55 14c-14 18 14 24 0 38s14 22 0 36" fill="none" stroke="var(--plum-ink)" strokeWidth="2.4" strokeLinecap="round" /> },
];

function fmtDate(iso: string, withYear = true) {
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', ...(withYear ? { year: 'numeric' } : {}), timeZone: 'UTC' });
}

function useReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
  }, []);
  return reduce;
}

/* ---------- Founding Community form (posts to /api/subscribe -> HubSpot) ---------- */
type Status = { type: 'idle' | 'submitting' | 'success' | 'error'; message?: string };

function JoinForm() {
  const [status, setStatus] = React.useState<Status>({ type: 'idle' });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      country: String(data.get('country') || ''),
      interests: data.getAll('interest').map(String),
      consent: data.get('consent') === 'on',
      source: 'founding',
    };
    if (!payload.name.trim()) return setStatus({ type: 'error', message: 'Please enter your first name.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim()))
      return setStatus({ type: 'error', message: 'Please enter a valid email address.' });
    if (!payload.consent) return setStatus({ type: 'error', message: 'Please tick the box to agree to receive emails.' });

    setStatus({ type: 'submitting' });
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setStatus({ type: 'success' });
        form.reset();
      } else {
        setStatus({ type: 'error', message: json?.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    }
  };

  if (status.type === 'success') {
    return (
      <div className="jf">
        <div className="ok" role="status">
          <span className="tick">
            <svg width={28} height={28} viewBox="0 0 28 28" aria-hidden="true"><path d="M7 14.5l4.5 4.5L21 9" fill="none" stroke="var(--signal)" strokeWidth="2.6" /></svg>
          </span>
          <h3>Welcome, founding member!</h3>
          <p style={{ color: 'var(--muted)' }}>Thank you for joining. If we have asked you to confirm your email, please check your inbox.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="jf" onSubmit={onSubmit} noValidate>
      <h3>Join for free</h3>
      <div className="two">
        <div className="fld"><label htmlFor="hj-name">First name</label><input id="hj-name" name="name" autoComplete="given-name" required /></div>
        <div className="fld">
          <label htmlFor="hj-country">Country</label>
          <select id="hj-country" name="country" defaultValue="United Kingdom">
            {['United Kingdom', 'Ireland', 'United States', 'India', 'Other'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="fld"><label htmlFor="hj-email">Email address</label><input id="hj-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div>
      <fieldset className="fld">
        <legend>Topics you care about (optional)</legend>
        <div className="chips">
          {INTERESTS.map((i) => (
            <label key={i.value}><input type="checkbox" name="interest" value={i.value} /><span>{i.label}</span></label>
          ))}
        </div>
      </fieldset>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>I’d like to receive emails from CortiAura about the Founding Community, product news and launch offers. I can unsubscribe at any time. See our <Link href="/privacy">privacy policy</Link>.</span>
      </label>
      {status.type === 'error' && <p className="err" role="alert">{status.message}</p>}
      <button className="btn btn-p" type="submit" disabled={status.type === 'submitting'}>
        {status.type === 'submitting' ? 'Joining…' : 'Join the Founding Community'}
      </button>
      <p className="fine">Joining is free and doesn’t commit you to buy.</p>
    </form>
  );
}

/* ---------- Page ---------- */
export default function HomePage({ posts, postCount }: Props) {
  const reduce = useReducedMotion();
  const latest = posts[0];

  // Ticker
  const [tick, setTick] = React.useState(0);
  const [tickFade, setTickFade] = React.useState(false);
  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setTickFade(true);
      window.setTimeout(() => {
        setTick((t) => (t + 1) % TICKER.length);
        setTickFade(false);
      }, 350);
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduce]);
  const tickItem = TICKER[tick];
  const tickHref = tickItem.href === 'POST' ? (latest ? `/blog/${latest.slug}` : '/blog') : tickItem.href;
  const tickNode = tickItem.href === 'POST'
    ? <><b>New article:</b> {latest ? latest.title : 'The gut–brain connection, explained'}</>
    : tickItem.node;

  // Menus
  const [menu, setMenu] = React.useState<string | null>(null);
  const [mobile, setMobile] = React.useState(false);
  const [fab, setFab] = React.useState(false);
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.dd')) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenu(null); setFab(false); }
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, []);

  // Science layers
  const [layer, setLayer] = React.useState<'brain' | 'vagus' | 'gut'>('vagus');

  // Hero nerve pulses: 4 afferent (up) for every 1 efferent (down)
  const pathRef = React.useRef<SVGPathElement>(null);
  const pulsesRef = React.useRef<SVGGElement>(null);
  React.useEffect(() => {
    const path = pathRef.current, g = pulsesRef.current;
    if (!path || !g) return;
    const L = path.getTotalLength();
    const NS = 'http://www.w3.org/2000/svg';
    g.innerHTML = '';
    const dots = Array.from({ length: 5 }, (_, i) => {
      const c = document.createElementNS(NS, 'circle');
      const up = i < 4;
      c.setAttribute('r', up ? '4' : '5');
      c.setAttribute('fill', up ? 'var(--plum)' : 'var(--signal)');
      g.appendChild(c);
      return { c, up, off: i / 5 };
    });
    const place = (t: number) => dots.forEach((d) => {
      const f = (t / 4200 + d.off) % 1;
      const p = path.getPointAtLength(d.up ? L * (1 - f) : L * f);
      d.c.setAttribute('cx', String(p.x));
      d.c.setAttribute('cy', String(p.y));
      d.c.setAttribute('opacity', Math.sin(f * Math.PI).toFixed(2));
    });
    if (reduce) { place(1200); return; }
    let raf = 0;
    const loop = (t: number) => { place(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  // Blog cover breath waves (static drawing)
  const waves = React.useMemo(() => Array.from({ length: 9 }, (_, i) => {
    let d = '';
    const y0 = 60 + i * 26, a = 14 + i * 3;
    for (let x = 0; x <= 640; x += 8) {
      const y = y0 + Math.sin((x / 640) * Math.PI * 4 + i * 0.4) * a;
      d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
    }
    return <path key={i} d={d} opacity={(0.25 + i * 0.08).toFixed(2)} />;
  }), []);

  // Join background: slow flowing lines
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    const size = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        const y0 = (h * (i + 1)) / 15;
        for (let x = 0; x <= w; x += 12) {
          const y = y0 + Math.sin((x / w) * 6 + t / 3000 + i * 0.5) * 18 * Math.sin(t / 5000 + i);
          if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        }
        ctx.strokeStyle = i % 4 === 0 ? 'rgba(92,194,180,.35)' : 'rgba(251,221,207,.22)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    size();
    window.addEventListener('resize', size);
    let raf = 0;
    if (reduce) draw(0);
    else { const loop = (t: number) => { draw(t); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); }
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, [reduce]);

  const [feature, ...rest] = posts;
  const side = rest.slice(0, 4);

  return (
    <div className="ca-home">
      {/* Ticker */}
      <div className="ticker" role="region" aria-label="Updates">
        <div className="wrap">
          <span className="tag">Update</span>
          <Link className="msg" href={tickHref} style={{ opacity: tickFade ? 0 : 1 }} aria-live="polite">{tickNode}</Link>
          <span className="count">0{tick + 1}/0{TICKER.length}</span>
          <span className="side"><Link href="/clinics">For clinics</Link><Link href="/contact">Researchers</Link><Link href="/investors">Investors</Link></span>
        </div>
      </div>

      <header className="site">
        <div className="wrap">
          <Link className="logo" href="/" aria-label="CortiAura home"><img src="/assets/logo.svg" alt="CortiAura" /></Link>
          <nav className="main" aria-label="Main">
            {MENUS.map((m) => (
              <div className="dd" key={m.id}>
                <button type="button" aria-expanded={menu === m.id} aria-controls={`m-${m.id}`} onClick={() => setMenu(menu === m.id ? null : m.id)}>
                  {m.label} {CHEVRON}
                </button>
                <div className="menu" id={`m-${m.id}`} hidden={menu !== m.id}>
                  {m.items.map((it) => (
                    <Link key={it.title} href={it.href} onClick={() => setMenu(null)}><b>{it.title}</b><i>{it.text}</i></Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="dd">
              <button type="button" aria-expanded={menu === 'learn'} aria-controls="m-learn" onClick={() => setMenu(menu === 'learn' ? null : 'learn')}>
                Learn {CHEVRON}
              </button>
              <div className="menu" id="m-learn" hidden={menu !== 'learn'}>
                {latest && (
                  <Link href={`/blog/${latest.slug}`} className="feat" onClick={() => setMenu(null)}>
                    <span className="pill">New</span><span><b>{latest.title}</b></span>
                  </Link>
                )}
                {rest.slice(0, 3).map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} onClick={() => setMenu(null)}><b>{p.title}</b><i>{fmtDate(p.date)}</i></Link>
                ))}
                <Link href="/blog" onClick={() => setMenu(null)}><b>All articles</b><i>{postCount} articles on the gut–brain connection.</i></Link>
              </div>
            </div>
            <Link href="/clinics">For clinics</Link>
            <Link href="/investors">Investors <span className="pill">Pre-seed</span></Link>
          </nav>
          <a className="btn btn-p hdr-cta" href="#join">Join the community</a>
          <button className="burger" type="button" aria-expanded={mobile} aria-controls="mnav" aria-label={mobile ? 'Close menu' : 'Open menu'} onClick={() => setMobile(!mobile)}>
            <svg width={20} height={20} viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" /></svg>
          </button>
        </div>
        <div className="wrap mnav" id="mnav" hidden={!mobile} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setMobile(false); }}>
          <details><summary>Science <span>+</span></summary><Link href="/blog/what-is-the-gut-brain-axis">The gut–brain axis</Link><a href="#science">How CortiAura works</a><a href="#safety">Safety and standards</a><a href="#faq">References</a></details>
          <details><summary>Company <span>+</span></summary><Link href="/about">About</Link><Link href="/news">News</Link><a href="#safety">Roadmap</a><Link href="/contact">Contact</Link></details>
          <details><summary>Learn <span>+</span></summary>{posts.slice(0, 3).map((p) => <Link key={p.slug} href={`/blog/${p.slug}`}>{p.title}</Link>)}<Link href="/blog">All articles</Link></details>
          <Link className="mlink" href="/clinics">For clinics</Link><Link className="mlink" href="/investors">Investors · Pre-seed open</Link>
          <a className="btn btn-p" href="#join">Join the Founding Community</a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <a className="status" href="#join"><span className="dot" />Prototype in progress · Founding Community now open</a>
              <h1>Restoring the <em className="s">conversation</em> between gut and brain.</h1>
              <p className="lede">CortiAura is developing a non-invasive wearable that works with the body’s own gut–brain connection. It is being engineered to recognised medical device safety standards and guided by science.</p>
              <div className="cta-row">
                <a className="btn btn-p" href="#join">Join the Founding Community <span className="arrow">→</span></a>
                <a className="btn btn-g" href="#science">Explore the science</a>
              </div>
              <div className="founders-line">
                <div className="mono-stack"><img className="mono m1" src="/assets/prashant.jpeg" alt="Dr Prashant Bhand" /><img className="mono m2" src="/assets/team/ratnakar-mishra.jpg" alt="Dr Ratnakar Mishra" /></div>
                <span>Founded by an <b>NHS gastroenterologist</b> and a <b>clinical neuroscientist</b></span>
              </div>
            </div>
            <div className="stage" aria-label="Illustration of the vagal pathway between brain and gut">
          <svg className="nerve" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="glowB" cx="50%" cy="50%" r="50%"><stop offset={0} stopColor="var(--plum)" stopOpacity=".35" /><stop offset={1} stopColor="var(--plum)" stopOpacity={0} /></radialGradient>
              <radialGradient id="glowG" cx="50%" cy="50%" r="50%"><stop offset={0} stopColor="var(--signal)" stopOpacity=".35" /><stop offset={1} stopColor="var(--signal)" stopOpacity={0} /></radialGradient>
            </defs>
            {/* soft contour rings */}
            <g fill="none" stroke="var(--line)" strokeWidth={1}>
              <ellipse cx={200} cy={250} rx={170} ry={220} /><ellipse cx={200} cy={250} rx={130} ry={180} /><ellipse cx={200} cy={250} rx={90} ry={140} />
            </g>
            <circle cx={200} cy={105} r={80} fill="url(#glowB)" />
            <circle cx={200} cy={395} r={80} fill="url(#glowG)" />
            {/* brain */}
            <g transform="translate(200 105)" fill="none" stroke="var(--plum)" strokeWidth="2.2" strokeLinecap="round">
              <path d="M-44 4c-12-2-14-22 0-28 0-16 20-22 30-12 6-12 26-12 30 0 12-8 30 0 28 14 14 6 12 26-2 28 2 14-14 22-24 14-8 10-26 10-32 0-12 8-30 0-30-16z" fill="var(--surface)" />
              <path d="M-20 -14c8 4 8 14 0 18M10 -18c-6 8 0 16 8 16M-4 8c4 6 14 6 18 0" opacity=".7" />
            </g>
            {/* gut */}
            <g transform="translate(200 395)" fill="none" stroke="var(--signal)" strokeWidth="2.2" strokeLinecap="round">
              <path d="M-44 -26h88c10 0 14 10 6 16-10 8-80 4-88 16-6 10 4 18 14 18h62c10 0 12 12 2 16-12 6-60 4-70 2" fill="none" />
            </g>
            {/* vagus path */}
            <path ref={pathRef} d="M200 150 C 170 200, 232 238, 196 278 S 214 336, 200 352" fill="none" stroke="var(--plum)" strokeWidth={3} strokeLinecap="round" />
            <path d="M200 150 C 170 200, 232 238, 196 278 S 214 336, 200 352" fill="none" stroke="var(--plum)" strokeWidth={12} strokeOpacity=".08" strokeLinecap="round" />
            {/* branches */}
            <g stroke="var(--plum)" strokeWidth="1.4" fill="none" opacity=".45" strokeLinecap="round">
              <path d="M190 210c-20 4-34 0-44-8" /><path d="M212 246c20 2 34 10 42 20" /><path d="M196 300c-18 6-30 16-36 26" /><path d="M206 320c16 2 28 8 36 18" />
            </g>
            {/* pulses: 4 upward (afferent) : 1 downward (efferent) */}
            <g ref={pulsesRef} />
            <text x={200} y={40} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={11} letterSpacing={2} fill="var(--muted)">BRAIN</text>
            <text x={200} y={472} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize={11} letterSpacing={2} fill="var(--muted)">GUT</text>
            <g fontFamily="IBM Plex Mono, monospace" fontSize={10} fill="var(--muted)">
              <text x={252} y={200}>↑ body → brain</text><text x={252} y={214} fill="var(--plum)">~80% of fibres</text>
              <text x={70} y={300}>↓ brain → body</text>
            </g>
          </svg>
              <div className="float f1"><small>Development · Step 2 of 5</small><b>Prototype engineering</b><br />With a UK medical device partner<div className="prog"><i className="on" /><i className="now" /><i /><i /><i /></div></div>
              <div className="float f2"><small>Recognition</small><b>Ranked top 15%</b><br />Blue Sky PoC Fund applications</div>
              <div className="float f3"><span>Non-invasive</span><span>No implants</span><span>Drug-free</span></div>
            </div>
          </div>
        </section>
    <div className="marquee" aria-hidden="true"><div className="marquee-track">
        <span>Non-invasive</span><span>Drug-free</span><span>No implants</span><span>ISO 13485</span><span>ISO 14971</span><span>IEC 60601</span><span>Evidence-led</span><span>Clinician-founded</span><span>Designed in the UK</span>
        <span>Non-invasive</span><span>Drug-free</span><span>No implants</span><span>ISO 13485</span><span>ISO 14971</span><span>IEC 60601</span><span>Evidence-led</span><span>Clinician-founded</span><span>Designed in the UK</span>
      </div></div>
    {/* STATS + MISSION */}
    <section>
      <div className="wrap">
        <div className="stats">
          <div className="stat"><b>3</b><p>Medical device standards designed in from day one</p></div>
          <div className="stat"><b>Top 15<small>%</small></b><p>Of applications to a UK-wide neurotech fund run by Cambridge NeuroWorks with ARIA</p></div>
          <div className="stat"><b>~80<small>%</small></b><p>Of vagus nerve fibres carry signals from body to brain</p></div>
          <div className="stat"><b>0</b><p>Implants or drugs. Working from outside the body</p></div>
        </div>
        <div className="mission">
          <span className="eyebrow">Our mission</span>
          <div>
            <blockquote>We bring everyday clinical experience in gastroenterology together with deep expertise in neuroscience, to build safe, non-invasive technology that works with the body’s own gut–brain connection.</blockquote>
            <div className="by"><div className="mono-stack"><img className="mono m1" src="/assets/prashant.jpeg" alt="Dr Prashant Bhand" /><img className="mono m2" src="/assets/team/ratnakar-mishra.jpg" alt="Dr Ratnakar Mishra" /></div>Dr Prashant Bhand and Dr Ratnakar Mishra, founders</div>
          </div>
        </div>
      </div>
    </section>
    {/* CONNECTION */}
    <section id="connection" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">The gut–brain connection</span>
          <h2>Your gut, your brain and your stress response are <em className="s">more connected</em> than you think.</h2>
          <p className="lede">Feeling stressed can unsettle your stomach, and an unsettled gut can affect your mood, energy and sleep. Science is showing how closely the digestive system and the nervous system work together.</p>
        </div>
        <div className="trio">
          <article className="card">
            <div className="art"><svg viewBox="0 0 320 200" aria-hidden="true">
                <g fill="none" strokeLinecap="round">
                  <path d="M20 120 L70 120 L82 70 L96 160 L110 40 L124 150 L138 100 L150 120 L300 120" stroke="var(--plum)" strokeWidth="2.5" />
                  <path d="M20 140 C 80 140, 100 132, 160 140 S 260 148, 300 140" stroke="var(--signal)" strokeWidth={2} opacity=".6" />
                  <circle cx={110} cy={40} r={5} fill="var(--plum)" />
                </g>
                <text x={20} y={182} fontFamily="IBM Plex Mono,monospace" fontSize={11} fill="var(--muted)">FIGHT OR FLIGHT</text>
              </svg></div>
            <div className="body"><h3>Stress</h3><p>When stress shifts the body towards “fight or flight”, the nerves that control the gut respond too.</p></div>
          </article>
          <article className="card">
            <div className="art"><svg viewBox="0 0 320 200" aria-hidden="true">
                <circle cx={230} cy={70} r={30} fill="var(--plum-soft)" /><circle cx={244} cy={62} r={28} fill="var(--plum-wash)" />
                <g fill="none" stroke="var(--plum)" strokeWidth={2} strokeLinecap="round">
                  <path d="M20 150 Q 60 110 100 150 T 180 150 T 260 150 T 340 150" />
                  <path d="M20 170 Q 60 140 100 170 T 180 170 T 260 170 T 340 170" opacity=".45" />
                </g>
                <g fill="var(--plum)"><circle cx={70} cy={50} r={2} /><circle cx={120} cy={34} r="1.6" /><circle cx={160} cy={62} r="1.4" /></g>
                <text x={20} y={194} fontFamily="IBM Plex Mono,monospace" fontSize={11} fill="var(--muted)">REST AND DIGEST</text>
              </svg></div>
            <div className="body"><h3>Sleep</h3><p>Poor sleep and an unsettled gut often go together.</p></div>
          </article>
          <article className="card">
            <div className="art"><svg viewBox="0 0 320 200" aria-hidden="true">
                <g fill="none" stroke="var(--signal)" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M90 50h140c18 0 22 22 4 26-30 8-130 2-148 22-14 16 6 30 22 30h120c18 0 20 22 2 26-28 6-110 4-140 0" />
                </g>
                <g fill="var(--signal)"><circle cx={160} cy={50} r={4} /><circle cx={140} cy={98} r={4} /><circle cx={200} cy={128} r={4} /></g>
                <text x={20} y={194} fontFamily="IBM Plex Mono,monospace" fontSize={11} fill="var(--muted)">ENTERIC NERVOUS SYSTEM</text>
              </svg></div>
            <div className="body"><h3>Digestion</h3><p>How your gut feels can affect your mood and wellbeing.</p></div>
          </article>
        </div>
        <div className="facts">
          <div className="fact"><b>~80%</b><p>of vagus nerve fibres carry information from the body <strong>to the brain</strong>.<sup><a href="#refs">[2]</a></sup></p></div>
          <div className="fact"><b>2-way</b><p>The gut–brain axis communicates through <strong>nerves, hormones, the immune system</strong> and gut microbes.<sup><a href="#refs">[1]</a></sup></p></div>
        </div>
      </div>
    </section>
        {/* SCIENCE */}
        <section className="sci" id="science">
          <div className="wrap">
            <div className="sci-grid">
              <div>
                <span className="eyebrow">The science</span>
                <h2 style={{ marginTop: 16 }}>The vagus nerve <em className="s">connects</em> gut and brain.</h2>
                <p className="lede" style={{ marginTop: 20 }}>The gut and brain are in constant two-way communication, and the vagus nerve is the main line between them. CortiAura’s approach is to work with this pathway non-invasively, from outside the body, with no implants and no drugs.</p>
                <div className="layers" role="group" aria-label="Explore the pathway">
                  {([
                    ['brain', 'Brain', 'Mood, stress response, sleep', 'var(--plum)'],
                    ['vagus', 'Vagus nerve', 'Two-way signalling, where CortiAura works', 'var(--ink)'],
                    ['gut', 'Gut', 'Digestion, comfort, gut signals', 'var(--signal)'],
                  ] as const).map(([k, t, d, c]) => (
                    <button key={k} className="layer" type="button" aria-pressed={layer === k} onClick={() => setLayer(k)}>
                      <span className="k" style={{ background: c }} /><span><b>{t}</b><span>{d}</span></span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="diagram-box">
            <svg viewBox="0 0 360 420" role="img" aria-label="Diagram of the vagus nerve connecting the brain and the gut">
              <g className="dz" style={{ opacity: layer === 'brain' ? 1 : 0.28, transition: 'opacity .3s' }}>
                <ellipse cx={180} cy={70} rx={78} ry={52} fill="var(--plum-soft)" stroke="var(--plum)" strokeWidth={2} />
                <path d="M140 64c10-10 26-10 30 4M186 52c12 6 14 20 4 28M150 90c14 6 30 6 44-2" fill="none" stroke="var(--plum)" strokeWidth="1.6" strokeLinecap="round" opacity=".7" />
                <text x={180} y={20} textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize={11} letterSpacing="1.5" fill="var(--muted)">BRAINSTEM</text>
              </g>
              <g className="dz" style={{ opacity: layer === 'vagus' ? 1 : 0.28, transition: 'opacity .3s' }}>
                <path d="M180 122 C 150 170, 214 200, 174 240 S 200 300, 180 330" fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
                <g stroke="var(--ink)" strokeWidth="1.3" fill="none" opacity=".4"><path d="M170 176c-24 2-40-6-50-16" /><path d="M196 206c24 0 40 10 50 22" /><path d="M178 262c-22 6-34 16-40 28" /></g>
                <text x={250} y={186} fontFamily="IBM Plex Mono,monospace" fontSize={10} fill="var(--muted)">VAGUS (X)</text>
                <rect x={196} y={236} width={104} height={26} rx={13} fill="var(--surface)" stroke="var(--plum)" strokeDasharray="3 3" />
                <text x={248} y={253} textAnchor="middle" fontFamily="IBM Plex Mono,monospace" fontSize={10} fill="var(--plum)">CortiAura works here</text>
              </g>
              <g className="dz" style={{ opacity: layer === 'gut' ? 1 : 0.28, transition: 'opacity .3s' }}>
                <path d="M110 340h140c16 0 20 18 4 22-30 8-128 2-144 18-12 12 4 26 20 26h110" fill="none" stroke="var(--signal)" strokeWidth={3} strokeLinecap="round" />
              </g>
            </svg>
                <p className="dcap">{LAYERS[layer]}</p>
              </div>
            </div>
        <div className="principles">
          <div className="pr"><h3>From the outside</h3><p>Working with the body non-invasively, through the skin. No surgery and no implants.</p></div>
          <div className="pr"><h3>With the vagus pathway</h3><p>Designed around the body’s own gut–brain connection. Drug-free by design.</p></div>
          <div className="pr"><h3>Guided by evidence</h3><p>Developed by an NHS gastroenterologist and a clinical neuroscientist, and tested against recognised standards.</p></div>
        </div>
            <p className="more">Want the full picture? <Link href="/blog/what-is-the-gut-brain-axis">Read: What is the gut–brain axis? →</Link></p>
          </div>
        </section>
    {/* WHY */}
    <section>
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">Why CortiAura</span>
          <h2>A new kind of wearable, <em className="s">built differently.</em></h2>
          <p className="lede">Clinical insight, neuroscience and medical-grade engineering, combined from day one.</p>
        </div>
        <div className="bento">
          <div className="bx b-a">
            <svg viewBox="0 0 300 300" aria-hidden="true">
              <g fill="none" stroke="var(--plum-ink)" strokeWidth="1.2" opacity=".55">
                <circle cx={150} cy={150} r={40} /><circle cx={150} cy={150} r={80} /><circle cx={150} cy={150} r={120} />
                <path d="M150 30v240M30 150h240" />
              </g>
              <circle cx={150} cy={150} r={10} fill="var(--plum-ink)" />
              <circle cx={230} cy={150} r={5} fill="var(--signal)" /><circle cx={150} cy={70} r={5} fill="var(--signal)" />
            </svg>
            <span className="lbl">Clinician-led</span>
            <div className="txt"><p className="big2">Founded where the problem is.</p><p>Led by an NHS gastroenterologist who sees the limits of today’s options in clinic every week.</p></div>
          </div>
          <div className="bx b-b"><span className="lbl">Non-invasive</span><p className="big2" style={{color: 'var(--ink)'}}>No implants. No drugs.</p><p>Working with the body from the outside.</p></div>
          <div className="bx b-c"><span className="lbl">Evidence-led</span><h3>Referenced, not hyped.</h3><p>Guided by research and referenced to NHS, NICE and peer-reviewed science.</p></div>
          <div className="bx b-d"><span className="lbl">Safety-first engineering</span><h3>Standards from the first prototype.</h3><p>Being designed to ISO 13485, ISO 14971 and IEC 60601 with an experienced UK medical device engineering team.</p></div>
          <div className="bx b-e"><span className="lbl">Clinic meets lab</span><h3>Two disciplines, side by side.</h3><p>An NHS gastroenterologist and a clinical neuroscientist with postdoctoral research at the University of Cambridge.</p></div>
        </div>
      </div>
    </section>
    {/* SAFETY */}
    <section id="safety" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">Built safely, built to standard</span>
          <h2>Safety designed in from <em className="s">day one</em>, not added later.</h2>
          <p className="lede">We are designing CortiAura to recognised medical device safety standards from the very first prototype. That is the highest bar, whatever route to market we take.</p>
        </div>
        <div className="std">
          <div className="stdc"><code>ISO 13485</code><span>Quality management</span></div>
          <div className="stdc"><code>ISO 14971</code><span>Risk management</span></div>
          <div className="stdc"><code>IEC 60601</code><span>Electrical safety</span></div>
        </div>
        <ol className="road">
          <li className="done"><span className="n">1</span><span className="st">Complete</span><h3>Concept and science</h3><p>Scientific basis established.</p></li>
          <li className="now"><span className="n">2</span><span className="st">In progress</span><h3>Prototype engineering</h3><p>With an experienced UK medical device team.</p></li>
          <li><span className="n">3</span><span className="st">Next</span><h3>Safety and bench testing</h3><p>Verification against recognised standards.</p></li>
          <li><span className="n">4</span><span className="st">Designed</span><h3>Early safety study</h3><p>Safety and feasibility with clinical collaborators.</p></li>
          <li><span className="n">5</span><span className="st">Planned</span><h3>Launch readiness</h3><p>Founding members hear first.</p></li>
        </ol>
      </div>
    </section>
    {/* RECOGNITION */}
    <section style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="recog">
          <div className="num"><small>Recognition · Oct 2026</small>Top 15%</div>
          <div>
            <h2>Ranked in the top 15% of a UK-wide neurotechnology programme.</h2>
            <p>Our proposal to the Blue Sky Proof-of-Concept Fund was ranked in the top 15% of applications. The fund is a UK-wide initiative run by Cambridge NeuroWorks in partnership with ARIA, the UK government’s Advanced Research and Invention Agency.</p>
            <p className="recog-note">This ranking relates to our application only. It is not funding, endorsement or approval of CortiAura by Cambridge NeuroWorks or ARIA.</p>
          </div>
          <div className="recog-links">
            <a className="btn" href="https://cambridgeneuroworks.org/programmes/blue-sky-proof-of-concept-fund" target="_blank" rel="noopener noreferrer">About the fund ↗</a>
            <a className="btn" href="https://www.aria.org.uk/" target="_blank" rel="noopener noreferrer">About ARIA ↗</a>
          </div>
        </div>
      </div>
    </section>
    {/* NEWS */}
    <section id="news" style={{paddingTop: 0}}>
      <div className="wrap">
        <div className="rowhead">
          <div className="head"><span className="eyebrow">Progress update · October 2026</span><h2>Latest from <em className="s">CortiAura</em></h2></div>
          <Link className="btn btn-g" href="/news">All news →</Link>
        </div>
        <div className="news">
          <Link className="nc" href="/news"><span className="cat">Recognition</span><h3>Top 15% in a UK neurotech programme</h3><p>Ranked in the top 15% of applications to the Blue Sky Proof-of-Concept Fund, run by Cambridge NeuroWorks in partnership with ARIA.</p><time>5 Oct 2026</time></Link>
          <Link className="nc" href="/news"><span className="cat">Product</span><h3>Prototype development underway</h3><p>An experienced UK medical device engineering team is taking CortiAura from concept to working prototype.</p><time>5 Oct 2026</time></Link>
          <Link className="nc" href="/news"><span className="cat">Clinical</span><h3>Early safety study designed</h3><p>An early study focused on safety and feasibility, with clinical and academic partnerships in progress.</p><time>5 Oct 2026</time></Link>
          <a className="nc" href="#join"><span className="cat">Community</span><h3>Founding Community now open</h3><p>Priority access and an exclusive founding-member discount when we launch. Free to join.</p><span className="go">Join now →</span></a>
        </div>
      </div>
    </section>
    {/* TEAM */}
    <section id="team" style={{paddingTop: 0}}>
      <div className="wrap team-grid">
        <div>
          <span className="eyebrow">The team</span>
          <h2 style={{marginTop: 16}}>Founded by a clinician who <em className="s">sees the problem</em> every week.</h2>
          <blockquote>CortiAura brings together everyday clinical experience in gastroenterology and deep expertise in neuroscience to develop safe, non-invasive technology built around the gut–brain connection.</blockquote>
          <p style={{marginTop: 28}}><Link className="btn btn-g" href="/about">More about the team →</Link></p>
        </div>
        <div className="people">
          <article className="person">
            <div className="portrait" style={{background: 'var(--plum)'}}>
              <svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="#fff" strokeOpacity=".18"><circle cx={100} cy={100} r={40} /><circle cx={100} cy={100} r={64} /><circle cx={100} cy={100} r={88} /></g></svg>
              <img className="photo" src="/assets/prashant.jpeg" alt="Dr Prashant Bhand" />
            </div>
            <div className="body"><span className="role">Founder &amp; CEO</span><h3>Dr Prashant Bhand</h3><p>NHS gastroenterologist with 9–10 years’ experience in gastroenterology. Postgraduate qualification in AI and machine learning.</p><div className="tags"><span>Gut–brain axis</span><span>Vagus pathways</span><span>AI / ML</span></div></div>
          </article>
          <article className="person">
            <div className="portrait" style={{background: 'var(--signal)'}}>
              <svg viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="#fff" strokeOpacity=".18"><circle cx={100} cy={100} r={40} /><circle cx={100} cy={100} r={64} /><circle cx={100} cy={100} r={88} /></g></svg>
              <img className="photo" src="/assets/team/ratnakar-mishra.jpg" alt="Dr Ratnakar Mishra" />
            </div>
            <div className="body"><span className="role">Co-founder &amp; Chief Scientific Officer</span><h3>Dr Ratnakar Mishra</h3><p>Clinical neuroscientist. PhD, University of Göttingen; postdoctoral research, University of Cambridge.</p><div className="tags"><span>Neuroscience</span><span>Göttingen</span><span>Cambridge</span></div></div>
          </article>
        </div>
      </div>
    </section>
    {/* CLINICS */}
    <section id="clinics" className="sci">
      <div className="wrap">
        <div className="pg">
          <div className="pg-intro">
            <span className="eyebrow">For clinics</span>
            <h2>Help shape the future of <em className="s">gut–brain care.</em></h2>
            <p className="lede">We are inviting a small group of UK clinics to become founding clinic partners. There is no cost and no commitment.</p>
            <div className="cta-row"><Link className="btn btn-p" href="/clinics">Register your clinic <span className="arrow">→</span></Link></div>
            <div className="who"><b>Clinics that see the gut–brain connection every day</b>
              <ul className="chiplist"><li>Private gastroenterology</li><li>Functional and integrative medicine</li><li>Wellness and lifestyle clinics</li><li>Private GP and multi-specialty groups</li></ul>
            </div>
          </div>
          <div className="pg-panel">
            <h3>What founding clinic partners receive</h3>
            <ul className="ticks">
              <li>Early, plain-English research summaries</li>
              <li>Clinical input into how CortiAura fits clinic workflows</li>
              <li>Invitations to future pilot studies, where suitable and approved</li>
              <li>Priority consideration for early access once available</li>
            </ul>
            <h3 style={{marginTop: 28}}>How it works</h3>
            <ol className="flow"><li><b>Register interest</b><span>A short form, two minutes.</span></li><li><b>Welcome and evidence update</b><span>We send what we know so far.</span></li><li><b>A call when it’s relevant</b><span>When a suitable opportunity comes up.</span></li></ol>
            <p className="small">CortiAura is not yet available for clinical use or sale.</p>
          </div>
        </div>
      </div>
    </section>
    {/* INVESTORS */}
    <section id="investors" className="inv-band">
      <div className="wrap">
        <div className="pg">
          <div className="pg-intro">
            <span className="eyebrow">Investors · Pre-seed open</span>
            <h2>Building the next generation of <em className="s">gut–brain neurotechnology.</em></h2>
            <p className="lede">A clinician-led company, built to de-risk.</p>
            <div className="cta-row"><Link className="btn btn-p" href="/investors">Request the investor deck <span className="arrow">→</span></Link><a className="btn btn-o" href="#team">Meet the founders</a></div>
            <div className="why4">
              <div><b>Clinician-founded</b><span>Led by an NHS gastroenterologist.</span></div>
              <div><b>Standards from the first prototype</b><span>Being designed to ISO 13485, ISO 14971 and IEC 60601.</span></div>
              <div><b>Technology under NDA</b><span>Technical details shared with qualified investors under NDA.</span></div>
              <div><b>Flexible route to market</b><span>Options kept open as evidence builds.</span></div>
            </div>
          </div>
          <div className="pg-panel dark">
            <h3>Progress so far</h3>
            <ul className="ticks">
              <li>Concept and scientific basis established</li>
              <li>Ranked top 15% in the Blue Sky PoC Fund (Cambridge NeuroWorks, in partnership with ARIA)</li>
              <li>UK engineering partner engaged, prototype underway</li>
              <li>Early safety study designed</li>
              <li>Regulatory roadmap in place</li>
              <li>Founding Community launched</li>
            </ul>
            <h3 style={{marginTop: 28}}>What this round will fund</h3>
            <div className="fund"><span>Prototype completion</span><span>Safety and bench testing</span><span>Early safety and feasibility study</span><span>IP protection</span></div>
            <p className="small">Information only. Not an offer to buy shares. Early-stage investing carries a risk of total loss.</p>
          </div>
        </div>
      </div>
    </section>
    {/* RESEARCHERS */}
    <section id="researchers" style={{paddingBlock: 56}}>
      <div className="wrap res">
        <div><span className="eyebrow">Clinicians and researchers</span><h3 style={{fontSize: '1.6rem', marginTop: 10}}>Collaborate on the evidence.</h3><p style={{color: 'var(--muted)', marginTop: 8, maxWidth: '60ch'}}>We are looking for clinical and academic partners in gastroenterology and neuroscience for our early safety and feasibility study and beyond.</p></div>
        <Link className="btn btn-g" href="/contact">Get in touch →</Link>
      </div>
    </section>
        {/* BLOG */}
        <section id="blog" className="sci">
          <div className="wrap">
            <div className="rowhead">
              <div className="head"><span className="eyebrow">From the blog</span><h2>The gut–brain connection, <em className="s">explained.</em></h2><p className="lede">Evidence-based articles by an NHS gastroenterologist, referenced to NHS, NICE and peer-reviewed research.</p></div>
              <Link className="btn btn-g" href="/blog">All {postCount} articles →</Link>
            </div>
            {feature && (
              <div className="blog">
                <Link className="post" href={`/blog/${feature.slug}`}>
                  <div className="cover" style={{ background: 'var(--deep)' }}>
                    <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                      <g fill="none" stroke="var(--plum-ink)" strokeWidth={2} opacity=".85">{waves}</g>
                    </svg>
                  </div>
                  <div className="body">
                    <span className="meta"><b>{feature.tag}</b> · {fmtDate(feature.date)} · Latest</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.summary}</p>
                  </div>
                </Link>
                <div className="side-posts">
                  {side.map((p, i) => (
                    <Link className="sp" key={p.slug} href={`/blog/${p.slug}`}>
                      <div className="cover" style={{ background: COVERS[i % COVERS.length].bg }}>
                        <svg viewBox="0 0 110 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">{COVERS[i % COVERS.length].svg}</svg>
                      </div>
                      <div className="body"><span className="meta"><b>{p.tag}</b> · {fmtDate(p.date, false)}</span><h3>{p.title}</h3></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        <div className="sources"><b>Our science content is referenced to</b><span>NHS</span><span>NICE</span><span><i>Nature Reviews</i> Neuroscience</span><span><i>Frontiers in</i> Neuroscience</span><span><i>Scientific</i> Reports</span></div>
          </div>
        </section>
    {/* FAQ */}
    <section id="faq">
      <div className="wrap faq-grid">
        <div>
          <span className="eyebrow">Your questions, answered</span>
          <h2 style={{marginTop: 16}}>Good questions deserve <em className="s">clear answers.</em></h2>
          <p className="lede" style={{marginTop: 16}}>Every answer is referenced to NHS, NICE or peer-reviewed research.</p>
          <div className="ask"><b>Still curious?</b><br />Email <span className="addr">Prashant@cortiaura.com</span></div>
        </div>
        <div className="faq">
          <details open><summary>What is the gut–brain axis?</summary><p>The gut–brain axis is the two-way communication network between your digestive system and your brain. It works through nerves, gut hormones, the immune system and signals from gut microbes. It helps explain why stress can upset your stomach, and why how your gut feels can affect your mood and wellbeing.<sup><a href="#refs">[1]</a></sup></p></details>
          <details><summary>What does the vagus nerve do?</summary><p>The vagus nerve is the longest cranial nerve, running from the brainstem down through the chest to the abdomen, including the gut. It is the main nerve of the parasympathetic nervous system, which supports the body’s “rest and digest” state. Around 80% of its fibres carry information from the body to the brain.<sup><a href="#refs">[2]</a></sup></p></details>
          <details><summary>How does stress affect the gut?</summary><p>When you are stressed, your body shifts towards “fight or flight”. The nerves that control the gut respond too, which can change how it moves and how sensitive it feels. NHS guidance notes that stress and anxiety can trigger or worsen gut symptoms in some people.<sup><a href="#refs">[1]</a><a href="#refs">[3]</a></sup></p></details>
          <details><summary>What is non-invasive vagus nerve stimulation?</summary><p>Vagus nerve stimulation uses gentle electrical signals to stimulate the vagus nerve. Implanted stimulators have been used in epilepsy care for more than 20 years. Non-invasive approaches work through the skin, at the neck or the ear, with no surgery; one such device is recommended by NICE for cluster headache. A 2022 review of ear-based stimulation studies found side effects were generally mild and short-lived. Research into other uses is ongoing.<sup><a href="#refs">[4]</a><a href="#refs">[5]</a><a href="#refs">[6]</a></sup></p></details>
          <details><summary>Can I buy CortiAura yet?</summary><p>Not yet. CortiAura is in development. <a href="#join">Join our Founding Community</a> and we will let you know about our progress and when CortiAura becomes available.</p></details>
          <details className="refs" id="refs"><summary>References</summary><ol>
              <li>Mayer EA. Gut feelings: the emerging biology of gut–brain communication. <a href="https://www.nature.com/articles/nrn3071" target="_blank" rel="noopener noreferrer">Nature Reviews Neuroscience 2011;12:453–466.</a></li>
              <li>Bonaz B, Bazin T, Pellissier S. The vagus nerve at the interface of the microbiota–gut–brain axis. <a href="https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2018.00049/full" target="_blank" rel="noopener noreferrer">Frontiers in Neuroscience 2018;12:49.</a></li>
              <li>NHS inform. IBS and your mental health. <a href="https://www.nhsinform.scot/illnesses-and-conditions/stomach-liver-and-gastrointestinal-tract/irritable-bowel-syndrome-ibs/ibs-and-your-mental-health/" target="_blank" rel="noopener noreferrer">NHS Scotland.</a></li>
              <li>NICE. Vagus nerve stimulation for refractory epilepsy in children (IPG50). <a href="https://www.nice.org.uk/guidance/ipg50" target="_blank" rel="noopener noreferrer">2004.</a></li>
              <li>NICE. gammaCore for cluster headache (MTG46). <a href="https://www.nice.org.uk/guidance/mtg46" target="_blank" rel="noopener noreferrer">2019.</a></li>
              <li>Kim AY, Marduy A, de Melo PS, et al. Safety of transcutaneous auricular vagus nerve stimulation (taVNS): a systematic review and meta-analysis. <a href="https://www.nature.com/articles/s41598-022-25864-1" target="_blank" rel="noopener noreferrer">Scientific Reports 2022;12:22055.</a></li>
            </ol></details>
        </div>
      </div>
    </section>
        {/* JOIN */}
        <section className="join" id="join">
          <canvas ref={canvasRef} aria-hidden="true" />
          <div className="wrap join-grid">
        <div>
          <span className="eyebrow">The CortiAura Founding Community</span>
          <h2 style={{marginTop: 16}}>Be among the <em className="s">first.</em></h2>
          <p className="lede" style={{marginTop: 16}}>Follow the journey from the very beginning. It takes 30 seconds, with no payment and no obligation.</p>
          <ul className="perks">
            <li><svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true"><circle cx={11} cy={11} r={10} fill="none" stroke="var(--plum-ink)" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="var(--plum-ink)" strokeWidth="1.8" /></svg><span><b>Priority access</b><span>First in line when CortiAura is available.</span></span></li>
            <li><svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true"><circle cx={11} cy={11} r={10} fill="none" stroke="var(--plum-ink)" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="var(--plum-ink)" strokeWidth="1.8" /></svg><span><b>Founding-member discount</b><span>An exclusive discount on your first purchase.</span></span></li>
            <li><svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true"><circle cx={11} cy={11} r={10} fill="none" stroke="var(--plum-ink)" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="var(--plum-ink)" strokeWidth="1.8" /></svg><span><b>Behind-the-scenes updates</b><span>Occasional news from the lab and the team.</span></span></li>
            <li><svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true"><circle cx={11} cy={11} r={10} fill="none" stroke="var(--plum-ink)" /><path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="var(--plum-ink)" strokeWidth="1.8" /></svg><span><b>Help shape CortiAura</b><span>Short, optional surveys.</span></span></li>
          </ul>
          <div className="steps"><span><b>1</b>Join for free</span><span><b>2</b>Follow the journey</span><span><b>3</b>Share your views</span><span><b>4</b>First access at launch</span></div>
        </div>
            <JoinForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div className="about">
              <Link className="logo" href="/" aria-label="CortiAura home"><img src="/assets/logo.svg" alt="CortiAura" /></Link>
              <p>A UK neurotechnology company developing a non-invasive wearable built around the gut–brain connection.</p>
              <p style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16 }}><span className="dot" />Prototype engineering in progress</p>
            </div>
            <div><h4>Explore</h4><ul><li><Link href="/about">About</Link></li><li><a href="#science">Science</a></li><li><Link href="/blog">Blog</Link></li><li><Link href="/news">News</Link></li></ul></div>
            <div><h4>Get involved</h4><ul><li><Link href="/founding">Founding Community</Link></li><li><Link href="/clinics">For clinics</Link></li><li><Link href="/investors">Investors</Link></li><li><Link href="/contact">Contact</Link></li></ul></div>
            <div><h4>Learn</h4><ul><li><Link href="/blog/what-is-the-gut-brain-axis">The gut–brain axis</Link></li><li><Link href="/blog/what-does-the-vagus-nerve-do">The vagus nerve</Link></li><li><Link href="/blog/heart-rate-variability-explained">Heart rate variability</Link></li><li><Link href="/blog/sleep-and-gut-health">Sleep and gut health</Link></li></ul></div>
            <div><h4>Follow</h4><ul>
              <li><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer me">LinkedIn</a></li>
              <li><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer me">Instagram</a></li>
              <li><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer me">Facebook</a></li>
              <li><a href={SOCIAL.x} target="_blank" rel="noopener noreferrer me">X</a></li>
            </ul></div>
          </div>
          <div className="wordmark" aria-hidden="true">cortiaura</div>
          <div className="fbot">
            <span>© {new Date().getFullYear()} CortiAura™. All rights reserved.</span>
            <span className="legal"><Link href="/privacy">Privacy policy</Link><Link href="/cookies">Cookie policy</Link><button type="button" onClick={() => writeConsent(null)}>Cookie settings</button></span>
          </div>
          <p className="disc">CortiAura is in development and not yet available. Content on this site is for general information only and is not medical advice.</p>
        </div>
      </footer>

      <div className="fab">
        <div className="fab-panel" id="fabPanel" hidden={!fab} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setFab(false); }}>
          <span className="t">Get in touch</span>
          <a href="mailto:Prashant@cortiaura.com?subject=Enquiry%20from%20cortiaura.com"><b>Email us</b><i>Prashant@cortiaura.com</i></a>
          <Link href="/contact"><b>Contact form</b><i>Questions and collaborations</i></Link>
          <Link href="/clinics"><b>Register your clinic</b><i>Become a founding clinic partner</i></Link>
          <Link href="/investors"><b>Request the investor deck</b><i>Pre-seed round open</i></Link>
          <span className="n">We usually reply within two working days. Not for medical advice.</span>
        </div>
        <button className="fab-btn" type="button" aria-expanded={fab} aria-controls="fabPanel" aria-label="Get in touch" onClick={() => setFab(!fab)}>
          <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
