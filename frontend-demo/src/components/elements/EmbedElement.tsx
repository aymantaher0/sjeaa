import React from 'react';
import { Element } from '../../types';

interface EmbedElementProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const EmbedElement: React.FC<EmbedElementProps> = ({ element, isSelected, onClick }) => {
  if (element.props.embedType === 'iframe') {
    return (
      <div
        onClick={onClick}
        style={{
          ...element.style,
          outline: isSelected ? '2px solid var(--primary-color)' : 'none',
          cursor: 'pointer',
        }}
      >
        <iframe
          src={element.props.url || ''}
          style={{ width: '100%', minHeight: '400px', border: 'none' }}
          title="Embed"
        />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        ...element.style,
        outline: isSelected ? '2px solid var(--primary-color)' : 'none',
        cursor: 'pointer',
      }}
      dangerouslySetInnerHTML={{ __html: element.props.html || '' }}
    />
  );
};
