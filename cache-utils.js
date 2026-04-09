(function () {
  const CACHE_BUSTER_KEY = "v";

  function appendCacheBuster(url) {
    try {
      const built = new URL(String(url), window.location.href);
      built.searchParams.set(CACHE_BUSTER_KEY, String(Date.now()));
      return built.toString();
    } catch (e) {
      const sep = String(url).includes("?") ? "&" : "?";
      return String(url) + sep + CACHE_BUSTER_KEY + "=" + Date.now();
    }
  }

  function setupAutoUpdateCheck(options) {
    const config = options || {};
    const versionUrl = config.versionUrl || "site-version.json";
    const intervalMs = Number(config.intervalMs || 120000);
    let currentVersion = null;

    function fetchVersion() {
      const url = appendCacheBuster(versionUrl);
      return fetch(url, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache"
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("version fetch failed: " + res.status);
          return res.json();
        })
        .then((data) => String(data.version || ""));
    }

    fetchVersion()
      .then((ver) => {
        currentVersion = ver;
      })
      .catch((err) => {
        console.warn("Auto-update init skipped:", err);
      });

    setInterval(() => {
      fetchVersion()
        .then((latest) => {
          if (!latest || !currentVersion) {
            currentVersion = latest || currentVersion;
            return;
          }
          if (latest !== currentVersion) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.warn("Auto-update check failed:", err);
        });
    }, intervalMs);
  }

  window.cacheUtils = {
    appendCacheBuster,
    setupAutoUpdateCheck
  };
})();
