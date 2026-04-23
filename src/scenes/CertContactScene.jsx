import React, { useState, useEffect, useRef } from 'react';
import { RoadScene } from '../components/SceneElements';
import { RESUME } from '../data/resume';

function Confetto({ color, style }) {
  return (
    <div style={{
      position:'absolute', width:'8px', height:'8px',
      borderRadius: Math.random()>.5 ? '50%' : '2px',
      background: color,
      animation:`confetti ${1.5+Math.random()}s ease-out ${Math.random()*2}s both`,
      ...style,
    }}/>
  );
}

function CertCard({ cert, index }) {
  const [unlocked, setUnlocked] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const unlock = () => {
    if (unlocked) return;
    setUnlocked(true);
    setShowConf(true);
    setTimeout(() => setShowConf(false), 2000);
  };

  useEffect(() => {
    const t = setTimeout(unlock, 400 + index * 250);
    return () => clearTimeout(t);
  }, []);

  const confColors = [cert.color,'#FFD700','#56ab2f','#FF4D4D','#4D79FF'];

  return (
    <div style={{ position:'relative' }}>
      {/* Confetti burst */}
      {showConf && Array.from({length:16},(_,i)=>(
        <Confetto key={i} color={confColors[i%confColors.length]}
          style={{
            top:'40%', left:`${30+i*3}%`,
            transform:`rotate(${i*23}deg)`,
          }}/>
      ))}
      <div onClick={unlock} style={{
        background: unlocked
          ? `linear-gradient(135deg, rgba(10,25,10,.9), ${cert.color}14)`
          : 'rgba(10,10,10,.6)',
        border: unlocked
          ? `1px solid ${cert.color}44`
          : '1px solid rgba(255,255,255,.06)',
        borderRadius:'16px', padding:'1.1rem 1.2rem',
        cursor: unlocked ? 'default' : 'pointer',
        transition:'all .4s cubic-bezier(.34,1.56,.64,1)',
        transform: unlocked ? 'scale(1)' : 'scale(.96)',
        display:'flex', gap:'1rem', alignItems:'center',
        animation:`fadeInUp .6s ${index*.12}s ease both`,
        position:'relative', overflow:'hidden',
      }}>
        {/* Shimmer on unlock */}
        {unlocked && (
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)',
            animation:'shimmer 2s 0s ease both',
          }}/>
        )}

        {/* Badge icon */}
        <div style={{
          width:'54px', height:'54px', borderRadius:'14px', flexShrink:0,
          background: unlocked ? `${cert.color}20` : 'rgba(255,255,255,.04)',
          border: unlocked ? `1px solid ${cert.color}40` : '1px solid rgba(255,255,255,.06)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.6rem',
          transition:'all .4s',
          transform: unlocked ? 'rotate(0deg) scale(1)' : 'rotate(-15deg) scale(.85)',
        }}>
          {unlocked ? cert.icon : '🔒'}
        </div>

        {/* Text */}
        <div style={{ flex:1 }}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'.9rem', fontWeight:700,
            color: unlocked ? '#e8f5e9' : '#444',
            transition:'color .4s', lineHeight:1.3,
          }}>{cert.name}</div>
          <div style={{
            fontSize:'.72rem', color: unlocked ? cert.color : '#333',
            marginTop:'.2rem', fontWeight:600,
            fontFamily:"'Chakra Petch',monospace",
            transition:'color .4s',
          }}>{cert.org}</div>
        </div>

        {/* Verified badge */}
        {unlocked && (
          <div style={{
            background:'rgba(86,171,47,.15)', border:'1px solid rgba(86,171,47,.3)',
            borderRadius:'50px', padding:'.2rem .6rem',
            fontSize:'.6rem', color:'#56ab2f',
            fontFamily:"'Chakra Petch',monospace", fontWeight:700,
            animation:'scaleIn .3s ease both',
          }}>✓ VERIFIED</div>
        )}
      </div>
    </div>
  );
}

export default function CertContactScene({ onRestart }) {
  const [formData, setFormData] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSent(true); setSending(false); }, 1500);
  };

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  return (
    <div style={{ position:'fixed', inset:0, overflow:'hidden', background:'#050a05' }}>
      <RoadScene phase="contact" bikeProgress={0.92} showExhaust={false}/>

      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to bottom, rgba(0,0,0,.55) 0%, rgba(0,0,0,.2) 35%, rgba(0,0,0,.82) 100%)',
        pointerEvents:'none',
      }}/>

      {/* Header */}
      <div style={{
        position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)',
        animation:'fadeInDown .6s ease both', zIndex:10, textAlign:'center',
      }}>
        <div style={{
          fontFamily:"'Chakra Petch',monospace", fontSize:'.7rem',
          color:'#56ab2f', letterSpacing:'.15em', textTransform:'uppercase',
          background:'rgba(0,0,0,.5)', border:'1px solid rgba(86,171,47,.25)',
          borderRadius:'50px', padding:'.3rem 1.2rem', backdropFilter:'blur(8px)',
        }}>
          🏁 Final Destination — Certifications & Contact
        </div>
      </div>

      {/* Main grid */}
      <div style={{
        position:'absolute', top:'60px', left:'3vw', right:'3vw', bottom:'60px',
        display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:'1.5rem', alignItems:'start',
        overflowY:'auto',
      }} className="scroll-panel">

        {/* ── LEFT: CERTIFICATES ── */}
        <div style={{ animation:'fadeInLeft .7s .2s ease both' }}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'1.4rem', fontWeight:900, color:'#e8f5e9',
            marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.5rem',
          }}>
            <span style={{ animation:'float 3s ease-in-out infinite' }}>🏅</span>
            Certifications
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'.75rem' }}>
            {RESUME.certificates.map((cert, i) => (
              <CertCard key={cert.name} cert={cert} index={i}/>
            ))}
          </div>

          {/* Journey complete */}
          <div style={{
            marginTop:'1.5rem',
            background:'linear-gradient(135deg,rgba(86,171,47,.08),rgba(168,224,99,.04))',
            border:'1px solid rgba(86,171,47,.25)', borderRadius:'16px',
            padding:'1.1rem', textAlign:'center',
            animation:'fadeInUp .6s .8s ease both',
          }}>
            <div style={{ fontSize:'2rem', animation:'bounce 2s infinite' }}>🏁</div>
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'1rem', fontWeight:700, color:'#e8f5e9', marginTop:'.4rem',
            }}>Journey Complete!</div>
            <div style={{ fontSize:'.75rem', color:'#6b9f6b', marginTop:'.3rem' }}>
              Suyash has arrived at his destination.
            </div>
            <button className="btn-ghost" style={{ marginTop:'.9rem', fontSize:'.75rem', padding:'.5rem 1.4rem' }}
              onClick={onRestart}>
              🔄 Ride Again
            </button>
          </div>
        </div>

        {/* ── RIGHT: CONTACT ── */}
        <div style={{ animation:'fadeInRight .7s .2s ease both' }}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'1.4rem', fontWeight:900, color:'#e8f5e9',
            marginBottom:'1rem', display:'flex', alignItems:'center', gap:'.5rem',
          }}>
            <span style={{ animation:'float 2.5s ease-in-out infinite' }}>📬</span>
            Get In Touch
          </div>

          {/* Contact info cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:'.5rem', marginBottom:'1.2rem' }}>
            {[
              { icon:'📧', label:'Email', val: RESUME.email, copy: true },
              { icon:'📞', label:'Phone', val: showPhone ? RESUME.phone : '••••••••••', copy: false, reveal: true },
              { icon:'📍', label:'Location', val: RESUME.location, copy: false },
            ].map(item=>(
              <div key={item.label} style={{
                display:'flex', alignItems:'center', gap:'.75rem',
                background:'rgba(0,0,0,.4)', border:'1px solid rgba(86,171,47,.1)',
                borderRadius:'12px', padding:'.55rem .9rem',
                transition:'all .2s',
              }}>
                <span style={{ fontSize:'1rem' }}>{item.icon}</span>
                <span style={{ fontSize:'.7rem', color:'#3a6f3a', minWidth:'55px', fontFamily:"'Chakra Petch',monospace" }}>{item.label}</span>
                <span style={{ fontSize:'.8rem', color:'#c8e6c9', flex:1 }}>{item.val}</span>
                {item.copy && (
                  <button onClick={()=>copyText(item.val, item.label)} style={{
                    background:'rgba(86,171,47,.1)', border:'1px solid rgba(86,171,47,.2)',
                    borderRadius:'6px', padding:'.2rem .5rem',
                    color: copied===item.label ? '#56ab2f' : '#6b9f6b',
                    fontSize:'.65rem', cursor:'pointer', fontFamily:"'Chakra Petch',monospace",
                    transition:'all .2s',
                  }}>
                    {copied===item.label ? '✓ Copied' : 'Copy'}
                  </button>
                )}
                {item.reveal && (
                  <button onClick={()=>setShowPhone(!showPhone)} style={{
                    background:`rgba(86,171,47,.${showPhone?'15':'08'})`,
                    border:'1px solid rgba(86,171,47,.3)',
                    borderRadius:'6px', padding:'.2rem .5rem',
                    color:'#a8e063', fontSize:'.65rem', cursor:'pointer',
                    fontFamily:"'Chakra Petch',monospace",
                  }}>
                    {showPhone ? '🙈 Hide' : '👁 Reveal'}
                  </button>
                )}
              </div>
            ))}

            {/* Social links */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginTop:'.25rem' }}>
              {[
                { icon:'💼', label:'LinkedIn', href: RESUME.linkedin },
                { icon:'🐙', label:'GitHub',   href: RESUME.github },
                { icon:'📊', label:'HackerRank', href: RESUME.hackerrank },
              ].map(l=>(
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
                  display:'flex', alignItems:'center', gap:'.35rem',
                  background:'rgba(86,171,47,.08)', border:'1px solid rgba(86,171,47,.2)',
                  borderRadius:'50px', padding:'.3rem .8rem',
                  color:'#a8e063', fontSize:'.72rem', textDecoration:'none',
                  transition:'all .2s', fontFamily:"'Chakra Petch',monospace",
                }}>
                  {l.icon} {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* ── CONTACT FORM ── */}
          <div style={{
            background:'rgba(0,0,0,.5)', border:'1px solid rgba(86,171,47,.15)',
            borderRadius:'16px', padding:'1.2rem',
          }}>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'.7rem' }}>
                <div style={{
                  fontFamily:"'Chakra Petch',monospace",
                  fontSize:'.68rem', color:'#56ab2f', letterSpacing:'.1em',
                  textTransform:'uppercase', marginBottom:'.2rem',
                }}>Send me a message</div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.6rem' }}>
                  {[
                    { key:'name',  placeholder:'Your name',  type:'text' },
                    { key:'email', placeholder:'Your email', type:'email' },
                  ].map(f=>(
                    <input key={f.key} type={f.type} placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e=>setFormData(p=>({...p,[f.key]:e.target.value}))}
                      required style={{
                        background:'rgba(0,0,0,.5)',
                        border:'1px solid rgba(86,171,47,.15)',
                        borderRadius:'10px', padding:'.65rem .9rem',
                        color:'#e8f5e9', fontSize:'.82rem',
                        fontFamily:"'DM Sans',sans-serif", outline:'none',
                        transition:'border-color .2s',
                      }}
                      onFocus={e=>e.target.style.borderColor='rgba(86,171,47,.5)'}
                      onBlur={e=>e.target.style.borderColor='rgba(86,171,47,.15)'}
                    />
                  ))}
                </div>

                <textarea placeholder="Your message..." required rows={3}
                  value={formData.message}
                  onChange={e=>setFormData(p=>({...p,message:e.target.value}))}
                  style={{
                    background:'rgba(0,0,0,.5)',
                    border:'1px solid rgba(86,171,47,.15)',
                    borderRadius:'10px', padding:'.65rem .9rem',
                    color:'#e8f5e9', fontSize:'.82rem',
                    fontFamily:"'DM Sans',sans-serif", outline:'none',
                    resize:'vertical', transition:'border-color .2s',
                  }}
                  onFocus={e=>e.target.style.borderColor='rgba(86,171,47,.5)'}
                  onBlur={e=>e.target.style.borderColor='rgba(86,171,47,.15)'}
                />

                <button type="submit" className="btn-primary"
                  disabled={sending}
                  style={{ alignSelf:'flex-end', opacity: sending?0.7:1 }}>
                  {sending ? (
                    <span style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                      <span className="anim-spin" style={{ display:'inline-block', width:'14px', height:'14px', border:'2px solid #0a1f0a', borderTopColor:'transparent', borderRadius:'50%' }}/>
                      Sending...
                    </span>
                  ) : '📨 Send Message'}
                </button>
              </form>
            ) : (
              <div style={{
                textAlign:'center', padding:'1.5rem',
                animation:'scaleIn .5s cubic-bezier(.34,1.56,.64,1) both',
              }}>
                <div style={{ fontSize:'3rem', animation:'bounce 2s infinite' }}>✅</div>
                <div style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:'1.1rem', fontWeight:700, color:'#e8f5e9', marginTop:'.6rem',
                }}>Message Sent!</div>
                <div style={{ fontSize:'.78rem', color:'#6b9f6b', marginTop:'.3rem' }}>
                  Suyash will get back to you soon. 🏍️
                </div>
                <button className="btn-ghost" style={{ marginTop:'.9rem', fontSize:'.75rem' }}
                  onClick={()=>{ setSent(false); setFormData({name:'',email:'',message:''}); }}>
                  Send another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'10px 2rem', display:'flex', justifyContent:'space-between',
        alignItems:'center', background:'rgba(0,0,0,.5)',
        borderTop:'1px solid rgba(86,171,47,.08)',
        animation:'fadeIn .6s .5s ease both',
      }}>
        <span style={{ fontSize:'.65rem', color:'#2a4f2a', fontFamily:"'Chakra Petch',monospace" }}>
          © 2026 Suyash Pal · Built with data & passion · Noida, India 🇮🇳
        </span>
        <span style={{ fontSize:'.65rem', color:'#2a4f2a' }}>
          The Portfolio Highway
        </span>
      </div>
    </div>
  );
}
