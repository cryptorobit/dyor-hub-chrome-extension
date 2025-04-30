(function () {
    const getTokenFromSolscan = () => {
      const explorerLink = document.querySelector('a[href^="https://solscan.io/token/"]');
      if (!explorerLink) return null;
  
      const match = explorerLink.href.match(/token\/([a-zA-Z0-9]+pump)/i);
      return match ? match[1] : null;
    };
  
    const injectButtonIfReady = () => {
        const token = getTokenFromSolscan();
        if (!token) return;
        
        if (document.getElementById("dyorhub-button")) return;
        
        const priceLabel = Array.from(document.querySelectorAll("span.chakra-text"))
            .find(el => el.textContent?.trim() === "Price USD");
        
        if (!priceLabel) {
            console.log("DYORHUB: 'Price USD' label not found – waiting...");
            return;
        }
        
        // 🔼 Sali fino al div principale contenitore (es. .chakra-stack.custom-wpcv6r)
        let container = priceLabel;
        for (let i = 0; i < 4; i++) {
            if (container?.parentElement) container = container.parentElement;
        }
        
        if (!container || !container.classList.contains("chakra-stack")) {
            console.log("DYORHUB: Container principale non trovato");
            return;
        }
        
        const dyorBtn = document.createElement("button");
        dyorBtn.id = "dyorhub-button";
        dyorBtn.type = "button";
        dyorBtn.className = "chakra-button custom-uavd00";
        dyorBtn.title = "Open on DYORHUB";
        dyorBtn.onclick = () => {
            window.open(`https://dyorhub.xyz/tokens/${token}`, "_blank", "noopener");
        };
        dyorBtn.innerHTML = `
            <span class="chakra-button__icon custom-9l50of">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="chakra-icon custom-13otjrl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M432 32H320a16 16 0 0 0 0 32h66.1L201.4 248.8a16 16 0 0 0 0 22.6l22.6 22.6a16 16 0 0 0 22.6 0L432 121.9V188a16 16 0 0 0 32 0V80a48 48 0 0 0-48-48zM400 448H64V112a16 16 0 0 0-32 0v336a48 48 0 0 0 48 48h336a16 16 0 0 0 0-32z"/>
            </svg>
            </span>
            <span class="custom-i6bazn">Open in DYORHUB</span>
        `;
        
        container.appendChild(dyorBtn); // oppure container.prepend(dyorBtn) se lo vuoi in alto
        console.log("DYORHUB: Button injected into main container");
        observer.disconnect();
        clearTimeout(failSafeTimeout);
    };
      
      
  
    const observer = new MutationObserver(() => {
      injectButtonIfReady();
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
    injectButtonIfReady();
  
    // 🕐 Timeout di sicurezza: dopo 10 secondi disconnetti comunque
    const failSafeTimeout = setTimeout(() => {
      observer.disconnect();
    }, 10000);
  })();
  