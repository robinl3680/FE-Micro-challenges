document.addEventListener("DOMContentLoaded", () => {
  (() => {
    const TOTAL_BARS = 10;
    const CONCURRECY_LIMIT = 4;
    const container = document.getElementById("container");
    let queue = [];
    let activeBars = 0;

    function createBar() {
      for (let i = 0; i < TOTAL_BARS; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "progress-container";
        const bar = document.createElement("div");
        bar.className = "progress-bar";
        wrapper.appendChild(bar);
        queue.push(bar);
        container.appendChild(wrapper);
      }
    }

    function processQueue() {
      if (queue.length === 0 || activeBars >= CONCURRECY_LIMIT) {
        return;
      }
      const bar = queue.shift();
      activeBars++;
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 2;
        bar.style.width = `${Math.min(progress, 100)}%`;
        if (progress >= 100) {
          clearInterval(interval);
          activeBars--;
          processQueue();
        }
      }, 100);
      processQueue();
    }
    createBar();
    processQueue();
  })();
});
