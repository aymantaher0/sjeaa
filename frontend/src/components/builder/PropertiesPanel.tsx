import React, { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { Element } from '../../types';
import './PropertiesPanel.css';

export const PropertiesPanel: React.FC = () => {
  const { pageStructure, selectedElementId, selectedSectionId, updateElement, updateSection } =
    useBuilderStore();

  const [activeTab, setActiveTab] = useState<'main' | 'appearance' | 'settings'>('main');

  if (!pageStructure) return null;

  const selectedSection = pageStructure.sections.find((s) => s.id === selectedSectionId);

  if (!selectedSection) {
    return (
      <div className="properties-panel">
        <div className="properties-empty">
          <p>Select an element or section to edit</p>
        </div>
      </div>
    );
  }

  const selectedElement = selectedSection.elements.find((e) => e.id === selectedElementId);

  if (!selectedElement) {
    return (
      <div className="properties-panel">
        <div className="properties-header">
          <h3>Section Properties</h3>
        </div>
        <div className="properties-content">
          <SectionProperties section={selectedSection} onUpdate={updateSection} />
        </div>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <div className="properties-header">
        <h3>Element Properties</h3>
        <div className="properties-tabs">
          <button
            className={`tab ${activeTab === 'main' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('main')}
          >
            Main
          </button>
          <button
            className={`tab ${activeTab === 'appearance' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      </div>

      <div className="properties-content">
        {activeTab === 'main' && (
          <MainTab element={selectedElement} onUpdate={(updates) => updateElement(selectedElement.id!, updates)} />
        )}
        {activeTab === 'appearance' && (
          <AppearanceTab element={selectedElement} onUpdate={(updates) => updateElement(selectedElement.id!, updates)} />
        )}
        {activeTab === 'settings' && (
          <SettingsTab element={selectedElement} onUpdate={(updates) => updateElement(selectedElement.id!, updates)} />
        )}
      </div>
    </div>
  );
};

const SectionProperties: React.FC<any> = ({ section, onUpdate }) => {
  return (
    <div className="properties-section">
      <div className="form-group">
        <label>Layout</label>
        <select
          value={section.layout}
          onChange={(e) => onUpdate(section.id, { layout: e.target.value })}
          className="input"
        >
          <option value="full_width">Full Width</option>
          <option value="boxed">Boxed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Padding</label>
        <div className="padding-inputs">
          <input
            type="text"
            placeholder="Top"
            value={section.padding.top}
            onChange={(e) =>
              onUpdate(section.id, { padding: { ...section.padding, top: e.target.value } })
            }
            className="input"
          />
          <input
            type="text"
            placeholder="Right"
            value={section.padding.right}
            onChange={(e) =>
              onUpdate(section.id, { padding: { ...section.padding, right: e.target.value } })
            }
            className="input"
          />
          <input
            type="text"
            placeholder="Bottom"
            value={section.padding.bottom}
            onChange={(e) =>
              onUpdate(section.id, { padding: { ...section.padding, bottom: e.target.value } })
            }
            className="input"
          />
          <input
            type="text"
            placeholder="Left"
            value={section.padding.left}
            onChange={(e) =>
              onUpdate(section.id, { padding: { ...section.padding, left: e.target.value } })
            }
            className="input"
          />
        </div>
      </div>
    </div>
  );
};

const MainTab: React.FC<{ element: Element; onUpdate: (updates: Partial<Element>) => void }> = ({
  element,
  onUpdate,
}) => {
  const updateProp = (key: string, value: any) => {
    onUpdate({ props: { ...element.props, [key]: value } });
  };

  switch (element.type) {
    case 'text':
      return (
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={element.props.content || ''}
            onChange={(e) => updateProp('content', e.target.value)}
            className="input"
            rows={6}
            placeholder="Enter HTML content..."
          />
        </div>
      );

    case 'image':
      return (
        <>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              value={element.props.src || ''}
              onChange={(e) => updateProp('src', e.target.value)}
              className="input"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            <label>Alt Text</label>
            <input
              type="text"
              value={element.props.alt || ''}
              onChange={(e) => updateProp('alt', e.target.value)}
              className="input"
              placeholder="Image description"
            />
          </div>
        </>
      );

    case 'button':
      return (
        <>
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              value={element.props.label || ''}
              onChange={(e) => updateProp('label', e.target.value)}
              className="input"
              placeholder="Button text"
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              value={element.props.url || ''}
              onChange={(e) => updateProp('url', e.target.value)}
              className="input"
              placeholder="https://example.com"
            />
          </div>
          <div className="form-group">
            <label>Target</label>
            <select
              value={element.props.target || '_self'}
              onChange={(e) => updateProp('target', e.target.value)}
              className="input"
            >
              <option value="_self">Same window</option>
              <option value="_blank">New window</option>
            </select>
          </div>
        </>
      );

    case 'form':
      return (
        <div className="form-group">
          <label>Form Fields (JSON)</label>
          <textarea
            value={JSON.stringify(element.props.fields || [], null, 2)}
            onChange={(e) => {
              try {
                const fields = JSON.parse(e.target.value);
                updateProp('fields', fields);
              } catch (err) {}
            }}
            className="input"
            rows={8}
            placeholder='[{"label": "Name", "name": "name", "type": "text", "required": true}]'
          />
        </div>
      );

    default:
      return (
        <div className="form-group">
          <label>Properties (JSON)</label>
          <textarea
            value={JSON.stringify(element.props, null, 2)}
            onChange={(e) => {
              try {
                const props = JSON.parse(e.target.value);
                onUpdate({ props });
              } catch (err) {}
            }}
            className="input"
            rows={8}
          />
        </div>
      );
  }
};

const AppearanceTab: React.FC<{ element: Element; onUpdate: (updates: Partial<Element>) => void }> = ({
  element,
  onUpdate,
}) => {
  const updateStyle = (key: string, value: any) => {
    onUpdate({ style: { ...element.style, [key]: value } });
  };

  return (
    <>
      <div className="form-group">
        <label>Text Color</label>
        <input
          type="color"
          value={element.style.color || '#000000'}
          onChange={(e) => updateStyle('color', e.target.value)}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Background Color</label>
        <input
          type="color"
          value={element.style.backgroundColor || '#ffffff'}
          onChange={(e) => updateStyle('backgroundColor', e.target.value)}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Font Size</label>
        <input
          type="text"
          value={element.style.fontSize || ''}
          onChange={(e) => updateStyle('fontSize', e.target.value)}
          className="input"
          placeholder="16px"
        />
      </div>

      <div className="form-group">
        <label>Font Weight</label>
        <select
          value={element.style.fontWeight || 'normal'}
          onChange={(e) => updateStyle('fontWeight', e.target.value)}
          className="input"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Lighter</option>
        </select>
      </div>

      <div className="form-group">
        <label>Text Align</label>
        <select
          value={element.style.textAlign || 'left'}
          onChange={(e) => updateStyle('textAlign', e.target.value)}
          className="input"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div className="form-group">
        <label>Padding</label>
        <input
          type="text"
          value={element.style.padding || ''}
          onChange={(e) => updateStyle('padding', e.target.value)}
          className="input"
          placeholder="10px 20px"
        />
      </div>

      <div className="form-group">
        <label>Margin</label>
        <input
          type="text"
          value={element.style.margin || ''}
          onChange={(e) => updateStyle('margin', e.target.value)}
          className="input"
          placeholder="10px auto"
        />
      </div>

      <div className="form-group">
        <label>Border Radius</label>
        <input
          type="text"
          value={element.style.borderRadius || ''}
          onChange={(e) => updateStyle('borderRadius', e.target.value)}
          className="input"
          placeholder="4px"
        />
      </div>
    </>
  );
};

const SettingsTab: React.FC<{ element: Element; onUpdate: (updates: Partial<Element>) => void }> = ({
  element,
  onUpdate,
}) => {
  const updateProp = (key: string, value: any) => {
    onUpdate({ props: { ...element.props, [key]: value } });
  };

  return (
    <>
      <div className="form-group">
        <label>Element ID</label>
        <input
          type="text"
          value={element.props.elementId || ''}
          onChange={(e) => updateProp('elementId', e.target.value)}
          className="input"
          placeholder="my-element"
        />
      </div>

      <div className="form-group">
        <label>Custom Classes</label>
        <input
          type="text"
          value={element.props.customClasses || ''}
          onChange={(e) => updateProp('customClasses', e.target.value)}
          className="input"
          placeholder="class1 class2"
        />
      </div>
    </>
  );
};
