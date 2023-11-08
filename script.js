"use strict";

(() => { 
    const TARGETS = ["Puas", "Ya"];
    const INPUT = "_";
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

    if (SAVE) {
        const submitButton = document.querySelector(".floatL4");

        if (submitButton) {
            submitButton.click();
            return;
        }
    }

    document
        .querySelectorAll("li>.answerlist2")
        .forEach((node) => {
            TARGETS.forEach((target) => {
                if (node.nextSibling.textContent.toLowerCase() == target.toLowerCase()) {
                    node.firstChild.click();
                }
            })
        });
    
    document
        .querySelectorAll("textarea")
        .forEach((node) => node.value = INPUT);

    if (SAVE)
        document.querySelector(".floatL3").click();
})();
