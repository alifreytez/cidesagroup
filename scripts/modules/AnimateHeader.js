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

export default AnimateHeader;