import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/data/products';

// Mock Admin Data
const MOCK_ORDERS = [
    { id: '1001', total: '45,000', status: 'Processing', customer: 'John Doe' },
    { id: '1002', total: '1,20,000', status: 'Shipped', customer: 'Jane Smith' },
    { id: '1003', total: '8,500', status: 'Delivered', customer: 'Bob Johnson' }
];

const MOCK_CUSTOMERS = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@gmail.com' },
    { id: 3, name: 'Ariful Islam', email: 'arif@tech.com.bd' }
];

const MOCK_REVIEWS = [
    { id: 1, productName: 'Intel i5-13600K', rating: 5, comment: 'Amazing performance for the price!' },
    { id: 2, productName: 'Sony PS5', rating: 4, comment: 'Great console, but a bit bulky.' }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';

    if (!q || q.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const results: any[] = [];

    // Search Orders
    const orders = MOCK_ORDERS.filter(o => o.id.includes(q) || o.customer.toLowerCase().includes(q));
    results.push(...orders.map(order => ({
        id: order.id,
        title: `Order #${order.id}`,
        subtitle: `৳${order.total} - ${order.status} (${order.customer})`,
        icon: '🛒',
        type: 'order',
        adminUrl: `/admin/orders/${order.id}`
    })));

    // Search Products
    const products = MOCK_PRODUCTS.filter(p => p.title.toLowerCase().includes(q)).slice(0, 5);
    results.push(...products.map(p => ({
        id: p.id,
        title: p.title,
        subtitle: `${p.price} - Stock: High`,
        icon: '📦',
        type: 'product',
        adminUrl: `/admin/products/edit/${p.id}`
    })));

    // Search Customers
    const customers = MOCK_CUSTOMERS.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    results.push(...customers.map(c => ({
        id: c.id,
        title: c.name,
        subtitle: c.email,
        icon: '👤',
        type: 'customer',
        adminUrl: `/admin/customers/${c.id}`
    })));

    // Search Reviews
    const reviews = MOCK_REVIEWS.filter(r => r.productName.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q));
    results.push(...reviews.map(r => ({
        id: r.id,
        title: r.productName,
        subtitle: `Rating: ${r.rating} - "${r.comment.substring(0, 30)}..."`,
        icon: '💬',
        type: 'review',
        adminUrl: `/admin/reviews/${r.id}`
    })));

    return NextResponse.json({ results: results.slice(0, 10) });
}
