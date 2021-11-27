loadScript = (url = "") => {
    const p = new Promise((res, rej) => {
      var script = document.createElement("script");
      script.onload = function () {
        console.log(`loaded script ${url}`);
        res();
      };
      script.onerror = (err) => {
        console.log(`error loading script ${url}`, "log-error");
        res()
      };
      script.src = url;
      document.head.appendChild(script);
    });
    return p;
  };
