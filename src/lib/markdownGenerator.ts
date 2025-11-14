import { saveAs } from 'file-saver';

interface MarkdownData {
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
    .replace(/&sup;/g, '')
    .trim();
};

export const generateMarkdown = async (data: MarkdownData) => {
  try {
    let markdown = '';

    // Cover Page
    markdown += '# 2025 Tax Planning Guide\n\n';
    markdown += '## KGOB - KohariGonzalez Oneyear&Brown\n';
    markdown += '### CPAs & Advisors\n\n';
    markdown += '_Comprehensive strategies for business owners, executives, and high-net-worth individuals_\n\n';
    markdown += `**Generated:** ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}\n\n`;
    markdown += "**Let's Talk Growth®**\n\n";
    markdown += '---\n\n';

    // Table of Contents
    markdown += '## Table of Contents\n\n';
    data.taxGuideData.forEach((section, idx) => {
      markdown += `${idx + 1}. [${section.title}](#${section.id})\n`;
      section.subsections?.forEach((subsection: any, subIdx: number) => {
        markdown += `   ${idx + 1}.${subIdx + 1}. [${subsection.title}](#${subsection.id})\n`;
      });
    });
    markdown += '\n---\n\n';

    // Main Tax Guide Content
    data.taxGuideData.forEach((section) => {
      markdown += `## ${section.title} {#${section.id}}\n\n`;
      const contentText = stripHtml(section.content);
      markdown += `${contentText}\n\n`;

      section.subsections?.forEach((subsection: any) => {
        markdown += `### ${subsection.title} {#${subsection.id}}\n\n`;
        const subContentText = stripHtml(subsection.content);
        markdown += `${subContentText}\n\n`;
      });

      markdown += '---\n\n';
    });

    // 2024 vs 2025 Tax Comparison
    markdown += '## 2024 vs 2025 Tax Comparison\n\n';

    // Tax Brackets
    markdown += '### Federal Tax Brackets\n\n';
    
    if (data.taxBrackets2024?.length > 0 || data.taxBrackets2025?.length > 0) {
      markdown += '#### 2024 Tax Brackets\n\n';
      markdown += '| Filing Status | Bracket Min | Bracket Max | Tax Rate |\n';
      markdown += '|---------------|-------------|-------------|----------|\n';
      data.taxBrackets2024?.forEach((bracket: any) => {
        const maxDisplay = bracket.bracketMax ? `$${bracket.bracketMax.toLocaleString()}` : 'No limit';
        markdown += `| ${bracket.filingStatus} | $${bracket.bracketMin.toLocaleString()} | ${maxDisplay} | ${bracket.taxRate}% |\n`;
      });
      markdown += '\n';

      markdown += '#### 2025 Tax Brackets\n\n';
      markdown += '| Filing Status | Bracket Min | Bracket Max | Tax Rate |\n';
      markdown += '|---------------|-------------|-------------|----------|\n';
      data.taxBrackets2025?.forEach((bracket: any) => {
        const maxDisplay = bracket.bracketMax ? `$${bracket.bracketMax.toLocaleString()}` : 'No limit';
        markdown += `| ${bracket.filingStatus} | $${bracket.bracketMin.toLocaleString()} | ${maxDisplay} | ${bracket.taxRate}% |\n`;
      });
      markdown += '\n';
    }

    // Standard Deductions
    markdown += '### Standard Deductions\n\n';
    markdown += '| Filing Status | 2024 | 2025 | Change |\n';
    markdown += '|---------------|------|------|--------|\n';
    data.comparisonData?.standardDeductions?.forEach((item: any) => {
      markdown += `| ${item.filing_status} | $${item.amount_2024?.toLocaleString()} | $${item.amount_2025?.toLocaleString()} | $${item.change?.toLocaleString()} |\n`;
    });
    markdown += '\n';

    // Retirement Limits
    markdown += '### Retirement Contribution Limits\n\n';
    markdown += '| Account Type | 2024 | 2025 | Change |\n';
    markdown += '|--------------|------|------|--------|\n';
    data.comparisonData?.retirementLimits?.forEach((item: any) => {
      markdown += `| ${item.account_type} | $${item.limit_2024?.toLocaleString()} | $${item.limit_2025?.toLocaleString()} | $${item.change?.toLocaleString()} |\n`;
    });
    markdown += '\n';

    // SALT Deduction History
    markdown += '### SALT Deduction Limits\n\n';
    
    if (data.saltHistory2024?.length > 0 || data.saltHistory2025?.length > 0) {
      markdown += '#### 2024 SALT Deduction Limits\n\n';
      markdown += '| Filing Status | Deduction Cap | Phaseout Threshold |\n';
      markdown += '|---------------|---------------|--------------------|\n';
      data.saltHistory2024?.forEach((item: any) => {
        const phaseout = item.phaseoutThreshold ? `$${item.phaseoutThreshold.toLocaleString()}` : 'N/A';
        markdown += `| ${item.filingStatus} | $${item.deductionCap.toLocaleString()} | ${phaseout} |\n`;
      });
      markdown += '\n';

      markdown += '#### 2025 SALT Deduction Limits\n\n';
      markdown += '| Filing Status | Deduction Cap | Phaseout Threshold |\n';
      markdown += '|---------------|---------------|--------------------|\n';
      data.saltHistory2025?.forEach((item: any) => {
        const phaseout = item.phaseoutThreshold ? `$${item.phaseoutThreshold.toLocaleString()}` : 'N/A';
        markdown += `| ${item.filingStatus} | $${item.deductionCap.toLocaleString()} | ${phaseout} |\n`;
      });
      markdown += '\n';
    }

    markdown += '---\n\n';

    // New 2025 Provisions
    markdown += '## New 2025 Tax Provisions\n\n';
    data.newProvisions.forEach((provision) => {
      markdown += `### ${provision.title}\n\n`;
      markdown += `${provision.description}\n\n`;
      markdown += `**Effective:** ${provision.effective_date}`;
      if (provision.sunset_date) {
        markdown += ` | **Expires:** ${provision.sunset_date}`;
      } else {
        markdown += ' | **Permanent**';
      }
      markdown += '\n\n';
      if (provision.citation) {
        markdown += `_Citation: ${provision.citation}_\n\n`;
      }
    });

    markdown += '---\n\n';

    // Entity Impact Analysis
    markdown += '## Entity Impact Analysis\n\n';
    data.entityImpacts.forEach((entity) => {
      markdown += `### ${entity.entity_type}\n\n`;
      markdown += `**Key Benefits:**\n${entity.key_benefits}\n\n`;
      markdown += `**Strategy Recommendations:**\n${entity.strategy_recommendations}\n\n`;
      if (entity.estimated_savings) {
        markdown += `**Estimated Savings:** ${entity.estimated_savings}\n\n`;
      }
    });

    markdown += '---\n\n';

    // Government References
    markdown += '## Government References & Citations\n\n';
    data.governmentRefs.forEach((ref) => {
      markdown += `### ${ref.title}\n\n`;
      markdown += `${ref.description}\n\n`;
      markdown += `**Source:** ${ref.source_type}\n\n`;
      if (ref.url) {
        markdown += `**URL:** ${ref.url}\n\n`;
      }
    });

    markdown += '---\n\n';
    markdown += '_This document was generated by KGOB CPA Partners. For personalized tax advice, please consult with a qualified tax professional._\n';

    // Create and save file
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(
      blob,
      `KGOB-2025-Tax-Planning-Guide-${new Date().toISOString().split('T')[0]}.md`
    );
  } catch (error) {
    console.error('Error generating Markdown:', error);
    throw new Error('Failed to generate Markdown document');
  }
};
