"use client";

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import LoadingOptimized from '@/components/LoadingOptimized';

// Lazy load dos componentes para melhor performance inicial
const SearchHeader = dynamic(() => import('@/components/SearchHeader'), {
  loading: () => <LoadingOptimized variant="carousel" />,
  ssr: true
});

const CategoryGrid = dynamic(() => import('@/components/CategoryGrid'), {
  loading: () => <LoadingOptimized variant="carousel" />,
  ssr: true
});

interface Tool {
  title: string;
  description: string;
  image?: string;
  href: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  color: string;
  tools: Tool[];
}

interface HomePageClientProps {
  categories: Category[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ categories }) => {
  // Converter dados para o formato do SearchHeader
  const allTools = useMemo(() => {
    return categories.flatMap(category =>
      category.tools.map(tool => ({
        title: tool.title,
        description: tool.description,
        href: tool.href,
        category: category.title,
        keywords: generateKeywords(tool.title, tool.description, category.title)
      }))
    );
  }, [categories]);

  return (
    <>
      <SearchHeader tools={allTools} />
      <CategoryGrid categories={categories} />
    </>
  );
};

// Função para gerar keywords para busca
function generateKeywords(title: string, description: string, category: string): string[] {
  const keywords: string[] = [];
  
  // Palavras do título
  keywords.push(...title.toLowerCase().split(' '));
  
  // Palavras relevantes da descrição
  keywords.push(...description.toLowerCase().split(' ').filter(word => 
    word.length > 3 && 
    !['para', 'com', 'das', 'dos', 'uma', 'seu', 'sua', 'seus', 'suas'].includes(word)
  ));
  
  // Categoria
  keywords.push(category.toLowerCase());
  
  // Keywords específicas por tipo de calculadora
  const specificKeywords: Record<string, string[]> = {
    'juros compostos': ['investimento', 'rentabilidade', 'juros', 'compostos'],
    'imc': ['saúde', 'peso', 'altura', 'massa', 'corporal'],
    'cdb': ['renda fixa', 'banco', 'certificado', 'depósito'],
    'rescisão': ['trabalhista', 'demissão', 'indenização', 'trabalho'],
    'tesouro direto': ['governo', 'títulos', 'públicos', 'selic', 'ipca'],
    'lci': ['isento', 'ir', 'crédito', 'imobiliário'],
    'lca': ['isento', 'ir', 'crédito', 'agronegócio'],
  };
  
  Object.entries(specificKeywords).forEach(([key, values]) => {
    if (title.toLowerCase().includes(key)) {
      keywords.push(...values);
    }
  });
  
  return [...new Set(keywords)]; // Remove duplicatas
}

export default HomePageClient;