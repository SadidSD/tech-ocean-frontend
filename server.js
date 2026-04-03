const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const SSLCommerzPayment = require('sslcommerz-lts');
const shippingService = require('./shipping');
const emailService = require('./emails');

// SSLCommerz config
const store_id = process.env.STORE_ID || 'testbox';
const store_passwd = process.env.STORE_PASSWORD || 'qwerty';
const is_live = false;

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve frontend static files

// DB Setup
const db = new sqlite3.Database('./database.sqlite');

// Extend Orders Table
db.serialize(() => {
    db.run("ALTER TABLE orders ADD COLUMN email TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN phone TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN address TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN district TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN paymentMethod TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN paymentStatus TEXT DEFAULT 'Pending'", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN shippingCost REAL DEFAULT 0", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN tax REAL DEFAULT 0", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN trackingNumber TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN transactionId TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN createdAt TEXT", (err) => {});
    db.run("ALTER TABLE orders ADD COLUMN delivery_instructions TEXT", (err) => {});

    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        user_id INTEGER,
        guest_name TEXT,
        rating INTEGER,
        title TEXT,
        content TEXT,
        images TEXT,
        verified_purchase BOOLEAN DEFAULT 0,
        helpful_count INTEGER DEFAULT 0,
        status TEXT DEFAULT 'pending',
        admin_reply TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

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
});

// Routes
// 0. Get all categories
app.get('/api/categories', (req, res) => {
    db.all('SELECT * FROM categories ORDER BY parent_id, order_index ASC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 1. Get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const formattedRows = rows.map(r => {
            let specObj = {}, imgArr = [];
            try { specObj = JSON.parse(r.specs || '{}'); } catch(e){}
            try { imgArr = JSON.parse(r.images || '[]'); } catch(e){}
            
            return {
                ...r,
                specs: specObj,
                images: imgArr,
                // Legacy compatibility for index.html:
                imgUrl: imgArr[0] || '',
                features: [r.description, ...Object.entries(specObj).map(([k,v]) => `${k}: ${v}`)],
                price: r.salePrice ? `${r.salePrice.toLocaleString()}৳` : `${(r.price||0).toLocaleString()}৳`,
                oldPrice: r.salePrice ? `${(r.price||0).toLocaleString()}৳` : '',
                status: r.stock > 0 ? 'In Stock' : 'Out of Stock'
            };
        });
        res.json(formattedRows);
    });
});

// 2. Add product
app.post('/api/products', (req, res) => {
    const { title, category, subcategory, price, salePrice, stock, images, description, specs, brand, sku, weight, dimensions, featured } = req.body;
    const stmt = db.prepare('INSERT INTO products (title, category, subcategory, price, salePrice, stock, images, description, specs, brand, sku, weight, dimensions, rating, reviewCount, featured, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(title, category, subcategory, price, salePrice, stock, JSON.stringify(images||[]), description, JSON.stringify(specs||{}), brand, sku, weight, dimensions, 5, 0, featured?1:0, new Date().toISOString(), function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
    stmt.finalize();
});

// 3. Edit product
app.put('/api/products/:id', (req, res) => {
    const { title, category, subcategory, price, salePrice, stock, images, description, specs, brand, sku, weight, dimensions, featured } = req.body;
    const stmt = db.prepare('UPDATE products SET title=?, category=?, subcategory=?, price=?, salePrice=?, stock=?, images=?, description=?, specs=?, brand=?, sku=?, weight=?, dimensions=?, featured=? WHERE id=?');
    stmt.run(title, category, subcategory, price, salePrice, stock, JSON.stringify(images||[]), description, JSON.stringify(specs||{}), brand, sku, weight, dimensions, featured?1:0, req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
    stmt.finalize();
});

// 4. Delete product
app.delete('/api/products/:id', (req, res) => {
    db.run('DELETE FROM products WHERE id=?', req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

// 5. Checkout (Shipping Calc & Payment Init)
app.post('/api/orders/checkout', async (req, res) => {
    const { customerName, email, phone, district, city, address, delivery_instructions, cartItems, subtotal, paymentMethod } = req.body;
    
    // Calculate Shipping & Tax
    const totalWeight = 1.5; // Mock calculation
    const shipping = await shippingService.calculateShipping(district, city, totalWeight);
    const tax = subtotal * 0.05; // 5% mock tax
    const finalTotal = subtotal + shipping.cost + tax;
    
    const tran_id = 'TXN_' + new Date().getTime();
    const createdDate = new Date().toISOString();

    const stmt = db.prepare('INSERT INTO orders (customerName, email, phone, address, district, cartItems, total, status, paymentMethod, paymentStatus, shippingCost, tax, transactionId, createdAt, delivery_instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    
    stmt.run(customerName, email, phone, address, district, JSON.stringify(cartItems), finalTotal, 'Pending', paymentMethod, 'Pending', shipping.cost, tax, tran_id, createdDate, delivery_instructions, async function(err) {
        if (err) return res.status(500).json({ error: err.message });
        const orderId = this.lastID;
        
        if (paymentMethod === 'SSLCommerz') {
            const data = {
                total_amount: finalTotal,
                currency: 'BDT',
                tran_id: tran_id,
                success_url: `http://localhost:3000/api/payment/success/${tran_id}`,
                fail_url: `http://localhost:3000/api/payment/fail/${tran_id}`,
                cancel_url: `http://localhost:3000/api/payment/cancel/${tran_id}`,
                ipn_url: `http://localhost:3000/api/payment/ipn`,
                shipping_method: 'Courier',
                product_name: 'TechXOcean Products',
                product_category: 'Tech',
                product_profile: 'general',
                cus_name: customerName || 'Guest',
                cus_email: email || 'guest@techxocean.com',
                cus_add1: address || 'Dhaka',
                cus_city: city || 'Dhaka',
                cus_state: district || 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: phone || '01711111111',
                ship_name: customerName,
                ship_add1: address,
                ship_city: city,
                ship_state: district,
                ship_country: 'Bangladesh'
            };

            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
            sslcz.init(data).then(apiResponse => {
                let GatewayPageURL = apiResponse.GatewayPageURL;
                if(GatewayPageURL) {
                    res.json({ url: GatewayPageURL });
                } else {
                    res.status(400).json({ error: 'SSLCommerz session failed.' });
                }
            }).catch(e => res.status(500).json({ error: e.message }));
        } else {
            // Cash on delivery
            await emailService.sendOrderConfirmation(email, { id: orderId, total: finalTotal });
            res.json({ url: '/checkout/success' }); // Frontend redirect handling
        }
    });
    stmt.finalize();
});

// SSLCommerz Success
app.post('/api/payment/success/:tran_id', (req, res) => {
    db.get("SELECT id, email, status FROM orders WHERE transactionId=?", [req.params.tran_id], async (err, order) => {
        if(order) {
            db.run("UPDATE orders SET paymentStatus='Paid', status='Processing' WHERE transactionId=?", [req.params.tran_id]);
            await emailService.sendOrderConfirmation(order.email, { id: order.id, total: req.body.amount || 'Paid' });
        }
        res.redirect('/?view=payment_success');
    });
});

app.post('/api/payment/fail/:tran_id', (req, res) => {
    db.run("UPDATE orders SET paymentStatus='Failed', status='Payment Failed' WHERE transactionId=?", [req.params.tran_id]);
    res.redirect('/?view=payment_failed');
});

app.post('/api/payment/cancel/:tran_id', (req, res) => {
    db.run("UPDATE orders SET paymentStatus='Cancelled', status='Cancelled' WHERE transactionId=?", [req.params.tran_id]);
    res.redirect('/?view=payment_cancelled');
});

// 6. Get orders (Admin)
app.get('/api/orders', (req, res) => {
    db.all('SELECT * FROM orders ORDER BY id DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 6.5 Update Order Status (Admin + Shipping Provider Trigger)
app.put('/api/orders/:id/status', async (req, res) => {
    const { status } = req.body;
    db.get('SELECT * FROM orders WHERE id=?', [req.params.id], async (err, order) => {
        if(err || !order) return res.status(404).json({error: 'Not found'});
        
        let trackingNum = order.trackingNumber;
        if(status === 'Processing' && !trackingNum) {
            // Generate tracking via Provider
            const shipment = await shippingService.createShipment({orderId: order.id});
            trackingNum = shipment.trackingNumber;
            db.run("UPDATE orders SET trackingNumber=? WHERE id=?", [trackingNum, order.id]);
        }
        
        db.run('UPDATE orders SET status=? WHERE id=?', [status, req.params.id], async function(e) {
            await emailService.sendOrderStatusUpdate(order.email, order.id, status, trackingNum ? `http://localhost:3000/tracking/${order.id}` : '');
            res.json({success: true, status, trackingNumber: trackingNum});
        });
    });
});

// Tracking details
app.get('/api/orders/tracking/:id', (req, res) => {
    db.get('SELECT status, trackingNumber, estimatedDelivery FROM orders WHERE id=?', [req.params.id], (err, order) => {
        if (err || !order) return res.status(404).json({ error: 'Order not found' });
        res.json({
            status: order.status,
            trackingNumber: order.trackingNumber,
            timeline: [
                { status: 'Order Placed', time: 'Completed' },
                { status: 'Processing', time: order.status === 'Pending' ? 'Pending' : 'Completed' },
                { status: 'Shipped', time: (order.status === 'Shipped' || order.status === 'Delivered') ? 'Completed' : 'Pending' },
                { status: 'Delivered', time: order.status === 'Delivered' ? 'Completed' : 'Pending' }
            ]
        });
    });
});


// User Management
app.get('/api/users', (req, res) => {
    db.all('SELECT id, username, role FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows.map(r => ({ ...r, status: r.username.startsWith('banned_') ? 'Banned' : 'Active' })));
    });
});

// Analytics: Get Checkout Stats
app.get('/api/analytics/checkout', (req, res) => {
    db.all("SELECT paymentMethod, COUNT(*) as count FROM orders GROUP BY paymentMethod", [], (err, methods) => {
        if (err) return res.status(500).json({error: err.message});
        
        db.get("SELECT COUNT(*) as total_orders, SUM(total) as total_revenue FROM orders WHERE paymentStatus='Paid' OR paymentMethod='COD'", [], (err, totals) => {
            if (err) return res.status(500).json({error: err.message});
            res.json({ methods, totals });
        });
    });
});

app.put('/api/users/:id/ban', (req, res) => {
    const { ban } = req.body;
    db.get('SELECT username FROM users WHERE id=?', [req.params.id], (err, user) => {
        if(err || !user) return res.status(404).json({error: 'Not found'});
        let newUsername = user.username;
        if(ban && !newUsername.startsWith('banned_')) newUsername = 'banned_' + newUsername;
        if(!ban && newUsername.startsWith('banned_')) newUsername = newUsername.substring(7);
        db.run('UPDATE users SET username=? WHERE id=?', [newUsername, req.params.id], () => res.json({success:true}));
    });
});

// Store Settings placeholder
app.get('/api/settings', (req, res) => res.json({ storeName: 'TechX Ocean', baseCurrency: 'BDT', taxRate: 5, maintenanceMode: false }));
app.put('/api/settings', (req, res) => res.json({ success: true }));


// 7. Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row) {
            res.json({ success: true, role: row.role, id: row.id, username: row.username });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});

// --- User Reviews API ---
app.get('/api/reviews/product/:productId', (req, res) => {
    db.all("SELECT * FROM reviews WHERE product_id=? AND status='approved' ORDER BY id DESC", [req.params.productId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/reviews', (req, res) => {
    // Admin route to fetch all
    db.all("SELECT * FROM reviews ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/reviews', (req, res) => {
    const { product_id, user_id, guest_name, rating, title, content } = req.body;
    db.run(
        `INSERT INTO reviews (product_id, user_id, guest_name, rating, title, content) VALUES (?, ?, ?, ?, ?, ?)`,
        [product_id, user_id || null, guest_name || 'Anonymous', rating, title, content],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: this.lastID, status: 'pending' });
        }
    );
});

app.put('/api/reviews/:id/status', (req, res) => {
    const { status, admin_reply } = req.body;
    db.run("UPDATE reviews SET status=COALESCE(?, status), admin_reply=COALESCE(?, admin_reply) WHERE id=?", [status, admin_reply, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: req.params.id });
    });
});

app.delete('/api/reviews/:id', (req, res) => {
    db.run("DELETE FROM reviews WHERE id=?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Admin Dashboard Route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// SPA catch-all
app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    // Pass everything explicitly to index.html for React Client Router handling
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
