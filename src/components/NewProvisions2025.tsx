"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Clock, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Provision {
  id: number;
  provisionName: string;
  description: string;
  effectiveDate: string;
  expirationDate: string | null;
  publicLawCitation: string;
  ircSection: string;
  isTemporary: boolean;
}

export default function NewProvisions2025() {
  const [provisions, setProvisions] = useState<Provision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProvisions() {
      try {
        const response = await fetch('/api/new-provisions');
        const data = await response.json();
        setProvisions(data);
      } catch (error) {
        console.error('Error fetching provisions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProvisions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading new provisions...</p>
        </div>
      </div>
    );
  }

  const temporaryProvisions = provisions.filter(p => p.isTemporary);
  const permanentProvisions = provisions.filter(p => !p.isTemporary);

  return (
    <div className="space-y-8">
      {/* Header Alert */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Alert className="border-primary/50 bg-primary/5">
          <Sparkles className="h-5 w-5 text-primary" />
          <AlertTitle className="text-lg font-semibold">What's New in 2025</AlertTitle>
          <AlertDescription className="mt-2">
            The One Big Beautiful Bill Act (P.L. 119-21) introduced significant tax changes for 2025. 
            Below are provisions that did not exist in 2024, including temporary deductions and permanent expansions.
          </AlertDescription>
        </Alert>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="temporary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="temporary" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Temporary (2025-2028)
              <Badge variant="secondary" className="ml-1">{temporaryProvisions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="permanent" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Permanent Changes
              <Badge variant="secondary" className="ml-1">{permanentProvisions.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temporary" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 gap-6">
              {temporaryProvisions.map((provision, index) => (
                <motion.div
                  key={provision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{provision.provisionName}</CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {provision.ircSection}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {provision.publicLawCitation}
                            </Badge>
                          </CardDescription>
                        </div>
                        <Badge variant="destructive" className="shrink-0">
                          Temporary
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{provision.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Effective Date</p>
                          <p className="text-sm font-semibold">{provision.effectiveDate}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Expiration Date</p>
                          <p className="text-sm font-semibold">
                            {provision.expirationDate || 'Not specified'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        <span>Reference: {provision.publicLawCitation}, {provision.ircSection}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {temporaryProvisions.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No temporary provisions found.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="permanent" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 gap-6">
              {permanentProvisions.map((provision, index) => (
                <motion.div
                  key={provision.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <Card className="border-l-4 border-l-green-600">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{provision.provisionName}</CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {provision.ircSection}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {provision.publicLawCitation}
                            </Badge>
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-600 hover:bg-green-700 shrink-0">
                          Permanent
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed">{provision.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Effective Date</p>
                          <p className="text-sm font-semibold">{provision.effectiveDate}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Status</p>
                          <p className="text-sm font-semibold text-green-600">
                            Permanent Provision
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        <span>Reference: {provision.publicLawCitation}, {provision.ircSection}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {permanentProvisions.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">No permanent provisions found.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Key Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
            <CardDescription>Understanding the 2025 tax landscape</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Temporary Deductions (2025-2028)</p>
                  <p className="text-sm text-muted-foreground">
                    New deductions for tip income, overtime pay, and car loan interest are available for four years only.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-green-600 mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Permanent Expansions</p>
                  <p className="text-sm text-muted-foreground">
                    Section 179 limit increased to $2.5M, 100% bonus depreciation restored, and TCJA provisions made permanent.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">SALT Deduction Increase</p>
                  <p className="text-sm text-muted-foreground">
                    State and Local Tax deduction cap raised from $10,000 to $40,000 for 2025-2029, a 400% increase.
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