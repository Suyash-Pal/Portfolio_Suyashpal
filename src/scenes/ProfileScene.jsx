import React, { useState, useEffect } from 'react';
import { RoadScene, TimerCircle, RoadSign } from '../components/SceneElements';
import { RESUME } from '../data/resume';

export default function ProfileScene({ onNext }) {
  const [entered, setEntered] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    setEntered(true);
    setTimeout(() => setCardVisible(true), 600);
  }, []);

  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', background:'#050a05' }}>
      {/* Road scene background */}
      <RoadScene phase="profile" bikeProgress={0.5} showExhaust={false}/>

      {/* Dark overlay so content is readable */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,.7) 100%)',
        pointerEvents:'none',
      }}/>

      {/* ── MAIN LAYOUT ── */}
      <div style={{
        position:'absolute', inset:0, display:'grid',
        gridTemplateColumns:'1fr auto 1fr',
        gridTemplateRows:'auto 1fr auto',
        padding:'80px 2rem 1.5rem',
        gap:'0 1.5rem',
        alignItems:'start',
      }}>

        {/* ── LEFT: PROFILE CARD ── */}
        <div style={{
          animation: cardVisible ? 'fadeInLeft .7s ease both' : 'none',
          gridColumn:1, gridRow:2,
        }}>
          <div className="glass-strong" style={{ padding:'2rem', maxWidth:'400px' }}>
            {/* Avatar + name */}
            <div style={{ display:'flex', gap:'1.2rem', alignItems:'center', marginBottom:'1.5rem' }}>
              <div style={{
                width:'72px', height:'72px', borderRadius:'50%', flexShrink:0,
                background:'linear-gradient(135deg, #56ab2f, #a8e063)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.8rem', fontWeight:900, color:'#0a1f0a',
                fontFamily:"'Playfair Display',serif",
                border:'3px solid rgba(86,171,47,.5)',
                boxShadow:'0 0 24px rgba(86,171,47,.3)',
              }}>SP</div>
              <div>
                <h1 style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:'clamp(1.3rem,2.5vw,1.9rem)',
                  fontWeight:900, color:'#e8f5e9', lineHeight:1.1,
                }}>Suyash Pal</h1>
                <div style={{
                  fontFamily:"'Chakra Petch',monospace",
                  fontSize:'.72rem', color:'#56ab2f',
                  letterSpacing:'.06em', marginTop:'.3rem',
                }}>
                  Data Analyst · BA · AI Engineer
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'.4rem', marginTop:'.3rem' }}>
                  <span style={{
                    width:'8px', height:'8px', borderRadius:'50%', background:'#56ab2f',
                    animation:'pulse 2s infinite', display:'inline-block',
                  }}/>
                  <span style={{ fontSize:'.7rem', color:'#6b9f6b' }}>Available for opportunities</span>
                </div>
              </div>
            </div>

            {/* Profile text */}
            <p style={{ fontSize:'.82rem', color:'#b2dfdb', lineHeight:1.7, marginBottom:'1.2rem' }}>
              {RESUME.profile}
            </p>

            {/* Info rows */}
            <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
              {[
                { icon:'📍', label:'Location', val: RESUME.location },
                { icon:'📧', label:'Email',    val: RESUME.email },
                { icon:'📞', label:'Phone',    val: RESUME.phone },
                { icon:'🎓', label:'Education',val: 'B.Tech — MIT Manipal (2021–25)' },
              ].map(r => (
                <div key={r.label} style={{
                  display:'flex', alignItems:'center', gap:'.7rem',
                  background:'rgba(0,0,0,.25)', borderRadius:'8px',
                  padding:'.4rem .75rem', border:'1px solid rgba(86,171,47,.1)',
                }}>
                  <span style={{ fontSize:'.9rem' }}>{r.icon}</span>
                  <span style={{ fontSize:'.7rem', color:'#6b9f6b', minWidth:'58px', fontFamily:"'Chakra Petch',monospace" }}>{r.label}</span>
                  <span style={{ fontSize:'.78rem', color:'#c8e6c9' }}>{r.val}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginTop:'1.2rem' }}>
              {[
                { icon:'💼', label:'LinkedIn', href: RESUME.linkedin },
                { icon:'🐙', label:'GitHub',   href: RESUME.github },
                { icon:'📊', label:'HackerRank', href: RESUME.hackerrank },
                { icon:'🌐', label:'Portfolio', href: RESUME.portfolio },
              ].map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                  display:'flex', alignItems:'center', gap:'.35rem',
                  background:'rgba(86,171,47,.08)',
                  border:'1px solid rgba(86,171,47,.2)',
                  borderRadius:'50px', padding:'.3rem .75rem',
                  color:'#a8e063', fontSize:'.72rem', textDecoration:'none',
                  transition:'all .2s', fontFamily:"'Chakra Petch',monospace",
                }}>
                  {l.icon} {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── CENTER: BIKER + ROAD SIGN ── */}
        <div style={{
          gridColumn:2, gridRow:'1 / 3',
          display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'flex-end', paddingBottom:'80px', zIndex:5,
        }}>
          {/* Road sign post */}
          <div style={{
            display:'flex', flexDirection:'column', alignItems:'center',
            animation: entered ? 'fadeInDown .6s .3s ease both' : 'none',
          }}>
            <RoadSign text="🛑 First Stop" subtext="Suyash's Profile"/>
            <div style={{ width:'2px', height:'32px', background:'#3a2e22' }}/>
          </div>
        </div>

        {/* ── RIGHT: RESUME DOWNLOAD ── */}
        <div style={{
          animation: cardVisible ? 'fadeInRight .7s .2s ease both' : 'none',
          gridColumn:3, gridRow:2,
          display:'flex', justifyContent:'flex-end',
        }}>
          <div className="glass-strong" style={{ padding:'2rem', maxWidth:'360px', width:'100%' }}>
            <div style={{
              fontFamily:"'Chakra Petch',monospace",
              fontSize:'.72rem', color:'#56ab2f', letterSpacing:'.1em',
              textTransform:'uppercase', marginBottom:'.75rem',
            }}>Quick Stats</div>

            {/* Metric grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.6rem', marginBottom:'1.5rem' }}>
              {[
                { val:'₹1.8Cr', label:'Saved / Month' },
                { val:'70%',    label:'Faster Reporting' },
                { val:'80%',    label:'Less Manual Effort' },
                { val:'15K+',   label:'Orders Automated' },
              ].map(m=>(
                <div key={m.label} className="metric-pill">
                  <span className="metric-val">{m.val}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Download resume */}
            <div style={{
              background:'linear-gradient(135deg,rgba(86,171,47,.08),rgba(168,224,99,.04))',
              border:'1px solid rgba(86,171,47,.25)',
              borderRadius:'16px', padding:'1.25rem', textAlign:'center',
              marginBottom:'1rem',
            }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'.5rem', animation:'float 3s ease-in-out infinite' }}>📄</div>
              <div style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:'1.05rem', fontWeight:700, color:'#e8f5e9', marginBottom:'.4rem',
              }}>Suyash's Resume</div>
              <div style={{ fontSize:'.75rem', color:'#6b9f6b', marginBottom:'.9rem' }}>
                Full CV with all details
              </div>
              <button className="btn-primary" style={{ width:'100%' }}
                onClick={() => window.open('/resume.pdf','_blank')}>
                ⬇ Download Resume
              </button>
            </div>

            {/* Tech stack badges */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.35rem' }}>
              {['Python','SQL','Power BI','Alteryx','UiPath','React','Flutter'].map(t=>(
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: ADVANCE CONTROLS ── */}
        <div style={{
          gridColumn:'1 / 4', gridRow:3,
          display:'flex', justifyContent:'center', alignItems:'center', gap:'2rem',
          padding:'1rem 0',
          animation: cardVisible ? 'fadeInUp .6s .8s ease both' : 'none',
        }}>
          <TimerCircle seconds={30} onComplete={onNext} label="Auto-advancing to Journey"/>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'.5rem' }}>
            <button className="btn-primary" onClick={onNext}
              style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.7rem 2rem' }}>
              Continue the Ride ▶
            </button>
            <span style={{ fontSize:'.68rem', color:'#3a5f3a', fontFamily:"'Chakra Petch',monospace" }}>
              or scroll / press →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
