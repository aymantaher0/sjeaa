import React, { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { sitesApi } from '../../api/sites';
import { ElementType } from '../../types';
import './Toolbar.css';

export const Toolbar: React.FC = () => {
  const {
    siteId,
    pageStructure,
    selectedSectionId,
    addSection,
    addElement,
    save,
    isSaving,
    undo,
    redo,
    canUndo,
    canRedo,
    previewMode,
    setPreviewMode,
  } = useBuilderStore();

  const [showElementMenu, setShowElementMenu] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAddElement = (type: ElementType) => {
    if (!selectedSectionId) {
      alert('Please select a section first');
      return;
    }

    const defaultProps: Record<ElementType, any> = {
      text: { content: '<p>New text element</p>' },
      image: { src: 'https://via.placeholder.com/400x300', alt: 'Image' },
      button: { label: 'Click Me', url: '#', target: '_self' },
      form: {
        fields: [
          { label: 'Name', name: 'name', type: 'text', required: true },
          { label: 'Email', name: 'email', type: 'email', required: true },
        ],
        handler: 'email',
      },
      social: {
        icons: [
          { platform: 'twitter', url: 'https://twitter.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
        ],
      },
      embed: { embedType: 'iframe', url: '' },
      timer: { targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
      container: { display: 'flex', flexDirection: 'row', gap: '10px', content: '' },
    };

    const defaultStyle: Record<ElementType, any> = {
      text: { color: '#333333', fontSize: '16px', lineHeight: '1.6' },
      image: { maxWidth: '100%', height: 'auto' },
      button: {
        backgroundColor: '#667eea',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '6px',
        textAlign: 'center',
      },
      form: { maxWidth: '500px' },
      social: { textAlign: 'center' },
      embed: {},
      timer: { fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' },
      container: { padding: '20px', border: '1px dashed #ccc' },
    };

    const section = pageStructure?.sections.find((s) => s.id === selectedSectionId);
    if (!section) return;

    addElement(selectedSectionId, {
      type,
      order: section.elements.length,
      props: defaultProps[type],
      style: defaultStyle[type],
    });

    setShowElementMenu(false);
  };

  const handleAddSection = () => {
    addSection({
      layout: 'boxed',
      order: pageStructure?.sections.length || 0,
      padding: { top: '40px', right: '20px', bottom: '40px', left: '20px' },
      elements: [],
    });
  };

  const handleSave = async () => {
    try {
      await save();
      alert('Saved successfully!');
    } catch (error) {
      alert('Failed to save');
    }
  };

  const handlePublish = async () => {
    if (!siteId) return;

    setIsPublishing(true);
    try {
      await save();
      const result = await sitesApi.publish(siteId);
      alert(`Published successfully!\nYour site is live at: ${result.url}`);
    } catch (error: any) {
      alert(`Failed to publish: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button className="btn btn-secondary btn-sm" onClick={handleAddSection}>
          + Section
        </button>

        <div className="element-menu-wrapper">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowElementMenu(!showElementMenu)}
          >
            + Element
          </button>

          {showElementMenu && (
            <div className="element-menu">
              <button onClick={() => handleAddElement('text')}>Text</button>
              <button onClick={() => handleAddElement('image')}>Image</button>
              <button onClick={() => handleAddElement('button')}>Button</button>
              <button onClick={() => handleAddElement('form')}>Form</button>
              <button onClick={() => handleAddElement('social')}>Social Icons</button>
              <button onClick={() => handleAddElement('embed')}>Embed</button>
              <button onClick={() => handleAddElement('timer')}>Timer</button>
              <button onClick={() => handleAddElement('container')}>Container</button>
            </div>
          )}
        </div>
      </div>

      <div className="toolbar-group">
        <button className="btn btn-secondary btn-sm" onClick={undo} disabled={!canUndo()}>
          Undo
        </button>
        <button className="btn btn-secondary btn-sm" onClick={redo} disabled={!canRedo()}>
          Redo
        </button>
      </div>

      <div className="toolbar-group">
        <button
          className={`btn btn-secondary btn-sm ${previewMode === 'desktop' ? 'active' : ''}`}
          onClick={() => setPreviewMode('desktop')}
        >
          Desktop
        </button>
        <button
          className={`btn btn-secondary btn-sm ${previewMode === 'mobile' ? 'active' : ''}`}
          onClick={() => setPreviewMode('mobile')}
        >
          Mobile
        </button>
      </div>

      <div className="toolbar-group">
        <button className="btn btn-secondary btn-sm" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button className="btn btn-primary btn-sm" onClick={handlePublish} disabled={isPublishing}>
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};
