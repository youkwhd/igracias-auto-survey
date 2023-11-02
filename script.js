"use strict";

(() => { 
    const TARGET = "Puas";
    const SAVE = true;

    document
        .querySelectorAll("li>.answerlist2")
        .forEach((node) => {
            if (node.nextSibling.textContent.toLowerCase() == TARGET.toLowerCase()) {
                node.firstChild.click();
            }
        })

    if (SAVE) {
        document.querySelector(".floatL3").click();
    }
})()
