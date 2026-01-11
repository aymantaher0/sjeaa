import React from 'react';
import { Element } from '../../types';

interface SocialElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const SocialElement: React.FC<SocialElementProps> = ({ element, isSelected, onClick }) => {
  const icons = element.props.icons || [];

  return (
    <div
      onClick={onClick}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
      }}
    >
      {icons.map((icon: any, index: number) => (
        <a
          key={index}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#000',
            color: '#fff',
            textDecoration: 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {icon.platform.charAt(0).toUpperCase()}
        </a>
      ))}
    </div>
  );
};
