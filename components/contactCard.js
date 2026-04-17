function createContactCard(contact, onDelete, onEdit, onUpdateNotes) {
  const card = document.createElement('div');
  card.className = 'contact-card-wrapper';

  const statusClass = 'status-' + contact.status.replace(' ', '-');

  function renderNotesList(notes) {
    const list = card.querySelector('.notes-list');
    list.innerHTML = notes.length === 0 ? '<p class="no-notes">No notes yet.</p>' : notes.map((n, index) => `
      <div class="note-item" data-index="${index}">
        <div class="note-view">
          <span class="note-text">${n.text}</span>
          <span class="note-date">${new Date(n.createdAt).toLocaleDateString()}</span>
          <div class="note-actions">
            <button class="note-edit-btn" data-index="${index}">Edit</button>
            <button class="note-delete-btn" data-index="${index}">Delete</button>
          </div>
        </div>
        <div class="note-edit-row" style="display:none;">
          <input class="note-edit-input" type="text" value="${n.text}" />
          <button class="note-save-btn" data-index="${index}">Save</button>
          <button class="note-cancel-btn" data-index="${index}">Cancel</button>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.note-edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const item = list.querySelector(`.note-item[data-index="${index}"]`);
        item.querySelector('.note-view').style.display = 'none';
        item.querySelector('.note-edit-row').style.display = 'flex';
      });
    });

    list.querySelectorAll('.note-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const item = list.querySelector(`.note-item[data-index="${index}"]`);
        item.querySelector('.note-view').style.display = 'flex';
        item.querySelector('.note-edit-row').style.display = 'none';
      });
    });

    list.querySelectorAll('.note-save-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const item = list.querySelector(`.note-item[data-index="${index}"]`);
        const newText = item.querySelector('.note-edit-input').value.trim();
        if (!newText) return;

        const updatedNotes = [...contact.notes];
        updatedNotes[index] = { ...updatedNotes[index], text: newText };
        contact = { ...contact, notes: updatedNotes };
        onUpdateNotes(contact);
        renderNotesList(contact.notes);
      });
    });

    list.querySelectorAll('.note-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const updatedNotes = contact.notes.filter((_, i) => i !== index);
        contact = { ...contact, notes: updatedNotes };
        onUpdateNotes(contact);
        renderNotesList(contact.notes);
      });
    });
  }

  card.innerHTML = `
    <div class="contact-card">
      <span>${contact.name}</span>
      <span>${contact.company}</span>
      <span>${contact.email}</span>
      <span>${contact.phone}</span>
      <span>${contact.followUpDate || 'Not set'}</span>
      <span><span class="status-badge ${statusClass}">${contact.status}</span></span>
      <div class="card-actions">
        <button class="notes-btn">Notes ${contact.notes.length > 0 ? `(${contact.notes.length})` : ''}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
    <div class="notes-panel" style="display:none;">
      <div class="notes-list"></div>
      <div class="note-input-row">
        <input class="note-input" type="text" placeholder="Add a note..." />
        <button class="note-submit-btn">Add</button>
      </div>
    </div>
  `;

  renderNotesList(contact.notes);

  card.querySelector('.notes-btn').addEventListener('click', () => {
    const panel = card.querySelector('.notes-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });

  card.querySelector('.edit-btn').addEventListener('click', () => {
    onEdit(contact);
  });

  card.querySelector('.delete-btn').addEventListener('click', () => {
    onDelete(contact.id);
  });

  card.querySelector('.note-submit-btn').addEventListener('click', () => {
    const input = card.querySelector('.note-input');
    const text = input.value.trim();
    if (!text) return;

    const newNote = { text, createdAt: new Date().toISOString() };
    contact = { ...contact, notes: [...contact.notes, newNote] };
    onUpdateNotes(contact);
    input.value = '';
    renderNotesList(contact.notes);
  });

  return card;
}