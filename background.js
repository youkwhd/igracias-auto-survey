(() => {
    browser.contextMenus.create({
        id: "igracias-auto-survey-ctxmenu",
        title: "Auto fill Igracias surveys",
    });
      
    browser.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === "igracias-auto-survey-ctxmenu") {
            browser.scripting.executeScript({
                target: {
                    tabId: tab.id,
                    allFrames: true,
                },
                func: () => {
                    let config = {
                        targets: ["Puas", "Ya"],
                        input: "_",
                        save: true,
                    };
                
                    browser.storage.local
                        .get(config)
                        .then((cfg) => config = cfg);
                    
                    if (!location.href.match(new RegExp(".*:\/\/igracias\.telkomuniversity\.ac\.id/survey/.*")))
                        return;
                    
                    if (config.save) {
                        const submitButton = document.querySelector(".floatL4");

                        if (submitButton) {
                            submitButton.click();
                            return;
                        }
                    }

                    document
                        .querySelectorAll("li>.answerlist2")
                        .forEach((node) => {
                            config.targets.forEach((target) => {
                                if (node.nextSibling.textContent.toLowerCase() == target.toLowerCase()) {
                                    node.firstChild.click();
                                }
                            })
                        });
                    
                    document
                        .querySelectorAll("textarea")
                        .forEach((node) => node.value = config.input);

                    if (config.save)
                        document.querySelector(".floatL3").click();
                } 
            });
        }
    });
})();

