"use client";

import { useState } from "react";
import { Download, FileText, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generatePDF } from "@/lib/pdfGenerator";
import { generateWord } from "@/lib/wordGenerator";
import { taxGuideData } from "@/lib/taxGuideData";
import { toast } from "sonner";

export default function DownloadGuide() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<"pdf" | "word" | null>(null);

  const fetchAllData = async () => {
    try {
      // Fetch all data in parallel
      const [
        standardDeductionsRes,
        retirementLimitsRes,
        newProvisionsRes,
        entityImpactsRes,
        governmentRefsRes,
      ] = await Promise.all([
        fetch("/api/standard-deductions"),
        fetch("/api/retirement-limits"),
        fetch("/api/new-provisions"),
        fetch("/api/entity-impacts"),
        fetch("/api/government-references"),
      ]);

      const standardDeductions = await standardDeductionsRes.json();
      const retirementLimits = await retirementLimitsRes.json();
      const newProvisions = await newProvisionsRes.json();
      const entityImpacts = await entityImpactsRes.json();
      const governmentRefs = await governmentRefsRes.json();

      return {
        taxGuideData,
        comparisonData: {
          standardDeductions: standardDeductions.data || [],
          retirementLimits: retirementLimits.data || [],
        },
        newProvisions: newProvisions.data || [],
        entityImpacts: entityImpacts.data || [],
        governmentRefs: governmentRefs.data || [],
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
      toast.info("Generating PDF... This may take a moment.");
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
      toast.info("Generating Word document... This may take a moment.");
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
              Generating {generatingType === "pdf" ? "PDF" : "Word"}...
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}