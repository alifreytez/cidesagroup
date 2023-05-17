//import AnimatePreloaderPage from "./modules/AnimatePreloaderPage.js";
import AdvancedSelect from "./modules/AdvancedSelect.js";
import AdvancedNavigation from "./modules/AdvancedNavigation.js";

document.addEventListener("DOMContentLoaded", () => {
	const advancedSelects = [];

	AOS.init({ 
		once: true,
		delay: 200
	});

	document.querySelectorAll(".advanced-select").forEach(element => {
		new AdvancedSelect(element.getAttribute("id"));
	});

	new AdvancedNavigation({ groupWrapperId: "advfor-input-wrapper", navId: "advfor-navigation" });
});
/*window.addEventListener("load", function() {
	const preloaderPage = new AnimatePreloaderPage();

	preloaderPage.close();
});*/
