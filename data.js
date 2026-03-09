// data.js
const jets = [
    {
        id: "f22",
        name: "F-22 Raptor",
        shortDesc: "El caza de superioridad aérea más avanzado y sigiloso del arsenal estadounidense.",
        fullText: "El Lockheed Martin F-22 Raptor es un avión de caza monoplaza y bimotor de quinta generación concebido en Estados Unidos durante los años 1990. Su combinación de sigilo, velocidad, agilidad y conocimiento situacional, combinada con armas aire-aire y aire-tierra de largo alcance, lo convierte en el mejor caza de dominio aéreo del mundo.",
        //  <<< RUTA LOCAL A IMAGEN Y VIDEO >>
        image: "media/img/f22.jpg", 
        video: "media/video/f222.mp4", // Usamos tu archivo cargado
        specs: { speed: "Mach 2.25", range: "2,960 km", ceiling: "20,000 m", climbRate: "350 m/s", origin: "USA", engineName: "Pratt & Whitney F119-PW-100", powerPerEngine: "156 kN", totalPowerAfterburner: "312 kN", powerToWeight: "1.25" }
    },
    {
        id: "typhoon",
        name: "Eurofighter Typhoon",
        shortDesc: "Una maravilla de la ingeniería europea, conocido por su extrema maniobrabilidad.",
        fullText: "El Eurofighter Typhoon es un caza polivalente bimotor de gran maniobrabilidad, diseñado y construido por un consorcio de empresas europeas. Destaca por su capacidad de 'Supercruise' (vuelo supersónico sin postquemadores) y su avanzada aviónica integrada.",
        //  <<< RUTA LOCAL A IMAGEN Y VIDEO >>
        image: "media/img/eurofighter.jpg",
        video: "media/video/typhoon.mp4", // Asumo que tienes este archivo
        specs: { speed: "Mach 2.0", range: "2,900 km", ceiling: "19,812 m", climbRate: "315 m/s", origin: "Europa", engineName: "Eurojet EJ200", powerPerEngine: "90 kN", totalPowerAfterburner: "180 kN", powerToWeight: "1.15" }
    },
    {
        id: "rafale",
        name: "Dassault Rafale",
        shortDesc: "El caza 'Omnirole' francés capaz de realizar cualquier misión.",
        fullText: "El Dassault Rafale es un caza polivalente de 4.5ª generación, bimotor y con configuración de ala en delta y canards. Diseñado por Francia para ser utilizado tanto por su fuerza aérea como por su armada, es capaz de realizar superioridad aérea, interdicción, reconocimiento y misiones de disuasión nuclear.",
        //  <<< RUTA LOCAL A IMAGEN Y VIDEO >>
        image: "media/img/rafale.jpg",
        video: "media/video/rafale.mp4", // Asumo que tienes este archivo
        specs: { speed: "Mach 1.8", range: "3,700 km", ceiling: "15,235 m", climbRate: "305 m/s", origin: "Francia", engineName: "Snecma M88-2", powerPerEngine: "75 kN", totalPowerAfterburner: "150 kN", powerToWeight: "1.10" }
    },
    {
        id: "j20",
        name: "J-20 Mighty Dragon",
        shortDesc: "El primer caza de quinta generación chino, símbolo del avance tecnológico de China.",
        fullText: "El Chengdu J-20 es un caza de superioridad aérea de quinta generación desarrollado por China. Es el primer avión de combate sigiloso operativo de la Fuerza Aérea del Ejército Popular de Liberación. Presenta características furtivas, capacidades de combate aire-aire y aire-tierra, y representa un hito importante en la capacidad de China para desarrollar tecnología militar avanzada de forma independiente.",
        image: "media/img/j20.jpg",
        video: "media/video/j20.mp4",
        specs: { speed: "Mach 2.0", range: "5,500 km", ceiling: "20,000 m", climbRate: "325 m/s", origin: "China", engineName: "WS-15 / WS-10C", powerPerEngine: "150 kN", totalPowerAfterburner: "300 kN", powerToWeight: "1.20" }
    },
    {
        id: "f35",
        name: "F-35 Lightning II",
        shortDesc: "El caza de quinta generación más versátil del mundo, con tres variantes.",
        fullText: "El Lockheed Martin F-35 Lightning II es un caza polivalente de quinta generación desarrollado por Estados Unidos. Existe en tres variantes: F-35A (convencional), F-35B (despegue corto y aterrizaje vertical) y F-35C (portaaviones). Combina sigilo avanzado, sensores integrados y capacidad de combate aire-aire y aire-tierra, siendo uno de los programas de defensa más ambiciosos de la historia.",
        image: "media/img/f35.jpg",
        video: "media/video/f35.mp4",
        specs: { speed: "Mach 1.6", range: "2,220 km", ceiling: "15,240 m", climbRate: "254 m/s", origin: "USA", engineName: "Pratt & Whitney F135", powerPerEngine: "191 kN", totalPowerAfterburner: "191 kN", powerToWeight: "1.07" }
    },
    {
        id: "j35",
        name: "J-35 (FC-31)",
        shortDesc: "El caza de quinta generación chino diseñado para operaciones desde portaaviones.",
        fullText: "El Shenyang J-35, también conocido como FC-31 Gyrfalcon, es un caza de quinta generación desarrollado por China para operaciones desde portaaviones. Es un avión bimotor de tamaño medio con características furtivas, diseñado para complementar al J-20 en misiones de superioridad aérea y ataque. Su diseño compacto lo hace ideal para operaciones navales y representa el futuro de la aviación embarcada china.",
        image: "media/img/j35.jpg",
        video: "media/video/j35.mp4",
        specs: { speed: "Mach 1.8", range: "1,200 km", ceiling: "16,000 m", climbRate: "280 m/s", origin: "China", engineName: "WS-21", powerPerEngine: "110 kN", totalPowerAfterburner: "220 kN", powerToWeight: "1.15" }
    },
    {
        id: "j16",
        name: "J-16",
        shortDesc: "El cazabombardero chino de cuarta generación, versátil y potente.",
        fullText: "El Shenyang J-16 es un cazabombardero de cuarta generación desarrollado por China, basado en el diseño del Su-30 ruso pero con mejoras significativas. Es un avión bimotor de dos asientos diseñado para misiones de ataque a tierra, superioridad aérea y guerra electrónica. Cuenta con aviónica moderna, radar AESA y capacidad para transportar una amplia variedad de armas aire-aire y aire-tierra.",
        image: "media/img/j-16.png",
        video: "media/video/j-16mp4",
        specs: { speed: "Mach 2.0", range: "3,900 km", ceiling: "18,000 m", climbRate: "300 m/s", origin: "China", engineName: "WS-10B", powerPerEngine: "145 kN", totalPowerAfterburner: "290 kN", powerToWeight: "1.18" }
    }
];