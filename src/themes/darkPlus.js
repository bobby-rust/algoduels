export const darkPlus = {
	base: "vs-dark", // extending vs-dark
	inherit: true,
	rules: [
		{ token: "keyword", foreground: "569CD6" }, // Example for keywords
		{ token: "identifier", foreground: "9CDCFE" }, // Example for identifiers
		{ token: "number", foreground: "B5CEA8" }, // Example for numbers
		{ token: "string", foreground: "CE9178" }, // Example for strings
		{ token: "function", foreground: "FFD700" }, // Yellow for functions
		{ token: "method", foreground: "FFD700" }, // Yellow for methods
		// Add more customizations as needed
	],
	colors: {
		"editor.foreground": "#D4D4D4",
		"editor.background": "#1E1E1E",
		"editorCursor.foreground": "#AEAFAD",
		"editor.lineHighlightBackground": "#3E3E3E",
		"editorLineNumber.foreground": "#858585",
		"editor.selectionBackground": "#264F78",
		"editor.inactiveSelectionBackground": "#3A3D41",
		// Add more color customizations as needed
	},
};
