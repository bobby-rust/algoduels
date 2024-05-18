import React from "react";

type CodeProps = {
	text: string;
};

const codeStyles = "text-xs bg-slate-200 rounded-md p-[2px] border-[1px] border-slate-400";

export default function Code(props: CodeProps) {
	return <code className={codeStyles}>{props.text}</code>;
}
