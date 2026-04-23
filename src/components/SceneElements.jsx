import React, { useEffect, useRef } from 'react';

/* ───────────────────────────── SKY + MOUNTAINS ─────────────────────────── */
export function MountainSky({ phase = 'day', style = {} }) {
  const skies = {
    intro:   ['#0d1117','#1a2a3a'],
    day:     ['#1a3a5c','#2d6a4f'],
    golden:  ['#7a3a1a','#c47a1a'],
    dusk:    ['#1a1a3a','#0d1a2a'],
  };
  const [top, bot] = skies[phase] || skies.day;
  return (
    <svg viewBox="0 0 1400 500" preserveAspectRatio="xMidYMid slice"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', ...style }}>
      <defs>
        <linearGradient id={`sky-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top}/>
          <stop offset="100%" stopColor={bot}/>
        </linearGradient>
      </defs>
      <rect width="1400" height="500" fill={`url(#sky-${phase})`}/>

      {/* Stars (night scenes) */}
      {(phase==='intro'||phase==='dusk') && [
        [100,40],[200,80],[350,30],[500,60],[650,25],[800,55],[950,35],[1100,70],
        [1250,40],[150,120],[430,100],[700,90],[1000,110],[1300,95]
      ].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={1.2} fill="white"
          style={{animation:`starTwinkle ${1.5+i*.3}s ease-in-out ${i*.2}s infinite`}}/>
      ))}

      {/* Moon (night) */}
      {(phase==='intro'||phase==='dusk') && (
        <g>
          <circle cx="1200" cy="80" r="35" fill="#d4d0c8" opacity=".85"/>
          <circle cx="1215" cy="68" r="30" fill={top} opacity=".5"/>
          {[[1185,90,4],[1200,75,3],[1220,88,2.5]].map(([cx,cy,r],i)=>(
            <circle key={i} cx={cx} cy={cy} r={r} fill="#b8b0a0" opacity=".4"/>
          ))}
        </g>
      )}
      {/* Sun (day) */}
      {phase==='day' && <circle cx="1100" cy="70" r="45" fill="#FFD700" opacity=".8"
        style={{filter:'blur(2px)'}}/>}
      {phase==='golden' && <circle cx="200" cy="120" r="60" fill="#FF8C00" opacity=".85"
        style={{filter:'blur(3px)'}}/>}

      {/* Clouds */}
      {phase!=='dusk' && [[80,60],[300,40],[600,75],[900,50],[1150,65]].map(([cx,cy],i)=>(
        <g key={i} transform={`translate(${cx},${cy})`}
          style={{animation:`cloudDrift ${18+i*4}s linear ${i*-6}s infinite`}}>
          <ellipse cx="0" cy="0" rx="65" ry="22" fill="white" opacity=".15"/>
          <ellipse cx="35" cy="-10" rx="40" ry="16" fill="white" opacity=".18"/>
          <ellipse cx="-30" cy="-5" rx="32" ry="14" fill="white" opacity=".12"/>
        </g>
      ))}

      {/* Far mountains */}
      <path d="M0,280 L120,160 L240,200 L380,110 L500,165 L640,90 L780,145 L920,80 L1060,130 L1200,70 L1340,120 L1400,95 L1400,340 L0,340Z"
        fill="#1a4a2a" opacity=".7"/>
      <path d="M0,310 L150,200 L300,240 L460,165 L620,210 L780,140 L940,185 L1100,125 L1260,170 L1400,145 L1400,340 L0,340Z"
        fill="#1e5530" opacity=".75"/>
    </svg>
  );
}

/* ───────────────────────────── TECH SIDE (left) ────────────────────────── */
export function TechSideDecor({ visible }) {
  return (
    <svg viewBox="0 0 320 480" style={{ width:'100%', height:'100%' }}>
      {/* Desk surface */}
      <rect x="20" y="340" width="280" height="18" rx="4" fill="#2d1f0e" opacity=".9"/>
      {/* Laptop */}
      <g style={{animation: visible?'fadeInLeft .8s .3s ease both':'none'}}>
        <rect x="60" y="240" width="160" height="100" rx="8" fill="#1a1a2e"/>
        <rect x="65" y="245" width="150" height="88" rx="4" fill="#0d1117"/>
        {/* Screen glow */}
        <rect x="70" y="250" width="140" height="78" rx="2" fill="#001a33" opacity=".9"/>
        {/* Code lines */}
        {[0,1,2,3,4,5].map(i=>(
          <rect key={i} x={78+i*0} y={258+i*11} width={60+Math.sin(i)*20} height="4" rx="2"
            fill={['#56ab2f','#4D79FF','#FFB800','#FF4D4D','#00C9A7','#C84BFF'][i]} opacity=".8"/>
        ))}
        <rect x="78" y="258" width="100" height="4" rx="2" fill="#56ab2f" opacity=".8"/>
        <rect x="78" y="269" width="80" height="4"  rx="2" fill="#4D79FF" opacity=".8"/>
        <rect x="86" y="280" width="60" height="4"  rx="2" fill="#FFB800" opacity=".8"/>
        <rect x="86" y="291" width="90" height="4"  rx="2" fill="#00C9A7" opacity=".8"/>
        <rect x="78" y="302" width="70" height="4"  rx="2" fill="#C84BFF" opacity=".8"/>
        <rect x="78" y="313" width="110" height="4" rx="2" fill="#FF4D4D" opacity=".8"/>
        {/* Laptop base */}
        <rect x="40" y="340" width="200" height="12" rx="6" fill="#252535"/>
        <rect x="120" y="340" width="40" height="5" rx="2" fill="#1a1a2e"/>
      </g>
      {/* Stack of books */}
      <g style={{animation: visible?'fadeInLeft .8s .5s ease both':'none'}}>
        <rect x="50" y="305" width="50" height="12" rx="3" fill="#8B2635"/>
        <rect x="50" y="295" width="44" height="12" rx="3" fill="#1a3a6b"/>
        <rect x="50" y="285" width="48" height="12" rx="3" fill="#2d6b2d"/>
        <rect x="52" y="287" width="3" height="8" fill="white" opacity=".3"/>
      </g>
      {/* Coffee mug */}
      <g style={{animation: visible?'fadeInLeft .8s .7s ease both':'none'}}>
        <rect x="240" y="313" width="30" height="28" rx="4" fill="#3d2b1f"/>
        <path d="M270,320 Q282,320 282,328 Q282,336 270,336" stroke="#3d2b1f" strokeWidth="3" fill="none"/>
        <rect x="243" y="313" width="24" height="8" rx="2" fill="#5a3d2b"/>
        {/* Steam */}
        {[0,1,2].map(i=>(
          <path key={i} d={`M${250+i*5},308 Q${252+i*5},302 ${250+i*5},296`}
            stroke="#aaa" strokeWidth="1.5" fill="none" opacity=".4"
            style={{animation:`float ${1.5+i*.3}s ease-in-out infinite`}}/>
        ))}
      </g>
      {/* Data visualization on wall */}
      <g style={{animation: visible?'fadeInLeft .8s .9s ease both':'none'}} opacity=".7">
        <rect x="170" y="160" width="120" height="80" rx="6" fill="#0d1a0d" stroke="#56ab2f" strokeWidth="1" opacity=".6"/>
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x={180+i*20} y={215-(i*8+10)} width="14" height={i*8+10} rx="2"
            fill={['#FF4D4D','#FFB800','#56ab2f','#4D79FF','#C84BFF'][i]} opacity=".8"/>
        ))}
        <text x="195" y="175" fontSize="8" fill="#56ab2f" fontFamily="monospace">SQL ANALYTICS</text>
      </g>
      {/* Floating data nodes */}
      {[[50,120],[120,80],[200,100],[260,140]].map(([x,y],i)=>(
        <g key={i} style={{animation:`float ${2+i*.5}s ease-in-out ${i*.4}s infinite`}}>
          <circle cx={x} cy={y} r="14" fill="rgba(86,171,47,.08)" stroke="rgba(86,171,47,.3)" strokeWidth="1"/>
          <text x={x} y={y+4} textAnchor="middle" fontSize="10" fill="#56ab2f">
            {['SQL','AI','ETL','BI'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ───────────────────────────── BIKE SIDE (right) ───────────────────────── */
export function BikeSideDecor({ visible }) {
  const bikes = [
    { x: 160, y: 290, scale: 1.2, label: 'Royal Enfield\nMeteor 350', highlight: true },
    { x: 60,  y: 320, scale: .85, label: 'Classic 350' },
    { x: 260, y: 315, scale: .9,  label: 'Himalayan' },
  ];
  return (
    <svg viewBox="0 0 340 480" style={{ width:'100%', height:'100%' }}>
      {/* Showroom floor */}
      <ellipse cx="170" cy="420" rx="160" ry="30" fill="rgba(86,171,47,.05)" stroke="rgba(86,171,47,.12)" strokeWidth="1"/>
      {/* Spotlight beams */}
      {[80,170,260].map((x,i)=>(
        <path key={i} d={`M${x},0 L${x-40},280 L${x+40},280 Z`}
          fill={`rgba(255,255,${i===1?100:200},.04)`}/>
      ))}
      {bikes.map((b,i)=>(
        <g key={i}
          transform={`translate(${b.x},${b.y}) scale(${b.scale})`}
          style={{animation: visible?`fadeInRight .8s ${.3+i*.25}s ease both`:'none'}}>
          <MiniRoyalEnfield highlight={b.highlight}/>
          <text x="0" y="55" textAnchor="middle" fontSize="7"
            fill={b.highlight?'#a8e063':'#6b9f6b'} fontFamily="monospace">
            {b.label?.split('\n').map((l,j)=>(
              <tspan key={j} x="0" dy={j===0?0:9}>{l}</tspan>
            ))}
          </text>
        </g>
      ))}
      {/* Floating riding gear */}
      {[[50,100,'🏍️'],[290,80,'⛽'],[30,200,'🔧'],[300,210,'🛡️']].map(([x,y,icon],i)=>(
        <text key={i} x={x} y={y} fontSize="22"
          style={{animation:`float ${2.5+i*.4}s ease-in-out ${i*.5}s infinite`}}>
          {icon}
        </text>
      ))}
    </svg>
  );
}

/* ── Mini Royal Enfield SVG ── */
function MiniRoyalEnfield({ highlight }) {
  const c = highlight ? '#c0392b' : '#555';
  const ch = highlight ? '#e74c3c' : '#666';
  return (
    <g transform="translate(-55,-30)">
      {/* frame */}
      <path d="M20,30 L40,15 L70,12 L90,18 L95,30 L80,32 L70,18 L50,18 L40,30 Z"
        fill={c} stroke="#222" strokeWidth="1.2"/>
      {/* fuel tank */}
      <ellipse cx="62" cy="15" rx="16" ry="7" fill={ch}/>
      <ellipse cx="62" cy="14" rx="10" ry="4" fill={c} opacity=".5"/>
      {/* seat */}
      <path d="M45,18 Q60,12 78,16 L78,22 Q60,18 45,22 Z" fill="#1a1a1a"/>
      {/* engine */}
      <rect x="48" y="24" width="20" height="14" rx="3" fill="#333" stroke="#444" strokeWidth=".8"/>
      <rect x="52" y="27" width="12" height="4" rx="1" fill="#555"/>
      {/* exhaust */}
      <path d="M50,36 Q40,38 30,35 Q25,34 28,40" stroke="#888" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* handlebars */}
      <path d="M85,14 L95,10 M85,14 L95,18" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
      {/* front fork */}
      <path d="M90,18 L95,40 L98,40" stroke="#666" strokeWidth="2.5" fill="none"/>
      {/* rear frame */}
      <path d="M45,22 L30,32 L22,38" stroke={c} strokeWidth="2.5" fill="none"/>
      {/* wheels */}
      <circle cx="20" cy="42" r="16" fill="none" stroke="#333" strokeWidth="3.5"/>
      <circle cx="20" cy="42" r="11" fill="none" stroke="#444" strokeWidth="1.5"/>
      <circle cx="20" cy="42" r="4"  fill="#555"/>
      <circle cx="97" cy="43" r="16" fill="none" stroke="#333" strokeWidth="3.5"/>
      <circle cx="97" cy="43" r="11" fill="none" stroke="#444" strokeWidth="1.5"/>
      <circle cx="97" cy="43" r="4"  fill="#555"/>
      {/* headlight */}
      {highlight && <ellipse cx="102" cy="24" rx="5" ry="6" fill="#FFD700" opacity=".9"
        style={{filter:'blur(1px)'}}/>}
      {/* RE logo badge */}
      {highlight && <text x="58" y="17" fontSize="4.5" fill="#FFD700" textAnchor="middle" fontWeight="bold">RE</text>}
    </g>
  );
}

/* ────────────────────────── FULL ROAD SCENE (SVG) ─────────────────────── */
export function RoadScene({ phase = 'day', bikeProgress = 0.25, showExhaust = false, children }) {
  const skies = {
    profile:  { top:'#0d1a2a', bot:'#1a3a2a' },
    timeline: { top:'#1a0d2a', bot:'#2a1a3a' },
    skills:   { top:'#0d2a1a', bot:'#1a4a2a' },
    contact:  { top:'#0d1a3a', bot:'#1a2a4a' },
  };
  const sky = skies[phase] || skies.profile;
  const bikeX = 80 + bikeProgress * 600;

  return (
    <svg viewBox="0 0 1400 420" preserveAspectRatio="xMidYMid slice"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
      <defs>
        <linearGradient id={`roadsky-${phase}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky.top}/>
          <stop offset="100%" stopColor={sky.bot}/>
        </linearGradient>
        <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3028"/>
          <stop offset="100%" stopColor="#2a2018"/>
        </linearGradient>
        <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d5a27"/>
          <stop offset="100%" stopColor="#1a3a15"/>
        </linearGradient>
        <filter id="bikeGlow2">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1400" height="420" fill={`url(#roadsky-${phase})`}/>

      {/* Stars */}
      {[80,180,320,460,600,750,920,1080,1250,1380].map((x,i)=>(
        <circle key={i} cx={x} cy={20+i%4*15} r="1.2" fill="white" opacity=".6"
          style={{animation:`starTwinkle ${2+i*.3}s ease-in-out ${i*.15}s infinite`}}/>
      ))}

      {/* Far mountains */}
      <path d="M0,240 L150,140 L300,180 L450,110 L600,160 L750,95 L900,145 L1050,90 L1200,135 L1350,100 L1400,115 L1400,300 L0,300Z"
        fill="#1a3a20" opacity=".65"/>

      {/* Trees - far */}
      {[50,140,230,350,490,610,730,860,990,1110,1240,1340].map((tx,i)=>(
        <g key={i} transform={`translate(${tx},${205+i%3*8})`}
          style={{animation:`treeSway ${2+i%3}s ease-in-out ${i*.3}s infinite`}}>
          <rect x="-3" y="28" width="5" height="18" fill="#2d1f0e" rx="1"/>
          <polygon points="0,-22 -13,14 13,14" fill="#1e4a20"/>
          <polygon points="0,-32 -9,4 9,4"  fill="#2a6030"/>
        </g>
      ))}

      {/* Road surface */}
      <path d="M0,330 Q700,315 1400,330 L1400,420 L0,420Z" fill="url(#roadGrad)"/>
      {/* Road edge lines */}
      <path d="M0,328 Q700,313 1400,328" stroke="#8a7a60" strokeWidth="2" fill="none" opacity=".5"/>
      <path d="M0,342 Q700,327 1400,342" stroke="#8a7a60" strokeWidth="1.5" fill="none" opacity=".35"/>

      {/* Road dashes */}
      {Array.from({length:12},(_,i)=>(
        <rect key={i} x={i*120-10} y="333" width="70" height="5" rx="2.5" fill="#f0e68c" opacity=".45"
          style={{animation:`roadDash 2s linear ${i*-.17}s infinite`}}/>
      ))}

      {/* Grass strip */}
      <path d="M0,322 Q700,307 1400,322 L1400,340 L0,340Z" fill="url(#grassGrad)" opacity=".6"/>

      {/* Flowers */}
      {[60,180,340,520,700,880,1060,1240].map((x,i)=>(
        <circle key={i} cx={x} cy={326+(i%3)*4} r="3.5"
          fill={['#FF4D4D','#FFB800','#C84BFF','#00C9A7'][i%4]} opacity=".75"/>
      ))}

      {/* Rider on bike */}
      <g transform={`translate(${bikeX},290)`} filter="url(#bikeGlow2)"
        style={{animation:'bikeRide 0.4s ease-in-out infinite'}}>
        <FullBikeRider/>
        {/* Headlight beam */}
        <polygon points="60,10 130,-10 130,30" fill="#FFD700" opacity=".08"/>
        {/* Exhaust */}
        {showExhaust && [1,2,3].map(s=>(
          <circle key={s} cx={-50-s*18} cy={15-s*5} r={s*5}
            fill="#aaa" opacity={.2-s*.05}
            style={{animation:`exhaustPuff .8s ease-out ${s*.15}s infinite`}}/>
        ))}
      </g>
    </svg>
  );
}

function FullBikeRider() {
  return (
    <g>
      {/* Royal Enfield Meteor 350 - detailed */}
      {/* Rear wheel */}
      <circle cx="-38" cy="22" r="22" fill="none" stroke="#2a2a2a" strokeWidth="5"
        style={{animation:'wheelSpin .6s linear infinite'}}/>
      <circle cx="-38" cy="22" r="14" fill="none" stroke="#3a3a3a" strokeWidth="2.5"/>
      <circle cx="-38" cy="22" r="5"  fill="#555"/>
      {/* Front wheel */}
      <circle cx="48" cy="22" r="22" fill="none" stroke="#2a2a2a" strokeWidth="5"
        style={{animation:'wheelSpin .6s linear infinite'}}/>
      <circle cx="48" cy="22" r="14" fill="none" stroke="#3a3a3a" strokeWidth="2.5"/>
      <circle cx="48" cy="22" r="5"  fill="#555"/>
      {/* Main frame */}
      <path d="M-25,8 L0,-2 L20,-5 L38,2 L42,14 L30,16 L22,2 L0,2 L-8,14 Z" fill="#c0392b"/>
      {/* Fuel tank */}
      <ellipse cx="14" cy="-2" rx="22" ry="10" fill="#e74c3c"/>
      <ellipse cx="14" cy="-3" rx="14" ry="6" fill="#c0392b" opacity=".6"/>
      <text x="14" y="1" textAnchor="middle" fontSize="6" fill="#FFD700" fontWeight="bold">RE</text>
      {/* Seat */}
      <path d="M-10,-5 Q8,-10 28,-6 L28,2 Q8,-4 -10,0Z" fill="#1a1a1a"/>
      {/* Engine */}
      <rect x="2" y="6" width="26" height="16" rx="4" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
      <rect x="6" y="10" width="8" height="6" rx="1" fill="#444"/>
      <rect x="16" y="10" width="8" height="6" rx="1" fill="#444"/>
      {/* Exhaust pipe */}
      <path d="M6,20 Q-10,24 -20,20 Q-28,17 -25,25" stroke="#888" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Front fork */}
      <path d="M38,4 L46,22" stroke="#666" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M42,4 L50,22" stroke="#666" strokeWidth="3.5" strokeLinecap="round"/>
      {/* Handlebars */}
      <path d="M34,-2 L44,-7 M34,-2 L42,3" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Headlight */}
      <ellipse cx="54" cy="8" rx="6" ry="7" fill="#FFD700" opacity=".95" style={{filter:'blur(1px)'}}/>
      <ellipse cx="54" cy="8" rx="4" ry="5" fill="white" opacity=".8"/>
      {/* RIDER */}
      {/* Body */}
      <ellipse cx="8" cy="-16" rx="9" ry="13" fill="#1a1a3e"/>
      {/* Jacket details */}
      <rect x="2" y="-24" width="12" height="8" rx="2" fill="#2a2a5e"/>
      {/* Arms */}
      <path d="M16,-12 L28,-8 M16,-10 L28,-4" stroke="#1a1a3e" strokeWidth="4" strokeLinecap="round"/>
      {/* Hands on bars */}
      <circle cx="28" cy="-8" r="3" fill="#c8956c"/>
      <circle cx="28" cy="-4" r="3" fill="#c8956c"/>
      {/* Helmet */}
      <circle cx="10" cy="-32" r="10" fill="#c0392b"/>
      <path d="M2,-38 Q10,-44 18,-38 L18,-30 Q10,-26 2,-30Z" fill="#2980b9" opacity=".8"/>
      {/* Helmet visor shine */}
      <path d="M4,-37 Q8,-40 12,-37" stroke="white" strokeWidth="1.5" fill="none" opacity=".5"/>
      {/* Legs */}
      <path d="M0,-6 L-5,12 M5,-6 L2,12" stroke="#1a1a3e" strokeWidth="5" strokeLinecap="round"/>
      {/* Boots */}
      <ellipse cx="-5" cy="14" rx="5" ry="4" fill="#333"/>
      <ellipse cx="2"  cy="14" rx="5" ry="4" fill="#333"/>
    </g>
  );
}

/* ─────────────────────── INTRO AVATAR ─────────────────────────────────── */
export function IntroAvatar({ side = 'left', waving = true, style = {} }) {
  const isLeft = side === 'left';
  return (
    <div style={{
      position:'absolute', bottom:0, [isLeft?'left':'right']: 0,
      width:'clamp(200px,22vw,320px)',
      transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)',
      ...style
    }}>
      <svg viewBox="0 0 220 400" style={{width:'100%',height:'auto'}}>
        {/* Riding jacket body */}
        <ellipse cx="110" cy="280" rx="62" ry="90" fill="#1a1a3e"/>
        {/* Jacket lapels */}
        <path d="M90,220 L110,250 L130,220 L110,200Z" fill="#2a2a5e"/>
        {/* Jacket zipper */}
        <line x1="110" y1="220" x2="110" y2="340" stroke="#888" strokeWidth="2" strokeDasharray="4,4"/>
        {/* RE patch on chest */}
        <rect x="96" y="240" width="28" height="16" rx="3" fill="#c0392b" opacity=".8"/>
        <text x="110" y="252" textAnchor="middle" fontSize="9" fill="#FFD700" fontWeight="bold">RE</text>
        {/* Shoulder patches */}
        <rect x="52"  y="225" width="24" height="12" rx="3" fill="#c0392b" opacity=".7"/>
        <rect x="144" y="225" width="24" height="12" rx="3" fill="#c0392b" opacity=".7"/>
        {/* Arms */}
        <path d="M52,230 L30,310 L40,315 L58,240Z" fill="#1a1a3e"/>
        <path d="M168,230 L190,310 L180,315 L162,240Z" fill="#1a1a3e"/>
        {/* Gloves */}
        <ellipse cx="34"  cy="316" rx="12" ry="10" fill="#2a2a2a"/>
        <ellipse cx="186" cy="316" rx="12" ry="10" fill="#2a2a2a"/>
        {/* Waving right arm */}
        <g style={{
          transformOrigin:'168px 230px',
          animation: waving ? 'wave1 0.6s ease-in-out infinite' : 'none'
        }}>
          <path d="M168,230 L200,180 L210,185 L175,238Z" fill="#1a1a3e"/>
          <ellipse cx="204" cy="183" rx="12" ry="10" fill="#2a2a2a"/>
          {/* Finger wave */}
          {[0,1,2].map(i=>(
            <rect key={i} x={198+i*5} y={172} width="4" height="14" rx="2" fill="#333"
              style={{animation:`wave2 ${.4+i*.1}s ease-in-out ${i*.1}s infinite`,
                transformOrigin:`${200+i*5}px 186px`}}/>
          ))}
        </g>
        {/* Neck */}
        <rect x="98" y="170" width="24" height="30" rx="8" fill="#c8956c"/>
        {/* Head */}
        <circle cx="110" cy="140" r="52" fill="#c8956c"/>
        {/* Hair */}
        <path d="M60,120 Q70,75 110,70 Q150,70 160,115 L155,110 Q140,80 110,82 Q80,82 68,108Z" fill="#1a0f05"/>
        <path d="M62,118 Q58,105 65,95 Q72,88 70,112Z" fill="#1a0f05"/>
        {/* Sunglasses */}
        <rect x="78"  y="128" width="32" height="18" rx="9" fill="#1a1a1a" opacity=".9"/>
        <rect x="112" y="128" width="32" height="18" rx="9" fill="#1a1a1a" opacity=".9"/>
        <line x1="110" y1="135" x2="112" y2="135" stroke="#333" strokeWidth="2.5"/>
        {/* Glasses shine */}
        <path d="M84,131 Q89,129 92,132" stroke="white" strokeWidth="1.2" fill="none" opacity=".4"/>
        <path d="M118,131 Q123,129 126,132" stroke="white" strokeWidth="1.2" fill="none" opacity=".4"/>
        {/* Nose */}
        <path d="M106,148 Q110,158 114,148" stroke="#a67c52" strokeWidth="2" fill="none"/>
        {/* Smile */}
        <path d="M94,162 Q110,175 126,162" stroke="#8a5a3a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Stubble */}
        {[88,94,100,106,112,118,124,130].map((x,i)=>(
          <circle key={i} cx={x} cy={168+(i%2)*3} r="1.2" fill="#8a5a3a" opacity=".4"/>
        ))}
        {/* Helmet in hand (left) */}
        <g transform="translate(24,290)" style={{animation:'float 3s ease-in-out infinite'}}>
          <ellipse cx="0" cy="0" rx="22" ry="18" fill="#c0392b"/>
          <path d="M-18,-6 Q0,-18 18,-6 L18,4 Q0,10 -18,4Z" fill="#2980b9" opacity=".8"/>
          <text x="0" y="4" textAnchor="middle" fontSize="7" fill="#FFD700" fontWeight="bold">RE</text>
        </g>
        {/* Legs/pants */}
        <path d="M68,330 L55,400 L85,400 L95,340Z" fill="#1a1a3e"/>
        <path d="M152,330 L165,400 L135,400 L125,340Z" fill="#1a1a3e"/>
        {/* Boots */}
        <ellipse cx="70"  cy="395" rx="18" ry="8" fill="#1a1a1a"/>
        <ellipse cx="150" cy="395" rx="18" ry="8" fill="#1a1a1a"/>
      </svg>
    </div>
  );
}

/* ──────────────────── ROAD SIGN ───────────────────────────────────────── */
export function RoadSign({ text, subtext, style = {} }) {
  return (
    <div style={{
      background:'#2d5a27',
      border:'3px solid #56ab2f',
      borderRadius:'8px',
      padding:'.4rem 1.2rem',
      color:'#a8e063',
      fontFamily:"'Chakra Petch',monospace",
      fontSize:'.78rem',
      fontWeight:700,
      textAlign:'center',
      boxShadow:'0 4px 16px rgba(0,0,0,.4)',
      ...style
    }}>
      <div>{text}</div>
      {subtext && <div style={{fontSize:'.62rem',color:'#56ab2f',marginTop:'.1rem'}}>{subtext}</div>}
    </div>
  );
}

/* ─────────────────────── TIMER CIRCLE ────────────────────────────────── */
export function TimerCircle({ seconds = 30, onComplete, label = 'Auto-advancing in' }) {
  const r = 45;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'.4rem'}}>
      <div style={{position:'relative',width:'110px',height:'110px'}}>
        <svg width="110" height="110" style={{transform:'rotate(-90deg)'}}>
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="4"/>
          <circle cx="55" cy="55" r={r} fill="none" stroke="var(--green)" strokeWidth="4"
            strokeLinecap="round" strokeDasharray={circ}
            style={{animation:`timerRing ${seconds}s linear forwards`}}
            onAnimationEnd={onComplete}/>
        </svg>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <span style={{fontFamily:"'Chakra Petch',monospace",fontSize:'1.4rem',fontWeight:700,color:'var(--green2)'}}>
            {seconds}s
          </span>
        </div>
      </div>
      <span style={{fontSize:'.7rem',color:'#6b9f6b',textAlign:'center'}}>{label}</span>
    </div>
  );
}

/* ──────────────── ANIMATED COUNTER ──────────────────────────────────── */
export function AnimCounter({ to, suffix = '', duration = 1500 }) {
  const [val, setVal] = React.useState(0);
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{val}{suffix}</span>;
}
