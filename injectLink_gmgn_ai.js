(function () {
    let hrefObserver = null;
    let searchcaObserver = null;
    let lastToken = null;
  
    const extractTokenFromHref = (href) => {
      try {
        const url = new URL(href, window.location.origin);
        const token = url.searchParams.get("q");
        if (token && /pump$/i.test(token)) return token;
      } catch (e) {}
      return null;
    };
  
    const injectDYORLink = (token) => {
      if (token === lastToken) return; // prevent duplicate injection
      lastToken = token;
  
      const target = document.getElementById("searchca");
      if (!target || !target.parentElement) return;
  
      const parent = target.parentElement;
  
      document.getElementById("dyorhub-separator")?.remove();
      document.getElementById("dyorhub-link")?.remove();
  
      const separator = document.createElement("i");
      separator.id = "dyorhub-separator";
      separator.className = "w-[0.5px] h-10px bg-line-200";
      separator.style.display = "inline-block";
      separator.style.margin = "0";
  
      const a = document.createElement("a");
      a.id = "dyorhub-link";
      a.rel = "noopener noreferrer";
      a.target = "_blank";
      a.href = `https://dyorhub.xyz/tokens/${token}`;
      a.className = "css-1dgetxa";
      a.innerHTML = `
        <div class="flex gap-x-2px items-center text-[13px] leading-[16px] font-normal text-text-300 transition-colors hover:text-text-100">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <g clip-path="url(#clip_dyorhub_icon)">
              <path d="M15.8783 16.145C16.1956 15.8277 16.7101 15.8277 17.0274 16.145L18.8844 18.002C19.2017 18.3193 19.2017 18.8337 18.8844 19.151 18.5671 19.4683 18.0526 19.4683 17.7353 19.151L15.8783 17.294C15.561 16.9767 15.561 16.4623 15.8783 16.145ZM9.11776 2.30273C5.31739 2.30273 2.23657 5.38355 2.23657 9.18393 2.23657 12.9843 5.31739 16.0651 9.11776 16.0651 12.9181 16.0651 15.999 12.9843 15.999 9.18393 15.999 5.38355 12.9181 2.30273 9.11776 2.30273ZM.611572 9.18393C.611572 4.48609 4.41992.677734 9.11776.677734 13.8156.677734 17.624 4.48609 17.624 9.18393 17.624 13.8818 13.8156 17.6901 9.11776 17.6901 4.41992 17.6901.611572 13.8818.611572 9.18393Z"></path>
            </g>
            <defs><clipPath id="clip_dyorhub_icon"><rect width="20" height="20"></rect></clipPath></defs>
          </svg>
          <strong>DYORHUB</strong>
        </div>
      `;
  
      parent.appendChild(separator);
      parent.appendChild(a);
      console.log("DYORHUB: Button injected!");

    };
  
    const observeHrefChanges = (target) => {
      if (hrefObserver) hrefObserver.disconnect();
  
      hrefObserver = new MutationObserver(() => {
        const token = extractTokenFromHref(target.getAttribute("href"));
        if (token) {
          injectDYORLink(token);
        } else {
          document.getElementById("dyorhub-separator")?.remove();
          document.getElementById("dyorhub-link")?.remove();
          lastToken = null;
        }
      });
  
      hrefObserver.observe(target, { attributes: true, attributeFilter: ["href"] });
  
      // Run immediately
      const initialToken = extractTokenFromHref(target.getAttribute("href"));
      if (initialToken) injectDYORLink(initialToken);
    };
  
    const waitForSearchca = () => {
      if (searchcaObserver) searchcaObserver.disconnect();
  
      searchcaObserver = new MutationObserver((mutations, obs) => {
        const target = document.getElementById("searchca");
        if (target) {
          observeHrefChanges(target);
          obs.disconnect();
        }
      });
  
      searchcaObserver.observe(document.body, { childList: true, subtree: true });
    };
  
    const patchSPA = () => {
        let lastUrl = location.href;
      
        const checkUrlChange = () => {
          if (location.href !== lastUrl) {
            lastUrl = location.href;
            lastToken = null;
      
            // ⏳ Give time for the new view to render
            setTimeout(() => {
              waitForSearchca(); // start watching again
            }, 5000); // adjust delay if needed
          }
        };
      
        const pushState = history.pushState;
        history.pushState = function () {
          pushState.apply(this, arguments);
          checkUrlChange();
        };
      
        const replaceState = history.replaceState;
        history.replaceState = function () {
          replaceState.apply(this, arguments);
          checkUrlChange();
        };
      
        window.addEventListener("popstate", checkUrlChange);
      };
      
  
    patchSPA();
    waitForSearchca(); // start on load
  })();
  