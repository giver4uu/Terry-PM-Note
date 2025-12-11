import { Simulator } from './components/Simulator';
import { useState, useEffect, useRef } from 'react';
import { Network, Download, Globe, Sun, Moon, FlaskConical, ClipboardCheck, Settings2, FileText, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOntologyStore } from './stores/useOntologyStore';
import { useThemeStore } from './stores/useThemeStore';
import { useValidationStore } from './stores/useValidationStore';
import OntologyCanvas from './components/OntologyCanvas';
import PropertyEditor from './components/PropertyEditor';
import { ValidationPanel } from './components/ValidationPanel';
import { ValidationBadge } from './components/ValidationBadge';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { MarkdownGenerator } from './lib/generators/MarkdownGenerator';

function App() {
  const { nodes, edges } = useOntologyStore();
  const { theme, toggleTheme } = useThemeStore();
  const { validate, autoValidate } = useValidationStore();
  const { t, i18n } = useTranslation();
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [rightPanel, setRightPanel] = useState<'properties' | 'validation'>('properties');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const validationTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check first visit for onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  // 자동 검증 (debounce 1초)
  useEffect(() => {
    if (!autoValidate) return;

    clearTimeout(validationTimeoutRef.current);
    validationTimeoutRef.current = setTimeout(() => {
      validate(nodes, edges);
    }, 1000);

    return () => clearTimeout(validationTimeoutRef.current);
  }, [nodes, edges, autoValidate, validate]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  const handleExport = () => {
    const data = {
      nodes,
      edges,
      metadata: {
        version: "1.0.0",
        exportedAt: new Date().toISOString()
      }
    };

    // Create blob and download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ontology-export-${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Exported Ontology:", data);
  };

  const handleExportMarkdown = () => {
    const generator = new MarkdownGenerator();
    const markdown = generator.generate(nodes, edges);

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ontology-${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-sans transition-colors duration-200">
      {/* Header */}
      <header className="h-14 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Network className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight text-foreground">
            {t('app_title')}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Validation Badge */}
          <ValidationBadge />

          <div className="h-6 w-px bg-border mx-1"></div>

          <button
            onClick={() => setIsSimOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 text-xs font-medium transition-colors"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('simulator') || "Simulator"}</span>
          </button>

          <div className="h-6 w-px bg-border mx-1"></div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div className="relative flex items-center bg-input/50 rounded-md border border-border px-2 py-1 transition-colors">
            <Globe className="w-4 h-4 text-muted-foreground mr-2" />
            <select
              className="bg-transparent text-xs text-foreground focus:outline-none appearance-none cursor-pointer"
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
            >
              <option value="en">English</option>
              <option value="ko">한국어</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card hover:bg-accent border border-border text-xs font-medium transition-colors text-foreground"
          >
            <Download className="w-3.5 h-3.5" />
            {t('export_json')}
          </button>

          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800 text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Markdown</span>
          </button>

          <button
            onClick={() => setShowOnboarding(true)}
            className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            title="Tutorial"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 relative">
          <OntologyCanvas />

          {/* Floating Info */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur border border-border p-3 rounded-lg shadow-xl pointer-events-none transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-card-foreground">System Active</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">{nodes.length} Classes • {edges.length} Relations</p>
          </div>
        </main>

        {/* Right Panel (Properties or Validation) */}
        <aside className="z-10 h-full bg-card transition-colors relative">
          {rightPanel === 'properties' && <PropertyEditor />}
          {rightPanel === 'validation' && <ValidationPanel />}

          {/* Panel Toggle Buttons */}
          <div className="absolute -left-12 top-4 flex flex-col gap-2">
            <button
              onClick={() => setRightPanel('properties')}
              className={`p-2 rounded-lg transition-colors ${rightPanel === 'properties'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-accent text-muted-foreground'
                }`}
              title="Properties"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRightPanel('validation')}
              className={`p-2 rounded-lg transition-colors ${rightPanel === 'validation'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:bg-accent text-muted-foreground'
                }`}
              title="Validation"
            >
              <ClipboardCheck className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </div>

      {isSimOpen && <Simulator onClose={() => setIsSimOpen(false)} />}
      {showOnboarding && <OnboardingTutorial onClose={handleOnboardingClose} />}
    </div>
  );
}

export default App;
