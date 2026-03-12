/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Activity, 
  Database, 
  Layout, 
  Search, 
  ChevronRight, 
  Menu, 
  X, 
  Download,
  CheckCircle2,
  Zap,
  Cpu,
  Network,
  Terminal,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// --- Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'high' | 'medium' | 'low' }) => {
  const variants = {
    default: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    high: 'bg-red-100 text-red-800 border-red-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Card = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm ${className}`}>
    {title && (
      <div className="px-4 py-3 border-bottom border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">{title}</h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

const ArchitectureModule = ({ name, description, icon: Icon }: { name: string, description: string, icon: any }) => (
  <div className="flex flex-col items-center p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-center group hover:border-zinc-400 transition-colors">
    <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-zinc-600" />
    </div>
    <h4 className="text-sm font-bold text-zinc-800 mb-1">{name}</h4>
    <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
  </div>
);

// --- Main Application ---

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [useCaseStep, setUseCaseStep] = useState(0);

  const sections: Section[] = [
    {
      id: 'overview',
      title: 'Project Overview',
      icon: <Layout className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <p className="text-zinc-600 leading-relaxed">
            The <strong>Incident Response Management System (IRMS)</strong> is a specialized framework designed to streamline the lifecycle of cybersecurity incidents. In an era of sophisticated cyber threats, organizations can no longer rely on ad-hoc responses. This system provides a structured methodology for detecting, classifying, and mitigating security breaches, ensuring that every action is documented and aligned with industry best practices such as NIST SP 800-61.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
              <h4 className="text-xs font-bold uppercase text-zinc-400 mb-2">Primary Focus</h4>
              <p className="text-sm font-medium">Standardized Response</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
              <h4 className="text-xs font-bold uppercase text-zinc-400 mb-2">Target Audience</h4>
              <p className="text-sm font-medium">Enterprise SOC Teams</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-lg border border-zinc-100">
              <h4 className="text-xs font-bold uppercase text-zinc-400 mb-2">Framework Basis</h4>
              <p className="text-sm font-medium">NIST & SANS IR Lifecycle</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'Problem Statement',
      icon: <AlertTriangle className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-red-800 text-sm italic">
              "The average time to identify and contain a data breach is 277 days. Manual handling of security logs and disparate response tools often lead to critical delays, allowing attackers to persist within the network."
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-zinc-800">Key Challenges:</h4>
            <ul className="space-y-3">
              {[
                { title: 'Information Overload', desc: 'Security teams are overwhelmed by thousands of alerts daily, making it difficult to distinguish true incidents from false positives.' },
                { title: 'Lack of Standardization', desc: 'Inconsistent response procedures lead to errors and missed steps during high-pressure containment phases.' },
                { title: 'Documentation Gaps', desc: 'Manual timeline creation is prone to errors, hindering post-incident forensic analysis and regulatory compliance.' },
                { title: 'Delayed Containment', desc: 'Without automated workflows, the "dwell time" of malware increases, leading to greater data loss.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-800 text-sm">{item.title}:</span>
                    <span className="text-zinc-600 text-sm ml-1">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'objectives',
      title: 'Project Objectives',
      icon: <CheckCircle2 className="w-4 h-4" />,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Incident Identification', desc: 'Develop a robust mechanism to aggregate logs and identify anomalous behavior across the infrastructure.', icon: Search },
            { title: 'Severity Classification', desc: 'Implement a logic-based engine to categorize incidents (Low, Medium, High, Critical) based on impact and urgency.', icon: Shield },
            { title: 'Automated Timelines', desc: 'Create a system that automatically timestamps and logs every security event to build a forensic-ready timeline.', icon: Clock },
            { title: 'Containment Planning', desc: 'Provide pre-defined playbooks for rapid containment and recovery actions based on incident type.', icon: Zap },
            { title: 'Summary Reporting', desc: 'Generate comprehensive, professional reports for stakeholders and regulatory bodies.', icon: FileText }
          ].map((obj, i) => (
            <div key={i} className="flex gap-4 p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                <obj.icon className="w-5 h-5 text-zinc-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-800 mb-1">{obj.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{obj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'scope',
      title: 'Project Scope',
      icon: <Network className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600">In-Scope</h4>
              <ul className="space-y-2">
                {['Endpoint & Network Monitoring', 'Automated Severity Scoring', 'Incident Playbook Generation', 'Digital Forensic Timeline Analysis', 'Post-Incident Review Documentation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-red-600">Out-of-Scope</h4>
              <ul className="space-y-2">
                {['Physical Security Breach Handling', 'Active Counter-Offensive Operations', 'Legal Prosecution Services', 'Hardware Replacement Logistics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                    <X className="w-4 h-4 text-red-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'architecture',
      title: 'System Architecture',
      icon: <Cpu className="w-4 h-4" />,
      content: (
        <div className="space-y-8">
          <div className="p-8 bg-zinc-900 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4">
              <ArchitectureModule name="Detection" description="SIEM/Log Aggregator" icon={Search} />
              <div className="flex items-center justify-center"><ChevronRight className="text-zinc-700 hidden md:block" /></div>
              <ArchitectureModule name="Analysis" description="Classification Engine" icon={Activity} />
              <div className="flex items-center justify-center"><ChevronRight className="text-zinc-700 hidden md:block" /></div>
              <ArchitectureModule name="Response" description="Orchestration & Reporting" icon={Terminal} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-zinc-800">Core Modules Interaction:</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                The <strong>Detection Module</strong> feeds raw events into the <strong>Classification Module</strong>, which uses a weighted matrix to determine severity. The <strong>Timeline Module</strong> captures these state changes in real-time, while the <strong>Recovery Module</strong> suggests specific playbooks based on the incident profile.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-zinc-800">Data Flow:</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Raw Logs &rarr; Event Correlation &rarr; Incident Trigger &rarr; Severity Scoring &rarr; Containment Execution &rarr; Final Report Generation.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'scenario',
      title: 'Use Case Scenario',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900">Scenario: Phishing-Induced Malware</h4>
                <p className="text-sm text-zinc-600">An employee opens a "Q4_Invoice.zip" attachment from a spoofed email address.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative flex justify-between">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-200 -z-0" />
                {[
                  { label: 'Detection', icon: Search },
                  { label: 'Classification', icon: Activity },
                  { label: 'Timeline', icon: Clock },
                  { label: 'Containment', icon: Zap }
                ].map((step, i) => (
                  <button 
                    key={i}
                    onClick={() => setUseCaseStep(i)}
                    className={`relative z-10 flex flex-col items-center gap-2 group`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${useCaseStep >= i ? 'bg-zinc-900 text-white shadow-lg' : 'bg-white border-2 border-zinc-200 text-zinc-400'}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${useCaseStep >= i ? 'text-zinc-900' : 'text-zinc-400'}`}>{step.label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={useCaseStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm"
                >
                  {useCaseStep === 0 && (
                    <div className="space-y-2">
                      <Badge variant="medium">Detection Phase</Badge>
                      <p className="text-sm text-zinc-700">EDR (Endpoint Detection & Response) flags suspicious process <code>powershell.exe</code> spawning from <code>outlook.exe</code>. System triggers an alert.</p>
                    </div>
                  )}
                  {useCaseStep === 1 && (
                    <div className="space-y-2">
                      <Badge variant="high">Classification: HIGH</Badge>
                      <p className="text-sm text-zinc-700">System identifies the malware as <strong>Ransomware-variant-X</strong>. Impact: Critical Assets. Urgency: Immediate. Severity set to HIGH.</p>
                    </div>
                  )}
                  {useCaseStep === 2 && (
                    <div className="space-y-2">
                      <Badge>Timeline Analysis</Badge>
                      <p className="text-sm text-zinc-700 font-mono text-[11px]">
                        [09:12:04] Email Received<br/>
                        [09:14:22] Attachment Opened<br/>
                        [09:14:25] C2 Connection Established<br/>
                        [09:15:01] Lateral Movement Attempt Detected
                      </p>
                    </div>
                  )}
                  {useCaseStep === 3 && (
                    <div className="space-y-2">
                      <Badge variant="low">Containment Suggetions</Badge>
                      <ul className="text-sm text-zinc-700 list-disc pl-4 space-y-1">
                        <li>Isolate Host: 192.168.1.45</li>
                        <li>Disable User Account: j.doe@org.com</li>
                        <li>Block IP: 45.23.11.9 (C2 Server)</li>
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'workflow',
      title: 'Project Workflow',
      icon: <Activity className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          {[
            { step: '01', title: 'Preparation', desc: 'Establishing the IR team, tools, and communication channels.' },
            { step: '02', title: 'Detection & Analysis', desc: 'Monitoring logs and identifying the scope of the incident.' },
            { step: '03', title: 'Containment', desc: 'Short-term and long-term actions to stop the spread.' },
            { step: '04', title: 'Eradication', desc: 'Removing the root cause (malware, compromised accounts).' },
            { step: '05', title: 'Recovery', desc: 'Restoring systems to normal operation and monitoring.' },
            { step: '06', title: 'Post-Incident Activity', desc: 'Lessons learned and final reporting.' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6 p-4 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors group">
              <span className="text-2xl font-black text-zinc-200 group-hover:text-zinc-900 transition-colors font-mono">{item.step}</span>
              <div>
                <h4 className="text-sm font-bold text-zinc-800">{item.title}</h4>
                <p className="text-xs text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'implementation',
      title: 'Assignment Implementation',
      icon: <Terminal className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card title="Identification & Classification" className="!p-0">
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase">
                  <span>Logic Engine</span>
                  <span>Active</span>
                </div>
                <div className="bg-zinc-900 p-3 rounded font-mono text-[10px] text-emerald-400">
                  <code>
                    IF (impact == "Financial" && spread == "Global") <br/>
                    &nbsp;&nbsp;severity = "CRITICAL";<br/>
                    ELSE IF (data_leak == TRUE)<br/>
                    &nbsp;&nbsp;severity = "HIGH";
                  </code>
                </div>
              </div>
            </Card>
            <Card title="Timeline Creation" className="!p-0">
              <div className="p-4 space-y-2">
                <div className="flex gap-3 items-start border-l-2 border-zinc-200 pl-3 pb-2">
                  <div className="text-[10px] font-mono text-zinc-400">T+0</div>
                  <div className="text-xs text-zinc-600">Initial compromise detected via SIEM alert.</div>
                </div>
                <div className="flex gap-3 items-start border-l-2 border-zinc-200 pl-3 pb-2">
                  <div className="text-[10px] font-mono text-zinc-400">T+5m</div>
                  <div className="text-xs text-zinc-600">Automated classification triggered.</div>
                </div>
                <div className="flex gap-3 items-start border-l-2 border-zinc-900 pl-3">
                  <div className="text-[10px] font-mono text-zinc-900 font-bold">T+12m</div>
                  <div className="text-xs text-zinc-900 font-medium">Containment playbook initiated.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: <Database className="w-4 h-4" />,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Splunk / ELK', category: 'SIEM' },
            { name: 'CrowdStrike', category: 'EDR' },
            { name: 'Wireshark', category: 'Network' },
            { name: 'TheHive', category: 'Case Mgmt' },
            { name: 'Cortex XSOAR', category: 'SOAR' },
            { name: 'Volatility', category: 'Forensics' },
            { name: 'MISP', category: 'Threat Intel' },
            { name: 'Snort', category: 'IDS/IPS' }
          ].map((tool, i) => (
            <div key={i} className="p-3 bg-white border border-zinc-200 rounded-lg text-center shadow-sm">
              <div className="text-[10px] font-bold text-zinc-400 uppercase mb-1">{tool.category}</div>
              <div className="text-xs font-bold text-zinc-800">{tool.name}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'outcomes',
      title: 'Expected Outcomes',
      icon: <Zap className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
              <div className="text-3xl font-bold text-emerald-700 mb-1">-65%</div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Response Time</div>
            </div>
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl text-center">
              <div className="text-3xl font-bold text-blue-700 mb-1">100%</div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Compliance</div>
            </div>
            <div className="p-6 bg-purple-50 border border-purple-100 rounded-2xl text-center">
              <div className="text-3xl font-bold text-purple-700 mb-1">-40%</div>
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Dwell Time</div>
            </div>
          </div>
          <p className="text-sm text-zinc-600 leading-relaxed text-center max-w-2xl mx-auto">
            By implementing this IRMS, the organization transitions from a reactive posture to a proactive, data-driven defense mechanism, significantly reducing the financial and reputational impact of security incidents.
          </p>
        </div>
      )
    },
    {
      id: 'future',
      title: 'Future Enhancements',
      icon: <Search className="w-4 h-4" />,
      content: (
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-zinc-900 text-white rounded-xl">
            <div className="p-2 bg-white/10 rounded-lg shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold mb-1">AI-Driven Threat Hunting</h4>
              <p className="text-xs text-zinc-400">Integrating Large Language Models (LLMs) to analyze complex attack patterns and suggest novel containment strategies.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 border border-zinc-200 rounded-xl">
            <div className="p-2 bg-zinc-100 rounded-lg shrink-0">
              <Lock className="w-5 h-5 text-zinc-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold mb-1">Blockchain for Log Integrity</h4>
              <p className="text-xs text-zinc-500">Utilizing distributed ledger technology to ensure that incident logs are immutable and tamper-proof for legal evidence.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="space-y-6 text-center max-w-3xl mx-auto py-8">
          <div className="inline-flex p-4 bg-zinc-100 rounded-full mb-4">
            <Shield className="w-12 h-12 text-zinc-900" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-900">Securing the Digital Frontier</h3>
          <p className="text-zinc-600 leading-relaxed">
            The <strong>Incident Response Management System</strong> is not just a technical tool; it is a strategic asset. In the face of evolving cyber threats, the ability to respond with precision, speed, and clarity is what separates resilient organizations from those that suffer catastrophic losses. This project demonstrates a scalable, professional framework that addresses the core challenges of modern cybersecurity operations.
          </p>
          <div className="pt-8 border-t border-zinc-100 flex flex-col items-center">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Project Submitted By</p>
            <p className="text-sm font-bold text-zinc-800">Incident Response Intern Team</p>
            <p className="text-xs text-zinc-500">Cybersecurity Department &bull; Academic Year 2025-2026</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-zinc-200 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-zinc-900" />
          <span className="font-bold tracking-tight">IRMS Project</span>
        </div>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-zinc-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="h-full flex flex-col">
            <div className="p-8 border-b border-zinc-100 hidden lg:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-900 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-tight tracking-tight">IRMS</h1>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Cybersecurity Project</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${activeSection === section.id 
                      ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200' 
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'}
                  `}
                >
                  {section.icon}
                  {section.title}
                  {activeSection === section.id && (
                    <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </nav>

            <div className="p-6 border-t border-zinc-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-100 transition-colors">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F9F9F9] relative">
          <div className="max-w-5xl mx-auto p-6 lg:p-12">
            {/* Header / Title Section */}
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default">Academic Submission</Badge>
                <div className="h-px flex-1 bg-zinc-200" />
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEM ONLINE
                </div>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold text-zinc-900 tracking-tight leading-[0.9] mb-6">
                Incident Response <br />
                <span className="text-zinc-400">Management System</span>
              </h2>
              <p className="text-lg text-zinc-500 max-w-2xl font-light leading-relaxed">
                A comprehensive framework for handling cybersecurity incidents through structured identification, classification, and mitigation strategies.
              </p>
            </header>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card title={sections.find(s => s.id === activeSection)?.title}>
                  {sections.find(s => s.id === activeSection)?.content}
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-zinc-200 flex justify-between items-center">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                &copy; 2026 Cybersecurity OJT Project
              </div>
              <div className="flex gap-4">
                <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Layout className="w-5 h-5" />
                </button>
                <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E5E5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D4D4D4;
        }
      `}</style>
    </div>
  );
}
