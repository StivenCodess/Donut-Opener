import { setElements, resetElement } from "./script.js";

const backdrop_container = document.querySelector(".backdrop");
const open_btn = document.getElementById("open-btn");
const back_btn = document.getElementById("back-btn");
const imageBox = document.querySelector(".box-image");
const roll_container = document.getElementById("roll-container");
const roll_wrapper = document.getElementById("roll-wrapper");
let win_img = undefined;

export const showBoxBlur = () => {
	const divBlurLeft = document.createElement("div");
	divBlurLeft.classList.add("box-blur-left");

	const divBlurRight = document.createElement("div");
	divBlurRight.classList.add("box-blur-right");

	backdrop_container.appendChild(divBlurLeft);
	backdrop_container.appendChild(divBlurRight);
};

export const deleteBackdrop = () => {
	backdrop_container.removeChild(document.querySelector(".box-blur-left")),
		backdrop_container.removeChild(document.querySelector(".box-blur-right"));
};

export const backClickHandler = (btn, image, roll_container) => {
	resetElement();
	btn.classList.add("hidden");
	image.style.display = "block";
	roll_container.style.display = "none";
};

export const open_btnClickHandler = () => {
	open_btn.disabled = true;
	imageBox.style.display = "none";
	roll_container.style.display = "flex";
	setElements();

	setTimeout(() => {
		const winnerElement = roll_wrapper.children.item(win_img);
		const divBG = document.createElement("div");

		divBG.classList.add("win");
		divBG.classList.add("scale-in-center");
		roll_container.appendChild(divBG);

		winnerElement.classList.add("blink-2");

		if (winnerElement.getAttribute("src") == "./assets/donuts_image/6.svg") {
			confetti({
				spread: 360,
				ticks: 200,
				gravity: 1,
				decay: 0.94,
				origin: { y: 0.25 },
				startVelocity: 10,
				particleCount: 15,
				scalar: 1,
				shapes: ["image"],
				shapeOptions: {
					image: [
						{
							src: "./assets/donut-particles/10.webp",
							width: 50,
							height: 50,
						},
						{
							src: "./assets/donut-particles/9.webp",
							width: 50,
							height: 50,
						},
						{
							src: "./assets/donut-particles/6.webp",
							width: 50,
							height: 50,
						},
						{
							src: "./assets/donut-particles/2.webp",
							width: 50,
							height: 50,
						},
					],
				},
			});
		}
		showWinnerDonut();
	}, 5500);
};

const showWinnerDonut = () => {
	if (document.querySelector(".winner-container")) return;
	back_btn.classList.remove("hidden");
	win_img = roll_wrapper.children.length / 2;

	const winnerElement = roll_wrapper.children.item(win_img);

	const winnerPath = winnerElement.getAttribute("src");
	const winnerName = winnerElement.getAttribute("alt");

	const winnerContainer = document.createElement("div");
	winnerContainer.className = "winner-container";
	winnerContainer.classList.add("scale-in-center");

	const image = document.createElement("img");
	image.src = winnerPath;
	image.width = 200;
	image.className = "winnerImg";

	const spanMSG = document.createElement("span");
	spanMSG.className = "win-name";
	spanMSG.textContent = `${winnerName}`;

	const message = document.createElement("span");
	message.className = "win-msg";

	if (winnerName != "Chispita") message.textContent = "Suerte para la proxima!";
	else message.textContent = "Felicidades obtuviste un descuento del 10%";

	winnerContainer.appendChild(spanMSG);
	winnerContainer.appendChild(image);
	winnerContainer.appendChild(message);

	document.body.insertAdjacentElement("afterbegin", winnerContainer);

	open_btn.disabled = false;
};
