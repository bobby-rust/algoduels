"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { toTitleCase } from "../../../lib/utils";
import MonacoEditor from "../../components/Editor";
import { FaPlay } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Loading from "../../components/Loading";

const API_URL = "http://localhost:4000/api";

type Problem = {
	problem_id: number;
	problem_name: string;
	difficulty: number;
	prompt: string;
	starter_code: string;
};

type TestCase = {
	test_case_id: number;
	problem_id: number;
	io: IO;
	is_sanity_check: boolean;
};

type IO = {
	input: string;
	output: string;
};

/**
 * Fetches a problem's details from the API by its name.
 *
 * @param {string} name - The name of the problem to fetch.
 * @returns {Promise<Problem>} The problem details.
 */
const fetchProblem = async (name: string): Promise<Problem> => {
	const response = await fetch(`${API_URL}/problems/name/${name}`);
	const json = await response.json();
	return json;
};

/**
 * Fetches the sanity check test cases for a given problem ID.
 *
 * @param {number} id - The ID of the problem.
 * @returns {Promise<TestCase[]>} The list of test cases.
 */
const fetchExamples = async (id: number): Promise<TestCase[]> => {
	const response = await fetch(`${API_URL}/testcases/sanity/${id}`);
	const json = await response.json();
	return json;
};

/**
 * Runs the provided code in the execution environment.
 *
 * @param {string} code - The source code to be executed.
 * @returns {Promise<any>} The result of the code execution.
 */
const runCode = async (code: string) => {
	// TODO: type the response
	const response = await fetch(`${API_URL}/run`, {
		method: "POST",
		body: JSON.stringify({
			language_id: 63,
			source_code: code,
		}),
	});
	const json = await response.json();
	return json;
};

/**
 * Problem component that fetches and displays a coding problem,
 * renders a code editor for the problem's starter code, and handles code execution.
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function Problem() {
	const path: string | null = usePathname();
	const pathArr: string[] = path?.split("/").slice(1); // Removes the empty string from the beginning
	const problemName = pathArr[1];
	const problemTitleCase = toTitleCase(problemName.replaceAll("-", " "));

	// Default value for the code editor
	const defaultValue = "// Write some code.";

	const [editorValue, setEditorValue] = React.useState<string>(defaultValue);
	const [output, setOutput] = React.useState<string>("");
	const [problem, setProblem] = React.useState<Problem | null>(null);
	const [examples, setExamples] = React.useState<TestCase[] | null>(null);

	/**
	 * Handles changes to the code editor.
	 *
	 * @param {string} e - The new code from the editor.
	 */
	const handleChange = (e: string) => {
		setEditorValue(e);
	};

	React.useEffect(() => {
		/**
		 * Fetches the problem details and test cases from the API.
		 */
		const getProblem = async () => {
			const problem = await fetchProblem(problemTitleCase);

			// Convert text to render-friendly format
			problem.starter_code = problem.starter_code.replaceAll(/\\n/g, "\n");
			problem.prompt = problem.prompt.replaceAll(/\\n/g, "\n").replaceAll(/\\/g, "<br /><br />");

			setProblem(problem);
			console.log(problem.problem_id);
			const response = await fetchExamples(problem.problem_id);

			const examples: TestCase[] = response.map((ex, i) => {
				const io: IO = JSON.parse(ex["io"] as unknown as string);
				const cur = {
					...ex,
					io: {
						input: io.input,
						output: io.output,
					},
				};

				return cur;
			});

			console.log(examples);
			setExamples(examples);
			setEditorValue(problem.starter_code);
		};

		getProblem();
	}, []);

	React.useEffect(() => {
		console.log(output);
	}, [output]);

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

	return (
		<div className="flex align-center justify-center w-full h-full border-2 border-red-600 p-5">
			<div className="flex flex-col justify-center align-center w-[80vw] border-2 border-purple-500 p-5 m-auto">
				<div className="flex align-center justify-center border-2 rounded-sm mt-5 p-5 w-full h-full">
					<section className="border-2 border-black p-5 w-[50%]">
						{!problem ? (
							<Loading />
						) : (
							<>
								<h1 className="font-bold text-lg">{problem?.problem_name}</h1>
								<p className="leading-loose" dangerouslySetInnerHTML={{ __html: problem!.prompt }}></p>
							</>
						)}
					</section>
					<section className="border-2 border-black p-5 bg-[#1e1e1e]">
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
						<div>
							{examples?.map((ex, i) => (
								<div className="m-4" key={i}>
									<h1>Example {i + 1}:</h1>
									<div className="border-l-2">
										<div className="m-2">
											Input:{" "}
											{Object.entries(ex.io.input).map(([key, val]) => (
												<code key={key}>{`${key}: ${JSON.stringify(val)}`}</code>
											))}
										</div>
										<div className="m-2">
											Output: <code>{JSON.stringify(ex.io.output)}</code>
										</div>
									</div>
								</div>
							))}
						</div>
					</section>
					<section className="w-1/2 border-2 border-black p-5">
						<h1>Output: {output}</h1>
					</section>
				</div>
			</div>
		</div>
	);
}
