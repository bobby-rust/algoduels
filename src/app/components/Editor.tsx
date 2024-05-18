import Editor, { loader } from "@monaco-editor/react";
import React from "react";
import { darkPlus } from "../../themes/darkPlus";

type MonacoEditorProps = {
	value: string;
	handleChange: any;
};

/**
 * OK... maybe add custom LSP server later if there is a better one,
 * OR a custom tokenizer to allow for more syntax highlight customization
 * i.e. identifiers and functions/methods are tokenized the same by default.
 * same thing with keywords, certain keywords such as `function` and `return`
 * should be different, but aren't. In typescript, types and keywords are both dark blue
 *
 * Also, there are packages for VIM / EMACS integration which I will look into
 */
export default function MonacoEditor(props: MonacoEditorProps): React.ReactElement<any, any> {
	React.useEffect(() => {
		loader.init().then((monaco) => {
			// @ts-expect-error
			monaco.editor.defineTheme("darkPlus", darkPlus);
			monaco.editor.setTheme("darkPlus");
		});
	}, []);

	const { value, handleChange } = props;

	return (
		<Editor
			height="50vh"
			width="50vw"
			defaultLanguage="typescript"
			onChange={handleChange}
			value={value}
			theme="vs-dark"
		/>
	);
}
