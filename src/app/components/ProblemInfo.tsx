"use client";

import React from "react";

import { toTitleCase } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ProblemType, TestCase } from "@/lib/types";

type ProblemInfoProps = {
	problem: ProblemType | null;
	examples: any;
};

export default function ProblemInfo(props: ProblemInfoProps): React.ReactElement {
	const { problem, examples } = props;
	return (
		<section className="mb-6 mr-5">
			<h1 className="text-3xl font-bold mb-5">{problem?.problem_name}</h1>
			{problem && (
				<p
					className="text-gray-800 mb-10 mr-5 leading-relaxed"
					dangerouslySetInnerHTML={{ __html: problem.prompt }}
				></p>
			)}
			<div>
				{examples?.map((ex: TestCase, i: number) => {
					return (
						<>
							Example {i + 1}:
							<div className="m-5 border-l-2">
								<p className="flex m-2">
									<span className="flex w-20">Input: </span>
									{Object.entries(ex.io.input).map(([key, val]) => (
										<code key={key}>{`${key}: ${JSON.stringify(val)}`}</code>
									))}
								</p>
								<p className="flex m-2">
									<span className="flex w-20">Output:</span>
									<code>{JSON.stringify(ex.io.output)}</code>
								</p>
							</div>
						</>
					);
				})}
			</div>
		</section>
	);
}
