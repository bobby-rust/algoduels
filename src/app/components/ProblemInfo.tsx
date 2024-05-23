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
		<section className="mr-5">
			<h1 className="text-xl font-bold mb-1">{problem?.problem_name}</h1>
			{problem && (
				<p
					className="text-gray-800 text-sm leading-relaxed mb-2"
					dangerouslySetInnerHTML={{ __html: problem.prompt }}
				></p>
			)}
			<div className="text-sm mb-2">
				{examples?.map((ex: TestCase, i: number) => {
					return (
						<div key={i}>
							Example {i + 1}:
							<div className="m-2">
								<p>
									<span>Input: </span>
									{Object.entries(ex.io.input).map(([key, val]) => (
										<code key={key}>{`${key}: ${JSON.stringify(val)}`}</code>
									))}
								</p>
								<p className="flex m-2">
									<span>Output:</span>
									<code>{JSON.stringify(ex.io.output)}</code>
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
