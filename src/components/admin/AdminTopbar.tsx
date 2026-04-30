'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Debounce utility
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export const AdminTopbar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 300);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`/api/admin/search?q=${encodeURIComponent(debouncedQuery)}`);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error('Admin search error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    const handleResultClick = (result: any) => {
        router.push(result.adminUrl);
        setShowResults(false);
        setQuery('');
    };

    return (
        <header className="admin-topbar">
            <div className="admin-search-box" ref={searchRef}>
                <i className="fas fa-search"></i>
                <input 
                    type="text" 
                    className="admin-search-input"
                    placeholder="Search orders, products, customers..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setShowResults(true)}
                />
                {isLoading && <div className="admin-search-spinner"></div>}

                {showResults && results.length > 0 && (
                    <div className="admin-search-results">
                        {results.map((result, index) => (
                            <div 
                                key={index}
                                className="admin-result-item"
                                onMouseDown={() => handleResultClick(result)}
                            >
                                <div className="result-icon">{result.icon}</div>
                                <div className="result-info">
                                    <div className="result-title">{result.title}</div>
                                    <div className="result-subtitle">{result.subtitle}</div>
                                </div>
                                <div className="result-type">{result.type}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="admin-topbar-actions">
                <button className="topbar-btn">
                    <i className="far fa-bell"></i>
                    <span className="btn-badge">3</span>
                </button>
                
                <div className="admin-user-profile">
                    <img src="/img/admin-avatar.png" alt="Admin" onError={(e:any) => e.target.src = 'https://ui-avatars.com/api/?name=Admin+User&background=1B5B97&color=fff'} />
                    <div className="admin-user-info">
                        <span className="admin-user-name">Sadid Admin</span>
                        <span className="admin-user-role">Super Admin</span>
                    </div>
                    <i className="fas fa-chevron-down" style={{fontSize: '12px', color: '#94a3b8'}}></i>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
