"use client";
import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiUsers, 
  FiEdit2, 
  FiTrash2, 
  FiShield, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiX, 
  FiUserCheck, 
  FiUserX,
  FiCheck,
  FiLock,
  FiCheckSquare,
  FiSquare
} from 'react-icons/fi';
import { 
  ADMIN_PAGE_SECTIONS, 
  ALL_ADMIN_PAGE_PATHS, 
  ROLE_DEFAULT_PAGES, 
  ROLES 
} from '@/lib/admin-permissions';

export default function UsersClient({ initialUsers = [], websites = [], apiBase = "" }) {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  
  // Edit User State
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', password: '', role: 'editor', allowedPages: [] });
  const [editLoading, setEditLoading] = useState(false);

  // Dedicated Page Permissions Modal State
  const [permUser, setPermUser] = useState(null);
  const [permPages, setPermPages] = useState([]);
  const [permLoading, setPermLoading] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  // Create User Form State
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'seo', 
    assignedWebsites: [],
    allowedPages: ROLE_DEFAULT_PAGES['seo'] || []
  });
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetch(`${apiBase}/api/cms/users`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.users)) {
            setUsers(data.users);
          }
        }
      } catch (e) {
        console.error('Failed to load users from API:', e);
      }
    };
    loadUsers();
  }, [apiBase]);

  const showMsg = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4500);
  };

  // Sync with current user's localStorage if they modified their own account
  const syncLocalUserIfSelf = (userId, updatedFields) => {
    try {
      if (typeof window !== "undefined") {
        const currentStr = localStorage.getItem("user");
        if (currentStr) {
          const current = JSON.parse(currentStr);
          if (current.email && updatedFields.email && current.email.toLowerCase() === updatedFields.email.toLowerCase()) {
            const merged = { ...current, ...updatedFields };
            localStorage.setItem("user", JSON.stringify(merged));
          }
        }
      }
    } catch (e) {
      console.error("Local sync error:", e);
    }
  };

  // Handle Role Change in Create Modal
  const handleCreateRoleChange = (newRole) => {
    const defaultPages = ROLE_DEFAULT_PAGES[newRole] || [];
    setForm(p => ({
      ...p,
      role: newRole,
      allowedPages: defaultPages
    }));
  };

  // Toggle single page checkbox in Create Modal
  const toggleCreatePage = (pagePath) => {
    setForm(p => {
      const current = Array.isArray(p.allowedPages) ? p.allowedPages : [];
      if (current.includes(pagePath)) {
        return { ...p, allowedPages: current.filter(path => path !== pagePath) };
      } else {
        return { ...p, allowedPages: [...current, pagePath] };
      }
    });
  };

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      showMsg('Please fill all required fields (Name, Email, Password)', 'error');
      return;
    }
    setCreateLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => [data.user, ...prev]);
        showMsg('User created successfully with custom page permissions!', 'success');
        setShowModal(false);
        setForm({ 
          name: '', 
          email: '', 
          password: '', 
          role: 'seo', 
          assignedWebsites: [], 
          allowedPages: ROLE_DEFAULT_PAGES['seo'] || [] 
        });
      } else {
        showMsg(data.error || 'Failed to create user', 'error');
      }
    } catch (err) {
      showMsg('Error: ' + err.message, 'error');
    }
    setCreateLoading(false);
  };

  // Role change in table
  const handleRoleChange = async (userId, newRole) => {
    const targetUser = users.find(u => u._id === userId);
    const newAllowedPages = newRole === 'super_admin' ? ["*"] : (ROLE_DEFAULT_PAGES[newRole] || []);
    
    try {
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: userId, 
          role: newRole,
          allowedPages: newAllowedPages
        }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole, allowedPages: newAllowedPages } : u));
        syncLocalUserIfSelf(userId, { role: newRole, allowedPages: newAllowedPages, email: targetUser?.email });
        showMsg(`Role updated to ${newRole.replace('_', ' ')} with default page permissions`, 'success');
      } else {
        showMsg('Failed to update role', 'error');
      }
    } catch (err) {
      showMsg('Failed to update role', 'error');
    }
  };

  // Open Edit User Modal
  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({ 
      name: user.name || '', 
      email: user.email || '', 
      password: '',
      role: user.role || 'editor',
      allowedPages: Array.isArray(user.allowedPages) ? [...user.allowedPages] : (ROLE_DEFAULT_PAGES[user.role] || [])
    });
  };

  const toggleEditPage = (pagePath) => {
    setEditForm(p => {
      const current = Array.isArray(p.allowedPages) ? p.allowedPages : [];
      if (current.includes(pagePath)) {
        return { ...p, allowedPages: current.filter(path => path !== pagePath) };
      } else {
        return { ...p, allowedPages: [...current, pagePath] };
      }
    });
  };

  const handleEdit = async () => {
    if (!editForm.name || !editForm.email) {
      showMsg('Name and Email are required', 'error');
      return;
    }
    setEditLoading(true);
    try {
      const body = { 
        id: editUser._id, 
        name: editForm.name, 
        email: editForm.email,
        role: editForm.role,
        allowedPages: editForm.role === 'super_admin' ? ["*"] : editForm.allowedPages
      };
      if (editForm.password.trim()) body.password = editForm.password.trim();

      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(prev => prev.map(u =>
          u._id === editUser._id
            ? { ...u, name: editForm.name, email: editForm.email, role: editForm.role, allowedPages: body.allowedPages }
            : u
        ));
        syncLocalUserIfSelf(editUser._id, { name: editForm.name, email: editForm.email, role: editForm.role, allowedPages: body.allowedPages });
        showMsg('User details & page permissions updated successfully!', 'success');
        setEditUser(null);
      } else {
        showMsg(data.error || 'Failed to update user', 'error');
      }
    } catch (err) {
      showMsg('Error: ' + err.message, 'error');
    }
    setEditLoading(false);
  };

  // Open Dedicated Permissions Modal
  const openPermissionsModal = (user) => {
    setPermUser(user);
    const existing = Array.isArray(user.allowedPages) 
      ? user.allowedPages 
      : (ROLE_DEFAULT_PAGES[user.role] || []);
    setPermPages([...existing]);
  };

  const togglePermPage = (pagePath) => {
    setPermPages(prev => {
      if (prev.includes(pagePath)) {
        return prev.filter(p => p !== pagePath);
      } else {
        return [...prev, pagePath];
      }
    });
  };

  const togglePermSection = (sectionPages) => {
    const sectionPaths = sectionPages.map(p => p.id);
    const allSelected = sectionPaths.every(p => permPages.includes(p));
    if (allSelected) {
      setPermPages(prev => prev.filter(p => !sectionPaths.includes(p)));
    } else {
      setPermPages(prev => Array.from(new Set([...prev, ...sectionPaths])));
    }
  };

  const selectAllPerms = () => {
    setPermPages([...ALL_ADMIN_PAGE_PATHS]);
  };

  const clearAllPerms = () => {
    setPermPages([]);
  };

  const resetToRoleDefaults = () => {
    if (!permUser) return;
    const defaults = ROLE_DEFAULT_PAGES[permUser.role] || [];
    setPermPages([...defaults]);
  };

  const handleSavePermissions = async () => {
    if (!permUser) return;
    setPermLoading(true);
    try {
      const finalPages = permUser.role === 'super_admin' ? ["*"] : permPages;
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: permUser._id, 
          allowedPages: finalPages
        }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === permUser._id ? { ...u, allowedPages: finalPages } : u));
        syncLocalUserIfSelf(permUser._id, { allowedPages: finalPages, email: permUser.email });
        showMsg(`Permissions updated for ${permUser.name}! (${finalPages.length} pages enabled)`, 'success');
        setPermUser(null);
      } else {
        const data = await res.json().catch(() => ({}));
        showMsg(data.error || 'Failed to update permissions', 'error');
      }
    } catch (err) {
      showMsg('Error: ' + err.message, 'error');
    }
    setPermLoading(false);
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to permanently delete this user?')) return;
    try {
      const res = await fetch(`${apiBase}/api/cms/users?id=${userId}`, { method: 'DELETE' });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        showMsg('User deleted successfully', 'success');
      } else {
        showMsg('Failed to delete user', 'error');
      }
    } catch (err) {
      showMsg('Failed to delete user', 'error');
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    if (!confirm(`Are you sure you want to ${newStatus === 'active' ? 'activate' : 'deactivate'} this user?`)) return;
    try {
      const res = await fetch(`${apiBase}/api/cms/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, status: newStatus }),
      });
      if (res.ok) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
        showMsg(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
      } else {
        showMsg('Failed to update status', 'error');
      }
    } catch (err) {
      showMsg('Failed to update status', 'error');
    }
  };

  const getRoleStyle = (role) => {
    const r = ROLES.find(r => r.value === role);
    return r ? r.color : 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`rounded-md px-4 py-3 text-sm font-medium flex items-center gap-2 transition-all ${
          messageType === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
        }`}>
          {messageType === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message}
        </div>
      )}

      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-gray-800">Admin Users & Granular Access</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Assign custom page-by-page access so users only see their designated sidebar sections and routes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-3 text-xs text-gray-500">
            <span className="bg-gray-100 px-2.5 py-1 rounded-md font-medium">{users.length} Total Users</span>
            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md font-medium border border-green-200">
              {users.filter(u => u.status === 'active').length} Active
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <FiPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      {users.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <FiUsers className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Users Found</h3>
          <p className="text-sm text-gray-400">Click &quot;Add User&quot; to create your first admin account.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-[11px] font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Page Access Permissions</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {users.map(user => {
                  const isSuper = user.role === 'super_admin';
                  const allowedList = Array.isArray(user.allowedPages) ? user.allowedPages : (ROLE_DEFAULT_PAGES[user.role] || []);
                  const allowedCount = isSuper ? ALL_ADMIN_PAGE_PATHS.length : allowedList.length;

                  return (
                    <tr key={user._id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#20507C] flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-xs">
                            {user.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 cursor-pointer outline-none ${getRoleStyle(user.role)}`}
                        >
                          {ROLES.map(r => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {isSuper ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                            <FiLock size={12} /> Full Access (All Pages)
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => openPermissionsModal(user)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition shadow-2xs cursor-pointer group"
                            title="Click to check or uncheck individual sidebar pages"
                          >
                            <FiShield className="text-[#34953C] group-hover:scale-110 transition-transform" />
                            <span className="font-semibold">{allowedCount} / {ALL_ADMIN_PAGE_PATHS.length} Pages Allowed</span>
                            <span className="text-[10px] text-emerald-700 font-semibold bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                              Edit Access
                            </span>
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Manage Permissions */}
                          <button
                            type="button"
                            onClick={() => openPermissionsModal(user)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer"
                            title="Manage Single Page Permissions"
                          >
                            <FiShield size={16} />
                          </button>
                          
                          {/* Edit User */}
                          <button
                            type="button"
                            onClick={() => openEdit(user)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Edit User Details"
                          >
                            <FiEdit2 size={16} />
                          </button>

                          {/* Toggle Active Status */}
                          {user.status === 'active' ? (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user._id, 'active')}
                              className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
                              title="Deactivate Account"
                            >
                              <FiUserX size={16} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(user._id, 'inactive')}
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors cursor-pointer"
                              title="Activate Account"
                            >
                              <FiUserCheck size={16} />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(user._id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                            title="Delete Account"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Role Permissions Reference Table */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiShield size={16} className="text-[#34953C]" />
            <h3 className="text-sm font-bold text-gray-800">Role Access Presets Overview</h3>
          </div>
          <span className="text-xs text-gray-500">
            Note: You can override any user&apos;s permissions by clicking <strong>&quot;Edit Access&quot;</strong> on their row.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                <th className="px-4 py-2.5 text-left w-56">Sidebar Page</th>
                {ROLES.map(r => (
                  <th key={r.value} className="px-3 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${r.color}`}>
                      {r.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {ADMIN_PAGE_SECTIONS.map(section => (
                <React.Fragment key={section.id}>
                  <tr className="bg-[#f8fafc]">
                    <td colSpan={ROLES.length + 1} className="px-4 py-2 text-[11px] font-bold text-gray-700 uppercase tracking-wide">
                      📂 {section.label}
                    </td>
                  </tr>
                  {section.pages.map(page => (
                    <tr key={page.id} className="hover:bg-gray-50/60">
                      <td className="px-4 py-2 text-xs text-gray-800 font-medium">
                        {page.label}
                        <span className="ml-1 text-[10px] text-gray-400 font-normal">({page.id})</span>
                      </td>
                      {ROLES.map(r => {
                        const defaults = ROLE_DEFAULT_PAGES[r.value] || [];
                        const hasAccess = defaults.includes('*') || defaults.includes(page.id);

                        return (
                          <td key={r.value} className="px-3 py-2 text-center">
                            {hasAccess ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700" title="Enabled by default">
                                <FiCheck size={12} />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-300" title="Disabled by default">
                                —
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          MODAL 1: Dedicated Page Permissions Modal (Checkbox for every page)
         ──────────────────────────────────────────────────────────────────── */}
      {permUser && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-5"
          onClick={() => setPermUser(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <FiShield size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Page Access Permissions — {permUser.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      User Email: <span className="font-semibold">{permUser.email}</span> • Current Role: <span className="capitalize font-semibold text-[#20507C]">{permUser.role.replace('_', ' ')}</span>
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setPermUser(null)} 
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Quick Action Presets Toolbar */}
            <div className="px-6 py-2.5 bg-emerald-50/50 border-b border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-emerald-900">
                {permPages.length} of {ALL_ADMIN_PAGE_PATHS.length} pages enabled
              </span>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={resetToRoleDefaults}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-medium transition cursor-pointer"
                >
                  Reset to {permUser.role.replace('_', ' ')} Defaults
                </button>
                <button
                  type="button"
                  onClick={selectAllPerms}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-md font-medium transition cursor-pointer"
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAllPerms}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-md font-medium transition cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Checkbox Sections List (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gray-50/30">
              {ADMIN_PAGE_SECTIONS.map(section => {
                const sectionPaths = section.pages.map(p => p.id);
                const selectedCount = sectionPaths.filter(p => permPages.includes(p)).length;
                const isAllSelected = selectedCount === sectionPaths.length;

                return (
                  <div key={section.id} className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                    {/* Section Header */}
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                          {section.label}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-semibold">
                          {selectedCount} / {section.pages.length} selected
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => togglePermSection(section.pages)}
                        className="text-xs font-semibold text-[#20507C] hover:text-[#34953C] transition cursor-pointer"
                      >
                        {isAllSelected ? "Deselect All in Section" : "Select All in Section"}
                      </button>
                    </div>

                    {/* Page Checkboxes Grid */}
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {section.pages.map(page => {
                        const isChecked = permPages.includes(page.id);

                        return (
                          <label
                            key={page.id}
                            onClick={() => togglePermPage(page.id)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg border text-left transition-all cursor-pointer select-none ${
                              isChecked
                                ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-300"
                                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // handled by parent label onClick
                              className="mt-0.5 w-4 h-4 text-[#34953C] rounded border-gray-300 focus:ring-[#34953C] cursor-pointer"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className={`text-xs font-semibold ${isChecked ? 'text-emerald-950 font-bold' : 'text-gray-800'}`}>
                                  {page.label}
                                </span>
                                <span className="text-[10px] font-mono text-gray-400 truncate">
                                  {page.id}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-0.5 leading-snug line-clamp-1">
                                {page.desc}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-gray-200 bg-white flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Only the selected pages will appear in this user&apos;s admin sidebar.
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setPermUser(null)}
                  className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={permLoading}
                  onClick={handleSavePermissions}
                  className="px-5 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50 cursor-pointer"
                >
                  {permLoading ? "Saving..." : "Save Page Access"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────
          MODAL 2: Create User Modal (with embedded page checkboxes)
         ──────────────────────────────────────────────────────────────────── */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-5"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
              <h3 className="text-base font-bold text-gray-900">Create New Admin User</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Rehaan Bhii SEO"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="user@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Password *</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Min 6 characters"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role Preset</label>
                  <select
                    value={form.role}
                    onChange={(e) => handleCreateRoleChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none cursor-pointer"
                  >
                    {ROLES.map(r => (
                      <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Page Permissions Checklist */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-800">
                    Accessible Sidebar Pages ({form.allowedPages?.length || 0} selected)
                  </label>
                  <span className="text-[11px] text-gray-500">
                    Check or uncheck individual pages below:
                  </span>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto p-3 bg-gray-50/80 rounded-xl border border-gray-200">
                  {ADMIN_PAGE_SECTIONS.map(section => (
                    <div key={section.id} className="space-y-1.5">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                        {section.label}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {section.pages.map(page => {
                          const isChecked = form.allowedPages?.includes(page.id);

                          return (
                            <label
                              key={page.id}
                              onClick={() => toggleCreatePage(page.id)}
                              className={`flex items-center gap-2.5 p-2 rounded-lg border text-left cursor-pointer transition select-none ${
                                isChecked
                                  ? "bg-emerald-50/80 border-emerald-300"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="w-3.5 h-3.5 text-[#34953C] rounded border-gray-300 cursor-pointer"
                              />
                              <span className={`text-xs truncate ${isChecked ? 'font-bold text-emerald-950' : 'text-gray-700'}`}>
                                {page.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-gray-200 bg-white flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={createLoading}
                onClick={handleCreate}
                className="px-5 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50 cursor-pointer"
              >
                {createLoading ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────
          MODAL 3: Edit User Modal (Name, Email, Password, Role, Allowed Pages)
         ──────────────────────────────────────────────────────────────────── */}
      {editUser && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-5"
          onClick={() => setEditUser(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
              <div>
                <h3 className="text-base font-bold text-gray-900">Edit User & Access</h3>
                <p className="text-xs text-gray-400 mt-0.5">Editing: {editUser.name} ({editUser.email})</p>
              </div>
              <button 
                onClick={() => setEditUser(null)} 
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Full name"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="user@example.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    New Password <span className="font-normal text-gray-400">(leave blank to keep current)</span>
                  </label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) => setEditForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Leave blank to keep unchanged"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-900 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                  <select
                    value={editForm.role}
                    onChange={(e) => {
                      const r = e.target.value;
                      setEditForm(p => ({ ...p, role: r, allowedPages: ROLE_DEFAULT_PAGES[r] || [] }));
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 focus:border-[#20507C] focus:ring-1 focus:ring-[#34953C] outline-none cursor-pointer"
                  >
                    {ROLES.map(r => (
                      <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Page Permissions Checklist */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-800">
                    Accessible Sidebar Pages ({editForm.allowedPages?.length || 0} selected)
                  </label>
                  <span className="text-[11px] text-gray-500">
                    Toggle individual pages for this user:
                  </span>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto p-3 bg-gray-50/80 rounded-xl border border-gray-200">
                  {ADMIN_PAGE_SECTIONS.map(section => (
                    <div key={section.id} className="space-y-1.5">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                        {section.label}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {section.pages.map(page => {
                          const isChecked = editForm.allowedPages?.includes(page.id);

                          return (
                            <label
                              key={page.id}
                              onClick={() => toggleEditPage(page.id)}
                              className={`flex items-center gap-2.5 p-2 rounded-lg border text-left cursor-pointer transition select-none ${
                                isChecked
                                  ? "bg-emerald-50/80 border-emerald-300"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                                className="w-3.5 h-3.5 text-[#34953C] rounded border-gray-300 cursor-pointer"
                              />
                              <span className={`text-xs truncate ${isChecked ? 'font-bold text-emerald-950' : 'text-gray-700'}`}>
                                {page.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 border-t border-gray-200 bg-white flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={editLoading}
                onClick={handleEdit}
                className="px-5 py-2 bg-[#34953C] hover:bg-[#2b7e32] text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50 cursor-pointer"
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
