"use client";

import { DollarSign, TrendingUp, Users, Building2, PieChart, Calculator, Calendar, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TaxSummaryDashboard() {
  const keyFigures = [
    {
      title: "Standard Deduction",
      single: "$15,000",
      married: "$30,000",
      icon: DollarSign,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      title: "Top Tax Rate",
      single: "37%",
      married: "37%",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/50",
    },
    {
      title: "Social Security Wage Base",
      single: "$176,100",
      married: "$176,100",
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      title: "Section 179 Deduction",
      single: "$1,250,000",
      married: "$1,250,000",
      icon: Building2,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
    },
    {
      title: "Long-Term Capital Gains (Max)",
      single: "20%",
      married: "20%",
      icon: PieChart,
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/50",
    },
    {
      title: "SALT Deduction Cap",
      single: "$40,000",
      married: "$40,000",
      icon: Calculator,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/50",
    },
  ];

  const taxBrackets = [
    { rate: "10%", single: "$0 - $11,925", married: "$0 - $23,850" },
    { rate: "12%", single: "$11,926 - $48,475", married: "$23,851 - $96,950" },
    { rate: "22%", single: "$48,476 - $103,350", married: "$96,951 - $206,700" },
    { rate: "24%", single: "$103,351 - $197,300", married: "$206,701 - $394,600" },
    { rate: "32%", single: "$197,301 - $250,525", married: "$394,601 - $501,050" },
    { rate: "35%", single: "$250,526 - $626,350", married: "$501,051 - $751,600" },
    { rate: "37%", single: "$626,351+", married: "$751,601+" },
  ];

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
    <div className="space-y-6 mb-12">
      {/* Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-2">2025 Tax Year Key Figures</h2>
        <p className="text-muted-foreground">
          Essential tax rates, limits, and thresholds for strategic planning
        </p>
      </motion.div>

      {/* Key Figures Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {keyFigures.map((figure, index) => {
          const Icon = figure.icon;
          return (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }}>
              <Card className="overflow-hidden h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${figure.bgColor}`}>
                      <Icon className={`h-5 w-5 ${figure.color}`} />
                    </div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {figure.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-muted-foreground">Single:</span>
                      <span className="text-xl font-bold">{figure.single}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-muted-foreground">Married:</span>
                      <span className="text-xl font-bold">{figure.married}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tax Brackets Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              2025 Federal Income Tax Brackets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Tax Rate</th>
                    <th className="text-left py-3 px-4 font-semibold">Single Filers</th>
                    <th className="text-left py-3 px-4 font-semibold">Married Filing Jointly</th>
                  </tr>
                </thead>
                <tbody>
                  {taxBrackets.map((bracket, index) => (
                    <motion.tr 
                      key={index} 
                      className="border-b last:border-0 hover:bg-muted/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    >
                      <td className="py-3 px-4">
                        <span className="font-semibold text-primary">{bracket.rate}</span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{bracket.single}</td>
                      <td className="py-3 px-4 text-muted-foreground">{bracket.married}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              <strong>Note:</strong> Tax rates shown are for ordinary income. Long-term capital gains and qualified dividends 
              are taxed at preferential rates of 0%, 15%, or 20% depending on income level.
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Dates */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">Tax Filing Deadline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">April 15, 2026</p>
              <p className="text-xs text-muted-foreground mt-1">For 2025 tax year returns</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">IRA Contribution Limit</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$7,000</p>
              <p className="text-xs text-muted-foreground mt-1">$8,000 if age 50+ (catch-up)</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">401(k) Contribution Limit</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">$23,500</p>
              <p className="text-xs text-muted-foreground mt-1">$31,000 if age 50+ (catch-up)</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* KGOB Branding Footer */}
      <motion.div 
        className="text-center pt-4 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-sm text-muted-foreground">
          <strong>Research & Guidance by KGOB CPA Partners</strong>
          <br />
          KohariGonzalez Oneyear&Brown - CPAs & Advisors
          <br />
          <em className="text-xs">Let's Talk Growth<sup>®</sup></em>
        </p>
      </motion.div>
    </div>
  );
}