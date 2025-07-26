import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { filename, data, action = 'ADD', id } = await request.json();
    
    if (!filename || !data) {
      return NextResponse.json({ message: 'Missing filename or data' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    
    let existingData = [];
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent) {
        existingData = JSON.parse(fileContent);
      }
    } catch (error) {
      // File might not exist, which is fine for adding.
      if (action !== 'ADD') {
        return NextResponse.json({ message: 'File not found' }, { status: 404 });
      }
    }

    switch (action) {
      case 'ADD':
        existingData.push(data);
        break;
      case 'UPDATE':
        if (!id) return NextResponse.json({ message: 'Missing ID for update' }, { status: 400 });
        const updateIndex = existingData.findIndex((item: any) => item.id === id);
        if (updateIndex > -1) {
          existingData[updateIndex] = { ...existingData[updateIndex], ...data };
        } else {
          return NextResponse.json({ message: 'Item not found for update' }, { status: 404 });
        }
        break;
      case 'DELETE':
        if (!id) return NextResponse.json({ message: 'Missing ID for delete' }, { status: 400 });
        const deleteIndex = existingData.findIndex((item: any) => item.id === id);
        if (deleteIndex > -1) {
          existingData.splice(deleteIndex, 1);
        } else {
          return NextResponse.json({ message: 'Item not found for delete' }, { status: 404 });
        }
        break;
      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: `Data ${action.toLowerCase()}ed successfully` }, { status: 200 });
  } catch (error) {
    console.error('Error updating JSON file:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
