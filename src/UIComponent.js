class CustomBtn {
    constructor(btnName, btnOnClick, isShow = true, desc = "") {
        if (isShow === false) {
            return;
        }
        const td = document.createElement("td");
        const button = document.createElement("button");
        button.addEventListener("click", btnOnClick);
        button.innerHTML = btnName;
        td.append(button);
        td.title = desc;
        const container = document.getElementById("toolbarContainer");
        container.append(td);
    }
}

export {
	CustomBtn
}