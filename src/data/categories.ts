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
  { 
    id: 5, 
    name: "Tablet PC", 
    reactIcon: "FaTabletAlt", 
    iconColor: "#8B5CF6", 
    iconBg: "rgba(139, 92, 246, 0.12)", 
    slug: "tablet-pc", 
    children: [
      {
        id: 501,
        name: "Regular Tablet",
        slug: "regular-tablet",
        subItems: ["Amazon", "CHUWI", "HONOR", "Lenovo", "Samsung", "Teclast", "Xiaomi"]
      },
      {
        id: 502,
        name: "Kids Tablet",
        slug: "kids-tablet",
        subItems: ["Teclast"]
      },
      {
        id: 503,
        name: "Graphics Tablet",
        slug: "graphics-tablet",
        subItems: ["Huion", "Wacom", "XP-Pen"]
      },
      {
        id: 504,
        name: "Apple Tablet",
        slug: "apple-tablet",
        subItems: ["iPad"]
      },
      {
        id: 505,
        name: "Digital Signature Pad",
        slug: "digital-signature-pad",
        subItems: []
      },
      {
        id: 506,
        name: "Stylus Pen",
        slug: "stylus-pen",
        subItems: []
      },
      {
        id: 507,
        name: "Tablet Accessories",
        slug: "tablet-accessories",
        subItems: ["Power Bank", "Car Charger", "Wireless Charger", "Wall Charger", "Cable Organizer", "Phone Holder", "Selfie Stick", "Screen Cleaner"]
      },
      {
        id: 508,
        name: "Tablet PC Case",
        slug: "tablet-pc-case",
        subItems: []
      }
    ]
  },
  { 
    id: 6, 
    name: "Printer", 
    reactIcon: "FaPrint", 
    iconColor: "#F59E0B", 
    iconBg: "rgba(245, 158, 11, 0.12)", 
    slug: "printer", 
    children: [
      {
        id: 601,
        name: "Document Printer",
        slug: "document-printer",
        subItems: [
          { name: "Laser Printer", dropdown: ["All Brands", "Brother", "Canon", "Fujifilm", "HP", "Pantum"] },
          { name: "Ink Printer", dropdown: ["All Brands", "Brother", "Canon", "Deli", "Epson", "HP"] },
          "Dot Matrix Printer",
          { name: "Label Printer", dropdown: ["All Brands", "Brother", "Canon", "Deli", "Epson", "HP"] },
          { name: "Card Printer", dropdown: ["All Brands", "Evolis", "HiTi", "Zebra"] },
          { name: "POS Printer", dropdown: ["All Brands", "Deli", "Epson", "Rongta", "SEWOO", "Sunmi", "Xprinter", "ZKTeco"] },
          { name: "Large Format Printer", dropdown: ["All Brands", "Canon", "Epson", "HP"] },
          "Printer Paper"
        ]
      },
      {
        id: 602,
        name: "Consumable",
        slug: "consumable",
        subItems: ["Toner", "Cartridge", "Ribbon", "Refill", "Drum Unit", "Print Head"]
      },
      {
        id: 603,
        name: "Accessories",
        slug: "printer-accessories",
        subItems: []
      }
    ]
  },
  { 
    id: 7, 
    name: "Camera", 
    reactIcon: "FaCamera", 
    iconColor: "#06B6D4", 
    iconBg: "rgba(6, 182, 212, 0.12)", 
    slug: "camera", 
    children: [
      {
        id: 701,
        name: "Digital SLR Camera",
        slug: "dslr-camera",
        subItems: ["DSLR Camera", "Mirrorless Camera", "DSLR Camera Accessories", "DSLR Camera Lens"]
      },
      {
        id: 702,
        name: "Digital Compact Camera",
        slug: "compact-camera",
        subItems: [
          "Compact Camera", 
          { name: "Action Camera", dropdown: ["All Brands", "Blisbond", "DJI", "GoPro", "Insta360"] },
          "Compact Camera Accessories"
        ]
      },
      {
        id: 703,
        name: "Video Camera",
        slug: "video-camera",
        subItems: [
          { name: "Video Conferencing", dropdown: ["All Brands", "BenQ", "EMEET", "Grandstream", "Jabra", "Logitech", "Rapoo"] },
          { name: "Webcam", dropdown: ["All Brands", "A4TECH", "ASUS", "BenQ", "CORSAIR", "EMEET", "FIFINE", "Grandstream", "Havit", "Jabra", "Logitech", "Micropack", "Rapoo", "Redragon", "Revenger", "UGREEN"] }
        ]
      },
      {
        id: 704,
        name: "Drone",
        slug: "drone",
        subItems: ["Drone Accessories"]
      },
      {
        id: 705,
        name: "Gimbal",
        slug: "gimbal",
        subItems: [
          { name: "Gimbal Brands", dropdown: ["All Brands", "Baseus", "DJI", "Hohem", "WiWU", "Zhiyun"] }
        ]
      },
      {
        id: 706,
        name: "Studio Equipments",
        slug: "studio-equipments",
        subItems: ["Tripod", "Umbrella", "Flash and Ring Light", "Mixer", "Studio Headphone", "Studio Microphone", "Audio Interface"]
      }
    ]
  },
  { 
    id: 8, 
    name: "Security", 
    reactIcon: "FaShieldAlt", 
    iconColor: "#10B981", 
    iconBg: "rgba(16, 185, 129, 0.12)", 
    slug: "security", 
    children: [
      {
        id: 801,
        name: "Camera System",
        slug: "camera-system",
        subItems: [
          { name: "CC Camera", dropdown: ["All Brands", "Dahua", "Hikvision"] },
          { name: "IP Camera", dropdown: ["All Brands", "Armor", "Dahua", "EZVIZ", "Grandstream", "Hikvision", "Imou", "Tenda", "TP-Link", "Uniview"] },
          { name: "Wireless / Wi-Fi Camera", dropdown: ["All Brands", "Dahua", "EZVIZ", "Google", "Havit", "IMILAB", "Imou", "ORVIBO", "Tenda", "TP-Link", "Uniview", "ZKTeco"] }
        ]
      },
      {
        id: 802,
        name: "Recording Device",
        slug: "recording-device",
        subItems: [
          "DVR",
          { name: "NVR", dropdown: ["All Brands", "Dahua", "EZVIZ", "Hikvision", "Synology", "TP-Link"] },
          { name: "XVR", dropdown: ["All Brands", "Armor", "Dahua"] }
        ]
      },
      {
        id: 803,
        name: "CCTV Accessories",
        slug: "cctv-accessories",
        subItems: [
          "CC/IP Camera Accessories",
          { name: "CCTV Package", dropdown: ["All Brands", "Dahua", "EZVIZ", "Hikvision", "Imou", "TP-Link"] }
        ]
      },
      {
        id: 804,
        name: "Home Security",
        slug: "home-security",
        subItems: ["Smart Lock", "Smart Door Bell"]
      },
      {
        id: 805,
        name: "Entrance Control",
        slug: "entrance-control",
        subItems: ["Time Attendance System", "Access Control", "Access Control Accessories", "Access Control Software"]
      }
    ]
  },
  { 
    id: 9, 
    name: "Network", 
    reactIcon: "FaNetworkWired", 
    iconColor: "#6366F1", 
    iconBg: "rgba(99, 102, 241, 0.12)", 
    slug: "network", 
    children: [
      {
        id: 901,
        name: "Satellite Internet",
        slug: "satellite-internet",
        subItems: ["STARLINK", "STARLINK Accessories"]
      },
      {
        id: 902,
        name: "Network Device",
        slug: "network-device",
        subItems: [
          { name: "Network Router", dropdown: ["All Brands", "ASUS", "C-Net", "Cisco", "Cudy", "D-Link", "Dahua", "Hikvision", "Huawei", "MERCUSYS", "MikroTik", "Netgear", "Netis", "Prolink", "Ruijie", "Synology", "Tenda", "TP-Link"] },
          { name: "Access Point", dropdown: ["All Brands", "Cisco", "Cudy", "D-Link", "Fortinet", "Grandstream", "Huawei", "IP-Com", "MikroTik", "Netgear", "Ruijie", "Tenda", "TP-Link", "Ubiquiti"] },
          "Range Extender",
          { name: "Network Switch", dropdown: ["All Brands", "C-Data", "Cisco", "Cudy", "D-Link", "Dahua", "Fortinet", "Grandstream", "Hikvision", "Huawei", "IP-Com", "K2", "LevelOne", "MERCUSYS", "Micronet", "MikroTik", "Netgear", "Netis", "Ruijie", "Safenet", "SOLITINE", "Tenda", "TP-Link", "UGREEN"] }
        ]
      },
      {
        id: 903,
        name: "Connectivity",
        slug: "connectivity",
        subItems: [
          "Lan Card", "Wifi Adapter",
          { name: "Network Cable", dropdown: ["All Brands", "Baseus", "CommScope", "D-Link", "G-Link", "Hikvision", "Micronet", "NexaKey", "Revenger", "Rosenberger", "UGREEN", "Vention", "Vivanco", "Yuanxin", "ZKTeco"] }
        ]
      },
      {
        id: 904,
        name: "Fiber / Advanced",
        slug: "fiber-advanced",
        subItems: ["Optical Line Termination (OLT)", "Optical Network Unit (ONU)", "Network Storage", "Edge Modem", "Splicer Machine"]
      },
      {
        id: 905,
        name: "Network Accessories",
        slug: "network-accessories",
        subItems: ["Connector", "Face Plate", "Cable Lan", "Crimping Tool", "Management Cable", "Patch Panel", "Modular", "Extender"]
      }
    ]
  },
  { 
    id: 10, 
    name: "Sound", 
    reactIcon: "FaVolumeUp", 
    iconColor: "#F43F5E", 
    iconBg: "rgba(244, 63, 94, 0.12)", 
    slug: "sound", 
    children: [
      {
        id: 1001,
        name: "Audio Equipment",
        slug: "audio-equipment",
        subItems: [
          { name: "Speaker", dropdown: ["All Brands", "Ahuja", "Amazon", "Anker", "AULA", "Bose", "BWOO", "CMX", "Dell", "Digital X", "Edifier", "EMEET", "F&D", "Fantech", "FIFINE", "Focusrite", "Grandstream", "Harman Kardon", "Havit", "HTDZ", "Jabra", "JBL", "Logitech", "Maono", "Marshall", "Microlab", "Micropack", "Monster", "ONIKUMA", "Oraimo", "PC Power", "Rapoo", "Redragon", "Revenger", "Samsung", "Sonos", "Sony", "SteelSeries", "T-WOLF", "TEV", "Value Top", "WiWU", "X Lab", "Xtreme", "Yamaha"] },
          { name: "Home Theater Systems", dropdown: ["All Brands", "Edifier", "F&D", "JBL", "Logitech", "Samsung", "Sonos", "Sony", "WiWU", "Xtreme", "Yamaha"] },
          { name: "PA System", dropdown: ["All Brands", "Ahuja", "CMX", "Edifier", "F&D", "Focusrite", "HTDZ", "JBL", "TEV", "Xtreme", "Yamaha"] },
          { name: "Amplifier", dropdown: ["All Brands", "Ahuja", "CMX", "FIFINE", "Focusrite", "HTDZ", "Maono", "Yamaha"] },
          "Music Player"
        ]
      },
      {
        id: 1002,
        name: "Headphones & Earwear",
        slug: "headphones-earwear",
        subItems: [
          { name: "Headphone", dropdown: ["All Brands", "A4TECH", "Anker", "ASUS", "AULA", "Baseus", "Beats", "Bose", "BWOO", "CORSAIR", "Edifier", "EKSA", "EMEET", "Fantech", "Fastrack", "FIFINE", "Gigabyte", "Havit", "Haylou", "Hoco", "HyperX", "Inbertec", "Jabra", "JBL", "Logitech", "Maono", "Microlab", "Micropack", "Monster", "MSI", "OneOdio", "ONIKUMA", "Oraimo", "Rapoo", "Razer", "Redragon", "Sonos", "Sony", "SteelSeries", "UGREEN", "Vention", "WiWU", "Xtreme"] },
          { name: "Earphone", dropdown: ["All Brands", "ASUS", "Baseus", "Edifier", "Havit", "JBL", "META", "Oraimo", "SteelSeries", "WiWU", "Xiaomi"] },
          { name: "Earbuds", dropdown: ["All Brands", "A4TECH", "Anker", "Baseus", "Blisbond", "Bose", "BWOO", "Dareu", "Edifier", "EMEET", "Energizer", "F&D", "Fastrack", "Havit", "Haylou", "HiFuture", "Hoco", "HONOR", "IMILAB", "Jabra", "JBL", "LDNIO", "Mibro", "Microlab", "Monster", "Nothing", "OnePlus", "ONIKUMA", "Onten", "Oraimo", "Rapoo", "Realme", "Sony", "SteelSeries", "UGREEN", "Vention", "WiWU", "Xiaomi", "XTRA"] },
          { name: "Neckband", dropdown: ["All Brands", "Energizer", "Havit", "Jabra", "JBL", "Microlab", "Nothing", "OnePlus", "Oraimo", "WiWU", "XTRA"] }
        ]
      },
      {
        id: 1003,
        name: "Recording & Instruments",
        slug: "recording-instruments",
        subItems: [
          { name: "Microphone", dropdown: ["All Brands", "Ahuja", "ASUS", "BOYA", "CMX", "CORSAIR", "DJI", "FIFINE", "Havit", "Hoco", "Hohem", "HTDZ", "HyperX", "JBL", "K2", "Maono", "MSI", "ONIKUMA", "Rapoo", "Redragon", "RODE", "Saramonic", "SteelSeries", "SYNCO", "TEV", "UGREEN", "Ulanzi", "WiWU", "Yamaha"] },
          "Sound Card", "Voice Recorder", "Radio", "Musical Instrument", "Sound System Accessories"
        ]
      }
    ]
  },
  { id: 11, name: "Office Items", reactIcon: "FaBriefcase", iconColor: "#F59E0B", iconBg: "rgba(245, 158, 11, 0.12)", slug: "office-items", children: [] },
  { id: 12, name: "Accessories", reactIcon: "FaKeyboard", iconColor: "#F97316", iconBg: "rgba(249, 115, 22, 0.12)", slug: "accessories", children: [] },
  { id: 13, name: "Software", reactIcon: "FaCode", iconColor: "#3B82F6", iconBg: "rgba(59, 130, 246, 0.12)", slug: "software", children: [] },
  { id: 14, name: "Gadget", reactIcon: "FaCubes", iconColor: "#06B6D4", iconBg: "rgba(6, 182, 212, 0.12)", slug: "gadget", children: [] },
  { id: 15, name: "Mobile Phone", reactIcon: "FaMobileAlt", iconColor: "#F43F5E", iconBg: "rgba(244, 63, 94, 0.12)", slug: "mobile-phone", children: [] },
  { id: 16, name: "Appliances", reactIcon: "FaHome", iconColor: "#EAB308", iconBg: "rgba(234, 179, 8, 0.12)", slug: "appliances", children: [] },
  { 
    id: 17, 
    name: "TV", 
    reactIcon: "FaTv", 
    iconColor: "#3B82F6", 
    iconBg: "rgba(59, 130, 246, 0.12)", 
    slug: "tv", 
    children: [
      {
        id: 1701,
        name: "Smart TV",
        slug: "smart-tv",
        subItems: [
          "Beko", "Haier", "Sony", "TCL", "Xiaomi",
          { name: "Smart TV Stick", dropdown: ["All brands", "Xiaomi"] },
          { name: "TV Accessories", dropdown: ["All brands", "k2"] }
        ]
      }
    ]
  },
];
