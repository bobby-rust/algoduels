export type Problem = {
	problem_id: number;
	problem_name: string;
	difficulty: number;
	prompt: string;
	starter_code: string;
};

export type TestCase = {
	test_case_id: number;
	problem_id: number;
	io: IO;
	is_sanity_check: boolean;
};

export type IO = {
	input: string;
	output: string;
};