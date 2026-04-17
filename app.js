// app.js

// Function to get all contacts from localStorage
function getAllContacts() {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

// Function to save a contact to localStorage
function saveContact(contact) {
    const contacts = getAllContacts();
    contacts.push({ ...contact, id: Date.now() });
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Function to delete a contact from localStorage
function deleteContact(id) {
    const contacts = getAllContacts().filter(contact => contact.id !== id);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Function to create a contact card element
function createContactCard(contact, onDelete) {
    const card = document.createElement('div');
    card.className = 'contact-card';
    card.innerHTML = `
        <h3>${contact.name}</h3>
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.phone}</p>
        <button class="delete-btn" data-id="${contact.id}">Delete</button>
    `;
    card.querySelector('.delete-btn').addEventListener('click', () => onDelete(contact.id));
    return card;
}

// Function to create a contact form element
function createContactForm(onSubmit) {
    const form = document.createElement('form');
    form.innerHTML = `
        <label for="name">Name:</label>
        <input type="text" id="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" required>
        <button type="submit">Add Contact</button>
    `;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const contact = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        onSubmit(contact);
    });
    return form;
}

// Existing code
function renderContacts() {
    const list = document.getElementById('contact-list');
    list.innerHTML = '';

    const contacts = getAllContacts();

    if (contacts.length === 0) {
        list.innerHTML = '<p>No contacts yet. Add one to get started.</p>';
        return;
    }

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
    container.innerHTML = '';

    const form = createContactForm((contact) => {
        saveContact(contact);
        container.innerHTML = '';
        renderContacts();
    });

    container.appendChild(form);
});

renderContacts();