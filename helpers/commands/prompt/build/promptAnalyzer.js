const nlp = require('compromise');

function promptAnalyzer(prompt) {
  //get nlp do things
  return prompt;
}

/**
 * Analyze the text to extract key subjects and descriptions.
 * @param {string} prompt - The text to analyze.
 * @returns {Object} - An object containing key subjects and descriptions.
 */
function getNlpAnalysis(prompt) {

  const doc = nlp(prompt);

  // Extract subjects
  const subjects = doc
    .nouns()
    .out('array')
    .filter((word, index, self) => self.indexOf(word) === index); // Remove duplicates

  // Extract verbs
  const verbs = doc
    .verbs()
    .out('array')
    .filter((word, index, self) => self.indexOf(word) === index); // Remove duplicates

  // Extract adjectives
  const adjectives = doc
    .adjectives()
    .out('array')
    .filter((word, index, self) => self.indexOf(word) === index); // Remove duplicates

  return {
    subjects,
    verbs,
    adjectives,
  };
}

module.exports = promptAnalyzer;
