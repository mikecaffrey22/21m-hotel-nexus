import { useState, useEffect, useRef } from "react";

const ORANGE = "#F7931A";
const DARK = "#0A0A0A";
const BTC_ADDRESS = "YOUR_BITCOIN_ADDRESS_HERE";

const BOOKS = [
  { id: "every-floor-between-us", title: "Every Floor Between Us", genre: "Romance / Thriller", tagline: "6,195 floors apart. One truth between them.", description: "A seamstress from Floor 2 takes a job on a wealthy family's estate on Floor 6,200. The warmth is intoxicating. So is the heir. But the family that employs her bought her mother's floor during the Great Check-In — and her mother's story about a stolen key is a lie.", chapters: 15, words: "41,400", themes: ["Class divide", "Family secrets", "Inherited guilt", "Found independence"], floor: "Floors 2 → 6,200", heat: "9°C → 24°C", bible: "v3", file: "Every-Floor-Between-Us-Complete.docx" },
  { id: "dead-key", title: "Dead Key", genre: "Action / Espionage Thriller", tagline: "Every key opens a door. Some doors should stay closed.", description: "A smuggler who moves through the Hotel's maintenance shafts is hired by El Salvador's intelligence service to recover the key to the Missing Floor — the one everyone thinks is on Mars. The Mars story is a lie. The floor is worth 1.2 billion satoshis. Three factions want the key. One Runner has it.", chapters: 15, words: "13,400", themes: ["Espionage", "Hotel infrastructure", "Broken myths", "Moral gray zones"], floor: "Floors 2 → 8,999,999", heat: "9°C → 28°C", bible: "v2", file: "Dead-Key.docx" },
  { id: "the-meridian", title: "The Meridian", genre: "Romantic Suspense / Mystery", tagline: "Seven days. One locked floor. Everyone has a secret.", description: "A woman from Floor 8 discovers she's inherited a floor from the mother she never knew — and is summoned to a locked-floor summit of powerful families who've been waiting 24 years for that key to resurface. When the patriarch dies on the third night, the floor goes into lockdown. Everyone is a suspect.", chapters: 15, words: "10,600", themes: ["Dual timelines", "Locked-floor mystery", "Inherited enemies", "Forbidden romance"], floor: "Floors 8 → 10,500", heat: "11°C → 25°C", bible: "v2", file: "The-Meridian.docx" },
  { id: "the-last-warm-thing", title: "The Last Warm Thing", genre: "Literary Romance / Poetry", tagline: "He arrived at warmth too late for it to save him. But never too late for it to matter.", description: "A poet on the El Salvador Floors falls in love with a carpenter from Floor 6 whose lungs are already scarred from decades of cold. He builds her a reading room, a writing desk with her poems carved into its legs, and a rocking chair wide enough for two. The warmth doesn't save him. But it holds him.", chapters: 15, words: "9,600", themes: ["Love across class", "Poetry as survival", "The cost of cold", "El Salvador Floors"], floor: "Floors 6 → 74,200", heat: "12°C → 26°C", bible: "v2", file: "The-Last-Warm-Thing.docx" },
  { id: "the-halving", title: "The Halving", genre: "Political Epic / Multi-POV", tagline: "The cold is stolen warmth.", description: "Five protagonists. Five floor clusters. One discovery that could shatter the Hotel's moral order. A Nigerian engineer finds that the cold at the bottom was never natural — it was a setting, chosen by the first generation. Not everyone survives.", chapters: 15, words: "9,200", themes: ["Political intrigue", "Moral complexity", "Multi-POV", "Systemic injustice"], floor: "The Ice → Floor 135,000", heat: "-67°C → 27°C", bible: "v3", file: "The-Halving.docx" },
  { id: "the-ascent", title: "The Ascent", genre: "Epic / Odyssey", tagline: "From the ice to the Fire. Every floor between.", description: "A man born in a dying settlement on the ice walks into the Hotel for the first time, carrying a key to Floor 19,500,000. He climbs through every civilization in the building until he reaches a warm room where the sky is blue and the sun comes through the window. Then he walks home.", chapters: 15, words: "11,500", themes: ["Vertical odyssey", "Every floor", "Freedom vs. shelter", "The full Hotel"], floor: "The Ice → Floor 19,500,000", heat: "-67°C → 34°C", bible: "v3", file: "The-Ascent.docx" },
];

const MEDIA = [
  { id: "books", label: "BOOKS", icon: "📖", desc: "Novels & Novellas", count: BOOKS.length, active: true },
  { id: "manga", label: "MANGA", icon: "🎨", desc: "Graphic Stories", count: 0, active: false },
  { id: "tv", label: "TV SHOWS", icon: "📺", desc: "Episodic Series", count: 0, active: false },
  { id: "movies", label: "MOVIES", icon: "🎬", desc: "Feature Films", count: 0, active: false },
  { id: "audio", label: "AUDIO", icon: "🎧", desc: "Podcasts & Dramas", count: 0, active: false },
  { id: "games", label: "GAMES", icon: "🎮", desc: "Interactive Worlds", count: 0, active: false },
];

function Embers() {
  const ref = useRef(null);
  const anim = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let w, h;
    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const P = Array.from({ length: 90 }, () => ({
      x: Math.random(), y: Math.random(), r: 0.4 + Math.random() * 2.2,
      sp: 0.0004 + Math.random() * 0.0012, dr: (Math.random() - 0.5) * 0.0004,
      a: 0.08 + Math.random() * 0.35, hue: Math.random(), ph: Math.random() * 6.28,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const t = Date.now() * 0.001;
      for (const p of P) {
        p.y -= p.sp; p.x += p.dr + Math.sin(t + p.ph) * 0.00015;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + p.ph * 4);
        const a = p.a * tw;
        const col = p.hue < 0.5 ? `rgba(247,147,26,${a})` : p.hue < 0.8 ? `rgba(255,200,60,${a})` : `rgba(255,100,20,${a * 0.6})`;
        const g = ctx.createRadialGradient(p.x * w, p.y * h, 0, p.x * w, p.y * h, p.r * 7);
        g.addColorStop(0, col); g.addColorStop(1, "rgba(247,147,26,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r * 7, 0, Math.PI * 2); ctx.fill();
      }
      anim.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(anim.current); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function Noise({ o = 0.04 }) {
  return <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: o, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />;
}

function Support() {
  const [ok, setOk] = useState(false);
  const cp = () => { navigator.clipboard?.writeText(BTC_ADDRESS).then(() => { setOk(true); setTimeout(() => setOk(false), 2000); }); };
  return (
    <div style={{ padding: "20px 24px", background: "rgba(247,147,26,0.05)", borderTop: "1px solid rgba(247,147,26,0.08)", textAlign: "center", position: "relative", zIndex: 2 }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: 8 }}>SUPPORT THIS PROJECT</div>
      <div onClick={cp} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(247,147,26,0.08)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: 6, cursor: "pointer" }}>
        <span style={{ fontSize: 14, color: ORANGE }}>₿</span>
        <span style={{ fontSize: 11, color: ORANGE, fontFamily: "'SF Mono','Fira Code',monospace", opacity: 0.8, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{BTC_ADDRESS}</span>
        <span style={{ fontSize: 10, color: ok ? "#4ade80" : "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{ok ? "✓ COPIED" : "COPY"}</span>
      </div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.12)", fontFamily: "monospace", marginTop: 8 }}>every sat supports the universe</div>
    </div>
  );
}

function Glow({ h = 400, o = 0.08 }) {
  return <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: h, background: `radial-gradient(ellipse at top, rgba(247,147,26,${o}) 0%, transparent 70%)`, zIndex: 1, pointerEvents: "none" }} />;
}

function Meta({ label, value }) {
  return <div><div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 2 }}>{label}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{value}</div></div>;
}
function Stat({ label, value }) {
  return <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 16 }}>
    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.12em", marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 16, color: ORANGE, fontFamily: "'Georgia',serif", fontWeight: 600 }}>{value}</div>
  </div>;
}

function Splash({ onEnter }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 100); }, []);
  return (
    <div onClick={onEnter} style={{ minHeight: "100vh", background: ORANGE, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", cursor: "pointer" }}>
      <Embers /><Noise o={0.06} />
      <div style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.22,1,0.36,1)", textAlign: "center", zIndex: 2 }}>
        <div style={{ fontSize: "clamp(14px,2.5vw,18px)", letterSpacing: "0.3em", color: DARK, opacity: 0.5, fontFamily: "monospace", marginBottom: 24 }}>₿ 21,000,000</div>
        <h1 style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: DARK, lineHeight: 0.9, fontFamily: "'Georgia',serif", margin: "0 0 8px", letterSpacing: "-0.03em" }}>THE 21M</h1>
        <h1 style={{ fontSize: "clamp(48px,10vw,120px)", fontWeight: 900, color: DARK, lineHeight: 0.9, fontFamily: "'Georgia',serif", margin: "0 0 32px", letterSpacing: "-0.03em" }}>HOTEL</h1>
        <div style={{ width: 60, height: 2, background: DARK, opacity: 0.3, margin: "0 auto 24px" }} />
        <div style={{ fontSize: "clamp(16px,3vw,24px)", fontWeight: 600, color: DARK, opacity: 0.7, fontFamily: "'Georgia',serif", letterSpacing: "0.15em" }}>N E X U S</div>
      </div>
      <div style={{ position: "absolute", bottom: 40, opacity: v ? 0.4 : 0, transition: "opacity 2s ease 1.5s", fontSize: 13, color: DARK, fontFamily: "monospace", letterSpacing: "0.2em", animation: "pulse 2s ease-in-out infinite" }}>TAP TO ENTER</div>
      <style>{`@keyframes pulse{0%,100%{opacity:.4}50%{opacity:.15}}`}</style>
    </div>
  );
}

function Hub({ onSelect }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow />
      <div style={{ padding: "48px 24px 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 11, letterSpacing: "0.4em", color: ORANGE, opacity: 0.6, fontFamily: "monospace", marginBottom: 12 }}>TRANSMEDIA UNIVERSE</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 4px", letterSpacing: "-0.02em" }}>THE 21M HOTEL</h1>
        <div style={{ fontSize: "clamp(14px,2.5vw,18px)", fontWeight: 600, color: ORANGE, opacity: 0.8, fontFamily: "'Georgia',serif", letterSpacing: "0.12em" }}>NEXUS</div>
        <div style={{ width: 40, height: 1, background: ORANGE, opacity: 0.3, margin: "20px auto 0" }} />
      </div>
      <div style={{ textAlign: "center", padding: "16px 24px 40px", opacity: v ? 0.5 : 0, transition: "opacity 1s ease .3s", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 14, color: "#fff", fontFamily: "'Georgia',serif", fontStyle: "italic", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>One world. Every medium. Choose your entry point.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, padding: "0 24px 40px", maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {MEDIA.map((m, i) => {
          const locked = !m.active;
          return (
            <div key={m.id} onClick={() => m.active && onSelect(m.id)} style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: "28px 16px 20px", textAlign: "center",
              cursor: locked ? "default" : "pointer", opacity: v ? (locked ? 0.35 : 1) : 0, transform: v ? "translateY(0)" : "translateY(20px)",
              transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * .08}s`, position: "relative",
            }}>
              {locked && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>SOON</div>}
              <div style={{ fontSize: 28, marginBottom: 10 }}>{m.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: locked ? "rgba(255,255,255,0.3)" : "#fff", fontFamily: "'Georgia',serif", letterSpacing: ".1em", marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: locked ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{m.desc}</div>
              {m.count > 0 && <div style={{ marginTop: 10, display: "inline-block", padding: "3px 10px", background: "rgba(247,147,26,0.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600 }}>{m.count} TITLES</div>}
            </div>
          );
        })}
      </div>
      <Support />
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.12)", fontFamily: "monospace", letterSpacing: ".15em" }}>21,000,000 FLOORS · ONE FIRE · INFINITE STORIES</p>
      </div>
    </div>
  );
}

function BookList({ onBack, onPick }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ BOOKS</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📖</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Books</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>Novels and novellas set in The 21M Hotel</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {BOOKS.map((b, i) => (
          <div key={b.id} onClick={() => onPick(b)} style={{
            background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 24, cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * .08}s`, marginBottom: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 4px" }}>{b.title}</h3>
                <div style={{ fontSize: 11, color: ORANGE, fontFamily: "monospace", letterSpacing: ".1em", opacity: .8 }}>{b.genre.toUpperCase()}</div>
              </div>
              <div style={{ padding: "4px 10px", background: "rgba(247,147,26,.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>{b.words} WORDS</div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif", lineHeight: 1.6, margin: "0 0 16px", fontStyle: "italic" }}>"{b.tagline}"</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", lineHeight: 1.6, margin: 0 }}>{b.description}</p>
            <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.05)", flexWrap: "wrap" }}>
              <Meta label="FLOORS" value={b.floor} /><Meta label="HEAT" value={b.heat} /><Meta label="CHAPTERS" value={b.chapters} /><Meta label="BIBLE" value={b.bible} />
            </div>
          </div>
        ))}
        <div style={{ border: "1px dashed rgba(255,255,255,.08)", borderRadius: 10, padding: 32, textAlign: "center", marginTop: 16, opacity: v ? 1 : 0, transition: "opacity .6s ease .4s" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.15)", fontFamily: "monospace", letterSpacing: ".1em" }}>MORE STORIES COMING</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.08)", fontFamily: "monospace", marginTop: 8 }}>The Hotel has 21,000,000 floors. We've barely begun.</div>
        </div>
      </div>
      <Support />
    </div>
  );
}

function BookDetail({ book, onBack }) {
  const [v, setV] = useState(false);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise />
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center top,rgba(247,147,26,.15),rgba(247,147,26,.03) 60%,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(to top,${DARK},transparent)` }} />
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.6)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace", zIndex: 3 }}>← BACK</button>
      </div>
      <div style={{ maxWidth: 600, margin: "-60px auto 0", padding: "0 24px 40px", position: "relative", zIndex: 2, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "all .6s cubic-bezier(.22,1,.36,1)" }}>
        <div style={{ fontSize: 11, color: ORANGE, fontFamily: "monospace", letterSpacing: ".15em", marginBottom: 8, opacity: .7 }}>{book.genre.toUpperCase()}</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px", lineHeight: 1.1 }}>{book.title}</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "0 0 24px", lineHeight: 1.5 }}>{book.tagline}</p>
        <div style={{ marginBottom: 32 }}>
          <a href={`/books/${book.file}`} download={book.file} style={{
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            background: ORANGE, border: "none", color: DARK, padding: "14px 32px", borderRadius: 6,
            cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "monospace", letterSpacing: ".05em",
          }}>
            ↓ DOWNLOAD BOOK
          </a>
        </div>
        <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif", lineHeight: 1.7, margin: 0 }}>{book.description}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <Stat label="FLOOR RANGE" value={book.floor} /><Stat label="TEMPERATURE" value={book.heat} />
          <Stat label="CHAPTERS" value={book.chapters} /><Stat label="WORD COUNT" value={book.words} />
          <Stat label="CANON BIBLE" value={book.bible?.toUpperCase()} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {book.themes.map(t => <span key={t} style={{ padding: "5px 12px", background: "rgba(247,147,26,.08)", border: "1px solid rgba(247,147,26,.15)", borderRadius: 20, fontSize: 11, color: "rgba(247,147,26,.7)", fontFamily: "monospace" }}>{t}</span>)}
        </div>
      </div>
      <Support />
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [media, setMedia] = useState(null);
  const [book, setBook] = useState(null);

  if (screen === "splash") return <Splash onEnter={() => setScreen("hub")} />;
  if (screen === "hub") return <Hub onSelect={(id) => { setMedia(id); setScreen("media"); }} />;
  if (screen === "media" && media === "books") {
    if (book) return <BookDetail book={book} onBack={() => setBook(null)} />;
    return <BookList onBack={() => { setScreen("hub"); setMedia(null); }} onPick={setBook} />;
  }
  return <Hub onSelect={(id) => { setMedia(id); setScreen("media"); }} />;
}
