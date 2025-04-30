chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.includes("gmgn.ai")) {
    chrome.scripting.executeScript({
        target: { tabId },
        files: ["injectLink_gmgn_ai.js"]
    });
    } else if (tab.url.includes("pump.fun")) {
    chrome.scripting.executeScript({
        target: { tabId },
        files: ["injectLink_pump_fun.js"]
    });
    } else if (tab.url.includes("dexscreener.com")) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ["injectLink_dexscreener_com.js"]
        });
    } else if (tab.url.includes("axiom.trade")) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ["injectLink_axiom_trade.js"]
        });
    }
}
});
  