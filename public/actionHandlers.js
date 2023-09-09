import { showInfoClickHandler, closeInfoClickHandler } from "./modal.js";
import { toggleTheme } from "./theme.js";
import { backClickHandler, open_btnClickHandler } from "./utils.js";

const modal_info = document.getElementById("modal-info");
const modal_donuts = document.getElementById("modal-info-donut");
const back_btn = document.getElementById("back-btn");
const imageBox = document.querySelector(".box-image");
const roll_container = document.getElementById("roll-container");

const actionHandlers = {
	open: open_btnClickHandler,
	"show-info": () => showInfoClickHandler(modal_info),
	"show-donuts": () => showInfoClickHandler(modal_donuts),
	"close-info": () => closeInfoClickHandler(modal_info),
	"close-donuts": () => closeInfoClickHandler(modal_donuts),
	changeTheme: toggleTheme,
	back: () => {
		backClickHandler(back_btn, imageBox, roll_container);
	},
};

export default actionHandlers;
