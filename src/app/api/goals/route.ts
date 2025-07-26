
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'goals.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const goals = JSON.parse(fileContent);
    return NextResponse.json(goals);
  } catch (error) {
    console.error('Error reading goals.json:', error);
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json([]);
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
