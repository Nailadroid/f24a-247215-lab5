function updateFirePosition() {
    var allNotices = Array.from(wall.querySelectorAll(".notice"));
    for (var i = 0; i < allNotices.length; i++) {
      if (allNotices[i].textContent.trim() === "Fire") {
        fireAtSpan.textContent = String(i + 1);
        break;
      }
    }
  }

  function getCurrentNotice() {
    return wall.querySelector(".notice.now");
  }

  leftBtn.addEventListener("click", function () {
    var current = getCurrentNotice();
    if (!current) return;
    var prev = current.previousElementSibling;
    if (prev && prev.classList.contains("notice")) {
      current.parentElement.insertBefore(current, prev);
      statusLine.textContent = "Moved left.";
      updateFirePosition();
    }
  });

  rightBtn.addEventListener("click", function () {
    var current = getCurrentNotice();
    if (!current) return;
    var next = current.nextElementSibling;
    if (next && next.classList.contains("notice")) {
      current.parentElement.insertBefore(next, current);
      statusLine.textContent = "Moved right.";
      updateFirePosition();
    }
  });

  function tradeRows(direction) {
    var current = getCurrentNotice();
    if (!current) return;

    var currentRow = current.parentElement;
    var rows = Array.from(wall.querySelectorAll(".row"));
    var currentRowIdx = rows.indexOf(currentRow);
    var targetRowIdx = direction === "up" ? currentRowIdx - 1 : currentRowIdx + 1;

    if (targetRowIdx < 0 || targetRowIdx >= rows.length) return;

    var targetRow = rows[targetRowIdx];
    var currentItems = Array.from(currentRow.children);
    var targetItems = Array.from(targetRow.children);
    var itemIdx = currentItems.indexOf(current);

    if (itemIdx !== -1 && targetItems[itemIdx]) {
      var targetNotice = targetItems[itemIdx];
      var placeholder = document.createElement("div");
      currentRow.insertBefore(placeholder, current);
      targetRow.insertBefore(current, targetNotice);
      currentRow.insertBefore(targetNotice, placeholder);
      placeholder.remove();

      statusLine.textContent = "Traded row " + direction + ".";
      updateFirePosition();
    }
  }

  upBtn.addEventListener("click", function () { tradeRows("up"); });
  downBtn.addEventListener("click", function () { tradeRows("down"); });