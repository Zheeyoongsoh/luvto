(function () {
  "use strict";
  var S = window.SITE || {};
  var FLAVOURS = Array.isArray(window.FLAVOURS) ? window.FLAVOURS : [];
  var EVENTS = Array.isArray(window.EVENTS) ? window.EVENTS : [];

  var STATUS = {
    "available": { label: "Available", cls: "available" },
    "sold-out": { label: "Sold Out", cls: "sold-out" },
    "coming-soon": { label: "Coming Soon", cls: "coming-soon" }
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------- WhatsApp ---------- */
  function numberIsSet() {
    var n = String(S.whatsappNumber || "");
    return /^[0-9]{8,15}$/.test(n);
  }
  function waLink(flavourName) {
    var tpl = flavourName ? S.messages.flavour : S.messages.general;
    var msg = flavourName ? tpl.replace(/\{flavour\}/g, flavourName) : tpl;
    return "https://wa.me/" + encodeURIComponent(String(S.whatsappNumber || "")) + "?text=" + encodeURIComponent(msg);
  }
  var toastTimer;
  function toast(text) {
    var t = document.getElementById("toast");
    t.textContent = text; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 5000);
  }
  function wireWa(a, flavourName) {
    a.setAttribute("href", waLink(flavourName));
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    a.addEventListener("click", function (e) {
      if (!numberIsSet()) {
        e.preventDefault();
        toast("WhatsApp number not set yet. The owner needs to add it in data/config.js.");
      }
    });
  }
  function wireAllWa() {
    document.querySelectorAll("a[data-wa='general']").forEach(function (a) { wireWa(a, null); });
  }

  /* ---------- Flavour cards ---------- */
  function scoopSvg(color) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 120 140");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML =
      '<path d="M32 70h56L60 134z" fill="#E9B872"/>' +
      '<path d="M44 82l26 36M58 76l22 30M74 74l-30 40" stroke="#D49A50" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M22 66c0-24 17-44 38-44s38 20 38 44c0 7-76 7-76 0z" fill="' + color + '"/>' +
      '<path d="M22 66c6 10 14 6 20 12 6-6 14 6 22 0 7 6 14-4 20 2 6-4 12-2 14-14" fill="' + color + '" stroke="rgba(0,0,0,.08)" stroke-width="2"/>' +
      '<ellipse cx="46" cy="42" rx="9" ry="6" fill="#fff" opacity=".35" transform="rotate(-25 46 42)"/>';
    return svg;
  }
  function priceText(f) {
    if (typeof f.price === "number") return "RM " + f.price.toFixed(2);
    if (typeof f.price === "string" && f.price.trim()) return f.price.trim();
    return S.pricePlaceholder || "Price TBC";
  }
  function hasPrice(f) {
    return (typeof f.price === "number") || (typeof f.price === "string" && f.price.trim() !== "");
  }
  function flavourCard(f) {
    var st = STATUS[f.status] || STATUS["available"];
    var card = el("article", "card" + (f.status === "sold-out" ? " is-sold-out" : ""));
    var imgWrap = el("div", "card-img");
    imgWrap.style.setProperty("--tint", tint(f.color));
    if (f.image) {
      var img = document.createElement("img");
      img.src = f.image; img.alt = f.imageAlt || f.name; img.loading = "lazy"; img.decoding = "async";
      imgWrap.appendChild(img);
    } else {
      imgWrap.appendChild(scoopSvg(f.color || "#FCBBB8"));
    }
    imgWrap.appendChild(el("span", "badge " + st.cls, st.label));
    card.appendChild(imgWrap);

    var body = el("div", "card-body");
    if (f.category) body.appendChild(el("span", "cat", f.category));
    body.appendChild(el("h3", null, f.name));
    if (f.description) body.appendChild(el("p", "desc", f.description));
    body.appendChild(el("p", "price" + (hasPrice(f) ? "" : " tbc"), priceText(f)));

    var btn = el("a", "btn btn-wa btn-sm", f.status === "sold-out" ? "Sold Out" : f.status === "coming-soon" ? "Ask About This" : "Order This Flavour");
    if (f.status === "sold-out") {
      btn.setAttribute("aria-disabled", "true");
      btn.setAttribute("role", "link");
      btn.addEventListener("click", function (e) { e.preventDefault(); });
    } else {
      wireWa(btn, f.name);
    }
    body.appendChild(btn);
    card.appendChild(body);
    return card;
  }
  // pale background from the scoop colour
  function tint(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return "#FDE3E0";
    var n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function mix(c) { return Math.round(c + (255 - c) * 0.72); }
    return "rgb(" + mix(r) + "," + mix(g) + "," + mix(b) + ")";
  }

  function renderGrid(target, list) {
    target.innerHTML = "";
    if (!list.length) {
      target.appendChild(el("p", "notice", "No flavours to show right now. Message us on WhatsApp to ask what's available."));
      return;
    }
    list.forEach(function (f) { target.appendChild(flavourCard(f)); });
  }

  function renderFlavours() {
    var featured = FLAVOURS.filter(function (f) { return f.featured; });
    renderGrid(document.getElementById("featuredGrid"), featured.length ? featured : FLAVOURS.slice(0, 4));
    if (!S.menuIsConfirmed) document.getElementById("sampleNotice").hidden = false;

    var cats = [];
    FLAVOURS.forEach(function (f) { if (f.category && cats.indexOf(f.category) < 0) cats.push(f.category); });
    var filters = document.getElementById("filters");
    var menuGrid = document.getElementById("menuGrid");
    if (cats.length >= 2) {
      filters.hidden = false;
      var current = "All";
      ["All"].concat(cats).forEach(function (c) {
        var chip = el("button", "chip", c);
        chip.type = "button";
        chip.setAttribute("aria-pressed", c === "All" ? "true" : "false");
        chip.addEventListener("click", function () {
          current = c;
          filters.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === chip ? "true" : "false"); });
          renderGrid(menuGrid, FLAVOURS.filter(function (f) { return current === "All" || f.category === current; }));
        });
        filters.appendChild(chip);
      });
    }
    renderGrid(menuGrid, FLAVOURS);
  }

  /* ---------- Events ---------- */
  function renderEvents() {
    var grid = document.getElementById("eventsGrid");
    grid.innerHTML = "";
    if (!EVENTS.length) {
      var empty = el("div", "event-empty");
      empty.appendChild(makePeek("peek-left"));
      empty.appendChild(el("strong", null, "Stay tuned for our next pop-up!"));
      empty.appendChild(el("p", null, "We'll share market dates, locations and hours here. Message us on WhatsApp to ask where we'll be next."));
      grid.appendChild(empty);
      return;
    }
    EVENTS.forEach(function (ev) {
      var card = el("article", "card event");
      if (ev.image) {
        var w = el("div", "card-img");
        var img = document.createElement("img");
        img.src = ev.image; img.alt = ev.imageAlt || ev.name; img.loading = "lazy";
        w.appendChild(img); card.appendChild(w);
      }
      var body = el("div", "card-body");
      body.appendChild(el("h3", null, ev.name));
      var dl = el("dl");
      [["Venue: ", ev.venue], ["Date: ", ev.date], ["Hours: ", ev.hours]].forEach(function (p) {
        if (!p[1]) return;
        var row = el("div");
        row.appendChild(el("dt", null, p[0])); row.appendChild(el("dd", null, p[1]));
        dl.appendChild(row);
      });
      body.appendChild(dl);
      if (ev.note) body.appendChild(el("p", "note", ev.note));
      if (ev.mapLink) {
        var a = el("a", "btn btn-blue btn-sm", "Get Directions");
        a.href = ev.mapLink; a.target = "_blank"; a.rel = "noopener noreferrer";
        a.style.marginTop = "10px";
        body.appendChild(a);
      }
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ---------- Contact + footer ---------- */
  function renderContact() {
    var list = document.getElementById("contactList");
    var footer = document.getElementById("footerSocial");
    function row(label, valueNode) {
      var li = el("li"); li.appendChild(el("b", null, label)); li.appendChild(valueNode); list.appendChild(li);
    }
    function link(text, href) { var a = el("a", null, text); a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer"; return a; }

    row("WhatsApp", numberIsSet() ? link("Chat with us", waLink(null)) : el("span", "soon", "Coming soon"));
    [["Instagram", S.social && S.social.instagram], ["TikTok", S.social && S.social.tiktok]].forEach(function (p) {
      row(p[0], p[1] ? link("Follow us", p[1]) : el("span", "soon", "Coming soon"));
      if (p[1]) { var fa = link(p[0], p[1]); footer.appendChild(fa); }
      else footer.appendChild(el("span", null, p[0] + " (coming soon)"));
    });
    if (S.email) row("Email", link(S.email, "mailto:" + S.email));
    if (S.serviceArea) row("Service area", el("span", null, S.serviceArea));
    if (S.operatingHours) row("Hours", el("span", null, S.operatingHours));
  }

  /* ---------- Menu + misc ---------- */
  function setupNav() {
    var btn = document.getElementById("menuBtn"), nav = document.getElementById("nav");
    function close() { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Open menu"); }
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  function setupMeta() {
    document.getElementById("year").textContent = new Date().getFullYear();
    if (S.siteUrl) {
      var base = S.siteUrl.replace(/\/$/, "");
      ["og:image", "twitter:image"].forEach(function (k) {
        var m = document.querySelector('meta[property="' + k + '"],meta[name="' + k + '"]');
        if (m) m.setAttribute("content", base + "/assets/og-image.png");
      });
    }
  }

  /* ---------- Monster animations ---------- */
  function makePeek(cls) {
    var p = el("div", "peek " + cls); p.setAttribute("aria-hidden", "true");
    var b = el("div", "mon-body"); b.appendChild(el("div", "mon-img")); p.appendChild(b); return p;
  }
  function setupMonsters() {
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var hasIO = "IntersectionObserver" in window;
    // Pop-up monsters appear when scrolled into view; scene stages only animate while visible.
    var peeks = document.querySelectorAll(".peek"), stages = document.querySelectorAll(".stage");
    if (hasIO) {
      var ioPeek = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { if (!calm) e.target.classList.add("go"); ioPeek.unobserve(e.target); } });
      }, { threshold: 0.35 });
      peeks.forEach(function (p) { ioPeek.observe(p); });
      var ioStage = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle("on", e.isIntersecting); });
      }, { threshold: 0.15 });
      stages.forEach(function (s) { ioStage.observe(s); });
    } else {
      stages.forEach(function (s) { s.classList.add("on"); });
    }
    document.addEventListener("click", function (e) {
      var p = e.target.closest && e.target.closest(".peek");
      if (!p || calm) return;
      p.classList.remove("go", "jump"); void p.offsetWidth; p.classList.add("jump");
      setTimeout(function () { p.classList.remove("jump"); }, 650);
      var r = p.getBoundingClientRect();
      for (var k = 0; k < 7; k++) {
        var f = el("div", "pop " + (k % 2 ? "y" : "b"));
        var ang = (-160 + k * 22) * Math.PI / 180, dist = 70 + Math.random() * 50;
        f.style.left = (r.left + r.width / 2 - 15) + "px"; f.style.top = (r.top + 20) + "px";
        f.style.setProperty("--dx", Math.cos(ang) * dist + "px"); f.style.setProperty("--dy", Math.sin(ang) * dist + "px");
        f.style.setProperty("--rot", (k % 2 ? 1 : -1) * (90 + Math.random() * 120) + "deg");
        document.body.appendChild(f); (function (n) { setTimeout(function () { n.remove(); }, 950); })(f);
      }
    });
  }

  wireAllWa();
  renderFlavours();
  renderEvents();
  renderContact();
  setupNav();
  setupMeta();
  setupMonsters();
})();
