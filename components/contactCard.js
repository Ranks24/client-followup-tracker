function createContactCard(contact, onDelete) {
  const card = document.createElement('div');
  card.className = 'contact-card';

  const statusClass = 'status-' + contact.status.replace(' ', '-');

  card.innerHTML = `
    <span>${contact.name}</span>
    <span>${contact.company}</span>
    <span>${contact.email}</span>
    <span>${contact.phone}</span>
    <span>${contact.followUpDate || 'Not set'}</span>
    <span><span class="status-badge ${statusClass}">${contact.status}</span></span>
    <button class="delete-btn" data-id="${contact.id}">Delete</button>
  `;

  card.querySelector('.delete-btn').addEventListener('click', () => {
    onDelete(contact.id);
  });

  return card;
}