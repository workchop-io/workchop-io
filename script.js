/* Workchop · interactions */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     CONFIG: make the contact form send for real.
     1. Go to https://web3forms.com, enter hello@workchop.io,
        and confirm via the verification email.
     2. Paste the access key they give you below.
     Until then, the form falls back to opening the visitor's
     email client (mailto), so it still works.
  ----------------------------------------------------------- */
  var WEB3FORMS_KEY = "YOUR_ACCESS_KEY"; // <-- paste Web3Forms access key here
  var CONTACT_EMAIL = "hello@workchop.io";

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  /* Nav shadow on scroll */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* App filtering (Apps page) */
  var filters = document.querySelectorAll(".filters .chip");
  var apps = document.querySelectorAll("[data-platform]");
  if (filters.length && apps.length) {
    filters.forEach(function (chip) {
      chip.addEventListener("click", function () {
        filters.forEach(function (c) { c.classList.remove("selected"); });
        chip.classList.add("selected");
        var f = chip.getAttribute("data-filter");
        apps.forEach(function (app) {
          var match = f === "all" || app.getAttribute("data-platform").indexOf(f) !== -1;
          app.hidden = !match;
        });
      });
    });
  }

  /* Selectable chips (non-filter) */
  document.querySelectorAll(".chip[data-select]").forEach(function (chip) {
    chip.addEventListener("click", function () { chip.classList.toggle("selected"); });
  });

  /* Contact form (Web3Forms) */
  var form = document.querySelector(".form");
  if (form) {
    var btn = form.querySelector("button[type=submit]");
    var btnLabel = btn ? btn.innerHTML : "";
    var status = form.querySelector(".form-status");

    var setStatus = function (msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.className = "form-status" + (kind ? " " + kind : "");
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot: bots tick this hidden box
      var hp = form.querySelector("[name=botcheck]");
      if (hp && hp.checked) return;

      var data = new FormData(form);

      // No key yet → fall back to the visitor's email app so the form still works
      if (!WEB3FORMS_KEY || WEB3FORMS_KEY === "YOUR_ACCESS_KEY") {
        var subject = encodeURIComponent("Workchop enquiry from " + (data.get("name") || "the website"));
        var body = encodeURIComponent(
          "Name: " + (data.get("name") || "") + "\n" +
          "Email: " + (data.get("email") || "") + "\n" +
          "Topic: " + (data.get("topic") || "") + "\n\n" +
          (data.get("msg") || "")
        );
        window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
        setStatus("Opening your email app…");
        return;
      }

      var payload = { access_key: WEB3FORMS_KEY };
      data.forEach(function (v, k) { payload[k] = v; });

      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setStatus("");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success) {
            form.reset();
            if (btn) btn.innerHTML = "Sent ✦";
            setStatus("Thanks! Your message is on its way. We'll reply within a business day. ✦", "ok");
          } else {
            if (btn) { btn.disabled = false; btn.innerHTML = btnLabel; }
            setStatus("Something went wrong. Please email " + CONTACT_EMAIL + " directly.", "err");
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = btnLabel; }
          setStatus("Network error. Please email " + CONTACT_EMAIL + " directly.", "err");
        });
    });
  }

  /* Newsletter */
  var sub = document.querySelector(".subscribe");
  if (sub) {
    sub.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = sub.querySelector(".btn");
      if (btn) { btn.textContent = "Subscribed ✦"; btn.disabled = true; }
      sub.querySelector("input") && (sub.querySelector("input").value = "");
    });
  }

  /* Footer year */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
