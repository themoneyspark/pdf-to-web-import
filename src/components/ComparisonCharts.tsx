"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#17A2B8', '#138496', '#0C2E4E', '#1a4d6d', '#22c1dd'];

interface ComparisonData {
  taxBrackets: {
    2024: any[];
    2025: any[];
  };
  standardDeductions: {
    2024: any[];
    2025: any[];
  };
  retirementLimits: {
    2024: any[];
    2025: any[];
  };
  saltDeductions: {
    2024: any[];
    2025: any[];
  };
}

export default function ComparisonCharts() {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/comparison-data');
        const data = await response.json();
        setComparisonData(data);
      } catch (error) {
        console.error('Error fetching comparison data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-muted-foreground">Loading comparison data...</p>
        </div>
      </div>
    );
  }

  if (!comparisonData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No comparison data available.</p>
      </div>
    );
  }

  // Prepare Standard Deductions Comparison
  const standardDeductionsComparison = comparisonData.standardDeductions[2024]?.map((item: any) => {
    const item2025 = comparisonData.standardDeductions[2025]?.find((d: any) => d.filingStatus === item.filingStatus);
    return {
      filingStatus: item.filingStatus,
      '2024': item.amount,
      '2025': item2025?.amount || 0,
      increase: item2025 ? item2025.amount - item.amount : 0,
    };
  }) || [];

  // Prepare Retirement Limits Comparison
  const retirementLimitsComparison = comparisonData.retirementLimits[2024]?.map((item: any) => {
    const item2025 = comparisonData.retirementLimits[2025]?.find((r: any) => r.accountType === item.accountType);
    return {
      accountType: item.accountType,
      '2024': item.contributionLimit,
      '2025': item2025?.contributionLimit || 0,
      increase: item2025 ? item2025.contributionLimit - item.contributionLimit : 0,
    };
  }) || [];

  // Prepare SALT Deduction Comparison
  const saltComparison = comparisonData.saltDeductions[2024]?.map((item: any) => {
    const item2025 = comparisonData.saltDeductions[2025]?.find((s: any) => s.filingStatus === item.filingStatus);
    return {
      filingStatus: item.filingStatus,
      '2024': item.deductionCap,
      '2025': item2025?.deductionCap || 0,
      increase: item2025 ? item2025.deductionCap - item.deductionCap : 0,
    };
  }) || [];

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
      {/* Summary Cards */}
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
                <DollarSign className="h-4 w-4 text-primary" />
                Standard Deduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  ${standardDeductionsComparison.find(d => d.filingStatus === "Single")?.['2025']?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Single Filers (2025)
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">
                    +${standardDeductionsComparison.find(d => d.filingStatus === "Single")?.increase?.toLocaleString() || 0}
                  </span>
                  <span className="text-muted-foreground">vs 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                401(k) Limit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  ${retirementLimitsComparison.find(r => r.accountType === "401k")?.['2025']?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Annual Contribution (2025)
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">
                    +${retirementLimitsComparison.find(r => r.accountType === "401k")?.increase?.toLocaleString() || 0}
                  </span>
                  <span className="text-muted-foreground">vs 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                SALT Deduction Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  ${saltComparison.find(s => s.filingStatus === "Single")?.['2025']?.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum Deduction (2025)
                </p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-600">
                    +${saltComparison.find(s => s.filingStatus === "Single")?.increase?.toLocaleString() || 0}
                  </span>
                  <span className="text-muted-foreground">vs 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Standard Deductions Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Standard Deduction: 2024 vs 2025</CardTitle>
            <CardDescription>
              Inflation-adjusted increases across all filing statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={standardDeductionsComparison} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="filingStatus" 
                    angle={-15} 
                    textAnchor="end" 
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="2024" fill={COLORS[2]} name="2024" />
                  <Bar dataKey="2025" fill={COLORS[0]} name="2025" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Retirement Limits Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Retirement Contribution Limits: 2024 vs 2025</CardTitle>
            <CardDescription>
              Annual contribution limits for various retirement accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={retirementLimitsComparison} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="accountType" 
                    angle={-15} 
                    textAnchor="end" 
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Contribution Limit ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="2024" fill={COLORS[2]} name="2024" />
                  <Bar dataKey="2025" fill={COLORS[0]} name="2025" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* SALT Deduction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>SALT Deduction Cap: 2024 vs 2025</CardTitle>
            <CardDescription>
              <Badge variant="secondary" className="mr-2">NEW FOR 2025</Badge>
              Significant increase from $10,000 to $40,000
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={saltComparison} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="filingStatus" />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Deduction Cap ($)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="2024" fill={COLORS[2]} name="2024" />
                  <Bar dataKey="2025" fill={COLORS[0]} name="2025" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Detailed Year-Over-Year Comparison</CardTitle>
            <CardDescription>
              Complete breakdown of all major tax limit changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Standard Deductions</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filing Status</TableHead>
                      <TableHead className="text-right">2024</TableHead>
                      <TableHead className="text-right">2025</TableHead>
                      <TableHead className="text-right">Increase</TableHead>
                      <TableHead className="text-right">% Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {standardDeductionsComparison.map((item) => (
                      <TableRow key={item.filingStatus}>
                        <TableCell className="font-medium">{item.filingStatus}</TableCell>
                        <TableCell className="text-right">${item['2024'].toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">${item['2025'].toLocaleString()}</TableCell>
                        <TableCell className="text-right text-green-600">+${item.increase.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-green-600">+{((item.increase / item['2024']) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Retirement Contribution Limits</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Type</TableHead>
                      <TableHead className="text-right">2024</TableHead>
                      <TableHead className="text-right">2025</TableHead>
                      <TableHead className="text-right">Increase</TableHead>
                      <TableHead className="text-right">% Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retirementLimitsComparison.map((item) => (
                      <TableRow key={item.accountType}>
                        <TableCell className="font-medium">{item.accountType}</TableCell>
                        <TableCell className="text-right">${item['2024'].toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">${item['2025'].toLocaleString()}</TableCell>
                        <TableCell className="text-right text-green-600">
                          {item.increase > 0 ? `+$${item.increase.toLocaleString()}` : 'Unchanged'}
                        </TableCell>
                        <TableCell className="text-right text-green-600">
                          {item.increase > 0 ? `+${((item.increase / item['2024']) * 100).toFixed(1)}%` : '0%'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}