/* ATTENTION: This script is no longer maintained, instead
 * will be adopted to be a fully functional extension.
 * 
 * see: https://github.com/youkwhd/igracias.telkomuniversity.ac.id/
 */

(() => {
    const config = { targets: ["Puas", "Ya"], input: "_", save: true };
    const {targets, input, save} = config;

    if (save) {
        const submitButton = document.querySelector(".floatL4");

        if (submitButton) {
            submitButton.click();
            return;
        }
    }

    document
        .querySelectorAll("li>.answerlist2")
        .forEach((node) => {
            targets.forEach((target) => {
                if (node.nextSibling.textContent.toLowerCase() == target.toLowerCase()) {
                    node.firstChild.click();
                }
            })
        });

    document
        .querySelectorAll("textarea")
        .forEach((node) => node.value = input);

    if (save)
        document.querySelector(".floatL3").click();
});
