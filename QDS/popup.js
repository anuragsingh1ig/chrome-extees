const environments = {
    local: "http://www.impactguru.localhost",
    staging: "https://staging.impactguru.com",
    live: "https://www.impactguru.com"
};

function getCurrentEnvironment(url) {
    if (url.includes("impactguru.localhost")) {
        return "local";
    } else if (url.includes("staging.impactguru.com")) {
        return "staging";
    } else if (url.includes("www.impactguru.com")) {
        return "live";
    }
    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab || !tab.url) return;

    const currentEnv = getCurrentEnvironment(tab.url);
    const urlPath = new URL(tab.url).pathname + new URL(tab.url).search;

    Object.keys(environments).forEach(env => {
        const button = document.getElementById(env);

        if (currentEnv === env) {
            button.classList.add('active');
            button.disabled = true;
        }

        button.addEventListener('click', () => {
            const targetUrl = environments[env] + urlPath;
            chrome.tabs.update(tab.id, { url: targetUrl });
            window.close();
        });
    });
});
