
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'recurring.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const recurring = JSON.parse(fileContent);
    return NextResponse.json(recurring);
  } catch (error) {
    console.error('Error reading recurring.json:', error);
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json([]);
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
