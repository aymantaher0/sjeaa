import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuilderStore } from '../store/builderStore';
import { Toolbar } from '../components/builder/Toolbar';
import { Canvas } from '../components/builder/Canvas';
import { PropertiesPanel } from '../components/builder/PropertiesPanel';
import './Builder.css';

export const Builder: React.FC = () => {
  const { siteId } = useParams<{ siteId: string }>();
  const navigate = useNavigate();
  const { loadPageStructure } = useBuilderStore();

  useEffect(() => {
    if (!siteId) {
      navigate('/dashboard');
      return;
    }

    loadPageStructure(siteId);
  }, [siteId, navigate, loadPageStructure]);

  return (
    <div className="builder">
      <Toolbar />
      <div className="builder-content">
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
};
