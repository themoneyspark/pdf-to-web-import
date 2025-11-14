import { db } from '@/db';
import { retirementLimits } from '@/db/schema';

async function main() {
    const sampleRetirementLimits = [
        {
            year: 2024,
            accountType: '401k',
            contributionLimit: 23000,
            catchUpLimit: 7500,
            ageRequirement: 50,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            accountType: 'IRA',
            contributionLimit: 7000,
            catchUpLimit: 1000,
            ageRequirement: 50,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            accountType: 'SIMPLE IRA',
            contributionLimit: 16000,
            catchUpLimit: 3500,
            ageRequirement: 50,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2024,
            accountType: 'SEP IRA',
            contributionLimit: 69000,
            catchUpLimit: null,
            ageRequirement: null,
            createdAt: new Date('2024-01-01').toISOString(),
        },
        {
            year: 2025,
            accountType: '401k',
            contributionLimit: 23500,
            catchUpLimit: 7500,
            ageRequirement: 50,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            accountType: 'IRA',
            contributionLimit: 7000,
            catchUpLimit: 1000,
            ageRequirement: 50,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            accountType: 'SIMPLE IRA',
            contributionLimit: 16500,
            catchUpLimit: 3500,
            ageRequirement: 50,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            accountType: 'SEP IRA',
            contributionLimit: 70000,
            catchUpLimit: null,
            ageRequirement: null,
            createdAt: new Date('2025-01-01').toISOString(),
        },
        {
            year: 2025,
            accountType: '401k Special Catch-up',
            contributionLimit: 23500,
            catchUpLimit: 11250,
            ageRequirement: 60,
            createdAt: new Date('2025-01-01').toISOString(),
        },
    ];

    await db.insert(retirementLimits).values(sampleRetirementLimits);
    
    console.log('✅ Retirement limits seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});