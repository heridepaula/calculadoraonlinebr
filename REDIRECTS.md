# Redirects e Migração de URLs

Este documento explica como foram implementados os redirects para preservar o SEO durante a reestruturação das URLs das calculadoras.

## 📋 Visão Geral

A aplicação foi reestruturada para usar URLs categorizadas mais semânticas:

**Antes:** `/calculadoras/calculadora-nome`  
**Depois:** `/calculadoras/categoria/nome`

## 🔄 Implementação dos Redirects

### 1. Arquivo de Rotas Dinâmicas (`calculadoras.$slug.tsx`)

```typescript
// Captura todas as URLs antigas e redireciona com 301
export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;
  const redirectTo = ROUTE_REDIRECTS[slug];

  if (redirectTo) {
    return redirect(redirectTo, { status: 301 });
  }

  throw new Response("Not Found", { status: 404 });
};
```

### 2. Mapeamento Centralizado (`utils/redirects.ts`)

Contém o mapeamento completo de URLs antigas → novas:

```typescript
export const LEGACY_REDIRECTS: Record<string, string> = {
  "/calculadoras/calculadora-juros-compostos": "/calculadoras/financas/juros-compostos",
  // ... outros redirects
};
```

### 3. Robots.txt Atualizado

- **Allow**: Apenas as novas URLs categorizadas
- **Disallow**: Todas as URLs antigas para evitar indexação duplicada

```
# Allow new structure
Allow: /calculadoras/financas/
Allow: /calculadoras/saude/

# Disallow old routes
Disallow: /calculadoras/calculadora-*
```

## 🏗️ Estrutura de Categorias

### Finanças (`/calculadoras/financas/`)

- juros-compostos
- primeiro-milhao
- cdb, lci-lca, tesouro-direto
- financiamento-imobiliario
- emprestimo-consignado
- consorcio
- renda-fixa-comparativa

### Saúde (`/calculadoras/saude/`)

- imc
- gordura-corporal
- ciclo-menstrual
- desenvolvimento-infantil
- hidratacao

### Matemática (`/calculadoras/matematica/`)

- porcentagem
- regra-de-tres
- equacao-segundo-grau (bhaskara)
- mmc-mdc
- area-perimetro
- volume
- teorema-pitagoras (pitagora)
- fracoes

### Trabalhista (`/calculadoras/trabalhista/`)

- rescisao
- aposentadoria
- auxilio-doenca
- salario-liquido
- ferias-decimo-terceiro

## ✅ Benefícios SEO

### 1. Preservação de Link Juice

- Redirects 301 mantêm ~90-99% da autoridade da página
- Links externos continuam funcionando
- Histórico de indexação preservado

### 2. URLs Mais Semânticas

- Melhor para UX e crawlers
- Estrutura hierárquica clara
- Categorização lógica do conteúdo

### 3. Structured Data

- Schema.org para redirects
- Breadcrumbs atualizados automaticamente
- Rich snippets preservados

## 🔍 Monitoramento

### Google Search Console

- Monitorar 404s após implementação
- Verificar se redirects estão sendo seguidos
- Acompanhar variações no tráfego

### Ferramentas de Teste

- `/admin/redirects` - Página para testar todos os redirects
- Status codes HTTP adequados (301)
- Verificação de funcionamento em produção

## 📊 Métricas Esperadas

### Período de Transição (1-3 meses)

- Possível queda temporária de 10-20% no tráfego
- Gradual migração do índice do Google
- Preservação das posições principais

### Período Estabilizado (3+ meses)

- Recuperação completa do tráfego
- Melhoria no ranking por melhor UX
- URLs mais clickáveis nos resultados

## 🚨 Pontos de Atenção

1. **Nunca remover os redirects** - Mantê-los permanentemente
2. **Monitorar logs de erro** - Identificar URLs não mapeadas
3. **Atualizar links internos** - Usar sempre as novas URLs
4. **Comunicar mudanças** - Informar parceiros sobre novas URLs

## 🔧 Manutenção

### Adicionar Novo Redirect

1. Adicionar entrada em `LEGACY_REDIRECTS`
2. Atualizar `robots.txt` se necessário
3. Testar em `/admin/redirects`
4. Deploy e verificação

### Verificação Periódica

- Revisar logs de 404 mensalmente
- Verificar funcionamento dos redirects
- Atualizar documentação conforme necessário
