"use client";
import React, { useState, useRef } from 'react';
import { FiUpload, FiSearch, FiGrid, FiList, FiTrash2, FiCopy, FiEdit2, FiImage, FiX, FiCheckCircle, FiAlertCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function MediaLibraryClient({ initialMedia = [], initialTotal = 0, initialFolders = [], apiBase }) {
  const [media, setMedia] = useState(initialMedia);
  const [total, setTotal] = useState(initialTotal);
  const [folders, setFolders] = useState(initialFolders);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [editData, setEditData] = useState({ alt: '', title: '', folder: '' });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  // Fetch media
  const fetchMedia = async (page = 1, searchQuery = '', folder = '') => {
    try {
      const params = new URLSearchParams({
        websiteId: 'default',
        limit: '24',
        page: page.toString(),
      });
      if (searchQuery) params.set('search', searchQuery);
      if (folder) params.set('folder', folder);

      const res = await fetch(`${apiBase}/api/cms/media?${params}`);
      if (res.ok) {
        const data = await res.json();
        setMedia(data.media || []);
        setTotal(data.total || 0);
        setFolders(data.folders || []);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error('Failed to fetch media:', err);
    }
  };

  // Upload files
  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    let uploaded = 0;
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('websiteId', 'default');
        formData.append('folder', selectedFolder || 'general');

        const res = await fetch(`${apiBase}/api/cms/media`, {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setMedia(prev => [data.media, ...prev]);
          setTotal(prev => prev + 1);
          uploaded++;
        }
      } catch (err) {
        console.error('Upload failed for:', file.name, err);
      }
    }

    showMessage(`${uploaded} file(s) uploaded successfully!`, 'success');
    setUploading(false);
  };

  // Delete media
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;

    try {
      const res = await fetch(`${apiBase}/api/cms/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMedia(prev => prev.filter(m => m._id !== id));
        setTotal(prev => prev - 1);
        if (selectedMedia?._id === id) setSelectedMedia(null);
        showMessage('Media deleted successfully', 'success');
      }
    } catch (err) {
      showMessage('Failed to delete media', 'error');
    }
  };

  // Update media metadata
  const handleUpdateMeta = async () => {
    if (!selectedMedia) return;
    try {
      const res = await fetch(`${apiBase}/api/cms/media`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedMedia._id, ...editData }),
      });

      if (res.ok) {
        setMedia(prev => prev.map(m =>
          m._id === selectedMedia._id ? { ...m, ...editData } : m
        ));
        showMessage('Media updated successfully', 'success');
        setSelectedMedia(null);
      }
    } catch (err) {
      showMessage('Failed to update media', 'error');
    }
  };

  // Copy URL
  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    showMessage('URL copied to clipboard!', 'success');
  };

  // Drag & Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(Array.from(e.dataTransfer.files));
    }
  };

  // Search handler
  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchMedia(1, val, selectedFolder);
  };

  // Format file size
  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const totalPages = Math.ceil(total / 24);

  return (
    <div className="space-y-6">
      {/* Message */}
      {message && (
        <div
          className={`rounded-md px-4 py-3 text-sm font-medium flex items-center gap-2
            ${messageType === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300'
              : 'bg-red-100 text-red-700 border border-red-300'}`}
        >
          {messageType === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message}
        </div>
      )}

      {/* Upload Zone */}
      <div
        className={`bg-white rounded-lg shadow p-8 border-2 border-dashed transition-colors text-center cursor-pointer
          ${dragActive ? 'border-[#20507C] bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(Array.from(e.target.files))}
        />
        <FiUpload className={`mx-auto text-3xl mb-3 ${dragActive ? 'text-[#20507C]' : 'text-gray-400'}`} />
        {uploading ? (
          <p className="text-sm text-gray-600">Uploading...</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">
              {dragActive ? 'Drop files here' : 'Click or drag & drop to upload'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP, SVG up to 10MB</p>
          </>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm
                           focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none transition"
              />
            </div>
            <select
              value={selectedFolder}
              onChange={(e) => { setSelectedFolder(e.target.value); fetchMedia(1, search, e.target.value); }}
              className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 text-sm
                         focus:border-[#20507C] focus:ring-2 focus:ring-[#E46704] focus:outline-none"
            >
              <option value="">All Folders</option>
              {folders.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{total} files</span>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${view === 'grid' ? 'bg-[#E46704] text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FiGrid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${view === 'list' ? 'bg-[#E46704] text-white' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FiList size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      {media.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <FiImage className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Media Files</h3>
          <p className="text-sm text-gray-400">Upload images to get started.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map(item => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow overflow-hidden group cursor-pointer hover:shadow-md transition"
              onClick={() => { setSelectedMedia(item); setEditData({ alt: item.alt || '', title: item.title || '', folder: item.folder || '' }); }}
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.alt || item.fileName}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = '/file.svg'; }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); copyUrl(item.url); }}
                      className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      title="Copy URL"
                    >
                      <FiCopy size={14} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                      className="p-2 bg-white rounded-full shadow hover:bg-red-50 text-red-500"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs text-gray-700 truncate font-medium">{item.originalName || item.fileName}</p>
                <p className="text-[10px] text-gray-400">{formatSize(item.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Preview</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Folder</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Uploaded</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {media.map(item => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={item.thumbnailUrl || item.url}
                      alt={item.alt || ''}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.originalName || item.fileName}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">{formatSize(item.size)}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">{item.folder || '—'}</td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => copyUrl(item.url)} className="p-1.5 text-gray-400 hover:text-gray-600" title="Copy URL">
                        <FiCopy size={14} />
                      </button>
                      <button
                        onClick={() => { setSelectedMedia(item); setEditData({ alt: item.alt || '', title: item.title || '', folder: item.folder || '' }); }}
                        className="p-1.5 text-gray-400 hover:text-blue-600" title="Edit"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 text-gray-400 hover:text-red-600" title="Delete">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => fetchMedia(currentPage - 1, search, selectedFolder)}
            disabled={currentPage <= 1}
            className="p-2 rounded border border-gray-300 disabled:opacity-30 hover:bg-gray-50"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => fetchMedia(currentPage + 1, search, selectedFolder)}
            disabled={currentPage >= totalPages}
            className="p-2 rounded border border-gray-300 disabled:opacity-30 hover:bg-gray-50"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedMedia(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Media Details</h3>
              <button onClick={() => setSelectedMedia(null)} className="p-1 hover:bg-gray-100 rounded">
                <FiX size={20} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center min-h-[200px]">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt || ''}
                  className="max-w-full max-h-[300px] object-contain"
                />
              </div>
              {/* Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">File Name</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMedia.originalName}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-500">Size:</span> <span className="font-medium">{formatSize(selectedMedia.size)}</span></div>
                  <div><span className="text-gray-500">Dimensions:</span> <span className="font-medium">{selectedMedia.width}×{selectedMedia.height}</span></div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Alt Text</label>
                  <input
                    value={editData.alt}
                    onChange={(e) => setEditData(prev => ({ ...prev, alt: e.target.value }))}
                    className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#20507C] focus:ring-1 focus:ring-[#E46704] outline-none"
                    placeholder="Describe the image..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Title</label>
                  <input
                    value={editData.title}
                    onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#20507C] focus:ring-1 focus:ring-[#E46704] outline-none"
                    placeholder="Image title..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">URL</label>
                  <div className="flex gap-1">
                    <input
                      readOnly
                      value={selectedMedia.url}
                      className="flex-1 rounded border border-gray-200 px-3 py-1.5 text-xs text-gray-600 bg-gray-50"
                    />
                    <button
                      onClick={() => copyUrl(selectedMedia.url)}
                      className="px-3 py-1.5 bg-gray-100 rounded text-xs hover:bg-gray-200 transition"
                    >
                      <FiCopy size={12} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleUpdateMeta}
                    className="flex-1 px-4 py-2 bg-[#E46704] text-white text-sm rounded hover:bg-[#E46704] transition font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMedia._id)}
                    className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded hover:bg-red-100 transition font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
