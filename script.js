document.addEventListener("DOMContentLoaded", function () {
  var wall = document.querySelector("#wall");
  var upBtn = document.querySelector("#up");
  var downBtn = document.querySelector("#down");
  var leftBtn = document.querySelector("#left");
  var rightBtn = document.querySelector("#right");
  var moveBtn = document.querySelector("#move");
  var spotInput = document.querySelector("#spot");
  var fireAtSpan = document.querySelector("#fire-at");
  var statusLine = document.querySelector("#status");

  if (!wall || !upBtn || !downBtn || !leftBtn || !rightBtn || !moveBtn || !spotInput || !fireAtSpan || !statusLine) {
    console.error("Missing one or more required DOM elements.");
    return;
  }

  wall.addEventListener("click", function (event) {
    var notice = event.target.closest(".notice");
    if (!notice) return;

    var notices = wall.querySelectorAll(".notice");
    for (var i = 0; i < notices.length; i++) {
      notices[i].classList.remove("now");
    }
    notice.classList.add("now");
    statusLine.textContent = notice.textContent.trim() + " selected.";
  });

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

  moveBtn.addEventListener("click", function () {
    spotInput.setCustomValidity("");

    var val = spotInput.value.trim();
    var pos = Number(val);

    if (val === "" || Number.isNaN(pos) || !Number.isInteger(pos) || pos < 1 || pos > 6) {
      spotInput.setCustomValidity("not a number");
      spotInput.reportValidity();
      return;
    }

    var current = getCurrentNotice();
    if (!current) return;

    var allNotices = Array.from(wall.querySelectorAll(".notice"));
    var targetIdx = pos - 1;
    var currentIdx = allNotices.indexOf(current);

    if (currentIdx === targetIdx) return;

    allNotices.splice(currentIdx, 1);
    allNotices.splice(targetIdx, 0, current);

    var rows = wall.querySelectorAll(".row");
    for (var i = 0; i < allNotices.length; i++) {
      var rowIdx = Math.floor(i / 3);
      rows[rowIdx].appendChild(allNotices[i]);
    }

    statusLine.textContent = "Moved to position " + pos + ".";
    updateFirePosition();
  });
});