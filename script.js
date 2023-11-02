"use strict";

(() => { 
    const TARGET = "Puas";
    const SAVE = true;

    console.log(`
%cy%co%cu%ck%cw%ch%cd %c<lolywk@tutanota.com>%c
https://github.com/youkwhd/igracias-auto-survey`,
    "background-color: #000000; color: #1a94d0",
    "background-color: #000000; color: #01ad61",
    "background-color: #000000; color: #7cc53e",
    "background-color: #000000; color: #ffd23d",
    "background-color: #000000; color: #f97c25",
    "background-color: #000000; color: #e82c31",
    "background-color: #000000; color: #b40be2",
    "background-color: #000000; color: #ffffff",
    "background-color: #000000; color: #7bf920");

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
