import type { SiteSettings } from "@/types/content";

// Fallback copy used until the matching Sanity document is filled in, and the seed for it.
export const defaultSiteSettings: SiteSettings = {
  counsellorName: "Adesuwa Isenérè",
  practiceName: "Merry Hearts Counselling",
  tagline: "Because healthy relationships begin with a healthy you.",
  phone: "+234 701 739 6035",
  email: "heartdropswithsuess@gmail.com",
  whatsappNumber: "2347017396035",
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/merryheartswithsuess" },
    { platform: "youtube", url: "https://youtube.com/@heartdropswithsuess" },
    { platform: "spotify", url: "https://open.spotify.com/show/4vz3nuJr5nhdNezQyw5G3h" },
  ],
  selarStoreUrl: "https://selar.com/m/heartdropswithsuess",
  clientIntakeFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeDipAMlP52003kNn_K4Xh57Kudf0UBuDbOx9sXFKrDtcwYyg/viewform",
  headerButtonLabel: "Contact Adesuwa",
  footerNewsletterText: "Get relationship insights and updates in your inbox.",
  newsletterHeading: "Relationship insights, straight to your inbox",
  newsletterText:
    "Join the newsletter for reflections on healing, choosing well, and loving better.",
  newsletterUrl:
    "https://9f323d47.sibforms.com/serve/MUIFACZBPhlCTgKvtSNpKlGVSHuWhl_5RW40xfmKqJajkNtBzW_wNY0XivAjCBa0uwcukJqW-gxWioRY70MmH5s8pqhm0vc8Z1THQWGMH4VHHwJhZFZBb1-rk_uqzICVgcXXBca40baPDR_Mro1-mEn1fpUh9oTrHO2Lr1Ot2_scxhsv1mTBsIAXWGPnbpoKs8oVExwXwN5X_66xmA==",
  newsletterButtonLabel: "Subscribe to the Newsletter",
};
