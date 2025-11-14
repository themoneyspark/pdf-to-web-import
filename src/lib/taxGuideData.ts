export interface TaxGuideSection {
  id: string;
  title: string;
  content: string;
  subsections?: TaxGuideSection[];
  hasChart?: string; // Add chart type identifier
}

export const taxGuideData: TaxGuideSection[] = [
  {
    id: "intro",
    title: "2025 Tax Planning Guide by KGOB CPA Partners",
    content: `
      <h2>Navigating the 2025 Tax Landscape for Business Owners & High-Net-Worth Individuals</h2>
      <p>The 2025 tax year brings significant changes and permanent provisions that impact business owners, executives, and high-income individuals. KGOB CPA Partners' comprehensive research identifies key opportunities to optimize your tax position and strategic financial planning.</p>
      <p>Recent federal legislation has established certainty around several tax provisions including modified rate structures, enhanced deduction limits, and revised treatment of business income. Understanding these changes is essential for effective year-end planning and long-term wealth management.</p>
      <p>For entrepreneurs, executives, and affluent families subject to higher marginal rates and specialized taxes, minimizing liability requires sophisticated strategies. This guide presents KGOB's research-backed recommendations for navigating complex scenarios including investment taxation, executive compensation, business deductions, and wealth preservation.</p>
      <p><strong>About KGOB CPA Partners:</strong> KohariGonzalez Oneyear&Brown (KGOB) is a leading advisory firm specializing in tax planning, business consulting, and wealth management for high-net-worth individuals and growth-oriented businesses. Our mission: Let's Talk Growth<sup>®</sup>.</p>
    `,
    hasChart: "taxStrategies"
  },
  {
    id: "business-operations",
    title: "Business Operations & Strategic Deductions",
    content: `
      <p>Leverage current provisions to optimize your business tax position.</p>
      <p>Strategic timing of business income and expenses remains one of the most powerful tools for tax management. KGOB's analysis shows that proper planning around fiscal year-end can generate substantial savings for business owners and self-employed professionals.</p>
    `,
    subsections: [
      {
        id: "timing-strategy",
        title: "Revenue & Expense Timing Strategies",
        content: `
          <p>Effective management of when income is recognized and expenses are deducted can significantly impact your annual tax burden. For businesses using cash accounting methods, timing flexibility offers particular advantages.</p>
          <p><strong>Revenue Deferral Techniques:</strong></p>
          <ul>
            <li>Delaying year-end invoicing for January delivery and payment</li>
            <li>Structuring contract payments to align with your tax optimization strategy</li>
            <li>Optimizing the timing of capital asset dispositions to control gain recognition</li>
            <li>Managing inventory levels strategically to control cost of goods sold calculations</li>
          </ul>
          <p><strong>Expense Acceleration Approaches:</strong></p>
          <ul>
            <li>Prepaying business insurance premiums for the following year</li>
            <li>Acquiring eligible equipment and technology before year-end</li>
            <li>Settling outstanding vendor invoices and accounts payable early</li>
            <li>Making charitable contributions through business entities when beneficial</li>
            <li>Paying bonuses and performance-based compensation before December 31st</li>
          </ul>
          <p>KGOB recommends comprehensive tax projection modeling to identify optimal timing strategies based on your specific business situation and multi-year tax outlook.</p>
        `,
      },
      {
        id: "state-local-taxes",
        title: "State & Local Tax Optimization",
        content: `
          <h3>Enhanced SALT Deduction Caps for 2025</h3>
          <p>The limitation on state and local tax deductions has been significantly modified for 2025 and beyond. Individual taxpayers can now deduct up to $40,000 in combined state and local taxes ($20,000 for those filing separately), representing a quadrupling of the previous $10,000 threshold.</p>
          <p><strong>Key Provisions for High-Income Taxpayers:</strong></p>
          <ul>
            <li>The enhanced $40,000 cap begins phasing down when modified adjusted gross income exceeds $500,000</li>
            <li>The reduction rate is 30% of excess income above the $500,000 threshold</li>
            <li>The floor remains at $10,000 even for highest earners regardless of income level</li>
            <li>Strategic income timing and state residency planning can help maximize this benefit</li>
          </ul>
          <p>KGOB CPA Partners recommends reviewing state residency strategies, especially for business owners with operations in multiple jurisdictions. The enhanced deduction makes certain state tax environments more favorable than in recent years, particularly for high-income earners in high-tax states.</p>
          <p><strong>Multi-State Planning Considerations:</strong> If you conduct business across state lines, proper apportionment and allocation strategies can significantly reduce overall state tax liability. KGOB assists clients in nexus analysis, entity structuring, and compliance optimization.</p>
        `,
        hasChart: "saltDeduction"
      },
      {
        id: "equipment-depreciation",
        title: "Equipment Acquisition & Depreciation Benefits",
        content: `
          <p>Section 179 expensing remains a powerful tool for businesses investing in qualifying property. For 2025, businesses can immediately expense up to $1,250,000 in equipment and machinery purchases, with the benefit phasing out once total acquisitions exceed $3,130,000.</p>
          <h4>Eligible Property Categories:</h4>
          <ul>
            <li>Manufacturing and production equipment including machinery and tools</li>
            <li>Computer systems, servers, and technology infrastructure investments</li>
            <li>Office furniture, fixtures, and specialized equipment</li>
            <li>Certain qualifying business vehicles subject to specific limitations</li>
            <li>Qualified improvement property for leasehold and commercial spaces</li>
            <li>Off-the-shelf computer software used in business operations</li>
          </ul>
          <p>Bonus depreciation continues to be available, though at reduced percentages compared to prior years. Strategic planning around asset acquisition timing can optimize depreciation benefits across multiple tax years and help manage taxable income levels.</p>
          <p><strong>KGOB Planning Tip:</strong> Consider purchasing eligible equipment before year-end even if not immediately needed, as the Section 179 deduction is based on the placed-in-service date. This can accelerate substantial tax savings into the current year.</p>
        `,
        hasChart: "section179"
      },
      {
        id: "business-deductions",
        title: "New Temporary Business Deductions",
        content: `
          <p>Several new deduction opportunities are available through 2028 for qualifying taxpayers. KGOB CPA Partners has thoroughly researched these provisions to help clients maximize benefits:</p>
          <ol>
            <li><strong>Service Industry Income Deduction:</strong> Certain service businesses can deduct up to $25,000 of qualified tips and gratuity income received by owners and partners, subject to income phase-out limitations beginning at $150,000 AGI.</li>
            <li><strong>Extended Hours Compensation Deduction:</strong> Business owners working extended schedules may deduct up to $12,500 ($25,000 married filing jointly) of qualifying overtime-equivalent compensation. Documentation of hours worked is essential for substantiation.</li>
            <li><strong>Business Vehicle Financing Deduction:</strong> Interest expense on loans for qualifying business vehicles may be deductible up to $10,000 annually when the vehicle meets specific business use requirements (generally 50% or more business use).</li>
            <li><strong>Senior Business Owner Benefit:</strong> A temporary $6,000 deduction for business owners and self-employed individuals age 65 and older, designed to offset healthcare and retirement planning costs. Available regardless of other deduction elections.</li>
          </ol>
          <p>KGOB advises careful documentation of eligibility requirements and maintaining contemporaneous records, as these provisions include specific income thresholds, qualifying criteria, and potential audit scrutiny. Our team can help you navigate compliance requirements while maximizing available benefits.</p>
        `,
      },
      {
        id: "amt-planning",
        title: "Alternative Minimum Tax Considerations",
        content: `
          <p>The alternative minimum tax (AMT) system operates parallel to regular tax rules, with a top rate of 28% compared to the 37% ordinary income tax rate. However, AMT applies to a broader income base by disallowing certain deductions and including specific preference items.</p>
          <h4>AMT Exemptions for 2025</h4>
          <p>The AMT exemption amounts for 2025 are $88,100 for single filers and $137,000 for married couples filing jointly. These amounts phase out at higher income levels ($626,350 for singles and $1,252,700 for joint filers).</p>
          <h4>Strategic AMT Planning by KGOB</h4>
          <p>If AMT exposure is likely based on your income profile and deduction patterns:</p>
          <ul>
            <li>Accelerate recognition of income to potentially benefit from the lower 28% AMT rate versus 35-37% regular rates</li>
            <li>Defer state tax payments that won't be deductible under AMT rules</li>
            <li>Carefully time exercise of incentive stock options to manage AMT preference items</li>
            <li>Consider bunching charitable contributions in alternate years to maximize regular tax benefit</li>
            <li>Evaluate timing of property tax payments and mortgage refinancing decisions</li>
          </ul>
          <p>Multi-year tax projection modeling performed by KGOB helps identify optimal strategies for clients facing AMT scenarios, ensuring decisions align with both current-year and future-year tax impact.</p>
        `,
      },
      {
        id: "employment-taxes",
        title: "Employment & Self-Employment Tax Management",
        content: `
          <p>Business owners and executives must understand the employment tax landscape beyond income taxes. For 2025, the Social Security wage base rises to $176,100, meaning the 12.4% Social Security tax (employee and employer combined) applies up to that threshold. The 2.9% Medicare tax applies to all earned income without limitation.</p>
          <h4>Additional Medicare Tax Considerations</h4>
          <p>High-income individuals face an additional 0.9% Medicare tax on wages and self-employment income exceeding $200,000 (single filers) or $250,000 (joint filers). This surtax applies to combined FICA wages and net self-employment earnings above the threshold, creating planning opportunities around income timing and entity structure.</p>
          <h4>Business Structure Impact on Payroll Taxes</h4>
          <p>Choice of entity (S corporation vs. LLC vs. C corporation) significantly impacts employment tax exposure. KGOB CPA Partners recommends regular review of business structure to ensure optimal tax treatment as income levels change and business activities evolve.</p>
          <p><strong>S Corporation Planning:</strong> S corporation owners can potentially reduce self-employment taxes by taking reasonable salaries plus distributions. KGOB assists in determining appropriate compensation levels that satisfy IRS requirements while optimizing overall tax position.</p>
        `,
        hasChart: "employmentTax"
      },
    ],
  },
  {
    id: "executive-wealth",
    title: "Executive Compensation & Equity Planning",
    content: `
      <p>Sophisticated planning strategies for stock-based compensation and executive benefits.</p>
      <p>Executive compensation packages increasingly include equity-based awards that require careful tax planning. The timing of exercise decisions, holding period management, and AMT considerations can dramatically impact after-tax value. KGOB's research identifies optimal strategies for various equity compensation scenarios.</p>
    `,
    subsections: [
      {
        id: "equity-awards",
        title: "Restricted Equity Awards",
        content: `
          <p>Restricted equity awards represent company stock granted subject to vesting requirements or other forfeiture conditions. Taxation typically occurs when restrictions lapse and the equity becomes fully owned by the recipient.</p>
          <h4>Section 83(b) Election Strategy</h4>
          <p>Executives receiving restricted stock can elect to recognize income immediately at grant rather than waiting for vesting. This election must be filed within 30 days of the grant date with both the IRS and your employer.</p>
          <p><strong>Strategic Benefits Identified by KGOB:</strong></p>
          <ul>
            <li>Future appreciation taxed as capital gains (0%, 15%, or 20%) rather than compensation income (up to 37%)</li>
            <li>Starts the holding period clock for long-term capital gains treatment immediately</li>
            <li>Potentially lower overall tax if stock value increases substantially before vesting</li>
            <li>Eliminates future ordinary income recognition on appreciation between grant and vesting</li>
            <li>Can result in significant tax savings for rapidly appreciating company stock</li>
          </ul>
          <p><strong>Risks to Consider:</strong></p>
          <ul>
            <li>Immediate tax payment required before stock is liquid or tradeable</li>
            <li>Tax paid is non-refundable if employment terminates before vesting completion</li>
            <li>Accelerated tax recognition may push total income into higher marginal brackets</li>
            <li>Value decline after election doesn't reduce taxes already paid</li>
            <li>Requires out-of-pocket cash to pay taxes on unrealized gains</li>
          </ul>
          <p>KGOB CPA Partners typically recommends 83(b) elections when the current fair market value is low relative to expected future appreciation, when vesting risk is minimal, and when cash is available to pay the current-year tax liability.</p>
        `,
      },
      {
        id: "stock-units",
        title: "Restricted Stock Units & Deferred Compensation",
        content: `
          <p>Restricted stock units (RSUs) represent a contractual right to receive shares or cash equivalent after satisfaction of vesting conditions. Unlike restricted stock grants, RSUs cannot utilize Section 83(b) elections, eliminating the opportunity to convert future appreciation to capital gains treatment.</p>
          <p>However, RSUs offer limited deferral flexibility under certain circumstances. While taxation generally occurs when shares are actually delivered (not merely when they vest), most employers deliver shares immediately upon vesting. Some companies allow executives to defer delivery beyond vesting, creating additional tax planning opportunities.</p>
          <h4>Tax Planning Considerations from KGOB</h4>
          <ul>
            <li>Coordinate RSU vesting timing with other income sources to manage marginal bracket exposure</li>
            <li>Consider same-day sales to generate immediate liquidity for tax payments and estimated tax obligations</li>
            <li>Evaluate holding acquired shares for long-term capital gains treatment on future appreciation</li>
            <li>Monitor combined impact with AMT calculations and net investment income tax exposure</li>
            <li>Consider charitable giving strategies using appreciated RSU shares after acquisition</li>
          </ul>
          <p><strong>Withholding Considerations:</strong> Employers typically withhold at supplemental wage rates (often 22% federal), which may be insufficient for high earners. KGOB recommends calculating true tax liability and making estimated tax payments to avoid underpayment penalties.</p>
        `,
      },
      {
        id: "incentive-options",
        title: "Incentive Stock Options",
        content: `
          <p>Incentive stock options (ISOs) provide the right to purchase company stock at a predetermined exercise price. ISOs receive preferential tax treatment when specific holding period and employment requirements are satisfied.</p>
          <h4>Tax Treatment Overview:</h4>
          <ul>
            <li>No taxation upon grant of the option (no income recognized)</li>
            <li>No regular income tax upon exercise of the option</li>
            <li>Gain taxed as long-term capital gain (maximum 20%) if holding periods are met</li>
            <li>Two-year hold from grant date AND one-year hold from exercise date required</li>
            <li>Special ISO limits apply: $100,000 of stock value (at grant) can first become exercisable annually</li>
          </ul>
          <p><strong>Alternative Minimum Tax Critical Warning:</strong> Although no regular income tax applies upon exercise, ISOs create an AMT preference item equal to the spread between fair market value at exercise and the exercise price. This can trigger substantial AMT liability even though no cash is received from the exercise.</p>
          <h4>KGOB's ISO Exercise Strategy Framework</h4>
          <p>Optimal ISO exercise strategies depend on multiple factors including current stock price trajectory, AMT exposure profile, personal liquidity needs, and portfolio concentration risk. Common approaches include:</p>
          <ul>
            <li>Annual AMT-limited exercises: Exercise only enough ISOs to stay below AMT trigger or minimize AMT impact</li>
            <li>Exercise and immediate sale (disqualifying disposition) when AMT impact would be excessive or cash is needed</li>
            <li>Systematic multi-year exercise programs to diversify holdings over time and manage tax impact</li>
            <li>Coordination with other equity compensation vesting events and anticipated income changes</li>
            <li>Pre-IPO exercises when fair market value equals exercise price (no AMT impact)</li>
          </ul>
          <p>KGOB's team can model various exercise scenarios to identify the optimal approach for your specific situation, considering both current-year and multi-year tax implications.</p>
        `,
      },
      {
        id: "nonqualified-options",
        title: "Non-Qualified Stock Options",
        content: `
          <p>Non-qualified stock options (NQSOs) trigger ordinary compensation income upon exercise, measured by the difference between fair market value at exercise and the exercise price paid. Unlike ISOs, NQSOs don't receive preferential capital gains treatment but also don't create AMT preference items.</p>
          <p>The spread at exercise is subject to all applicable employment taxes including Social Security (up to the $176,100 wage base for 2025), Medicare (2.9% on all income), and the additional Medicare tax (0.9% above $200,000/$250,000 thresholds) for high earners. Employers typically withhold taxes at exercise, but executives may need supplemental withholding or estimated tax payments to cover the full liability.</p>
          <h4>Exercise Timing Considerations</h4>
          <p>Strategic exercise timing managed by KGOB can address:</p>
          <ul>
            <li>Marginal tax rate exposure by spreading exercises across multiple years</li>
            <li>Additional Medicare tax and net investment income tax impact coordination</li>
            <li>AMT exposure minimization in years when AMT may apply to other income sources</li>
            <li>Coordination with other income events, bonus payments, and available deductions</li>
            <li>Retirement year exercises when income may be lower</li>
            <li>Year-end tax rate uncertainty management through strategic timing</li>
          </ul>
          <p>KGOB CPA Partners recommends comprehensive modeling of multi-year exercise scenarios to identify optimal timing patterns that minimize total lifetime tax burden while managing portfolio concentration risk and personal liquidity needs.</p>
        `,
      },
      {
        id: "deferred-plans",
        title: "Non-Qualified Deferred Compensation",
        content: `
          <p>Non-qualified deferred compensation (NQDC) arrangements allow executives to defer taxation of substantial compensation amounts beyond the annual limits applicable to qualified retirement plans like 401(k)s. These programs differ significantly from qualified plans in terms of taxation timing, creditor protection, and distribution flexibility.</p>
          <p><strong>Critical tax consideration:</strong> Employment taxes (Social Security and Medicare) become due when services are performed and amounts are no longer subject to substantial forfeiture risk, even though income tax may not be due until much later when distributions actually occur. This creates a timing mismatch between payroll tax obligations and income tax recognition.</p>
          <h4>Key Planning Points from KGOB</h4>
          <ul>
            <li>Deferral elections must typically be made before the service year begins (prior year for salary, before performance period for bonuses)</li>
            <li>Distribution timing options should be selected carefully based on retirement plans, expected income needs, and tax rate projections</li>
            <li>Consider state tax residency changes when scheduling distributions; moving to lower-tax states before distribution can save significantly</li>
            <li>Monitor company financial health given your status as an unsecured general creditor of the company</li>
            <li>Coordinate NQDC strategy with other retirement accounts, investment portfolios, and Social Security claiming strategies</li>
            <li>Understand haircut provisions and change-in-control acceleration features</li>
          </ul>
          <p>KGOB assists executives in modeling various deferral amounts and distribution timing scenarios to optimize both tax efficiency and long-term financial security. We consider multi-decade tax projections, state residency planning, and estate planning implications.</p>
        `,
      },
    ],
  },
  {
    id: "investment-strategy",
    title: "Investment Portfolio Tax Optimization",
    content: `
      <p>Maximize after-tax investment returns through strategic tax management.</p>
      <p>Successful investing requires consideration of tax consequences alongside risk and return objectives. KGOB's research demonstrates that tax-aware portfolio management can add 1-2% annually in additional after-tax returns over time, particularly for high-net-worth investors facing top marginal rates and additional surtaxes.</p>
    `,
    subsections: [
      {
        id: "capital-gains-strategy",
        title: "Capital Gains Management & Holding Periods",
        content: `
          <p>Investment holding periods dramatically impact tax efficiency. Assets held longer than one year qualify for preferential long-term capital gains rates, which can be up to 20 percentage points lower than ordinary income rates for high earners (37% ordinary vs. 20% LTCG maximum rates).</p>
          <p>For 2025, long-term capital gains rates are 0%, 15%, or 20% depending on taxable income levels. The 0% rate applies to investors in the 10% and 12% ordinary income brackets, with the threshold at $48,350 for single filers and $96,700 for joint filers. The 20% maximum rate applies above $533,400 (single) and $600,050 (joint).</p>
          <h4>Strategic Holding Considerations from KGOB</h4>
          <ul>
            <li>Track acquisition dates meticulously to ensure qualifying holding periods (one year and one day minimum)</li>
            <li>Consider holding assets an additional few days or weeks to cross the one-year threshold when close</li>
            <li>Evaluate tactical gain harvesting in low-income years to utilize lower tax brackets</li>
            <li>Coordinate realization of large gains with offsetting losses when possible through tax-loss harvesting</li>
            <li>Consider qualified opportunity zone investments for long-term capital gains deferral and elimination</li>
          </ul>
          <p>Short-term trading strategies must justify the substantial tax cost differential (potentially 17-20% higher rates) compared to buy-and-hold approaches. KGOB analyzes whether active trading alpha exceeds the incremental tax drag.</p>
        `,
        hasChart: "capitalGains"
      },
      {
        id: "niit-planning",
        title: "Net Investment Income Tax Planning",
        content: `
          <p>High-income investors face an additional 3.8% surtax on net investment income when modified adjusted gross income exceeds $200,000 (single), $250,000 (joint), or $125,000 (married filing separate) filers. This Medicare surtax applies to the lesser of net investment income or the amount by which MAGI exceeds the threshold.</p>
          <p><strong>Investment income subject to the 3.8% surtax includes:</strong></p>
          <ul>
            <li>Capital gains and losses from securities, real estate, and other investments</li>
            <li>Dividend and interest income from all sources</li>
            <li>Rental and royalty income (unless from an active business)</li>
            <li>Business income from passive activities and limited partnership interests</li>
            <li>Annuity distributions (investment earnings portion)</li>
            <li>Income from trading of financial instruments and commodities</li>
          </ul>
          <h4>NIIT Reduction Strategies by KGOB</h4>
          <p>KGOB CPA Partners recommends several approaches to minimize NIIT exposure:</p>
          <ul>
            <li>Actively participate in business activities and rental real estate to avoid passive classification</li>
            <li>Strategically time realization of gains and investment income across tax years</li>
            <li>Harvest losses systematically to offset gains and reduce net investment income</li>
            <li>Consider tax-exempt municipal bonds for fixed income allocations (interest not subject to NIIT)</li>
            <li>Utilize tax-deferred investment vehicles like variable annuities when appropriate for long-term holdings</li>
            <li>Manage income to stay below NIIT thresholds in specific years when possible</li>
            <li>Consider opportunity zone investments which can defer and potentially eliminate investment income</li>
          </ul>
          <p>The 3.8% NIIT combined with top ordinary rates (37%) and capital gains rates (20%) means effective marginal rates can reach 40.8% on ordinary investment income and 23.8% on long-term gains for top earners.</p>
        `,
      },
      {
        id: "loss-harvesting",
        title: "Tax Loss Harvesting & Loss Utilization",
        content: `
          <p>Investment losses provide valuable tax benefits but must be properly realized and utilized. Capital losses offset capital gains dollar-for-dollar, with net losses deductible against ordinary income up to $3,000 annually ($1,500 for married filing separately). This provides immediate tax benefit, particularly for high earners in top brackets.</p>
          <p>Excess losses carry forward indefinitely to future years, retaining their character as short-term or long-term depending on the original holding period. This creates opportunities for multi-year tax planning and strategic loss utilization.</p>
          <h4>Wash Sale Rules and Compliance</h4>
          <p>The wash sale rule prevents claiming losses when substantially identical securities are repurchased within 30 days before or after the sale date (61-day total window). This rule applies across all accounts including IRAs, 401(k)s, and spouse/dependent accounts held with the same or different custodians.</p>
          <p><strong>KGOB strategies to navigate wash sale rules:</strong></p>
          <ul>
            <li>Substitute similar but not substantially identical securities during the 61-day restricted window</li>
            <li>Harvest losses early in the year to allow repurchase flexibility before year-end</li>
            <li>Coordinate across all related accounts (personal, spouse, IRA, 401k) to avoid inadvertent violations</li>
            <li>Consider index funds or ETFs tracking similar but different markets (e.g., S&P 500 vs. total market)</li>
            <li>Use sector rotation to maintain market exposure while avoiding wash sales</li>
            <li>Double the position before sale, wait 31 days, then sell original shares</li>
          </ul>
          <p>KGOB employs sophisticated loss harvesting throughout the year, not just at year-end, to capture maximum tax benefit while maintaining target portfolio allocations.</p>
        `,
      },
      {
        id: "fund-taxation",
        title: "Mutual Fund & ETF Tax Efficiency",
        content: `
          <p>Pooled investment vehicles offer diversification benefits but create unique tax considerations. Actively managed mutual funds with high portfolio turnover can generate substantial short-term capital gains taxed at ordinary income rates (up to 37% plus 3.8% NIIT). Year-end distribution timing also significantly impacts tax efficiency.</p>
          <h4>Fund Tax Considerations from KGOB</h4>
          <ul>
            <li>Review turnover ratios and historical distribution patterns before investing in taxable accounts</li>
            <li>Track reinvested distributions to adjust cost basis properly and avoid double taxation on future sales</li>
            <li>Avoid purchasing funds shortly before year-end distribution dates (buying the dividend)</li>
            <li>Consider tax-managed funds, index funds, or ETFs for taxable accounts</li>
            <li>Maintain detailed records of cost basis for partial sale scenarios; specify lots for sale when beneficial</li>
            <li>Place tax-inefficient investments (REITs, bonds, active funds) in retirement accounts when possible</li>
            <li>Hold tax-efficient investments (individual stocks, index ETFs, municipal bonds) in taxable accounts</li>
          </ul>
          <p>KGOB CPA Partners typically recommends ETFs over mutual funds for taxable accounts due to superior tax efficiency from the in-kind creation/redemption process that minimizes recognition of embedded gains. This structural advantage can save 0.5-1% annually in tax drag for high-net-worth investors.</p>
        `,
      },
      {
        id: "qualified-business-stock",
        title: "Qualified Small Business Stock Benefits",
        content: `
          <p>Investments in qualifying small businesses can offer extraordinary tax benefits through Section 1202 and Section 1244 provisions. These incentives encourage investment in emerging companies while providing significant downside protection and upside gain exclusion.</p>
          <h4>Section 1244 - Ordinary Loss Treatment</h4>
          <p>When qualifying small business stock is sold at a loss or becomes worthless, investors can treat up to $50,000 ($100,000 joint filers) as an ordinary loss rather than a capital loss. This allows immediate offset against salary, business income, and other ordinary income instead of limiting use to the $3,000 annual capital loss limitation.</p>
          <p>Qualifying requirements include corporation must have total capitalization of $1 million or less when stock is issued, and stock must be acquired directly from the company in exchange for money or property (not from another shareholder).</p>
          <h4>Section 1202 - Gain Exclusion Benefits</h4>
          <p>Qualified small business (QSB) stock held for more than five years qualifies for exclusion of up to 100% of gain from federal income taxation, subject to limitations based on the greater of $10 million or 10 times the investor's adjusted cost basis in the stock.</p>
          <p><strong>Enhanced for 2025:</strong> New intermediate holding period exclusion percentages:</p>
          <ul>
            <li>100% exclusion for stock held at least 5 years (traditional benefit)</li>
            <li>75% exclusion for stock held at least 4 years but less than 5 years</li>
            <li>50% exclusion for stock held at least 3 years but less than 4 years</li>
            <li>No exclusion for holdings under 3 years</li>
          </ul>
          <p>Additionally, investors can defer gains by rolling proceeds into new QSB stock within 60 days (Section 1045), allowing continued tax deferral across multiple investments and potentially achieving the full 100% exclusion on subsequent sales.</p>
          <p><strong>KGOB Planning for Entrepreneurs:</strong> QSBS can provide complete federal tax elimination on millions in gains. KGOB helps clients structure investments, maintain qualification requirements, and maximize this powerful benefit. Even at state level, many states (though not all) conform to federal QSBS treatment.</p>
        `,
      },
      {
        id: "passive-activity",
        title: "Passive Activity Loss Rules & Planning",
        content: `
          <p>Investors in partnerships, S corporations, and rental properties must navigate complex passive activity loss rules. Generally, losses from passive activities can only offset income from other passive activities, with unused losses suspended indefinitely until sufficient passive income is generated or the investment is fully disposed of in a taxable transaction.</p>
          <h4>Material Participation Requirements</h4>
          <p>To avoid passive treatment, investors must materially participate in the business activity under IRS definitions. The primary test requires participation exceeding 500 hours during the tax year. Several alternative tests exist for specific situations, including the 100-hour test (if more than any other person) and the facts-and-circumstances test.</p>
          <h4>Strategic Considerations by KGOB</h4>
          <ul>
            <li>Document hours and activities contemporaneously to substantiate material participation; maintain detailed calendars and logs</li>
            <li>Consider grouping election for activities to aggregate participation hours and combine income/losses</li>
            <li>Generate passive income through other investments (such as rental real estate or limited partnerships) to utilize suspended losses</li>
            <li>Plan timing of dispositions strategically to trigger release of suspended loss deductions</li>
            <li>Real estate professionals may qualify for special treatment allowing rental losses against ordinary income</li>
            <li>Consider converting passive activities to active through increased involvement or restructuring</li>
            <li>Use installment sales to spread passive income recognition over multiple years</li>
          </ul>
          <p>KGOB CPA Partners assists clients in structuring investment portfolios to optimize passive activity rules, including strategic timing of investments and dispositions to maximize loss utilization. We also help real estate professionals qualify for the real estate professional exception, which can unlock substantial tax benefits.</p>
          <p><strong>Coordination with NIIT:</strong> Passive income is generally subject to the 3.8% net investment income tax, making coordination between passive activity rules and NIIT planning essential for high-income investors. Material participation can help avoid both passive loss limitations and NIIT exposure simultaneously.</p>
        `,
      },
    ],
  },
];

export function getAllSectionIds(): string[] {
  const ids: string[] = [];
  
  function extractIds(sections: TaxGuideSection[]) {
    sections.forEach(section => {
      ids.push(section.id);
      if (section.subsections) {
        extractIds(section.subsections);
      }
    });
  }
  
  extractIds(taxGuideData);
  return ids;
}

export function searchContent(query: string): TaxGuideSection[] {
  const results: TaxGuideSection[] = [];
  const lowerQuery = query.toLowerCase();
  
  function search(sections: TaxGuideSection[]) {
    sections.forEach(section => {
      const titleMatch = section.title.toLowerCase().includes(lowerQuery);
      const contentMatch = section.content.toLowerCase().includes(lowerQuery);
      
      if (titleMatch || contentMatch) {
        results.push(section);
      }
      
      if (section.subsections) {
        search(section.subsections);
      }
    });
  }
  
  search(taxGuideData);
  return results;
}