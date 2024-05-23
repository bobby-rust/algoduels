import React from "react";
import { Sidebar } from "../../components/Sidebar";
import { ProblemType, TestCase } from "@/lib/types";
import Problem from "@/app/components/Problem";

const API_URL = "http://localhost:4000/api";

/**
 * Fetches a problem's details from the API by its name.
 *
 * @param {string} name - The name of the problem to fetch.
 * @returns {Promise<ProblemType>} The problem details.
 */
const fetchProblem = async (name: string): Promise<ProblemType> => {
	"use server";
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
	"use server";
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
	"use server"; // server action
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
export default async function Page() {
	return (
		<div className="flex min-h-screen w-screen bg-gray-100">
			<Sidebar />
			<main className="flex flex-col">
				<Problem fetchProblem={fetchProblem} fetchExamples={fetchExamples} runCode={runCode} />
			</main>
		</div>
	);
}
