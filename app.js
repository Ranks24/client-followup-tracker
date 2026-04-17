function openForm(existingContact = null) {
  const container = document.getElementById('form-container');
  container.innerHTML = '';
  container.classList.add('active');

  const form = createContactForm((contact) => {
    if (existingContact) {
      updateContact(contact);
    } else {
      saveContact(contact);
    }
    container.classList.remove('active');
    container.innerHTML = '';
    renderContacts();
  }, existingContact);

  container.appendChild(form);
}

function getFilteredAndSorted(contacts) {
  const filterValue = document.getElementById('filter-status').value;
  const sortValue = document.getElementById('sort-by').value;

  let result = [...contacts];

  if (filterValue !== 'All') {
    result = result.filter(c => c.status === filterValue);
  }

  result.sort((a, b) => {
    if (sortValue === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortValue === 'followUpDate') {
      if (!a.followUpDate) return 1;
      if (!b.followUpDate) return -1;
      return new Date(a.followUpDate) - new Date(b.followUpDate);
    }
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  return result;
}

function renderContacts() {
  const list = document.getElementById('contact-list');
  list.innerHTML = '';

  const contacts = getFilteredAndSorted(getAllContacts());

  if (contacts.length === 0) {
    list.innerHTML = '<p style="padding:24px;color:#666;">No contacts found.</p>';
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
    const card = createContactCard(
      contact,
      (id) => {
        deleteContact(id);
        renderContacts();
      },
      (contact) => {
        openForm(contact);
      },
      (updatedContact) => {
        updateContact(updatedContact);
        renderContacts();
      }
    );
    list.appendChild(card);
  });
}

document.getElementById('add-contact-btn').addEventListener('click', () => {
  openForm();
});

document.getElementById('filter-status').addEventListener('change', renderContacts);
document.getElementById('sort-by').addEventListener('change', renderContacts);

renderContacts();