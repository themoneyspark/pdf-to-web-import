import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { retirementLimits } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
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
        .from(retirementLimits)
        .where(eq(retirementLimits.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Record not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with pagination and filtering
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const year = searchParams.get('year');
    const accountType = searchParams.get('accountType');

    let query = db.select().from(retirementLimits);

    // Build filter conditions
    const conditions = [];
    if (year) {
      const yearInt = parseInt(year);
      if (isNaN(yearInt)) {
        return NextResponse.json(
          { error: 'Invalid year parameter', code: 'INVALID_YEAR' },
          { status: 400 }
        );
      }
      conditions.push(eq(retirementLimits.year, yearInt));
    }
    if (accountType) {
      conditions.push(eq(retirementLimits.accountType, accountType));
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
    const { year, accountType, contributionLimit, catchUpLimit, ageRequirement } = body;

    // Validate required fields
    if (!year) {
      return NextResponse.json(
        { error: 'Year is required', code: 'MISSING_YEAR' },
        { status: 400 }
      );
    }

    if (!accountType) {
      return NextResponse.json(
        { error: 'Account type is required', code: 'MISSING_ACCOUNT_TYPE' },
        { status: 400 }
      );
    }

    if (contributionLimit === undefined || contributionLimit === null) {
      return NextResponse.json(
        { error: 'Contribution limit is required', code: 'MISSING_CONTRIBUTION_LIMIT' },
        { status: 400 }
      );
    }

    // Validate year is integer
    const yearInt = parseInt(year);
    if (isNaN(yearInt)) {
      return NextResponse.json(
        { error: 'Year must be a valid integer', code: 'INVALID_YEAR' },
        { status: 400 }
      );
    }

    // Validate contributionLimit is integer
    const contributionLimitInt = parseInt(contributionLimit);
    if (isNaN(contributionLimitInt)) {
      return NextResponse.json(
        { error: 'Contribution limit must be a valid integer', code: 'INVALID_CONTRIBUTION_LIMIT' },
        { status: 400 }
      );
    }

    // Validate catchUpLimit if provided
    let catchUpLimitInt = null;
    if (catchUpLimit !== undefined && catchUpLimit !== null) {
      catchUpLimitInt = parseInt(catchUpLimit);
      if (isNaN(catchUpLimitInt)) {
        return NextResponse.json(
          { error: 'Catch up limit must be a valid integer', code: 'INVALID_CATCH_UP_LIMIT' },
          { status: 400 }
        );
      }
    }

    // Validate ageRequirement if provided
    let ageRequirementInt = null;
    if (ageRequirement !== undefined && ageRequirement !== null) {
      ageRequirementInt = parseInt(ageRequirement);
      if (isNaN(ageRequirementInt)) {
        return NextResponse.json(
          { error: 'Age requirement must be a valid integer', code: 'INVALID_AGE_REQUIREMENT' },
          { status: 400 }
        );
      }
    }

    // Sanitize accountType
    const sanitizedAccountType = accountType.trim();

    // Create new record
    const newRecord = await db
      .insert(retirementLimits)
      .values({
        year: yearInt,
        accountType: sanitizedAccountType,
        contributionLimit: contributionLimitInt,
        catchUpLimit: catchUpLimitInt,
        ageRequirement: ageRequirementInt,
        createdAt: new Date().toISOString(),
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
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const idInt = parseInt(id);

    // Check if record exists
    const existing = await db
      .select()
      .from(retirementLimits)
      .where(eq(retirementLimits.id, idInt))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Record not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { year, accountType, contributionLimit, catchUpLimit, ageRequirement } = body;

    // Build update object
    const updates: Record<string, any> = {};

    // Validate and add year if provided
    if (year !== undefined) {
      const yearInt = parseInt(year);
      if (isNaN(yearInt)) {
        return NextResponse.json(
          { error: 'Year must be a valid integer', code: 'INVALID_YEAR' },
          { status: 400 }
        );
      }
      updates.year = yearInt;
    }

    // Validate and add accountType if provided
    if (accountType !== undefined) {
      updates.accountType = accountType.trim();
    }

    // Validate and add contributionLimit if provided
    if (contributionLimit !== undefined) {
      const contributionLimitInt = parseInt(contributionLimit);
      if (isNaN(contributionLimitInt)) {
        return NextResponse.json(
          { error: 'Contribution limit must be a valid integer', code: 'INVALID_CONTRIBUTION_LIMIT' },
          { status: 400 }
        );
      }
      updates.contributionLimit = contributionLimitInt;
    }

    // Validate and add catchUpLimit if provided
    if (catchUpLimit !== undefined) {
      if (catchUpLimit === null) {
        updates.catchUpLimit = null;
      } else {
        const catchUpLimitInt = parseInt(catchUpLimit);
        if (isNaN(catchUpLimitInt)) {
          return NextResponse.json(
            { error: 'Catch up limit must be a valid integer', code: 'INVALID_CATCH_UP_LIMIT' },
            { status: 400 }
          );
        }
        updates.catchUpLimit = catchUpLimitInt;
      }
    }

    // Validate and add ageRequirement if provided
    if (ageRequirement !== undefined) {
      if (ageRequirement === null) {
        updates.ageRequirement = null;
      } else {
        const ageRequirementInt = parseInt(ageRequirement);
        if (isNaN(ageRequirementInt)) {
          return NextResponse.json(
            { error: 'Age requirement must be a valid integer', code: 'INVALID_AGE_REQUIREMENT' },
            { status: 400 }
          );
        }
        updates.ageRequirement = ageRequirementInt;
      }
    }

    // Update record
    const updated = await db
      .update(retirementLimits)
      .set(updates)
      .where(eq(retirementLimits.id, idInt))
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
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const idInt = parseInt(id);

    // Check if record exists
    const existing = await db
      .select()
      .from(retirementLimits)
      .where(eq(retirementLimits.id, idInt))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Record not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete record
    const deleted = await db
      .delete(retirementLimits)
      .where(eq(retirementLimits.id, idInt))
      .returning();

    return NextResponse.json(
      {
        message: 'Record deleted successfully',
        deletedRecord: deleted[0],
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