import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// Tax brackets table
export const taxBrackets = sqliteTable('tax_brackets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: integer('year').notNull(),
  filingStatus: text('filing_status').notNull(),
  bracketMin: integer('bracket_min').notNull(),
  bracketMax: integer('bracket_max'),
  taxRate: real('tax_rate').notNull(),
  createdAt: text('created_at').notNull(),
});

// Standard deductions table
export const standardDeductions = sqliteTable('standard_deductions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: integer('year').notNull(),
  filingStatus: text('filing_status').notNull(),
  amount: integer('amount').notNull(),
  createdAt: text('created_at').notNull(),
});

// Retirement limits table
export const retirementLimits = sqliteTable('retirement_limits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: integer('year').notNull(),
  accountType: text('account_type').notNull(),
  contributionLimit: integer('contribution_limit').notNull(),
  catchUpLimit: integer('catch_up_limit'),
  ageRequirement: integer('age_requirement'),
  createdAt: text('created_at').notNull(),
});

// New 2025 provisions table
export const newProvisions = sqliteTable('new_2025_provisions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  provisionName: text('provision_name').notNull(),
  description: text('description').notNull(),
  effectiveDate: text('effective_date').notNull(),
  expirationDate: text('expiration_date'),
  publicLawCitation: text('public_law_citation').notNull(),
  ircSection: text('irc_section').notNull(),
  isTemporary: integer('is_temporary', { mode: 'boolean' }).notNull(),
  createdAt: text('created_at').notNull(),
});

// SALT deduction history table
export const saltDeductionHistory = sqliteTable('salt_deduction_history', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: integer('year').notNull(),
  filingStatus: text('filing_status').notNull(),
  deductionCap: integer('deduction_cap').notNull(),
  phaseoutThreshold: integer('phaseout_threshold'),
  createdAt: text('created_at').notNull(),
});

// Government references table
export const governmentReferences = sqliteTable('government_references', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  category: text('category').notNull(),
  title: text('title').notNull(),
  citationNumber: text('citation_number').notNull(),
  url: text('url').notNull(),
  publishedDate: text('published_date').notNull(),
  description: text('description').notNull(),
  createdAt: text('created_at').notNull(),
});

// Entity tax impacts table
export const entityTaxImpacts = sqliteTable('entity_tax_impacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  entityType: text('entity_type').notNull(),
  provisionName: text('provision_name').notNull(),
  impactDescription: text('impact_description').notNull(),
  potentialSavings: text('potential_savings').notNull(),
  year: integer('year').notNull(),
  createdAt: text('created_at').notNull(),
});