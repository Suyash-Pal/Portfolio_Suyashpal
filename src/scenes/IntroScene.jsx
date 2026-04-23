import React, { useState, useEffect, useRef } from 'react';
import { IntroAvatar } from '../components/SceneElements';

export default function IntroScene({ onComplete }) {
  const [stage, setStage] = useState('peek'); // peek → greeting → rideoff
  const [showBubble, setShowBubble] = useState(false);
  const [bikeX, setBikeX] = useState(-200);
  const timerRef = useRef(null);

  useEffect(() => {
    // Stage 1: avatars peek in (0.3s)
    timerRef.current = setTimeout(() => setShowBubble(true), 800);

    // Stage 2: after 2.5s, ride off
    const rideTimer = setTimeout(() => {
      setStage('rideoff');
      let x = -200;
      const interval = setInterval(() => {
        x += 28;
        setBikeX(x);
        if (x > window.innerWidth + 300) {
          clearInterval(interval);
          onComplete();
        }
      }, 16);
    }, 3200);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(rideTimer);
    };
  }, [onComplete]);

  return (
    <div style={{
      position:'fixed', inset:0, overflow:'hidden',
      background:'linear-gradient(to bottom, #050a05 0%, #0d1a0d 50%, #1a3a15 80%, #2d5a22 100%)',
      zIndex:100
    }}>
      {/* Animated stars */}
      {Array.from({length:60},(_,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${Math.random()*100}%`,
          top:`${Math.random()*60}%`,
          width: i%5===0?'3px':'2px',
          height: i%5===0?'3px':'2px',
          borderRadius:'50%',
          background:'white',
          opacity: .3+Math.random()*.6,
          animation:`starTwinkle ${1.5+Math.random()*2}s ease-in-out ${Math.random()*2}s infinite`,
        }}/>
      ))}

      {/* Mountain silhouettes */}
      <svg viewBox="0 0 1400 300" preserveAspectRatio="xMidYMax slice"
        style={{position:'absolute',bottom:'30%',left:0,width:'100%',pointerEvents:'none',opacity:.8}}>
        <path d="M0,240 L120,130 L260,180 L400,100 L540,155 L680,80 L820,135 L960,75 L1100,130 L1240,85 L1400,110 L1400,300 L0,300Z"
          fill="#1a3a20"/>
        <path d="M0,260 L180,165 L360,200 L520,140 L700,180 L880,125 L1060,165 L1240,130 L1400,150 L1400,300 L0,300Z"
          fill="#2d5a27"/>
      </svg>

      {/* Road */}
      <div style={{
        position:'absolute', bottom:'8%', left:0, right:0, height:'16%',
        background:'linear-gradient(to bottom, #3a3028, #2a2018)',
        borderTop:'3px solid #6a5a3a',
      }}>
        {/* Road dashes */}
        {Array.from({length:10},(_,i)=>(
          <div key={i} style={{
            position:'absolute', top:'45%', left:`${i*12}%`,
            width:'8%', height:'5px', borderRadius:'3px',
            background:'rgba(240,230,140,.45)',
            animation:'roadDash 1.5s linear infinite',
          }}/>
        ))}
      </div>

      {/* Grass strip */}
      <div style={{
        position:'absolute', bottom:'8%', left:0, right:0, height:'5px',
        background:'linear-gradient(90deg, #2d5a27, #4a7c3f, #2d5a27)',
      }}/>

      {/* ── LEFT: AVATAR (peeks from left wall) ── */}
      <div style={{
        position:'absolute', bottom:'8%', left:0, width:'clamp(180px,20vw,280px)',
        animation: stage==='rideoff' ? 'peekLeft 1s ease-in-out forwards' : 'fadeInLeft .8s .3s ease both',
        zIndex:20,
      }}>
        <IntroAvatar side="left" waving={stage!=='rideoff'}/>
      </div>

      {/* ── RIGHT: MIRRORED AVATAR (peeks from right wall) ── */}
      <div style={{
        position:'absolute', bottom:'8%', right:0, width:'clamp(180px,20vw,280px)',
        animation: stage==='rideoff' ? 'peekRight 1s ease-in-out forwards' : 'fadeInRight .8s .3s ease both',
        zIndex:20,
      }}>
        <IntroAvatar side="right" waving={stage!=='rideoff'}/>
      </div>

      {/* ── SPEECH BUBBLE ── */}
      {showBubble && stage !== 'rideoff' && (
        <div style={{
          position:'absolute', top:'18%', left:'50%', transform:'translateX(-50%)',
          animation:'scaleIn .5s cubic-bezier(.34,1.56,.64,1) both',
          zIndex:30, textAlign:'center',
        }}>
          {/* Bubble */}
          <div style={{
            background:'rgba(255,255,255,.96)',
            borderRadius:'24px',
            padding:'1.2rem 2rem',
            boxShadow:'0 20px 60px rgba(0,0,0,.5)',
            border:'2px solid rgba(86,171,47,.4)',
            position:'relative',
            maxWidth:'420px',
          }}>
            {/* Bubble tail */}
            <div style={{
              position:'absolute', bottom:'-16px', left:'50%', transform:'translateX(-50%)',
              width:0, height:0,
              borderLeft:'16px solid transparent',
              borderRight:'16px solid transparent',
              borderTop:'18px solid rgba(255,255,255,.96)',
            }}/>
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'clamp(1.2rem,2.5vw,1.8rem)',
              fontWeight:900, color:'#0d1f0d',
              lineHeight:1.3,
            }}>
              Hey There!! 👋
            </div>
            <div style={{
              fontFamily:"'Chakra Petch',monospace",
              fontSize:'clamp(.85rem,1.5vw,1.1rem)',
              color:'#1a3a1a', marginTop:'.4rem',
              fontWeight:600,
            }}>
              Up for a ride? Hold tight! 🏍️
            </div>
            <div style={{
              fontSize:'.78rem', color:'#56ab2f', marginTop:'.5rem',
              fontFamily:"'DM Sans',sans-serif",
            }}>
              — Suyash Pal, Data Analyst & AI Engineer
            </div>
          </div>

          {/* Name title below bubble */}
          <div style={{
            marginTop:'1.5rem',
            animation:'fadeInUp .6s .6s ease both', opacity:0,
            animationFillMode:'forwards',
          }}>
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'clamp(2rem,5vw,3.5rem)',
              fontWeight:900, lineHeight:1.05,
              color:'#e8f5e9',
              textShadow:'0 4px 20px rgba(0,0,0,.6)',
            }}>
              <span style={{
                background:'linear-gradient(90deg,#56ab2f,#a8e063,#56ab2f)',
                backgroundSize:'200% auto',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                backgroundClip:'text',
                animation:'shimmer 3s linear infinite',
              }}>Suyash Pal</span>
            </div>
            <div style={{
              fontFamily:"'Chakra Petch',monospace",
              fontSize:'clamp(.75rem,1.3vw,1rem)',
              color:'#a8e063', letterSpacing:'.12em', marginTop:'.4rem',
              textTransform:'uppercase',
            }}>
              Data Analyst · Business Analyst · AI Engineer
            </div>
          </div>
        </div>
      )}

      {/* Riding off bike (shown during rideoff) */}
      {stage === 'rideoff' && (
        <div style={{
          position:'absolute', bottom:'11%',
          left: bikeX, transition:'none',
          zIndex:25,
        }}>
          <svg viewBox="-60 -40 240 100" width="200" height="100">
            <RidingBike/>
            {/* Dust trail */}
            {[1,2,3,4].map(s=>(
              <ellipse key={s} cx={-30-s*22} cy={38} rx={s*8} ry={s*4}
                fill="#8a7a5a" opacity={.15-s*.03}
                style={{animation:`exhaustPuff .6s ease-out ${s*.1}s infinite`}}/>
            ))}
          </svg>
        </div>
      )}

      {/* Tech + Bikes backdrop (left/right sides) */}
      <div style={{
        position:'absolute', inset:0, display:'flex', pointerEvents:'none',
        opacity: stage==='rideoff'?0.3:0.6,
        transition:'opacity .8s',
      }}>
        {/* Left: tech icons floating */}
        <div style={{width:'22%', position:'relative'}}>
          {['💻','📊','🗄️','⚙️','🐍'].map((icon,i)=>(
            <div key={i} style={{
              position:'absolute',
              left:`${15+i%2*40}%`, top:`${10+i*14}%`,
              fontSize:'clamp(1rem,2vw,1.6rem)', opacity:.6,
              animation:`float ${2+i*.4}s ease-in-out ${i*.3}s infinite`,
            }}>{icon}</div>
          ))}
        </div>
        {/* Right: bike icons floating */}
        <div style={{flex:1}}/>
        <div style={{width:'22%', position:'relative'}}>
          {['🏍️','⛽','🔧','🛡️','🏁'].map((icon,i)=>(
            <div key={i} style={{
              position:'absolute',
              right:`${15+i%2*35}%`, top:`${8+i*14}%`,
              fontSize:'clamp(1rem,2vw,1.6rem)', opacity:.6,
              animation:`float ${2.5+i*.35}s ease-in-out ${i*.4}s infinite`,
            }}>{icon}</div>
          ))}
        </div>
      </div>

      {/* Bottom road label */}
      <div style={{
        position:'absolute', bottom:'2%', left:'50%', transform:'translateX(-50%)',
        fontFamily:"'Chakra Petch',monospace",
        fontSize:'.72rem', color:'#3a5f3a', letterSpacing:'.15em',
        textTransform:'uppercase',
        animation:'fadeIn 1s 1s ease both',
      }}>
        The Portfolio Highway — Est. 2021
      </div>
    </div>
  );
}

function RidingBike() {
  return (
    <g>
      {/* Wheels */}
      <circle cx="-32" cy="28" r="20" fill="none" stroke="#2a2a2a" strokeWidth="5"
        style={{animation:'wheelSpin .4s linear infinite'}}/>
      <circle cx="-32" cy="28" r="12" fill="none" stroke="#333" strokeWidth="2"/>
      <circle cx="-32" cy="28" r="4" fill="#555"/>
      <circle cx="46"  cy="28" r="20" fill="none" stroke="#2a2a2a" strokeWidth="5"
        style={{animation:'wheelSpin .4s linear infinite'}}/>
      <circle cx="46"  cy="28" r="12" fill="none" stroke="#333" strokeWidth="2"/>
      <circle cx="46"  cy="28" r="4" fill="#555"/>
      {/* Frame */}
      <path d="M-22,14 L4,2 L22,0 L36,6 L40,18 L28,20 L20,4 L0,4 L-8,16Z" fill="#c0392b"/>
      <ellipse cx="12" cy="1" rx="18" ry="8" fill="#e74c3c"/>
      <path d="M-8,-4 Q8,-10 26,-4 L26,2 Q8,-4 -8,0Z" fill="#1a1a1a"/>
      {/* Rider */}
      <ellipse cx="8" cy="-14" rx="8" ry="11" fill="#1a1a3e"/>
      <circle cx="10" cy="-28" r="9" fill="#c0392b"/>
      <path d="M2,-34 Q10,-40 18,-34 L18,-26 Q10,-22 2,-26Z" fill="#2980b9" opacity=".85"/>
      <path d="M16,-10 L26,-7 M16,-8 L26,-3" stroke="#1a1a3e" strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="26" cy="-7" r="3" fill="#c8956c"/>
      <circle cx="26" cy="-3" r="3" fill="#c8956c"/>
      {/* Speed lines */}
      {[0,1,2,3].map(i=>(
        <line key={i} x1={-80-i*15} y1={-10+i*10} x2={-55-i*15} y2={-10+i*10}
          stroke="#a8e063" strokeWidth={1.5-i*.3} opacity={.6-i*.1}
          strokeLinecap="round"/>
      ))}
    </g>
  );
}
