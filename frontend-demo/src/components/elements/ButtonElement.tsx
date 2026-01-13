import React from 'react';
import { Element } from '../../types';

interface ButtonElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const ButtonElement: React.FC<ButtonElementProps> = ({ element, isSelected, onClick }) => {
  return (
    <a
      href={element.props.url || '#'}
      target={element.props.target || '_self'}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
        display: 'inline-block',
        textDecoration: 'none',
      }}
    >
      {element.props.label || 'Button'}
    </a>
  );
};
