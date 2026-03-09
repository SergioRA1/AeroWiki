// missiles.js
// Missile database for AeroWiki
// Each missile will eventually have its own detail page (misil.html?id=...)
//
// Structure:
// - id: unique identifier for the missile (used in URL misil.html?id=...)
// - name: display name
// - shortDesc: brief description shown on jet detail pages
// - type: missile category (e.g., "Aire-Aire", "Aire-Tierra")
// - range: maximum effective range
// - origin: country/region of manufacture
// - compatibleWith: array of jet IDs that can carry this missile (from data.js)

const missiles = [
    // US Missiles
    {
        id: "aim9x",
        name: "AIM-9X Sidewinder",
        shortDesc: "Misil aire-aire de corto alcance con guía infrarroja de última generación.",
        type: "Aire-Aire",
        range: "35 km",
        origin: "USA",
        compatibleWith: ["f22", "f35", "f16", "f15"]
    },
    {
        id: "aim120",
        name: "AIM-120 AMRAAM",
        shortDesc: "Misil aire-aire de medio/largo alcance con radar activo.",
        type: "Aire-Aire",
        range: "180 km",
        origin: "USA",
        compatibleWith: ["f22", "f35", "f16", "f15"]
    },
    // European Missiles
    {
        id: "meteor",
        name: "MBDA Meteor",
        shortDesc: "Misil BVR de largo alcance con motor estatorreactor.",
        type: "Aire-Aire",
        range: "200+ km",
        origin: "Europa",
        compatibleWith: ["typhoon", "rafale"]
    },
    {
        id: "mica",
        name: "MBDA MICA",
        shortDesc: "Misil multirrol de medio alcance con guía IR o radar.",
        type: "Aire-Aire",
        range: "80 km",
        origin: "Francia",
        compatibleWith: ["rafale"]
    },
    {
        id: "iris-t",
        name: "IRIS-T",
        shortDesc: "Misil de corto alcance con capacidad de enganche post-lanzamiento.",
        type: "Aire-Aire",
        range: "25 km",
        origin: "Alemania",
        compatibleWith: ["typhoon"]
    },
    // Chinese Missiles
    {
        id: "pl10",
        name: "PL-10",
        shortDesc: "Misil de corto alcance IR de quinta generación.",
        type: "Aire-Aire",
        range: "30 km",
        origin: "China",
        compatibleWith: ["j20", "j16", "j35"]
    },
    {
        id: "pl15",
        name: "PL-15",
        shortDesc: "Misil BVR de largo alcance con radar AESA.",
        type: "Aire-Aire",
        range: "200+ km",
        origin: "China",
        compatibleWith: ["j20", "j16", "j35"]
    },
    {
        id: "pl12",
        name: "PL-12",
        shortDesc: "Misil de medio alcance con guía radar activa.",
        type: "Aire-Aire",
        range: "100 km",
        origin: "China",
        compatibleWith: ["j16"]
    }
];
