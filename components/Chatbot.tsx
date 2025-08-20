import React, { useState, useEffect, useRef, useCallback } from 'react';
import { sendMessageToBot } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';
import logo from './logo.jpg';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if(isOpen) {
            scrollToBottom();
            if (messages.length === 0) {
                 setMessages([
                    { id: 'initial', text: 'Hello! I am a sales assistant for DEVise Solutions. How can I help you with your project today?', sender: 'bot' }
                ]);
            }
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = useCallback(async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const botMessageId = (Date.now() + 1).toString();
        // Add a placeholder for the bot's response
        setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);
        
        try {
            const stream = await sendMessageToBot(input);
            let currentText = '';
            for await (const chunk of stream) {
                const chunkText = (chunk as GenerateContentResponse).text;
                currentText += chunkText;
                setMessages(prev => prev.map(msg => 
                    msg.id === botMessageId ? { ...msg, text: currentText } : msg
                ));
            }
        } catch (error) {
            console.error('Error sending message to bot:', error);
            setMessages(prev => prev.map(msg => 
                msg.id === botMessageId ? { ...msg, text: "Sorry, I'm having trouble connecting. Please try again later." } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading]);

    return (
        <>
            <div className={`fixed bottom-0 right-0 m-4 sm:m-8 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary-DEFAULT hover:bg-primary-dark text-black p-0 rounded-full shadow-lg animate-subtle-glow w-16 h-16 flex items-center justify-center"
                    aria-label="Open chat"
                >
                    <img src={logo} alt="Chatbot" className="w-full h-full rounded-full object-cover" />
                </button>
            </div>
            <div className={`fixed bottom-0 right-0 sm:m-4 h-full sm:h-[70vh] w-full sm:max-w-md shadow-2xl transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-[120%]'} rounded-none sm:rounded-lg p-0.5 bg-gradient-to-br from-primary-DEFAULT via-secondary-DEFAULT to-primary-DEFAULT`}>
                 <div className="w-full h-full flex flex-col bg-light-bg dark:bg-dark-bg rounded-none sm:rounded-[5px] overflow-hidden">
                    <header className="flex items-center justify-between p-4 bg-charcoal text-white flex-shrink-0">
                        <h3 className="text-lg font-semibold">DEVise Assistant</h3>
                        <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                            <CloseIcon />
                        </button>
                    </header>

                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {message.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-primary-DEFAULT flex items-center justify-center text-black font-bold flex-shrink-0">D</div>}
                                    <div className={`px-4 py-2 rounded-lg max-w-xs md:max-w-sm ${message.sender === 'user' ? 'bg-primary-DEFAULT text-black dark:bg-primary-light dark:text-dark-bg' : 'bg-light-bg-secondary dark:bg-dark-bg-secondary'}`}>
                                        <p className="text-sm break-words">{message.text}</p>
                                        {isLoading && message.sender === 'bot' && message.text === '' && (
                                            <div className="flex items-center justify-center space-x-1 pt-2">
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-0"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 bg-light-bg-secondary dark:bg-dark-bg-secondary border border-slate-300 dark:border-slate-600 rounded-full focus:ring-2 focus:ring-primary-DEFAULT focus:outline-none"
                            />
                            <button type="submit" disabled={isLoading || !input.trim()} className="p-3 rounded-full bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text dark:text-dark-text hover:ring-2 hover:ring-primary-DEFAULT transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;