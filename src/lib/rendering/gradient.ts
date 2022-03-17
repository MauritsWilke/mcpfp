function changeGradient(ctx, colours: string[] = ["#00cdac", "#02aab0"]) {
	colours ??= ["#00cdac", "#02aab0"];
	const gradient = ctx.createLinearGradient(0, 18.75, 0, 0);

	let interval = 1;
	const decrement = 1 / (colours.length - 1);
	colours.forEach(colour => {
		gradient.addColorStop(interval, colour);
		interval -= decrement;
	})
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 18.75, 18.75);
}

export default changeGradient;
