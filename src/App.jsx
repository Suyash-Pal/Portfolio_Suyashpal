import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

import IntroScene         from './scenes/IntroScene';
import ProfileScene       from './scenes/ProfileScene';
import TimelineScene      from './scenes/TimelineScene';
import SkillsProjectsScene from './scenes/SkillsProjectsScene';
import CertContactScene   from './scenes/CertContactScene';

const SCENES = ['intro','profile','timeline','skills','contact'];

function SceneTransition({ children, sceneKey }) {
  return (
    <div key={sceneKey} style={{
      position:'fixed', inset:0, zIndex:10,
      animation:'fadeIn .5s ease both',
    }}>
      {children}
    </div>
  );
}

/* ── TRANSITION FLASH ── */
function TransitionFlash({ active, onDone }) {
  useEffect(() => {
    if (active) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [active, onDone]);
  if (!active) return null;
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:999, pointerEvents:'none',
      background:'linear-gradient(135deg, #0a1f0a, #56ab2f22, #0a1f0a)',
      animation:'fadeIn .3s ease both, fadeIn .3s .3s ease reverse both',
    }}/>
  );
}

/* ── SCENE INDICATOR ── */
function SceneIndicator({ current, total, labels }) {
  if (current === 0) return null;
  return (
    <div style={{
      position:'fixed', top:'50%', right:'18px', transform:'translateY(-50%)',
      zIndex:50, display:'flex', flexDirection:'column', gap:'8px',
      animation:'fadeInRight .6s ease both',
    }}>
      {labels.slice(1).map((label, i) => {
        const idx = i + 1;
        const isActive = idx === current;
        return (
          <div key={idx} style={{
            width: isActive ? '10px' : '7px',
            height: isActive ? '10px' : '7px',
            borderRadius:'50%',
            background: isActive
              ? 'var(--green2)'
              : idx < current ? 'rgba(86,171,47,.4)' : 'rgba(255,255,255,.15)',
            transition:'all .3s',
            position:'relative',
          }}>
            {isActive && (
              <div style={{
                position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)',
                background:'rgba(0,0,0,.7)', border:'1px solid rgba(86,171,47,.3)',
                borderRadius:'6px', padding:'.2rem .6rem',
                fontFamily:"'Chakra Petch',monospace", fontSize:'.6rem', color:'#56ab2f',
                whiteSpace:'nowrap', backdropFilter:'blur(8px)',
              }}>{label}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── NAV MINI BAR (shown after intro) ── */
function NavBar({ current, onNavigate }) {
  if (current === 0) return null;
  const labels = ['', 'Profile', 'Journey', 'Skills & Projects', 'Certs & Contact'];
  return (
    <div style={{
      position:'fixed', top:'8px', left:'50%', transform:'translateX(-50%)',
      zIndex:200, display:'flex', alignItems:'center', gap:'.4rem',
      background:'rgba(0,0,0,.7)', border:'1px solid rgba(86,171,47,.15)',
      borderRadius:'50px', padding:'.35rem .6rem',
      backdropFilter:'blur(12px)',
      animation:'fadeInDown .5s ease both',
    }}>
      {/* Logo */}
      <div style={{
        fontFamily:"'Playfair Display',serif",
        fontWeight:900, fontSize:'1rem',
        background:'linear-gradient(90deg,#56ab2f,#a8e063)',
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        marginRight:'.3rem',
      }}>SP</div>

      {labels.slice(1).map((label, i) => {
        const idx = i + 1;
        return (
          <button key={idx} onClick={() => onNavigate(idx)} style={{
            background: current === idx ? 'rgba(86,171,47,.22)' : 'transparent',
            border: current === idx ? '1px solid rgba(86,171,47,.45)' : '1px solid transparent',
            borderRadius:'50px', padding:'.28rem .85rem',
            color: current === idx ? '#a8e063' : '#5a8a5a',
            fontSize:'.68rem', cursor:'pointer',
            fontFamily:"'Chakra Petch',monospace", fontWeight: current===idx ? 700 : 400,
            transition:'all .2s', textTransform:'uppercase', letterSpacing:'.04em',
          }}>{label}</button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [scene, setScene] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((idx) => {
    if (transitioning || idx === scene) return;
    setTransitioning(true);
    setTimeout(() => {
      setScene(idx);
      setTransitioning(false);
    }, 300);
  }, [scene, transitioning]);

  const next = useCallback(() => goTo(Math.min(scene + 1, SCENES.length - 1)), [scene, goTo]);

  // Keyboard & scroll navigation (for non-timeline scenes)
  useEffect(() => {
    const onKey = (e) => {
      if (scene === 0) return; // handled by intro
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(Math.max(scene-1,1));
    };
    let lastWheel = 0;
    const onWheel = (e) => {
      if (scene === 0 || scene === 2) return; // timeline handles its own scroll
      const now = Date.now();
      if (now - lastWheel < 1000) return;
      lastWheel = now;
      if (e.deltaY > 40) next();
      if (e.deltaY < -40) goTo(Math.max(scene-1,1));
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive:true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [scene, next, goTo]);

  const LABELS = ['Intro','Profile','Journey','Skills','Certs & Contact'];

  return (
    <>
      {transitioning && <TransitionFlash active={transitioning} onDone={()=>{}}/>}
      <NavBar current={scene} onNavigate={goTo}/>
      <SceneIndicator current={scene} total={SCENES.length} labels={LABELS}/>

      <SceneTransition sceneKey={scene}>
        {scene === 0 && <IntroScene onComplete={() => goTo(1)}/>}
        {scene === 1 && <ProfileScene onNext={() => goTo(2)}/>}
        {scene === 2 && <TimelineScene onNext={() => goTo(3)}/>}
        {scene === 3 && <SkillsProjectsScene onNext={() => goTo(4)}/>}
        {scene === 4 && <CertContactScene onRestart={() => goTo(0)}/>}
      </SceneTransition>
    </>
  );
}
