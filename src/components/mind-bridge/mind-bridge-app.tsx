'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { ActionState } from '@/lib/types';
import { handleAdapt, handleSummarize, handleTranslate, handleProofread, handleAnalyze, handleExplain } from '@/lib/actions';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { READING_LEVELS, SUMMARY_LENGTHS, TARGET_LANGUAGES } from '@/lib/constants';
import { BookOpenCheck, Languages, Blocks, Bot, SpellCheck, Search, Lightbulb, Copy, Settings, Moon, Sun } from 'lucide-react';

const initialState: ActionState = {
  success: false,
  message: '',
};

export default function MindBridgeApp() {
  const { toast } = useToast();
  const [inputText, setInputText] = React.useState('');
  const [outputText, setOutputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [readingLevel, setReadingLevel] = React.useState([5]);
  const [theme, setTheme] = React.useState('light');

  const handleAction = async (action: (prevState: ActionState, formData: FormData) => Promise<ActionState>, formData: FormData) => {
    setIsLoading(true);
    setOutputText('');
    const result = await action(initialState, formData);
    if (result.success) {
      setOutputText(result.data || '');
    } else {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: result.message,
      });
    }
    setIsLoading(false);
  };
  
  const [adaptState, adaptAction] = useActionState(handleAdapt, initialState);
  const [summarizeState, summarizeAction] = useActionState(handleSummarize, initialState);
  const [translateState, translateAction] = useActionState(handleTranslate, initialState);
  const [proofreadState, proofreadAction] = useActionState(handleProofread, initialState);
  const [analyzeState, analyzeAction] = useActionState(handleAnalyze, initialState);
  const [explainState, explainAction] = useActionState(handleExplain, initialState);

  const handleEffect = (state: ActionState, title: string) => {
    if (state.success) {
      setOutputText(state.data || '');
    } else if (state.message) {
      toast({ variant: 'destructive', title: `${title} Error`, description: state.message });
    }
    setIsLoading(false);
  }

  React.useEffect(() => { handleEffect(adaptState, 'Adapt'); }, [adaptState]);
  React.useEffect(() => { handleEffect(summarizeState, 'Summarize'); }, [summarizeState]);
  React.useEffect(() => { handleEffect(translateState, 'Translate'); }, [translateState]);
  React.useEffect(() => { handleEffect(proofreadState, 'Proofread'); }, [proofreadState]);
  React.useEffect(() => { handleEffect(analyzeState, 'Analyze'); }, [analyzeState]);
  React.useEffect(() => { handleEffect(explainState, 'Explain'); }, [explainState]);

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const createFormAction = (action: (formData: FormData) => void, fields: Record<string, string | number>) => (formData: FormData) => {
    setIsLoading(true);
    formData.set('text', inputText);
    for (const key in fields) {
      formData.set(key, String(fields[key]));
    }
    action(formData);
  };
  
  const adaptFormAction = createFormAction(adaptAction, { readingLevel: readingLevel[0] });
  const summarizeFormAction = summarizeAction;
  const translateFormAction = createFormAction(translateAction, {});
  const proofreadFormAction = createFormAction(proofreadAction, {});
  const analyzeFormAction = createFormAction(analyzeAction, {});
  const explainFormAction = createFormAction(explainAction, {});

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText).then(() => {
      toast({ title: 'Copied!', description: 'The transformed content has been copied to your clipboard.' });
    }, () => {
      toast({ variant: 'destructive', title: 'Failed to copy', description: 'Could not copy the text to your clipboard.' });
    });
  };

  const inputWordCount = React.useMemo(() => inputText.trim().split(/\s+/).filter(Boolean).length, [inputText]);
  const inputCharCount = React.useMemo(() => inputText.length, [inputText]);
  const outputWordCount = React.useMemo(() => outputText.trim().split(/\s+/).filter(Boolean).length, [outputText]);
  const outputCharCount = React.useMemo(() => outputText.length, [outputText]);


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">MindBridge AI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Tabs defaultValue="simplify" className="flex flex-col h-full p-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="simplify"><BookOpenCheck className="w-4 h-4 mr-1" />Simplify</TabsTrigger>
              <TabsTrigger value="summarize"><Blocks className="w-4 h-4 mr-1"/>Summarize</TabsTrigger>
              <TabsTrigger value="translate"><Languages className="w-4 h-4 mr-1"/>Translate</TabsTrigger>
              <TabsTrigger value="proofread"><SpellCheck className="w-4 h-4 mr-1"/>Proofread</TabsTrigger>
              <TabsTrigger value="analyze"><Search className="w-4 h-4 mr-1"/>Analyze</TabsTrigger>
              <TabsTrigger value="explain"><Lightbulb className="w-4 h-4 mr-1"/>Explain</TabsTrigger>
              <TabsTrigger value="settings"><Settings className="w-4 h-4 mr-1"/>Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="simplify" className="flex-1 mt-4">
              <form action={adaptFormAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="readingLevel">Reading Level: {readingLevel[0]}</Label>
                   <div className='flex items-center gap-4'>
                    <span className='text-sm text-green-600'>Simple</span>
                    <Slider
                      name="readingLevel"
                      value={readingLevel}
                      onValueChange={setReadingLevel}
                      min={1}
                      max={10}
                      step={1}
                      className="my-4"
                    />
                    <span className='text-sm text-red-600'>Complex</span>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>Simplify Text</Button>
              </form>
            </TabsContent>
            <TabsContent value="summarize" className="flex-1 mt-4">
              <form action={summarizeFormAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input id="url" name="url" placeholder="https://example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Summary Length</Label>
                  <Select name="length" defaultValue="short">
                    <SelectTrigger id="length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUMMARY_LENGTHS.map(item => (
                        <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>Summarize URL</Button>
              </form>
            </TabsContent>
            <TabsContent value="translate" className="flex-1 mt-4">
              <form action={translateFormAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetLanguage">Target Language</Label>
                  <Select name="targetLanguage" defaultValue="Spanish">
                    <SelectTrigger id="targetLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {TARGET_LANGUAGES.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>Translate Text</Button>
              </form>
            </TabsContent>
            <TabsContent value="proofread" className="flex-1 mt-4">
              <form action={proofreadFormAction} className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>Proofread Text</Button>
              </form>
            </TabsContent>
            <TabsContent value="analyze" className="flex-1 mt-4">
                <form action={analyzeFormAction} className="space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>Analyze Content</Button>
                </form>
            </TabsContent>
            <TabsContent value="explain" className="flex-1 mt-4">
                <form action={explainFormAction} className="space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading}>Explain Concepts</Button>
                </form>
            </TabsContent>
             <TabsContent value="settings" className="flex-1 mt-4">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="theme-switcher">Theme</Label>
                        <div className='flex items-center gap-2'>
                            <Sun className="w-5 h-5"/>
                            <Switch
                                id="theme-switcher"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                            <Moon className="w-5 h-5"/>
                        </div>
                    </div>
                </div>
            </TabsContent>
          </Tabs>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="h-screen flex flex-col p-4 gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Original Content</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex">
                <Textarea
                  placeholder="Paste your text here..."
                  className="flex-1 resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </CardContent>
              <CardFooter className='text-sm text-muted-foreground justify-end gap-4'>
                <span>Words: {inputWordCount}</span>
                <span>Characters: {inputCharCount}</span>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-primary" />
                    Transformed Content
                  </div>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!outputText || isLoading}>
                    <Copy className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex">
                {isLoading ? (
                  <div className="w-full space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                  </div>
                ) : (
                  <Textarea
                    readOnly
                    placeholder="Your AI-powered result will appear here."
                    className="flex-1 resize-none bg-secondary/30"
                    value={outputText}
                  />
                )}
              </CardContent>
              <CardFooter className='text-sm text-muted-foreground justify-end gap-4'>
                <span>Words: {outputWordCount}</span>
                <span>Characters: {outputCharCount}</span>
              </CardFooter>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
