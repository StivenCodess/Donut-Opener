import { initializeTheme, updateThemeButtons } from "./theme.js";
import { showBoxBlur, deleteBackdrop } from "./utils.js";
import actionHandlers from "./actionHandlers.js";

const roll_container = document.getElementById("roll-container");
const roll_wrapper = document.getElementById("roll-wrapper");

const loadingElement = document.getElementById("loading");

// CONSTANTS SIZE OF ELEMENTS
const WIDTH_ELEMENT = 150;

document.addEventListener("DOMContentLoaded", () => {
	initializeTheme();
	updateThemeButtons();
});

window.addEventListener("resize", () => {
	updatePosition();
});

const loadImagesFromServer = async () => {
	try {
		resetElement();

		loadingElement.style.display = "block";

		const response = await fetch("https://donut-opener.vercel.app/api/images");

		if (!response.ok) throw new Error("Error al obtener imágenes");
		loadingElement.style.display = "none";

		return await response.json();
	} catch (error) {
		console.error("Error al obtener imágenes:", error);
		throw error;
	}
};

document.addEventListener("click", (event) => {
	const target = event.target;

	if (target instanceof HTMLElement || target.nodeName === "path") {
		const action = target.getAttribute("data-action");

		if (action && actionHandlers[action]) actionHandlers[action]();
	}
});

const getRandomImage = (IMAGES) => {
	const totalWeight = IMAGES.reduce((sum, image) => sum + image.weight, 0);
	const randomNumber = Math.random() * totalWeight;

	let cumulativeWeight = 0;

	for (const image of IMAGES) {
		cumulativeWeight += image.weight;
		if (randomNumber <= cumulativeWeight) return image;
	}

	const ramdomIndex = Math.floor(Math.random() * IMAGES.length);
	return IMAGES[ramdomIndex];
};

const updatePosition = () => {
	const imgIndex = Math.floor(roll_wrapper.children.length / 2);

	const finalLeftPosition =
		-imgIndex * WIDTH_ELEMENT + (roll_container.clientWidth / 2 - WIDTH_ELEMENT / 2);

	roll_wrapper.style.left = `${finalLeftPosition}px`;
};

const loadImagesIntoRoll = (imagesData) => {
	showBoxBlur();

	for (let index = 0; index <= 49; index++) {
		const img = document.createElement("img");
		const imgPath = getRandomImage(imagesData);

		img.src = imgPath.path;
		img.alt = imgPath.name;
		img.width = 150;
		img.height = 150;
		img.className = "img-donut";

		roll_wrapper.appendChild(img);
	}

	setTimeout(() => {
		roll_wrapper.style.transition = "left 6s cubic-bezier(0.19, 1, 0.22, 1) 0s";
		updatePosition();
	}, 30);
};

export const setElements = async () => {
	try {
		const imagesData = await loadImagesFromServer();

		loadImagesIntoRoll(imagesData);
	} catch (error) {
		console.log(error);
	}
};

export const resetElement = () => {
	roll_wrapper.style.transition = "none";
	roll_wrapper.style.left = "0px";

	while (roll_wrapper.firstChild) {
		roll_wrapper.removeChild(roll_wrapper.firstChild);
	}

	if (document.querySelector(".winner-container")) {
		document.body.removeChild(document.querySelector(".winner-container"));
	}

	if (document.querySelector(".win")) {
		roll_container.removeChild(document.querySelector(".win"));
	}

	if (
		document.querySelector(".box-blur-left") &&
		document.querySelector(".box-blur-right")
	) {
		deleteBackdrop();
	}
};
