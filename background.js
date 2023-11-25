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

    browser.contextMenus.create({
        parentId: parentMenu,
        id: "igraciasv-debug",
        title: "Debug",
    });
    
    browser.contextMenus.onClicked.addListener((info, tab) => {
        switch (info.menuItemId) {
        case "igraciasv-debug":
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
                    
                    console.info("igraciasv: ", config);
                }
            });
        break;
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

                    const igraciasvSettings = document.querySelector("#igraciasv-settings");
                    if (igraciasvSettings)
                        return;

                    const div = document.createElement("div");
                    div.id = "igraciasv-settings";
                    div.style.zIndex = "9999";
                    div.style.backgroundColor = "black";
                    div.style.color = "white";
                    div.style.position = "fixed";
                    div.style.left = "50%";
                    div.style.top = "50%";
                    div.style.transform = "translate(-50%, -80%)";
                    div.style.padding = "10px";

                    const header = document.createElement("h1");
                    header.innerText = "Settings";

                    const targetSelects = [document.createElement("select"), document.createElement("select")];
                    targetSelects[0].name = "igraciasv-settings-target-0";
                    targetSelects[1].name = "igraciasv-settings-target-1";

                    ["Sangat Tidak Puas", "Tidak Puas", "Puas", "Sangat Puas"].forEach((v) => {
                        let __option = document.createElement("option");
                        __option.value = v;
                        __option.innerText = v;
                        targetSelects[0].appendChild(__option);
                    });

                    ["Ya", "Tidak"].forEach((v) => {
                        let __option = document.createElement("option");
                        __option.value = v;
                        __option.innerText = v;
                        targetSelects[1].appendChild(__option);
                    });

                    targetSelects[0].value = config.targets[0];
                    targetSelects[1].value = config.targets[1];

                    const inputField = document.createElement("input");
                    inputField.name = "igraciasv-settings-input";
                    inputField.value = config.input;
                    const inputLabel = document.createElement("label");
                    inputLabel.innerText = "Text Input: ";
                    inputLabel.htmlFor = "igraciasv-settings-input";

                    const saveChoice = document.createElement("input");
                    saveChoice.type = "checkbox";
                    saveChoice.checked = config.save;
                    saveChoice.name = "igraciasv-settings-save";
                    const saveLabel = document.createElement("label");
                    saveLabel.innerText = "Auto Save";
                    saveLabel.htmlFor = "igraciasv-settings-save";

                    const saveButton = document.createElement("button");
                    saveButton.innerText = "Save Settings";
                    saveButton.onclick = async (e) => {
                        config = {
                            targets: [targetSelects[0].value, targetSelects[1].value],
                            input: inputField.value,
                            save: saveChoice.checked,
                        };
                        await browser.storage.local.set(config);
                    }

                    const exitButton = document.createElement("button");
                    exitButton.innerText = "Exit";
                    exitButton.onclick = () => {
                        document.querySelector("#igraciasv-settings").remove();
                    } 

                    div.appendChild(header);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(targetSelects[0]);
                    div.appendChild(targetSelects[1]);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(inputLabel);
                    div.appendChild(inputField);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(saveChoice);
                    div.appendChild(saveLabel);
                    div.appendChild(document.createElement("br"));
                    div.appendChild(saveButton);
                    div.appendChild(exitButton);
                    document.body.prepend(div);
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
