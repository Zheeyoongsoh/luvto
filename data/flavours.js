/* =====================================================================
   LUVTO GELATO — FLAVOUR MENU
   Each { ... } block below is one flavour card. To edit your menu:
     • Change a flavour: edit the text inside its block.
     • Add a flavour: copy a whole block (from { to },) and paste it below.
     • Remove a flavour: delete its whole block.

   Fields
     name          Flavour name.
     description   One short, friendly line. Only say things that are true.
     price         A number like 8.50 (shows as RM 8.50) — or "" if not decided
                   (shows "Price TBC"). You can also write text, e.g. "RM 8 / RM 12".
     status        "available", "sold-out" or "coming-soon"
     category      Optional, e.g. "Dairy-Based" or "Sorbet". Leave "" if unsure.
                   If at least two different categories are used, filter buttons appear.
     image         Optional photo, e.g. "assets/flavours/pistachio.jpg".
                   Leave "" to show a simple drawn scoop in the colour below.
     imageAlt      Describe the photo for screen readers, e.g. "A cup of pistachio gelato".
     color         Colour of the drawn scoop when there is no photo (any hex colour).
     featured      true = also shown in the "Meet Your Favourite Scoops" section on top.

   NOTE: The five flavours below are SAMPLE PLACEHOLDERS ONLY, not a confirmed
   menu. Replace them with your real flavours, then set menuIsConfirmed: true
   in config.js.
   ===================================================================== */

window.FLAVOURS = [
  {
    name: "Classic Vanilla",
    description: "A creamy, comforting scoop for any little moment.",
    price: "",
    status: "available",
    category: "",
    image: "",
    imageAlt: "A scoop of vanilla gelato",
    color: "#F6E3B4",
    featured: true
  },
  {
    name: "Belgian Chocolate",
    description: "Rich, chocolatey and made for chocolate lovers.",
    price: "",
    status: "available",
    category: "",
    image: "",
    imageAlt: "A scoop of chocolate gelato",
    color: "#8A5A44",
    featured: true
  },
  {
    name: "Strawberry",
    description: "Sweet, fruity and pretty in pink.",
    price: "",
    status: "available",
    category: "",
    image: "",
    imageAlt: "A scoop of strawberry gelato",
    color: "#FCA5AC",
    featured: true
  },
  {
    name: "Pistachio",
    description: "A soft green scoop for nutty-flavour fans.",
    price: "",
    status: "coming-soon",
    category: "",
    image: "",
    imageAlt: "A scoop of pistachio gelato",
    color: "#B9D08A",
    featured: true
  },
  {
    name: "Mango Sorbet",
    description: "Bright, juicy and tropical.",
    price: "",
    status: "available",
    category: "",
    image: "",
    imageAlt: "A scoop of mango sorbet",
    color: "#F9BE55",
    featured: true
  }
];
