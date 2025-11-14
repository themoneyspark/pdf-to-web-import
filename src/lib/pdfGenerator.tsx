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
}

// Create PDF Document
const TaxGuidePDF = ({ data }: { data: PDFData }) => {
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

  return (
    <Document>
      {/* Cover Page */}
      <Page size="LETTER" style={styles.coverPage}>
        <View>
          <Text style={styles.coverTitle}>2025 Tax Planning Guide</Text>
          <Text style={styles.coverSubtitle}>
            Comprehensive strategies for business owners, executives,{'\n'}
            and high-net-worth individuals
          </Text>
          <Text style={styles.coverSubtitle}>
            KGOB - KohariGonzalez Oneyear&Brown{'\n'}
            CPAs & Advisors
          </Text>
          <Text style={styles.coverDate}>
            Generated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Text>
        </View>
      </Page>

      {/* Main Tax Guide Content */}
      {data.taxGuideData.map((section, sectionIndex) => (
        <Page key={`section-${sectionIndex}`} size="LETTER" style={styles.page}>
          <Text style={styles.header}>{section.title}</Text>
          <Text style={styles.text}>{stripHtml(section.content)}</Text>
          
          {section.subsections?.map((subsection: any, subIndex: number) => (
            <View key={`subsection-${subIndex}`} style={{ marginTop: 15 }}>
              <Text style={styles.subheader}>{subsection.title}</Text>
              <Text style={styles.text}>{stripHtml(subsection.content)}</Text>
            </View>
          ))}

          <View style={styles.footer}>
            <Text>KGOB CPA Partners - 2025 Tax Planning Guide</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      ))}

      {/* 2024 vs 2025 Comparison */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.header}>2024 vs 2025 Tax Comparison</Text>
        
        <Text style={styles.subheader}>Standard Deductions</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeader}>Filing Status</Text>
            <Text style={styles.tableCellHeader}>2024</Text>
            <Text style={styles.tableCellHeader}>2025</Text>
            <Text style={styles.tableCellHeader}>Change</Text>
          </View>
          {data.comparisonData?.standardDeductions?.map((item: any, idx: number) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.filing_status}</Text>
              <Text style={styles.tableCell}>${item.amount_2024?.toLocaleString()}</Text>
              <Text style={styles.tableCell}>${item.amount_2025?.toLocaleString()}</Text>
              <Text style={styles.tableCell}>${item.change?.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subheader}>Retirement Contribution Limits</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeader}>Account Type</Text>
            <Text style={styles.tableCellHeader}>2024</Text>
            <Text style={styles.tableCellHeader}>2025</Text>
            <Text style={styles.tableCellHeader}>Change</Text>
          </View>
          {data.comparisonData?.retirementLimits?.map((item: any, idx: number) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.account_type}</Text>
              <Text style={styles.tableCell}>${item.limit_2024?.toLocaleString()}</Text>
              <Text style={styles.tableCell}>${item.limit_2025?.toLocaleString()}</Text>
              <Text style={styles.tableCell}>${item.change?.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>KGOB CPA Partners - 2025 Tax Planning Guide</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      {/* New 2025 Provisions */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.header}>New 2025 Tax Provisions</Text>
        
        {data.newProvisions.map((provision, idx) => (
          <View key={idx} style={{ marginBottom: 15 }}>
            <Text style={styles.subheader}>{provision.title}</Text>
            <Text style={styles.text}>{provision.description}</Text>
            <Text style={styles.text}>
              Effective: {provision.effective_date} | 
              {provision.sunset_date ? ` Expires: ${provision.sunset_date}` : ' Permanent'}
            </Text>
            {provision.citation && (
              <Text style={styles.text}>Citation: {provision.citation}</Text>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <Text>KGOB CPA Partners - 2025 Tax Planning Guide</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      {/* Entity Impact Analysis */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.header}>Entity Impact Analysis</Text>
        
        {data.entityImpacts.map((entity, idx) => (
          <View key={idx} style={{ marginBottom: 15 }}>
            <Text style={styles.subheader}>{entity.entity_type}</Text>
            <Text style={styles.sectionTitle}>Key Benefits:</Text>
            <Text style={styles.text}>{entity.key_benefits}</Text>
            <Text style={styles.sectionTitle}>Strategy Recommendations:</Text>
            <Text style={styles.text}>{entity.strategy_recommendations}</Text>
            {entity.estimated_savings && (
              <Text style={styles.text}>
                Estimated Savings: {entity.estimated_savings}
              </Text>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <Text>KGOB CPA Partners - 2025 Tax Planning Guide</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>

      {/* Government References */}
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.header}>Government References & Citations</Text>
        
        {data.governmentRefs.map((ref, idx) => (
          <View key={idx} style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>{ref.title}</Text>
            <Text style={styles.text}>{ref.description}</Text>
            <Text style={styles.text}>Source: {ref.source_type}</Text>
            {ref.url && (
              <Text style={[styles.text, { color: '#17A2B8' }]}>{ref.url}</Text>
            )}
          </View>
        ))}

        <View style={styles.footer}>
          <Text>KGOB CPA Partners - 2025 Tax Planning Guide</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export const generatePDF = async (data: PDFData) => {
  try {
    const blob = await pdf(<TaxGuidePDF data={data} />).toBlob();
    saveAs(blob, `KGOB-2025-Tax-Planning-Guide-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
