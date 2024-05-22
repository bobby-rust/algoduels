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
	console.log(name);
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
export default async function Page(props: any) {
	return (
		<div className="flex min-h-screen w-screen bg-gray-100">
			<Sidebar />
			<div className="flex flex-col w-full">
				<main className="flex flex-col p-6 md:p-8 ">
					<div className="flex">
						<Problem fetchProblem={fetchProblem} fetchExamples={fetchExamples} runCode={runCode} />
					</div>
				</main>
			</div>
		</div>
	);
}

function ReplyIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="9 17 4 12 9 7" />
			<path d="M20 18v-2a4 4 0 0 0-4-4H4" />
		</svg>
	);
}

function SearchIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function ThumbsDownIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M17 14V2" />
			<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
		</svg>
	);
}

function ThumbsUpIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M7 10v12" />
			<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
		</svg>
	);
}

function CodeIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="16 18 22 12 16 6" />
			<polyline points="8 6 2 12 8 18" />
		</svg>
	);
}
