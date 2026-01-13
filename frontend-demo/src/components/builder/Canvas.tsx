import React from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { ElementRenderer } from '../elements/ElementRenderer';
import { Section } from '../../types';
import './Canvas.css';

export const Canvas: React.FC = () => {
  const {
    pageStructure,
    selectedElementId,
    selectedSectionId,
    selectElement,
    selectSection,
    previewMode,
  } = useBuilderStore();

  if (!pageStructure) {
    return (
      <div className="canvas-empty">
        <p>Loading...</p>
      </div>
    );
  }

  const backgroundStyle = getBackgroundStyle(pageStructure.background_config);

  return (
    <div
      className={`canvas ${previewMode === 'mobile' ? 'canvas-mobile' : 'canvas-desktop'}`}
      style={backgroundStyle}
    >
      <div className="canvas-page">
        {pageStructure.sections.map((section: Section) => (
          <div
            key={section.id}
            className={`canvas-section canvas-section-${section.layout}`}
            style={{
              ...getSectionStyle(section),
              outline: selectedSectionId === section.id && !selectedElementId
                ? '2px solid var(--primary-color)'
                : 'none',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                selectSection(section.id!);
                selectElement(null);
              }
            }}
          >
            <div className="section-content">
              {section.elements.map((element) => (
                <div key={element.id} className="canvas-element">
                  <ElementRenderer
                    element={element}
                    isSelected={selectedElementId === element.id}
                    onClick={() => {
                      selectElement(element.id!);
                      selectSection(section.id!);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getBackgroundStyle(bg: any) {
  if (!bg) return {};

  switch (bg.type) {
    case 'color':
      return { backgroundColor: bg.value };
    case 'gradient':
      return { background: bg.value };
    case 'image':
      return {
        backgroundImage: `url('${bg.value}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    case 'video':
      return {};
    default:
      return {};
  }
}

function getSectionStyle(section: Section) {
  const style: React.CSSProperties = {
    paddingTop: section.padding.top,
    paddingRight: section.padding.right,
    paddingBottom: section.padding.bottom,
    paddingLeft: section.padding.left,
  };

  if (section.background_override) {
    Object.assign(style, getBackgroundStyle(section.background_override));
  }

  return style;
}
