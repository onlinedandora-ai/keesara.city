export const VERIFICATION_THRESHOLD = {
  minConfirms: 5,
  maxDisputeRatio: 0.2,
} as const;

export const HIGHLIGHTS = [
  {
    title: "Sri Ramalingeshwara Swamy Temple",
    description:
      "An ancient hilltop temple at Keesaragutta with 101 shivalingams, said to be installed by Lord Hanuman. Major draw during Maha Shivaratri.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Keesaragutta_temple_view_from_ruins_01.JPG",
    imageAlt: "Keesaragutta temple view from the ruins",
  },
  {
    title: "Vishnukundin-era ruins",
    description:
      "Excavations near the temple uncovered brick structures and Jain Tirthankara idols dating to the 4th–5th century — real archaeological weight.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/A_Semi_ruined_temple_at_Keesaragutta.JPG",
    imageAlt: "Ruins near Keesaragutta temple",
  },
  {
    title: "Hanuman monument",
    description:
      "A landmark statue in Keesara village, tied to the town's naming and its deep Ramayana-era temple lore.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hanuman_Statue_1.JPG",
    imageAlt: "Hanuman statue monument in Keesara",
  },
  {
    title: "ORR Exit 8 growth corridor",
    description:
      "Keesara sits on Hyderabad's Outer Ring Road, fueling a real estate and infrastructure boom driven by nearby Pocharam IT SEZ.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Outer_Ring_Road,Hyderabad.jpg",
    imageAlt: "Hyderabad Outer Ring Road near Keesara",
  },
] as const;

export const HOUSE_AD = {
  tag: "Sponsored",
  title: "Sri Sai Real Estate — plots near ORR Exit 8",
  description: "HMDA-approved layouts, starting ₹4,200/sqft. Featured business placement.",
  href: "/directory/sri-sai-real-estate",
} as const;

export const SITE = {
  name: "keesara.city",
  tagline: "Keesara, Telangana — local & unfiltered",
  description:
    "The local journal and business directory built for Keesara, by Keesara.",
} as const;
