export async function get({ params }) {
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
		const skinURL = await getSkin(params.username);
		const response = await fetch(skinURL);
		const blob = await response.arrayBuffer();
		const buffer = `data:${response.headers.get("content-type")};base64,${Buffer.from(blob).toString("base64")}`;

		return {
			status: 200,
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				skin: buffer
			},
		}
	} catch (e) {
		return {
			status: 400,
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				message: "something went wrong",
				error: e
			}
		}
	}

}

async function getSkin(username: string): Promise<string | never> {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const UUID = await getUUID(username);
	const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
	if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
	const json = await response.json();
	const r = JSON.parse(atob(json.properties[0].value));
	return r.textures.SKIN.url;
}

async function getUUID(username: string): Promise<string | never> {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
	if (!response.ok) return Promise.reject(`${username} does not exist`);
	const json = await response.json();
	return json.id;
}

function valid(username: string) {
	return username.match(/^[a-z0-9_]{1,16}$/i);
}
