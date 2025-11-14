import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { standardDeductions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

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
        .from(standardDeductions)
        .where(eq(standardDeductions.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Standard deduction not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with filtering and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const year = searchParams.get('year');
    const filingStatus = searchParams.get('filingStatus');

    let query = db.select().from(standardDeductions);

    // Build filter conditions
    const conditions = [];
    if (year) {
      const yearInt = parseInt(year);
      if (isNaN(yearInt)) {
        return NextResponse.json(
          { error: 'Year must be a valid integer', code: 'INVALID_YEAR' },
          { status: 400 }
        );
      }
      conditions.push(eq(standardDeductions.year, yearInt));
    }
    if (filingStatus) {
      conditions.push(eq(standardDeductions.filingStatus, filingStatus));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, filingStatus, amount } = body;

    // Validate required fields
    if (!year) {
      return NextResponse.json(
        { error: 'Year is required', code: 'MISSING_YEAR' },
        { status: 400 }
      );
    }

    if (!filingStatus || filingStatus.trim() === '') {
      return NextResponse.json(
        { error: 'Filing status is required', code: 'MISSING_FILING_STATUS' },
        { status: 400 }
      );
    }

    if (amount === undefined || amount === null) {
      return NextResponse.json(
        { error: 'Amount is required', code: 'MISSING_AMOUNT' },
        { status: 400 }
      );
    }

    // Validate field types
    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      return NextResponse.json(
        { error: 'Year must be a valid integer', code: 'INVALID_YEAR' },
        { status: 400 }
      );
    }

    const amountInt = parseInt(amount);
    if (isNaN(amountInt)) {
      return NextResponse.json(
        { error: 'Amount must be a valid integer', code: 'INVALID_AMOUNT' },
        { status: 400 }
      );
    }

    // Insert new record
    const newRecord = await db
      .insert(standardDeductions)
      .values({
        year: yearInt,
        filingStatus: filingStatus.trim(),
        amount: amountInt,
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error: any) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
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
    const existing = await db
      .select()
      .from(standardDeductions)
      .where(eq(standardDeductions.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Standard deduction not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    // Validate and prepare updates
    if (body.year !== undefined) {
      const yearInt = parseInt(body.year);
      if (isNaN(yearInt)) {
        return NextResponse.json(
          { error: 'Year must be a valid integer', code: 'INVALID_YEAR' },
          { status: 400 }
        );
      }
      updates.year = yearInt;
    }

    if (body.filingStatus !== undefined) {
      if (body.filingStatus.trim() === '') {
        return NextResponse.json(
          { error: 'Filing status cannot be empty', code: 'INVALID_FILING_STATUS' },
          { status: 400 }
        );
      }
      updates.filingStatus = body.filingStatus.trim();
    }

    if (body.amount !== undefined) {
      const amountInt = parseInt(body.amount);
      if (isNaN(amountInt)) {
        return NextResponse.json(
          { error: 'Amount must be a valid integer', code: 'INVALID_AMOUNT' },
          { status: 400 }
        );
      }
      updates.amount = amountInt;
    }

    // Perform update
    const updated = await db
      .update(standardDeductions)
      .set(updates)
      .where(eq(standardDeductions.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
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
    const existing = await db
      .select()
      .from(standardDeductions)
      .where(eq(standardDeductions.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Standard deduction not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete record
    const deleted = await db
      .delete(standardDeductions)
      .where(eq(standardDeductions.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Standard deduction deleted successfully',
        deleted: deleted[0],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}