/* =====================================================================
   LUVTO GELATO — SITE SETTINGS
   This is the ONLY file you need to edit for business details.
   Edit the text between the quotes. Keep the quotes and commas.
   Leave a value as "" (empty) to hide it from the website.
   ===================================================================== */

window.SITE = {
  brandName: "Luvto Gelato",
  tagline: "Love that can be found in Gelato",

  /* WhatsApp number: country code + number, NO spaces, NO plus sign, NO dashes.
     Malaysian example: 60123456789  (that is +60 12-345 6789)
     Until you replace it, order buttons show a friendly "number not set" notice. */
  whatsappNumber: "YOUR_WHATSAPP_NUMBER",

  /* Messages customers send. {flavour} is replaced with the flavour name. */
  messages: {
    general: "Hi Luvto Gelato! I'd like to know more about your available flavours and prices.",
    flavour: "Hi Luvto Gelato! I'd like to enquire about ordering {flavour}. Could you share the available sizes, prices, and collection or delivery options? Thank you!"
  },

  /* Social links: paste the full web address, e.g. "https://www.instagram.com/yourname"
     Leave "" until you have the real link. Empty ones show as "coming soon". */
  social: {
    instagram: "",
    tiktok: ""
  },

  /* Optional contact details. Leave "" to hide. Only add what is true and confirmed. */
  email: "",
  serviceArea: "",      // e.g. "Klang Valley" — only when confirmed
  operatingHours: "",   // e.g. "Sat–Sun, 11am–9pm" — only when confirmed

  /* Shown on product cards when a flavour has no price yet. */
  pricePlaceholder: "Price TBC",

  /* Set to true ONCE you have replaced the sample flavours in flavours.js
     with your real menu. This removes the "sample menu" notice. */
  menuIsConfirmed: false,

  /* Web address of the finished site (used for social sharing previews).
     Fill in after publishing, e.g. "https://luvto.pages.dev" */
  siteUrl: ""
};
