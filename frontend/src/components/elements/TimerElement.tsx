import React, { useEffect, useState } from 'react';
import { Element } from '../../types';

interface TimerElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const TimerElement: React.FC<TimerElementProps> = ({ element, isSelected, onClick }) => {
  const [timeLeft, setTimeLeft] = useState('00d 00h 00m 00s');

  useEffect(() => {
    if (!element.props.targetDate) return;

    const target = new Date(element.props.targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft('EXPIRED');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [element.props.targetDate]);

  return (
    <div
      onClick={onClick}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
      }}
    >
      {timeLeft}
    </div>
  );
};
