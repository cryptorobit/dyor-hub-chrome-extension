document.addEventListener("DOMContentLoaded", () => {
console.log('DYORHUB Chrome extension initialized');
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const fullUrl = tabs[0].url;
    console.log(fullUrl);
    const regex = /[^/?#]+pump(?=([/?#]|$))/i;

    const match = fullUrl.match(regex);
    const button = document.getElementById("go_button");
    const noCAElement = document.getElementById("no_CA");
    const domainElement = document.getElementById("domain_name");

    let showLink = true;

    try {
        const urlObj = new URL(fullUrl);
        if (urlObj.hostname === "dyorhub.xyz") {
            showLink = false;
            noCAElement.textContent = "Already on DYORHUB.";
            button.style.display = "none";
            return;
          }       
        else
        {
            domainElement.innerHTML = `CA Found on ${urlObj.hostname}<br /><br />`;
        }
       

        if (match) {
        const matchedText = match[0];
        button.style.display = "inline-block";
        button.addEventListener("click", () => {
            chrome.tabs.create({ url: `https://dyorhub.xyz/tokens/${matchedText}` });
        });
        noCAElement.textContent = "";
        } else {
        button.style.display = "none";
        domainElement.style.display = "none";
        noCAElement.textContent = "No pump.fun token CA found in current page.";
        }
    }
    catch (e) {
        button.style.display = "none";
        noCAElement.textContent = "Error parsing the URL.";
      }
  });
});