"use client";

import React from "react";
import ProblemInfo from "./ProblemInfo";
import Solution from "./Solution";
import { ProblemType, TestCase } from "@/lib/types";
import { usePathname } from "next/navigation";
import { toTitleCase } from "@/lib/utils";

type ProblemProps = {
	runCode: any;
	fetchProblem: any;
	fetchExamples: any;
};

export default function Problem(props: any) {
	const { fetchProblem, fetchExamples, runCode } = props;

	const [problem, setProblem] = React.useState<ProblemType | null>(null);
	const [examples, setExamples] = React.useState<TestCase[] | null>(null);

	const path: string | null = usePathname();
	const pathArr: string[] = path?.split("/").slice(1); // Removes the empty string from the beginning
	const problemName = pathArr[1];
	const problemTitleCase = toTitleCase(problemName.replaceAll("-", " "));

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

			const examples: TestCase[] = await fetchExamples(problem.problem_id);

			setExamples(examples);
		};

		getProblem();
	}, []);

	React.useEffect(() => {
		console.log(examples);
	}, [examples]);
	return (
		<div className="flex rounded-lg border shadow-lg max-h-screen bg-white p-6">
			<ProblemInfo problem={problem} examples={examples} />
			<Solution problem={problem} runCode={runCode} />
		</div>
	);
}
