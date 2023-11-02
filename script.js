"use strict";

let TARGET = "Sangat tidak puas";

(() => { 
    document
        .querySelectorAll("li>.answerlist2")
        .forEach((node) => {
            if (node.nextSibling.textContent.toLowerCase() == TARGET.toLowerCase()) {
                node.firstChild.click();
            }
        })
})()
