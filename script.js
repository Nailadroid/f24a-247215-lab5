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

  upBtn.addEventListener("click", function () {});
  downBtn.addEventListener("click", function () {});
  leftBtn.addEventListener("click", function () {});
  rightBtn.addEventListener("click", function () {});
  moveBtn.addEventListener("click", function () {});
});