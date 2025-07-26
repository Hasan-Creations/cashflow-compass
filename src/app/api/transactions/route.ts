
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'transactions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const transactions = JSON.parse(fileContent);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error reading transactions.json:', error);
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return NextResponse.json([]);
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
