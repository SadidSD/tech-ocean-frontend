const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

const categoriesData = [
    {
        name: "Laptop", icon: "fas fa-laptop", subcategories: [
            "Gaming Laptop", "Business Laptop", "Student Laptop", "Apple MacBook", 
            "Premium Ultrabook", "2-in-1 Laptop", "Chromebook", "Laptop Accessories"
        ]
    },
    {
        name: "Desktop PC", icon: "fas fa-desktop", subcategories: [
            "Custom PC", "Brand PC", "All-in-One PC", "Mini PC / NUC", "Workstation", "Desktop PC Accessories"
        ]
    },
    {
        name: "Gaming PC", icon: "fas fa-gamepad", subcategories: [
            "Pre-built Gaming PC", "Gaming PC Component", "Gaming Casing", "Liquid / AIO Cooler", 
            "Custom Water Cooling", "Gaming Console", "Gaming Chair & Sofa", "Gaming Accessories"
        ]
    },
    {
        name: "CCTV & IP Camera", icon: "fas fa-video", subcategories: [
            "IP Camera", "Analog Camera", "NVR", "DVR", "CCTV Cable & Connector", 
            "Surveillance Hard Drive", "CCTV Power Supply & Adapter", "CCTV Installation Kit", "Video Door Phone", "Security Alarm System"
        ]
    },
    {
        name: "Office Equipment", icon: "fas fa-print", subcategories: [
            "Printer", "Photocopier Machine", "Router & Switch", "Server & Network Equipment", "Attendance Machine", 
            "Scanner", "Conference System", "Projector & Screen", "Whiteboard & Notice Board"
        ]
    },
    {
        name: "Gadget", icon: "fas fa-headphones", subcategories: [
            "Smart Watch", "Earbuds / Headphone", "Drone", "DSLR & Mirrorless Camera", "Gimbal & Stabilizer", 
            "Streaming Equipment", "Power Bank", "USB Hub & Adapter", "Smart Speaker", "VR Headset"
        ]
    },
    {
        name: "Mobile", icon: "fas fa-mobile-alt", subcategories: [
            "Smartphone", "Feature Phone", "Tablet", "Mobile Accessories"
        ]
    },
    {
        name: "Home Appliance", icon: "fas fa-home", subcategories: [
            "Air Conditioner", "Refrigerator", "Washing Machine", "Microwave Oven", "Air Purifier", 
            "Vacuum Cleaner", "Electric Kettle", "Induction Cooktop", "Rice Cooker", "Geyser / Water Heater"
        ]
    },
    {
        name: "Brand", icon: "fas fa-tags", subcategories: [
            "Apple", "Samsung", "HP", "Dell", "Lenovo", "Asus", "MSI", "Gigabyte", 
            "Razer", "Logitech", "Corsair", "Cooler Master", "DeepCool", "Antec", "Xiaomi", "OnePlus", "Realme", "Sony", "LG", "Walton"
        ]
    }
];

function slugify(text) {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

db.serialize(() => {    
    // Create table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        slug TEXT,
        icon TEXT,
        parent_id INTEGER,
        order_index INTEGER,
        featured BOOLEAN DEFAULT 0,
        image TEXT,
        description TEXT,
        meta_title TEXT,
        meta_description TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // We only clear categories, not products/users/orders
    db.run("DELETE FROM categories");
    // SQLite resets autoincrement like this:
    db.run("DELETE FROM sqlite_sequence WHERE name='categories'", (err) => {
        if(err) console.log(err.message); // Not an error if the sequence doesn't exist yet
    });

    const stmt = db.prepare(`
        INSERT INTO categories (name, slug, icon, parent_id, order_index, featured) 
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    let completedMainCats = 0;

    categoriesData.forEach((mainCat, index) => {
        const mainOrder = index + 1;
        db.run(`INSERT INTO categories (name, slug, icon, parent_id, order_index, featured) VALUES (?, ?, ?, ?, ?, ?)`, 
            [mainCat.name, slugify(mainCat.name), mainCat.icon, null, mainOrder, 1], 
            function(err) {
                if (err) return console.error(err);
                
                const parentId = this.lastID;
                if(mainCat.subcategories && mainCat.subcategories.length > 0) {
                    mainCat.subcategories.forEach((subCat, subIndex) => {
                        stmt.run([subCat, slugify(subCat), "", parentId, subIndex + 1, 0]);
                    });
                }
                
                completedMainCats++;
                if (completedMainCats === categoriesData.length) {
                    stmt.finalize();
                    db.close((err) => {
                        if(err) console.error(err);
                        else console.log('Successfully seeded categories!');
                    });
                }
            }
        );
    });
});
