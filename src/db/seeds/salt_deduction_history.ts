import { db } from '@/db';
import { saltDeductionHistory } from '@/db/schema';

async function main() {
    const sampleSaltDeductions = [
        {
            year: 2024,
            filingStatus: 'Single',
            deductionCap: 10000,
            phaseoutThreshold: null,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Married Filing Jointly',
            deductionCap: 10000,
            phaseoutThreshold: null,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Married Filing Separately',
            deductionCap: 5000,
            phaseoutThreshold: null,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            deductionCap: 40000,
            phaseoutThreshold: 500000,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Married Filing Jointly',
            deductionCap: 40000,
            phaseoutThreshold: 500000,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Married Filing Separately',
            deductionCap: 20000,
            phaseoutThreshold: 250000,
            createdAt: new Date('2025-01-01').toISOString(),
        },
    ];

    await db.insert(saltDeductionHistory).values(sampleSaltDeductions);
    
    console.log('✅ SALT deduction history seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});