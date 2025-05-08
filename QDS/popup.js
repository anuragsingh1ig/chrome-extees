const environments = {
    local: "http://www.impactguru.localhost",
    stage1: "https://stage3.igstg.com",
    stage2: "https://stage3.igstg.com",
    stage3: "https://stage3.igstg.com",
    stage4: "https://stage3.igstg.com",
    stage5: "https://stage3.igstg.com",
    stage6: "https://stage3.igstg.com",
    stage7: "https://stage7.igstg.com",
    live: "https://www.impactguru.com"
};

function getCurrentEnvironment(url) {
    for (curEnv in environments) {
        if (url.includes(environments[curEnv])) return curEnv;
    }

    return null;
}

function capitalizeLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.url) return;

    const currentEnv = getCurrentEnvironment(tab.url);
    const urlPath = new URL(tab.url).pathname + new URL(tab.url).search;

    const buttonsContainer = document.getElementById('buttons');

    Object.keys(environments).forEach(env => {
        const button = document.createElement('button');
        button.id = env;
        button.textContent = capitalizeLetter(env);

        if (currentEnv === env) {
            button.classList.add('active');
            button.disabled = true;
        }

        button.addEventListener('click', () => {
            const targetUrl = environments[env] + urlPath;
            chrome.tabs.update(tab.id, { url: targetUrl });
            window.close();
        });

        buttonsContainer.appendChild(button);
    });
});
