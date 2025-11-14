import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { newProvisions } from '@/db/schema';
import { eq, like, and, desc } from 'drizzle-orm';

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
        .from(newProvisions)
        .where(eq(newProvisions.id, parseInt(id)))
        .limit(1);

      if (record.length === 0) {
        return NextResponse.json(
          { error: 'Provision not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(record[0], { status: 200 });
    }

    // List with filtering and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const isTemporary = searchParams.get('isTemporary');

    let query = db.select().from(newProvisions);

    const conditions = [];

    // Filter by temporary status
    if (isTemporary !== null) {
      const isTemp = isTemporary === 'true';
      conditions.push(eq(newProvisions.isTemporary, isTemp ? 1 : 0));
    }

    // Search by provision name
    if (search) {
      conditions.push(like(newProvisions.provisionName, `%${search}%`));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(newProvisions.createdAt))
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

    // Validate required fields
    if (!body.provisionName || body.provisionName.trim() === '') {
      return NextResponse.json(
        {
          error: 'Provision name is required',
          code: 'MISSING_PROVISION_NAME',
        },
        { status: 400 }
      );
    }

    if (!body.description || body.description.trim() === '') {
      return NextResponse.json(
        { error: 'Description is required', code: 'MISSING_DESCRIPTION' },
        { status: 400 }
      );
    }

    if (!body.effectiveDate || body.effectiveDate.trim() === '') {
      return NextResponse.json(
        {
          error: 'Effective date is required',
          code: 'MISSING_EFFECTIVE_DATE',
        },
        { status: 400 }
      );
    }

    if (!body.publicLawCitation || body.publicLawCitation.trim() === '') {
      return NextResponse.json(
        {
          error: 'Public law citation is required',
          code: 'MISSING_PUBLIC_LAW_CITATION',
        },
        { status: 400 }
      );
    }

    if (!body.ircSection || body.ircSection.trim() === '') {
      return NextResponse.json(
        { error: 'IRC section is required', code: 'MISSING_IRC_SECTION' },
        { status: 400 }
      );
    }

    if (typeof body.isTemporary !== 'boolean') {
      return NextResponse.json(
        {
          error: 'isTemporary must be a boolean',
          code: 'INVALID_IS_TEMPORARY',
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData = {
      provisionName: body.provisionName.trim(),
      description: body.description.trim(),
      effectiveDate: body.effectiveDate.trim(),
      expirationDate: body.expirationDate
        ? body.expirationDate.trim()
        : null,
      publicLawCitation: body.publicLawCitation.trim(),
      ircSection: body.ircSection.trim(),
      isTemporary: body.isTemporary ? 1 : 0,
      createdAt: new Date().toISOString(),
    };

    const newRecord = await db
      .insert(newProvisions)
      .values(insertData)
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

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(newProvisions)
      .where(eq(newProvisions.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Provision not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (body.provisionName !== undefined) {
      if (body.provisionName.trim() === '') {
        return NextResponse.json(
          {
            error: 'Provision name cannot be empty',
            code: 'INVALID_PROVISION_NAME',
          },
          { status: 400 }
        );
      }
      updateData.provisionName = body.provisionName.trim();
    }

    if (body.description !== undefined) {
      if (body.description.trim() === '') {
        return NextResponse.json(
          {
            error: 'Description cannot be empty',
            code: 'INVALID_DESCRIPTION',
          },
          { status: 400 }
        );
      }
      updateData.description = body.description.trim();
    }

    if (body.effectiveDate !== undefined) {
      if (body.effectiveDate.trim() === '') {
        return NextResponse.json(
          {
            error: 'Effective date cannot be empty',
            code: 'INVALID_EFFECTIVE_DATE',
          },
          { status: 400 }
        );
      }
      updateData.effectiveDate = body.effectiveDate.trim();
    }

    if (body.expirationDate !== undefined) {
      updateData.expirationDate =
        body.expirationDate && body.expirationDate.trim() !== ''
          ? body.expirationDate.trim()
          : null;
    }

    if (body.publicLawCitation !== undefined) {
      if (body.publicLawCitation.trim() === '') {
        return NextResponse.json(
          {
            error: 'Public law citation cannot be empty',
            code: 'INVALID_PUBLIC_LAW_CITATION',
          },
          { status: 400 }
        );
      }
      updateData.publicLawCitation = body.publicLawCitation.trim();
    }

    if (body.ircSection !== undefined) {
      if (body.ircSection.trim() === '') {
        return NextResponse.json(
          {
            error: 'IRC section cannot be empty',
            code: 'INVALID_IRC_SECTION',
          },
          { status: 400 }
        );
      }
      updateData.ircSection = body.ircSection.trim();
    }

    if (body.isTemporary !== undefined) {
      if (typeof body.isTemporary !== 'boolean') {
        return NextResponse.json(
          {
            error: 'isTemporary must be a boolean',
            code: 'INVALID_IS_TEMPORARY',
          },
          { status: 400 }
        );
      }
      updateData.isTemporary = body.isTemporary ? 1 : 0;
    }

    const updated = await db
      .update(newProvisions)
      .set(updateData)
      .where(eq(newProvisions.id, parseInt(id)))
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

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if record exists
    const existingRecord = await db
      .select()
      .from(newProvisions)
      .where(eq(newProvisions.id, parseInt(id)))
      .limit(1);

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: 'Provision not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(newProvisions)
      .where(eq(newProvisions.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Provision deleted successfully',
        deleted: deleted[0],
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