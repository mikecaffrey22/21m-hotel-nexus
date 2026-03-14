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

const FLOORS_DATA = [
  {
    id: "el-salvador",
    name: "The El Salvador Floors",
    floorRange: "Floors 70,000 – 80,000",
    tagline: "The Bitcoin Nation That Believed First",
    icon: "🇸🇻",
    accent: "#FFD700",
    description: "Over ten thousand floors owned by the nation of El Salvador — a tribute to the Bitcoin nation that first adopted when the world scoffed at them. The architecture is immaculate: clean lines, lush vertical gardens, efficient transit corridors connecting gleaming plazas where commerce and culture hum at every hour. The infrastructure here rivals anything in the Hotel — spotless, modern, engineered with a precision that comes from a people who had to build their future from scratch and refused to do it halfway. But it's the warmth that hits you first. Not just the temperature — the golden light, the copal smoke drifting through the promenades, the sound of guitar echoing off hand-painted murals. Pupusas are served on every level. Children play in open courtyards. The people owe it all to President Nayib Bukele, who made El Salvador the first country on Earth to adopt Bitcoin as legal tender. The entire floor cluster is a monument to the freedom of the Salvadoran people and their contributions to the world and to Bitcoin.",
    lore: "When the world laughed, El Salvador stacked. When the IMF warned, Bukele said it won't stop. It didn't.",
  },
  {
    id: "saylor",
    name: "The Michael Saylor Floors",
    floorRange: "17,732 Personal Floors",
    tagline: "A Cathedral to Conviction",
    icon: "⛪",
    accent: "#FF6B00",
    description: "17,732 floors — one for every Bitcoin Michael Saylor personally holds. At the heart of his territory stands the Cathedral — one of the most beautiful structures ever built inside the Hotel. But this isn't a cathedral to any old god. It's a cathedral to Bitcoin. Stained glass windows depict the Genesis Block. The nave stretches upward through multiple floors, vaulted ceilings carved with hash functions and block heights. The pews are hewn from timber that took six months to descend from the Agricultural Belt. It is a masterpiece. Saylor didn't just buy floors — he built a monument to conviction, to the idea that if you believe in something hard enough and long enough, the math will prove you right.",
    lore: "Saylor saw what others couldn't. He bought when they laughed. He held when they panicked. The Cathedral is what \"never sell\" looks like in stone.",
  },
  {
    id: "strategy",
    name: "The Strategy Floors",
    floorRange: "738,731 Corporate Floors",
    tagline: "The Company That Became the Standard",
    icon: "📊",
    accent: "#E63946",
    description: "738,731 floors. One for every Bitcoin that Strategy — formerly MicroStrategy — holds on its corporate balance sheet. This is the largest single floor cluster owned by any entity in the Hotel. What began as a software company became the world's first and largest Bitcoin treasury company. Financial engineers and visionaries who figured out how to create space — real, livable, warm space — for middle-class people stuck on the lower floors. They turned conviction into infrastructure. They turned belief into blueprints. Every sat of space on these floors exists because someone at Strategy understood that Bitcoin isn't just an asset — it's a lever, and if you position it right, you can move the world.",
    lore: "Strategy began buying Bitcoin in August 2020. They never stopped. They never sold. 738,731 and counting.",
  },
  {
    id: "michaels-club",
    name: "Michael's Club of the 21M Hotel",
    floorRange: "Floor 42,000",
    tagline: "If Your Name Isn't Michael, Keep Walking",
    icon: "🏆",
    accent: "#90EE90",
    description: "An ambitious person named Michael decided to create a floor and only let people named Michael live on it. His logic was simple and unhinged: there are too many excellent Michaels in the world. Every Michael is given the overwhelming pressure of being better than every other Michael. They needed their own platform. So he built one. And it worked. The floor is absolutely packed. Wall-to-wall Michaels. Michael became the most popular name in the Hotel. Michaels came from every floor, every nation cluster, every temperature zone. They argue constantly about who the best Michael is. They have a leaderboard. They have a Michael of the Month award. The corridor signs all say MICHAEL. It is, objectively, hilarious.",
    lore: "The waiting list to get on the Michael floor is longer than the queue for the Great Stampede. Somehow there's always room for one more Michael. Michael will come. The most.",
  },
  {
    id: "japan",
    name: "The Japan Floors",
    floorRange: "Floors 100,000 – 108,000",
    tagline: "Formally Known as the Metaplanet Floors",
    icon: "🏯",
    accent: "#FFFFFF",
    description: "First started by Simon Gerovich, the visionary CEO who transformed a struggling Tokyo hotel company into Asia's most aggressive Bitcoin treasury. Gerovich — a former Goldman Sachs derivatives trader turned entrepreneur — saw what Japan's conservative financial establishment couldn't: that Bitcoin was the future. He and his team at Metaplanet revolutionized Japan's economy by being the first to adopt Bitcoin as corporate strategy, then later handed over the floors to the people of Japan. The result rivals El Salvador as one of the most beautiful floor clusters in the Hotel. The culture here is that of an older Japan — exquisite, deliberate, breathtaking. Cherry blossom trees bloom under artificial light along the central promenades. Tea ceremonies are performed in rooms that feel older than the Hotel itself. Calligraphy schools connect children to a civilization buried under miles of ice. If something in the Hotel needs to be invented, it's probably invented here.",
    lore: "Simon Gerovich bet on Bitcoin when Japan's establishment called it madness. Metaplanet became the best-performing stock in the entire Japanese market. The floors are his legacy.",
  },
  {
    id: "finney",
    name: "The Hal Finney Floor",
    floorRange: "Floor 170",
    tagline: "Running Bitcoin",
    icon: "🏃",
    accent: ORANGE,
    description: "A monument to Hal Finney — the first person to ever receive a Bitcoin transaction, on block 170. On January 10, 2009, Finney tweeted two words that changed the world: \"Running bitcoin.\" He was a civil liberties advocate, a cryptography pioneer, a software developer, and one of the earliest builders of Bitcoin itself. In 2009, Finney was diagnosed with ALS — amyotrophic lateral sclerosis — a devastating neurodegenerative disease. He fought it for five years with the same courage he brought to everything. He died on August 28, 2014. He is now in cryopreservation, waiting. The Finney Floor is the Hotel's most sacred space. It doesn't sell anything. It doesn't trade anything. It simply remembers. And it asks you to help.",
    lore: "\"Running bitcoin.\" — Hal Finney, January 10, 2009. The first tweet. The first transaction. The first believer.",
    link: { url: "https://runningbitcoin.us", label: "↗ SUPPORT ALS RESEARCH IN HAL'S HONOR" },
  },
  {
    id: "nakamoto",
    name: "The Nakamoto Floors",
    floorRange: "Floors 19,900,000 – 21,000,000",
    tagline: "Empty. As Designed.",
    icon: "∅",
    accent: "#555",
    description: "Over one million floors. Sealed. Silent. Warm beyond imagination. Nobody lives here. Nobody has ever lived here. The Nakamoto Floors are the Hotel's cruel, beautiful reminder of scarcity. They exist to be empty. They are the space that will never be occupied, the warmth that will never be shared. You can see them on the view screens — endless corridors of perfect temperature, perfect light, perfect nothing. They are what makes every other floor valuable. Without the empty, the full means nothing. Without the cap, the count means nothing. Twenty-one million. Not one more.",
    lore: "Satoshi's floors. The warmest place in existence. The loneliest too. That's the point.",
  },
];

const GLOSSARY_DATA = [
  {
    term: "The Great Stampede",
    aka: "The Great Check-In",
    definition: "The Hotel was built slowly, over decades. Early arrivals checked in when floors were plentiful and cheap. They understood what they were buying. They stacked. They rose. Then — thirty years after the Hotel was already built — the rest of the world showed up at once. The Great Stampede was the day the majority of humanity tried to check in at the same time. The queues stretched for miles across the ice. People were crushed. Families were separated. Children were lost. In the panic, millions accepted whatever floor they could get — the lowest, the coldest, the most cramped. Some sold their keys for almost nothing to people who understood what the keys were worth. The Stampede is why 95% of humanity lives on Floors 1 through 3. They didn't choose the bottom. They arrived too late and got stuck there.",
  },
  {
    term: "Satoshis (Sats)",
    definition: "The Hotel's fundamental unit — not just of currency, but of space itself. A sat represents a unit of floor space. When you own sats, you own space in the Hotel. When you spend sats, you're trading the space you have for something else. This is why stacking matters: accumulating sats means accumulating room to live, room to breathe, room to rise. The people who understood this earliest own the most space. Everyone else is renting.",
  },
  {
    term: "The Ledger",
    definition: "The Hotel's immutable record of every transaction, every transfer, every ownership change since the beginning. The Ledger never lies. Any claim about who owns what can be verified instantly. Characters who lie about their history are always at risk of being checked. The Ledger is transparent, permanent, and merciless.",
  },
  {
    term: "Ghost Floors",
    definition: "Floors that are owned but uninhabited. Sealed, warm, empty. Millions of them exist throughout the Hotel, visible on view screens but inaccessible. Ghost Floors are the Hotel's most psychologically devastating feature — you can watch warmth you'll never feel, rooms you'll never enter, lives you'll never live. Some people watch Ghost Floors obsessively. It drives them mad.",
  },
  {
    term: "The Eternal Fire",
    definition: "The energy source that burns at the Hotel's crown, far above the Summit. It is the Hotel's sun — the origin of all warmth, all light, all life inside the building. Some believe it's conscious. Some believe it's mechanical. Everyone agrees it's real. The higher you go, the closer you get to the Fire, the warmer it becomes.",
  },
  {
    term: "View Screens",
    definition: "Screens available on every floor that can display any other floor in the Hotel in real time. You can watch the Summit from Floor 1. You can watch the Bottom from the Saylor Cathedral. The view screens create the Hotel's unique dramatic irony: you can always see what you can't have.",
  },
  {
    term: "The Cult of Regret",
    definition: "The pervasive condition among Bottom Floor residents who sold, traded, or lost their keys during the Great Stampede. They know exactly what their floor would be worth now. They've done the math a thousand times. The view screens make it worse — they can watch their old floors, warm and empty, any time they want. Regret is the Bottom Floor's most common affliction, and there's no treatment.",
  },
  {
    term: "Stacking",
    definition: "The act of accumulating sats without selling. A philosophy, a religion, a way of life. The Stackers believe that patience is the highest virtue — that if you acquire and hold, the math will reward you. \"Stack sats\" is the Hotel's most common piece of financial advice. It's also its most common prayer.",
  },
  {
    term: "The Stackers",
    definition: "The faith of accumulation. The Hotel's most widespread belief system. Acquire sats, never sell, pass wealth forward. Satoshi is their quasi-divine figure. The Whitepaper is scripture. For Stackers, every sat you hold is a unit of space preserved for the future. Every sat you sell is a floor you'll never get back.",
  },
  {
    term: "The Halving",
    definition: "The Hotel's most watched recurring event. Periodically, the rate at which new sats enter the economy is cut in half. The Halving reshapes power, trade, and politics every time it occurs. It's part economic event, part holiday, part existential crisis.",
  },
  {
    term: "Express Shafts",
    definition: "High-speed elevators that travel between major floor clusters without stopping. An Express can cover 10,000 floors in roughly twenty minutes. Access requires a transit pass that Bottom Floor residents can almost never afford. The elevator system is not a transportation network — it's a class barrier.",
  },
];



/* ─── Shared Components (unchanged from original) ─── */

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

/* ─── Splash (unchanged) ─── */

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

/* ─── Hub (restructured) ─── */

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
      <div style={{ textAlign: "center", padding: "16px 24px 32px", opacity: v ? 0.5 : 0, transition: "opacity 1s ease .3s", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 14, color: "#fff", fontFamily: "'Georgia',serif", fontStyle: "italic", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>One world. Every medium. Choose your entry point.</p>
      </div>

      {/* Featured sections above media */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 24px 12px", maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {[
          { id: "floors", icon: "🏨", label: "THE FLOORS", desc: "Know the Building", count: "7 FLOORS" },
          { id: "glossary", icon: "📜", label: "GLOSSARY", desc: "Hotel Lexicon", count: "11 TERMS" },
        ].map((item, i) => (
          <div key={item.id} onClick={() => onSelect(item.id)} style={{
            background: "rgba(247,147,26,0.04)", border: "1px solid rgba(247,147,26,0.15)", borderRadius: 8,
            padding: "24px 12px 20px", textAlign: "center", cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * .08}s`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'Georgia',serif", letterSpacing: ".08em", marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{item.desc}</div>
            <div style={{ marginTop: 10, display: "inline-block", padding: "3px 10px", background: "rgba(247,147,26,0.15)", borderRadius: 20, fontSize: 10, color: ORANGE, fontFamily: "monospace", fontWeight: 600 }}>{item.count}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 700, margin: "12px auto 16px", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Media grid with brighter locked tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, padding: "0 24px 40px", maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {MEDIA.map((m, i) => {
          const locked = !m.active;
          return (
            <div key={m.id} onClick={() => m.active && onSelect(m.id)} style={{
              background: locked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.03)",
              border: "1px solid", borderColor: locked ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
              borderRadius: 8, padding: "28px 16px 20px", textAlign: "center",
              cursor: locked ? "default" : "pointer",
              opacity: v ? (locked ? 0.7 : 1) : 0,
              transform: v ? "translateY(0)" : "translateY(20px)",
              transition: `all .5s cubic-bezier(.22,1,.36,1) ${(i + 3) * .08}s`, position: "relative",
            }}>
              {locked && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 9, color: "rgba(247,147,26,0.5)", fontFamily: "monospace", fontWeight: 600 }}>SOON</div>}
              <div style={{ fontSize: 28, marginBottom: 10, opacity: locked ? 0.65 : 1 }}>{m.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: locked ? "rgba(255,255,255,0.55)" : "#fff", fontFamily: "'Georgia',serif", letterSpacing: ".1em", marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 11, color: locked ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{m.desc}</div>
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

/* ─── BookList (unchanged) ─── */

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

/* ─── BookDetail (unchanged) ─── */

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
          }}>↓ DOWNLOAD BOOK</a>
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

/* ─── Floors Explorer ─── */

function FloorsList({ onBack }) {
  const [v, setV] = useState(false);
  const [selected, setSelected] = useState(null);
  const detailRef = useRef(null);
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  useEffect(() => {
    if (selected && detailRef.current) {
      setTimeout(() => detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }, [selected]);
  const sel = FLOORS_DATA.find(f => f.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ THE FLOORS</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🏨</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Get to Know the Floors</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic" }}>The Hotel is twenty-one million floors of civilization stacked on ice</p>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {FLOORS_DATA.map((floor, i) => (
          <div key={floor.id} onClick={() => setSelected(selected === floor.id ? null : floor.id)} style={{
            background: selected === floor.id ? "rgba(247,147,26,0.04)" : "rgba(255,255,255,.02)",
            border: "1px solid", borderColor: selected === floor.id ? "rgba(247,147,26,0.2)" : "rgba(255,255,255,.06)",
            borderRadius: 10, padding: "18px 20px", cursor: "pointer",
            opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)",
            transition: `all .6s cubic-bezier(.22,1,.36,1) ${i * .06}s`, marginBottom: 10,
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <span style={{ fontSize: 28, width: 36, textAlign: "center", flexShrink: 0 }}>{floor.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: selected === floor.id ? floor.accent : "#fff", fontFamily: "'Georgia',serif", margin: "0 0 3px", transition: "color 0.3s" }}>{floor.name}</h3>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".08em" }}>{floor.floorRange}</div>
            </div>
            <span style={{ color: "rgba(255,255,255,.15)", fontSize: 18, transform: selected === floor.id ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>›</span>
          </div>
        ))}
        {sel && (
          <div ref={detailRef} style={{ marginTop: 8, background: "rgba(255,255,255,.02)", border: `1px solid ${sel.accent}33`, borderRadius: 10, padding: "28px 24px", animation: "floorFadeIn 0.4s ease" }}>
            <style>{`@keyframes floorFadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
              <span style={{ fontSize: 36 }}>{sel.icon}</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: sel.accent, fontFamily: "'Georgia',serif", margin: 0 }}>{sel.name}</h3>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", fontFamily: "monospace", letterSpacing: ".08em", marginTop: 2 }}>{sel.floorRange}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", fontFamily: "'Georgia',serif", fontStyle: "italic", margin: "8px 0 20px" }}>{sel.tagline}</p>
            <div style={{ width: 30, height: 1, background: `${sel.accent}44`, marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", fontFamily: "'Georgia',serif", lineHeight: 1.75, margin: "0 0 20px" }}>{sel.description}</p>
            <div style={{ background: "rgba(0,0,0,.3)", borderLeft: `2px solid ${sel.accent}44`, padding: "14px 18px", borderRadius: "0 6px 6px 0" }}>
              <p style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,.4)", lineHeight: 1.7, margin: 0, fontFamily: "'Georgia',serif" }}>{sel.lore}</p>
            </div>
            {sel.link && (
              <a href={sel.link.url} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20,
                padding: "12px 24px", background: "rgba(247,147,26,0.1)", border: `1px solid ${sel.accent}44`,
                borderRadius: 6, color: sel.accent, fontSize: 11, fontFamily: "monospace", fontWeight: 600,
                letterSpacing: ".05em", textDecoration: "none",
              }}>{sel.link.label}</a>
            )}
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── Glossary ─── */

function GlossaryEntry({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: open ? "rgba(247,147,26,0.03)" : "rgba(255,255,255,.02)",
      border: "1px solid", borderColor: open ? "rgba(247,147,26,0.15)" : "rgba(255,255,255,.06)",
      borderRadius: 10, marginBottom: 8, transition: "all 0.2s ease", overflow: "hidden",
    }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <span style={{ fontSize: 17, fontWeight: 700, color: open ? ORANGE : "#fff", fontFamily: "'Georgia',serif", transition: "color 0.2s" }}>{item.term}</span>
          {item.aka && <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)", fontFamily: "monospace", marginLeft: 10 }}>aka "{item.aka}"</span>}
        </div>
        <span style={{ color: "rgba(255,255,255,.15)", fontSize: 18, transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>›</span>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px", animation: "floorFadeIn 0.3s ease" }}>
          <div style={{ width: 24, height: 1, background: "rgba(247,147,26,0.2)", marginBottom: 14 }} />
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", fontFamily: "'Georgia',serif", lineHeight: 1.75, margin: 0 }}>{item.definition}</p>
        </div>
      )}
    </div>
  );
}

function GlossaryScreen({ onBack }) {
  const [v, setV] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => { setTimeout(() => setV(true), 50); }, []);
  const filtered = GLOSSARY_DATA.filter(item =>
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.definition.toLowerCase().includes(search.toLowerCase()) ||
    (item.aka && item.aka.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ minHeight: "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
      <Embers /><Noise /><Glow h={300} o={0.06} />
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
        <button onClick={onBack} style={{ background: "rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, color: "rgba(255,255,255,.5)", padding: "6px 14px", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}>← NEXUS</button>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)", fontFamily: "monospace" }}>/ GLOSSARY</span>
      </div>
      <div style={{ textAlign: "center", padding: "20px 24px 32px", position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>📜</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: "'Georgia',serif", margin: "0 0 8px" }}>Glossary</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", fontFamily: "'Georgia',serif", fontStyle: "italic", marginBottom: 24 }}>The language of the Hotel. Learn it or freeze.</p>
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <input type="text" placeholder="Search terms..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#fff", fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px 40px", position: "relative", zIndex: 2 }}>
        {filtered.map((item, i) => (
          <div key={item.term} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(15px)", transition: `all .5s cubic-bezier(.22,1,.36,1) ${i * .04}s` }}>
            <GlossaryEntry item={item} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.2)", fontFamily: "monospace", fontStyle: "italic" }}>No terms found. The Hotel keeps some secrets.</p>
          </div>
        )}
      </div>
      <Support />
    </div>
  );
}

/* ─── Main App ─── */

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [media, setMedia] = useState(null);
  const [book, setBook] = useState(null);

  if (screen === "splash") return <Splash onEnter={() => setScreen("hub")} />;
  if (screen === "hub") return <Hub onSelect={(id) => { setMedia(id); setScreen("media"); }} />;
  if (screen === "media") {
    if (media === "books") {
      if (book) return <BookDetail book={book} onBack={() => setBook(null)} />;
      return <BookList onBack={() => { setScreen("hub"); setMedia(null); }} onPick={setBook} />;
    }
    if (media === "floors") return <FloorsList onBack={() => { setScreen("hub"); setMedia(null); }} />;
    if (media === "glossary") return <GlossaryScreen onBack={() => { setScreen("hub"); setMedia(null); }} />;
  }
  return <Hub onSelect={(id) => { setMedia(id); setScreen("media"); }} />;
}
