"use strict";

const container = document.getElementById("container");
const body = document.getElementById("body");

const xhr = new XMLHttpRequest("");
xhr.onload = showGenres;
xhr.open("GET", "result.json")
xhr.send()

function showGenres(e) {
    const json = JSON.parse(this.responseText);
    buildAndShowDiv(json.tree)
}

function buildAndShowDiv(children) {
    container.innerHTML="";
    if (children.previous) {
        const previousButtonText = document.createTextNode("Previous");
        const previousButton = document.createElement("button");
        previousButton.className = "previous";
        previousButton.node = children.previous;
        previousButton.addEventListener("click", showNext);
        previousButton.appendChild(previousButtonText);
        container.appendChild(previousButton);
        const hr = document.createElement("hr");
        container.appendChild(hr);
    }
    children.forEach(element => {
        const div = document.createElement("div");
        div.className = "elem";
        const nameText = document.createTextNode(element.nodeName);
        const descriptionText = document.createTextNode(element.description);
        const link = document.createElement("a");
        link.href = element.link;
        link.className = "smallChild";
        link.target = "_blank"
        link.appendChild(nameText);
        const descriptionDiv = document.createElement("div");
        descriptionDiv.appendChild(descriptionText);
        descriptionDiv.className = "smallChild";
        div.appendChild(link);
        div.appendChild(descriptionDiv);
        if (element.children.length !== 0) {
            const nextButtonText = document.createTextNode("Next");
            const nextButton = document.createElement("button");
            nextButton.node = element.children;
            element.children.previous = children;
            nextButton.addEventListener("click", showNext);
            nextButton.appendChild(nextButtonText);
            nextButton.className = "smallChild";
            div.appendChild(nextButton);
        }
        container.appendChild(div);
    });
}

function showNext(e) {
    buildAndShowDiv(this.node);
}
