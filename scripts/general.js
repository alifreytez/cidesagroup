import AnimateHeader from "./modules/AnimateHeader.js";
import AnimateNavMenu from "./modules/AnimateNavMenu.js";
import AnimatePreloaderPage from "./modules/AnimatePreloaderPage.js";

document.addEventListener("DOMContentLoaded", () => {
	AOS.init({ 
		once: true,
		delay: 200
	});

	const animateHeader = new AnimateHeader();
	const animateNavMenu = new AnimateNavMenu();
	animateHeader.iniObserver();
	animateNavMenu.ini();
});
window.addEventListener("load", function() {
	const preloaderPage = new AnimatePreloaderPage();

	preloaderPage.close();
});
