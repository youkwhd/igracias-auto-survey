const __browser = chrome ?? browser;

const getConfig = async () => {
    const config = await __browser.storage.local.get();

    if (Object.keys(config).length === 0) {
        const defaultConfig = {
            targets: ["Puas", "Ya"],
            input: "_",
            save: true,
        };

        await __browser.storage.local.set(defaultConfig);
        return defaultConfig;
    }

    return config;
}

const saveConfig = async (newConfig) => {
    await __browser.storage.local.set(newConfig);
}

const resetForm = (form, config) => {
    config.targets.forEach((t, i) => form.querySelector(`#igraciasv-settings-select-${i}`).value = t);
    form.querySelector("#igraciasv-settings-input").value = config.input;
    form.querySelector("#igraciasv-settings-save").checked = config.save;
}

const configFromForm = (form) => {
    return {
        targets: [...Array(2).keys()].map((_, i) => form.querySelector(`#igraciasv-settings-select-${i}`).value),
        input: form.querySelector("#igraciasv-settings-input").value,
        save: form.querySelector("#igraciasv-settings-save").checked,
    }
}

(async () => {
    let config = await getConfig();
    const form = document.querySelector("#igraciasv-settings-form");
    resetForm(form, config);

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        config = configFromForm(form);
        await saveConfig(config);
        resetForm(form, config);
    });
})();
