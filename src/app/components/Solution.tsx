"use client";

import Editor, { loader } from "@monaco-editor/react";
import React from "react";
import { darkPlus } from "../../themes/darkPlus";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type MonacoEditorProps = {
	runCode: (code: string) => Promise<any>; // TODO: type the promise
};

// Default value for the code editor
const defaultValue = "// Write some code.";

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
	const [editorValue, setEditorValue] = React.useState<string>(defaultValue);
	const [output, setOutput] = React.useState<string | null>(null);

	const { runCode } = props;

	/**
	 * Handles changes to the code editor.
	 *
	 * @param {string} e - The new code from the editor.
	 */
	const handleChange = (e: string | undefined) => {
		if (typeof e === "undefined") return;
		setEditorValue(e);
	};

	/**
	 * Handles the form submission to run the code.
	 *
	 * @param {React.SyntheticEvent} e - The form submission event.
	 */
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log("Submitting: ", editorValue);
		const response = await runCode(editorValue);
		console.log(response);
		console.log(response.error);

		response.stdout !== "" ? setOutput(response.stdout) : setOutput(response.stderr);
	};

	React.useEffect(() => {
		loader.init().then((monaco) => {
			// @ts-expect-error
			monaco.editor.defineTheme("darkPlus", darkPlus);
			monaco.editor.setTheme("darkPlus");
		});
	}, []);

	return (
		<section className="flex justify-center flex-col max-w-[80vw] align-center rounded-lg border bg-white p-6 dark:bg-gray-950">
			<div className="mb-6">
				<h2 className="text-xl font-bold">Solution</h2>
				<p className="text-gray-500 dark:text-gray-400">Write your solution in the code editor below.</p>
			</div>
			<div>
				<Label htmlFor="language">Language</Label>
				<div className="flex">
					<div className="mr-3">
						<Select name="language" defaultValue="javascript">
							<SelectTrigger>
								<SelectValue placeholder="Select language" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="javascript">JavaScript</SelectItem>
								<SelectItem value="python">Python</SelectItem>
								<SelectItem value="java">Java</SelectItem>
								<SelectItem value="cpp">C++</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="mr-3">
						<form onSubmit={handleSubmit}>
							<Button>Submit</Button>
						</form>
					</div>
				</div>
				<div className="">
					<Label htmlFor="code-editor">Code Editor</Label>
					<Editor
						height="50vh"
						width="50vw"
						defaultLanguage="javascript"
						onChange={handleChange}
						value={editorValue}
						theme="vs-dark"
					/>
				</div>
			</div>
		</section>
	);
}
