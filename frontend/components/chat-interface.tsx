'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Brand } from '@/library/types';

interface ChatInterfaceProps {
  brandContext?: Brand | null;
}

interface Message {
  id: string;
  role: 'user' | 'consultant';
  content: string;
  timestamp: Date;
}

export function ChatInterface({ brandContext }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 300_000); // 5분

      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          brand: brandContext?.name || null,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json();
      const reply = data.reply || data.error || '상담원으로부터 응답을 받지 못했습니다.';

      const consultantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'consultant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, consultantMessage]);
    } catch (error: any) {
      console.error('Error calling API:', error);
      const isTimeout = error.name === 'AbortError';

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'consultant',
          content: isTimeout
            ? '⚠️ 요청이 시간 제한(5분)을 초과했습니다. 다시 시도해주세요.'
            : '⚠️ 서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex h-[600px] flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">상담을 시작하세요</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
                프랜차이즈 전문 상담원이 도와드립니다. 투자 금액, 운영 방식, 평균 매출 등
              </p>
              <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">
                궁금한 점을 자유롭게 문의하세요.
              </p>
            </div>
          )}
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'consultant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MessageCircle className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <CardContent className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="메시지를 입력하세요"
            disabled={isTyping}
            className="flex-1"
          />
          <Button type="submit" disabled={isTyping || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">메시지 보내기</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
