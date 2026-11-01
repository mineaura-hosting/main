/* ==========================================================================
   MINEAURA HOSTING — SITE CONFIGURATION
   --------------------------------------------------------------------------
   Single source of truth for editable content: pricing packages, the
   recommended plan, and server locations.

   ▸ Every price / specification below is a PLACEHOLDER used for layout only.
     Replace the values with MineAura's real packages when they are confirmed.
   ▸ All purchase CTAs automatically point at `discordUrl` (see main.js).
   ▸ To highlight a different package as "Recommended", set `recommended: true`
     on that plan and remove the flag from any other plan.
   ========================================================================== */

window.MINEAURA_CONFIG = {
  /* Purchases and sales are handled through Discord — do not change the shape
     of this URL, every buy button is generated from it. */
  discordUrl: "https://discord.gg/QuMcykHhRR",

  /* Fallback button wording used by generated purchase buttons. */
  purchaseCta: "Choose Plan",

  /* ------------------------------------------------------------------ PLANS
     Categories render into: [data-plans="budget" | "advanced" | "vps"]      */
  plans: {
    budget: {
      eyebrow: "Minecraft Hosting",
      titleAsset: "assets/img/minecraft_title_3.png",
      titleAlt: "Aura Budget Plans",
      titleFallback: "AURA BUDGET PLANS",
      description:
        "Affordable Minecraft hosting for friends, communities, and small servers.",
      plans: [
        {
          name: "Aura Starter",
          blurb: "For a small survival world with a few friends.",
          ram: "2 GB",
          cpu: "2 vCores",
          storage: "25 GB NVMe",
          backups: "2 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "4.99",
          period: "/mo",
          recommended: false
        },
        {
          name: "Aura Community",
          blurb: "Plugins, a lobby world and room to grow.",
          ram: "4 GB",
          cpu: "2 vCores",
          storage: "50 GB NVMe",
          backups: "3 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "6.99",
          period: "/mo",
          recommended: false
        },
        {
          name: "Aura Village",
          blurb: "Busy survival servers and light modpacks.",
          ram: "8 GB",
          cpu: "4 vCores",
          storage: "80 GB NVMe",
          backups: "5 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "8.99",
          period: "/mo",
          recommended: false
        }
      ]
    },

    advanced: {
      eyebrow: "Minecraft Hosting",
      titleAsset: "assets/img/minecraft_title_4.png",
      titleAlt: "Aura Advanced Plans",
      titleFallback: "AURA ADVANCED PLANS",
      description:
        "More power for larger communities, modpacks, and demanding Minecraft worlds.",
      plans: [
        {
          name: "Aura Explorer",
          blurb: "Modded worlds and steady player counts.",
          ram: "8 GB",
          cpu: "4 vCores",
          storage: "100 GB NVMe",
          backups: "5 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "12.99",
          period: "/mo",
          recommended: false
        },
        {
          name: "Aura Conqueror",
          blurb: "Heavy modpacks, networks and events.",
          ram: "16 GB",
          cpu: "6 vCores",
          storage: "160 GB NVMe",
          backups: "8 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "19.99",
          period: "/mo",
          recommended: true
        },
        {
          name: "Aura Titan",
          blurb: "Large communities that never slow down.",
          ram: "32 GB",
          cpu: "8 vCores",
          storage: "250 GB NVMe",
          backups: "12 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "29.99",
          period: "/mo",
          recommended: false
        }
      ]
    },

    vps: {
      eyebrow: "Virtual Private Servers",
      titleAsset: "assets/img/minecraft_title_2.png",
      titleAlt: "Aura VPS Plans",
      titleFallback: "AURA VPS PLANS",
      description:
        "Powerful virtual servers for developers, game networks, and advanced workloads.",
      plans: [
        {
          name: "Aura VPS Core",
          blurb: "A clean, root-access box for your first stack.",
          ram: "8 GB",
          cpu: "4 vCores",
          storage: "120 GB NVMe",
          backups: "2 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "14.99",
          period: "/mo",
          recommended: false
        },
        {
          name: "Aura VPS Prime",
          blurb: "Run a proxy network or several game servers.",
          ram: "16 GB",
          cpu: "6 vCores",
          storage: "240 GB NVMe",
          backups: "4 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "24.99",
          period: "/mo",
          recommended: true
        },
        {
          name: "Aura VPS Network",
          blurb: "High-spec virtual hardware for production workloads.",
          ram: "32 GB",
          cpu: "10 vCores",
          storage: "480 GB NVMe",
          backups: "8 slots",
          ddos: "Included",
          location: "Multiple regions",
          price: "39.99",
          period: "/mo",
          recommended: false
        }
      ]
    }
  },

  /* -------------------------------------------------------------- LOCATIONS
     Only list regions MineAura actually operates. Replace these placeholders
     with confirmed locations and a real latency sample before going live.
     `code` is the short badge shown on the card (2 characters).              */
  locations: [
    {
      code: "NA",
      flag: "\uD83C\uDDFA\uD83C\uDDF8",
      name: "North America",
      region: "United States · East & West",
      status: "Available",
      latency: "—",
      note: "Region availability confirmed in Discord"
    },
    {
      code: "EU",
      flag: "\uD83C\uDDEA\uD83C\uDDFA",
      name: "Europe",
      region: "Germany · Central",
      status: "Available",
      latency: "—",
      note: "Region availability confirmed in Discord"
    },
    {
      code: "AE",
      flag: "\uD83C\uDDE6\uD83C\uDDEA",
      name: "Middle East",
      region: "Dubai, UAE",
      status: "Available",
      latency: "—",
      note: "Region availability confirmed in Discord"
    },
    {
      code: "AS",
      flag: "\uD83C\uDDF8\uD83C\uDDEC",
      name: "Asia",
      region: "Singapore",
      status: "Available",
      latency: "—",
      note: "Region availability confirmed in Discord"
    }
  ]
};
