import { db } from '@/db';
import { taxBrackets } from '@/db/schema';

async function main() {
    const sampleTaxBrackets = [
        // 2024 Single Filer Tax Brackets
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 0,
            bracketMax: 11600,
            taxRate: 0.10,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 11601,
            bracketMax: 47150,
            taxRate: 0.12,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 47151,
            bracketMax: 100525,
            taxRate: 0.22,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 100526,
            bracketMax: 191950,
            taxRate: 0.24,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 191951,
            bracketMax: 243725,
            taxRate: 0.32,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 243726,
            bracketMax: 609350,
            taxRate: 0.35,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            filingStatus: 'Single',
            bracketMin: 609351,
            bracketMax: null,
            taxRate: 0.37,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        // 2025 Single Filer Tax Brackets
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 0,
            bracketMax: 11925,
            taxRate: 0.10,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 11926,
            bracketMax: 48475,
            taxRate: 0.12,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 48476,
            bracketMax: 103350,
            taxRate: 0.22,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 103351,
            bracketMax: 197300,
            taxRate: 0.24,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 197301,
            bracketMax: 250525,
            taxRate: 0.32,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 250526,
            bracketMax: 626350,
            taxRate: 0.35,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            filingStatus: 'Single',
            bracketMin: 626351,
            bracketMax: null,
            taxRate: 0.37,
            createdAt: new Date('2025-01-01').toISOString(),
        },
    ];

    await db.insert(taxBrackets).values(sampleTaxBrackets);
    
    console.log('✅ Tax brackets seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});