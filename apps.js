/* ============================================================
   Workchop · single source of truth for the apps.
   Add or edit an app here and it updates BOTH the Apps page
   grid and the homepage featured banner. No other file to touch.

   Fields:
     name        display name
     category    short tag shown on the card ("Music", "Events"...)
     status      "live" | "beta" | "soon"  (beta/soon both show "In build")
     platforms   array: any of "ios", "android", "web"
     url         link (live site, or "#" if nothing to link yet)
     external    true = opens in a new tab + used for the live screenshot
     grad        fallback background gradient (CSS)
     tagline     short line, used on the homepage banner
     description longer line, used on the Apps page card
     workingName true = shows a small "(working name)" note
     hidden      true = kept here but NOT shown on the site yet
   ============================================================ */
window.WORKCHOP_APPS = [
  {
    name: "Reshuffy",
    category: "Music",
    status: "live",
    platforms: ["web"],
    url: "https://reshuffy.com",
    external: true,
    grad: "linear-gradient(135deg,#1a2e2a,#0c1210)",
    tagline: "Clean up your Spotify playlists without the fear. Fix broken tracks, kill duplicates, and reorganise by mood and genre, always with a preview first.",
    description: "Clean up your Spotify playlists without the fear. It finds broken tracks and duplicates and reorganises everything by mood and genre, always showing you a preview before anything changes."
  },
  {
    name: "Raydr",
    category: "Events",
    status: "live",
    platforms: ["web"],
    url: "https://raydr.live/",
    external: true,
    grad: "linear-gradient(135deg,#261a2e,#0e0c12)",
    tagline: "Like Skyscanner, but for nights out. Every local event in one tidy calendar.",
    description: "Like Skyscanner, but for nights out. AI gathers every local event from all the scattered ticket sites into one calendar, then points you to where to buy."
  },
  {
    name: "Dailygrasp",
    category: "Learning",
    status: "beta",
    platforms: ["ios", "android"],
    url: "https://dailygrasp.app/",
    external: true,
    grad: "linear-gradient(135deg,#1d2b1a,#0d0f0c)",
    tagline: "A 60-second AI summary of a Wikipedia article, every day. Dial it from everyday facts to deep, nerdy rabbit holes.",
    description: "A 60-second AI summary of a Wikipedia article, every day. Slide it from everyday facts to deep, nerdy rabbit holes, all in the topics you care about."
  },
  {
    name: "Journally",
    category: "Journal",
    status: "soon",
    platforms: ["ios", "android"],
    url: "#",
    external: false,
    workingName: true,
    hidden: true,
    grad: "linear-gradient(135deg,#1a2330,#0c0e12)",
    tagline: "Just talk, and it quietly sorts out your day. Private by design, with everything kept on your phone.",
    description: "A voice-first journal that's genuinely private. Just talk through your day and it quietly sorts the mess into feelings, events and plans, all kept safely on your phone."
  },
  {
    name: "Mutual",
    category: "Dating",
    status: "soon",
    platforms: ["ios", "android"],
    url: "#",
    external: false,
    workingName: true,
    hidden: true,
    grad: "linear-gradient(135deg,#2e261a,#120f0c)",
    tagline: "Dating that actually looks at who you click with, not just photos. Less swiping, more connecting.",
    description: "Dating built around real compatibility, not endless swiping. It starts with shared values, learns what you're actually drawn to, and shows you people who are likely to like you back."
  }
];
