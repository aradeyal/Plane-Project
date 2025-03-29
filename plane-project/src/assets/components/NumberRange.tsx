import { useState, useEffect } from 'react';

interface NumberRangeProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  allowNegative?: boolean;
}

function NumberRange({
  label,
  min,
  max,
  value,
  onChange,
  allowNegative = false,
}: NumberRangeProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  // עדכון פנימי אם מגיע ערך חדש מבחוץ
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // מניעת "-" אם לא מרשים שלילי
    if (!allowNegative && val.includes('-')) return;

    // נאפשר לרשום "-" בלבד (בשלב הראשון)
    if (allowNegative && val === '-') {
      setInputValue(val);
      return;
    }

    // אם ריק – נרשה לרשום
    if (val === '') {
      setInputValue(val);
      return;
    }

    const num = Number(val);

    // נוודא שזה מספר חוקי בטווח לפני שנשנה את ה־state
    if (!isNaN(num) && num >= min && num <= max) {
      setInputValue(val);
    }
  };

  const handleBlur = () => {
    const num = Number(inputValue);
    if (!isNaN(num)) {
      const clamped = Math.max(min, Math.min(max, num));
      onChange(clamped);
      setInputValue(clamped.toString());
    } else {
      // החזרה לערך הקודם אם הערך לא תקין
      setInputValue(value.toString());
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', margin: '5px 0', alignItems: 'center' }}>
      <label>{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default NumberRange;
