(() => {
    const parentMenu = browser.contextMenus.create({
        id: "igraciasv-parent",
        title: "Igracias Auto Survey",
    });
    
    browser.contextMenus.create({
        parentId: parentMenu,
        id: "igraciasv-execute",
        title: "Execute",
    });
    
    browser.contextMenus.create({
        parentId: parentMenu,
        id: "igraciasv-settings",
        title: "Settings",
    });
    
    browser.contextMenus.onClicked.addListener((info, tab) => {
        switch (info.menuItemId) {
        case "igraciasv-settings":
            browser.scripting.executeScript({
                target: {
                    tabId: tab.id,
                    allFrames: true,
                },
                func: async () => {
                    let config = await browser.storage.local.get();
                    if (Object.keys(config).length === 0) {
                        const defaultConfig = {
                            targets: ["Puas", "Ya"],
                            input: "_",
                            save: true,
                        };
                        await browser.storage.local.set(defaultConfig);
                        config = defaultConfig;
                    }

                    const __igraciasvSettings = document.querySelector("#igraciasv-settings");
                    if (__igraciasvSettings)
                        return;

                    const div = document.createElement("div");
                    div.id = "igraciasv-settings";
                    div.innerText = "> Settings";
                    document.body.appendChild(div);
                }
            });
            break;
        case "igraciasv-execute":
            browser.scripting.executeScript({
                target: {
                    tabId: tab.id,
                    allFrames: true,
                },
                func: async () => {
                    let config = await browser.storage.local.get();
                    if (Object.keys(config).length === 0) {
                        const defaultConfig = {
                            targets: ["Puas", "Ya"],
                            input: "_",
                            save: true,
                        };
                        await browser.storage.local.set(defaultConfig);
                        config = defaultConfig;
                    }
                
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
            break;
        }
    });
})();
