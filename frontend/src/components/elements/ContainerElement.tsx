import React from 'react';
import { Element } from '../../types';

interface ContainerElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const ContainerElement: React.FC<ContainerElementProps> = ({ element, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
        display: element.props.display || 'flex',
        flexDirection: element.props.flexDirection || 'row',
        gap: element.props.gap || '10px',
      }}
    >
      {element.props.content || 'Container'}
    </div>
  );
};
