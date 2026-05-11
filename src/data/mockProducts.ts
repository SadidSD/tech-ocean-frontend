
export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    title: 'ASUS ROG Strix G15 Gaming Laptop',
    price: 125000,
    oldPrice: 135000,
    salePrice: 125000,
    rating: 4.8,
    reviewCount: 42,
    images: ['https://dlcdnwebmenu.asus.com/dms/download/EB9F4F6D-9E6A-4A0E-9C8D-9E6A4A0E9C8D'],
    imgUrl: 'https://dlcdnwebmenu.asus.com/dms/download/EB9F4F6D-9E6A-4A0E-9C8D-9E6A4A0E9C8D',
    status: 'In Stock',
    stock: 15,
    brand: 'ASUS',
    category: { id: 1, name: 'Laptop' },
    features: [
      'Intel Core i7-12700H 12th Gen',
      '16GB DDR5 RAM, 512GB NVMe SSD',
      'NVIDIA GeForce RTX 3060 6GB',
      '15.6" WQHD 165Hz Display',
      'RGB Backlit Keyboard'
    ],
    specs: {
      processor: 'Intel Core i7-12700H',
      ram: '16GB DDR5 4800MHz',
      storage: '512GB M.2 NVMe SSD',
      graphics: 'RTX 3060 6GB GDDR6',
      display: '15.6-inch WQHD (2560 x 1440) 165Hz'
    }
  },
  {
    id: 'p2',
    title: 'Samsung 27" Odyssey G5 Gaming Monitor',
    price: 35000,
    oldPrice: 38000,
    salePrice: 35000,
    rating: 4.6,
    reviewCount: 28,
    images: ['https://images.samsung.com/is/image/samsung/p6pim/bd/lc27g55tqwwxxl/gallery/bd-odyssey-g5-27-inch-lc27g55tqwwxxl-530491036?$650_519_PNG$'],
    imgUrl: 'https://images.samsung.com/is/image/samsung/p6pim/bd/lc27g55tqwwxxl/gallery/bd-odyssey-g5-27-inch-lc27g55tqwwxxl-530491036?$650_519_PNG$',
    status: 'In Stock',
    stock: 8,
    brand: 'Samsung',
    category: { id: 2, name: 'Monitor' },
    features: [
      '2560 x 1440 WQHD Resolution',
      '144Hz Refresh Rate, 1ms MPRT',
      '1000R Curved Screen',
      'AMD FreeSync Premium',
      'HDR10 Support'
    ],
    specs: {
      resolution: '2560 x 1440 (WQHD)',
      refreshRate: '144Hz',
      responseTime: '1ms (MPRT)',
      panelType: 'VA Curved',
      brightness: '250 cd/㎡'
    }
  },
  {
    id: 'p3',
    title: 'Logitech G502 HERO High Performance Gaming Mouse',
    price: 4500,
    oldPrice: 5500,
    salePrice: 4500,
    rating: 4.9,
    reviewCount: 156,
    images: ['https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png'],
    imgUrl: 'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png',
    status: 'In Stock',
    stock: 50,
    brand: 'Logitech',
    category: { id: 12, name: 'Accessories' },
    features: [
      'HERO 25K Sensor',
      '11 Programmable Buttons',
      'Adjustable Weights',
      'LIGHTSYNC RGB Lighting',
      'Onboard Memory'
    ],
    specs: {
      sensor: 'HERO 25K',
      dpi: '100 - 25,600 DPI',
      buttons: '11 Programmable',
      weight: '121g (Mouse only)',
      cableLength: '2.1m'
    }
  },
  {
    id: 'p4',
    title: 'Sony PlayStation 5 Console (Disc Edition)',
    price: 65000,
    oldPrice: 72000,
    salePrice: 65000,
    rating: 5.0,
    reviewCount: 89,
    images: ['https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$'],
    imgUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
    status: 'In Stock',
    stock: 3,
    brand: 'Sony',
    category: { id: 14, name: 'Gadget' },
    features: [
      'Ultra-High Speed SSD',
      'Integrated I/O',
      'Ray Tracing Support',
      '4K-TV Gaming',
      'Up to 120fps with 120Hz Output'
    ],
    specs: {
      cpu: 'x86-64-AMD Ryzen Zen 2',
      gpu: 'AMD Radeon RDNA 2-based engine',
      memory: 'GDDR6 16GB',
      ssd: '825GB Custom SSD',
      videoOut: '4K 120Hz TVs, 8K TVs'
    }
  },
  {
    id: 'p5',
    title: 'Canon EOS R6 Mirrorless Camera Body',
    price: 245000,
    oldPrice: 260000,
    salePrice: 245000,
    rating: 4.7,
    reviewCount: 15,
    images: ['https://bh.canon.com.bd/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/o/eos_r6_body_front.jpg'],
    imgUrl: 'https://bh.canon.com.bd/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/e/o/eos_r6_body_front.jpg',
    status: 'In Stock',
    stock: 5,
    brand: 'Canon',
    category: { id: 7, name: 'Camera' },
    features: [
      '20.1MP Full-Frame CMOS Sensor',
      'DIGIC X Image Processor',
      '4K60p and FHD 120p 10-Bit Video',
      'Sensor-Shift 5-Axis Image Stabilization',
      'Dual Pixel CMOS AF II'
    ],
    specs: {
      sensorSize: 'Full Frame',
      pixels: '20.1 Megapixels',
      iso: '100 - 102,400',
      video: '4K up to 60fps',
      afPoints: '1053 Areas'
    }
  },
  {
    id: 'p6',
    title: 'TP-Link Archer AX73 AX5400 Router',
    price: 12500,
    oldPrice: 14500,
    salePrice: 12500,
    rating: 4.5,
    reviewCount: 34,
    images: ['https://static.tp-link.com/Archer%20AX73(US)1.0_01_1603953587023q.jpg'],
    imgUrl: 'https://static.tp-link.com/Archer%20AX73(US)1.0_01_1603953587023q.jpg',
    status: 'In Stock',
    stock: 20,
    brand: 'TP-Link',
    category: { id: 9, name: 'Network' },
    features: [
      'Gigabit WiFi for 8K Streaming',
      'Fully Featured Wi-Fi 6',
      'Connect 200+ Devices',
      'Extensive Coverage with 6 Antennas',
      'HomeShield Security'
    ],
    specs: {
      wifiSpeed: '5400 Mbps (5 GHz + 2.4 GHz)',
      wifiRange: '3 Bedroom Houses',
      processor: '1.5 GHz Triple-Core CPU',
      usbSupport: '1× USB 3.0 Port',
      ethernetPorts: '1× Gigabit WAN, 4× Gigabit LAN'
    }
  },
  {
    id: 'p7',
    title: 'Apple iPhone 15 Pro Max 256GB',
    price: 165000,
    oldPrice: 175000,
    salePrice: 165000,
    rating: 4.9,
    reviewCount: 67,
    images: ['https://www.apple.com/v/iphone-15-pro/c/images/overview/welcome/hero_endframe__ov6ewwmbhi6e_large.jpg'],
    imgUrl: 'https://www.apple.com/v/iphone-15-pro/c/images/overview/welcome/hero_endframe__ov6ewwmbhi6e_large.jpg',
    status: 'In Stock',
    stock: 12,
    brand: 'Apple',
    category: { id: 15, name: 'Mobile Phone' },
    features: [
      'A17 Pro chip with 6-core GPU',
      'Titanium design',
      '6.7-inch Super Retina XDR display',
      'Pro camera system',
      'USB-C supports USB 3'
    ],
    specs: {
      display: '6.7-inch OLED',
      chip: 'A17 Pro',
      camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      battery: 'Up to 29 hours video playback',
      weight: '221 grams'
    }
  },
  {
    id: 'p8',
    title: 'Dahua 4 Camera 2MP CCTV Package',
    price: 15500,
    oldPrice: 18000,
    salePrice: 15500,
    rating: 4.4,
    reviewCount: 22,
    images: ['https://www.startech.com.bd/image/cache/catalog/cctv-package/dahua/dahua-4-camera-cctv-package-01-500x500.jpg'],
    imgUrl: 'https://www.startech.com.bd/image/cache/catalog/cctv-package/dahua/dahua-4-camera-cctv-package-01-500x500.jpg',
    status: 'In Stock',
    stock: 10,
    brand: 'Dahua',
    category: { id: 8, name: 'Security' },
    features: [
      '4x 2MP Night Vision Cameras',
      '1x 4-Channel DVR',
      '1x 500GB Hard Drive',
      'All Cables & Connectors included',
      'Remote Mobile Viewing'
    ],
    specs: {
      resolution: '2MP (1080p)',
      dvr: '4 Channel 1080N',
      hdd: '500GB SATA',
      cables: '4x 15m Premade BNC',
      power: 'Centralized Power Supply'
    }
  }
];
