import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { taxBrackets } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const record = await db.select()
        .from(taxBrackets)
        .where(eq(taxBrackets.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json({ 
          error: 'Tax bracket not found',
          code: "NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const year = searchParams.get('year');
    const filingStatus = searchParams.get('filingStatus');

    let query = db.select().from(taxBrackets);

    // Build filter conditions
    const conditions = [];
    if (year) {
      const yearInt = parseInt(year);
      if (!isNaN(yearInt)) {
        conditions.push(eq(taxBrackets.year, yearInt));
      }
    }
    if (filingStatus) {
      conditions.push(eq(taxBrackets.filingStatus, filingStatus));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, filingStatus, bracketMin, bracketMax, taxRate } = body;

    // Validate required fields
    if (!year) {
      return NextResponse.json({ 
        error: "Year is required",
        code: "MISSING_YEAR" 
      }, { status: 400 });
    }

    if (!filingStatus) {
      return NextResponse.json({ 
        error: "Filing status is required",
        code: "MISSING_FILING_STATUS" 
      }, { status: 400 });
    }

    if (bracketMin === undefined || bracketMin === null) {
      return NextResponse.json({ 
        error: "Bracket minimum is required",
        code: "MISSING_BRACKET_MIN" 
      }, { status: 400 });
    }

    if (taxRate === undefined || taxRate === null) {
      return NextResponse.json({ 
        error: "Tax rate is required",
        code: "MISSING_TAX_RATE" 
      }, { status: 400 });
    }

    // Validate data types
    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      return NextResponse.json({ 
        error: "Year must be a valid integer",
        code: "INVALID_YEAR" 
      }, { status: 400 });
    }

    const bracketMinInt = parseInt(bracketMin);
    if (isNaN(bracketMinInt)) {
      return NextResponse.json({ 
        error: "Bracket minimum must be a valid integer",
        code: "INVALID_BRACKET_MIN" 
      }, { status: 400 });
    }

    let bracketMaxInt = null;
    if (bracketMax !== undefined && bracketMax !== null) {
      bracketMaxInt = parseInt(bracketMax);
      if (isNaN(bracketMaxInt)) {
        return NextResponse.json({ 
          error: "Bracket maximum must be a valid integer",
          code: "INVALID_BRACKET_MAX" 
        }, { status: 400 });
      }
    }

    const taxRateFloat = parseFloat(taxRate);
    if (isNaN(taxRateFloat)) {
      return NextResponse.json({ 
        error: "Tax rate must be a valid number",
        code: "INVALID_TAX_RATE" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedFilingStatus = filingStatus.trim();

    // Create new record
    const newRecord = await db.insert(taxBrackets)
      .values({
        year: yearInt,
        filingStatus: sanitizedFilingStatus,
        bracketMin: bracketMinInt,
        bracketMax: bracketMaxInt,
        taxRate: taxRateFloat,
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newRecord[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const idInt = parseInt(id);

    // Check if record exists
    const existing = await db.select()
      .from(taxBrackets)
      .where(eq(taxBrackets.id, idInt))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Tax bracket not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    const body = await request.json();
    const updates: any = {};

    // Process and validate optional update fields
    if (body.year !== undefined) {
      const yearInt = parseInt(body.year);
      if (isNaN(yearInt)) {
        return NextResponse.json({ 
          error: "Year must be a valid integer",
          code: "INVALID_YEAR" 
        }, { status: 400 });
      }
      updates.year = yearInt;
    }

    if (body.filingStatus !== undefined) {
      updates.filingStatus = body.filingStatus.trim();
    }

    if (body.bracketMin !== undefined) {
      const bracketMinInt = parseInt(body.bracketMin);
      if (isNaN(bracketMinInt)) {
        return NextResponse.json({ 
          error: "Bracket minimum must be a valid integer",
          code: "INVALID_BRACKET_MIN" 
        }, { status: 400 });
      }
      updates.bracketMin = bracketMinInt;
    }

    if (body.bracketMax !== undefined) {
      if (body.bracketMax === null) {
        updates.bracketMax = null;
      } else {
        const bracketMaxInt = parseInt(body.bracketMax);
        if (isNaN(bracketMaxInt)) {
          return NextResponse.json({ 
            error: "Bracket maximum must be a valid integer",
            code: "INVALID_BRACKET_MAX" 
          }, { status: 400 });
        }
        updates.bracketMax = bracketMaxInt;
      }
    }

    if (body.taxRate !== undefined) {
      const taxRateFloat = parseFloat(body.taxRate);
      if (isNaN(taxRateFloat)) {
        return NextResponse.json({ 
          error: "Tax rate must be a valid number",
          code: "INVALID_TAX_RATE" 
        }, { status: 400 });
      }
      updates.taxRate = taxRateFloat;
    }

    // Update record
    const updated = await db.update(taxBrackets)
      .set(updates)
      .where(eq(taxBrackets.id, idInt))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const idInt = parseInt(id);

    // Check if record exists
    const existing = await db.select()
      .from(taxBrackets)
      .where(eq(taxBrackets.id, idInt))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Tax bracket not found',
        code: "NOT_FOUND" 
      }, { status: 404 });
    }

    // Delete record
    const deleted = await db.delete(taxBrackets)
      .where(eq(taxBrackets.id, idInt))
      .returning();

    return NextResponse.json({ 
      message: 'Tax bracket deleted successfully',
      deletedRecord: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}