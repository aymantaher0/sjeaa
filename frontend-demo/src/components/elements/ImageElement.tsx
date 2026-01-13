import React from 'react';
import { Element } from '../../types';

interface ImageElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const ImageElement: React.FC<ImageElementProps> = ({ element, isSelected, onClick }) => {
  return (
    <img
      src={element.props.src || 'https://via.placeholder.com/400x300'}
      alt={element.props.alt || 'Image'}
      onClick={onClick}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
        maxWidth: '100%',
        display: 'block',
      }}
    />
  );
};
