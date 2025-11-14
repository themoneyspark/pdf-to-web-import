"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, User, Briefcase, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface EntityImpact {
  id: number;
  entityType: string;
  provisionName: string;
  impactDescription: string;
  potentialSavings: string;
  year: number;
}

const entityIcons = {
  'C-Corp': Building2,
  'S-Corp': Briefcase,
  'Partnership': Users,
  'LLC': Building2,
  'Sole Proprietor': User,
  'Individual': User,
};

const entityColors = {
  'C-Corp': 'bg-blue-100 text-blue-800 border-blue-300',
  'S-Corp': 'bg-purple-100 text-purple-800 border-purple-300',
  'Partnership': 'bg-green-100 text-green-800 border-green-300',
  'LLC': 'bg-orange-100 text-orange-800 border-orange-300',
  'Sole Proprietor': 'bg-cyan-100 text-cyan-800 border-cyan-300',
  'Individual': 'bg-pink-100 text-pink-800 border-pink-300',
};

export default function EntityImpactAnalysis() {
  const [impacts, setImpacts] = useState<EntityImpact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<string>('all');

  useEffect(() => {
    async function fetchImpacts() {
      try {
        const response = await fetch('/api/entity-impacts?year=2025');
        const data = await response.json();
        setImpacts(data);
      } catch (error) {
        console.error('Error fetching entity impacts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImpacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading impact analysis...</p>
        </div>
      </div>
    );
  }

  const entityTypes = ['all', ...Array.from(new Set(impacts.map(i => i.entityType)))];
  const filteredImpacts = selectedEntity === 'all' 
    ? impacts 
    : impacts.filter(i => i.entityType === selectedEntity);

  const groupedByEntity = impacts.reduce((acc, impact) => {
    if (!acc[impact.entityType]) {
      acc[impact.entityType] = [];
    }
    acc[impact.entityType].push(impact);
    return acc;
  }, {} as Record<string, EntityImpact[]>);

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
      {/* Overview Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Entity Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(groupedByEntity).length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Different entity structures analyzed
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Total Provisions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{impacts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Tax provisions affecting entities
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                Savings Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Significant</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all entity types
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Entity Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Impact by Entity Type</CardTitle>
            <CardDescription>
              How 2025 tax changes affect different business structures and individuals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedEntity} onValueChange={setSelectedEntity} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto">
                <TabsTrigger value="all" className="text-xs">All Entities</TabsTrigger>
                {Object.keys(groupedByEntity).map(entityType => (
                  <TabsTrigger key={entityType} value={entityType} className="text-xs">
                    {entityType}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="mt-6 space-y-4">
                {filteredImpacts.map((impact, index) => {
                  const Icon = entityIcons[impact.entityType as keyof typeof entityIcons] || Building2;
                  const colorClass = entityColors[impact.entityType as keyof typeof entityColors] || 'bg-gray-100 text-gray-800';
                  
                  return (
                    <motion.div
                      key={impact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Card className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <Icon className="h-5 w-5 text-primary" />
                                <CardTitle className="text-lg">{impact.provisionName}</CardTitle>
                              </div>
                              <div>
                                <Badge className={colorClass} variant="outline">
                                  {impact.entityType}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs font-medium text-muted-foreground mb-1">
                                Potential Savings
                              </div>
                              <div className="text-sm font-bold text-green-600">
                                {impact.potentialSavings}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {impact.impactDescription}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {filteredImpacts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No impacts found for the selected entity type.
                    </p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Entity Comparison Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Entity Type Comparison</CardTitle>
            <CardDescription>
              Key considerations for each business structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedByEntity).map(([entityType, entityImpacts]) => {
                const Icon = entityIcons[entityType as keyof typeof entityIcons] || Building2;
                const colorClass = entityColors[entityType as keyof typeof entityColors] || 'bg-gray-100 text-gray-800';
                
                return (
                  <div key={entityType} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-md ${colorClass.split(' ')[0]}/20`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{entityType}</h4>
                        <p className="text-sm text-muted-foreground">
                          {entityImpacts.length} provision{entityImpacts.length !== 1 ? 's' : ''} applicable
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {entityImpacts.map((impact, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-md p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-sm font-medium">{impact.provisionName}</p>
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {impact.potentialSavings}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {impact.impactDescription}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Planning Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Strategic Planning Recommendations</CardTitle>
            <CardDescription>
              Key actions for maximizing tax benefits in 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Review Entity Structure</p>
                  <p className="text-sm text-muted-foreground">
                    Consider whether your current entity type maximizes available deductions and credits under 2025 provisions.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Capitalize on Temporary Provisions</p>
                  <p className="text-sm text-muted-foreground">
                    Take advantage of temporary deductions (tips, overtime, car loan interest) while they're available (2025-2028).
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Accelerate Equipment Purchases</p>
                  <p className="text-sm text-muted-foreground">
                    Leverage expanded Section 179 ($2.5M) and 100% bonus depreciation for qualifying property acquisitions.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="font-medium">Maximize SALT Deduction</p>
                  <p className="text-sm text-muted-foreground">
                    High-tax state residents can now deduct up to $40,000 in state and local taxes (up from $10,000).
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