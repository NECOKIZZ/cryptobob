import { ImageWithFallback } from './components/figma/ImageWithFallback';
import backgroundImage from '../imports/Gemini_Generated_Image_6bqbpf6bqbpf6bqb.png';
import heroBgImage from '../imports/hero_bg.png';
import statsImage from '../imports/Untitled.png';
import backgroundVideo from '../imports/background vid.mp4';
import heroCenterImg from '../imports/bob_fly.png';
import { motion, useScroll, useMotionValueEvent, useInView, animate } from 'motion/react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Copy } from 'lucide-react';

const STATS = [
  { target: 1000, suffix: '+', label: 'Followers on X' },
  { target: 20, suffix: '+', label: 'Projects Worked With' },
  { target: 3, suffix: '+', label: 'Projects Shipped' },
  { target: 2, suffix: '+', label: 'Years of Experience' },
];

import oktoImg from '../imports/partners/okto.png';
import wizzImg from '../imports/partners/wizz.png';
import zargatesImg from '../imports/partners/zargates.png';
import vooxImg from '../imports/partners/voox.png';
import arcImg from '../imports/partners/arc.png';
import riverImg from '../imports/partners/river.png';
import zerionImg from '../imports/partners/Zerion.png';

const PARTNERS = [
  { name: 'Okto', image: oktoImg, color: '#facc15' },
  { name: 'Wizz HQ', image: wizzImg, color: '#facc15' },
  { name: 'Zargates', image: zargatesImg, color: '#facc15' },
  { name: 'Voox', image: vooxImg, color: '#facc15' },
  { name: 'Arc', image: arcImg, color: '#facc15' },
  { name: 'River', image: riverImg, color: '#facc15' },
  { name: 'Zerion', image: zerionImg, color: '#facc15' },
];

function StatCard({ target, suffix, label, delay = 0 }: { target: number; suffix: string; label: string; delay?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && numberRef.current) {
      const controls = animate(0, target, {
        duration: 2,
        ease: "easeOut",
        delay: delay,
        onUpdate(value) {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(value).toLocaleString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [target, suffix, isInView, delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMouse(prev => ({ ...prev, active: false }))}
      className="relative rounded-2xl p-px overflow-hidden cursor-default"
      style={{
        background: mouse.active
          ? `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, rgba(250,204,21,0.6), rgba(250,204,21,0.08) 50%, rgba(255,255,255,0.06) 100%)`
          : 'rgba(255,255,255,0.07)',
        transition: 'background 0.15s ease',
      }}
    >
      {/* Inner card */}
      <div className="relative rounded-2xl bg-[#030712] p-8 h-full flex flex-col justify-between gap-6">
        {/* Number */}
        <div
          ref={numberRef}
          className="text-[#facc15] font-black tracking-wide"
          style={{
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            lineHeight: 1,
            fontFamily: 'var(--font-bebas)'
          }}
        >
          0{suffix}
        </div>
        {/* Label */}
        <div>
          <p className="text-white/50 uppercase tracking-[0.25em] text-xs md:text-sm font-bold mb-4">{label}</p>
          {/* Accent line */}
          <div
            className="h-px w-10 rounded-full"
            style={{
              background: mouse.active
                ? 'linear-gradient(90deg, #facc15, #f59e0b)'
                : 'rgba(250,204,21,0.35)',
              transition: 'background 0.3s ease, width 0.3s ease',
              width: mouse.active ? '3rem' : '2.5rem',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [copied, setCopied] = useState('');
  const { scrollY } = useScroll();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const bubbles = useMemo(() => {
    const variants = ['bubble-a', 'bubble-b', 'bubble-c', 'bubble-d', 'bubble-e'];
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 22) + 4,
      left: Math.random() * 97,
      duration: (Math.random() * 4.5 + 2.5).toFixed(2),
      delay: (Math.random() * 12).toFixed(2),
      animation: variants[Math.floor(Math.random() * variants.length)],
    }));
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide nav after scrolling past 80% of the first page
    if (latest > window.innerHeight * 0.8) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Stack */}
      <div className="w-full">
        {/* 1. Video Section */}
        <div className="relative h-screen w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {/* Top fade for the video */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/40 to-transparent z-10" />

          {/* Mini Island Navigation */}
          <motion.div
            variants={{
              initial: { y: -100, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { delay: 1, duration: 0.8, ease: "circOut" }
              },
              hidden: {
                y: -100,
                opacity: 0,
                transition: { duration: 0.5, ease: "easeInOut" }
              }
            }}
            initial="initial"
            animate={isNavVisible ? "visible" : "hidden"}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          >
            <div className="px-8 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-8 shadow-2xl">
              {['Home', 'About', 'Services', 'Contact', 'Partners'].map((item, i) => {
                const href = item === 'Home' ? '#' : `#${item.toLowerCase()}`;
                return (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={href}
                      onClick={(e) => {
                        if (item === 'Home') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`text-sm font-bold tracking-widest uppercase transition-colors ${i === 0 ? 'text-[#facc15]' : 'text-white/50 hover:text-white'
                        }`}
                    >
                      {item}
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Centered Content (Image, Text, and Buttons) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-40 px-4">
            {/* Split Text and Image */}
            <div className="flex items-center justify-center w-full max-w-screen-2xl gap-8 md:gap-20 pointer-events-none">
              {/* Left Text */}
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="flex-1 text-right text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl z-0"
              >
                change the world<br />a <span className="text-[#facc15]">pixel</span>
              </motion.h1>

              {/* Bob Image in the middle */}
              <div className="relative flex-[0.4] flex justify-center items-center z-20">
                <motion.img
                  src={heroCenterImg}
                  alt="Hero Center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.05, 1],
                    opacity: 1,
                    filter: [
                      "drop-shadow(0 0 15px rgba(255, 191, 0, 0.3)) drop-shadow(0 0 30px rgba(255, 140, 0, 0.2))",
                      "drop-shadow(0 0 35px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 60px rgba(255, 165, 0, 0.4))",
                      "drop-shadow(0 0 15px rgba(255, 191, 0, 0.3)) drop-shadow(0 0 30px rgba(255, 140, 0, 0.2))"
                    ]
                  }}
                  transition={{
                    scale: { duration: 1, ease: "backOut" },
                    opacity: { duration: 0.8 },
                    filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-[280%] h-auto object-contain max-w-none"
                />
              </div>

              {/* Right Text */}
              <motion.h1
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="flex-1 text-left text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl z-0"
              >
                at a time<br />with <span className="text-[#facc15]">Bob</span>
                <div className="text-sm md:text-base lg:text-lg font-bold uppercase tracking-[0.3em] mt-4 text-white">
                  AI Cinematographer & Technical Writer
                </div>
              </motion.h1>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "circOut" }}
              className="flex justify-center -mt-4 pointer-events-auto z-50"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="px-8 py-3 bg-[#facc15] text-black font-black uppercase tracking-widest text-sm md:text-base rounded-full shadow-[0_0_30px_rgba(250,204,21,0.5),0_4px_20px_rgba(250,204,21,0.3),0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(250,204,21,0.7),0_6px_25px_rgba(250,204,21,0.4),0_12px_50px_rgba(0,0,0,0.5)] transition-all inline-block"
                >
                  Check out my PoW
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom fade — blends into the starry About section */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10" />
        </div>

        {/* 2. Seamless Transition Gradient (Starry Night Theme) - ABOUT SECTION */}
        <div id="about" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-32 px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000514] to-[#000514]" />
          <div className="star-field">
            <div className="stars-1" />
            <div className="stars-2" />
          </div>

          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* BOB Quote */}
              <h2 className="text-white font-cursive text-xl md:text-2xl lg:text-3xl mb-8 leading-relaxed opacity-90 max-w-3xl mx-auto flex items-center justify-center gap-2">
                <span className="text-[#facc15] font-serif text-4xl leading-none">"</span>
                what are we but quills guided by the hands of the Almighty upon the parchment of Destiny?
                <span className="text-[#facc15] font-serif text-4xl leading-none">"</span>
              </h2>
              <p className="text-xs md:text-sm mb-12 font-bold tracking-[0.4em] uppercase text-[#facc15]">— BOB</p>

              {/* Subheading */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px w-8 bg-[#facc15]/30" />
                <h3 className="text-[#facc15] font-black uppercase tracking-[0.4em] text-sm md:text-base lg:text-lg">
                  Three Crafts, One Destiny.
                </h3>
                <div className="h-px w-8 bg-[#facc15]/30" />
              </div>

              {/* Main Professional Write-up */}
              <div className="space-y-6 max-w-3xl mx-auto">
                <p className="text-white/80 font-medium text-base md:text-lg lg:text-xl leading-[1.7] tracking-tight">
                  I live at the crossroads where storytelling meets engineering. As a Technical Writer, AI Video Creator, and Vibecoder, I specialise in DeFi, NFTs, L2 infrastructure, and everything onchain with a proven track record of turning smart contract complexity into whitepapers, documentation, and visuals that actually land.
                </p>
                <p className="text-white/80 font-medium text-base md:text-lg lg:text-xl leading-[1.7] tracking-tight">
                  Whether I'm directing AI generated narratives, distilling protocol mechanics into crisp technical guides, or shipping onchain tools by vibe alone. The work always starts with one question: <span className="text-[#facc15]">does this feel true?</span>
                </p>
                <p className="text-white/80 font-medium text-base md:text-lg lg:text-xl leading-[1.7] tracking-tight">
                  I don't just make things that work. <span className="text-[#facc15]">I make things that resonate.</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom fade — transitions into Services image */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10" />
        </div>

        {/* 3. Image Section - SERVICES SECTION */}
        <div id="services" className="relative w-full min-h-screen">
          {/* Top Smoothing Gradient — fades from black into the image */}
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black via-black/50 to-transparent z-10" />

          <ImageWithFallback
            src={backgroundImage}
            alt="Professional Services Background"
            className="w-full h-auto min-h-screen object-cover"
          />

          {/* Subtle overlay — light enough to see the background */}
          <div className="absolute inset-0 bg-black/25 z-20" />

          {/* Services Content Overlay */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 py-24">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-[#facc15] font-bold uppercase tracking-[0.4em] text-sm mb-4">What I Do</p>
              <h2 className="text-white font-black uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9]">
                Professional<br /><span className="text-[#facc15]">Services</span>
              </h2>
              <div className="h-px w-24 bg-[#facc15]/40 mx-auto mt-8" />
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">

              {/* Card 1: AI Video Cinematographer */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col gap-5 shadow-2xl hover:border-[#facc15]/30 hover:bg-white/8 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#facc15]/10 border border-[#facc15]/30 flex items-center justify-center text-[#facc15] text-lg">
                  ✦
                </div>
                <h3 className="text-white font-black uppercase tracking-tight text-xl md:text-2xl leading-tight">
                  AI Video<br />Cinematographer
                </h3>
                <div className="h-px w-8 bg-[#facc15]/40" />
                <p className="text-white/70 font-medium text-sm md:text-base leading-[1.8]">
                  I craft cinematic AI generated video ads that command attention, tell brand stories with precision, and push products into global markets. Turning raw concepts into visual experiences that convert, resonate, and travel far beyond borders.
                </p>
              </motion.div>

              {/* Card 2: Technical Writer */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl border border-[#facc15]/20 bg-[#facc15]/5 backdrop-blur-xl p-8 flex flex-col gap-5 shadow-2xl hover:border-[#facc15]/50 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#facc15]/20 border border-[#facc15]/40 flex items-center justify-center text-[#facc15] text-lg">
                  ✦
                </div>
                <h3 className="text-white font-black uppercase tracking-tight text-xl md:text-2xl leading-tight">
                  Technical<br />Writer
                </h3>
                <div className="h-px w-8 bg-[#facc15]/60" />
                <p className="text-white/70 font-medium text-sm md:text-base leading-[1.8]">
                  I produce sharp, deeply researched technical breakdowns that strip the complexity out of DeFi protocols, smart contracts, and onchain infrastructure. Translating what intimidates most people into documentation, guides, and whitepapers that onboard, educate, and build trust at scale.
                </p>
              </motion.div>

              {/* Card 3: Builder */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col gap-5 shadow-2xl hover:border-[#facc15]/30 hover:bg-white/8 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#facc15]/10 border border-[#facc15]/30 flex items-center justify-center text-[#facc15] text-lg">
                  ✦
                </div>
                <h3 className="text-white font-black uppercase tracking-tight text-xl md:text-2xl leading-tight">
                  Builder
                </h3>
                <div className="h-px w-8 bg-[#facc15]/40" />
                <p className="text-white/70 font-medium text-sm md:text-base leading-[1.8]">
                  I leverage cutting edge AI IDEs and modern development workflows to design, prototype, and ship decentralized applications and Web3 infrastructure. Building onchain tools that are fast, functional, and engineered to solve real problems in the ecosystem.
                </p>
              </motion.div>

            </div>
          </div>

          {/* Bottom Gradient — fades into deep sea blue for Numbers section */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#000a1a] via-[#000a1a]/70 to-transparent z-20" />
        </div>
      </div>

      {/* 4. Numbers Section */}
      <section id="contact" className="relative w-full min-h-screen overflow-hidden">

        {/* Background: deep sea → hero_bg */}
        <div className="absolute inset-0 z-0">
          {/* Deep ocean blue base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#000a1a] via-[#001230] to-[#000820]" />
          {/* hero_bg fades in at the very bottom of the section */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroBgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 85%',
              maskImage: 'linear-gradient(to top, black 0%, black 10%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, black 10%, transparent 95%)',
            }}
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Top fade — continues the deep blue from Services */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#000a1a] to-transparent z-10" />

        {/* Bubbles */}
        <div className="bubbles z-10">
          {bubbles.map((b) => (
            <div
              key={b.id}
              className="bubble"
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
                left: `${b.left}%`,
                animationName: b.animation,
                animationDuration: `${b.duration}s`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-16 min-h-screen">

          {/* Left: 2x2 Stat Grid */}
          <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-2"
            >
              <p className="text-[#facc15] font-bold uppercase tracking-[0.4em] text-sm mb-3">By the Numbers</p>
              <h2 className="text-white font-black uppercase tracking-tighter text-4xl md:text-5xl lg:text-6xl leading-[0.9]">
                The <span className="text-[#facc15]">Work</span><br />Speaks.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} target={stat.target} suffix={stat.suffix} label={stat.label} delay={i * 0.12} />
              ))}
            </div>
          </div>

          {/* Right: Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex-1 w-full max-w-lg flex items-center justify-center"
          >
            <img
              src={statsImage}
              alt="Stats visual"
              className="w-full h-auto object-contain rounded-2xl"
              style={{ filter: 'drop-shadow(0 0 40px rgba(250,204,21,0.08))' }}
            />
          </motion.div>

        </div>

        {/* Bottom fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050507] to-transparent z-10" />
      </section>

      {/* 5. Partners & Ecosystem Section */}
      <section id="partners" className="relative w-full py-32 bg-[#050507] overflow-hidden flex flex-col items-center z-20">

        <div className="relative z-10 max-w-5xl w-full mx-auto px-6 flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="font-mono text-[#facc15] font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Partners & Ecosystem
            </p>
            <h2 className="font-serif text-[#f0ede8] text-5xl md:text-6xl mb-6">
              Built with the <span className="text-[#facc15]">best</span>
            </h2>
            <p className="text-[#7a7880] text-lg max-w-2xl mx-auto">
              Collaborating across the Web3 stack to build scalable, resilient, and beautiful onchain experiences.
            </p>
          </motion.div>

          <div 
            className="relative w-full max-w-screen-2xl mx-auto overflow-hidden mt-8"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <div className="animate-marquee gap-4 pr-4">
              {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div key={`${partner.name}-${i}`} className="w-[240px] flex-shrink-0">
                  <button
                    className="partner-btn btn-scanlines group w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(12px)',
                      boxShadow: 'none',
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget;
                      target.style.backgroundColor = 'rgba(250,204,21,0.04)';
                      target.style.border = '1px solid rgba(250,204,21,0.35)';
                      target.style.transform = 'translateY(-3px)';
                      target.style.boxShadow = '0 10px 30px -10px rgba(250,204,21,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget;
                      target.style.backgroundColor = 'rgba(255,255,255,0.03)';
                      target.style.border = '1px solid rgba(255,255,255,0.07)';
                      target.style.transform = 'translateY(0)';
                      target.style.boxShadow = 'none';
                    }}
                  >
                    <span className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                      <img src={partner.image} alt={partner.name} className="max-w-full max-h-full object-contain" />
                    </span>
                    <span 
                      className="font-mono text-base text-[#f0ede8] uppercase tracking-wider font-black glitch-text"
                      data-name={partner.name}
                    >
                      {partner.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <section className="relative w-full bg-[#050507] overflow-hidden flex flex-col items-center py-32 z-20">
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#facc15]/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[rgba(200,160,255,0.04)] rounded-full blur-[150px] pointer-events-none" />
        <div className="contact-grid" />
        
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-8 h-[2px] bg-[#facc15]" />
              <p className="font-mono text-[#facc15] font-bold uppercase tracking-[0.2em] text-xs">Contact</p>
            </div>
            
            <h2 className="font-serif text-[#f0ede8] leading-[1.1] mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Let's make<br />
              <span className="italic text-[#facc15]">something real.</span>
            </h2>
            
            <p className="text-[#7a7880] text-lg font-light max-w-lg mx-auto" style={{ fontFamily: 'var(--font-outfit)' }}>
              Open to collaborations, briefs, and conversations that might go somewhere unexpected.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full flex flex-col gap-6 mb-20"
          >
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[#7a7880] uppercase text-[0.68rem] tracking-[0.12em]">Name</label>
              <input type="text" className="contact-input" placeholder="Enter your name" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[#7a7880] uppercase text-[0.68rem] tracking-[0.12em]">Email</label>
              <input type="email" className="contact-input" placeholder="hello@example.com" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[#7a7880] uppercase text-[0.68rem] tracking-[0.12em]">Message</label>
              <textarea rows={5} className="contact-input resize-none" placeholder="Tell me about your project..." />
            </div>
            
            <button
              type="button"
              className="partner-btn mt-4 w-full bg-[#facc15] text-[#050507] font-mono font-bold uppercase tracking-[0.12em] py-[1.1rem] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_-10px_rgba(250,204,21,0.4)]"
            >
              Send Message
            </button>
          </motion.form>

          {/* Social Links */}
          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16 scroll-mt-32"
          >
            {[
              { label: 'Email', href: 'mailto:necokizz@gmail.com' },
              { label: 'X', href: 'https://x.com/0xnecokizz' },
              { label: 'GitHub', href: 'https://github.com/NECOKIZZ' },
              { label: 'Telegram', href: 'https://t.me/web3fran' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 text-sm font-bold tracking-widest uppercase text-white/80 hover:text-[#facc15] hover:border-[#facc15]/30 transition-colors"
              >
                {social.label}
              </a>
            ))}
            <span className="inline-flex items-center bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 text-sm font-bold tracking-widest uppercase text-[#7a7880]">
              Discord: kizzneco
            </span>
          </motion.div>

          {/* Onchain Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-mono text-[#facc15] text-[0.65rem] uppercase tracking-[0.2em]">Onchain Identity</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {['necokizz.base.eth', 'necokizz.sui'].map((identity) => (
                <div
                  key={identity}
                  className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-4 py-2 hover:border-[#facc15]/30 transition-colors"
                >
                  <span className="font-mono text-xs text-white/80">{identity}</span>
                  <button
                    onClick={() => handleCopy(identity)}
                    className="text-white/40 hover:text-[#facc15] transition-colors"
                  >
                    {copied === identity ? (
                      <span className="text-[0.6rem] text-green-400 font-mono">Copied!</span>
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-full px-4 py-2 hover:border-[#facc15]/30 transition-colors">
                <span className="font-mono text-xs text-white/80">0x858f3232E7d6702F20c4D3FEAB987A405D225f4E</span>
                <button
                  onClick={() => handleCopy('0x858f3232E7d6702F20c4D3FEAB987A405D225f4E')}
                  className="text-white/40 hover:text-[#facc15] transition-colors"
                >
                  {copied === '0x858f3232E7d6702F20c4D3FEAB987A405D225f4E' ? (
                    <span className="text-[0.6rem] text-green-400 font-mono">Copied!</span>
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

    </div>
  );
}