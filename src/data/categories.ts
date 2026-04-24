export const MOCK_CATEGORIES = [
  {
      id: 1, name: "Laptop", reactIcon: "FaLaptop", iconColor: "#3B82F6", iconBg: "rgba(59, 130, 246, 0.12)", slug: "laptop",
      children: [
          { id: 101, name: "Gaming Laptop", slug: "gaming-laptop" },
          { id: 102, name: "Business Laptop", slug: "business-laptop" },
          { id: 103, name: "Student Laptop", slug: "student-laptop" },
          { id: 104, name: "Apple MacBook", slug: "apple-macbook" },
          { id: 105, name: "Premium Ultrabook", slug: "premium-ultrabook" }
      ]
  },
  {
      id: 2, name: "Desktop PC", reactIcon: "FaDesktop", iconColor: "#8B5CF6", iconBg: "rgba(139, 92, 246, 0.12)", slug: "desktop-pc",
      children: [
          { id: 201, name: "Custom PC", slug: "custom-pc" },
          { id: 202, name: "Brand PC", slug: "brand-pc" },
          { id: 203, name: "All-in-One PC", slug: "all-in-one-pc" },
          { id: 204, name: "Mini PC / NUC", slug: "mini-pc" },
          { id: 205, name: "Workstation", slug: "workstation" }
      ]
  },
  {
      id: 3, name: "Gaming PC", reactIcon: "FaGamepad", iconColor: "#EF4444", iconBg: "rgba(239, 68, 68, 0.12)", slug: "gaming-pc",
      children: [
          { id: 301, name: "Pre-built Gaming PC", slug: "pre-built-gaming-pc" },
          { id: 302, name: "Gaming PC Component", slug: "gaming-pc-component" },
          { id: 303, name: "Gaming Console", slug: "gaming-console" }
      ]
  },
  {
      id: 4, name: "CCTV & IP Camera", reactIcon: "FaVideo", iconColor: "#10B981", iconBg: "rgba(16, 185, 129, 0.12)", slug: "cctv-ip-camera",
      children: [
          { id: 401, name: "IP Camera", slug: "ip-camera" },
          { id: 402, name: "Analog Camera", slug: "analog-camera" },
          { id: 403, name: "NVR / DVR", slug: "nvr-dvr" },
          { id: 404, name: "Surveillance HDD", slug: "surveillance-hdd" }
      ]
  },
  {
      id: 5, name: "Components", reactIcon: "FaMicrochip", iconColor: "#EC4899", iconBg: "rgba(236, 72, 153, 0.12)", slug: "components",
      children: [
          { id: 501, name: "Processor (CPU)", slug: "processor" },
          { id: 502, name: "Motherboard", slug: "motherboard" },
          { id: 503, name: "Graphics Card (GPU)", slug: "graphics-card" },
          { id: 504, name: "RAM (Desktop)", slug: "ram-desktop" },
          { id: 505, name: "Power Supply (PSU)", slug: "power-supply" },
          { id: 506, name: "Storage (SSD/HDD)", slug: "storage" },
          { id: 507, name: "Casing", slug: "casing" },
          { id: 508, name: "CPU Cooler", slug: "cooler" },
          { id: 509, name: "RAM (Laptop)", slug: "ram-laptop" },
          { id: 510, name: "Hard Disk Drive (HDD)", slug: "hdd" },
          { id: 511, name: "Case Fan", slug: "case-fan" },
          { id: 512, name: "Liquid Cooling", slug: "liquid-cooling" },
          { id: 513, name: "Optical Drive", slug: "optical-drive" },
          { id: 514, name: "Thermal Paste", slug: "thermal-paste" },
          { id: 515, name: "Network Card", slug: "network-card" },
          { id: 516, name: "Sound Card", slug: "sound-card" },
          { id: 517, name: "UPS", slug: "ups" },
          { id: 518, name: "Monitor Arm", slug: "monitor-arm" },
          { id: 519, name: "Capture Card", slug: "capture-card" }
      ]
  },
  {
      id: 6, name: "Monitor", reactIcon: "FaDesktop", iconColor: "#14B8A6", iconBg: "rgba(20, 184, 166, 0.12)", slug: "monitor",
      children: [
          { id: 601, name: "Gaming Monitor", slug: "gaming-monitor" },
          { id: 602, name: "Professional Monitor", slug: "professional-monitor" },
          { id: 603, name: "Curved Monitor", slug: "curved-monitor" }
      ]
  },
  {
      id: 9, name: "Office Equipment", reactIcon: "FaPrint", iconColor: "#F59E0B", iconBg: "rgba(245, 158, 11, 0.12)", slug: "office-equipment",
      children: [
          { id: 901, name: "Printer", slug: "printer" },
          { id: 902, name: "Photocopier", slug: "photocopier" },
          { id: 903, name: "Scanner", slug: "scanner" },
          { id: 904, name: "Projector", slug: "projector" }
      ]
  },
  {
      id: 10, name: "Gadget", reactIcon: "FaCamera", iconColor: "#06B6D4", iconBg: "rgba(6, 182, 212, 0.12)", slug: "gadget",
      children: [
          { id: 1001, name: "Smart Watch", slug: "smart-watch" },
          { id: 1002, name: "Earbuds", slug: "earbuds" },
          { id: 1003, name: "Action Camera", slug: "action-camera" },
          { id: 1004, name: "Drone", slug: "drone" }
      ]
  },
  {
      id: 11, name: "Home Appliance", reactIcon: "FaHome", iconColor: "#EAB308", iconBg: "rgba(234, 179, 8, 0.12)", slug: "home-appliance",
      children: [
          { id: 1101, name: "Air Conditioner", slug: "air-conditioner" },
          { id: 1102, name: "Refrigerator", slug: "refrigerator" },
          { id: 1103, name: "Washing Machine", slug: "washing-machine" }
      ]
  },
  {
      id: 12, name: "Accessories", reactIcon: "FaKeyboard", iconColor: "#F97316", iconBg: "rgba(249, 115, 22, 0.12)", slug: "accessories",
      children: [
          { id: 1201, name: "Keyboard", slug: "keyboard" },
          { id: 1202, name: "Mouse", slug: "mouse" },
          { id: 1203, name: "Headphone", slug: "headphone" },
          { id: 1204, name: "UPS", slug: "ups-acc" }
      ]
  },
  {
      id: 14, name: "Server & Storage", reactIcon: "FaServer", iconColor: "#64748B", iconBg: "rgba(100, 116, 139, 0.12)", slug: "server-storage",
      children: [
          { id: 1401, name: "Rack Server", slug: "rack-server" },
          { id: 1402, name: "NAS", slug: "nas" },
          { id: 1403, name: "Network Storage", slug: "network-storage" }
      ]
  },
];
