// IAIRSI 2026 — countdown + live agenda highlighting
// Monterrey uses UTC-06:00 all year (no daylight saving time since 2022).
(function () {
  var DAY = "2026-11-04";
  var TZ = "-06:00";
  var at = function (hhmm) { return new Date(DAY + "T" + hhmm + ":00" + TZ).getTime(); };
  var START = at("10:30");
  var END = at("17:00");

  // ---------- Countdown ----------
  var cd = document.getElementById("countdown");
  var cells = {};
  ["d", "h", "m", "s"].forEach(function (k) {
    cells[k] = cd && cd.querySelector('[data-cd="' + k + '"]');
  });
  var pad = function (n) { return String(n).padStart(2, "0"); };

  function tickCountdown(now) {
    if (!cd) return;
    if (now >= END) {
      cd.innerHTML = '<p class="countdown--live">¡Gracias por acompañarnos!</p>';
      cd = null;
      return;
    }
    if (now >= START) {
      cd.innerHTML = '<p class="countdown--live">● El evento está en curso</p>';
      cd = null;
      return;
    }
    var diff = Math.floor((START - now) / 1000);
    cells.d.textContent = pad(Math.floor(diff / 86400));
    cells.h.textContent = pad(Math.floor((diff % 86400) / 3600));
    cells.m.textContent = pad(Math.floor((diff % 3600) / 60));
    cells.s.textContent = pad(diff % 60);
  }

  // ---------- Agenda timeline ----------
  var timeline = document.getElementById("timeline");
  var items = Array.prototype.slice.call(document.querySelectorAll(".tl[data-start]"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Rail fills as you scroll through the agenda; dots light up as the fill reaches them.
  function fillOnScroll() {
    if (!timeline) return;
    var r = timeline.getBoundingClientRect();
    var line = window.innerHeight * 0.6;            // "reading line" at 60% of the viewport
    var f = reduce ? 1 : Math.min(1, Math.max(0, (line - r.top) / r.height));
    timeline.style.setProperty("--fill", f.toFixed(4));
    var y = r.top + f * r.height;
    items.forEach(function (el) {
      var dot = el.querySelector(".tl__dot").getBoundingClientRect();
      el.classList.toggle("is-reached", reduce || dot.top + dot.height / 2 <= y + 1);
    });
  }
  var queued = false;
  window.addEventListener("scroll", function () {
    if (queued) return; queued = true;
    requestAnimationFrame(function () { queued = false; fillOnScroll(); });
  }, { passive: true });
  window.addEventListener("resize", fillOnScroll);
  fillOnScroll();

  // On event day: highlight the talk in progress, dim the ones that ended.
  function tickAgenda(now) {
    if (now < START - 3600 * 1000 || now > END + 3600 * 1000) return;
    items.forEach(function (el) {
      var s = at(el.dataset.start), e = at(el.dataset.end);
      el.classList.toggle("tl--now", now >= s && now < e);
      el.classList.toggle("tl--past", now >= e);
    });
  }

  function tick() {
    var now = Date.now();
    tickCountdown(now);
    tickAgenda(now);
  }
  tick();
  setInterval(tick, 1000);
})();
