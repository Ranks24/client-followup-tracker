const STORAGE_KEY = 'cft_contacts';

function getAllContacts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveContact(contact) {
  const contacts = getAllContacts();
  contacts.push(contact);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function deleteContact(id) {
  const contacts = getAllContacts().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

function updateContact(updatedContact) {
  const contacts = getAllContacts().map(c =>
    c.id === updatedContact.id ? updatedContact : c
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}