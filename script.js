const open_btn = document.getElementById("open-btn");
const roll_container = document.querySelector(".roll-container");
const roll_wrapper = document.querySelector(".roll-wrapper");
const imageBox = document.querySelector(".box-image");
const close_modal = document.getElementById("close-modal-info");
const info_btn = document.getElementById("info-btn");
const modal_info = document.querySelector(".modal-info");
const overlay = document.querySelector(".overlay");
const donut_btn = document.querySelector(".donut-btn");
const modal_donuts = document.querySelector(".modal-info-donut");
const close_modal_donut = document.getElementById("close-modal-info-donut");
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
		weight: 1000,
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

	//PASAR A FUNCION
	const divBlurLeft = document.createElement("div");
	divBlurLeft.classList.add("box-blur-left");

	const divBlurRight = document.createElement("div");
	divBlurRight.classList.add("box-blur-right");

	backdrop_container.appendChild(divBlurLeft);
	backdrop_container.appendChild(divBlurRight);

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

open_btn.addEventListener("click", () => {
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

		/** PASAR A FUNCION */
		if (winnerElement.getAttribute("src") == "donuts_image/6.svg") {
			confetti({
				spread: 360,
				ticks: 200,
				gravity: 1,
				decay: 0.94,
				origin: { y: 0.25 },
				startVelocity: 10,
				particleCount: 100,
				scalar: 3,
				shapes: ["image"],
				shapeOptions: {
					image: [
						{
							src: "./donuts_image/1.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/2.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/3.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/4.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/5.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/6.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/7.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/8.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/9.svg",
							width: 32,
							height: 32,
						},
						{
							src: "./donuts_image/10.svg",
							width: 32,
							height: 32,
						},
					],
				},
			});
		}
	}, 6050);
});

roll_wrapper.addEventListener("transitionend", (e) => {
	showWinnerDonut();
});

window.addEventListener("resize", () => {
	updatePosition();
});

info_btn.addEventListener("click", () => {
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	modal_info.classList.remove("hidden");
	modal_info.classList.remove("scale-out-center");
	modal_info.classList.add("scale-in-center");
});

close_modal.addEventListener("click", () => {
	modal_info.classList.add("scale-out-center");

	setTimeout(() => {
		overlay.style.opacity = "0";
		overlay.style.visibility = "hidden";
		modal_info.classList.add("hidden");
		modal_info.classList.remove("scale-in-center");
	}, 600);
});

donut_btn.addEventListener("click", () => {
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	modal_donuts.classList.remove("hidden");
	modal_donuts.classList.remove("scale-out-center");
	modal_donuts.classList.add("scale-in-center");
});

close_modal_donut.addEventListener("click", () => {
	modal_donuts.classList.add("scale-out-center");

	setTimeout(() => {
		overlay.style.opacity = "0";
		overlay.style.visibility = "hidden";
		modal_donuts.classList.add("hidden");
		modal_donuts.classList.remove("scale-in-center");
	}, 600);
});
