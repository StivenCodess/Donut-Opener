const overlay = document.querySelector(".overlay");

export const showInfoClickHandler = (element) => {
	overlay.style.visibility = "visible";
	overlay.style.opacity = "1";
	element.classList.remove("hidden");
	element.classList.remove("scale-out-center");
	element.classList.add("scale-in-center");
};

export const closeInfoClickHandler = (element) => {
	element.classList.add("scale-out-center");

	setTimeout(() => {
		overlay.style.opacity = "0";
		overlay.style.visibility = "hidden";
		element.classList.add("hidden");
		element.classList.remove("scale-in-center");
	}, 600);
};
