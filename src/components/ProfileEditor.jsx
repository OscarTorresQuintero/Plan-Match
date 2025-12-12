import React, { useState } from 'react';
import { updateProfile, saveProfileForEmail } from '../service/api.js';

// Small profile editor: edit name, description and avatar (as data URL)
export default function ProfileEditor({ profile, onSave }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.name || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [avatar, setAvatar] = useState(profile?.avatar || '');
  const [saving, setSaving] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target.result);
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true);
    const updated = { ...profile, name: name || profile.name, description: description || profile.description, avatar };
    try {
      if (profile?.id) {
        const res = await updateProfile(profile.id, updated);
        onSave && onSave(res);
      } else {
        // local fallback: update localStorage.profiles
        try {
          const profilesRaw = localStorage.getItem('profiles');
          const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
          const email = updated.email || 'anon';
          profiles[email] = updated;
          localStorage.setItem('profiles', JSON.stringify(profiles));
          // also update user in localStorage if exists
          const userRaw = localStorage.getItem('user');
          if (userRaw) {
            try {
              const user = JSON.parse(userRaw);
              user.name = updated.name;
              localStorage.setItem('user', JSON.stringify(user));
            } catch { /* ignore */ }
          }
          // Optionally try to save to mockapi via saveProfileForEmail
          try { await saveProfileForEmail(updated.email || 'anon', updated); } catch { /* ignore */ }
          onSave && onSave(updated);
        } catch (e) {
          console.error('Error saving profile locally', e);
          onSave && onSave(updated);
        }
      }
    } catch (err) {
      console.warn('Error updating profile on server, falling back to local', err);
      // fallback local update
      try {
        const profilesRaw = localStorage.getItem('profiles');
        const profiles = profilesRaw ? JSON.parse(profilesRaw) : {};
        const email = updated.email || 'anon';
        profiles[email] = updated;
        localStorage.setItem('profiles', JSON.stringify(profiles));
        onSave && onSave(updated);
      } catch (e) {
        console.error('Fallback local save failed', e);
        onSave && onSave(updated);
      }
    }
    setSaving(false);
    setEditing(false);
  };

  if (!profile) return null;

  return (
    <div className="flex items-center gap-3">
      {!editing ? (
        <div className="flex items-center gap-3">
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">{(profile.name||'U').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
          )}
          <button onClick={() => setEditing(true)} className="text-sm px-3 py-1 bg-white/20 text-white rounded">Editar perfil</button>
        </div>
      ) : (
        <div className="bg-white/10 p-3 rounded flex items-center gap-3">
          <div className="flex flex-col items-center">
            {avatar ? <img src={avatar} alt="avatar" className="w-14 h-14 rounded-full object-cover mb-2" /> : <div className="w-14 h-14 rounded-full bg-white/20" />}
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="text-xs text-gray-700" />
          </div>
          <div className="flex-1">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 px-2 py-1 rounded text-black" placeholder="Nombre" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-2 px-2 py-1 rounded text-black" placeholder="Descripción" />
            <div className="flex gap-2">
              <button disabled={saving} onClick={save} className="px-3 py-1 bg-green-600 text-white rounded">{saving ? 'Guardando...' : 'Guardar'}</button>
              <button disabled={saving} onClick={() => setEditing(false)} className="px-3 py-1 bg-gray-200 rounded">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
