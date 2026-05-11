export const MOCK_CATEGORIES = [
  { 
    id: 1, 
    name: "Laptop", 
    reactIcon: "FaLaptop", 
    iconColor: "#3B82F6", 
    iconBg: "rgba(59, 130, 246, 0.12)", 
    slug: "laptop", 
    children: [
      {
        id: 101,
        name: "All Laptop",
        slug: "all-laptop",
        subItems: ["Acer", "Apple", "ASUS", "CHUWI", "Dell", "Gigabyte", "HP", "Lenovo", "Microsoft", "MSI", "Smart", "TECNO"]
      },
      {
        id: 102,
        name: "Accessories",
        slug: "laptop-accessories",
        subItems: [
          {
            name: "Laptop Ram",
            dropdown: ["All Brands", "ADATA", "Apacer", "CORSAIR", "Crucial", "G.SKILL", "Neo Forza", "Netac", "OCPC", "OSCOO", "Patriot", "Smart", "TEAM", "Transcend", "TwinMOS"]
          },
          "Laptop Cooler", "Caddy", "Laptop Bag", "Stand", "Battery", "Adapter"
        ]
      }
    ]
  },
  { 
    id: 2, 
    name: "Desktop and Server", 
    reactIcon: "FaDesktop", 
    iconColor: "#8B5CF6", 
    iconBg: "rgba(139, 92, 246, 0.12)", 
    slug: "desktop-and-server", 
    children: [
      {
        id: 201,
        name: "Desktop PC",
        slug: "desktop-pc",
        subItems: [
          { name: "Brand Desktop PC", dropdown: ["All Brands", "Acer", "ASUS", "Dell", "Gigabyte", "HP", "Lenovo", "MSI"] },
          { name: "All In One PC", dropdown: ["All Brands", "Acer", "ASUS", "Dell", "Gigabyte", "HP", "Lenovo", "MSI"] },
          { name: "Mini PC", dropdown: ["All Brands", "Apple", "ASUS", "Lenovo"] },
          "Ryans PC",
          "AI Workstation PC"
        ]
      },
      {
        id: 202,
        name: "Desktop Component",
        slug: "desktop-component",
        subItems: [
          { name: "Processor", dropdown: ["All brands", "Intel", "AMD"] },
          { name: "Motherboard", dropdown: ["All Brands", "AFOX", "ASRock", "ASUS", "BIOSTAR", "Colorful", "Gigabyte", "MAXSUN", "MSI", "NZXT"] },
          { name: "Desktop Ram", dropdown: ["All Brands", "AFOX", "ASRock", "ASUS", "BIOSTAR", "Colorful", "Gigabyte", "MAXSUN", "MSI", "NZXT"] },
          "Optical Device",
          { name: "Graphics Card", dropdown: ["All Brands", "AFOX", "ASUS", "Gigabyte", "GUNNIR", "Manli", "MSI", "OCPC", "PELADN", "PNY", "PowerColor", "SAPPHIRE", "ZOTAC"] },
          { name: "Power Supply", dropdown: ["All Brands", "1st Player", "Acer", "Antec", "ASUS", "Cooler Master", "CORSAIR", "COUGAR", "DeepCool", "GAMDIAS", "Gigabyte", "Huntkey", "Lian Li", "MONTECH", "MSI", "NZXT", "OCPC", "Revenger", "Safeway", "SilverStone", "T-WOLF", "Thermalright", "Thermaltake", "Value Top", "Xigmatek"] },
          { name: "Casing", dropdown: ["All Brands", "1st Player", "Acer", "Antec", "Arctic", "ASUS", "AULA", "Cooler Master", "CORSAIR", "COUGAR", "DeepCool", "GAMDIAS", "GameMax", "Gigabyte", "Golden Field", "Lian Li", "MaxGreen", "MONTECH", "MSI", "NZXT", "PC Power", "Power Train", "Revenger", "Safeway", "Space", "T-WOLF", "Thermaltake", "UTim", "Value Top", "Wintech", "Xigmatek", "Xtreme"] },
          "Casing Fan",
          { name: "CPU Cooler", dropdown: ["All Brands", "1st Player", "Acer", "Antec", "Arctic", "ASUS", "AULA", "Cooler Master", "CORSAIR", "COUGAR", "DeepCool", "GAMDIAS", "GameMax", "Gigabyte", "Golden Field", "Lian Li", "MaxGreen", "MONTECH", "MSI", "NZXT", "PC Power", "Power Train", "Revenger", "Safeway", "Space", "T-WOLF", "Thermaltake", "UTim", "Value Top", "Wintech", "Xigmatek", "Xtreme"] },
          { name: "Keyboard", dropdown: ["All Brands", "A4TECH", "Apple", "ASUS", "AULA", "Belkin", "CHUWI", "CORSAIR", "Fantech", "GAMDIAS", "GEEZEER", "Gigabyte", "Golden Field", "Havit", "Logitech", "Marvo", "Meetion", "Micropack", "Microsoft", "MOFII", "ONIKUMA", "PC Power", "Rapoo", "Razer", "Redragon", "Revenger", "Royal Kludge", "SteelSeries", "T-WOLF", "Targus", "UGREEN", "Value Top", "WiWU", "Xtreme"] },
          { name: "Mouse", dropdown: ["All Brands", "A4TECH", "Apple", "ASUS", "AULA", "Belkin", "CHUWI", "CORSAIR", "Fantech", "GAMDIAS", "GEEZEER", "Gigabyte", "Golden Field", "Havit", "Logitech", "Marvo", "Meetion", "Micropack", "Microsoft", "MOFII", "ONIKUMA", "PC Power", "Rapoo", "Razer", "Redragon", "Revenger", "Royal Kludge", "SteelSeries", "T-WOLF", "Targus", "UGREEN", "Value Top", "WiWU", "Xtreme"] },
          { name: "Keyboard and Mouse Combo", dropdown: ["All Brands", "A4TECH", "Apple", "ASUS", "AULA", "Belkin", "CHUWI", "CORSAIR", "Fantech", "GAMDIAS", "GEEZEER", "Gigabyte", "Golden Field", "Havit", "Logitech", "Marvo", "Meetion", "Micropack", "Microsoft", "MOFII", "ONIKUMA", "PC Power", "Rapoo", "Razer", "Redragon", "Revenger", "Royal Kludge", "SteelSeries", "T-WOLF", "Targus", "UGREEN", "Value Top", "WiWU", "Xtreme"] },
          "Mouse Pad",
          "Power Station",
          { name: "UPS", dropdown: ["All Brands", "Apollo", "Digital X", "KSTAR", "MARSRIVA", "MaxGreen", "Power Guard", "Powerpac", "Prolink"] },
          "UPS Battery"
        ]
      },
      {
        id: 203,
        name: "Server",
        slug: "server",
        subItems: [
          { name: "Rack Server", dropdown: ["All Brands", "Dell"] },
          { name: "Tower Server", dropdown: ["All Brands", "Dell", "June"] },
          "June Server"
        ]
      },
      {
        id: 204,
        name: "Server Component",
        slug: "server-component",
        subItems: [
          "Server Processor",
          "Server Motherboard",
          "Internal Server SSD",
          "Server Cabinet"
        ]
      },
      {
        id: 205,
        name: "Desktop Accessories",
        slug: "desktop-accessories",
        subItems: [
          "LED Strip",
          "Casing Accessories",
          "Graphics Card Holder",
          "Thermal Paste"
        ]
      },
      {
        id: 206,
        name: "Storage",
        slug: "storage",
        subItems: [
          { name: "Internal HDD", dropdown: ["All Brands", "Seagate", "Toshiba", "Western Digital"] },
          { name: "Internal SSD", dropdown: ["All Brands", "ADATA", "Apacer", "CORSAIR", "Dahua", "Gigabyte", "Hiksemi", "Kingston", "MiPhi", "Neo Forza", "Netac", "OCPC", "OSCOO", "Patriot", "Redragon", "Seagate", "TEAM", "Transcend", "TwinMOS", "Western Digital"] },
          { name: "External HDD", dropdown: ["All Brands", "Apacer", "Netac", "Seagate", "Toshiba", "Transcend", "TwinMOS", "Western Digital"] },
          { name: "External SSD", dropdown: ["All Brands", "ADATA", "Apacer", "Netac", "OSCOO", "Patriot", "SanDisk", "Seagate", "TEAM", "Transcend", "TwinMOS", "UGREEN"] },
          { name: "Pen Drive", dropdown: ["All Brands", "ADATA", "Apacer", "Dahua", "Hiksemi", "Kingston", "Netac", "OSCOO", "SanDisk", "Transcend", "TwinMOS"] },
          { name: "Memory Card", dropdown: ["All Brands", "ADATA", "Apacer", "Kingston", "Patriot", "SanDisk", "Transcend", "TwinMOS"] },
          "HDD and SSD Case",
          "Card Reader"
        ]
      }
    ]
  },
  { 
    id: 3, 
    name: "Gaming", 
    reactIcon: "FaGamepad", 
    iconColor: "#EF4444", 
    iconBg: "rgba(239, 68, 68, 0.12)", 
    slug: "gaming", 
    children: [
      {
        id: 301,
        name: "Gaming Component",
        slug: "gaming-component",
        subItems: [
          { name: "Gaming Console", dropdown: ["All Brands", "ASUS", "META", "Nintendo", "PICO", "PlayStation"] },
          { name: "Gaming Controller", dropdown: ["All Brands", "A4TECH", "Havit", "Logitech", "MSI", "ONIKUMA", "PlayStation", "Rapoo", "Redragon", "SteelSeries", "Xbox"] },
          { name: "Virtual Reality (VR)", dropdown: ["All Brands", "META", "PICO", "PlayStation"] },
          "Game Streaming",
          "Games",
          "Gaming Chair",
          "Gaming Desk",
          "Gaming Sofa",
          "Gaming Component Accessories",
          "Ryans PC",
          "Gaming Desktop Component",
          "Motherboard",
          "Desktop Ram",
          "Graphics Card",
          "Power Supply",
          "Casing",
          "CPU Cooler",
          "Keyboard",
          "Mouse",
          "Keyboard and Mouse Combo",
          "Mouse Pad",
          "LED Strip",
          "Gaming Monitor",
          "Sound System",
          "Speaker",
          "Headphone",
          "Microphone",
          "Earphone",
          "Gaming Network Router"
        ]
      }
    ]
  },
  { 
    id: 4, 
    name: "Monitor", 
    reactIcon: "FaDesktop", 
    iconColor: "#14B8A6", 
    iconBg: "rgba(20, 184, 166, 0.12)", 
    slug: "monitor", 
    children: [
      {
        id: 401,
        name: "All Monitor",
        slug: "all-monitor",
        subItems: [
          "Acer", "AOC", "Apple", "Arzopa", "ASUS", "BenQ", "Dahua", "Dell", "Gigabyte", "Hikvision", "HP", "Lenovo", "LG", "MSI", "PC Power", "Philips", "Samsung", "Value Top", "ViewSonic", "Xiaomi", "Monitor Mounts and Brackets"
        ]
      }
    ]
  },
  { id: 5, name: "Tablet PC", reactIcon: "FaTabletAlt", iconColor: "#8B5CF6", iconBg: "rgba(139, 92, 246, 0.12)", slug: "tablet-pc", children: [] },
  { id: 6, name: "Printer", reactIcon: "FaPrint", iconColor: "#F59E0B", iconBg: "rgba(245, 158, 11, 0.12)", slug: "printer", children: [] },
  { id: 7, name: "Camera", reactIcon: "FaCamera", iconColor: "#06B6D4", iconBg: "rgba(6, 182, 212, 0.12)", slug: "camera", children: [] },
  { id: 8, name: "Security", reactIcon: "FaShieldAlt", iconColor: "#10B981", iconBg: "rgba(16, 185, 129, 0.12)", slug: "security", children: [] },
  { id: 9, name: "Network", reactIcon: "FaNetworkWired", iconColor: "#6366F1", iconBg: "rgba(99, 102, 241, 0.12)", slug: "network", children: [] },
  { id: 10, name: "Sound", reactIcon: "FaVolumeUp", iconColor: "#F43F5E", iconBg: "rgba(244, 63, 94, 0.12)", slug: "sound", children: [] },
  { id: 11, name: "Office Items", reactIcon: "FaBriefcase", iconColor: "#F59E0B", iconBg: "rgba(245, 158, 11, 0.12)", slug: "office-items", children: [] },
  { id: 12, name: "Accessories", reactIcon: "FaKeyboard", iconColor: "#F97316", iconBg: "rgba(249, 115, 22, 0.12)", slug: "accessories", children: [] },
  { id: 13, name: "Software", reactIcon: "FaCode", iconColor: "#3B82F6", iconBg: "rgba(59, 130, 246, 0.12)", slug: "software", children: [] },
  { id: 14, name: "Gadget", reactIcon: "FaCubes", iconColor: "#06B6D4", iconBg: "rgba(6, 182, 212, 0.12)", slug: "gadget", children: [] },
  { id: 15, name: "Mobile Phone", reactIcon: "FaMobileAlt", iconColor: "#F43F5E", iconBg: "rgba(244, 63, 94, 0.12)", slug: "mobile-phone", children: [] },
  { id: 16, name: "Appliances", reactIcon: "FaHome", iconColor: "#EAB308", iconBg: "rgba(234, 179, 8, 0.12)", slug: "appliances", children: [] },
];
