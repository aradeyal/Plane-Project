/*עמוד הכנסת נתונים ושליחתם לשרת*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NumberRange from '../assets/components/NumberRange';
import "./Home.css";

function Home() {
  const [altitude, setAltitude] = useState(0);
  const [his, setHis] = useState(0);
  const [adi, setAdi] = useState(0);
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
        await fetch('http://localhost:3001/planes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "altitude":altitude, "his":his, "adi":adi }),
      })
      .then(res => {
        if (res.ok) {
            navigate('/visual', {
              state: {
                altitude,
                his,
                adi,
              },
            });
          }
           else {
        alert('Failed to send data');
        console.log(res.status);
        console.log(res.ok);
        console.log(res.body);
      }})
    } catch (err) {
      console.error(err);
      alert('Error sending data');
    }
  };

  return (
    <div className='horizontal-center'>
     <NumberRange label="Altitude" min={0} max={3000} value={altitude} onChange={setAltitude} />
<NumberRange label="HIS" min={0} max={360} value={his} onChange={setHis} />
<NumberRange label="ADI" min={-100} max={100} value={adi} onChange={setAdi} allowNegative />

      <button onClick={handleSend}>SEND</button>
    </div>
  );
}

export default Home;
