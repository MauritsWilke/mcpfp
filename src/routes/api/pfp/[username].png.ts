import generatePfp from "$lib/rendering/generateProfile";
import changeGradient from "$lib/rendering/gradient";
import { Canvas } from "skia-canvas";

export async function get({ params, url }) {
	if (!params?.username) {
		return {
			status: 400,
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				error: "Missing username"
			}

		}
	}

	try {
		const username = params.username;

		const searchParams = url.searchParams;
		const gradient = searchParams.get("gradient");
		const colours = gradient ? gradient.split("-").filter(v => v !== "").map(colour => `#${colour}`) : null;

		const canvas = new Canvas(300, 300);
		const ctx = canvas.getContext("2d");
		ctx.scale(16, 16)
		ctx.imageSmoothingEnabled = false;

		changeGradient(ctx, colours)
		await generatePfp(username, ctx);

		const dataURL = await canvas.png;
		return {
			status: 200,
			headers: {
				"Content-Type": "image/png"
			},
			body: dataURL
		}

	} catch (e) {
		console.log(e)
		return {
			status: 400,
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				message: "oops"
			}
		}
	}
}