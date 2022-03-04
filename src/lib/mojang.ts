export {
	getUUID,
	getSkin,
	getUsername,
	getNameHistory
}

async function getUUID(username: string) {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
	if (!response.ok) return Promise.reject(`${username} does not exist`);
	const json = await response.json();
	return json.id;
}

async function getSkin(username: string) {
	if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
	const UUID = await getUUID(username);
	const response = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
	if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
	const json = await response.json();
	const r = JSON.parse(atob(json.properties[0].value));
	return r.textures.SKIN.url;
}

async function getUsername(playerUUID: string) {
	if (!playerUUID.match(/[\d-]/i)) return Promise.reject("Please submit a valid UUID");
	const response = await fetch(`https://api.mojang.com/user/profiles/${playerUUID}/names`);
	if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
	const json = await response.json();
	return json[json.length - 1].name;
}

type NameHistory = {
	name: string,
	changedToAt: number
}
async function getNameHistory(username: string) {
	const nameHistory = new Map();
	if (username.length <= 16) {
		if (!valid(username)) return Promise.reject(`${username} is an invalid username`);
		const UUID = await getUUID(username)
		const response = await fetch(`https://api.mojang.com/user/profiles/${UUID}/names`);
		if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
		const r: NameHistory[] = await response.json();
		r.forEach(element => nameHistory.set(element.name, element.changedToAt ? Intl.DateTimeFormat("en-GB").format(new Date(element.changedToAt)) : "Original name"));
		return nameHistory;

	} else {
		if (!username.match(/[\d-]/i)) return Promise.reject("Please submit a valid UUID");
		const response = await fetch(`https://api.mojang.com/user/profiles/${username}/names`);
		if (!response.ok) return Promise.reject(`Response returned statuscode ${response.status}`);
		const r: NameHistory[] = await response.json();
		r.forEach(element => nameHistory.set(element.name, element.changedToAt ? Intl.DateTimeFormat("en-GB").format(new Date(element.changedToAt)) : "Original name"));
		return nameHistory;
	}
}

function valid(username: string) {
	if (!username.match(/^[a-z0-9_]*$/i)) return false;
	return true;
}