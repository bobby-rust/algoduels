"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { toTitleCase } from "../../../lib/utils";
import MonacoEditor from "../../components/Editor";
import { FaPlay } from "react-icons/fa";
import Code from "../../components/Code";
import { Button } from "@/components/ui/button";

const runCode = async (code: string) => {
	const response = await fetch("http://localhost:4000/api/run", {
		method: "POST",
		body: JSON.stringify({
			language_id: 63,
			source_code: code,
		}),
	});

	const json = await response.json();
	console.log(json);
	return json;
};

/*
 * fetch problem description & starter code, render it :)
 * this is where the code editor lives
 */
export default function Problem() {
	const path: string | null = usePathname();
	const pathArr: string[] = path?.split("/").slice(1); // removes the empty string from the beginning
	const problem = pathArr[1];
	const problemTitleCase = toTitleCase(problem.replaceAll("-", " "));

	/**
	 * Problem description, default editor value will be fetched from the API
	 */
	const defaultValue = "// Write some code.";

	const [editorValue, setEditorValue] = React.useState<string>(defaultValue);
	const [output, setOutput] = React.useState<string>("");

	const handleChange = (e: string) => {
		setEditorValue(e);
	};

	React.useEffect(() => {
		console.log(editorValue);
	}, [editorValue]);

	React.useEffect(() => {
		console.log(output);
	}, [output]);

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		console.log("Submitting: ", editorValue);
		const response = await runCode(editorValue);
		setOutput(response.stdout);
	};

	return (
		<div className="flex align-center justify-center w-full h-full border-2 border-red-600 p-5">
			<div className="flex flex-col justify-center align-center w-[80vw] border-2 border-purple-500 p-5 m-auto">
				<div className="flex align-center justify-center border-2 rounded-sm mt-5 p-5 w-full h-full">
					<section className="border-2 border-black p-5">
						<h1 className="font-bold text-lg">{problemTitleCase}</h1>
						<p className="text-sm leading-loose">
							Given an array of integers <Code text="nums" /> and an integer <Code text="target" />, return the indices
							of the two elements that sum to <Code text="target" />.
						</p>
					</section>
					<section className="border-2 border-black p-5">
						<form onSubmit={handleSubmit}>
							<Button className="rounded-md bg-white text-[#6366F1] mb-5" type="submit">
								<FaPlay className="mr-2" />
								Run
							</Button>
						</form>
						<MonacoEditor value={editorValue} handleChange={handleChange} />
					</section>
				</div>

				<div className="flex justify-center align-center border-2 rounded-sm mt-5 p-5 w-full h-full">
					<section className="border-2 border-black p-5 w-1/2">
						<h1>Examples</h1>
						<p>
							Input: <Code text="nums = [1, 3, 5], target = 8" /> <br />
							Output: <Code text="[1, 2]" />
						</p>
					</section>
					<section className="w-1/2 border-2 border-black p-5">
						<h1>Output: {output}</h1>
					</section>
				</div>
			</div>
		</div>
	);
}
