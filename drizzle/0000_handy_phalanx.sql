CREATE TABLE `entity_tax_impacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entity_type` text NOT NULL,
	`provision_name` text NOT NULL,
	`impact_description` text NOT NULL,
	`potential_savings` text NOT NULL,
	`year` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `government_references` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`citation_number` text NOT NULL,
	`url` text NOT NULL,
	`published_date` text NOT NULL,
	`description` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `new_2025_provisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provision_name` text NOT NULL,
	`description` text NOT NULL,
	`effective_date` text NOT NULL,
	`expiration_date` text,
	`public_law_citation` text NOT NULL,
	`irc_section` text NOT NULL,
	`is_temporary` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `retirement_limits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`account_type` text NOT NULL,
	`contribution_limit` integer NOT NULL,
	`catch_up_limit` integer,
	`age_requirement` integer,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `salt_deduction_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`filing_status` text NOT NULL,
	`deduction_cap` integer NOT NULL,
	`phaseout_threshold` integer,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `standard_deductions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`filing_status` text NOT NULL,
	`amount` integer NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tax_brackets` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`year` integer NOT NULL,
	`filing_status` text NOT NULL,
	`bracket_min` integer NOT NULL,
	`bracket_max` integer,
	`tax_rate` real NOT NULL,
	`created_at` text NOT NULL
);
