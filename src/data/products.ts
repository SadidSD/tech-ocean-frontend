export const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Sony PlayStation 5 Console (Disc Edition)',
    price: '58,000৳',
    oldPrice: '',
    features: ['Custom AMD RDNA 2 GPU', '825GB PCIe Gen 4 NVMe SSD', 'Tempest 3D AudioTech', 'DualSense wireless controller'],
    category: 'Gaming PC',
    status: 'In Stock',
    imgIcon: 'fa-gamepad',
    imgUrl: '/img/playstation5.png',
    rating: 4.5,
    reviewCount: 205
  },
  {
    id: 6,
    title: 'Dahua HAC-B1A21P-U-IL 2MP Smart Dual Light HDCVI Bullet CC Camera',
    price: '2,500৳',
    oldPrice: '3,000৳',
    features: ['2 Megapixel resolution', 'Smart Dual Light', 'HDCVI Bullet design', 'Stock: 30 pieces'],
    category: 'CCTV & IP Camera',
    status: 'In Stock',
    imgUrl: '/img/dahua_camera.png',
    rating: 5,
    reviewCount: 15
  },
  {
    id: 7,
    title: 'WGP Mini UPS – (5V, 9V, 12V Output) -Capacity 10400mAh',
    price: '1,800৳',
    oldPrice: '2,200৳',
    features: ['5V, 9V, 12V Output', '10400mAh Capacity', 'Protects Wi-Fi router from power cuts', 'Stock: 30 pieces'],
    category: 'Office Equipment',
    status: 'In Stock',
    imgUrl: '/img/wgp_ups.png',
    rating: 4.5,
    reviewCount: 52
  },
  {
    id: 9,
    title: 'Apple MacBook Air 13.3-Inch Retina Display M1 chip',
    price: '95,000৳',
    oldPrice: '105,000৳',
    features: ['Apple M1 chip', '8GB Unified Memory', '256GB SSD', '13.3-inch Retina display'],
    category: 'Laptop',
    status: 'In Stock',
    imgIcon: 'fa-laptop',
    imgUrl: '/img/macbook_air.png',
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: 10,
    title: 'AMD Ryzen 5 5600G Processor with Radeon Graphics',
    price: '13,500৳',
    oldPrice: '',
    features: ['Cores 6 & Threads 12', 'Base Clock: 3.9GHz', 'Boost Clock: up to 4.4GHz', 'Radeon Graphics'],
    category: 'Desktop PC',
    status: 'In Stock',
    imgIcon: 'fa-microchip',
    imgUrl: null,
    rating: 5,
    reviewCount: 84
  }
];

export const MOCK_PC_COMPONENTS = {
    cpu: [
        { id: 'pc_cpu_1', title: 'Intel Core i5-12400F 12th Gen Processor', specs: 'Socket LGA1700 | 6 Cores / 12 Threads | 2.5GHz Base', price: 15500, socket: 'LGA1700', wattage: 65, imgIcon: 'fa-microchip', type: 'Processor (CPU)' },
        { id: 'pc_cpu_2', title: 'AMD Ryzen 5 5600G Processor with Radeon Graphics', specs: 'Socket AM4 | 6 Cores / 12 Threads | 3.9GHz Base', price: 13500, socket: 'AM4', wattage: 65, imgIcon: 'fa-microchip', type: 'Processor (CPU)' }
    ],
    motherboard: [
        { id: 'pc_mb_1', title: 'Gigabyte H610M H DDR4 12th Gen Micro ATX Motherboard', specs: 'Socket LGA1700 | DDR4 | PCIe 4.0 | Micro ATX', price: 9500, socket: 'LGA1700', wattage: 30, imgIcon: 'fa-server', type: 'Motherboard' },
        { id: 'pc_mb_2', title: 'MSI B550M PRO-VDH WIFI AM4 Micro-ATX Motherboard', specs: 'Socket AM4 | DDR4 | PCIe 4.0 | Wi-Fi | Micro ATX', price: 12500, socket: 'AM4', wattage: 30, imgIcon: 'fa-server', type: 'Motherboard' }
    ],
    gpu: [
        { id: 'pc_gpu_1', title: 'ZOTAC GAMING GeForce RTX 3060 Twin Edge 12GB GDDR6', specs: '12GB GDDR6 | PCIe 4.0 | DLSS 2.0 | Ray Tracing', price: 34500, wattage: 170, imgIcon: 'fa-tv', type: 'Graphics Card' },
        { id: 'pc_gpu_2', title: 'Gigabyte GeForce GTX 1650 D6 OC 4G Graphics Card', specs: '4GB GDDR6 | PCIe 3.0 | DirectX 12', price: 17500, wattage: 75, imgIcon: 'fa-tv', type: 'Graphics Card' }
    ],
    ram: [
        { id: 'pc_ram_1', title: 'Corsair Vengeance LPX 8GB 3200MHz DDR4 Desktop RAM', specs: '8GB | DDR4 | 3200MHz | CL16', price: 2500, wattage: 5, imgIcon: 'fa-memory', type: 'RAM' },
        { id: 'pc_ram_2', title: 'G.Skill Trident Z Neo 16GB (8GBx2) DDR4 3600MHz RGB RAM', specs: '16GB (2x8GB) | DDR4 | 3600MHz | RGB', price: 6500, wattage: 10, imgIcon: 'fa-memory', type: 'RAM' }
    ],
    storage: [
        { id: 'pc_st_1', title: 'Samsung 980 500GB PCIe 3.0 M.2 NVMe SSD', specs: '500GB | M.2 NVMe | PCIe 3.0 | Read: 3500MB/s', price: 5500, wattage: 5, imgIcon: 'fa-hdd', type: 'Storage' },
        { id: 'pc_st_2', title: 'Seagate Barracuda 1TB 7200RPM SATA Desktop HDD', specs: '1TB | SATA 6Gb/s | 7200RPM | 64MB Cache', price: 4200, wattage: 10, imgIcon: 'fa-hdd', type: 'Storage' }
    ],
    psu: [
        { id: 'pc_psu_1', title: 'Corsair CV550 550 Watt 80 Plus Bronze Power Supply', specs: '550W | 80 Plus Bronze | Non-Modular | ATX', price: 4500, wattage: 0, imgIcon: 'fa-plug', type: 'Power Supply' },
        { id: 'pc_psu_2', title: 'Antec Atom V550 550W Non-Modular Power Supply', specs: '550W | 80 Plus White | Non-Modular | ATX', price: 3200, wattage: 0, imgIcon: 'fa-plug', type: 'Power Supply' }
    ],
    cooler: [
        { id: 'pc_cl_1', title: 'Deepcool AK400 Performance CPU Cooler', specs: '120mm Fan | 4 Heat Pipes | AM4/LGA1700 Compatible', price: 2800, wattage: 5, imgIcon: 'fa-fan', type: 'CPU Cooler' },
        { id: 'pc_cl_2', title: 'Cooler Master Hyper 212 Spectrum V3 ARGB CPU Cooler', specs: '120mm ARGB Fan | 4 Heat Pipes | Universal Socket', price: 1800, wattage: 5, imgIcon: 'fa-fan', type: 'CPU Cooler' }
    ],
    casing: [
        { id: 'pc_cs_1', title: 'Gamdias ARGUS E4 Elite Mid Tower RGB Gaming Casing', specs: 'Mid Tower | ATX/Micro-ATX | 3x RGB Fans | Tempered Glass', price: 3500, wattage: 10, imgIcon: 'fa-desktop', type: 'Casing' },
        { id: 'pc_cs_2', title: 'Deepcool MATREXX 40 3FS Mid-Tower ATX Casing', specs: 'Mid Tower | ATX | 3x120mm Fans | Mesh Front Panel', price: 4500, wattage: 15, imgIcon: 'fa-desktop', type: 'Casing' }
    ],
    monitor: [
        { id: 'pc_mon_1', title: 'LG 22MP410-B 21.45" FHD FreeSync Monitor', specs: '21.45" | 1920x1080 | 75Hz | VA Panel | FreeSync', price: 10500, wattage: 20, imgIcon: 'fa-tv', type: 'Monitor' },
        { id: 'pc_mon_2', title: 'Samsung Odyssey G3 24" 165Hz Gaming Monitor', specs: '24" | 1920x1080 | 165Hz | VA Panel | FreeSync Premium', price: 21500, wattage: 35, imgIcon: 'fa-tv', type: 'Monitor' }
    ],
    keyboard: [
        { id: 'pc_kb_1', title: 'A4Tech KR-85 Wired Keyboard', specs: 'Wired USB | Membrane | Full Size', price: 450, wattage: 0, imgIcon: 'fa-keyboard', type: 'Keyboard' },
        { id: 'pc_kb_2', title: 'Logitech G213 Prodigy Gaming Keyboard', specs: 'Wired USB | Membrane | RGB | Anti-Ghosting', price: 4800, wattage: 0, imgIcon: 'fa-keyboard', type: 'Keyboard' }
    ],
    mouse: [
        { id: 'pc_ms_1', title: 'A4Tech OP-730D Optical Mouse', specs: 'Wired USB | 1000 DPI | Optical', price: 280, wattage: 0, imgIcon: 'fa-mouse', type: 'Mouse' },
        { id: 'pc_ms_2', title: 'Razer DeathAdder Essential Mouse', specs: 'Wired USB | 6400 DPI | Optical | 5 Buttons', price: 2200, wattage: 0, imgIcon: 'fa-mouse', type: 'Mouse' }
    ],
    headphone: [
        { id: 'pc_hp_1', title: 'Havit H2002d Gaming Headset', specs: 'Wired 3.5mm | Stereo | 50mm Drivers | With Mic', price: 1800, wattage: 0, imgIcon: 'fa-headphones', type: 'Headphone' },
        { id: 'pc_hp_2', title: 'Razer BlackShark V2 X Gaming Headset', specs: 'Wired 3.5mm | 7.1 Surround | 50mm Drivers | With Mic', price: 5500, wattage: 0, imgIcon: 'fa-headphones', type: 'Headphone' }
    ],
    speaker: [
        { id: 'pc_sp_1', title: 'Microlab M-108 2.1 Speaker', specs: '11W RMS | 2.1 Channel | Wired', price: 2800, wattage: 10, imgIcon: 'fa-volume-up', type: 'Speaker' },
        { id: 'pc_sp_2', title: 'Fantech GS202 Sakura Edition RGB Speaker', specs: 'RGB Lighting | 3.5mm Jack | USB Powered', price: 1200, wattage: 5, imgIcon: 'fa-volume-up', type: 'Speaker' }
    ],
    ups: [
        { id: 'pc_ups_1', title: 'MaxGreen 650VA Offline UPS', specs: '650VA | 230V | 15-20 Min Backup', price: 3500, wattage: 0, imgIcon: 'fa-battery-full', type: 'UPS' },
        { id: 'pc_ups_2', title: 'Apollo 1200VA Offline UPS', specs: '1200VA | 230V | 30-35 Min Backup', price: 8500, wattage: 0, imgIcon: 'fa-battery-full', type: 'UPS' }
    ],
    webcam: [
        { id: 'pc_wc_1', title: 'Logitech C270 HD Webcam', specs: '720p | 30fps | Built-in Mic', price: 2800, wattage: 2, imgIcon: 'fa-video', type: 'Webcam' },
        { id: 'pc_wc_2', title: 'Logitech C922 Pro Stream Webcam', specs: '1080p | 30fps | 720p | 60fps', price: 9500, wattage: 3, imgIcon: 'fa-video', type: 'Webcam' }
    ],
    microphone: [
        { id: 'pc_mic_1', title: 'Boyaby M1 Lavalier Microphone', specs: 'Omnidirectional | 3.5mm Jack | 6m Cable', price: 850, wattage: 0, imgIcon: 'fa-microphone', type: 'Microphone' },
        { id: 'pc_mic_2', title: 'Razer Seiren Mini USB Streaming Microphone', specs: 'Supercardioid | USB | Pro Grade', price: 4500, wattage: 0, imgIcon: 'fa-microphone', type: 'Microphone' }
    ],
    extStorage: [
        { id: 'pc_es_1', title: 'Transcend StoreJet 25M3 1TB External HDD', specs: '1TB | USB 3.1 | Military-Grade Resistance', price: 5800, wattage: 0, imgIcon: 'fa-hdd', type: 'External Storage' },
        { id: 'pc_es_2', title: 'Samsung T7 500GB Portable SSD', specs: '500GB | USB 3.2 Gen 2 | Up to 1050MB/s', price: 8500, wattage: 0, imgIcon: 'fa-hdd', type: 'External Storage' }
    ],
    usbHub: [
        { id: 'pc_uh_1', title: 'ORICO H4019-U3 4 Port USB 3.0 Hub', specs: '4x USB 3.0 Ports | 5Gbps Speed', price: 950, wattage: 0, imgIcon: 'fa-hub', type: 'USB Hub' },
        { id: 'pc_uh_2', title: 'TP-Link UH700 7-Port USB 3.0 Hub', specs: '7x USB 3.0 Ports | Dedicated Charging', price: 3200, wattage: 0, imgIcon: 'fa-hub', type: 'USB Hub' }
    ],
    mousepad: [
        { id: 'pc_mp_1', title: 'Fantech MP35 Gaming Mousepad', specs: 'Speed Surface | Rubber Base | 350x250mm', price: 350, wattage: 0, imgIcon: 'fa-square', type: 'Mousepad' },
        { id: 'pc_mp_2', title: 'Razer Goliathus Extended Chroma RGB Mousepad', specs: 'RGB Lighting | Cloth Surface | Large Size', price: 5500, wattage: 5, imgIcon: 'fa-square', type: 'Mousepad' }
    ],
    gamingChair: [
        { id: 'pc_gc_1', title: 'Fantech GC-181 Alpha Gaming Chair', specs: 'PU Leather | Class 4 Gas Lift | 180 Degree Recline', price: 18500, wattage: 0, imgIcon: 'fa-chair', type: 'Gaming Chair' },
        { id: 'pc_gc_2', title: 'Cougar Armor One Gaming Chair', specs: 'Breathable PVC Leather | High Density Foam', price: 24500, wattage: 0, imgIcon: 'fa-chair', type: 'Gaming Chair' }
    ],
    networkCard: [
        { id: 'pc_nc_1', title: 'TP-Link TL-WN881ND 300Mbps Wireless N PCI Express Adapter', specs: '300Mbps | 2.4GHz | PCIe', price: 1550, wattage: 2, imgIcon: 'fa-wifi', type: 'Network Card' },
        { id: 'pc_nc_2', title: 'TP-Link Archer TX3000E AX3000 Wi-Fi 6 Bluetooth 5.0 PCIe Adapter', specs: 'AX3000 | Wi-Fi 6 | Bluetooth 5.0', price: 4800, wattage: 3, imgIcon: 'fa-wifi', type: 'Network Card' }
    ],
    soundCard: [
        { id: 'pc_sc_1', title: 'Creative Sound Blaster Audigy Fx 5.1 PCIe Sound Card', specs: '5.1 Channel | 24-bit/192kHz | PCIe', price: 4500, wattage: 5, imgIcon: 'fa-music', type: 'Sound Card' },
        { id: 'pc_sc_2', title: 'ASUS Essence STX II Hi-Fi Sound Card', specs: '7.1 Channel | 124dB SNR | Audiophile Grade', price: 22500, wattage: 10, imgIcon: 'fa-music', type: 'Sound Card' }
    ],
    thermalPaste: [
        { id: 'pc_tp_1', title: 'Arctic MX-4 4g Thermal Compound', specs: 'Carbon-based | 8.5 W/mK | Non-Conductive', price: 650, wattage: 0, imgIcon: 'fa-tint', type: 'Thermal Paste' },
        { id: 'pc_tp_2', title: 'Thermal Grizzly Kryonaut 1g', specs: 'Extreme Performance | 12.5 W/mK', price: 1200, wattage: 0, imgIcon: 'fa-tint', type: 'Thermal Paste' }
    ],
    cableMgmt: [
        { id: 'pc_cm_1', title: 'Orico Cable Organizer Silicone 5 Clips', specs: 'Silicone | 5 Clips | Adhesive Base', price: 350, wattage: 0, imgIcon: 'fa-stream', type: 'Cable Management' },
        { id: 'pc_cm_2', title: 'Ugreen Reusable Cable Ties 10pcs', specs: 'Velcro | 150mm | Black', price: 250, wattage: 0, imgIcon: 'fa-stream', type: 'Cable Management' }
    ],
    ledStrip: [
        { id: 'pc_led_1', title: 'Phanteks Digital-RGB LED Strip Combo Kit', specs: '2x 400mm Strips | ARGB | Magnet/Adhesive', price: 1800, wattage: 5, imgIcon: 'fa-lightbulb', type: 'LED Strip' },
        { id: 'pc_led_2', title: 'Deepcool RGB 200 PRO Addressable RGB LED Strip', specs: 'Addressable RGB | ASUS Aura Sync Compatible', price: 1200, wattage: 3, imgIcon: 'fa-lightbulb', type: 'LED Strip' }
    ]
};

export const MOCK_CCTV_COMPONENTS = {
    cameraType: [
        { id: 'cctv_cam_1', title: 'Dahua HAC-B1A21P 2MP Bullet Camera',          specs: '2MP | HDCVI | IR 20m | IP67 | Bullet Type',           price: 1800,  imgIcon: 'fa-video' },
        { id: 'cctv_cam_2', title: 'Hikvision DS-2CE56D0T-IRPF 2MP Dome Camera',  specs: '2MP | HDTVI | IR 20m | IP66 | Dome Type',             price: 1600,  imgIcon: 'fa-video' },
        { id: 'cctv_cam_3', title: 'Dahua SD22204UE-GN 2MP PTZ Camera',           specs: '2MP | IP | 4x Optical Zoom | Pan/Tilt/Zoom',          price: 15500, imgIcon: 'fa-video' }
    ],
    recorder: [
        { id: 'cctv_rec_1', title: 'Dahua XVR1B04-I 4 Channel Penta-brid DVR',   specs: '4 Channel | 5-in-1 | H.265+ | 1x SATA | 1080P',      price: 3500,  imgIcon: 'fa-server' },
        { id: 'cctv_rec_2', title: 'Hikvision DS-7108HGHI-F1 8 Channel DVR',     specs: '8 Channel | Turbo HD | H.265 | 1x SATA | 1080P',     price: 5500,  imgIcon: 'fa-server' },
        { id: 'cctv_rec_3', title: 'Dahua NVR4116HS-4KS2 16 Channel NVR',        specs: '16 Channel | H.265+ | 4K | 2x SATA | PoE-capable', price: 12500, imgIcon: 'fa-server' }
    ],
    storage: [
        { id: 'cctv_st_1', title: 'Western Digital Purple 1TB Surveillance HDD', specs: '1TB | SATA 6Gb/s | 5400RPM | 64MB Cache | 24/7',    price: 5500,  imgIcon: 'fa-hdd' },
        { id: 'cctv_st_2', title: 'Seagate SkyHawk 2TB Surveillance Hard Drive', specs: '2TB | SATA 6Gb/s | 5900RPM | 256MB Cache | 24/7',   price: 7500,  imgIcon: 'fa-hdd' },
        { id: 'cctv_st_3', title: 'Western Digital Purple 4TB Surveillance HDD', specs: '4TB | SATA 6Gb/s | 5400RPM | 256MB Cache | 24/7',   price: 12000, imgIcon: 'fa-hdd' }
    ],
    powerSupply: [
        { id: 'cctv_ps_1', title: '12V 5A CCTV Power Supply Adapter',            specs: '12V DC | 5A | 60W | Single Output',                  price: 450,   imgIcon: 'fa-plug' },
        { id: 'cctv_ps_2', title: '12V 10A 9 Channel Central Power Supply Box',  specs: '12V DC | 10A | 9 Channel | Metal Housing',           price: 1500,  imgIcon: 'fa-plug' }
    ],
    monitor: [
        { id: 'cctv_mon_1', title: 'Samsung 22" Full HD CCTV Monitor',           specs: '22" | 1920x1080 | HDMI | VGA | VESA Mount',          price: 9500,  imgIcon: 'fa-tv' },
        { id: 'cctv_mon_2', title: 'LG 24" Full HD Security Monitor',            specs: '24" | 1920x1080 | HDMI | DisplayPort | VESA',        price: 14000, imgIcon: 'fa-tv' },
        { id: 'cctv_mon_3', title: 'Dahua LM19-L200 19" CCTV Monitor',          specs: '19" | 1366x768 | HDMI | VGA | BNC Input',            price: 7500,  imgIcon: 'fa-tv' }
    ],
    installKit: [
        { id: 'cctv_kit_1', title: 'Basic CCTV Installation Kit',                specs: 'Wall Mounts, Screws, Cable Clips, Junction Box',      price: 800,   imgIcon: 'fa-toolbox' },
        { id: 'cctv_kit_2', title: 'Professional CCTV Installation Kit',         specs: 'Heavy Duty Mounts, Conduit, Connectors, Full Tools',  price: 2000,  imgIcon: 'fa-toolbox' }
    ],
    cable: [
        { id: 'cctv_cb_1', title: 'Cat6 Full Copper Network Cable (305m)',       specs: '305m Roll | Full Copper | High Speed',               price: 8500,  imgIcon: 'fa-network-wired' },
        { id: 'cctv_cb_2', title: 'Cat6 High Quality Network Cable (per meter)', specs: 'Price per Meter | White | High Bandwidth',           price: 35,    imgIcon: 'fa-network-wired' }
    ]
};
