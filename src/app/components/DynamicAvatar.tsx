import React from "react";
import { randomBytes } from "node:crypto";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

async function getAvatar(): Promise<string> {
	const seed = randomBytes(32).toString("hex");
	const response = await fetch(
		`https://api.dicebear.com/8.x/personas/svg?&size=64&seed=${seed}`,
		{
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
		}
	);

	const svg = await response.text();
	return DOMPurify.sanitize(svg);
}

export default async function DynamicAvatar() {
	const avatar = await getAvatar();
	return <div dangerouslySetInnerHTML={{ __html: avatar }}></div>;
}
