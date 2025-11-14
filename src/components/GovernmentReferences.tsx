"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExternalLink, FileText, ShieldCheck, Building, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GovernmentReference {
  id: number;
  category: string;
  title: string;
  citationNumber: string;
  url: string;
  publishedDate: string;
  description: string;
}

const categoryIcons = {
  'IRS Notice': FileText,
  'Revenue Procedure': FileText,
  'Publication': FileText,
  'Public Law': ShieldCheck,
  'State Website': Building,
  'Federal Website': Globe,
  'Treasury Guidance': ShieldCheck,
};

const categoryColors = {
  'IRS Notice': 'bg-blue-100 text-blue-800 border-blue-300',
  'Revenue Procedure': 'bg-purple-100 text-purple-800 border-purple-300',
  'Publication': 'bg-green-100 text-green-800 border-green-300',
  'Public Law': 'bg-red-100 text-red-800 border-red-300',
  'State Website': 'bg-orange-100 text-orange-800 border-orange-300',
  'Federal Website': 'bg-cyan-100 text-cyan-800 border-cyan-300',
  'Treasury Guidance': 'bg-pink-100 text-pink-800 border-pink-300',
};

export default function GovernmentReferences() {
  const [references, setReferences] = useState<GovernmentReference[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchReferences() {
      try {
        const response = await fetch('/api/government-references');
        const data = await response.json();
        setReferences(data);
      } catch (error) {
        console.error('Error fetching government references:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReferences();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading government references...</p>
        </div>
      </div>
    );
  }

  const categories = ['all', ...Array.from(new Set(references.map(r => r.category)))];
  const filteredReferences = selectedCategory === 'all' 
    ? references 
    : references.filter(r => r.category === selectedCategory);

  const groupedByCategory = references.reduce((acc, ref) => {
    if (!acc[ref.category]) {
      acc[ref.category] = [];
    }
    acc[ref.category].push(ref);
    return acc;
  }, {} as Record<string, GovernmentReference[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Transparency Notice */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Alert className="border-primary/50 bg-primary/5">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <AlertTitle className="text-lg font-semibold">Official Sources & Citations</AlertTitle>
          <AlertDescription className="mt-2">
            All tax information in this guide is sourced from official government publications. 
            Below are direct links to IRS notices, revenue procedures, public laws, and state resources 
            for independent verification.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Total References
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{references.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Official government sources
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                IRS Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {references.filter(r => r.category.includes('IRS') || r.category.includes('Revenue')).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Notices, procedures & publications
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                State Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {references.filter(r => r.category.includes('State')).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                State tax authority links
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Federal Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {references.filter(r => r.category.includes('Federal') || r.category.includes('Public Law') || r.category.includes('Treasury')).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Congress & Treasury resources
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* References by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Official Government Sources & Citations</CardTitle>
            <CardDescription>
              Direct links to verify all tax information and regulatory guidance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                <TabsTrigger value="all" className="text-xs">All Sources</TabsTrigger>
                {categories.slice(1, 4).map(category => (
                  <TabsTrigger key={category} value={category} className="text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6 space-y-4">
                {filteredReferences.map((reference, index) => {
                  const Icon = categoryIcons[reference.category as keyof typeof categoryIcons] || FileText;
                  const colorClass = categoryColors[reference.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
                  
                  return (
                    <motion.div
                      key={reference.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Icon className="h-5 w-5 text-primary shrink-0" />
                                <CardTitle className="text-lg">{reference.title}</CardTitle>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className={colorClass} variant="outline">
                                  {reference.category}
                                </Badge>
                                <Badge variant="secondary" className="font-mono text-xs">
                                  {reference.citationNumber}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Published: {reference.publishedDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {reference.description}
                          </p>
                          
                          <div className="flex items-center gap-3 pt-3 border-t">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gap-2"
                              onClick={() => window.open(reference.url, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Official Document
                            </Button>
                            <div className="text-xs text-muted-foreground font-mono truncate flex-1">
                              {reference.url}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {filteredReferences.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No references found for the selected category.
                    </p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Primary Government Websites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Primary Government Resources</CardTitle>
            <CardDescription>
              Key websites for tax information and compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                className="border rounded-lg p-4 bg-background"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Internal Revenue Service</h4>
                    <p className="text-xs text-muted-foreground">Official IRS Website</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => window.open('https://www.irs.gov', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Visit IRS.gov
                </Button>
              </motion.div>

              <motion.div 
                className="border rounded-lg p-4 bg-background"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">U.S. Department of Treasury</h4>
                    <p className="text-xs text-muted-foreground">Treasury Guidance & Regulations</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => window.open('https://home.treasury.gov', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Visit Treasury.gov
                </Button>
              </motion.div>

              <motion.div 
                className="border rounded-lg p-4 bg-background"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Congress.gov</h4>
                    <p className="text-xs text-muted-foreground">Federal Legislation & Laws</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => window.open('https://www.congress.gov', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Visit Congress.gov
                </Button>
              </motion.div>

              <motion.div 
                className="border rounded-lg p-4 bg-background"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Social Security Administration</h4>
                    <p className="text-xs text-muted-foreground">SSA Benefits & Taxes</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => window.open('https://www.ssa.gov', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                  Visit SSA.gov
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold mb-2">Our Commitment to Accuracy</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every figure, provision, and tax strategy in this guide is directly sourced from official IRS publications, 
                    Treasury guidance, and federal legislation. All citations are provided with direct links for your verification. 
                    KGOB CPA Partners maintains rigorous standards of accuracy in our tax research.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold mb-2">Independent Verification</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We encourage you to verify all information using the provided government sources. Tax laws are complex 
                    and subject to interpretation—always consult with qualified tax professionals for personalized advice.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}