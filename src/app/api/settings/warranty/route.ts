import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/warrantyRules.json');

// Helper to read rules
function getWarrantyRules() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading warranty rules file:', error);
  }
  
  // Default values if file doesn't exist or is corrupted
  return {
    cpu: { standard: '3', extended: '4', premium: '5' },
    motherboard: { standard: '3', extended: '4', premium: '5' },
    ram: { standard: 'Lifetime', extended: 'Lifetime', premium: 'Lifetime' },
    ssd: { standard: '5', extended: '6', premium: '7' },
    hdd: { standard: '2', extended: '3', premium: '5' },
    psu: { standard: '5', extended: '7', premium: '10' },
    monitor: { standard: '3', extended: '4', premium: '5' },
    cctv_camera: { standard: '1', extended: '2', premium: '3' },
    nvr: { standard: '1', extended: '2', premium: '3' },
    dvr: { standard: '1', extended: '2', premium: '3' },
  };
}

export async function GET() {
  const rules = getWarrantyRules();
  return NextResponse.json(rules);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Validate that the request body is an object
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    // Ensure the data directory exists
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save rules to JSON file
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, message: 'Warranty rules updated successfully' });
  } catch (error: any) {
    console.error('Error saving warranty rules:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}