import { NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/data/products';
import { MOCK_CATEGORIES } from '@/data/categories';

// Mock Blogs (since they are currently "Coming Soon")
const MOCK_BLOGS = [
    { id: 1, title: 'How to Choose the Best Gaming PC in 2024', excerpt: 'Looking for a new gaming rig? This guide covers everything from GPUs to cooling.', slug: 'gaming-pc-guide' },
    { id: 2, title: 'Top 5 CCTV Cameras for Home Security', excerpt: 'Keep your home safe with these top-rated security cameras available at Tech X Ocean.', slug: 'cctv-guide' },
    { id: 3, title: 'Understanding DDR5 RAM: Is it worth the upgrade?', excerpt: 'We break down the performance benefits of DDR5 vs DDR4 for modern gaming.', slug: 'ram-upgrade-guide' }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.toLowerCase() || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!q || q.length < 2) {
        return NextResponse.json({ results: [], totalCount: 0 });
    }

    // Search Products
    const products = MOCK_PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(q)
    ).map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.imgUrl,
        type: 'product',
        url: `/product/${p.id}`
    }));

    // Search Categories
    const categories = MOCK_CATEGORIES.filter(c => 
        c.name.toLowerCase().includes(q)
    ).map(c => ({
        id: c.id,
        title: c.name,
        type: 'category',
        url: `/category/${c.slug}`
    }));

    // Search Blogs
    const blogs = MOCK_BLOGS.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.excerpt.toLowerCase().includes(q)
    ).map(b => ({
        id: b.id,
        title: b.title,
        excerpt: b.excerpt,
        type: 'blog',
        url: `/blog/${b.slug}`
    }));

    const allResults = [...products, ...categories, ...blogs];
    
    // For the suggestion dropdown
    if (searchParams.get('limit')) {
        return NextResponse.json({ 
            results: allResults.slice(0, limit),
            totalCount: allResults.length 
        });
    }

    // For the full results page
    return NextResponse.json({
        products: products,
        categories: categories,
        blogs: blogs,
        totalCount: allResults.length
    });
}
