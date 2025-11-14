import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { taxBrackets, standardDeductions, retirementLimits, saltDeductionHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Query tax brackets for 2024 and 2025
    const taxBrackets2024 = await db.select()
      .from(taxBrackets)
      .where(eq(taxBrackets.year, 2024));

    const taxBrackets2025 = await db.select()
      .from(taxBrackets)
      .where(eq(taxBrackets.year, 2025));

    // Query standard deductions for 2024 and 2025
    const standardDeductions2024 = await db.select()
      .from(standardDeductions)
      .where(eq(standardDeductions.year, 2024));

    const standardDeductions2025 = await db.select()
      .from(standardDeductions)
      .where(eq(standardDeductions.year, 2025));

    // Query retirement limits for 2024 and 2025
    const retirementLimits2024 = await db.select()
      .from(retirementLimits)
      .where(eq(retirementLimits.year, 2024));

    const retirementLimits2025 = await db.select()
      .from(retirementLimits)
      .where(eq(retirementLimits.year, 2025));

    // Query SALT deduction history for 2024 and 2025
    const saltDeductions2024 = await db.select()
      .from(saltDeductionHistory)
      .where(eq(saltDeductionHistory.year, 2024));

    const saltDeductions2025 = await db.select()
      .from(saltDeductionHistory)
      .where(eq(saltDeductionHistory.year, 2025));

    // Calculate summary statistics
    const uniqueRetirementTypes2025 = new Set(
      retirementLimits2025.map(limit => limit.accountType)
    );

    // Structure comprehensive comparison response
    const comparisonData = {
      taxBrackets: {
        2024: taxBrackets2024,
        2025: taxBrackets2025
      },
      standardDeductions: {
        2024: standardDeductions2024,
        2025: standardDeductions2025
      },
      retirementLimits: {
        2024: retirementLimits2024,
        2025: retirementLimits2025
      },
      saltDeductions: {
        2024: saltDeductions2024,
        2025: saltDeductions2025
      },
      summary: {
        totalBrackets2024: taxBrackets2024.length,
        totalBrackets2025: taxBrackets2025.length,
        retirementAccountTypes2025: uniqueRetirementTypes2025.size
      }
    };

    return NextResponse.json(comparisonData, { status: 200 });
  } catch (error) {
    console.error('GET comparison data error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}