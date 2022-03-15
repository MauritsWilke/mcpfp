import generatePfp from "$lib/rendering/generateProfile";
import changeGradient from "$lib/rendering/gradient";
import { Canvas } from "skia-canvas";

export async function get({ params, url }) {
	if (!params?.username) {
		return {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				error: 'Missing username'
			}

		}
	}

	try {
		const searchParams = url.searchParams;
		const gradient = searchParams.get("gradient")?.split("-")?.forEach(colour => colour = `#${colour}`);
		const username = params.username;

		const canvas = new Canvas(300, 300);
		const ctx = canvas.getContext("2d");
		ctx.scale(16, 16)
		ctx.imageSmoothingEnabled = false;

		changeGradient(ctx, gradient)
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
				'Content-Type': 'application/json'
			},
			body: {
				message: "oops"
			}
		}
	}

}

// async function getSkin(username: string): Promise<string | never> {
// 	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
// 	const UUID = await getUUID(username);
// 	const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
// 	if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
// 	const json = await response.json();
// 	const r = JSON.parse(atob(json.properties[0].value));
// 	return r.textures.SKIN.url;
// }

// async function getUUID(username: string): Promise<string | never> {
// 	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
// 	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
// 	if (!response.ok) return Promise.reject(`${username} does not exist`);
// 	const json = await response.json();
// 	return json.id;
// }

// function valid(username: string) {
// 	if (!username.match(/^[a-z0-9_]*$/i)) return false;
// 	return true;
// }