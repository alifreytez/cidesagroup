function AdvancedNavigation({ groupWrapperId, navId } = {}) {
    this.groupWrapperId = groupWrapperId;
    this.navId = navId;
    this.prevBtn = null;
    this.nextBtn = null;
    this.submitBtn = null;
    this.pageWrapper = {};
    this.elementQuantity = null;
    this.sliding = null;
    
    try {
        this.prepare();
        this.compound();
        this.assignBehavior();
    } catch(e) {
        console.log(e);
    }
}

AdvancedNavigation.prototype.prepare = function() {
    this.groupWrapper = document.getElementById(this.groupWrapperId);
    this.nav = document.getElementById(this.navId);
    this.prevBtn = this.nav.querySelector(".prev-btn");
    this.nextBtn = this.nav.querySelector(".next-btn");
    this.submitBtn = document.getElementById("submit-btn");
    this.pageWrapper = this.nav.querySelector(".pages");
    this.slider = this.groupWrapper.querySelector(".input-slider");
    this.elementQuantity = this.groupWrapper.querySelectorAll(".input-group").length;

    if (this.groupWrapperId == null || this.navId == null)
        throw "some of ids is null";
    else if (this.groupWrapper == null || this.nav == null)
        throw "elements do not exist or they are invalid";
}
AdvancedNavigation.prototype.compound = function() {
    const optionsFragment = new DocumentFragment();
    for (let i = 1; i <= this.elementQuantity; i++) {
        const li = document.createElement("li");
        li.classList.add("option");
        li.dataset.group = i;

        if (i == 1)
            li.classList.add("current");

        optionsFragment.appendChild(li);
    }
    this.pageWrapper.appendChild(optionsFragment);
}
AdvancedNavigation.prototype.assignBehavior = function() {
    document.addEventListener("click", () => {
        const target = event.target;

        if (target.matches(`#${this.navId} .pages li, #${this.navId} .pages li *`))
            this.slideTo(new Number(target.dataset.group));

        if (target.matches(`#${this.navId} .prev-btn, #${this.navId} .prev-btn * `))
            this.slideToPrev();

        if (target.matches(`#${this.navId} .next-btn, #${this.navId} .next-btn * `))
            this.slideToNext();
    });
}
AdvancedNavigation.prototype.updateNav = function(groupIndex) {
    if (groupIndex == null)
        return;

        console.log(this.submitBtn);
    if (groupIndex == this.elementQuantity) {
        this.submitBtn.classList.add("display");
        setTimeout(() => this.submitBtn.classList.add("show"), 10);
    } else {        
        this.submitBtn.classList.remove("show");
        setTimeout(() => this.submitBtn.classList.remove("display"), 200);
    }
    
    this.pageWrapper.querySelectorAll(".option").forEach(element => {
        if (element.dataset.group == groupIndex) {
            element.classList.add("current");
            return;
        }
        element.classList.remove("current");        
    });
}
AdvancedNavigation.prototype.slideToPrev = function() {
    const currentGroup = this.slider.querySelector(".input-group.current");
    const currentPos = currentGroup.dataset.group;

    if (currentPos == 1)
        return;
    
    this.slideTo(new Number(currentPos) - 1);
}
AdvancedNavigation.prototype.slideToNext = function() {
    const currentGroup = this.slider.querySelector(".input-group.current");
    const currentPos = currentGroup.dataset.group;

    if (currentPos == this.elementQuantity)
        return;
    
    this.slideTo(new Number(currentPos) + 1);
}
AdvancedNavigation.prototype.slideTo = function(groupIndex) {
    if (this.sliding)
        return;

    this.sliding = true;
    const oldGroup = this.slider.querySelector(".input-group.current");
    const newGroup = this.slider.querySelector(`.input-group[data-group="${groupIndex}"]`);

    if (groupIndex == null || oldGroup.dataset.group == groupIndex)
        return;

    // hide old group
    oldGroup.classList.remove("show");
    setTimeout(() => {
        oldGroup.classList.remove("current");
        oldGroup.classList.remove("display")
    }, 500);
    // show new group
    setTimeout(() => {
        newGroup.classList.add("display");
        setTimeout(() => {
            newGroup.classList.add("current");
            newGroup.classList.add("show");
            this.sliding = null;
        }, 10);
    }, 500);
    this.updateNav(groupIndex);
}

export default AdvancedNavigation;