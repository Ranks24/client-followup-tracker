function createContactForm(onSubmit, existingContact = null) {
  const form = document.createElement('div');

  const values = existingContact || {
    name: '', company: '', email: '',
    phone: '', followUpDate: '', status: 'New'
  };

  form.innerHTML = `
    <div id="contact-form">
      <h2>${existingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
      <input id="f-name" type="text" placeholder="Name" value="${values.name}" />
      <input id="f-company" type="text" placeholder="Company" value="${values.company}" />
      <input id="f-email" type="email" placeholder="Email" value="${values.email}" />
      <input id="f-phone" type="tel" placeholder="Phone Number" value="${values.phone}" />
      <input id="f-followup" type="date" value="${values.followUpDate}" />
      <select id="f-status">
        <option value="New" ${values.status === 'New' ? 'selected' : ''}>New</option>
        <option value="Contacted" ${values.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
        <option value="Proposal Sent" ${values.status === 'Proposal Sent' ? 'selected' : ''}>Proposal Sent</option>
        <option value="Won" ${values.status === 'Won' ? 'selected' : ''}>Won</option>
        <option value="Lost" ${values.status === 'Lost' ? 'selected' : ''}>Lost</option>
      </select>
      <div class="form-buttons">
        <button id="f-submit">${existingContact ? 'Update Contact' : 'Save Contact'}</button>
        <button id="f-cancel">Cancel</button>
      </div>
    </div>
  `;

  form.querySelector('#f-submit').addEventListener('click', () => {
    const contact = {
      id: existingContact ? existingContact.id : Date.now().toString(),
      name: form.querySelector('#f-name').value,
      company: form.querySelector('#f-company').value,
      email: form.querySelector('#f-email').value,
      phone: form.querySelector('#f-phone').value,
      followUpDate: form.querySelector('#f-followup').value,
      status: form.querySelector('#f-status').value,
      notes: existingContact ? existingContact.notes : [],
      createdAt: existingContact ? existingContact.createdAt : new Date().toISOString()
    };

    if (!contact.name.trim() || !contact.email.trim()) {
  alert('Name and Email are required.');
  return;
}

onSubmit(contact);
  });

  form.querySelector('#f-cancel').addEventListener('click', () => {
    const container = document.getElementById('form-container');
    container.classList.remove('active');
    container.innerHTML = '';
  });

  return form;
}