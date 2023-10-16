const themes = {
  title: "Modern Professional",
  description: "A modern and professional theme with a focus on readability and user experience.",
  colors: ["#1a1a1a", "#ffffff", "#3498db", "#e74c3c"],
  fonts: ["'Helvetica Neue', sans-serif", "'Courier New', monospace"],
  elements: {
    input: {
      base: { backgroundColor: "#ffffff", borderColor: "#1a1a1a", borderRadius: "5px", padding: "10px", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "16px" },
      focus: { borderColor: "#3498db" },
      valid: { borderColor: "#2ecc71" },
      invalid: { borderColor: "#e74c3c" }
    },
    h1: {
      base: { color: "#1a1a1a", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "36px" }
    },
    h2: {
      base: { color: "#1a1a1a", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "28px" }
    },
    p: {
      base: { color: "#1a1a1a", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "16px" }
    },
    select: {
      base: { backgroundColor: "#ffffff", borderColor: "#1a1a1a", borderRadius: "5px", padding: "10px", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "16px" },
      focus: { borderColor: "#3498db" }
    },
    textarea: {
      base: { backgroundColor: "#ffffff", borderColor: "#1a1a1a", borderRadius: "5px", padding: "10px", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "16px" },
      focus: { borderColor: "#3498db" }
    },
    button: {
      base: { backgroundColor: "#3498db", color: "#ffffff", borderRadius: "5px", padding: "10px 20px", fontFamily: "'Helvetica Neue', sans-serif", fontSize: "16px", border: "none" },
      hover: { backgroundColor: "#2980b9" },
      active: { backgroundColor: "#2c3e50" }
    }
  }
};
