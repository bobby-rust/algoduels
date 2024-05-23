"use client";

import Editor, { loader } from "@monaco-editor/react";
import React from "react";
import { darkPlus } from "../../themes/darkPlus";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ProblemType } from "@/lib/types";
import Testcases from "./Testcases";

type MonacoEditorProps = {
	runCode: (code: string) => Promise<any>; // TODO: type the promise
	problem: ProblemType | null;
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
	const [editorValue, setEditorValue] = React.useState<string | undefined>(defaultValue);
	const [output, setOutput] = React.useState<string | null>(null);
	const { runCode, problem } = props;

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
		if (typeof editorValue === "undefined") return;
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

	React.useEffect(() => {
		setEditorValue(problem?.starter_code);
	}, [problem]);

	return (
		<section className="flex flex-col max-w-[80vw] dark:bg-gray-950 ">
			<div className="mb-6">
				<h2 className="text-lg font-bold">Solution</h2>
				<p className="text-gray-800">Write your solution in the code editor below.</p>
			</div>
			<div>
				<Label htmlFor="language">Language</Label>
				<div className="flex mb-3">
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
				<div>
					<Editor
						height="40vh"
						width="50vw"
						defaultLanguage="javascript"
						onChange={handleChange}
						value={editorValue}
						theme="vs-dark"
					/>
				</div>
			</div>

			<Testcases />
		</section>
	);
}
