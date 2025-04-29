document.addEventListener("DOMContentLoaded", () => {
console.log('DYORHUB Chrome extension initialized');
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const button = document.getElementById("go_button");
    const noCAElement = document.getElementById("no_CA");
    const domainElement = document.getElementById("domain_name");
    try {
        const fullUrl = tabs[0].url;
        const regex = /[^/?#]+pump(?=([/?#]|$))/i;
        const match = fullUrl.match(regex);
        const urlObj = new URL(fullUrl);
        //avoid self linking
        if (urlObj.hostname === "dyorhub.xyz") {
            noCAElement.textContent = "Already on DYORHUB.";
            button.style.display = "none";
            return;
          }       
        
        if (match) {
            //ca found in url
            const matchedText = match[0];
            button.style.display = "inline-block";
            button.addEventListener("click", () => {
                chrome.tabs.create({ url: `https://dyorhub.xyz/tokens/${matchedText}` });
            });
            noCAElement.textContent = "";
            domainElement.innerHTML = `CA Found on ${urlObj.hostname}<br /><br />`;
        } 
        else 
        {
            //ca not found
            button.style.display = "none";
            domainElement.style.display = "none";
            noCAElement.textContent = "No pump.fun token CA found in current page.";
        }
    }
    catch (e) {
        //url parsing issues
        button.style.display = "none";
        noCAElement.textContent = "Error parsing the URL.";
      }
  });
});