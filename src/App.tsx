import React, { useState } from 'react';
import { 
  Map, 
  School, 
  Terminal, 
  Library, 
  LineChart, 
  Settings, 
  HelpCircle, 
  Search, 
  Bell, 
  Bolt, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  PlayCircle, 
  Github, 
  FileText, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { ROADMAP_DATA, RoadmapStage, Resource } from './constants';

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-4 py-3 transition-all duration-200 group relative",
      active 
        ? "text-secondary font-bold bg-surface-container border-r-2 border-secondary" 
        : "text-tertiary hover:text-on-surface hover:bg-surface-container/50"
    )}
  >
    <Icon className={cn("mr-3 w-5 h-5 transition-transform group-hover:scale-110", active && "text-secondary")} />
    <span className="font-headline tracking-tight text-sm">{label}</span>
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute inset-0 bg-secondary/5 -z-10"
      />
    )}
  </button>
);

const ResourceIcon = ({ type }: { type: Resource['type'] }) => {
  switch (type) {
    case 'video': return <PlayCircle className="w-4 h-4" />;
    case 'github': return <Github className="w-4 h-4" />;
    case 'paper': return <FileText className="w-4 h-4" />;
    case 'doc': return <ExternalLink className="w-4 h-4" />;
  }
};

const StageCard = ({ stage }: { stage: RoadmapStage }) => {
  const isActive = stage.status === 'active';
  const isCompleted = stage.status === 'completed';
  const isLocked = stage.status === 'locked';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative bg-surface-container rounded-xl p-6 border-l-4 transition-all group overflow-hidden",
        isCompleted ? "border-secondary/40 hover:border-secondary" : 
        isActive ? "border-secondary glow-pulse" : "border-outline opacity-80"
      )}
    >
      {/* Background Icon Watermark */}
      <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
        <Map className="w-32 h-32" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={cn(
            "inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest mb-2",
            isCompleted ? "bg-secondary/10 text-secondary" : 
            isActive ? "bg-secondary/20 text-secondary" : "bg-surface-highest text-tertiary"
          )}>
            Stage {stage.id}
          </span>
          <h3 className="text-xl font-bold font-headline text-on-surface">{stage.subtitle}</h3>
          <p className="text-xs text-tertiary mt-1 font-medium">{stage.title}</p>
        </div>
        {isCompleted ? (
          <CheckCircle2 className="text-secondary w-6 h-6" />
        ) : isLocked ? (
          <Lock className="text-tertiary w-5 h-5" />
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Active Focus</span>
          </div>
        )}
      </div>

      <p className="text-sm text-tertiary mb-6 leading-relaxed">{stage.description}</p>

      <div className="space-y-4 mb-6">
        {stage.modules.map((module, idx) => (
          <div key={idx} className="bg-surface-container-low p-4 rounded-lg border border-outline/10">
            <h4 className="text-sm font-bold text-on-surface mb-2">{module.title}</h4>
            <p className="text-xs text-tertiary leading-relaxed mb-3">{module.content}</p>
            {module.resources && module.resources.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {module.resources.map((res, rIdx) => (
                  <a
                    key={rIdx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2 py-1 bg-surface-highest/50 hover:bg-secondary/20 text-[10px] text-tertiary hover:text-secondary rounded transition-colors border border-outline/10"
                  >
                    <ResourceIcon type={res.type} />
                    <span>{res.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${stage.progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-secondary" 
          />
        </div>
        <span className="text-[10px] font-mono text-tertiary">{stage.progress}% TOTAL</span>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <div className="flex min-h-screen bg-background text-on-surface selection:bg-secondary/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col py-6 bg-surface-low border-r border-outline/15 z-50">
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
              <Terminal className="text-background w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-on-surface tracking-wider font-headline uppercase">Synthetic Lab</h1>
              <p className="text-[10px] text-tertiary font-medium uppercase tracking-widest opacity-70">LLM Specialist</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          <SidebarItem icon={Map} label="Roadmap" active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} />
          <SidebarItem icon={School} label="Learning" active={activeTab === 'learning'} onClick={() => setActiveTab('learning')} />
          <SidebarItem icon={Terminal} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <SidebarItem icon={Library} label="Resources" active={activeTab === 'resources'} onClick={() => setActiveTab('resources')} />
          <SidebarItem icon={LineChart} label="Strategy" active={activeTab === 'strategy'} onClick={() => setActiveTab('strategy')} />
        </nav>

        <div className="mt-auto px-4 space-y-2">
          <button className="w-full bg-gradient-to-br from-primary to-secondary text-background py-2.5 rounded-lg font-bold text-sm tracking-tight active:scale-95 transition-transform shadow-lg shadow-secondary/10">
            New Experiment
          </button>
          <div className="pt-4 space-y-1">
            <button className="flex items-center w-full px-4 py-2 text-tertiary hover:text-on-surface transition-colors">
              <Settings className="mr-3 w-4 h-4" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="flex items-center w-full px-4 py-2 text-tertiary hover:text-on-surface transition-colors">
              <HelpCircle className="mr-3 w-4 h-4" />
              <span className="text-sm font-medium">Support</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64 flex-1">
        {/* Header */}
        <header className="sticky top-0 h-16 flex justify-between items-center px-8 bg-background/80 backdrop-blur-xl z-40 border-b border-outline/10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search knowledge base..." 
                className="w-full bg-surface-container-lowest border-none text-sm py-2 pl-10 pr-4 rounded-lg focus:ring-1 focus:ring-secondary transition-all placeholder:text-tertiary/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <button className="text-tertiary hover:text-secondary transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full glow-pulse" />
              </button>
              <button className="text-tertiary hover:text-secondary transition-colors">
                <Bolt className="w-5 h-5" />
              </button>
            </div>
            <div className="h-8 w-px bg-outline/30" />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-on-surface leading-none">Alex Rivera</p>
                <p className="text-[10px] text-tertiary uppercase tracking-widest mt-1">Senior Architect</p>
              </div>
              <div className="w-9 h-9 rounded-full border border-secondary/20 overflow-hidden bg-surface-container">
                <img 
                  src="https://picsum.photos/seed/engineer/100/100" 
                  alt="User Avatar" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'roadmap' && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black text-on-surface font-headline tracking-tighter uppercase mb-2">Growth Roadmap</h2>
                    <p className="text-tertiary max-w-xl">A comprehensive architectural progression from fundamental theory to high-performance distributed systems and career strategy.</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline/10 flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-tertiary uppercase font-bold tracking-widest">Overall Progress</p>
                      <p className="text-xl font-headline font-bold text-secondary">62%</p>
                    </div>
                    <div className="w-24 h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-[62%] glow-pulse" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-8 space-y-6">
                    {ROADMAP_DATA.map((stage) => (
                      <StageCard key={stage.id} stage={stage} />
                    ))}
                  </div>

                  <div className="col-span-12 lg:col-span-4 space-y-6">
                    {/* Next Goal Card */}
                    <div className="bg-gradient-to-br from-surface-highest to-surface-container rounded-xl p-1 shadow-2xl">
                      <div className="bg-surface-container rounded-[calc(0.75rem-4px)] p-6 h-full">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-secondary/20 p-2 rounded-lg">
                            <Activity className="text-secondary w-5 h-5" />
                          </div>
                          <h4 className="font-headline font-bold text-lg uppercase tracking-tight">Next Goal</h4>
                        </div>
                        <div className="mb-8">
                          <h5 className="text-on-surface font-medium mb-2">FlashAttention Implementation</h5>
                          <p className="text-xs text-tertiary leading-relaxed">Optimize the attention mechanism for longer sequence lengths using tiled memory access patterns.</p>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-secondary text-background font-bold py-3 rounded-lg text-sm transition-transform active:scale-95">
                          Start Session
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-surface-container-low rounded-xl p-6 border border-outline/10">
                      <h4 className="font-headline font-bold text-sm uppercase tracking-widest text-tertiary mb-6">Technical Status</h4>
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-1 h-12 bg-secondary rounded-full" />
                          <div>
                            <p className="text-xs font-bold text-on-surface">Compute Utilization</p>
                            <p className="text-[10px] text-tertiary mt-1 italic">H100 Node #4 Active</p>
                            <div className="flex gap-1 mt-2">
                              {[1, 2, 3].map(i => <div key={i} className="w-4 h-1 bg-secondary" />)}
                              {[1, 2].map(i => <div key={i} className="w-4 h-1 bg-secondary/30" />)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-1 h-12 bg-outline rounded-full" />
                          <div>
                            <p className="text-xs font-bold text-on-surface">Paper Reading Queue</p>
                            <p className="text-[10px] text-tertiary mt-1">3 unread from ArXiv</p>
                            <div className="flex -space-x-2 mt-2">
                              {['LL', 'TS', '+1'].map((t, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-surface-highest border border-surface-container flex items-center justify-center text-[8px] font-bold">
                                  {t}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Market Strategy */}
                    <div className="relative rounded-xl h-48 overflow-hidden group">
                      <img 
                        src="https://picsum.photos/seed/network/600/400" 
                        alt="Market Strategy" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6 flex flex-col justify-end">
                        <h4 className="font-headline font-bold text-white uppercase tracking-tighter flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Market Strategy
                        </h4>
                        <p className="text-white/70 text-[10px] mt-1">Unlock Stage 4 to see market trends.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bento Stats Footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: "Labs Completed", value: "14", icon: Terminal },
                    { label: "Study Hours", value: "128.5", icon: School },
                    { label: "Github Stars", value: "42", icon: Github, highlight: true },
                    { label: "Contribution Rank", value: "TOP 5%", icon: Award },
                  ].map((stat, i) => (
                    <div key={i} className="bg-surface-container-low p-6 rounded-xl border border-outline/10">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] text-tertiary uppercase tracking-widest font-bold">{stat.label}</p>
                        <stat.icon className={cn("w-4 h-4", stat.highlight ? "text-secondary" : "text-tertiary")} />
                      </div>
                      <p className={cn("text-2xl font-headline font-bold", stat.highlight ? "text-secondary" : "text-on-surface")}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'learning' && (
              <motion.div
                key="learning"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl font-black text-on-surface font-headline tracking-tighter uppercase mb-2">Learning Resources</h2>
                  <p className="text-tertiary max-w-xl">A curated collection of videos, papers, and repositories to accelerate your LLM mastery.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ROADMAP_DATA.flatMap(s => s.modules.flatMap(m => m.resources || [])).map((res, i) => (
                    <motion.a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-surface-container-low p-6 rounded-xl border border-outline/10 hover:border-secondary/40 hover:bg-surface-container transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-surface-highest rounded-lg text-secondary group-hover:scale-110 transition-transform">
                          <ResourceIcon type={res.type} />
                        </div>
                        <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">{res.type}</span>
                      </div>
                      <h4 className="text-lg font-bold text-on-surface group-hover:text-secondary transition-colors line-clamp-2">{res.title}</h4>
                      <div className="mt-4 flex items-center text-xs text-tertiary group-hover:text-on-surface">
                        <span>Access Resource</span>
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {['projects', 'resources', 'strategy'].includes(activeTab) && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6 border border-outline/10">
                  <Lock className="text-tertiary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-headline font-bold mb-2">Section Restricted</h3>
                <p className="text-tertiary max-w-md">Complete current roadmap milestones to unlock the full potential of the {activeTab} laboratory.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
