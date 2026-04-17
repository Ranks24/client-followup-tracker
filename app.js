function renderContacts() {
  const list = document.getElementById('contact-list');
  list.innerHTML = '';

  const contacts = getAllContacts();

  if (contacts.length === 0) {
    list.innerHTML = '<p style="padding:24px;color:#666;">No contacts yet. Add one to get started.</p>';
    return;
  }

  const header = document.createElement('div');
  header.className = 'table-header';
  header.innerHTML = `
    <span>Name</span>
    <span>Company</span>
    <span>Email</span>
    <span>Phone</span>
    <span>Follow-Up</span>
    <span>Status</span>
    <span></span>
  `;
  list.appendChild(header);

  contacts.forEach(contact => {
    const card = createContactCard(contact, (id) => {
      deleteContact(id);
      renderContacts();
    });
    list.appendChild(card);
  });
}

document.getElementById('add-contact-btn').addEventListener('click', () => {
  const container = document.getElementById('form-container');
  container.classList.add('active');

  const form = createContactForm((contact) => {
    saveContact(contact);
    container.classList.remove('active');
    container.innerHTML = '';
    renderContacts();
  });

  container.appendChild(form);
});

renderContacts();