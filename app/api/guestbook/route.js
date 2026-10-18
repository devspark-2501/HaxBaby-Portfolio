import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET: Fetch recent guestbook signatures
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pip_nursery");
    
    const messages = await db
      .collection("guestbook")
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Add new guestbook entry
export async function POST(request) {
  try {
    const { name, note } = await request.json();
    if (!name || !note) {
      return NextResponse.json({ success: false, error: "Name and note required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pip_nursery");

    const newEntry = {
      name: name.slice(0, 30),
      note: note.slice(0, 140),
      createdAt: new Date(),
    };

    await db.collection("guestbook").insertOne(newEntry);

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}