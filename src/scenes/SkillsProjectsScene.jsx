import React, { useState, useEffect } from 'react';
import { RoadScene, TimerCircle } from '../components/SceneElements';
import { RESUME } from '../data/resume';

function SkillOrb({ skill, color, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        background: hovered ? `${color}22` : 'rgba(255,255,255,.04)',
        border: `1px solid ${hovered ? color : 'rgba(255,255,255,.1)'}`,
        borderRadius:'8px', padding:'.25rem .65rem',
        fontSize:'.72rem', color: hovered ? color : '#b2dfdb',
        cursor:'default', transition:'all .2s',
        transform: hovered ? 'translateY(-3px) scale(1.05)' : 'none',
        boxShadow: hovered ? `0 6px 20px ${color}33` : 'none',
        animation:`fadeInUp .5s ${delay}s ease both`,
      }}>
      {skill}
    </div>
  );
}

function SkillCard({ cat, delay }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background:'rgba(10,20,10,.7)',
        border:`1px solid ${cat.color}33`,
        borderRadius:'16px', padding:'1rem 1.1rem',
        cursor:'pointer', transition:'all .3s',
        borderLeft:`3px solid ${cat.color}`,
        animation:`cardFlip .6s ${delay}s ease both`,
        transform: expanded ? 'scale(1.02)' : 'scale(1)',
        boxShadow: expanded ? `0 8px 32px ${cat.color}22` : 'none',
      }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: expanded?'.7rem':0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
          <span style={{ fontSize:'1.2rem' }}>{cat.icon}</span>
          <span style={{
            fontFamily:"'Chakra Petch',monospace",
            fontSize:'.75rem', fontWeight:700, color: cat.color,
            textTransform:'uppercase', letterSpacing:'.06em',
          }}>{cat.category}</span>
        </div>
        <span style={{ fontSize:'.7rem', color:'#6b9f6b' }}>
          {expanded ? '▲' : '▼'} {cat.items.length} skills
        </span>
      </div>
      {expanded && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:'.35rem' }}>
          {cat.items.map((item, i) => (
            <SkillOrb key={item} skill={item} color={cat.color} delay={i*.04}/>
          ))}
        </div>
      )}
      {!expanded && (
        <div style={{ display:'flex', gap:'.25rem', flexWrap:'wrap' }}>
          {cat.items.slice(0,3).map(item=>(
            <span key={item} style={{ fontSize:'.65rem', color:'#5a8f5a', background:'rgba(255,255,255,.03)', borderRadius:'4px', padding:'.1rem .4rem' }}>{item}</span>
          ))}
          {cat.items.length>3 && <span style={{ fontSize:'.65rem', color:'#3a5f3a' }}>+{cat.items.length-3} more</span>}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ proj, delay }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div style={{
      perspective:'1000px',
      animation:`fadeInUp .6s ${delay}s ease both`,
      cursor:'pointer',
    }} onClick={()=>setFlipped(!flipped)}>
      <div style={{
        position:'relative', width:'100%', minHeight:'280px',
        transformStyle:'preserve-3d',
        transition:'transform .7s cubic-bezier(.4,0,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>
        {/* Front */}
        <div style={{
          position:'absolute', inset:0, backfaceVisibility:'hidden',
          background:`linear-gradient(135deg, rgba(10,20,10,.85), ${proj.color}12)`,
          border:`1px solid ${proj.color}33`,
          borderRadius:'20px', overflow:'hidden',
          display:'flex', flexDirection:'column',
        }}>
          {/* Visual header */}
          <div style={{
            height:'110px', background:`linear-gradient(135deg,${proj.color}18,${proj.color}08)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'4rem', position:'relative',
            borderBottom:`1px solid ${proj.color}22`,
          }}>
            <span style={{ animation:'float 3s ease-in-out infinite' }}>{proj.emoji}</span>
            {/* Floating particles */}
            {[0,1,2].map(i=>(
              <div key={i} style={{
                position:'absolute',
                left:`${20+i*30}%`, top:`${20+i*20}%`,
                width:'6px', height:'6px', borderRadius:'50%',
                background: proj.color, opacity:.3,
                animation:`float ${2+i*.5}s ease-in-out ${i*.4}s infinite`,
              }}/>
            ))}
          </div>
          <div style={{ padding:'1rem 1.1rem', flex:1 }}>
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'1rem', fontWeight:700, color:'#e8f5e9', marginBottom:'.2rem',
            }}>{proj.title}</div>
            <div style={{ fontSize:'.72rem', color: proj.color, fontWeight:600, marginBottom:'.7rem' }}>{proj.subtitle}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem' }}>
              {proj.tools.map(t=>(
                <span key={t} style={{
                  background:`${proj.color}15`, border:`1px solid ${proj.color}30`,
                  color: proj.color, borderRadius:'6px',
                  padding:'.18rem .55rem', fontSize:'.65rem', fontWeight:500,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop:'.75rem', fontSize:'.65rem', color:'#56ab2f', textAlign:'center' }}>
              Tap to flip for details ↺
            </div>
          </div>
        </div>
        {/* Back */}
        <div style={{
          position:'absolute', inset:0, backfaceVisibility:'hidden',
          transform:'rotateY(180deg)',
          background:'rgba(5,15,5,.9)',
          border:`1px solid ${proj.color}44`,
          borderRadius:'20px', padding:'1.2rem',
        }}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'.95rem', fontWeight:700, color:'#e8f5e9', marginBottom:'1rem',
            borderBottom:`1px solid ${proj.color}30`, paddingBottom:'.5rem',
          }}>{proj.emoji} {proj.title}</div>
          {proj.bullets.map((b,i)=>(
            <div key={i} style={{
              display:'flex', gap:'.5rem', marginBottom:'.6rem',
              animation:`fadeInLeft .4s ${i*.1}s ease both`,
            }}>
              <span style={{ color: proj.color, fontSize:'.7rem', marginTop:'.15rem', flexShrink:0 }}>▸</span>
              <span style={{ fontSize:'.78rem', color:'#b2dfdb', lineHeight:1.6 }}>{b}</span>
            </div>
          ))}
          <div style={{ marginTop:'1rem', fontSize:'.65rem', color:'#3a5f3a', textAlign:'center' }}>
            Tap to flip back ↺
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillsProjectsScene({ onNext }) {
  const [tab, setTab] = useState('skills');
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    if (tab === 'skills') {
      const t = setTimeout(() => setAllExpanded(true), 800);
      return () => clearTimeout(t);
    }
  }, [tab]);

  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', background:'#050a05' }}>
      <RoadScene phase="skills" bikeProgress={0.5} showExhaust={false}/>

      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,.2) 35%, rgba(0,0,0,.8) 100%)',
        pointerEvents:'none',
      }}/>

      {/* ── HEADER ── */}
      <div style={{
        position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)',
        zIndex:10, display:'flex', flexDirection:'column', alignItems:'center', gap:'.5rem',
        animation:'fadeInDown .6s ease both',
      }}>
        <div style={{
          fontFamily:"'Chakra Petch',monospace",
          fontSize:'.7rem', color:'#56ab2f', letterSpacing:'.15em',
          textTransform:'uppercase', background:'rgba(0,0,0,.5)',
          border:'1px solid rgba(86,171,47,.25)', borderRadius:'50px',
          padding:'.3rem 1.2rem', backdropFilter:'blur(8px)',
        }}>
          🛠 Workshop Peak — Skills & Projects
        </div>
        {/* Tab switch */}
        <div style={{
          display:'flex', background:'rgba(0,0,0,.6)',
          border:'1px solid rgba(86,171,47,.2)', borderRadius:'50px',
          padding:'.25rem', gap:'.25rem',
        }}>
          {['skills','projects'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{
              background: tab===t ? 'linear-gradient(135deg,#56ab2f,#a8e063)' : 'transparent',
              color: tab===t ? '#0a1f0a' : '#6b9f6b',
              border:'none', borderRadius:'50px',
              padding:'.3rem 1.2rem',
              fontFamily:"'Chakra Petch',monospace",
              fontSize:'.72rem', fontWeight: tab===t ? 700 : 400,
              cursor:'pointer', transition:'all .25s',
              textTransform:'uppercase', letterSpacing:'.06em',
            }}>{t===tab?'▸':''} {t}</button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{
        position:'absolute', left:'3vw', right:'3vw',
        top:'100px', bottom:'80px',
        overflowY:'auto',
      }} className="scroll-panel">

        {tab === 'skills' && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',
            gap:'1rem', paddingBottom:'1rem',
          }}>
            {RESUME.skills.map((cat, i) => (
              <SkillCard key={cat.category} cat={cat} delay={i*.1}/>
            ))}
          </div>
        )}

        {tab === 'projects' && (
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',
            gap:'1.5rem', paddingBottom:'1rem',
            maxWidth:'720px', margin:'0 auto',
          }}>
            {RESUME.projects.map((proj, i) => (
              <ProjectCard key={proj.title} proj={proj} delay={i*.15}/>
            ))}
          </div>
        )}
      </div>

      {/* ── ADVANCE ── */}
      <div style={{
        position:'absolute', bottom:'12px', left:'50%', transform:'translateX(-50%)',
        display:'flex', alignItems:'center', gap:'1.5rem',
        animation:'fadeInUp .6s .5s ease both',
      }}>
        <TimerCircle seconds={30} onComplete={onNext} label="Auto-advancing"/>
        <button className="btn-primary" onClick={onNext}>
          Final Stop: Certifications ▶
        </button>
      </div>
    </div>
  );
}
