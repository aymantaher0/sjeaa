import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { sitesApi } from '../api/mockSites';
import { Site } from '../types';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteSlug, setNewSiteSlug] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const data = await sitesApi.getAll();
      setSites(data);
    } catch (err) {
      console.error('Failed to load sites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const site = await sitesApi.create(newSiteName, newSiteSlug);
      setSites([...sites, site]);
      setShowCreateModal(false);
      setNewSiteName('');
      setNewSiteSlug('');
      navigate(`/builder/${site.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create site');
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    if (!confirm('Are you sure you want to delete this site?')) return;

    try {
      await sitesApi.delete(siteId);
      setSites(sites.filter((s) => s.id !== siteId));
    } catch (err) {
      alert('Failed to delete site');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1>My Sites</h1>
          <div className="header-actions">
            <span className="user-email">{user?.email}</span>
            <span className="user-plan">{user?.plan_type}</span>
            <button className="btn btn-secondary btn-sm" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {isLoading ? (
          <div className="loading">Loading sites...</div>
        ) : (
          <>
            <div className="sites-grid">
              <div className="site-card site-card-create" onClick={() => setShowCreateModal(true)}>
                <div className="create-icon">+</div>
                <p>Create New Site</p>
              </div>

              {sites.map((site) => (
                <div key={site.id} className="site-card">
                  <div className="site-card-header">
                    <h3>{site.name}</h3>
                    <span className={`status status-${site.status}`}>{site.status}</span>
                  </div>
                  <p className="site-slug">{site.slug}</p>
                  <div className="site-card-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/builder/${site.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteSite(site.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {sites.length === 0 && (
              <div className="empty-state">
                <p>No sites yet. Create your first site to get started!</p>
              </div>
            )}
          </>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Site</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleCreateSite}>
              <div className="form-group">
                <label className="label">Site Name</label>
                <input
                  type="text"
                  value={newSiteName}
                  onChange={(e) => {
                    setNewSiteName(e.target.value);
                    if (!newSiteSlug) {
                      setNewSiteSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="input"
                  required
                  placeholder="My Awesome Site"
                />
              </div>

              <div className="form-group">
                <label className="label">URL Slug</label>
                <input
                  type="text"
                  value={newSiteSlug}
                  onChange={(e) =>
                    setNewSiteSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'))
                  }
                  className="input"
                  required
                  placeholder="my-awesome-site"
                  pattern="[a-z0-9-]+"
                />
                <small className="input-hint">Only lowercase letters, numbers, and hyphens</small>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
