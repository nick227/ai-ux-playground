
document.addEventListener("DOMContentLoaded", () => {
	const typeaheadElement = document.getElementById("typeahead");
	const img = document.querySelector("img");
	new Dropdown(typeaheadElement, suggestionsArray, relatedTermObject);
	new Typeahead(typeaheadElement, suggestionsArray);
	new ImageReloader(img, 97985000, 200, 200);
  });