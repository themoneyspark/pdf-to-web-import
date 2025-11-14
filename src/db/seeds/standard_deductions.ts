import { db } from '@/db';
import { standardDeductions } from '@/db/schema';

async function main() {
    const sampleDeductions = [
        {
            year: 2024,
            filingStatus: 'Single',
            amount: 14600,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Married Filing Jointly',
            amount: 29200,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Head of Household',
            amount: 21900,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Married Filing Separately',
            amount: 14600,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            amount: 15750,
            createdAt: new Date('2024-11-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Married Filing Jointly',
            amount: 31500,
            createdAt: new Date('2024-11-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Head of Household',
            amount: 23625,
            createdAt: new Date('2024-11-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Married Filing Separately',
            amount: 15750,
            createdAt: new Date('2024-11-01').toISOString(),
        },
    ];

    await db.insert(standardDeductions).values(sampleDeductions);
    
    console.log('✅ Standard deductions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});