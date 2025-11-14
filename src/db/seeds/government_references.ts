import { db } from '@/db';
import { governmentReferences } from '@/db/schema';

async function main() {
    const sampleReferences = [
        {
            category: 'IRS Notice',
            title: '2025 Retirement Plan Contribution Limits',
            citationNumber: 'Notice 2024-80',
            url: 'https://www.irs.gov/pub/irs-drop/n-24-80.pdf',
            publishedDate: '2024-11-01',
            description: 'Annual inflation adjustments for retirement plan contribution limits including 401(k), IRA, SIMPLE IRA, and SEP IRA plans for tax year 2025.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'Revenue Procedure',
            title: '2026 Tax Year Inflation Adjustments',
            citationNumber: 'Rev. Proc. 2025-32',
            url: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf',
            publishedDate: '2025-10-09',
            description: 'Comprehensive inflation adjustments for more than 60 tax provisions affecting individual and business taxpayers for tax year 2026.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'IRS Notice',
            title: 'Car Loan Interest Reporting Guidance',
            citationNumber: 'Notice 2025-57',
            url: 'https://www.irs.gov/pub/irs-drop/n-25-57.pdf',
            publishedDate: '2025-10-21',
            description: 'Transitional guidance for lenders and taxpayers regarding IRC §6050AA reporting requirements for qualified passenger vehicle loan interest deductions.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'Public Law',
            title: 'One Big Beautiful Bill Act',
            citationNumber: 'P.L. 119-21',
            url: 'https://www.congress.gov/119/plaws/publ21/PLAW-119publ21.pdf',
            publishedDate: '2025-07-04',
            description: 'Major 2025 tax legislation containing permanent and temporary tax provisions including Section 179 expansion, bonus depreciation restoration, QBI deduction permanence, and new individual deductions.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'IRS Publication',
            title: "Employer's Tax Guide (2025)",
            citationNumber: 'Publication 15',
            url: 'https://www.irs.gov/publications/p15',
            publishedDate: '2025-01-01',
            description: 'Comprehensive guide for employers covering Social Security and Medicare tax rates, federal income tax withholding, and employment tax reporting requirements.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'IRS Publication',
            title: 'Tax Withholding and Estimated Tax (2025)',
            citationNumber: 'Publication 505',
            url: 'https://www.irs.gov/publications/p505',
            publishedDate: '2025-01-01',
            description: 'Guidance on tax withholding from wages, pensions, and other income, as well as estimated tax payment requirements for self-employed individuals and other taxpayers.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'Federal Website',
            title: 'IRS Tax Brackets and Rates',
            citationNumber: 'IRS.gov',
            url: 'https://www.irs.gov/filing/federal-income-tax-rates-and-brackets',
            publishedDate: '2024-01-01',
            description: 'Official federal income tax bracket information updated annually, showing marginal tax rates for all filing statuses and income levels.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'Federal Website',
            title: 'SSA 2025 COLA Fact Sheet',
            citationNumber: 'SSA Fact Sheet',
            url: 'https://www.ssa.gov/news/press/factsheets/colafacts2025.pdf',
            publishedDate: '2024-10-10',
            description: 'Social Security Administration announcement of 2025 cost-of-living adjustments, Social Security wage base limits, and benefit calculation thresholds.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'Treasury Guidance',
            title: 'OBBBA Implementation',
            citationNumber: 'Treasury Guidance 2025-1',
            url: 'https://home.treasury.gov/',
            publishedDate: '2025-07-04',
            description: 'Department of Treasury implementation guidance for the One Big Beautiful Bill Act, including regulatory timelines and taxpayer compliance requirements.',
            createdAt: new Date().toISOString(),
        },
        {
            category: 'Revenue Procedure',
            title: 'Rev. Proc. 2025-28',
            citationNumber: 'Rev. Proc. 2025-28',
            url: 'https://www.irs.gov/irb/2025-38_IRB',
            publishedDate: '2025-09-15',
            description: 'Procedures for making elections and method changes related to research and development expenditure deductions under restored IRC §174 immediate expensing rules.',
            createdAt: new Date().toISOString(),
        },
    ];

    await db.insert(governmentReferences).values(sampleReferences);
    
    console.log('✅ Government references seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});