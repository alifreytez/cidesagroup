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

export default AnimateNavMenu;