(() => {
    let __browser = chrome ?? browser;

    const parentMenu = __browser.contextMenus.create({
        id: "igraciasv-parent",
        title: "Igracias Auto Survey",
    });
    
    __browser.contextMenus.create({
        parentId: parentMenu,
        id: "igraciasv-execute",
        title: "Execute",
    });

    __browser.contextMenus.create({
        parentId: parentMenu,
        id: "igraciasv-debug",
        title: "Debug",
    });
    
    __browser.contextMenus.onClicked.addListener((info, tab) => {
        switch (info.menuItemId) {
        case "igraciasv-debug":
            __browser.scripting.executeScript({
                target: {
                    tabId: tab.id,
                    allFrames: true,
                },
                func: async () => {
                    const __browser = chrome ?? browser;
                    let config = await __browser.storage.local.get();
                    if (Object.keys(config).length === 0) {
                        const defaultConfig = {
                            targets: ["Puas", "Ya"],
                            input: "_",
                            save: true,
                        };
                        await __browser.storage.local.set(defaultConfig);
                        config = defaultConfig;
                    }

                    console.info("igraciasv: ", config);
                }
            });
            break;
        case "igraciasv-execute":
            __browser.scripting.executeScript({
                target: {
                    tabId: tab.id,
                    allFrames: true,
                },
                func: async () => {
                    const __browser = chrome ?? browser;
                    let config = await __browser.storage.local.get();
                    if (Object.keys(config).length === 0) {
                        const defaultConfig = {
                            targets: ["Puas", "Ya"],
                            input: "_",
                            save: true,
                        };
                        await __browser.storage.local.set(defaultConfig);
                        config = defaultConfig;
                    }

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
                } 
            });
            break;
        }
    });
})();
