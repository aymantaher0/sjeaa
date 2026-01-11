import React from 'react';
import { Element } from '../../types';
import { TextElement } from './TextElement';
import { ImageElement } from './ImageElement';
import { ButtonElement } from './ButtonElement';
import { FormElement } from './FormElement';
import { SocialElement } from './SocialElement';
import { EmbedElement } from './EmbedElement';
import { TimerElement } from './TimerElement';
import { ContainerElement } from './ContainerElement';

interface ElementRendererProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({ element, isSelected, onClick }) => {
  switch (element.type) {
    case 'text':
      return <TextElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'image':
      return <ImageElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'button':
      return <ButtonElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'form':
      return <FormElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'social':
      return <SocialElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'embed':
      return <EmbedElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'timer':
      return <TimerElement element={element} isSelected={isSelected} onClick={onClick} />;
    case 'container':
      return <ContainerElement element={element} isSelected={isSelected} onClick={onClick} />;
    default:
      return null;
  }
};
