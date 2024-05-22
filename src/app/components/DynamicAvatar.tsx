import React from "react";
import { randomBytes } from "crypto";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

type DynamicAvatarProps = {
	avatar: any;
};

const getAvatar = async () => {
	const seed = randomBytes(32).toString("hex");
	const res = await fetch(`https://api.dicebear.com/8.x/personas/svg?&size=64&seed=${seed}`);

	const window = new JSDOM("").window;
	const DOMPurify = createDOMPurify(window);
	return DOMPurify.sanitize(await res.text());
};

export default async function DynamicAvatar(props: any) {
	const avatar = await getAvatar();
	return (
		<div
			className="flex justify-center align-center overflow-hidden"
			dangerouslySetInnerHTML={{ __html: avatar }}
		></div>
	);
}
