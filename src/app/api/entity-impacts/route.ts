import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { entityTaxImpacts } from '@/db/schema';
import { eq, like, and, or } from 'drizzle-orm';

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
        .from(entityTaxImpacts)
        .where(eq(entityTaxImpacts.id, parseInt(id)))
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
    const search = searchParams.get('search');
    const entityType = searchParams.get('entityType');
    const year = searchParams.get('year');

    let query = db.select().from(entityTaxImpacts);

    // Build filter conditions
    const conditions = [];

    if (search) {
      conditions.push(like(entityTaxImpacts.provisionName, `%${search}%`));
    }

    if (entityType) {
      conditions.push(eq(entityTaxImpacts.entityType, entityType));
    }

    if (year) {
      const yearInt = parseInt(year);
      if (!isNaN(yearInt)) {
        conditions.push(eq(entityTaxImpacts.year, yearInt));
      }
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
    const { entityType, provisionName, impactDescription, potentialSavings, year } = body;

    // Validate required fields
    if (!entityType || !entityType.trim()) {
      return NextResponse.json(
        { error: 'Entity type is required', code: 'MISSING_ENTITY_TYPE' },
        { status: 400 }
      );
    }

    if (!provisionName || !provisionName.trim()) {
      return NextResponse.json(
        { error: 'Provision name is required', code: 'MISSING_PROVISION_NAME' },
        { status: 400 }
      );
    }

    if (!impactDescription || !impactDescription.trim()) {
      return NextResponse.json(
        { error: 'Impact description is required', code: 'MISSING_IMPACT_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (!potentialSavings || !potentialSavings.trim()) {
      return NextResponse.json(
        { error: 'Potential savings is required', code: 'MISSING_POTENTIAL_SAVINGS' },
        { status: 400 }
      );
    }

    if (year === undefined || year === null) {
      return NextResponse.json(
        { error: 'Year is required', code: 'MISSING_YEAR' },
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

    // Insert new record
    const newRecord = await db
      .insert(entityTaxImpacts)
      .values({
        entityType: entityType.trim(),
        provisionName: provisionName.trim(),
        impactDescription: impactDescription.trim(),
        potentialSavings: potentialSavings.trim(),
        year: yearInt,
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

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(entityTaxImpacts)
      .where(eq(entityTaxImpacts.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Record not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { entityType, provisionName, impactDescription, potentialSavings, year } = body;

    // Build update object with only provided fields
    const updates: any = {};

    if (entityType !== undefined) {
      if (!entityType.trim()) {
        return NextResponse.json(
          { error: 'Entity type cannot be empty', code: 'EMPTY_ENTITY_TYPE' },
          { status: 400 }
        );
      }
      updates.entityType = entityType.trim();
    }

    if (provisionName !== undefined) {
      if (!provisionName.trim()) {
        return NextResponse.json(
          { error: 'Provision name cannot be empty', code: 'EMPTY_PROVISION_NAME' },
          { status: 400 }
        );
      }
      updates.provisionName = provisionName.trim();
    }

    if (impactDescription !== undefined) {
      if (!impactDescription.trim()) {
        return NextResponse.json(
          { error: 'Impact description cannot be empty', code: 'EMPTY_IMPACT_DESCRIPTION' },
          { status: 400 }
        );
      }
      updates.impactDescription = impactDescription.trim();
    }

    if (potentialSavings !== undefined) {
      if (!potentialSavings.trim()) {
        return NextResponse.json(
          { error: 'Potential savings cannot be empty', code: 'EMPTY_POTENTIAL_SAVINGS' },
          { status: 400 }
        );
      }
      updates.potentialSavings = potentialSavings.trim();
    }

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

    // Update record
    const updated = await db
      .update(entityTaxImpacts)
      .set(updates)
      .where(eq(entityTaxImpacts.id, parseInt(id)))
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

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(entityTaxImpacts)
      .where(eq(entityTaxImpacts.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Record not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete record
    const deleted = await db
      .delete(entityTaxImpacts)
      .where(eq(entityTaxImpacts.id, parseInt(id)))
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