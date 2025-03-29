/*תצוגה גרפית וטקסטואלית של הנתונים שנשלחו*/

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Visual() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<'text' | 'visual'>('visual');

  const [altitude, setAltitude] = useState(0);
  const [his, setHis] = useState(0);
  const [adi, setAdi] = useState(0);

  useEffect(() => {
    const state = location.state as { altitude: number; his: number; adi: number } | undefined;
    if (state) {
      setAltitude(state.altitude);
      setHis(state.his);
      setAdi(state.adi);
    }
  }, [location.state]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setMode('text')}>TEXT</button>
        <button onClick={() => setMode('visual')}>VISUAL</button>
        <button onClick={() => navigate('/')}>+</button>
      </div>

      {mode === 'text' ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '50px' }}>
          <DisplayValue title="Altitude" value={altitude} />
          <DisplayValue title="HIS" value={his} />
          <DisplayValue title="ADI" value={adi} />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap', marginTop: '30px' }}>
          <AltitudeIndicator value={altitude} />
          <HISCompass value={his} />
          <ADIIndicator value={adi} />
        </div>
      )}
    </div>
  );
}

// ------------------ Altitude ------------------
function AltitudeIndicator({ value }: { value: number }) {
  const heightPercent = Math.min(Math.max(value / 3000, 0), 1) * 100;
  const linePosition = Math.max(0, 150 - (heightPercent * 1.5));

  return (
    <div>
      <p><strong>Altitude</strong></p>
      <div style={{
        width: '80px',
        height: '150px',
        border: '3px solid black',
        position: 'relative',
        backgroundColor: '#f0f0f0',
      }}>
        <div style={{
          position: 'absolute',
          top: `${linePosition}px`,
          width: '100%',
          height: '4px',
          backgroundColor: '#00aaff',
        }}></div>

        <div style={{ position: 'absolute', left: '-40px', top: 0, height: '100%' }}>
          <div style={{ position: 'absolute', top: 0, color: 'white' }}>3000</div>
          <div style={{ position: 'absolute', top: '33%', color: 'white' }}>2000</div>
          <div style={{ position: 'absolute', top: '66%', color: 'white' }}>1000</div>
          <div style={{ position: 'absolute', bottom: 0, color: 'white' }}>0</div>
        </div>
      </div>
    </div>
  );
}

// ------------------ HIS ------------------
function HISCompass({ value }: { value: number }) {
  return (
    <div>
      <p><strong>HIS</strong></p>
      <div style={{
        width: '150px',
        height: '150px',
        border: '5px solid black',
        borderRadius: '50%',
        position: 'relative',
        backgroundColor: '#fff',
      }}>
        {/* מחוג קבוע – שחור – תמיד למעלה */}
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '60px',
          backgroundColor: 'black',
          top: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          transformOrigin: 'bottom center',
        }}></div>

        {/* מחוג דינמי – כתום – מסתובב לפי value */}
        <div style={{
          position: 'absolute',
          width: '3px',
          height: '60px',
          backgroundColor: 'orange',
          top: '15px',
          left: '50%',
          transform: `rotate(${value}deg)`,
          transformOrigin: 'bottom center',
        }}></div>

        {/* מספרים – שחורים ובולטים */}
        <div style={{ position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)', color: 'black' }}>0</div>
        <div style={{ position: 'absolute', top: '50%', left: 5, color: 'black' }}>270</div>
        <div style={{ position: 'absolute', bottom: 5, left: '50%', transform: 'translateX(-50%)', color: 'black' }}>180</div>
        <div style={{ position: 'absolute', top: '50%', right: 5, color: 'black' }}>90</div>
      </div>
    </div>
  );
}


// ------------------ ADI ------------------
function ADIIndicator({ value }: { value: number }) {
  const clamped = Math.max(-100, Math.min(100, value));
  const normalized = clamped >= 0
    ? clamped
    : 50; // -100 → חצי שמיים חצי אדמה

  const skyHeight = normalized;
  const groundHeight = 100 - normalized;

  return (
    <div>
      <p><strong>ADI</strong></p>
      <div style={{
        width: '150px',
        height: '150px',
        border: '4px solid black',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{ height: `${skyHeight}%`, backgroundColor: '#87CEEB' }}></div>
        <div style={{ height: `${groundHeight}%`, backgroundColor: '#228B22' }}></div>
      </div>
    </div>
  );
}

// ------------------ Text Display ------------------
function DisplayValue({ title, value }: { title: string, value: number }) {
  return (
    <div style={{
      border: '2px solid black',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <p style={{ margin: 0 }}><strong>{title}</strong></p>
      <p style={{ margin: 0 }}>{value}</p>
    </div>
  );
}

export default Visual;
