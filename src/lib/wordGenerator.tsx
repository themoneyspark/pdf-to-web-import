import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, convertInchesToTwip, Packer } from 'docx';
import { saveAs } from 'file-saver';

interface WordData {
  taxGuideData: any[];
  comparisonData: any;
  newProvisions: any[];
  entityImpacts: any[];
  governmentRefs: any[];
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

export const generateWord = async (data: WordData) => {
  try {
    const children: any[] = [];

    // Cover Page
    children.push(
      new Paragraph({
        text: '2025 Tax Planning Guide',
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        text: 'Comprehensive strategies for business owners, executives, and high-net-worth individuals',
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        text: 'KGOB - KohariGonzalez Oneyear&Brown',
        alignment: AlignmentType.CENTER,
        spacing: { after: 50 },
      }),
      new Paragraph({
        text: 'CPAs & Advisors',
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: `Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
      new Paragraph({
        text: '',
        pageBreakBefore: true,
      })
    );

    // Table of Contents
    children.push(
      new Paragraph({
        text: 'Table of Contents',
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      })
    );

    data.taxGuideData.forEach((section, idx) => {
      children.push(
        new Paragraph({
          text: `${idx + 1}. ${section.title}`,
          spacing: { after: 100 },
        })
      );
      section.subsections?.forEach((subsection: any, subIdx: number) => {
        children.push(
          new Paragraph({
            text: `   ${idx + 1}.${subIdx + 1}. ${subsection.title}`,
            spacing: { after: 50 },
          })
        );
      });
    });

    children.push(
      new Paragraph({
        text: '',
        pageBreakBefore: true,
      })
    );

    // Main Tax Guide Content
    data.taxGuideData.forEach((section, sectionIndex) => {
      children.push(
        new Paragraph({
          text: section.title,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      const contentText = stripHtml(section.content);
      const contentParagraphs = contentText.split('\n').filter(p => p.trim());
      contentParagraphs.forEach(para => {
        children.push(
          new Paragraph({
            text: para,
            spacing: { after: 150 },
            alignment: AlignmentType.JUSTIFIED,
          })
        );
      });

      section.subsections?.forEach((subsection: any) => {
        children.push(
          new Paragraph({
            text: subsection.title,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 150 },
          })
        );

        const subContentText = stripHtml(subsection.content);
        const subContentParagraphs = subContentText.split('\n').filter(p => p.trim());
        subContentParagraphs.forEach(para => {
          children.push(
            new Paragraph({
              text: para,
              spacing: { after: 150 },
              alignment: AlignmentType.JUSTIFIED,
            })
          );
        });
      });

      if (sectionIndex < data.taxGuideData.length - 1) {
        children.push(
          new Paragraph({
            text: '',
            pageBreakBefore: true,
          })
        );
      }
    });

    // 2024 vs 2025 Comparison
    children.push(
      new Paragraph({
        text: '',
        pageBreakBefore: true,
      }),
      new Paragraph({
        text: '2024 vs 2025 Tax Comparison',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        text: 'Standard Deductions',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 150 },
      })
    );

    if (data.comparisonData?.standardDeductions?.length > 0) {
      const standardDeductionsTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: 'Filing Status', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
              new TableCell({
                children: [new Paragraph({ text: '2024', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
              new TableCell({
                children: [new Paragraph({ text: '2025', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
              new TableCell({
                children: [new Paragraph({ text: 'Change', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
            ],
          }),
          ...data.comparisonData.standardDeductions.map((item: any) =>
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(item.filing_status)] }),
                new TableCell({ children: [new Paragraph(`$${item.amount_2024?.toLocaleString()}`)] }),
                new TableCell({ children: [new Paragraph(`$${item.amount_2025?.toLocaleString()}`)] }),
                new TableCell({ children: [new Paragraph(`$${item.change?.toLocaleString()}`)] }),
              ],
            })
          ),
        ],
      });
      children.push(standardDeductionsTable);
    }

    children.push(
      new Paragraph({
        text: 'Retirement Contribution Limits',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 300, after: 150 },
      })
    );

    if (data.comparisonData?.retirementLimits?.length > 0) {
      const retirementLimitsTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: 'Account Type', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
              new TableCell({
                children: [new Paragraph({ text: '2024', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
              new TableCell({
                children: [new Paragraph({ text: '2025', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
              new TableCell({
                children: [new Paragraph({ text: 'Change', bold: true })],
                shading: { fill: 'E8F4F8' },
              }),
            ],
          }),
          ...data.comparisonData.retirementLimits.map((item: any) =>
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(item.account_type)] }),
                new TableCell({ children: [new Paragraph(`$${item.limit_2024?.toLocaleString()}`)] }),
                new TableCell({ children: [new Paragraph(`$${item.limit_2025?.toLocaleString()}`)] }),
                new TableCell({ children: [new Paragraph(`$${item.change?.toLocaleString()}`)] }),
              ],
            })
          ),
        ],
      });
      children.push(retirementLimitsTable);
    }

    // New 2025 Provisions
    children.push(
      new Paragraph({
        text: '',
        pageBreakBefore: true,
      }),
      new Paragraph({
        text: 'New 2025 Tax Provisions',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    data.newProvisions.forEach((provision) => {
      children.push(
        new Paragraph({
          text: provision.title,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),
        new Paragraph({
          text: provision.description,
          spacing: { after: 100 },
          alignment: AlignmentType.JUSTIFIED,
        }),
        new Paragraph({
          text: `Effective: ${provision.effective_date}${provision.sunset_date ? ` | Expires: ${provision.sunset_date}` : ' | Permanent'}`,
          spacing: { after: 100 },
        })
      );

      if (provision.citation) {
        children.push(
          new Paragraph({
            text: `Citation: ${provision.citation}`,
            spacing: { after: 200 },
            italics: true,
          })
        );
      }
    });

    // Entity Impact Analysis
    children.push(
      new Paragraph({
        text: '',
        pageBreakBefore: true,
      }),
      new Paragraph({
        text: 'Entity Impact Analysis',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    data.entityImpacts.forEach((entity) => {
      children.push(
        new Paragraph({
          text: entity.entity_type,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Key Benefits: ', bold: true }),
            new TextRun({ text: entity.key_benefits }),
          ],
          spacing: { after: 150 },
          alignment: AlignmentType.JUSTIFIED,
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Strategy Recommendations: ', bold: true }),
            new TextRun({ text: entity.strategy_recommendations }),
          ],
          spacing: { after: 150 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );

      if (entity.estimated_savings) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Estimated Savings: ', bold: true }),
              new TextRun({ text: entity.estimated_savings }),
            ],
            spacing: { after: 200 },
          })
        );
      }
    });

    // Government References
    children.push(
      new Paragraph({
        text: '',
        pageBreakBefore: true,
      }),
      new Paragraph({
        text: 'Government References & Citations',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    data.governmentRefs.forEach((ref) => {
      children.push(
        new Paragraph({
          text: ref.title,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }),
        new Paragraph({
          text: ref.description,
          spacing: { after: 100 },
          alignment: AlignmentType.JUSTIFIED,
        }),
        new Paragraph({
          text: `Source: ${ref.source_type}`,
          spacing: { after: 50 },
        })
      );

      if (ref.url) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: ref.url,
                style: 'Hyperlink',
                color: '17A2B8',
              }),
            ],
            spacing: { after: 200 },
          })
        );
      }
    });

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: convertInchesToTwip(1),
                right: convertInchesToTwip(1),
                bottom: convertInchesToTwip(1),
                left: convertInchesToTwip(1),
              },
            },
          },
          children,
        },
      ],
    });

    // Generate and save
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `KGOB-2025-Tax-Planning-Guide-${new Date().toISOString().split('T')[0]}.docx`);
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw new Error('Failed to generate Word document');
  }
};
