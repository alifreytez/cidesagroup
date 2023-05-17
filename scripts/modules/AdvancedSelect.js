function AdvancedSelect(id = null) {
    this.id = id;
    this.switchingMenu = null;
    this.openedMenu = false;
    this.selectElement = null;
    this.options = {};
    this.advancedSelect = null;
    this.advancedSelectMenu = null;
    this.advancedSelectText = null;
    this.advancedSelectBtn = null;

    try {
        this.prepare(id);
        this.interpolate();
        this.assignBehavior();
    } catch (e) {
        console.log(e);
    }
}

AdvancedSelect.prototype.prepare = function() {
    this.advancedSelect = document.getElementById(this.id);
    this.selectElement = document.getElementById(this.advancedSelect.dataset.selectId);
    this.advancedSelectMenu = this.advancedSelect.querySelector(".menu");
    this.advancedSelectText = this.advancedSelect.querySelector(".option-text");
    this.advancedSelectBtn = this.advancedSelect.querySelector(".option-menu-btn");

    if (this.id == null)
        throw "id is null"
    else if (this.selectElement == null)
        throw "elements do not exist or they are invalid"
    
    this.selectElement.querySelectorAll("option").forEach((element) => {
        this.options[element.value] = element;
    });
}
AdvancedSelect.prototype.interpolate = function() {
    const optionsFragment = new DocumentFragment();

    Object.entries(this.options).forEach(([value, element]) => {
        const li = document.createElement("li");
        li.dataset.value = value;
        li.dataset.selected = element.selected;
        li.textContent = element.textContent;
        
        if (element.selected)
            this.advancedSelectText.textContent = element.textContent;

        optionsFragment.appendChild(li);
    });
    
    this.advancedSelectMenu.appendChild(optionsFragment);
}
AdvancedSelect.prototype.assignBehavior = function() {
    document.addEventListener("click", () => {
        const target = event.target;

        if (target.matches(`#${this.id} li, #${this.id} li *`)) {
            this.options[target.dataset.value].selected = true;
            this.advancedSelectText.textContent = target.textContent;
            this.closeMenu();
        }

        if (target.matches(`#${this.id} .option-text-wrapper, #${this.id} .option-text-wrapper *`))
            this.switchMenu();
        
        if (target.matches(`*:not(#${this.id} *)`))
            this.closeMenu();
    });
}
AdvancedSelect.prototype.openMenu = function() {
    this.advancedSelect.querySelector(".menu").classList.add("display");
    this.advancedSelectBtn.classList.add("opened");
    setTimeout(() => this.advancedSelectMenu.classList.add("show"), 10);
    setTimeout(() => {
        this.openedMenu = true;
        this.switchingMenu = null;
    }, 500);
}
AdvancedSelect.prototype.closeMenu = function() {
    this.advancedSelect.querySelector(".menu").classList.remove("show");
    this.advancedSelectBtn.classList.remove("opened");
    setTimeout(() => {
        this.advancedSelectMenu.classList.remove("display");
        this.openedMenu = false;
        this.switchingMenu = null;
    }, 500);
}
AdvancedSelect.prototype.switchMenu = function() {
    if (this.switchingMenu != null)
        return;

    const action = this.openedMenu ? this.closeMenu : this.openMenu;
    
    this.switchingMenu = true;
    action.call(this);
}

export default AdvancedSelect;