'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/components/ClientApplication';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';
import './cctv.css';

// Components
const CameraQuantitySelector = ({ quantity, setQuantity, onQuantityChange }: any) => {
  const presets = [4, 8, 16, 32];
  
  const handleIncrement = () => {
    if (quantity < 32) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };
  
  const handlePresetClick = (preset: number) => {
    setQuantity(preset);
    onQuantityChange(preset);
  };
  
  return (
    <div className="quantity-selector-section">
      <div className="section-header">
        <span className="section-icon">🔢</span>
        <h3 style={{margin:0}}>1. NUMBER OF CAMERAS</h3>
        <span className="required-badge" style={{background:'#ffede8', color:'#db4b27', padding:'4px 8px', borderRadius:'4px', fontSize:'12px', marginLeft:'auto', fontWeight:600}}>Required First Step</span>
      </div>
      
      <div className="quantity-controls">
        <button className="qty-btn" onClick={handleDecrement}>−</button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn" onClick={handleIncrement}>+</button>
      </div>
      
      <div className="quantity-presets">
        {presets.map(preset => (
          <button 
            key={preset}
            className={`preset-btn ${quantity === preset ? 'active' : ''}`}
            onClick={() => handlePresetClick(preset)}
          >
            {preset} Cameras
          </button>
        ))}
      </div>
      
      <div className="quantity-recommendation" style={{textAlign:'center', marginTop:'16px', color:'#666', fontSize:'14px'}}>
        <i className="fas fa-lightbulb" style={{color:'#f59e0b', marginRight:'8px'}}></i>
        <span>
          {quantity <= 2 && "Recommended: Small shop / Office setup"}
          {quantity >= 3 && quantity <= 6 && "Recommended: Standard home / Small business"}
          {quantity >= 7 && quantity <= 12 && "Recommended: Medium business / Large home"}
          {quantity >= 13 && "Recommended: Large enterprise / Commercial complex"}
        </span>
      </div>
    </div>
  );
};

const StorageCalculator = ({ cameraCount, onStorageSelect }: any) => {
  const [retentionDays, setRetentionDays] = useState(7);
  
  // Formula: (Camera Count × Bitrate × Retention Days) / 8192
  const calculateRequiredTB = (cameras: number, days: number) => {
    const bitrateMbps = 4; // Average 4Mbps per camera
    const totalGB = (cameras * bitrateMbps * days * 86400) / (8 * 1024);
    return Math.ceil(totalGB / 1024); // Convert to TB
  };
  
  const requiredTB = calculateRequiredTB(cameraCount, retentionDays);
  
  return (
    <div className="builder-section storage-calculator">
      <div className="section-header">
        <i className="fas fa-hdd" style={{color:'#db4b27', fontSize:'20px'}}></i>
        <h4 style={{margin:0}}>5. Storage Calculator</h4>
      </div>
      <div style={{marginBottom:'16px'}}>
          <label style={{display:'block', marginBottom:'8px', fontWeight:600}}>Retention Days: {retentionDays} days</label>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={retentionDays}
            onChange={(e) => setRetentionDays(parseInt(e.target.value))}
            style={{width:'100%'}}
          />
      </div>
      
      <div className="storage-result" style={{padding:'12px', background:'#f8faff', borderRadius:'8px', marginBottom:'16px', fontWeight:600}}>
        Recommended Storage: <span style={{color:'#db4b27'}}>{requiredTB} TB</span>
      </div>
      
      <select className="builder-select" onChange={(e) => onStorageSelect(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}}>
        <option value="">Select HDD</option>
        <option value="5500">1TB Surveillance HDD (৳5,500)</option>
        <option value="7500">2TB Surveillance HDD (৳7,500)</option>
        <option value="11000">4TB Surveillance HDD (৳11,000)</option>
        <option value="16500">6TB Surveillance HDD (৳16,500)</option>
        <option value="22000">8TB Surveillance HDD (৳22,000)</option>
      </select>
    </div>
  );
};

const CableCalculator = ({ cameraCount, onCableSelect }: any) => {
  const [cableLengthPerCamera, setCableLengthPerCamera] = useState(20);
  
  const totalCableLength = cameraCount * cableLengthPerCamera;
  
  return (
    <div className="builder-section cable-section">
      <div className="section-header">
        <i className="fas fa-network-wired" style={{color:'#db4b27', fontSize:'20px'}}></i>
        <h4 style={{margin:0}}>6. Cable Requirement</h4>
      </div>
      <div style={{marginBottom:'16px'}}>
          <label style={{display:'block', marginBottom:'8px', fontWeight:600}}>Cable length per camera: {cableLengthPerCamera}m</label>
          <input 
            type="range" 
            min="5" 
            max="100" 
            step="5"
            value={cableLengthPerCamera}
            onChange={(e) => setCableLengthPerCamera(parseInt(e.target.value))}
            style={{width:'100%'}}
          />
      </div>
      
      <div className="total-cable" style={{padding:'12px', background:'#f8faff', borderRadius:'8px', marginBottom:'16px', fontWeight:600}}>
        Total Cable Needed: <span style={{color:'#db4b27'}}>{totalCableLength} meters</span>
      </div>
      
      <select className="builder-select" onChange={(e) => onCableSelect(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}}>
        <option value="">Select Cable Package</option>
        <option value="400">20m Cable (per camera) - ৳400</option>
        <option value="1000">50m Cable (per camera) - ৳1,000</option>
        <option value="2000">100m Cable (per camera) - ৳2,000</option>
        <option value="4500">Bulk Cable (305m box) - ৳4,500</option>
      </select>
    </div>
  );
};

const PowerCalculator = ({ cameraCount, cameraType, onPowerSelect }: any) => {
  const powerPerCamera = cameraType === 'PTZ' ? 15 : 8;
  const totalPower = cameraCount * powerPerCamera;
  const recommendedPSU = Math.ceil(totalPower * 1.2);
  
  return (
    <div className="builder-section power-section">
      <div className="section-header">
        <i className="fas fa-plug" style={{color:'#db4b27', fontSize:'20px'}}></i>
        <h4 style={{margin:0}}>Power Supply Requirement</h4>
      </div>
      <div style={{display:'flex', gap:'20px', marginBottom:'16px'}}>
        <div>Total Power Draw: <strong>{totalPower}W</strong></div>
        <div>Recommended PSU: <strong style={{color:'#db4b27'}}>{recommendedPSU}W</strong></div>
      </div>
      
      <select className="builder-select" onChange={(e) => onPowerSelect(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd', marginBottom:'16px'}}>
        <option value="">Select Power Supply</option>
        <option value="800">60W Power Adapter (৳800)</option>
        <option value="1500">120W Power Box (up to 8 cameras) - ৳1,500</option>
        <option value="2500">240W Power Box (up to 16 cameras) - ৳2,500</option>
        <option value="4500">480W Power Box (up to 32 cameras) - ৳4,500</option>
      </select>
      
      <div className="poe-note" style={{fontSize:'13px', color:'#666', background:'#fff9e6', padding:'10px', borderRadius:'6px'}}>
        <i className="fas fa-info-circle" style={{marginRight:'6px'}}></i>
        For IP cameras, consider a PoE Switch instead of power adapters.
      </div>
    </div>
  );
};

const BuilderSummary = ({ selections, totalPrice, handleAddToCart }: any) => {
  return (
    <div className="builder-summary-sticky">
      <div className="summary-stats">
        <div className="stat">
          <span className="stat-label">📷 Cameras:</span>
          <span className="stat-value">{selections.cameraCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">💾 Storage:</span>
          <span className="stat-value">{selections.storage ? 'Included' : 'None'}</span>
        </div>
        <div className="stat">
          <span className="stat-label">💰 Total:</span>
          <span className="stat-value" style={{color:'#db4b27', fontSize:'20px', fontWeight:700}}>৳{totalPrice.toLocaleString()}</span>
        </div>
      </div>
      <button className="add-to-cart-btn" onClick={handleAddToCart} style={{background:'#db4b27', color:'white', border:'none', padding:'12px 24px', borderRadius:'30px', fontWeight:'bold', cursor:'pointer', fontSize:'16px'}}>
        Add to Cart
      </button>
    </div>
  );
};

export default function CCTVBuilderPage() {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  
  const [cameraCount, setCameraCount] = useState(4);
  const [cameraType, setCameraType] = useState('Dome');
  const [resolution, setResolution] = useState('2MP');
  const [recorder, setRecorder] = useState('');
  
  // Pricing states
  const [storagePrice, setStoragePrice] = useState(0);
  const [cablePrice, setCablePrice] = useState(0);
  const [powerPrice, setPowerPrice] = useState(0);
  
  const getCameraPrice = () => {
    let base = 2500;
    if (cameraType === 'Bullet') base = 3000;
    if (cameraType === 'PTZ') base = 12000;
    if (cameraType === 'Turret') base = 2800;
    if (cameraType === 'Fisheye') base = 8000;
    
    if (resolution === '4MP') base += 1000;
    if (resolution === '5MP') base += 1500;
    if (resolution === '8MP') base += 4000;
    return base;
  };
  
  const getRecorderPrice = () => {
    if (!recorder) return 0;
    if (recorder === '4ch') return 4500;
    if (recorder === '8ch') return 7500;
    if (recorder === '16ch') return 12000;
    if (recorder === '32ch') return 25000;
    return 0;
  };
  
  const totalPrice = (getCameraPrice() * cameraCount) + getRecorderPrice() + storagePrice + cablePrice + powerPrice;

  const handleAddToCart = () => {
    if(!recorder) {
        alert("Please select a recorder.");
        return;
    }
    // Dummy cart item
    addToCart({
      id: `cctv-sys-${Date.now()}`,
      title: `Complete ${cameraCount}-Camera CCTV System (${cameraType}, ${resolution})`,
      price: totalPrice,
      images: ['/img/cctv-placeholder.png'],
      slug: 'cctv-system-custom'
    }, 1, false);
    alert('Custom CCTV System added to cart!');
    router.push('/cart');
  };

  const requiredChannels = cameraCount <= 4 ? 4 : cameraCount <= 8 ? 8 : cameraCount <= 16 ? 16 : 32;

  return (
    <div className="cctv-builder" style={{paddingBottom:'100px', maxWidth:'900px', margin:'0 auto', padding:'20px'}}>
      <BrandSectionTitle title="CCTV SYSTEM BUILDER" subtitle="Design your security solution step-by-step" />
      
      {/* 1. NUMBER OF CAMERAS */}
      <CameraQuantitySelector 
        quantity={cameraCount} 
        setQuantity={setCameraCount} 
        onQuantityChange={() => {}} 
      />
      
      {/* 2. Camera Type Selection */}
      <div className="builder-section">
        <div className="section-header">
          <i className="fas fa-video" style={{color:'#db4b27', fontSize:'20px'}}></i>
          <h4 style={{margin:0}}>2. Camera Type Selection</h4>
        </div>
        <div className="camera-type-grid">
          {[
            { id: 'Dome', name: 'Dome Camera', icon: '📹', desc: 'Indoor / Ceiling' },
            { id: 'Bullet', name: 'Bullet Camera', icon: '🎯', desc: 'Outdoor / Long range' },
            { id: 'PTZ', name: 'PTZ Camera', icon: '🔍', desc: 'Pan/Tilt/Zoom' },
            { id: 'Turret', name: 'Turret', icon: '👁️', desc: 'Flexible adjustment' },
            { id: 'Fisheye', name: 'Fisheye', icon: '🌐', desc: '360° coverage' }
          ].map(type => (
            <div 
              key={type.id} 
              className={`camera-type-card ${cameraType === type.id ? 'selected' : ''}`}
              onClick={() => setCameraType(type.id)}
            >
              <div style={{fontSize:'32px', marginBottom:'8px'}}>{type.icon}</div>
              <div style={{fontWeight:600}}>{type.name}</div>
              <div style={{fontSize:'12px', color:'#666'}}>{type.desc}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 3. Resolution & Features */}
      <div className="builder-section">
        <div className="section-header">
          <i className="fas fa-eye" style={{color:'#db4b27', fontSize:'20px'}}></i>
          <h4 style={{margin:0}}>3. Resolution & Quality</h4>
        </div>
        <div className="camera-type-grid">
          {['2MP', '4MP', '5MP', '8MP'].map(res => (
            <div 
              key={res} 
              className={`camera-type-card ${resolution === res ? 'selected' : ''}`}
              onClick={() => setResolution(res)}
            >
              <div style={{fontWeight:800, fontSize:'18px'}}>{res}</div>
              <div style={{fontSize:'12px', color:'#666'}}>{res === '8MP' ? '4K Ultra HD' : res === '2MP' ? '1080p Full HD' : 'High Def'}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 4. Recorder Auto-Suggest */}
      <div className="builder-section">
        <div className="section-header">
          <i className="fas fa-server" style={{color:'#db4b27', fontSize:'20px'}}></i>
          <h4 style={{margin:0}}>4. Recorder (NVR/DVR)</h4>
        </div>
        <div style={{background:'#f8faff', padding:'16px', borderRadius:'8px', borderLeft:'4px solid #1B5B97'}}>
          <p style={{margin:'0 0 10px 0'}}>Based on your selection of <strong>{cameraCount} cameras</strong>, you need a minimum <strong>{requiredChannels}-Channel</strong> recorder.</p>
          <select className="builder-select" value={recorder} onChange={e => setRecorder(e.target.value)} style={{width:'100%', padding:'12px', borderRadius:'8px', border:'1px solid #ddd'}}>
            <option value="">Select a Recorder</option>
            {requiredChannels <= 4 && <option value="4ch">4-Channel NVR/DVR (৳4,500)</option>}
            {requiredChannels <= 8 && <option value="8ch">8-Channel NVR/DVR (৳7,500)</option>}
            {requiredChannels <= 16 && <option value="16ch">16-Channel NVR/DVR (৳12,000)</option>}
            <option value="32ch">32-Channel NVR/DVR (৳25,000)</option>
          </select>
        </div>
      </div>
      
      {/* 5. Storage */}
      <StorageCalculator cameraCount={cameraCount} onStorageSelect={(val: string) => setStoragePrice(Number(val))} />
      
      {/* 6. Cable & Power */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px'}}>
        <CableCalculator cameraCount={cameraCount} onCableSelect={(val: string) => setCablePrice(Number(val))} />
        <PowerCalculator cameraCount={cameraCount} cameraType={cameraType} onPowerSelect={(val: string) => setPowerPrice(Number(val))} />
      </div>
      
      {/* 7. Summary */}
      <BuilderSummary 
        selections={{ cameraCount, storage: storagePrice > 0 }} 
        totalPrice={totalPrice}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
}
