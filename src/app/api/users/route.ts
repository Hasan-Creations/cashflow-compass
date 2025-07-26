import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileContent);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error reading users.json:', error);
    // If the file doesn't exist, return an empty array.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json([]);
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
