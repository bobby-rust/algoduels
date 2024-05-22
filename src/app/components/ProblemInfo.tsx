"use client";

import React from "react";

import { toTitleCase } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Problem, TestCase } from "@/lib/types";

type ProblemInfoProps = {
	fetchProblem: Function;
	fetchExamples: Function;
};

export default function ProblemInfo(props: ProblemInfoProps): React.ReactElement {
	const [problem, setProblem] = React.useState<Problem | null>(null);
	const [examples, setExamples] = React.useState<TestCase[] | null>(null);

	const { fetchProblem, fetchExamples } = props;

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

	return (
		<section className="mb-6">
			<h1 className="text-3xl font-bold">Two Sum</h1>
			<p className="text-gray-500 dark:text-gray-400">
				Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add
				up to `target`.
			</p>
			<div>Examples</div>
		</section>
	);
}
