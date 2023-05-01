function StartedAt() {}
StartedAt.addSpace = function(item) {
	StartedAt.space = { ...StartedAt.space, ...item };

	try {
		item();
	} catch (error) {
		console.log(`error: ${error}`);
	}
}
StartedAt.removeSpace = function() {}
StartedAt.space = {}

function AnimateHeader() {
	this.header = document.querySelector("header");
	this.banner = document.querySelector("#banner");
	this.contentPos = document.querySelector("header .header-wrapper").offsetTop;
	this.isMobable = false;

	this.iniObserver = () => {
		window.addEventListener("scroll", () => {
			if (this.scrollPassed()) {
				if (!this.isMobable){
					this.becomeMovable();
				}
			} else if (this.isMobable) {
				this.becomeNotMovable();
			}
		});
	}
	this.scrollPassed = () => window.scrollY >= this.contentPos;
	this.becomeMovable = () => {
		this.banner.classList.add("adjust-height");
		this.header.classList.add("mobile");
		this.isMobable = true;
	}
	this.becomeNotMovable = () => {
		this.banner.classList.remove("adjust-height");
		this.header.classList.remove("mobile");
		this.isMobable = false;
	}
}
function AnimateNavMenu() {
	this.menu = document.getElementById("responsive-menu");
	this.btnOpen = document.getElementById("nav-menu-btn-open");
	this.btnClose = document.getElementById("nav-menu-btn-close");
	this.isOpened = false;
	this.executing = false;

	this.ini = () => {
		document.addEventListener("click", () => {
			if (this.executing)
				return;

			if (event.target.matches("#nav-menu-btn-close")) {
				if (!this.isOpened)
					return;

				this.executing = true;

				this.close();
				setTimeout(() => {
					this.isOpened = false;
					this.executing = false;
				}, 500);
			} else if (event.target.matches("#nav-menu-btn-open, #nav-menu-btn-open *")) {
				console.log("click open ")
				if (this.isOpened)
					return;

				this.executing = true;

				console.log("vamos a abrir")
				this.open();
				setTimeout(() => {

					console.log("abriendo")
					this.isOpened = true;
					this.executing = false;
				}, 500);
			}
		});
	}
	this.open = () => this.menu.classList.add("showed");
	this.close = () => this.menu.classList.remove("showed");
}
function PreloaderPage() {
	this.element = document.getElementById("preloader-page");
	this.waitting = 1000;
	this.timeout = null;
	
	this.open = () => {
		this.element.classList.add("displayed");
		setTimeout(() => this.element.classList.add("showed"), 10);
	}
	this.close = () => {
		const diff = new Date(Date.now()) - PreloaderPage.startAt;

		if (diff < this.waitting) {
			if (this.timeout == null)
				this.timeout = setTimeout(() => this.close(), this.waitting - diff);

			return;
		}

		this.element.classList.remove("showed");
		document.body.style.overflowY = "auto";
		setTimeout(() => this.element.classList.remove("displayed"), 500);
	}
}
PreloaderPage.startAt = new Date(Date.now());

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
	const preloaderPage = new PreloaderPage();

	preloaderPage.close();
});
