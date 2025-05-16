let selected = 0;

// top - bottom
const gradients: string[][] = [
	["#00cdac", "#02aab0"],
	["#6a82fb", "#fc5c7d"],
	["#ffb88c", "#de6262"],
	["#f45c43", "#eb3349"],
	["#B5AC49", "#3CA55C"],
]

function changeGradient(ctx: CanvasRenderingContext2D, orientation?: "left" | "right") {
	if (orientation) {
		selected = orientation === "left" ? selected - 1 : selected + 1;
		if (selected > gradients.length - 1) selected = 0;
		if (selected < 0) selected = gradients.length - 1
	}

	let colorpicker1 = document.getElementById("gradientColor1") as HTMLInputElement;
	let colorpicker2 = document.getElementById("gradientColor2") as HTMLInputElement;

	colorpicker1.value = gradients[selected][0];
	colorpicker2.value = gradients[selected][1];

	const gradient = ctx.createLinearGradient(0, 15, 0, 0);
	gradient.addColorStop(0, colorpicker1.value);
	gradient.addColorStop(1, colorpicker2.value);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 20, 20);
}

function generateGradient(ctx: CanvasRenderingContext2D) {
	
	let colorpicker1 = document.getElementById("gradientColor1") as HTMLInputElement;
	let colorpicker2 = document.getElementById("gradientColor2") as HTMLInputElement;
	
	const gradient = ctx.createLinearGradient(0, 15, 0, 0);
	gradient.addColorStop(0, colorpicker1.value);
	gradient.addColorStop(1, colorpicker2.value);
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 20, 20);
}

export default {
	changeGradient, generateGradient
};
