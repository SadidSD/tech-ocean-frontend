"use client";
import React, { useState, useEffect, useRef } from 'react';

const FloatingIconsBackground = () => {
  const [icons, setIcons] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const ICON_TYPES = [
    { class: "fa-desktop", name: "monitor" },
    { class: "fa-laptop", name: "laptop" },
    { class: "fa-computer-mouse", name: "mouse" },
    { class: "fa-keyboard", name: "keyboard" },
    { class: "fa-microchip", name: "cpu" },
    { class: "fa-video", name: "cctv" },
    { class: "fa-gamepad", name: "controller" },
    { class: "fa-headphones", name: "headphone" },
    { class: "fa-mobile-alt", name: "mobile" },
    { class: "fa-wifi", name: "wifi" },
    { class: "fa-server", name: "server" },
    { class: "fa-hdd", name: "storage" },
    { class: "fa-print", name: "printer" },
    { class: "fa-router", name: "router" },
    { class: "fa-database", name: "database" }
  ];

  const getIconSize = () => {
    const rand = Math.random();
    if (rand < 0.5) return 12 + Math.random() * 6;   // Small: 12-18px
    if (rand < 0.8) return 18 + Math.random() * 8;   // Medium: 18-26px
    return 26 + Math.random() * 8;                    // Large: 26-34px
  };

  const getIconCount = () => {
    if (typeof window === 'undefined') return 50;
    const width = window.innerWidth;
    if (width >= 1200) return 75 + Math.floor(Math.random() * 15);
    if (width >= 768) return 50 + Math.floor(Math.random() * 15);
    return 30 + Math.floor(Math.random() * 10);
  };

  const generateNonOverlappingPositions = (count: number) => {
    const gridCols = 24;  // More columns for finer distribution
    const gridRows = 16;  // More rows
    const cellWidth = 100 / gridCols;
    const cellHeight = 100 / gridRows;
    
    // Create all possible cells
    const cells = [];
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        cells.push({ row, col });
      }
    }
    
    // Shuffle
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    
    // Take required number of cells
    const selected = cells.slice(0, count);
    
    return selected.map(cell => ({
      top: Math.min(95, Math.max(2, (cell.row / gridRows) * 100 + (Math.random() - 0.5) * (cellHeight * 0.8))),
      left: Math.min(95, Math.max(2, (cell.col / gridCols) * 100 + (Math.random() - 0.5) * (cellWidth * 0.8)))
    }));
  };

  const getBalancedIcons = (count: number) => {
    const typesCount = ICON_TYPES.length;
    const basePerType = Math.floor(count / typesCount);
    const remainder = count % typesCount;
    
    const result = [];
    for (let i = 0; i < typesCount; i++) {
      const numToAdd = basePerType + (i < remainder ? 1 : 0);
      for (let j = 0; j < numToAdd; j++) {
        result.push(ICON_TYPES[i]);
      }
    }
    
    // Shuffle
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
  };

  const generateIcons = () => {
    const count = getIconCount();
    const positions = generateNonOverlappingPositions(count);
    const iconTypes = getBalancedIcons(count);
    
    const newIcons = positions.map((pos, index) => ({
      ...pos,
      icon: iconTypes[index],
      size: getIconSize(),
      duration: 6 + Math.random() * 10,    // 6-16 seconds (faster)
      delay: Math.random() * 5,
      opacity: 0.06 + Math.random() * 0.06, // 0.06-0.12 (subtle)
      animationType: ['floatUpDown', 'floatLeftRight', 'floatRotate'][
        Math.floor(Math.random() * 3)
      ]
    }));
    
    setIcons(newIcons);
  };

  useEffect(() => {
    generateIcons();
    
    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateIcons, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  if (icons.length === 0) return null;

  return (
    <div className="floating-icons-container" ref={containerRef}>
      {icons.map((icon, index) => (
        <i
          key={index}
          className={`fas ${icon.icon.class} floating-icon type-${icon.animationType}`}
          style={{
            position: 'fixed',
            top: `${icon.top}%`,
            left: `${icon.left}%`,
            fontSize: `${icon.size}px`,
            opacity: icon.opacity,
            animationDuration: `${icon.duration}s`,
            animationDelay: `${icon.delay}s`,
            pointerEvents: 'none',
            zIndex: 0,
            color: '#db4b27',
            willChange: 'transform'
          } as any}
        />
      ))}
    </div>
  );
};

export default FloatingIconsBackground;
