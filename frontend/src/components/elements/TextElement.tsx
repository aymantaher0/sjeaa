import React from 'react';
import { Element } from '../../types';

interface TextElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const TextElement: React.FC<TextElementProps> = ({ element, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
      }}
      dangerouslySetInnerHTML={{ __html: element.props.content || '' }}
    />
  );
};
