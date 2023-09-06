const open_btn = document.getElementById("open-btn");
const info_btn = document.getElementById("info-btn");
const donut_btn = document.getElementById("donut-btn");
const close_modal = document.getElementById("close-modal-info");
const close_modal_donut = document.getElementById("close-modal-info-donut");

const modal_info = document.getElementById("modal-info");
const modal_donuts = document.getElementById("modal-info-donut");

const roll_container = document.getElementById("roll-container");
const roll_wrapper = document.getElementById("roll-wrapper");

const imageBox = document.querySelector(".box-image");
const overlay = document.querySelector(".overlay");
const backdrop_container = document.querySelector(".backdrop");

// CONSTANTS SIZE OF ELEMENTS
const WIDTH_ELEMENT = 150;
const GAP_ELEMENT = 10;
let WIN_IMG = undefined;

const IMAGES = [
	{
		path: "donuts_image/1.svg",
		name: "Estrellitas",
		weight: 8,
	},
	{
		path: "donuts_image/2.svg",
		name: "Tostadita",
		weight: 10,
	},
	{
		path: "donuts_image/3.svg",
		name: "Rayitas",
		weight: 5,
	},
	{
		path: "donuts_image/4.svg",
		name: "Grajeita Azul",
		weight: 10,
	},
	{
		path: "donuts_image/5.svg",
		name: "Glaceadita",
		weight: 8,
	},
	{
		path: "donuts_image/6.svg",
		name: "Chispita",
		weight: 50,
	},
	{
		path: "donuts_image/7.svg",
		name: "Chocolita",
		weight: 2,
	},
	{
		path: "donuts_image/8.svg",
		name: "Celestita",
		weight: 10,
	},
	{
		path: "donuts_image/9.svg",
		name: "Remolinitos",
		weight: 5,
	},
	{
		path: "donuts_image/10.svg",
		name: "Corazoncitos",
		weight: 8,
	},
];

document.addEventListener("click", (event) => {
	const target = event.target;

	if (target instanceof HTMLElement || target.nodeName === "path") {
		const action = target.getAttribute("data-action");

		if (action === "open") {
			open_btnClickHandler();
		} else if (action === "show-info") {
			showInfoClickHandler(modal_info);
		} else if (action === "show-donuts") {
			showInfoClickHandler(modal_donuts);
		} else if (action === "close-info") {
			closeInfoClickHandler(modal_info);
		} else if (action === "close-donuts") {
			closeInfoClickHandler(modal_donuts);
		}
	}
});

const getRandomImage = () => {
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

const resetElement = () => {
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
		backdrop_container.removeChild(document.querySelector(".box-blur-left")),
			backdrop_container.removeChild(document.querySelector(".box-blur-right"));
	}

	roll_wrapper.style.transition = "none";
	roll_wrapper.style.left = "0px";
};

const updatePosition = () => {
	const imgIndex = Math.floor(roll_wrapper.children.length / 2);

	const finalLeftPosition =
		-imgIndex * WIDTH_ELEMENT + (roll_container.clientWidth / 2 - WIDTH_ELEMENT / 2);

	roll_wrapper.style.left = `${finalLeftPosition}px`;
};

const setElements = () => {
	resetElement();
	showBoxBlur();

	for (let index = 0; index <= 49; index++) {
		const img = document.createElement("img");
		const imgPath = getRandomImage();

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
	}, 0);

	WIN_IMG = roll_wrapper.children.length / 2;
};

window.addEventListener("resize", () => {
	updatePosition();
});

const open_btnClickHandler = () => {
	open_btn.disabled = true;
	imageBox.style.display = "none";
	roll_container.style.display = "flex";
	setElements();

	setTimeout(() => {
		const winnerElement = roll_wrapper.children.item(WIN_IMG);
		const divBG = document.createElement("div");

		divBG.classList.add("win");
		divBG.classList.add("scale-in-center");
		roll_container.appendChild(divBG);

		winnerElement.classList.add("blink-2");

		if (winnerElement.getAttribute("src") == "donuts_image/6.svg") {
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
							src: "./donut-particles/10.webp",
							width: 50,
							height: 50,
						},
						{
							src: "./donut-particles/9.webp",
							width: 50,
							height: 50,
						},
						{
							src: "./donut-particles/6.webp",
							width: 50,
							height: 50,
						},
						{
							src: "./donut-particles/2.webp",
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

	const winnerElement = roll_wrapper.children.item(WIN_IMG);

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

const showBoxBlur = () => {
	const divBlurLeft = document.createElement("div");
	divBlurLeft.classList.add("box-blur-left");

	const divBlurRight = document.createElement("div");
	divBlurRight.classList.add("box-blur-right");

	backdrop_container.appendChild(divBlurLeft);
	backdrop_container.appendChild(divBlurRight);
};

const showInfoClickHandler = (element) => {
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	element.classList.remove("hidden");
	element.classList.remove("scale-out-center");
	element.classList.add("scale-in-center");
};

const closeInfoClickHandler = (element) => {
	element.classList.add("scale-out-center");

	setTimeout(() => {
		overlay.style.opacity = "0";
		overlay.style.visibility = "hidden";
		element.classList.add("hidden");
		element.classList.remove("scale-in-center");
	}, 600);
};
