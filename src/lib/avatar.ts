import { randomBytes } from "crypto";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export const getAvatar = async () => {
	const window = new JSDOM("").window;
	const DOMPurify = createDOMPurify(window);
	const seed = randomBytes(32).toString("hex");
	const res = await fetch(`https://api.dicebear.com/8.x/personas/svg?&size=64&seed=${seed}`);
	const svg = await res.text();
	return DOMPurify.sanitize(svg);
};