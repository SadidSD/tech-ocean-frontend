export interface FilterAttribute {
  id: string;
  name: string;
  type: 'select' | 'range' | 'boolean' | 'multiple';
  options?: string[];
}

export interface ComponentCategoryMetadata {
  id: string;
  name: string;
  icon: string;
  requiredInBuilder: boolean;
  displayOrder: number;
  brands: string[];
  filterAttributes: FilterAttribute[];
  builderGroup?: 'core' | 'peripherals' | 'accessories';
}

export const COMPONENT_METADATA: Record<string, ComponentCategoryMetadata> = {
  // --- CORE COMPONENTS ---
  cpu: {
    id: "cpu",
    name: "Processor (CPU)",
    icon: "BsCpu",
    requiredInBuilder: true,
    displayOrder: 1,
    brands: ["Intel", "AMD"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "socket", name: "Socket", type: "multiple", options: ["LGA1700", "LGA1851", "AM4", "AM5", "LGA1200"] },
      { id: "cores", name: "Number of Cores", type: "multiple", options: ["2", "4", "6", "8", "10", "12", "14", "16", "20", "24"] },
      { id: "threads", name: "Number of Threads", type: "multiple", options: ["4", "8", "12", "16", "20", "24", "28", "32"] },
      { id: "clock", name: "Clock Speed", type: "select", options: ["Below 3.0GHz", "3.0-3.5GHz", "3.5-4.0GHz", "4.0-4.5GHz", "4.5-5.0GHz", "5.0GHz+"] },
      { id: "generation", name: "Generation", type: "multiple", options: ["10th Gen", "11th Gen", "12th Gen", "13th Gen", "14th Gen", "Ryzen 3000", "Ryzen 5000", "Ryzen 7000", "Ryzen 9000"] },
      { id: "igpu", name: "Integrated Graphics", type: "boolean" }
    ]
  },
  cooler: {
    id: "cooler",
    name: "CPU Cooler",
    icon: "GiComputerFan",
    requiredInBuilder: false,
    displayOrder: 2,
    brands: ["Cooler Master", "DeepCool", "Corsair", "Antec", "Noctua", "Gamdias", "Thermaltake", "NZXT"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "type", name: "Type", type: "select", options: ["Air Cooler", "Liquid/AIO Cooler"] },
      { id: "fanSize", name: "Fan Size", type: "multiple", options: ["92mm", "120mm", "140mm"] },
      { id: "radiatorSize", name: "Radiator Size", type: "multiple", options: ["120mm", "240mm", "280mm", "360mm", "420mm"] },
      { id: "rgb", name: "RGB", type: "boolean" }
    ]
  },
  motherboard: {
    id: "motherboard",
    name: "Motherboard",
    icon: "GiCircuitry",
    requiredInBuilder: true,
    displayOrder: 3,
    brands: ["ASUS", "MSI", "Gigabyte", "ASRock", "Biostar"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "socket", name: "Socket", type: "multiple", options: ["LGA1700", "AM4", "AM5", "LGA1200"] },
      { id: "chipset", name: "Chipset", type: "multiple", options: ["H610", "B660", "B760", "Z690", "Z790", "A620", "B650", "X670"] },
      { id: "formFactor", name: "Form Factor", type: "multiple", options: ["ATX", "Micro-ATX", "Mini-ITX", "E-ATX"] },
      { id: "ramSlots", name: "RAM Slots", type: "select", options: ["2", "4"] },
      { id: "wifi", name: "WiFi", type: "boolean" }
    ]
  },
  ram: {
    id: "ram",
    name: "RAM (Desktop)",
    icon: "FaMemory",
    requiredInBuilder: true,
    displayOrder: 4,
    brands: ["Corsair", "G.Skill", "Kingston", "Team Group", "ADATA", "Crucial"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "capacity", name: "Capacity", type: "multiple", options: ["8GB", "16GB", "32GB", "64GB", "128GB"] },
      { id: "speed", name: "Speed (MHz)", type: "multiple", options: ["2400", "3200", "3600", "4800", "5200", "5600", "6000", "6400+"] },
      { id: "type", name: "Type", type: "select", options: ["DDR4", "DDR5"] },
      { id: "rgb", name: "RGB", type: "boolean" }
    ]
  },
  storage: {
    id: "storage",
    name: "Storage (SSD/HDD)",
    icon: "FaHdd",
    requiredInBuilder: true,
    displayOrder: 5,
    brands: ["Samsung", "Western Digital", "Seagate", "Crucial", "Kingston", "Team Group", "ADATA", "Toshiba"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "type", name: "Type", type: "multiple", options: ["NVMe SSD", "SATA SSD", "HDD"] },
      { id: "capacity", name: "Capacity", type: "multiple", options: ["250GB", "500GB", "1TB", "2TB", "4TB", "8TB", "12TB", "16TB"] },
      { id: "interface", name: "Interface", type: "select", options: ["PCIe 3.0", "PCIe 4.0", "PCIe 5.0", "SATA III"] }
    ]
  },
  gpu: {
    id: "gpu",
    name: "Graphics Card (GPU)",
    icon: "BsGpuCard",
    requiredInBuilder: false,
    displayOrder: 6,
    brands: ["ASUS", "MSI", "Gigabyte", "Zotac", "Colorful", "PNY", "Sapphire", "XFX", "ASRock"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "chipset", name: "Chipset Series", type: "multiple", options: ["RTX 3060", "RTX 4060", "RTX 4070", "RTX 4080", "RTX 4090", "RX 6600", "RX 7600", "RX 7900"] },
      { id: "vram", name: "VRAM Capacity", type: "multiple", options: ["8GB", "12GB", "16GB", "20GB", "24GB"] },
      { id: "memoryType", name: "Memory Type", type: "select", options: ["GDDR6", "GDDR6X", "GDDR7"] },
      { id: "rayTracing", name: "Ray Tracing", type: "boolean" }
    ]
  },
  psu: {
    id: "psu",
    name: "Power Supply (PSU)",
    icon: "FaPlug",
    requiredInBuilder: true,
    displayOrder: 7,
    brands: ["Antec", "Corsair", "Cooler Master", "DeepCool", "Thermaltake", "Gamdias"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "wattage", name: "Wattage", type: "multiple", options: ["450W", "550W", "650W", "750W", "850W", "1000W", "1200W+"] },
      { id: "efficiency", name: "Efficiency", type: "multiple", options: ["80+ Bronze", "80+ Gold", "80+ Platinum", "80+ Titanium"] },
      { id: "modularity", name: "Modularity", type: "select", options: ["Non-Modular", "Semi-Modular", "Full Modular"] }
    ]
  },
  casing: {
    id: "casing",
    name: "Casing",
    icon: "BsPc",
    requiredInBuilder: true,
    displayOrder: 8,
    brands: ["Antec", "Corsair", "NZXT", "Lian Li", "Cooler Master", "DeepCool", "Gamdias"],
    builderGroup: 'core',
    filterAttributes: [
      { id: "formFactor", name: "Form Factor Support", type: "multiple", options: ["ATX", "Micro-ATX", "Mini-ITX", "E-ATX"] },
      { id: "color", name: "Color", type: "multiple", options: ["Black", "White", "Grey"] },
      { id: "sidePanel", name: "Side Panel", type: "select", options: ["Tempered Glass", "Solid", "Acrylic"] }
    ]
  },

  // --- PERIPHERALS ---
  monitor: {
    id: "monitor",
    name: "Monitor",
    icon: "FaDesktop",
    requiredInBuilder: false,
    displayOrder: 20,
    brands: ["Asus", "LG", "Samsung", "Dell", "HP", "MSI", "Gigabyte"],
    builderGroup: 'peripherals',
    filterAttributes: [
      { id: "size", name: "Screen Size", type: "multiple", options: ["22\"", "24\"", "27\"", "32\"", "34\"+"] },
      { id: "panel", name: "Panel Type", type: "select", options: ["IPS", "VA", "TN", "OLED"] },
      { id: "refresh", name: "Refresh Rate", type: "multiple", options: ["60Hz", "75Hz", "144Hz", "165Hz", "240Hz+"] }
    ]
  },
  keyboard: {
    id: "keyboard",
    name: "Keyboard",
    icon: "FaKeyboard",
    requiredInBuilder: false,
    displayOrder: 21,
    brands: ["Corsair", "Logitech", "Razer", "Keychron", "SteelSeries"],
    builderGroup: 'peripherals',
    filterAttributes: [
      { id: "type", name: "Type", type: "select", options: ["Mechanical", "Membrane"] },
      { id: "connectivity", name: "Connectivity", type: "select", options: ["Wired", "Wireless", "Bluetooth"] }
    ]
  },
  mouse: {
    id: "mouse",
    name: "Mouse",
    icon: "FaMouse",
    requiredInBuilder: false,
    displayOrder: 22,
    brands: ["Logitech", "Razer", "Corsair", "SteelSeries", "Glorious"],
    builderGroup: 'peripherals',
    filterAttributes: []
  },
  ups: {
    id: "ups",
    name: "UPS",
    icon: "FaBatteryFull",
    requiredInBuilder: false,
    displayOrder: 23,
    brands: ["Apollo", "MaxGreen", "Digital X"],
    builderGroup: 'peripherals',
    filterAttributes: []
  },

  // --- ACCESSORIES ---
  thermal_paste: {
    id: "thermal_paste",
    name: "Thermal Paste",
    icon: "FaTint",
    requiredInBuilder: false,
    displayOrder: 40,
    brands: ["Arctic", "Thermal Grizzly", "Noctua"],
    builderGroup: 'accessories',
    filterAttributes: []
  },
  led_strip: {
    id: "led_strip",
    name: "LED Strip",
    icon: "FaLightbulb",
    requiredInBuilder: false,
    displayOrder: 41,
    brands: ["Phanteks", "DeepCool", "Corsair"],
    builderGroup: 'accessories',
    filterAttributes: []
  }
};
