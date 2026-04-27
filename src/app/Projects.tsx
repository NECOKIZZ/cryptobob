import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Link } from 'react-router';
import { Crown } from 'lucide-react';
import heroBgImage from '../imports/hero_bg.png';
import statsImage from '../imports/Untitled.png';
import bgImage from '../imports/Gemini_Generated_Image_6bqbpf6bqbpf6bqb.png';
import heroCenterImg from '../imports/MM3mTp-8_400x400.jpg';
import privacyThumbnail from '../imports/privacy-article-thumbnail.jpg';
import mantleThumbnail from '../imports/Mantle vaults.jpg';
import wizzThumbnail from '../imports/Wizz.jpg';
import dotarcImage from '../imports/dotarc.png';
import cuerateImage from '../imports/cuerate.jpg';

// --- Data Placeholders ---
const VIDEOGRAPHY = [
  {
    id: 'vid-01',
    title: 'Tales of Valdir',
    description: 'Commissioned by ZarGates for the PvPVibe NFT Tales of Valdir contest — an AI-generated cinematic short following Anariel, an elven warrior who discovers the universal sphere of balance in an abandoned castle, only to be ambushed by an army of the undead. One of 10 winning submissions selected from a global creator call, splitting a $1,000 prize pool.',
    image: heroBgImage,
    link: 'https://x.com/0xnecokizz/status/2043791083608457325?s=20',
  },
  {
    id: 'vid-02',
    title: 'Zerion Perps Launch',
    description: 'Produced as part of Zerion\'s official Creators Program, this AI-generated promotional video was commissioned to announce the launch of Zerion Perps — a groundbreaking perpetuals trading feature that brings institutional-grade markets directly to your phone. Gold, stocks, and perpetuals were once locked behind Bloomberg terminals and insider networks. Zerion changed that. This video was built to carry that message globally.',
    image: bgImage,
    link: 'https://x.com/0xnecokizz/status/2026711308578537933?s=20',
    won: true,
  },
  {
    id: 'vid-03',
    title: 'Base App Pivot',
    description: 'An AI-generated video contest entry produced for the Base App ecosystem, created to announce and contextualise Base App\'s strategic pivot from a social-first to a trading-first platform. The video was designed to communicate the significance of this shift to the broader Base ecosystem — signalling the arrival of serious capital, disciplined execution, and a new era of onchain trading. Full AI video production from concept to final render, submitted as part of Base App\'s official creator competition.',
    image: statsImage,
    link: 'https://x.com/0xnecokizz/status/2025974538312225259?s=20',
  },
  {
    id: 'vid-04',
    title: 'Busha Crypto Loans',
    description: 'An AI-generated animation entry produced for Busha\'s official bounty competition hosted on Superteam Nigeria. Created to promote Busha\'s Solana-backed crypto loan feature — a product that allows Nigerian users to access liquidity from their crypto holdings without selling their position. The video was delivered entirely in Nigerian Pidgin English, blending local cultural storytelling with Web3 financial education to communicate a complex DeFi concept in the most relatable, street-native way possible. Full AI animation production from concept to final render.',
    image: bgImage,
    link: 'https://x.com/0xnecokizz/status/2024460019203178738?s=20',
  },
  {
    id: 'vid-05',
    title: 'River x Sui Network',
    description: 'A winning entry in River Inc\'s official creative contest — one of just 10 selected globally — produced to announce and explain the landmark partnership between River and the Sui Network. The video breaks down one of DeFi\'s most persistent problems: over $2.89 billion lost to bridge hacks and exploits, fragmented liquidity, high slippage, and the broken trust model of wrapped tokens. Through AI-generated visuals and sharp technical narration, the video introduces River\'s cross-chain collateral technology — lock ETH on Ethereum, mint $satUSD on Sui, farm juicy APYs on Cetus, Haedal, and DeepBook, all without ever touching a bridge. No bridges. No problems.',
    image: heroBgImage,
    link: 'https://x.com/0xnecokizz/status/2017305149706744224?s=20',
    won: true,
  },
  {
    id: 'vid-06',
    title: 'Zerion Feed — $TRUMP Token',
    description: 'An AI-generated video produced for Zerion\'s Feed feature competition, built around one of the most significant memecoin events in crypto history — the January 18th 2025 launch of President Donald Trump\'s $TRUMP token, which reached a $14.4 billion market cap at its peak. The piece used the cultural weight of that moment to drive engagement, framing the viral question on every trader\'s mind as its central narrative hook. While it did not place among the winners, the submission received official recognition from the Zerion team.',
    image: statsImage,
    link: 'https://x.com/0xnecokizz/status/2015049657974509622?s=20',
  }
];

const WRITTEN_CONTENT = [
  {
    id: 'doc-01',
    title: 'Blockchain Privacy: The phrase everyone uses but no one understands',
    protocol: 'Medium',
    description: 'A technical deep dive into the architecture, trade-offs, and real-world limitations of privacy on public blockchains — cutting through the marketing speak to examine what on-chain privacy actually guarantees, where it breaks down, and why most users are still exposed despite the promises.',
    link: 'https://medium.com/@necokizz/blockchain-privacy-the-phrase-everyone-uses-but-no-one-understands-e64363bf85c5',
    thumbnail: privacyThumbnail,
  },
  {
    id: 'doc-02',
    title: 'Mantle Vaults: CeDeFi Yield, Inflation, and the Future of RWA',
    protocol: 'X / Research',
    description: 'A comprehensive research article covering Mantle Vaults — a CeDeFi stablecoin yield product launched in partnership with Bybit and CIAN Protocol. Contextualises the product within the broader history of inflation and DeFi risk, with a detailed technical breakdown of delta-neutral yield strategies, security model, and UX. Includes live deposit documentation, APR comparisons, and a forward-looking analysis of Mantle\'s RWA ecosystem with Ondo Finance, xStocks, and Anchorage Digital.',
    link: 'https://x.com/0xnecokizz/status/2022374792456786163?s=20',
    thumbnail: mantleThumbnail,
  },
  {
    id: 'doc-03',
    title: 'Quantum Threats & Polkadot\'s Defence Architecture',
    protocol: 'X / Research',
    description: 'A technical explainer covering the quantum computing threat to blockchain security and Polkadot\'s proactive countermeasures. Breaks down quantum superposition, qubit architecture, and the key algorithms — Shor\'s and Grover\'s — that make quantum machines capable of cracking modern cryptographic foundations. Examines Polkadot\'s multi-layered defence strategy including Post-Quantum Cryptography standards, the Web3 Foundation-backed QuantumGuard initiative on Kusama, and Substrate\'s modular design that enables seamless security upgrades without chain disruption.',
    link: 'https://x.com/0xnecokizz/status/1935678803533070583?s=20',
  },
  {
    id: 'doc-04',
    title: 'Wizz HQ: A Creator Rewards Platform Built for Merit',
    protocol: 'X / Thread',
    description: 'A promotional thread written for Wizz HQ — a Web3 creator rewards platform. Leads with a relatable pain point familiar to every onchain content creator: losing contests to low-effort posts despite producing high-quality work. Uses that frustration as a narrative hook to position Wizz HQ as the solution — a fair, merit-based platform where creators are evaluated on output quality rather than team connections. Written to drive awareness and sign-ups among the Web3 creator community.',
    link: 'https://x.com/0xnecokizz/status/1903134766087504184?s=20',
    thumbnail: wizzThumbnail,
  }
];

const APPS = [
  {
    id: 'app-01',
    title: '.arc',
    role: 'Smart Contracts',
    description: 'the identity layer of arc network',
    image: dotarcImage,
    link: 'https://dotarc.vercel.app',
  },
  {
    id: 'app-02',
    title: 'Cuerate',
    role: 'Social / Media',
    description: 'A platform for video content creators to share their prompts.',
    image: cuerateImage,
    link: 'https://cuerateprompt.vercel.app',
  }
];

const REVIEWS: { id: string; reviewer: string; image: string; quote: string }[] = [
  {
    id: 'rev-01',
    reviewer: 'Product Lead, Mantle Network',
    image: bgImage,
    quote: "Bob's breakdown of Mantle Vaults was the clearest explanation of our yield product I've seen from an external contributor. He actually deposited his own capital to test the UX before writing, which showed in the level of detail.",
  },
  {
    id: 'rev-02',
    reviewer: 'Community Lead, Zerion',
    image: heroBgImage,
    quote: "We've worked with dozens of creators through our program, and Bob consistently delivers videos that outperform on engagement. His Perps launch content was genuine enough to feel organic while still hitting every key message we needed.",
  }
];

// --- 3D Tilt Card Component for Apps ---
function TiltCard({ app }: { app: typeof APPS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (max 10 degrees)
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <img src={app.image} alt={app.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-90" />
      
      {/* Glint effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at 50% 0%, rgba(250,204,21,0.15), transparent 70%)' }} />

      <div className="absolute bottom-0 left-0 w-full p-8" style={{ transform: 'translateZ(30px)' }}>
        <p className="font-mono text-[#facc15] text-xs uppercase tracking-widest mb-2">{app.role}</p>
        <h3 className="font-black text-white text-2xl md:text-3xl uppercase tracking-tighter mb-2">{app.title}</h3>
        <p className="text-white/70 font-light text-sm md:text-base" style={{ fontFamily: 'var(--font-outfit)' }}>{app.description}</p>
      </div>
    </motion.div>
  );
}


export default function Projects() {
  const [activeReview, setActiveReview] = useState(REVIEWS[0]);

  return (
    <div className="relative min-h-screen bg-[#050507] text-white font-sans overflow-x-hidden selection:bg-[#facc15] selection:text-black">
      
      {/* Global warped grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Perspective floor grid */}
        <div style={{ perspective: '1000px' }} className="absolute inset-0">
          <div 
            className="absolute bottom-[-5%] left-[-10%] w-[120%] h-[55%]"
            style={{
              backgroundImage: 'linear-gradient(rgba(250,204,21,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.10) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              transform: 'rotateX(70deg)',
              transformOrigin: 'center bottom',
              maskImage: 'linear-gradient(to top, black 10%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 80%)'
            }} 
          />
        </div>
        {/* Vertical grid columns */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(250,204,21,0.04) 1px, transparent 1px)',
            backgroundSize: '20% 100%'
          }} 
        />
        {/* Horizontal scan grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(250,204,21,0.03) 3px, rgba(250,204,21,0.03) 3px)',
            backgroundSize: '100% 8px'
          }} 
        />
      </div>

      {/* Navigation Island */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-6 shadow-2xl">
          <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="text-xs font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors">
              Home
            </Link>
          </motion.div>
          <div className="w-px h-4 bg-white/10" />
          <motion.a href="#videography" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="text-xs font-bold tracking-widest uppercase text-white/50 hover:text-[#facc15] transition-colors">
            Videos
          </motion.a>
          <motion.a href="#writing" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="text-xs font-bold tracking-widest uppercase text-white/50 hover:text-[#facc15] transition-colors">
            Writing
          </motion.a>
          <motion.a href="#apps" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="text-xs font-bold tracking-widest uppercase text-white/50 hover:text-[#facc15] transition-colors">
            Apps
          </motion.a>
          <motion.a href="#reviews" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="text-xs font-bold tracking-widest uppercase text-white/50 hover:text-[#facc15] transition-colors">
            Reviews
          </motion.a>
        </div>
      </div>

      {/* Intense top-right hero glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#facc15]/[0.14] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <header className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-mono text-[#facc15] font-bold uppercase tracking-[0.4em] text-sm mb-6">Archive</p>
          <h1 className="font-serif text-[#f0ede8] leading-[1.1] mb-8" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            <span className="italic">the </span><span className="text-[#facc15]">B<img src={heroCenterImg} alt="" className="inline-block h-[1.1em] w-[1.1em] rounded-full object-cover align-middle mx-[0.04em] border-2 border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.8),0_0_35px_rgba(250,204,21,0.4)]" />B</span> files
          </h1>
        </motion.div>
      </header>


      {/* Intense yellow wash behind videography */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#facc15]/[0.18] rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* SECTION 1: AI VIDEOGRAPHY (Alternating Blocks) */}
      <section id="videography" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-16">
          <h2 className="font-black uppercase tracking-tighter text-3xl md:text-5xl text-white">AI Videography</h2>
          <div className="h-px w-24 bg-[#facc15]/40 mt-4" />
        </div>

        <div className="flex flex-col gap-32">
          {VIDEOGRAPHY.map((vid, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={vid.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                
                {/* Video Embed Block (60%) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full lg:w-3/5 aspect-video relative rounded-2xl overflow-hidden border border-white/10 bg-black"
                >
                  <iframe
                    src={`https://twitter.com/i/videos/tweet/${vid.link.split('/status/')[1]?.split('?')[0]}`}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    scrolling="no"
                  />
                </motion.div>

                {/* Text Block (40%) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full lg:w-2/5 flex flex-col items-start"
                >
                  <p className="font-mono text-[#7a7880] text-xs uppercase tracking-widest mb-4">0{i + 1} / Cinematic Storytelling</p>
                  <h3 className="font-black text-white text-3xl md:text-4xl uppercase tracking-tighter mb-6 flex items-center gap-3">
                    {vid.title}
                    {vid.won && (
                      <span className="group/crown relative inline-flex items-center justify-center">
                        <Crown className="w-6 h-6 text-[#facc15] drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/crown:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          <span className="bg-[#facc15] text-black text-[0.65rem] font-black uppercase tracking-widest px-2 py-1 rounded shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                            WON
                          </span>
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#facc15]" />
                        </span>
                      </span>
                    )}
                  </h3>
                  <p className="text-white/70 font-light text-base md:text-lg leading-relaxed mb-8" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {vid.description}
                  </p>
                  <a href={vid.link} target="_blank" rel="noopener noreferrer" className="partner-btn group inline-block px-8 py-4 border border-[#facc15]/30 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-[#facc15] hover:bg-[#facc15]/10 transition-colors">
                    Watch Video
                  </a>
                </motion.div>

              </div>
            );
          })}
        </div>
      </section>


      {/* SECTION 2: WRITTEN CONTENT (Tech Grid) */}
      <section id="writing" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#facc15]/[0.12] rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#facc15]/[0.22] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mb-16">
          <h2 className="font-black uppercase tracking-tighter text-3xl md:text-5xl text-white">Technical Writing</h2>
          <div className="h-px w-24 bg-[#facc15]/40 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WRITTEN_CONTENT.map((doc, i) => (
            <a
              key={doc.id}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-[#facc15]/30 transition-colors duration-300 flex flex-col min-h-[300px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col h-full"
              >
                {/* Thumbnail */}
                {doc.thumbnail && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={doc.thumbnail}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-60" />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <p className="font-mono text-[#facc15] text-[0.65rem] uppercase tracking-[0.2em] mb-4">[{doc.protocol}]</p>
                  <h3 className="font-serif text-white text-2xl md:text-3xl leading-tight mb-4 group-hover:text-[#facc15] transition-colors">{doc.title}</h3>
                  <p className="text-[#7a7880] font-light text-sm leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-outfit)' }}>{doc.description}</p>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-[0.65rem] uppercase text-white/40 tracking-widest">Read on {doc.protocol}</span>
                    <span className="text-[#facc15] font-black group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>

                {/* Scanline overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, white 3px, white 3px)' }} />
              </motion.div>
            </a>
          ))}
        </div>
      </section>


      {/* SECTION 3: STARTUPS & VIBECODED APPS (3D Tilt Cards) */}
      <section id="apps" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 relative">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[rgba(200,160,255,0.03)] rounded-full blur-[120px] pointer-events-none" />

        <div className="mb-16">
          <h2 className="font-black uppercase tracking-tighter text-3xl md:text-5xl text-white">Vibecoded Apps</h2>
          <div className="h-px w-24 bg-[#facc15]/40 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {APPS.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
              className="perspective-[1000px]"
            >
              {app.link ? (
                <a href={app.link} target="_blank" rel="noopener noreferrer" className="block">
                  <TiltCard app={app} />
                </a>
              ) : (
                <TiltCard app={app} />
              )}
            </motion.div>
          ))}
        </div>
      </section>


      {/* Intense glowing bottom wash */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#facc15]/[0.24] rounded-full blur-[120px] pointer-events-none -z-10" />

      {REVIEWS.length > 0 && (
        <section id="reviews" className="relative py-32 border-t border-white/10 bg-[#020202]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Side: Index of Reviewers */}
            <div className="w-full lg:w-1/3 flex flex-col justify-center border-l lg:border-l-0 lg:border-r border-white/10 pl-6 lg:pl-0 lg:pr-12 relative z-20">
              <p className="font-mono text-[#facc15] font-bold uppercase tracking-[0.2em] text-xs mb-12">
                Client Commends
              </p>
              
              <div className="flex flex-col gap-8">
                {REVIEWS.map((review) => {
                  const isActive = activeReview.id === review.id;
                  return (
                    <div 
                      key={review.id}
                      className="group cursor-pointer"
                      onMouseEnter={() => setActiveReview(review)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-1 transition-all duration-300 ${isActive ? 'h-8 bg-[#facc15]' : 'h-0 bg-transparent'}`} />
                        <h2 
                          className={`font-mono uppercase tracking-widest text-sm md:text-base transition-all duration-300 ${isActive ? 'text-[#facc15] translate-x-2' : 'text-white/40 group-hover:text-white/80'}`}
                        >
                          {review.reviewer}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Stage Hologram */}
            <div className="w-full lg:w-2/3 flex items-center justify-center relative min-h-[400px]">
              {/* Viewport */}
              <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview.id}
                    initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px) brightness(2)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) brightness(0)' }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <img 
                      src={activeReview.image} 
                      alt="Background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen filter grayscale"
                    />
                    
                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, black 3px, black 3px)' }} />
                    
                    {/* Central Terminal Output */}
                    <div className="relative z-10 w-4/5 max-w-lg bg-[#050507]/90 backdrop-blur-xl border border-white/20 p-8 shadow-[0_0_50px_rgba(250,204,21,0.05)]">
                      <p className="font-mono text-[#facc15] text-[0.65rem] uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Terminal Output / {activeReview.id}</p>
                      <p className="text-white/90 text-xl md:text-2xl font-serif leading-relaxed italic mb-6">
                        "{activeReview.quote}"
                      </p>
                      <p className="text-[#7a7880] font-mono text-xs uppercase tracking-widest text-right">
                        {activeReview.reviewer}
                      </p>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
