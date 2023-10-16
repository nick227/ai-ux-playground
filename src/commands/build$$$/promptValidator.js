function cleanString(str) {
  return str.replace(/\s+/g, ' ')  // Replace multiple spaces with a single space
            .replace(/\r+/g, '')  // Remove carriage returns
            .replace(/\n+/g, '')  // Remove line breaks
            .trim();               // Trim the string
}

function promptValidator(prompt) {
	//validate prompt
	return prompt;
}

module.exports = promptValidator;
