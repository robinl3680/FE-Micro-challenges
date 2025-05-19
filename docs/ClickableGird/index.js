document.addEventListener("DOMContentLoaded", () => {
  const grid = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  function createGrid(grid) {
    const flattenedGrid = grid.flat(Infinity);
    const gridContainer = document.getElementById("grid");
    const state = {
      visibleBoxes: flattenedGrid.filter((value) => value === 1).length,
      selectedBoxes: [],
      isUnloading: false,
    };

    function removeSelection(dataIndex) {
      const gridItem = document.querySelector(
        `.grid-item[data-index="${dataIndex}"]`
      );
      if (gridItem) {
        gridItem.classList.remove("active");
      }
      const nextItem = state.selectedBoxes.shift();
      if (nextItem !== undefined) {
        setTimeout(() => removeSelection(nextItem), 1000);
      } else {
        state.isUnloading = false;
      }
    }

    function handleClick(event) {
      if (
        state.isUnloading ||
        event.target.getAttribute("data-value") === "0"
      ) {
        return;
      }

      const target = event.target;
      if (target.classList.contains("grid-item")) {
        const index = target.getAttribute("data-index");
        state.selectedBoxes.push(index);
        target.classList.add("active");

        if (state.selectedBoxes.length >= state.visibleBoxes) {
          const nextItem = state.selectedBoxes.shift();
          setTimeout(() => removeSelection(nextItem), 1000);
          state.isUnloading = true;
        }
      }
    }

    gridContainer.addEventListener("click", handleClick);

    flattenedGrid.forEach((value, index) => {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.setAttribute("data-value", value);
      gridItem.setAttribute("data-index", index);

      if (value === 0) {
        gridItem.classList.add("hidden");
      }

      gridContainer.appendChild(gridItem);
    });
  }

  createGrid(grid);
});
