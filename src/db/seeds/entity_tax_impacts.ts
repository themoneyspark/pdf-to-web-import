import { db } from '@/db';
import { entityTaxImpacts } from '@/db/schema';

async function main() {
    const sampleEntityTaxImpacts = [
        {
            entityType: 'C-Corp',
            provisionName: 'Section 179 Expansion',
            impactDescription: 'C-Corporations can deduct up to $2,500,000 in equipment purchases (up from $1,220,000) with immediate write-off capability. Phase-out begins at $4,000,000 in annual equipment purchases.',
            potentialSavings: '$300,000+ in first-year tax savings',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'C-Corp',
            provisionName: '100% Bonus Depreciation',
            impactDescription: 'Immediate 100% write-off for qualifying property placed in service after 1/19/2025, providing significant cash flow benefits for capital-intensive businesses.',
            potentialSavings: '$500,000+ depending on purchases',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'C-Corp',
            provisionName: 'R&D Deduction Restoration',
            impactDescription: 'Immediate deduction for research and development costs instead of mandatory 5-year amortization, improving cash flow for technology and innovation-focused corporations.',
            potentialSavings: '$100,000+ annually',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'S-Corp',
            provisionName: 'QBI Deduction Permanent',
            impactDescription: '20% qualified business income deduction for pass-through entities made permanent, providing long-term tax planning certainty for S-Corporation shareholders.',
            potentialSavings: '$40,000 per $200,000 of QBI',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'S-Corp',
            provisionName: 'Section 179 Expansion',
            impactDescription: '$2,500,000 immediate equipment deduction available to S-Corporations, significantly higher than previous $1,220,000 limit.',
            potentialSavings: '$300,000+ in first-year savings',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'S-Corp',
            provisionName: 'Tip Income Deduction',
            impactDescription: 'Service businesses structured as S-Corporations can deduct tip income paid to employees. Temporary provision applies 2025-2028.',
            potentialSavings: '$5,000-$50,000 annually',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Partnership',
            provisionName: 'QBI Deduction Permanent',
            impactDescription: 'Partners eligible for 20% qualified business income deduction on their distributive share of partnership income. Permanent tax benefit provides planning certainty.',
            potentialSavings: '$40,000 per $200,000 of QBI per partner',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Partnership',
            provisionName: 'Section 179 Expansion',
            impactDescription: 'Partnerships can elect $2,500,000 Section 179 deduction for equipment and qualifying property at the partnership level.',
            potentialSavings: '$300,000+ in first-year savings',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Partnership',
            provisionName: '100% Bonus Depreciation',
            impactDescription: 'Full expensing available for qualifying partnership property placed in service after 1/19/2025, improving partner basis and cash distributions.',
            potentialSavings: '$500,000+ depending on asset purchases',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'LLC',
            provisionName: 'QBI Deduction Permanent',
            impactDescription: 'LLCs taxed as partnerships or S-Corporations receive permanent 20% qualified business income deduction for members/shareholders.',
            potentialSavings: '$40,000 per $200,000 of QBI',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'LLC',
            provisionName: 'Section 179 Expansion',
            impactDescription: 'LLCs can deduct $2,500,000 in equipment and qualifying property immediately, up from prior $1,220,000 limit.',
            potentialSavings: '$300,000+ in first-year savings',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'LLC',
            provisionName: 'Overtime Pay Deduction',
            impactDescription: 'LLCs with employees can deduct overtime compensation paid. Temporary provision applies 2025-2028.',
            potentialSavings: '$10,000-$100,000 annually',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Sole Proprietor',
            provisionName: 'QBI Deduction Permanent',
            impactDescription: 'Self-employed individuals get permanent 20% qualified business income deduction on Schedule C business income, subject to income limitations.',
            potentialSavings: '$40,000 per $200,000 of QBI',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Sole Proprietor',
            provisionName: 'Tip Income Deduction',
            impactDescription: 'Self-employed service providers can deduct tips received. Applies to sole proprietors in service industries. Temporary provision 2025-2028.',
            potentialSavings: '$5,000-$30,000 annually',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Sole Proprietor',
            provisionName: 'Section 179 Expansion',
            impactDescription: 'Sole proprietors can deduct $2,500,000 in business equipment and property purchases immediately on Schedule C.',
            potentialSavings: '$300,000+ in first-year savings',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Individual',
            provisionName: 'SALT Deduction Increase',
            impactDescription: 'State and local tax deduction cap raised from $10,000 to $40,000 for single and joint filers (2025-2029), benefiting taxpayers in high-tax states.',
            potentialSavings: '$7,000-$10,000 tax savings in high-tax states',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Individual',
            provisionName: 'Car Loan Interest Deduction',
            impactDescription: 'Personal auto loan interest deductible for loans on US-assembled vehicles. Temporary provision applies 2025-2028 with domestic assembly requirements.',
            potentialSavings: '$1,000-$3,000 annually',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Individual',
            provisionName: 'Enhanced Senior Deduction',
            impactDescription: 'Taxpayers age 65 and older receive increased standard deduction with income-based phase-outs. Temporary provision 2025-2028.',
            potentialSavings: '$2,000-$5,000 additional deduction',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
        {
            entityType: 'Individual',
            provisionName: 'Standard Deduction Increase',
            impactDescription: 'Standard deduction increased by $1,150 (single) to $2,300 (married filing jointly) for 2025, reducing taxable income for most taxpayers.',
            potentialSavings: '$250-$500 tax savings',
            year: 2025,
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(entityTaxImpacts).values(sampleEntityTaxImpacts);
    
    console.log('✅ Entity tax impacts seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});