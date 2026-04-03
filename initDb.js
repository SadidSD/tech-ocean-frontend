const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './database.sqlite';

// Simple script to initialize the database
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    // Drop existing for clean rebuild
    db.run(`DROP TABLE IF EXISTS products`);
    db.run(`DROP TABLE IF EXISTS users`);
    db.run(`DROP TABLE IF EXISTS orders`);

    // Create Tables
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        price TEXT,
        oldPrice TEXT,
        features TEXT,
        status TEXT,
        imgIcon TEXT,
        imgUrl TEXT,
        rating REAL,
        reviewCount INTEGER
    )`);

    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'customer'
    )`);

    db.run(`CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerName TEXT,
        cartItems TEXT,
        total TEXT,
        status TEXT DEFAULT 'Pending'
    )`);

    // Insert Admin User
    db.run(`INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin')`);

    // Insert Seed Products
    const seedData = [
        {
            title: 'Sony PlayStation 5 Console (Disc Edition)',
            price: '58,000৳',
            oldPrice: '',
            features: JSON.stringify(['Custom AMD RDNA 2 GPU', '825GB PCIe Gen 4 NVMe SSD', 'Tempest 3D AudioTech', 'DualSense wireless controller']),
            status: 'In Stock',
            imgIcon: 'fa-gamepad',
            imgUrl: null,
            rating: 4.5,
            reviewCount: 205
        },
        {
            title: 'Dahua HAC-B1A21P-U-IL 2MP Smart Dual Light HDCVI Bullet CC Camera',
            price: '2,500৳',
            oldPrice: '3,000৳',
            features: JSON.stringify(['2 Megapixel resolution', 'Smart Dual Light', 'HDCVI Bullet design', 'Stock: 30 pieces']),
            status: 'In Stock',
            imgIcon: null,
            imgUrl: 'img/dahua_camera.png',
            rating: 5,
            reviewCount: 15
        },
        {
            title: 'WGP Mini UPS – (5V, 9V, 12V Output) -Capacity 10400mAh',
            price: '1,800৳',
            oldPrice: '2,200৳',
            features: JSON.stringify(['5V, 9V, 12V Output', '10400mAh Capacity', 'Protects Wi-Fi router from power cuts', 'Stock: 30 pieces']),
            status: 'In Stock',
            imgIcon: null,
            imgUrl: 'img/wgp_ups.png',
            rating: 4.5,
            reviewCount: 52
        },
        {
            title: 'Apple MacBook Air 13.3-Inch Retina Display 8-core Apple M1 chip with 8GB RAM, 256GB SSD (MGN63) Space Gray',
            price: '95,000৳',
            oldPrice: '105,000৳',
            features: JSON.stringify(['Apple M1 chip', '8GB Unified Memory', '256GB SSD', '13.3-inch Retina display']),
            status: 'In Stock',
            imgIcon: 'fa-laptop',
            imgUrl: null,
            rating: 4.5,
            reviewCount: 128
        },
        {
            title: 'AMD Ryzen 5 5600G Processor with Radeon Graphics',
            price: '13,500৳',
            oldPrice: '',
            features: JSON.stringify(['Cores 6 & Threads 12', 'Base Clock: 3.9GHz', 'Boost Clock: up to 4.4GHz', 'Radeon Graphics']),
            status: 'In Stock',
            imgIcon: 'fa-microchip',
            imgUrl: null,
            rating: 5,
            reviewCount: 84
        }
    ];

    const stmt = db.prepare(`INSERT INTO products (title, price, oldPrice, features, status, imgIcon, imgUrl, rating, reviewCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    seedData.forEach(p => {
        stmt.run(p.title, p.price, p.oldPrice, p.features, p.status, p.imgIcon, p.imgUrl, p.rating, p.reviewCount);
    });
    stmt.finalize();

    console.log('Database initialized successfully with seed data.');
});

db.close();
