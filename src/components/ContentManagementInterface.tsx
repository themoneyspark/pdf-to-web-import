"use client";

import { useState } from "react";
import { Plus, Save, Trash2, Edit, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { taxGuideData, type TaxGuideSection } from "@/lib/taxGuideData";
import { cn } from "@/lib/utils";

export default function ContentManagementInterface() {
  const [sections, setSections] = useState<TaxGuideSection[]>(taxGuideData);
  const [editingSection, setEditingSection] = useState<TaxGuideSection | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleExpand = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleEdit = (section: TaxGuideSection) => {
    setEditingSection({ ...section });
  };

  const handleSave = () => {
    if (!editingSection) return;

    const updateSection = (sections: TaxGuideSection[]): TaxGuideSection[] => {
      return sections.map((section) => {
        if (section.id === editingSection.id) {
          return editingSection;
        }
        if (section.subsections) {
          return {
            ...section,
            subsections: updateSection(section.subsections),
          };
        }
        return section;
      });
    };

    setSections(updateSection(sections));
    setEditingSection(null);

    // In a real application, you would save to a database here
    console.log("Saved:", editingSection);
    alert("Changes saved! (In production, this would update the database)");
  };

  const handleDelete = (sectionId: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    const deleteSection = (sections: TaxGuideSection[]): TaxGuideSection[] => {
      return sections
        .filter((section) => section.id !== sectionId)
        .map((section) => ({
          ...section,
          subsections: section.subsections
            ? deleteSection(section.subsections)
            : undefined,
        }));
    };

    setSections(deleteSection(sections));
  };

  const handleAddSubsection = (parentId: string) => {
    const newSubsection: TaxGuideSection = {
      id: `new-${Date.now()}`,
      title: "New Subsection",
      content: "<p>Enter content here...</p>",
    };

    const addToParent = (sections: TaxGuideSection[]): TaxGuideSection[] => {
      return sections.map((section) => {
        if (section.id === parentId) {
          return {
            ...section,
            subsections: [...(section.subsections || []), newSubsection],
          };
        }
        if (section.subsections) {
          return {
            ...section,
            subsections: addToParent(section.subsections),
          };
        }
        return section;
      });
    };

    setSections(addToParent(sections));
    setExpandedSections((prev) => [...prev, parentId]);
  };

  const renderSectionTree = (sections: TaxGuideSection[], level: number = 0) => {
    return (
      <div className={cn("space-y-2", level > 0 && "ml-6 mt-2")}>
        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          const hasSubsections = section.subsections && section.subsections.length > 0;

          return (
            <Card key={section.id} className="overflow-hidden">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  {hasSubsections && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleExpand(section.id)}
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  {!hasSubsections && <div className="w-6" />}
                  
                  <CardTitle className="text-base flex-1">{section.title}</CardTitle>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(section)}
                      aria-label="Edit section"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleAddSubsection(section.id)}
                      aria-label="Add subsection"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(section.id)}
                      aria-label="Delete section"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && hasSubsections && (
                <CardContent className="p-4 pt-0">
                  {renderSectionTree(section.subsections!, level + 1)}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">KGOB Tax Guide Content Management</h1>
          <p className="text-muted-foreground">
            Edit, add, or remove sections from the 2025 Tax Planning Guide
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Research and guidance by KGOB CPA Partners - Let's Talk Growth<sup>®</sup>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Tree */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Content Structure</h2>
              <Button
                onClick={() => {
                  const newSection: TaxGuideSection = {
                    id: `new-${Date.now()}`,
                    title: "New Section",
                    content: "<p>Enter content here...</p>",
                  };
                  setSections([...sections, newSection]);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
            {renderSectionTree(sections)}
          </div>

          {/* Edit Panel */}
          <div className="sticky top-8 h-fit">
            {editingSection ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="section-id">Section ID</Label>
                    <Input
                      id="section-id"
                      value={editingSection.id}
                      onChange={(e) =>
                        setEditingSection({ ...editingSection, id: e.target.value })
                      }
                      placeholder="unique-section-id"
                    />
                  </div>

                  <div>
                    <Label htmlFor="section-title">Title</Label>
                    <Input
                      id="section-title"
                      value={editingSection.title}
                      onChange={(e) =>
                        setEditingSection({ ...editingSection, title: e.target.value })
                      }
                      placeholder="Section Title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="section-content">Content (HTML)</Label>
                    <Textarea
                      id="section-content"
                      value={editingSection.content}
                      onChange={(e) =>
                        setEditingSection({ ...editingSection, content: e.target.value })
                      }
                      placeholder="<p>Enter HTML content...</p>"
                      rows={15}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingSection(null)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Preview</h3>
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h4 className="font-bold mb-2">{editingSection.title}</h4>
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: editingSection.content }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Edit className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a section from the tree to edit
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}