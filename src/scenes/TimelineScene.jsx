import React, { useState, useEffect, useRef } from 'react';
import { RoadScene, TimerCircle, RoadSign } from '../components/SceneElements';
import { RESUME } from '../data/resume';

const STOPS = [
  {
    type: 'education',
    year: '2021',
    icon: '🎓',
    color: '#4D79FF',
    title: 'B.Tech — MIT Manipal',
    subtitle: 'Computer & Communication Engineering',
    period: '2021 – 2025',
    location: 'Manipal, India',
    details: [
      'Bachelor of Technology in Computer & Communication Engineering',
      'Focused on data systems, software development, and AI/ML fundamentals',
      'Built foundational skills in Python, SQL, web development, and system design',
      'Graduated 2025 — ready to take on enterprise-scale challenges',
    ],
    metrics: null,
  },
  ...RESUME.experience.slice().reverse().map(exp => ({
    type: 'experience',
    year: exp.period.split(' ')[0] + (exp.period.includes('2024') ? ' 2024' : exp.period.includes('2025') ? ' 2025' : ''),
    icon: exp.icon,
    color: exp.color,
    title: exp.title,
    subtitle: `${exp.company} · ${exp.location}`,
    period: exp.period,
    details: exp.bullets,
    metrics: exp.metrics,
    current: exp.current,
  })),
];

export default function TimelineScene({ onNext }) {
  const [activeStop, setActiveStop] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [bikePos, setBikePos] = useState(0);
  const [detailVisible, setDetailVisible] = useState(true);

  const goTo = (idx) => {
    if (animating || idx === activeStop) return;
    setAnimating(true);
    setDetailVisible(false);
    setBikePos(idx / (STOPS.length - 1));
    setTimeout(() => {
      setActiveStop(idx);
      setDetailVisible(true);
      setAnimating(false);
    }, 700);
  };

  const stop = STOPS[activeStop];

  // Auto-advance at last stop
  const [showAdvance, setShowAdvance] = useState(false);
  useEffect(() => {
    if (activeStop === STOPS.length - 1) {
      setTimeout(() => setShowAdvance(true), 800);
    } else {
      setShowAdvance(false);
    }
  }, [activeStop]);

  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', background:'#050a05' }}>
      <RoadScene phase="timeline" bikeProgress={0.1 + bikePos * 0.8} showExhaust={animating}/>

      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,.15) 35%, rgba(0,0,0,.75) 100%)',
        pointerEvents:'none',
      }}/>

      {/* ── TOP: Section label ── */}
      <div style={{
        position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)',
        animation:'fadeInDown .6s ease both', zIndex:10,
      }}>
        <div style={{
          fontFamily:"'Chakra Petch',monospace", fontSize:'.7rem',
          color:'#56ab2f', letterSpacing:'.15em', textTransform:'uppercase',
          background:'rgba(0,0,0,.5)', border:'1px solid rgba(86,171,47,.25)',
          borderRadius:'50px', padding:'.3rem 1.2rem', backdropFilter:'blur(8px)',
        }}>
          ⏱ Time Travel — The Journey of Suyash
        </div>
      </div>

      {/* ── TIMELINE RAIL (top strip) ── */}
      <div style={{
        position:'absolute', top:'60px', left:'4%', right:'4%', zIndex:10,
        animation:'fadeInDown .6s .2s ease both',
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:0,
          background:'rgba(0,0,0,.5)', borderRadius:'50px',
          border:'1px solid rgba(86,171,47,.15)',
          padding:'.4rem .6rem',
          backdropFilter:'blur(8px)',
        }}>
          {STOPS.map((s, i) => (
            <React.Fragment key={i}>
              {/* Connector line */}
              {i > 0 && (
                <div style={{
                  flex:1, height:'2px',
                  background: i <= activeStop
                    ? 'linear-gradient(90deg,rgba(86,171,47,.8),rgba(168,224,99,.6))'
                    : 'rgba(255,255,255,.1)',
                  transition:'background .5s',
                }}/>
              )}
              {/* Stop dot */}
              <button onClick={() => goTo(i)} style={{
                width: i === activeStop ? '36px' : '28px',
                height: i === activeStop ? '36px' : '28px',
                borderRadius:'50%',
                background: i <= activeStop ? s.color : 'rgba(255,255,255,.08)',
                border: i === activeStop ? `2px solid ${s.color}` : '1px solid rgba(255,255,255,.15)',
                cursor:'pointer',
                transition:'all .3s',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: i === activeStop ? '1rem' : '.8rem',
                flexShrink:0,
                boxShadow: i === activeStop ? `0 0 16px ${s.color}66` : 'none',
              }}>{s.icon}</button>
            </React.Fragment>
          ))}
        </div>

        {/* Labels */}
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'.3rem', padding:'0 14px' }}>
          {STOPS.map((s, i) => (
            <div key={i} style={{
              fontSize:'.6rem', color: i === activeStop ? s.color : '#3a5f3a',
              fontFamily:"'Chakra Petch',monospace",
              textAlign:'center', flex:1,
              transition:'color .3s',
              maxWidth:'80px',
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            }}>
              {s.period?.split(' – ')[0] || '2021'}
            </div>
          ))}
        </div>
      </div>

      {/* ── CENTER/MAIN CONTENT ── */}
      <div style={{
        position:'absolute', inset:0, display:'flex',
        alignItems:'center', justifyContent:'center',
        padding:'130px 3vw 100px',
        gap:'1.5rem',
      }}>
        {/* ── PREV BUTTON ── */}
        <button onClick={() => goTo(Math.max(0, activeStop-1))}
          disabled={activeStop === 0}
          style={{
            width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
            background: activeStop===0 ? 'rgba(255,255,255,.04)' : 'rgba(86,171,47,.15)',
            border: activeStop===0 ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(86,171,47,.4)',
            color: activeStop===0 ? '#333' : '#a8e063',
            fontSize:'1.1rem', cursor: activeStop===0 ? 'default' : 'pointer',
            transition:'all .2s',
          }}>◀</button>

        {/* ── DETAIL CARD ── */}
        <div key={activeStop} style={{
          flex:1, maxWidth:'700px',
          animation: detailVisible ? 'fadeInUp .6s ease both' : 'none',
          opacity: detailVisible ? 1 : 0,
          transition:'opacity .3s',
        }}>
          <div className="glass-strong" style={{ padding:'1.75rem 2rem' }}>
            {/* Header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.2rem', flexWrap:'wrap', gap:'.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.9rem' }}>
                <div style={{
                  width:'54px', height:'54px', borderRadius:'14px', flexShrink:0,
                  background:`${stop.color}22`,
                  border:`1px solid ${stop.color}44`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.6rem',
                  animation:'popIn .5s cubic-bezier(.34,1.56,.64,1) both',
                }}>{stop.icon}</div>
                <div>
                  <div style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize:'clamp(1rem,2vw,1.4rem)',
                    fontWeight:900, color:'#e8f5e9', lineHeight:1.2,
                  }}>{stop.title}</div>
                  <div style={{ fontSize:'.78rem', color:'#888', marginTop:'.2rem' }}>{stop.subtitle}</div>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.3rem' }}>
                <span style={{
                  background:`${stop.color}20`,
                  border:`1px solid ${stop.color}40`,
                  color: stop.color,
                  borderRadius:'50px', padding:'.25rem .9rem',
                  fontSize:'.72rem', fontWeight:700,
                  fontFamily:"'Chakra Petch',monospace",
                }}>{stop.period}</span>
                {stop.current && (
                  <span style={{
                    background:'rgba(86,171,47,.15)',
                    border:'1px solid rgba(86,171,47,.3)',
                    color:'#a8e063', borderRadius:'50px',
                    padding:'.18rem .75rem', fontSize:'.65rem',
                    display:'flex', alignItems:'center', gap:'.3rem',
                  }}>
                    <span style={{ width:'6px',height:'6px',borderRadius:'50%',background:'#56ab2f', animation:'pulse 2s infinite', display:'inline-block' }}/>
                    Currently Here
                  </span>
                )}
              </div>
            </div>

            {/* Metrics */}
            {stop.metrics && stop.metrics.length > 0 && (
              <div style={{
                display:'flex', flexWrap:'wrap', gap:'.5rem', marginBottom:'1rem',
              }}>
                {stop.metrics.map(m => (
                  <div key={m.label} style={{
                    background:'rgba(86,171,47,.08)',
                    border:'1px solid rgba(86,171,47,.2)',
                    borderRadius:'10px', padding:'.4rem .9rem',
                    display:'flex', flexDirection:'column', alignItems:'center',
                    animation:'scaleIn .4s cubic-bezier(.34,1.56,.64,1) both',
                  }}>
                    <span style={{
                      fontFamily:"'Chakra Petch',monospace",
                      fontSize:'1.1rem', fontWeight:700, color:'#a8e063',
                    }}>{m.val}</span>
                    <span style={{ fontSize:'.62rem', color:'#6b9f6b', textTransform:'uppercase', letterSpacing:'.05em' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bullet points */}
            <div className="scroll-panel" style={{ maxHeight:'200px' }}>
              {stop.details.map((d, i) => (
                <div key={i} style={{
                  display:'flex', gap:'.7rem', alignItems:'flex-start',
                  marginBottom:'.55rem',
                  animation:`fadeInLeft .5s ${i*.08}s ease both`,
                }}>
                  <span style={{
                    color: stop.color, fontSize:'.75rem', marginTop:'.15rem', flexShrink:0,
                  }}>▸</span>
                  <span style={{ fontSize:'.82rem', color:'#b2dfdb', lineHeight:1.6 }}>{d}</span>
                </div>
              ))}
            </div>

            {/* Road sign for current stop */}
            <div style={{ marginTop:'1rem', display:'flex', justifyContent:'center' }}>
              <RoadSign
                text={`Stop ${activeStop + 1} / ${STOPS.length}`}
                subtext={activeStop < STOPS.length-1 ? `Next: ${STOPS[activeStop+1]?.title?.split('|')[0]?.trim()}` : 'Last Stop!'}
              />
            </div>
          </div>
        </div>

        {/* ── NEXT BUTTON ── */}
        <button onClick={() => activeStop < STOPS.length-1 ? goTo(activeStop+1) : onNext()}
          style={{
            width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
            background:'rgba(86,171,47,.18)',
            border:'2px solid rgba(86,171,47,.5)',
            color:'#a8e063', fontSize:'1.1rem', cursor:'pointer',
            transition:'all .2s',
            animation:'glowPulse 2s ease-in-out infinite',
          }}>▶</button>
      </div>

      {/* ── ADVANCE controls ── */}
      <div style={{
        position:'absolute', bottom:'12px', left:'50%', transform:'translateX(-50%)',
        display:'flex', alignItems:'center', gap:'1.5rem',
        animation: showAdvance ? 'fadeInUp .6s ease both' : 'none',
        opacity: showAdvance ? 1 : 0,
        transition:'opacity .4s',
      }}>
        <TimerCircle seconds={30} onComplete={onNext} label="Auto-advancing"/>
        <button className="btn-primary" onClick={onNext}
          style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
          Next Stop: Skills ▶
        </button>
      </div>

      {/* Back/forward keyboard hint */}
      <div style={{
        position:'absolute', bottom:'14px', right:'2rem',
        fontSize:'.62rem', color:'#2a4f2a',
        fontFamily:"'Chakra Petch',monospace",
      }}>← → to ride through stops</div>
    </div>
  );
}
