function clearAllElementsByClass(className){
	const elements = document.querySelectorAll('.'+className);
	elements.forEach((elm) => {
		elm.remove();
	});
}