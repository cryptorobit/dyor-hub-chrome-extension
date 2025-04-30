(function () {
    const extractTokenFromAxiom = () => {
      const links = Array.from(document.querySelectorAll('a[href^="https://x.com/search?q="]'));
      if (links.length < 2) return null;
    
      const secondLink = links[1];
      const url = new URL(secondLink.href);
      const token = url.searchParams.get("q");
    
      return (token && token.endsWith("pump")) ? token : null;
    };
  
  
    const createDYORButton = (token) => {
      const a = document.createElement("a");
      a.id = "dyorhub-button";
      a.href = `https://dyorhub.xyz/tokens/${token}`;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "text-textSecondary text-[16px] hover:text-primaryBlueHover transition-colors duration-[125ms]";
      a.title = "View on DYORHUB";
      a.innerHTML = `
                  <strong>DYORHUB</strong>

      `;
      return a;
    };
  
    const injectButtonIfReady = () => {
      const token = extractTokenFromAxiom();
      if (!token) return;
  
      if (document.getElementById("dyorhub-button")) return;
  
      const xSearchLink = document.querySelectorAll('a[href^="https://x.com/search?q="]')[1];
      if (!xSearchLink || !xSearchLink.parentElement) return;
  
      const dyorBtn = createDYORButton(token);
      xSearchLink.parentElement.appendChild(dyorBtn);
  
      console.log("DYORHUB: Button injected!");
      observer.disconnect();
      clearTimeout(timeout);
    };
  
    const observer = new MutationObserver(() => injectButtonIfReady());
    observer.observe(document.body, { childList: true, subtree: true });
  
    const timeout = setTimeout(() => {
      observer.disconnect();
    }, 10000);
  
    injectButtonIfReady();
  })();
  