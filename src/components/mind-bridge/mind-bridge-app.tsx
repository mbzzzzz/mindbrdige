'use client';

import * as React from 'react';
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import type { ActionState } from '@/lib/types';
import { handleAdapt, handleSummarize, handleTranslate, handleProofread, handleAnalyze, handleExplain } from '@/lib/actions';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarInset } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { READING_LEVELS, SUMMARY_LENGTHS, TARGET_LANGUAGES } from '@/lib/constants';
import { BookOpenCheck, Languages, Blocks, Bot, SpellCheck, Search, Lightbulb } from 'lucide-react';

const initialState: ActionState = {
  success: false,
  message: '',
};

function SubmitButton({ children }: { children: React.ReactNode }) {
  // This is a placeholder for `useFormStatus` which is experimental in stable React
  // In a real app, you'd use useFormStatus to show a pending state
  return <Button type="submit" className="w-full">{children}</Button>;
}

export default function MindBridgeApp() {
  const { toast } = useToast();
  const [inputText, setInputText] = React.useState('');
  const [outputText, setOutputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

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

  const [adaptState, adaptAction] = useFormState(handleAdapt, initialState);
  const [summarizeState, summarizeAction] = useFormState(handleSummarize, initialState);
  const [translateState, translateAction] = useFormState(handleTranslate, initialState);
  const [proofreadState, proofreadAction] = useFormState(handleProofread, initialState);
  const [analyzeState, analyzeAction] = useFormState(handleAnalyze, initialState);
  const [explainState, explainAction] = useFormState(handleExplain, initialState);


  React.useEffect(() => {
    if (adaptState.success) {
      setOutputText(adaptState.data || '');
    } else if (adaptState.message) {
      toast({ variant: 'destructive', title: 'Adapt Error', description: adaptState.message });
    }
    setIsLoading(false);
  }, [adaptState]);

   React.useEffect(() => {
    if (summarizeState.success) {
      setOutputText(summarizeState.data || '');
    } else if (summarizeState.message) {
      toast({ variant: 'destructive', title: 'Summarize Error', description: summarizeState.message });
    }
    setIsLoading(false);
  }, [summarizeState]);

  React.useEffect(() => {
    if (translateState.success) {
      setOutputText(translateState.data || '');
    } else if (translateState.message) {
      toast({ variant: 'destructive', title: 'Translate Error', description: translateState.message });
    }
    setIsLoading(false);
  }, [translateState]);

  React.useEffect(() => {
    if (proofreadState.success) {
      setOutputText(proofreadState.data || '');
    } else if (proofreadState.message) {
      toast({ variant: 'destructive', title: 'Proofread Error', description: proofreadState.message });
    }
    setIsLoading(false);
  }, [proofreadState]);

  React.useEffect(() => {
    if (analyzeState.success) {
      setOutputText(analyzeState.data || '');
    } else if (analyzeState.message) {
      toast({ variant: 'destructive', title: 'Analyze Error', description: analyzeState.message });
    }
    setIsLoading(false);
  }, [analyzeState]);

  React.useEffect(() => {
    if (explainState.success) {
      setOutputText(explainState.data || '');
    } else if (explainState.message) {
      toast({ variant: 'destructive', title: 'Explain Error', description: explainState.message });
    }
    setIsLoading(false);
  }, [explainState]);
  
  const adaptFormAction = (formData: FormData) => {
    setIsLoading(true);
    formData.set('content', inputText);
    adaptAction(formData);
  };
  
  const summarizeFormAction = (formData: FormData) => {
    setIsLoading(true);
    summarizeAction(formData);
  };

  const translateFormAction = (formData: FormData) => {
    setIsLoading(true);
    formData.set('text', inputText);
    translateAction(formData);
  };

  const proofreadFormAction = (formData: FormData) => {
    setIsLoading(true);
    formData.set('text', inputText);
    proofreadAction(formData);
  };

  const analyzeFormAction = (formData: FormData) => {
    setIsLoading(true);
    formData.set('text', inputText);
    analyzeAction(formData);
  };

  const explainFormAction = (formData: FormData) => {
    setIsLoading(true);
    formData.set('text', inputText);
    explainAction(formData);
  };


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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="simplify"><BookOpenCheck className="w-4 h-4 mr-1" />Simplify</TabsTrigger>
              <TabsTrigger value="summarize"><Blocks className="w-4 h-4 mr-1"/>Summarize</TabsTrigger>
              <TabsTrigger value="translate"><Languages className="w-4 h-4 mr-1"/>Translate</TabsTrigger>
              <TabsTrigger value="proofread"><SpellCheck className="w-4 h-4 mr-1"/>Proofread</TabsTrigger>
              <TabsTrigger value="analyze"><Search className="w-4 h-4 mr-1"/>Analyze</TabsTrigger>
              <TabsTrigger value="explain"><Lightbulb className="w-4 h-4 mr-1"/>Explain</TabsTrigger>
            </TabsList>
            <TabsContent value="simplify" className="flex-1 mt-4">
              <form action={adaptFormAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="readingLevel">Reading Level</Label>
                  <Select name="readingLevel" defaultValue="middle school">
                    <SelectTrigger id="readingLevel">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {READING_LEVELS.map(level => (
                        <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  placeholder="Paste your text here to simplify or translate it."
                  className="flex-1 resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-primary" />
                  Transformed Content
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
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
