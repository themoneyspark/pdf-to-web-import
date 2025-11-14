import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { governmentReferences } from '@/db/schema';
import { eq, like, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const record = await db
        .select()
        .from(governmentReferences)
        .where(eq(governmentReferences.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Government reference not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination, search, and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query = db.select().from(governmentReferences);

    // Apply filters
    const conditions = [];

    if (category) {
      conditions.push(eq(governmentReferences.category, category));
    }

    if (search) {
      conditions.push(
        or(
          like(governmentReferences.title, `%${search}%`),
          like(governmentReferences.citationNumber, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      if (conditions.length === 1) {
        query = query.where(conditions[0]);
      } else {
        query = query.where(conditions[0]);
        for (let i = 1; i < conditions.length; i++) {
          query = query.where(conditions[i]);
        }
      }
    }

    const results = await query
      .orderBy(desc(governmentReferences.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, title, citationNumber, url, publishedDate, description } = body;

    // Validate required fields
    if (!category || category.trim() === '') {
      return NextResponse.json(
        { error: 'Category is required', code: 'MISSING_CATEGORY' },
        { status: 400 }
      );
    }

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (!citationNumber || citationNumber.trim() === '') {
      return NextResponse.json(
        { error: 'Citation number is required', code: 'MISSING_CITATION_NUMBER' },
        { status: 400 }
      );
    }

    if (!url || url.trim() === '') {
      return NextResponse.json(
        { error: 'URL is required', code: 'MISSING_URL' },
        { status: 400 }
      );
    }

    if (!publishedDate || publishedDate.trim() === '') {
      return NextResponse.json(
        { error: 'Published date is required', code: 'MISSING_PUBLISHED_DATE' },
        { status: 400 }
      );
    }

    if (!description || description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format', code: 'INVALID_URL' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      category: category.trim(),
      title: title.trim(),
      citationNumber: citationNumber.trim(),
      url: url.trim(),
      publishedDate: publishedDate.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString()
    };

    const newRecord = await db
      .insert(governmentReferences)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(governmentReferences)
      .where(eq(governmentReferences.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Government reference not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { category, title, citationNumber, url, publishedDate, description } = body;

    // Build update object with only provided fields
    const updates: any = {};

    if (category !== undefined) {
      if (category.trim() === '') {
        return NextResponse.json(
          { error: 'Category cannot be empty', code: 'INVALID_CATEGORY' },
          { status: 400 }
        );
      }
      updates.category = category.trim();
    }

    if (title !== undefined) {
      if (title.trim() === '') {
        return NextResponse.json(
          { error: 'Title cannot be empty', code: 'INVALID_TITLE' },
          { status: 400 }
        );
      }
      updates.title = title.trim();
    }

    if (citationNumber !== undefined) {
      if (citationNumber.trim() === '') {
        return NextResponse.json(
          { error: 'Citation number cannot be empty', code: 'INVALID_CITATION_NUMBER' },
          { status: 400 }
        );
      }
      updates.citationNumber = citationNumber.trim();
    }

    if (url !== undefined) {
      if (url.trim() === '') {
        return NextResponse.json(
          { error: 'URL cannot be empty', code: 'INVALID_URL' },
          { status: 400 }
        );
      }
      // Validate URL format
      try {
        new URL(url);
      } catch {
        return NextResponse.json(
          { error: 'Invalid URL format', code: 'INVALID_URL' },
          { status: 400 }
        );
      }
      updates.url = url.trim();
    }

    if (publishedDate !== undefined) {
      if (publishedDate.trim() === '') {
        return NextResponse.json(
          { error: 'Published date cannot be empty', code: 'INVALID_PUBLISHED_DATE' },
          { status: 400 }
        );
      }
      updates.publishedDate = publishedDate.trim();
    }

    if (description !== undefined) {
      if (description.trim() === '') {
        return NextResponse.json(
          { error: 'Description cannot be empty', code: 'INVALID_DESCRIPTION' },
          { status: 400 }
        );
      }
      updates.description = description.trim();
    }

    // If no fields to update
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update', code: 'NO_UPDATES' },
        { status: 400 }
      );
    }

    const updatedRecord = await db
      .update(governmentReferences)
      .set(updates)
      .where(eq(governmentReferences.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedRecord[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(governmentReferences)
      .where(eq(governmentReferences.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Government reference not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(governmentReferences)
      .where(eq(governmentReferences.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Government reference deleted successfully',
        record: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}