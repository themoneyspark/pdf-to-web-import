"use client";

import { useState } from "react";
import TaxGuideViewer from "@/components/TaxGuideViewer";
import ContentManagementInterface from "@/components/ContentManagementInterface";
import { Button } from "@/components/ui/button";
import { FileText, Settings, BookOpen, Layers, Calendar } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [showCMS, setShowCMS] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#17A2B8] via-[#138496] to-[#1a4d6d] text-white print:hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-Transparent-PNG-1762368837638.png?width=8000&height=8000&resize=contain"
                alt="KGOB - KohariGonzalez Oneyear&Brown CPAs & Advisors"
                width={400}
                height={140}
                className="h-28 w-auto"
                priority
              />
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              2025 Tax Planning Guide
            </motion.h1>
            <motion.p 
              className="text-xl text-cyan-100 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive strategies for business owners, executives, and high-net-worth individuals
            </motion.p>
            <motion.p 
              className="text-sm text-cyan-200 mb-8 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's Talk Growth<sup>®</sup> - Research and guidance by KGOB CPA Partners
            </motion.p>
            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                variant={showCMS ? "outline" : "secondary"}
                onClick={() => setShowCMS(false)}
                className={showCMS ? "bg-white/10 hover:bg-white/20 border-white/30" : ""}
              >
                <FileText className="mr-2 h-5 w-5" />
                View Tax Guide
              </Button>
              <Button
                size="lg"
                variant={showCMS ? "secondary" : "outline"}
                onClick={() => setShowCMS(true)}
                className={!showCMS ? "bg-white/10 hover:bg-white/20 border-white/30" : ""}
              >
                <Settings className="mr-2 h-5 w-5" />
                Content Management
              </Button>
            </motion.div>
          </div>
        </div>
        
        {!showCMS && (
          <motion.div 
            className="bg-white/10 backdrop-blur-sm border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Layers className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="text-cyan-100 text-sm">Core Categories</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">17</div>
                  <div className="text-cyan-100 text-sm">Strategic Sections</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-90" />
                  <div className="text-3xl font-bold mb-1">2025</div>
                  <div className="text-cyan-100 text-sm">Latest Tax Updates</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      {showCMS ? <ContentManagementInterface /> : <TaxGuideViewer />}

      {/* Print Header (hidden on screen) */}
      <div className="hidden print:block">
        <div className="text-center mb-8 pb-4 border-b">
          <h1 className="text-3xl font-bold">2025 Tax Planning Guide</h1>
          <h2 className="text-xl font-semibold mt-2">KGOB CPA Partners</h2>
          <p className="text-muted-foreground mt-2">
            KohariGonzalez Oneyear&Brown - CPAs & Advisors
          </p>
          <p className="text-sm text-muted-foreground italic mt-1">
            Let's Talk Growth<sup>®</sup>
          </p>
        </div>
      </div>
    </div>
  );
}