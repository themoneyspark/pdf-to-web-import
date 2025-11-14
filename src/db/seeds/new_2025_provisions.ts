import { db } from '@/db';
import { newProvisions } from '@/db/schema';

async function main() {
    const sampleProvisions = [
        {
            provisionName: 'Qualified Tip Income Deduction',
            description: 'Allows deduction for tip income received by employees in service industries. Deduction claimed on Schedule 1-A.',
            effectiveDate: '2025-01-01',
            expirationDate: '2028-12-31',
            publicLawCitation: 'P.L. 119-21',
            ircSection: 'IRC §163',
            isTemporary: true,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'Qualified Overtime Pay Deduction',
            description: 'Allows deduction for overtime compensation earned by employees. Applies to overtime pay exceeding standard 40-hour workweek. Deduction claimed on Schedule 1-A.',
            effectiveDate: '2025-01-01',
            expirationDate: '2028-12-31',
            publicLawCitation: 'P.L. 119-21',
            ircSection: 'Schedule 1-A',
            isTemporary: true,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'Qualified Passenger Vehicle Loan Interest Deduction',
            description: 'Personal auto loan interest deduction for loans on US-assembled vehicles. Must meet domestic assembly requirements and vehicle price limits.',
            effectiveDate: '2025-01-01',
            expirationDate: '2028-12-31',
            publicLawCitation: 'P.L. 119-21',
            ircSection: 'IRC §163(h)(4), §6050AA',
            isTemporary: true,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'Enhanced Senior Deduction',
            description: 'Increased standard deduction for taxpayers age 65 and older, subject to modified adjusted gross income phase-out thresholds. Additional deduction amount phases out for higher-income seniors.',
            effectiveDate: '2025-01-01',
            expirationDate: '2028-12-31',
            publicLawCitation: 'P.L. 119-21',
            ircSection: 'Schedule 1-A',
            isTemporary: true,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'Section 179 Expansion',
            description: 'Section 179 deduction limit increased to $2,500,000 (up from $1,220,000), with phase-out beginning at $4,000,000 in equipment purchases. Permanent expansion effective for tax years beginning after December 31, 2024.',
            effectiveDate: '2025-01-01',
            expirationDate: null,
            publicLawCitation: 'P.L. 119-21, Section 70321',
            ircSection: 'IRC §179',
            isTemporary: false,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: '100% Bonus Depreciation Restoration',
            description: 'Permanent 100% bonus depreciation for qualified property placed in service after January 19, 2025. Restores full expensing for eligible business property acquisitions.',
            effectiveDate: '2025-01-19',
            expirationDate: null,
            publicLawCitation: 'P.L. 119-21, Section 70322',
            ircSection: 'IRC §168(k)',
            isTemporary: false,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'QBI Deduction Made Permanent',
            description: '20% qualified business income deduction for pass-through entities made permanent. Applies to sole proprietors, S corporations, partnerships, and LLCs taxed as pass-throughs. Subject to income limitations and specified service trade or business rules.',
            effectiveDate: '2025-01-01',
            expirationDate: null,
            publicLawCitation: 'P.L. 119-21, Section 70105',
            ircSection: 'IRC §199A',
            isTemporary: false,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'R&D Deduction Permanent Restoration',
            description: 'Immediate expensing of research and development costs restored permanently. Eliminates mandatory 5-year amortization requirement, allowing businesses to deduct R&D expenditures in the year incurred.',
            effectiveDate: '2025-01-01',
            expirationDate: null,
            publicLawCitation: 'P.L. 119-21, Section 70302',
            ircSection: 'IRC §174',
            isTemporary: false,
            createdAt: new Date().toISOString(),
        },
        {
            provisionName: 'TCJA Provisions Permanent',
            description: 'Individual tax rates, doubled standard deduction, increased child tax credit, and other Tax Cuts and Jobs Act provisions made permanent. Removes 2025 sunset date for individual tax provisions.',
            effectiveDate: '2025-01-01',
            expirationDate: null,
            publicLawCitation: 'P.L. 119-21',
            ircSection: 'Various IRC sections',
            isTemporary: false,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(newProvisions).values(sampleProvisions);
    
    console.log('✅ New 2025 provisions seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});