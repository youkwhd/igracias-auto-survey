(() => {
    const TARGETS = [
        "Puas",
        "Setuju",
        "Ya",
    ];

    const TEXT_INPUT_VALUE  = "_";
    const AUTO_SAVE = true;

    const SURVEY_MODE_TARGETS = 1;
    const SURVEY_MODE_RANDOM = SURVEY_MODE_TARGETS << 1;
    const SURVEY_MODE = SURVEY_MODE_TARGETS | SURVEY_MODE_RANDOM;

    const saveSurvey = () => {
        const submitButton = document.querySelector(".floatL4");

        if (submitButton) {
            submitButton.click();
            return true;
        }

        return false;
    };

    const fillSurvey = (mode) => {
        const pickTarget = (mode, node) => {
            node.__IGRACIAS_SURVEY_FILLED = false;

            if (mode & SURVEY_MODE_TARGETS) {
                if (node.__IGRACIAS_SURVEY_FILLED)
                    return;

                for (let i = 0; i < node.childNodes.length; i++) {
                    for (let j = 0; j < TARGETS.length; j++) {
                        if (node.childNodes[i].lastChild.textContent.toLowerCase() === TARGETS[i].toLowerCase()) {
                            node.childNodes[i].firstChild.firstChild.click();
                            node.__IGRACIAS_SURVEY_FILLED = true;
                            return;
                        }
                    }
                }
            }

            if (mode & SURVEY_MODE_RANDOM) {
                if (node.__IGRACIAS_SURVEY_FILLED)
                    return;

                const randomTarget = node.childNodes[Math.floor(Math.random() * node.childNodes.length)];
                randomTarget.firstChild.firstChild.click();
                node.__IGRACIAS_SURVEY_FILLED = true;
            }
        };

        document
            .querySelectorAll(`ul:has(li>div[class="answerlist1"])`)
            .forEach((node) => pickTarget(mode, node));

        document
            .querySelectorAll("textarea")
            .forEach((node) => node.value = TEXT_INPUT_VALUE);
    };

    if (AUTO_SAVE) {
        const saved = saveSurvey();
        if (saved) return;
    }

    fillSurvey(SURVEY_MODE);

    if (AUTO_SAVE) {
        saveSurvey();
    }
})();
