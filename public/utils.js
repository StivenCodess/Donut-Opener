const backdrop_container = document.querySelector(".backdrop");

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
