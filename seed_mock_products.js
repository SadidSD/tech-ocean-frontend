const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const mockProducts = [
    {
        title: "Apple MacBook Pro 16-inch M3 Max (2024)",
        category: "Laptop",
        subcategory: "Apple MacBook",
        price: 450000,
        salePrice: 420000,
        stock: 5,
        brand: "Apple",
        sku: "MAC-M3-MAX-16",
        images: ["https://techstartups.com/wp-content/uploads/2021/10/Apple-MacBook-Pro.jpg"],
        description: "The ultimate pro laptop with the M3 Max chip.",
        specs: { Processor: "M3 Max", RAM: "36GB", Storage: "1TB SSD", Display: "16-inch Liquid Retina XDR" }
    },
    {
        title: "Asus ROG Strix G16 Gaming Laptop",
        category: "Laptop",
        subcategory: "Gaming Laptop",
        price: 185000,
        salePrice: 175000,
        stock: 12,
        brand: "Asus",
        sku: "ROG-G16-4070",
        images: ["https://dlcdnwebimgs.asus.com/gain/4AEEDD34-03A8-4EF5-82A9-B5FD9B8BD213/w1000/h732"],
        description: "Play latest games smoothly with RTX 4070.",
        specs: { Processor: "Intel Core i7-13650HX", GPU: "RTX 4070 8GB", RAM: "16GB DDR5", Display: "165Hz FHD+" }
    },
    {
        title: "Dahua 2MP Full Color Bullet Camera",
        category: "CCTV & IP Camera",
        subcategory: "Analog Camera",
        price: 2500,
        stock: 45,
        brand: "Dahua",
        sku: "DH-HAC-HFW1239TLM-A-LED",
        images: ["https://www.startech.com.bd/image/cache/catalog/camera/dahua/dh-hac-hfw1239tlm-a-led/dh-hac-hfw1239tlm-a-led-01-500x500.jpg"],
        description: "Experience 24/7 full-color surveillance.",
        specs: { Resolution: "2 Megapixel", Lens: "3.6mm", Feature: "Built-in Mic", Distance: "40m Illumination" }
    },
    {
        title: "Samsung Front Load Washing Machine 8kg",
        category: "Home Appliance",
        subcategory: "Washing Machine",
        price: 52000,
        salePrice: 48500,
        stock: 8,
        brand: "Samsung",
        sku: "SAM-WM-8KG-FL",
        images: ["https://images.samsung.com/is/image/samsung/p6pim/bd/ww80ta046ax-d3/gallery/bd-front-loading-washer-ww80ta046ax-d3-ww80ta046ax-d3-532658864?$650_519_PNG$"],
        description: "Eco Bubble technology delivers a powerful clean even at low temperatures.",
        specs: { Capacity: "8kg", Type: "Front Load", Motor: "Digital Inverter", Warranty: "10 Years Motor" }
    },
    {
        title: "Custom High-End Intel 14th Gen Gaming PC Build",
        category: "Gaming PC",
        subcategory: "Pre-built Gaming PC",
        price: 220000,
        stock: 3,
        brand: "Custom",
        sku: "PC-INTEL-14-4080",
        images: ["https://www.startech.com.bd/image/cache/catalog/desktop-pc/star-pc/gaming/ryzen-gaming-pc-10-500x500.webp"],
        description: "Pre-built custom PC for 4K gaming and heavy streaming.",
        specs: { Processor: "Core i7-14700K", GPU: "RTX 4080 Super", RAM: "32GB 6000MHz", Storage: "2TB Gen4 NVMe" }
    },
    {
        title: "Apple iPhone 15 Pro Max 256GB Black Titanium",
        category: "Mobile",
        subcategory: "Smartphone",
        price: 155000,
        stock: 20,
        brand: "Apple",
        sku: "IP15-PM-256-BLK",
        images: ["https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-15-Pro-Max-Black-Titanium-2804.jpg"],
        description: "The top tier iPhone featuring titanium design and Action button.",
        specs: { Storage: "256GB", Display: "120Hz ProMotion XDR", Chip: "A17 Pro", Camera: "48MP Main" }
    },
    {
        title: "Huawei Watch GT 4 46mm Smart Watch",
        category: "Gadget",
        subcategory: "Smart Watch",
        price: 26000,
        salePrice: 24500,
        stock: 15,
        brand: "Huawei",
        sku: "HW-GT4-46",
        images: ["https://www.startech.com.bd/image/cache/catalog/smart-watch/huawei/watch-gt-4-46mm/watch-gt-4-46mm-black-01-500x500.webp"],
        description: "Stay connected and track your fitness with elegance.",
        specs: { Battery: "Up to 14 days", Display: "1.43 AMOLED", OS: "HarmonyOS", WaterResistance: "5 ATM" }
    }
];

const insertProducts = () => {
    db.serialize(() => {
        // Prepare statement (matching the one in server.js)
        const stmt = db.prepare(`
            INSERT INTO products 
            (title, category, subcategory, price, salePrice, stock, images, description, specs, brand, sku, weight, dimensions, rating, reviewCount, featured, createdDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        let completed = 0;
        
        mockProducts.forEach(prod => {
            stmt.run(
                prod.title,
                prod.category,
                prod.subcategory,
                prod.price,
                prod.salePrice || null,
                prod.stock,
                JSON.stringify(prod.images),
                prod.description,
                JSON.stringify(prod.specs),
                prod.brand,
                prod.sku,
                0, // weight
                "", // dimensions
                5, // rating
                Math.floor(Math.random() * 50), // random review count
                Math.random() > 0.5 ? 1 : 0, // random featured
                new Date().toISOString(),
                function (err) {
                    if (err) console.error("Error inserting", prod.title, err);
                    else console.log("Inserted mock product:", prod.title);
                    
                    completed++;
                    if(completed === mockProducts.length) {
                        stmt.finalize();
                        console.log("\nSuccessfully populated mock products mapped to StarTech categories!");
                    }
                }
            );
        });
    });
};

insertProducts();
