function createContactForm(onSubmit) {
  const form = document.createElement('div');

  form.innerHTML = `
    <div id="contact-form">
      <h2>Add New Contact</h2>
      <input id="f-name" type="text" placeholder="Name" />
      <input id="f-company" type="text" placeholder="Company" />
      <input id="f-email" type="email" placeholder="Email" />
      <input id="f-phone" type="tel" placeholder="Phone Number" />
      <input id="f-followup" type="date" />
      <select id="f-status">
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Proposal Sent">Proposal Sent</option>
        <option value="Won">Won</option>
        <option value="Lost">Lost</option>
      </select>
      <button id="f-submit">Save Contact</button>
      <button id="f-cancel">Cancel</button>
    </div>
  `;

  form.querySelector('#f-submit').addEventListener('click', () => {
    const contact = {
      id: Date.now().toString(),
      name: form.querySelector('#f-name').value,
      company: form.querySelector('#f-company').value,
      email: form.querySelector('#f-email').value,
      phone: form.querySelector('#f-phone').value,
      followUpDate: form.querySelector('#f-followup').value,
      status: form.querySelector('#f-status').value,
      notes: [],
      createdAt: new Date().toISOString()
    };

    onSubmit(contact);
  });

  form.querySelector('#f-cancel').addEventListener('click', () => {
    document.getElementById('form-container').innerHTML = '';
  });

  return form;
}
