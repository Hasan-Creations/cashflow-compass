import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { filename, data } = await request.json();
    
    if (!filename || !data) {
      return NextResponse.json({ message: 'Missing filename or data' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    
    // Read the existing data
    let existingData = [];
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      // File might not exist, which is fine, we'll create it.
    }

    // Append new data
    existingData.push(data);

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: 'Data updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating JSON file:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
