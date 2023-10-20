class Typeahead {
  constructor(typeaheadElement, suggestions) {
    this.userText = typeaheadElement.querySelector('span');
    this.searchIcon = typeaheadElement.querySelector('i');
    this.loadingSpinner = typeaheadElement.querySelector('.loader');
    this.suggestionText = this.userText.nextElementSibling;
    this.suggestions = suggestions;
    this.typeaheadElement = typeaheadElement;
    this.init();
  }

  init() {
    this.userText.addEventListener('input', () => {
      this.togglePlaceholder();
      this.update();
    });
    this.userText.addEventListener('keydown', e => e.key === "Tab" && this.complete(e));
    this.userText.addEventListener('keyup', e => e.key === "Enter" && this.submit(e));
    this.userText.addEventListener('focusout', () => this.clear());
    this.userText.parentElement.addEventListener('click', () => this.userText.focus());
  }

  submit() {
    this.clear();
    submitNewTitle(this.userText.textContent);
    this.toggleLoader();
  }

  togglePlaceholder() {
    if (this.userText.textContent.trim() === '') {
      this.userText.classList.add('empty');
    } else {
      this.userText.classList.remove('empty');
    }
  }

  update() {
    const query = this.userText.textContent.trim().toLowerCase();
    if (query.length === 0) {
      this.clear();
      return;
    }
    const suggestion = this.suggestions.find(s => s.toLowerCase().startsWith(query));
    this.suggestionText.textContent = suggestion ? suggestion.slice(query.length) : "";
  }

  toggleLoader() {
    this.searchIcon.classList.toggle('hidden');
    this.loadingSpinner.classList.toggle('hidden');
    this.typeaheadElement.classList.toggle('disabled');
    this.userText.contentEditable = !this.userText.contentEditable;
  }

  complete(event) {
    event.preventDefault();
    this.userText.textContent += this.suggestionText.textContent;
    this.placeCaretAtEnd();
    this.clear();
  }

  placeCaretAtEnd() {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(this.userText.childNodes[0], this.userText.textContent.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  clear() {
    this.suggestionText.textContent = "";
  }
}