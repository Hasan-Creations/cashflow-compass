
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/types';

export async function POST(request: Request) {
  try {
    const { id, name } = await request.json();
    
    if (!id || !name) {
      return NextResponse.json({ message: 'Missing user ID or name' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    
    let users: User[] = [];
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(fileContent);
    } catch (error) {
       return NextResponse.json({ message: 'Could not read user data.' }, { status: 500 });
    }

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the user's name
    users[userIndex].name = name;

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User updated successfully', user: users[userIndex] }, { status: 200 });
  } catch (error) {
    console.error('Error updating user file:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
