(() => {
    const FIXED_TARGETS = [
        "Puas",
        "Setuju",
        "Ya",
    ];

    const TEXT_INPUT_VALUE  = "_";
    const AUTO_SAVE = true;

    const SURVEY_MODE_FIXED_TARGET = 1;
    const SURVEY_MODE_RANDOM_TARGET = SURVEY_MODE_FIXED_TARGET << 1;
    const SURVEY_MODE = SURVEY_MODE_FIXED_TARGET | SURVEY_MODE_RANDOM_TARGET;

    if (AUTO_SAVE) {
        const submitButton = document.querySelector(".floatL4");

        if (submitButton) {
            submitButton.click();
        }
    }

    document
        .querySelectorAll(`ul:has(li>div[class="answerlist1"])`)
        .forEach((node) => {
            node.__IGRACIAS_SURVEY_FILLED = false;

            if (SURVEY_MODE & SURVEY_MODE_FIXED_TARGET) {
                if (node.__IGRACIAS_SURVEY_FILLED)
                    return;

                for (let i = 0; i < node.childNodes.length; i++) {
                    for (let j = 0; j < FIXED_TARGETS.length; j++) {
                        if (node.childNodes[i].lastChild.textContent.toLowerCase() === FIXED_TARGETS[j].toLowerCase()) {
                            node.childNodes[i].firstChild.firstChild.click();
                            node.__IGRACIAS_SURVEY_FILLED = true;
                            return;
                        }
                    }
                }
            }

            if (SURVEY_MODE & SURVEY_MODE_RANDOM_TARGET) {
                if (node.__IGRACIAS_SURVEY_FILLED)
                    return;

                const randomTarget = node.childNodes[Math.floor(Math.random() * node.childNodes.length)];
                randomTarget.firstChild.firstChild.click();
                node.__IGRACIAS_SURVEY_FILLED = true;
            }
        });

    document
        .querySelectorAll("textarea")
        .forEach((node) => node.value = TEXT_INPUT_VALUE);

    if (AUTO_SAVE) {
        document.querySelector(".floatL3").click();
    }
})();
