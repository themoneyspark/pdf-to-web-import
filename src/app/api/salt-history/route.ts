import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { saltDeductionHistory } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single record by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: "Valid ID is required",
            code: "INVALID_ID" 
          },
          { status: 400 }
        );
      }

      const record = await db.select()
        .from(saltDeductionHistory)
        .where(eq(saltDeductionHistory.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Record not found' },
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

    let query = db.select().from(saltDeductionHistory);

    // Build filter conditions
    const conditions = [];
    if (year) {
      const yearInt = parseInt(year);
      if (isNaN(yearInt)) {
        return NextResponse.json(
          { 
            error: "Year must be a valid integer",
            code: "INVALID_YEAR" 
          },
          { status: 400 }
        );
      }
      conditions.push(eq(saltDeductionHistory.year, yearInt));
    }
    if (filingStatus) {
      conditions.push(eq(saltDeductionHistory.filingStatus, filingStatus));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

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
    const { year, filingStatus, deductionCap, phaseoutThreshold } = body;

    // Validate required fields
    if (!year) {
      return NextResponse.json(
        { 
          error: "Year is required",
          code: "MISSING_YEAR" 
        },
        { status: 400 }
      );
    }

    if (!filingStatus) {
      return NextResponse.json(
        { 
          error: "Filing status is required",
          code: "MISSING_FILING_STATUS" 
        },
        { status: 400 }
      );
    }

    if (deductionCap === undefined || deductionCap === null) {
      return NextResponse.json(
        { 
          error: "Deduction cap is required",
          code: "MISSING_DEDUCTION_CAP" 
        },
        { status: 400 }
      );
    }

    // Validate integer fields
    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      return NextResponse.json(
        { 
          error: "Year must be a valid integer",
          code: "INVALID_YEAR" 
        },
        { status: 400 }
      );
    }

    const deductionCapInt = parseInt(deductionCap);
    if (isNaN(deductionCapInt)) {
      return NextResponse.json(
        { 
          error: "Deduction cap must be a valid integer",
          code: "INVALID_DEDUCTION_CAP" 
        },
        { status: 400 }
      );
    }

    // Validate phaseoutThreshold if provided
    let phaseoutThresholdInt = null;
    if (phaseoutThreshold !== undefined && phaseoutThreshold !== null) {
      phaseoutThresholdInt = parseInt(phaseoutThreshold);
      if (isNaN(phaseoutThresholdInt)) {
        return NextResponse.json(
          { 
            error: "Phaseout threshold must be a valid integer",
            code: "INVALID_PHASEOUT_THRESHOLD" 
          },
          { status: 400 }
        );
      }
    }

    // Sanitize filingStatus
    const sanitizedFilingStatus = filingStatus.trim();

    // Create new record
    const newRecord = await db.insert(saltDeductionHistory)
      .values({
        year: yearInt,
        filingStatus: sanitizedFilingStatus,
        deductionCap: deductionCapInt,
        phaseoutThreshold: phaseoutThresholdInt,
        createdAt: new Date().toISOString()
      })
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const idInt = parseInt(id);

    // Check if record exists
    const existingRecord = await db.select()
      .from(saltDeductionHistory)
      .where(eq(saltDeductionHistory.id, idInt))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { year, filingStatus, deductionCap, phaseoutThreshold } = body;

    // Build update object
    const updates: any = {};

    // Validate and add year if provided
    if (year !== undefined) {
      const yearInt = parseInt(year);
      if (isNaN(yearInt)) {
        return NextResponse.json(
          { 
            error: "Year must be a valid integer",
            code: "INVALID_YEAR" 
          },
          { status: 400 }
        );
      }
      updates.year = yearInt;
    }

    // Add filingStatus if provided
    if (filingStatus !== undefined) {
      updates.filingStatus = filingStatus.trim();
    }

    // Validate and add deductionCap if provided
    if (deductionCap !== undefined) {
      const deductionCapInt = parseInt(deductionCap);
      if (isNaN(deductionCapInt)) {
        return NextResponse.json(
          { 
            error: "Deduction cap must be a valid integer",
            code: "INVALID_DEDUCTION_CAP" 
          },
          { status: 400 }
        );
      }
      updates.deductionCap = deductionCapInt;
    }

    // Validate and add phaseoutThreshold if provided
    if (phaseoutThreshold !== undefined) {
      if (phaseoutThreshold === null) {
        updates.phaseoutThreshold = null;
      } else {
        const phaseoutThresholdInt = parseInt(phaseoutThreshold);
        if (isNaN(phaseoutThresholdInt)) {
          return NextResponse.json(
            { 
              error: "Phaseout threshold must be a valid integer",
              code: "INVALID_PHASEOUT_THRESHOLD" 
            },
            { status: 400 }
          );
        }
        updates.phaseoutThreshold = phaseoutThresholdInt;
      }
    }

    // Update record
    const updated = await db.update(saltDeductionHistory)
      .set(updates)
      .where(eq(saltDeductionHistory.id, idInt))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });
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
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    const idInt = parseInt(id);

    // Check if record exists
    const existingRecord = await db.select()
      .from(saltDeductionHistory)
      .where(eq(saltDeductionHistory.id, idInt))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Record not found' },
        { status: 404 }
      );
    }

    // Delete record
    const deleted = await db.delete(saltDeductionHistory)
      .where(eq(saltDeductionHistory.id, idInt))
      .returning();

    return NextResponse.json(
      { 
        message: 'Record deleted successfully',
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