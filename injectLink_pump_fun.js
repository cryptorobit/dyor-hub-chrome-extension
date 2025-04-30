(function () {
    const url = new URL(window.location.href);
    const token = url.pathname.split("/").pop();
    if (!token || !/pump$/i.test(token)) return;
  
    const injectButton = (refButton) => {
      if (!refButton || refButton.parentElement.querySelector("#dyorhub-button")) return;
  
      const button = document.createElement("a");
      button.id = "dyorhub-button";
      button.href = `https://dyorhub.xyz/tokens/${token}`;
      button.target = "_blank";
      button.rel = "noopener noreferrer";
      button.className =
        "duration-400 relative flex h-6 w-full cursor-pointer items-center rounded-md bg-gray-700 px-2 py-1 text-gray-400 transition-all hover:bg-gray-600 mt-2";
  
      button.innerHTML = `
        <div class="flex flex-grow justify-center">
          <span class="font-semibold text-gray-400">view on DYORHUB:</span>&nbsp;
          <span class="max-w-[120px] truncate text-xs font-light">${token.slice(0, 6)}...pump</span>
        </div>
        <div class="absolute right-2">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="inline-block" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      `;
  
      refButton.parentElement.insertBefore(button, refButton.nextSibling);
      console.log("DYORHUB: Button injected!");

    };
  
    const observer = new MutationObserver((mutations, obs) => {
      const refButton = document.querySelector('button[data-sentry-component="CopyClipboardCoin"]');
      if (refButton) {
        injectButton(refButton);
        obs.disconnect(); 
      }
    });
  
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  })();
  