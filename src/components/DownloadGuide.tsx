"use client";

import { useState } from "react";
import { Download, FileText, File, FileCode, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generatePDF } from "@/lib/pdfGenerator";
import { generateWord } from "@/lib/wordGenerator";
import { generateMarkdown } from "@/lib/markdownGenerator";
import { taxGuideData } from "@/lib/taxGuideData";
import { toast } from "sonner";

export default function DownloadGuide() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<"pdf" | "word" | "markdown" | null>(null);

  const fetchAllData = async () => {
    try {
      toast.info("Fetching all guide data...");
      
      // Fetch all data in parallel - including ALL API endpoints
      const [
        standardDeductionsRes,
        retirementLimitsRes,
        newProvisionsRes,
        entityImpactsRes,
        governmentRefsRes,
        taxBracketsRes,
        saltHistoryRes,
      ] = await Promise.all([
        fetch("/api/standard-deductions"),
        fetch("/api/retirement-limits"),
        fetch("/api/new-provisions"),
        fetch("/api/entity-impacts"),
        fetch("/api/government-references"),
        fetch("/api/tax-brackets"),
        fetch("/api/salt-history"),
      ]);

      const standardDeductions = await standardDeductionsRes.json();
      const retirementLimits = await retirementLimitsRes.json();
      const newProvisions = await newProvisionsRes.json();
      const entityImpacts = await entityImpactsRes.json();
      const governmentRefs = await governmentRefsRes.json();
      const taxBrackets = await taxBracketsRes.json();
      const saltHistory = await saltHistoryRes.json();

      // Separate tax brackets and SALT history by year
      const taxBrackets2024 = taxBrackets?.filter((b: any) => b.year === 2024) || [];
      const taxBrackets2025 = taxBrackets?.filter((b: any) => b.year === 2025) || [];
      const saltHistory2024 = saltHistory?.filter((s: any) => s.year === 2024) || [];
      const saltHistory2025 = saltHistory?.filter((s: any) => s.year === 2025) || [];

      return {
        taxGuideData,
        comparisonData: {
          standardDeductions: standardDeductions.data || [],
          retirementLimits: retirementLimits.data || [],
        },
        newProvisions: newProvisions.data || [],
        entityImpacts: entityImpacts.data || [],
        governmentRefs: governmentRefs.data || [],
        taxBrackets2024,
        taxBrackets2025,
        saltHistory2024,
        saltHistory2025,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch guide data");
    }
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setGeneratingType("pdf");

    try {
      toast.info("Generating PDF with 100% content coverage...");
      const data = await fetchAllData();
      await generatePDF(data);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
    }
  };

  const handleDownloadWord = async () => {
    setIsGenerating(true);
    setGeneratingType("word");

    try {
      toast.info("Generating Word document with 100% content coverage...");
      const data = await fetchAllData();
      await generateWord(data);
      toast.success("Word document downloaded successfully!");
    } catch (error) {
      console.error("Error generating Word document:", error);
      toast.error("Failed to generate Word document. Please try again.");
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
    }
  };

  const handleDownloadMarkdown = async () => {
    setIsGenerating(true);
    setGeneratingType("markdown");

    try {
      toast.info("Generating Markdown document with 100% content coverage...");
      const data = await fetchAllData();
      await generateMarkdown(data);
      toast.success("Markdown document downloaded successfully!");
    } catch (error) {
      console.error("Error generating Markdown document:", error);
      toast.error("Failed to generate Markdown document. Please try again.");
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="default"
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating {generatingType === "pdf" ? "PDF" : generatingType === "word" ? "Word" : "Markdown"}...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Guide
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="gap-2 cursor-pointer"
        >
          <FileText className="h-4 w-4 text-red-600 dark:text-red-400" />
          <div className="flex flex-col">
            <span className="font-medium">Download as PDF</span>
            <span className="text-xs text-muted-foreground">
              Multi-page formatted document
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDownloadWord}
          disabled={isGenerating}
          className="gap-2 cursor-pointer"
        >
          <File className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <div className="flex flex-col">
            <span className="font-medium">Download as Word</span>
            <span className="text-xs text-muted-foreground">
              Editable .docx format
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDownloadMarkdown}
          disabled={isGenerating}
          className="gap-2 cursor-pointer"
        >
          <FileCode className="h-4 w-4 text-green-600 dark:text-green-400" />
          <div className="flex flex-col">
            <span className="font-medium">Download as Markdown</span>
            <span className="text-xs text-muted-foreground">
              Plain text .md format
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}