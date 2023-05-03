function AnimatePreloaderPage() {
	this.element = document.getElementById("preloader-page");
	this.waitting = 1000;
	this.timeout = null;
	
	this.open = () => {
		this.element.classList.add("displayed");
		setTimeout(() => this.element.classList.add("showed"), 10);
	}
	this.close = () => {
		const diff = new Date(Date.now()) - AnimatePreloaderPage.startAt;

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
AnimatePreloaderPage.startAt = new Date(Date.now());

export default AnimatePreloaderPage;