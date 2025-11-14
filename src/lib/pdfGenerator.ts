import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#17A2B8',
  },
  coverSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  coverDate: {
    fontSize: 12,
    marginTop: 30,
    color: '#666',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
    color: '#17A2B8',
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    color: '#138496',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
    color: '#1a4d6d',
  },
  text: {
    fontSize: 11,
    lineHeight: 1.6,
    marginBottom: 8,
    textAlign: 'justify',
  },
  table: {
    marginTop: 10,
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#17A2B8',
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    paddingHorizontal: 5,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#666',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface PDFData {
  taxGuideData: any[];
  comparisonData: any;
  newProvisions: any[];
  entityImpacts: any[];
  governmentRefs: any[];
  taxBrackets2024: any[];
  taxBrackets2025: any[];
  saltHistory2024: any[];
  saltHistory2025: any[];
}

const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
};

// Create PDF Document
const TaxGuidePDF = ({ data }: { data: PDFData }) => {
  return React.createElement(
    Document,
    null,
    // Cover Page
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.coverPage },
      React.createElement(
        View,
        null,
        React.createElement(Text, { style: styles.coverTitle }, '2025 Tax Planning Guide'),
        React.createElement(
          Text,
          { style: styles.coverSubtitle },
          'Comprehensive strategies for business owners, executives,\nand high-net-worth individuals'
        ),
        React.createElement(
          Text,
          { style: styles.coverSubtitle },
          'KGOB - KohariGonzalez Oneyear&Brown\nCPAs & Advisors'
        ),
        React.createElement(
          Text,
          { style: styles.coverDate },
          `Generated: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`
        )
      )
    ),

    // Main Tax Guide Content
    ...data.taxGuideData.map((section, sectionIndex) =>
      React.createElement(
        Page,
        { key: `section-${sectionIndex}`, size: 'LETTER', style: styles.page },
        React.createElement(Text, { style: styles.header }, section.title),
        React.createElement(Text, { style: styles.text }, stripHtml(section.content)),

        ...(section.subsections || []).map((subsection: any, subIndex: number) =>
          React.createElement(
            View,
            { key: `subsection-${subIndex}`, style: { marginTop: 15 } },
            React.createElement(Text, { style: styles.subheader }, subsection.title),
            React.createElement(Text, { style: styles.text }, stripHtml(subsection.content))
          )
        ),

        React.createElement(
          View,
          { style: styles.footer },
          React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
          React.createElement(
            Text,
            {
              render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
            }
          )
        )
      )
    ),

    // 2024 vs 2025 Comparison
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.header }, '2024 vs 2025 Tax Comparison'),

      // Tax Brackets
      React.createElement(Text, { style: styles.subheader }, 'Federal Tax Brackets - 2024'),
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableHeader },
          React.createElement(Text, { style: styles.tableCellHeader }, 'Filing Status'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Bracket Min'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Bracket Max'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Tax Rate')
        ),
        ...(data.taxBrackets2024 || []).slice(0, 10).map((bracket: any, idx: number) =>
          React.createElement(
            View,
            { key: idx, style: styles.tableRow },
            React.createElement(Text, { style: styles.tableCell }, bracket.filingStatus),
            React.createElement(Text, { style: styles.tableCell }, `$${bracket.bracketMin?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, bracket.bracketMax ? `$${bracket.bracketMax?.toLocaleString()}` : 'No limit'),
            React.createElement(Text, { style: styles.tableCell }, `${bracket.taxRate}%`)
          )
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
        React.createElement(
          Text,
          {
            render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
          }
        )
      )
    ),

    // Tax Brackets 2025 (continued)
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.subheader }, 'Federal Tax Brackets - 2025'),
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableHeader },
          React.createElement(Text, { style: styles.tableCellHeader }, 'Filing Status'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Bracket Min'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Bracket Max'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Tax Rate')
        ),
        ...(data.taxBrackets2025 || []).slice(0, 10).map((bracket: any, idx: number) =>
          React.createElement(
            View,
            { key: idx, style: styles.tableRow },
            React.createElement(Text, { style: styles.tableCell }, bracket.filingStatus),
            React.createElement(Text, { style: styles.tableCell }, `$${bracket.bracketMin?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, bracket.bracketMax ? `$${bracket.bracketMax?.toLocaleString()}` : 'No limit'),
            React.createElement(Text, { style: styles.tableCell }, `${bracket.taxRate}%`)
          )
        )
      ),

      React.createElement(Text, { style: styles.subheader }, 'Standard Deductions'),
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableHeader },
          React.createElement(Text, { style: styles.tableCellHeader }, 'Filing Status'),
          React.createElement(Text, { style: styles.tableCellHeader }, '2024'),
          React.createElement(Text, { style: styles.tableCellHeader }, '2025'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Change')
        ),
        ...(data.comparisonData?.standardDeductions || []).map((item: any, idx: number) =>
          React.createElement(
            View,
            { key: idx, style: styles.tableRow },
            React.createElement(Text, { style: styles.tableCell }, item.filing_status),
            React.createElement(Text, { style: styles.tableCell }, `$${item.amount_2024?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, `$${item.amount_2025?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, `$${item.change?.toLocaleString()}`)
          )
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
        React.createElement(
          Text,
          {
            render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
          }
        )
      )
    ),

    // Retirement Limits & SALT
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.subheader }, 'Retirement Contribution Limits'),
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableHeader },
          React.createElement(Text, { style: styles.tableCellHeader }, 'Account Type'),
          React.createElement(Text, { style: styles.tableCellHeader }, '2024'),
          React.createElement(Text, { style: styles.tableCellHeader }, '2025'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Change')
        ),
        ...(data.comparisonData?.retirementLimits || []).map((item: any, idx: number) =>
          React.createElement(
            View,
            { key: idx, style: styles.tableRow },
            React.createElement(Text, { style: styles.tableCell }, item.account_type),
            React.createElement(Text, { style: styles.tableCell }, `$${item.limit_2024?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, `$${item.limit_2025?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, `$${item.change?.toLocaleString()}`)
          )
        )
      ),

      // SALT Deduction History
      React.createElement(Text, { style: styles.subheader }, 'SALT Deduction Limits - 2024'),
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableHeader },
          React.createElement(Text, { style: styles.tableCellHeader }, 'Filing Status'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Deduction Cap'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Phaseout Threshold')
        ),
        ...(data.saltHistory2024 || []).map((item: any, idx: number) =>
          React.createElement(
            View,
            { key: idx, style: styles.tableRow },
            React.createElement(Text, { style: styles.tableCell }, item.filingStatus),
            React.createElement(Text, { style: styles.tableCell }, `$${item.deductionCap?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, item.phaseoutThreshold ? `$${item.phaseoutThreshold?.toLocaleString()}` : 'N/A')
          )
        )
      ),

      React.createElement(Text, { style: styles.subheader }, 'SALT Deduction Limits - 2025'),
      React.createElement(
        View,
        { style: styles.table },
        React.createElement(
          View,
          { style: styles.tableHeader },
          React.createElement(Text, { style: styles.tableCellHeader }, 'Filing Status'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Deduction Cap'),
          React.createElement(Text, { style: styles.tableCellHeader }, 'Phaseout Threshold')
        ),
        ...(data.saltHistory2025 || []).map((item: any, idx: number) =>
          React.createElement(
            View,
            { key: idx, style: styles.tableRow },
            React.createElement(Text, { style: styles.tableCell }, item.filingStatus),
            React.createElement(Text, { style: styles.tableCell }, `$${item.deductionCap?.toLocaleString()}`),
            React.createElement(Text, { style: styles.tableCell }, item.phaseoutThreshold ? `$${item.phaseoutThreshold?.toLocaleString()}` : 'N/A')
          )
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
        React.createElement(
          Text,
          {
            render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
          }
        )
      )
    ),

    // New 2025 Provisions
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.header }, 'New 2025 Tax Provisions'),

      ...data.newProvisions.map((provision, idx) =>
        React.createElement(
          View,
          { key: idx, style: { marginBottom: 15 } },
          React.createElement(Text, { style: styles.subheader }, provision.title),
          React.createElement(Text, { style: styles.text }, provision.description),
          React.createElement(
            Text,
            { style: styles.text },
            `Effective: ${provision.effective_date} | ${provision.sunset_date ? `Expires: ${provision.sunset_date}` : 'Permanent'}`
          ),
          provision.citation
            ? React.createElement(Text, { style: styles.text }, `Citation: ${provision.citation}`)
            : null
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
        React.createElement(
          Text,
          {
            render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
          }
        )
      )
    ),

    // Entity Impact Analysis
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.header }, 'Entity Impact Analysis'),

      ...data.entityImpacts.map((entity, idx) =>
        React.createElement(
          View,
          { key: idx, style: { marginBottom: 15 } },
          React.createElement(Text, { style: styles.subheader }, entity.entity_type),
          React.createElement(Text, { style: styles.sectionTitle }, 'Key Benefits:'),
          React.createElement(Text, { style: styles.text }, entity.key_benefits),
          React.createElement(Text, { style: styles.sectionTitle }, 'Strategy Recommendations:'),
          React.createElement(Text, { style: styles.text }, entity.strategy_recommendations),
          entity.estimated_savings
            ? React.createElement(Text, { style: styles.text }, `Estimated Savings: ${entity.estimated_savings}`)
            : null
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
        React.createElement(
          Text,
          {
            render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
          }
        )
      )
    ),

    // Government References
    React.createElement(
      Page,
      { size: 'LETTER', style: styles.page },
      React.createElement(Text, { style: styles.header }, 'Government References & Citations'),

      ...data.governmentRefs.map((ref, idx) =>
        React.createElement(
          View,
          { key: idx, style: { marginBottom: 12 } },
          React.createElement(Text, { style: styles.sectionTitle }, ref.title),
          React.createElement(Text, { style: styles.text }, ref.description),
          React.createElement(Text, { style: styles.text }, `Source: ${ref.source_type}`),
          ref.url ? React.createElement(Text, { style: [styles.text, { color: '#17A2B8' }] }, ref.url) : null
        )
      ),

      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, null, 'KGOB CPA Partners - 2025 Tax Planning Guide'),
        React.createElement(
          Text,
          {
            render: ({ pageNumber, totalPages }: any) => `Page ${pageNumber} of ${totalPages}`,
          }
        )
      )
    )
  );
};

export const generatePDF = async (data: PDFData) => {
  try {
    const blob = await pdf(React.createElement(TaxGuidePDF, { data })).toBlob();
    saveAs(blob, `KGOB-2025-Tax-Planning-Guide-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};