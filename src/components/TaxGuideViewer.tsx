"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bookmark, BookmarkCheck, Menu, X, Printer, ChevronRight, BarChart3, FileText, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { taxGuideData, type TaxGuideSection, searchContent } from "@/lib/taxGuideData";
import { cn } from "@/lib/utils";
import { TaxBracketsChart, CapitalGainsChart, Section179Chart, TaxStrategiesChart, EmploymentTaxChart, SALTDeductionChart } from "@/components/TaxCharts";
import TaxSummaryDashboard from "@/components/TaxSummaryDashboard";
import ComparisonCharts from "@/components/ComparisonCharts";
import NewProvisions2025 from "@/components/NewProvisions2025";
import EntityImpactAnalysis from "@/components/EntityImpactAnalysis";
import GovernmentReferences from "@/components/GovernmentReferences";

// Chart mapping
const chartComponents: Record<string, React.ComponentType> = {
  taxBrackets: TaxBracketsChart,
  capitalGains: CapitalGainsChart,
  section179: Section179Chart,
  taxStrategies: TaxStrategiesChart,
  employmentTax: EmploymentTaxChart,
  saltDeduction: SALTDeductionChart,
};

export default function TaxGuideViewer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TaxGuideSection[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readSections, setReadSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showTOC, setShowTOC] = useState(true);
  const [activeTab, setActiveTab] = useState("guide");
  const contentRef = useRef<HTMLDivElement>(null);

  // Load bookmarks and progress from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("taxGuideBookmarks");
    const savedProgress = localStorage.getItem("taxGuideProgress");
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    if (savedProgress) {
      setReadSections(JSON.parse(savedProgress));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("taxGuideBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("taxGuideProgress", JSON.stringify(readSections));
  }, [readSections]);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const results = searchContent(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section-id");
            if (id) {
              setActiveSection(id);
              if (!readSections.includes(id)) {
                setReadSections((prev) => [...prev, id]);
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = contentRef.current?.querySelectorAll("[data-section-id]");
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [readSections]);

  const toggleBookmark = (sectionId: string) => {
    setBookmarks((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>');
  };

  const renderSection = (section: TaxGuideSection, level: number = 0) => {
    const isBookmarked = bookmarks.includes(section.id);
    const isRead = readSections.includes(section.id);
    const ChartComponent = section.hasChart ? chartComponents[section.hasChart] : null;

    return (
      <div
        key={section.id}
        id={`section-${section.id}`}
        data-section-id={section.id}
        className={cn(
          "mb-8 scroll-mt-20",
          level === 0 && "border-b pb-8"
        )}
        role="article"
        aria-labelledby={`title-${section.id}`}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2
            id={`title-${section.id}`}
            className={cn(
              "font-bold",
              level === 0 && "text-3xl",
              level === 1 && "text-2xl",
              level === 2 && "text-xl"
            )}
            tabIndex={0}
          >
            {section.title}
            {isRead && (
              <span className="ml-2 text-sm text-green-600 dark:text-green-400" aria-label="Section read">
                ✓
              </span>
            )}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleBookmark(section.id)}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            className="shrink-0"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-blue-600" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: searchQuery.trim().length > 2
              ? highlightText(section.content, searchQuery)
              : section.content,
          }}
        />

        {/* Render chart if specified */}
        {ChartComponent && (
          <div className="my-8 p-6 bg-card border rounded-lg">
            <ChartComponent />
          </div>
        )}

        {section.subsections && section.subsections.length > 0 && (
          <Accordion type="multiple" className="mt-6">
            {section.subsections.map((subsection) => {
              const SubChartComponent = subsection.hasChart ? chartComponents[subsection.hasChart] : null;
              
              return (
                <AccordionItem key={subsection.id} value={subsection.id}>
                  <AccordionTrigger className="text-lg font-semibold">
                    <span className="flex items-center gap-2">
                      {subsection.title}
                      {readSections.includes(subsection.id) && (
                        <span className="text-sm text-green-600 dark:text-green-400">✓</span>
                      )}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      id={`section-${subsection.id}`}
                      data-section-id={subsection.id}
                      className="prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{
                        __html: searchQuery.trim().length > 2
                          ? highlightText(subsection.content, searchQuery)
                          : subsection.content,
                      }}
                    />
                    
                    {/* Render chart for subsection if specified */}
                    {SubChartComponent && (
                      <div className="my-6 p-6 bg-muted/50 border rounded-lg">
                        <SubChartComponent />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    );
  };

  const renderTOC = (sections: TaxGuideSection[], level: number = 0) => {
    return (
      <ul className={cn("space-y-1", level > 0 && "ml-4 mt-1")}>
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-left w-full px-2 py-1 rounded hover:bg-accent text-sm transition-colors flex items-center gap-2",
                activeSection === section.id && "bg-accent font-medium",
                readSections.includes(section.id) && "text-green-600 dark:text-green-400"
              )}
              aria-current={activeSection === section.id ? "location" : undefined}
            >
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="flex-1">{section.title}</span>
              {bookmarks.includes(section.id) && (
                <BookmarkCheck className="h-3 w-3 text-blue-600 shrink-0" aria-label="Bookmarked" />
              )}
            </button>
            {section.subsections && section.subsections.length > 0 && (
              renderTOC(section.subsections, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav
        className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b print:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTOC(!showTOC)}
            aria-label={showTOC ? "Hide table of contents" : "Show table of contents"}
            aria-expanded={showTOC}
          >
            {showTOC ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Search tax guide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              aria-label="Search tax guide content"
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handlePrint}
            aria-label="Print guide"
          >
            <Printer className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="border-t bg-card">
            <div className="container mx-auto px-4 py-3">
              <p className="text-sm text-muted-foreground mb-2">
                Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
              </p>
              <ul className="space-y-2" role="list" aria-label="Search results">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <button
                      onClick={() => {
                        scrollToSection(result.id);
                        setSearchQuery("");
                        setActiveTab("guide");
                      }}
                      className="text-left w-full px-3 py-2 rounded hover:bg-accent text-sm transition-colors"
                    >
                      <div className="font-medium">{result.title}</div>
                      <div
                        className="text-muted-foreground line-clamp-2 mt-1"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            result.content.replace(/<[^>]*>/g, "").slice(0, 150),
                            searchQuery
                          ),
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tax Guide
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              2024 vs 2025
            </TabsTrigger>
            <TabsTrigger value="new-provisions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              New 2025
            </TabsTrigger>
            <TabsTrigger value="entity-impact" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Entity Impact
            </TabsTrigger>
            <TabsTrigger value="references" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Gov References
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="mt-0">
            <div className="flex gap-8">
              {/* Table of Contents Sidebar */}
              <aside
                className={cn(
                  "w-64 shrink-0 sticky top-20 h-fit print:hidden transition-all duration-300",
                  !showTOC && "hidden"
                )}
                role="complementary"
                aria-label="Table of contents"
              >
                <div className="border rounded-lg p-4 bg-card">
                  <h2 className="font-bold text-lg mb-4">Contents</h2>
                  <nav aria-label="Document sections">
                    {renderTOC(taxGuideData)}
                  </nav>

                  {bookmarks.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <BookmarkCheck className="h-4 w-4" />
                        Bookmarks ({bookmarks.length})
                      </h3>
                      <ul className="space-y-1">
                        {bookmarks.map((bookmarkId) => {
                          const findSection = (sections: TaxGuideSection[]): TaxGuideSection | null => {
                            for (const section of sections) {
                              if (section.id === bookmarkId) return section;
                              if (section.subsections) {
                                const found = findSection(section.subsections);
                                if (found) return found;
                              }
                            }
                            return null;
                          };
                          const section = findSection(taxGuideData);
                          return section ? (
                            <li key={bookmarkId}>
                              <button
                                onClick={() => scrollToSection(bookmarkId)}
                                className="text-left w-full px-2 py-1 rounded hover:bg-accent text-sm transition-colors text-blue-600 dark:text-blue-400"
                              >
                                {section.title}
                              </button>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t">
                    <div className="text-sm text-muted-foreground">
                      Progress: {readSections.length} sections read
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main
                ref={contentRef}
                className="flex-1 max-w-4xl print:max-w-none"
                role="main"
                aria-label="Tax guide content"
              >
                {/* Tax Summary Dashboard */}
                <TaxSummaryDashboard />
                
                {/* Guide Content */}
                {taxGuideData.map((section) => renderSection(section))}
              </main>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="mt-0">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">2024 vs 2025 Tax Comparison</h1>
                <p className="text-muted-foreground">
                  Comprehensive analysis of key tax changes with year-over-year comparisons
                </p>
              </div>
              <ComparisonCharts />
            </div>
          </TabsContent>

          <TabsContent value="new-provisions" className="mt-0">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">New 2025 Tax Provisions</h1>
                <p className="text-muted-foreground">
                  Provisions that did not exist in 2024 - introduced by the One Big Beautiful Bill Act
                </p>
              </div>
              <NewProvisions2025 />
            </div>
          </TabsContent>

          <TabsContent value="entity-impact" className="mt-0">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Entity Impact Analysis</h1>
                <p className="text-muted-foreground">
                  How 2025 tax changes affect different business structures and individuals
                </p>
              </div>
              <EntityImpactAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="references" className="mt-0">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Government References & Citations</h1>
                <p className="text-muted-foreground">
                  Official IRS, Treasury, and federal sources for complete transparency and verification
                </p>
              </div>
              <GovernmentReferences />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}