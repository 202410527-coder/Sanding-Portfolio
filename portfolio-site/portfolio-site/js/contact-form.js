/** Contact form handling. Connect submit() to a backend or email service later. */
class ContactForm {
  constructor(formEl, noteEl) {
    this.form = formEl;
    this.note = noteEl;
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit(new FormData(this.form));
    });
  }

  submit(data) {
    // TODO: send `data` to your server / form service.
    this.showNote('Form not connected yet');
  }

  showNote(text) {
    this.note.textContent = text;
  }
}
