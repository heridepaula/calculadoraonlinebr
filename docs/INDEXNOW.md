# IndexNow Integration

Este projeto implementa o protocolo IndexNow para notificar automaticamente os mecanismos de busca sobre mudanças de URLs, melhorando a velocidade de indexação e visibilidade nos resultados de pesquisa.

## 📋 Visão Geral

O IndexNow é um protocolo que permite que proprietários de sites notifiquem instantaneamente mecanismos de busca quando URLs são criadas, atualizadas ou removidas. Isso resulta em:

- ⚡ **Indexação mais rápida** de conteúdo novo e atualizado
- 🎯 **Melhor SEO** com descoberta de conteúdo mais eficiente
- 🔄 **Redução de crawling desnecessário** pelos bots de busca
- 📊 **Melhor controle** sobre quais páginas são indexadas

## 🔧 Configuração

### Variáveis de Ambiente

As seguintes variáveis estão configuradas no arquivo `.env`:

```bash
# IndexNow Configuration
INDEXNOW_KEY=d4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb
INDEXNOW_HOST=calculadoraonlinebr.com.br
INDEXNOW_KEY_LOCATION=https://www.calculadoraonlinebr.com.br/d4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb.txt
```

### Arquivo de Verificação

O arquivo de chave está disponível em:

- **URL**: `https://www.calculadoraonlinebr.com.br/d4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb.txt`
- **Rota**: `/routes/d4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb[.]txt.ts`

## 🚀 Uso

### 1. Hook React (useIndexNow)

```tsx
import { useIndexNow } from "~/hooks/useIndexNow";

function MyCalculator() {
  const { submitUrl, submitCalculatorUrls } = useIndexNow({
    autoSubmit: true, // Submete a página atual automaticamente
    delay: 2000, // Aguarda 2 segundos antes da submissão
  });

  // Submissão manual de uma URL
  const handleSubmit = async () => {
    const success = await submitUrl("https://www.calculadoraonlinebr.com.br/nova-pagina");
    if (success) {
      console.log("URL submetida com sucesso!");
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submeter URL</button>
    </div>
  );
}
```

### 2. API Endpoint

A API está disponível em `/api/indexnow` e aceita os seguintes tipos de requisição:

#### Submissão de URL única:

```javascript
fetch("/api/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "single",
    url: "https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau",
  }),
});
```

#### Submissão em lote:

```javascript
fetch("/api/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "bulk",
    urls: [
      "https://www.calculadoraonlinebr.com.br/",
      "https://www.calculadoraonlinebr.com.br/calculadoras",
    ],
  }),
});
```

#### Submissão de calculadora:

```javascript
fetch("/api/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "calculator",
    calculatorPath: "/calculadoras/matematica/equacao-segundo-grau",
  }),
});
```

### 3. CLI (Linha de Comando)

#### Comandos disponíveis:

```bash
# Verificar configuração
npm run indexnow:config

# Submeter todas as páginas principais
npm run indexnow:main

# Submeter URL única
npm run indexnow:submit -- --single https://www.calculadoraonlinebr.com.br/calculadoras/matematica/equacao-segundo-grau

# Submeter múltiplas URLs
npm run indexnow:submit -- --bulk https://www.calculadoraonlinebr.com.br/ https://www.calculadoraonlinebr.com.br/calculadoras

# Submeter URLs de uma calculadora
npm run indexnow:submit -- --calculator /calculadoras/matematica/equacao-segundo-grau

# Ver ajuda
npm run indexnow:submit -- --help
```

## 🎯 Mecanismos de Busca Suportados

Atualmente, o sistema submete URLs para:

1. **IndexNow API** (`https://api.indexnow.org/indexnow`) - Endpoint principal
2. **Microsoft Bing** (`https://www.bing.com/indexnow`) - Bing Search
3. **Preparado para Google** - Quando o Google adotar o protocolo

## 📊 Monitoramento

### Logs de Submissão

O sistema registra todas as tentativas de submissão:

```javascript
const { getSubmissionHistory } = useIndexNow();

// Obter histórico de submissões
const history = getSubmissionHistory();
console.log("Submissões recentes:", history);
```

### Verificação de Status

```bash
# Ver configuração atual
npm run indexnow:config

# Saída exemplo:
# 🔧 IndexNow Configuration:
#    Key: d4b3a37c...f6d28cbb
#    Host: calculadoraonlinebr.com.br
#    Key Location: https://www.calculadoraonlinebr.com.br/d4b3a37c...
#    Key Valid: ✅
#    Search Engines: 2
#    1. https://api.indexnow.org/indexnow
#    2. https://www.bing.com/indexnow
```

## 🔄 Integração Automática

### Quando URLs são submetidas automaticamente:

1. **Ao carregar uma calculadora** (com `autoSubmit: true`)
2. **Quando a localização muda** (com `submitOnLocationChange: true`)
3. **Após mudanças no conteúdo** (personalizado por implementação)
4. **Em builds de produção** (via CI/CD)

### Prevenção de Spam:

- **Cache de 5 minutos**: URLs não são resubmetidas dentro de 5 minutos
- **Validação de domínio**: Apenas URLs do próprio domínio são aceitas
- **Rate limiting**: Máximo de 10.000 URLs por requisição
- **Execução apenas em produção**: Por padrão, só funciona em `NODE_ENV=production`

## 🔒 Segurança

### Validações implementadas:

- ✅ **Formato da chave**: Deve ser hexadecimal com 8-128 caracteres
- ✅ **Domínio**: URLs devem pertencer ao domínio configurado
- ✅ **Rate limiting**: Prevenção de spam com cache de submissões
- ✅ **Validação de entrada**: Sanitização de todos os parâmetros
- ✅ **CORS**: API protegida contra requisições cross-origin maliciosas

## 📈 Melhores Práticas

### Para Desenvolvedores:

1. **Use o hook `useIndexNow`** em componentes de calculadora
2. **Ative `autoSubmit: true`** para páginas importantes
3. **Implemente delay apropriado** (1-3 segundos) para evitar submissões desnecessárias
4. **Monitore logs de submissão** em produção para verificar sucesso

### Para Deploy:

1. **Configure variáveis de ambiente** no Vercel/servidor
2. **Execute submissões manuais** após grandes updates
3. **Inclua submissão no CI/CD** para automatizar o processo
4. **Verifique arquivo de chave** está acessível na produção

### Exemplo de CI/CD:

```yaml
# .github/workflows/deploy.yml
- name: Submit URLs to IndexNow
  run: |
    npm run build
    npm run indexnow:main
  env:
    INDEXNOW_KEY: ${{ secrets.INDEXNOW_KEY }}
    INDEXNOW_HOST: calculadoraonlinebr.com.br
```

## 🛠 Troubleshooting

### Problemas Comuns:

#### 1. Arquivo de chave não encontrado (404)

```bash
curl -I https://www.calculadoraonlinebr.com.br/d4b3a37c56c70c96d0fc36378e111d16a64e5e8f113a7d28aba467aef6d28cbb.txt
```

**Solução**: Verificar se a rota está configurada corretamente

#### 2. Chave inválida

**Erro**: `Invalid IndexNow key format`
**Solução**: Verificar se a chave contém apenas caracteres hexadecimais (a-f, 0-9)

#### 3. URLs não submetidas

**Possíveis causas**:

- Domínio não coincide com `INDEXNOW_HOST`
- URLs recentemente submetidas (cache de 5 minutos)
- Ambiente de desenvolvimento (desabilitado por padrão)

#### 4. Verificar status da API:

```bash
curl https://www.calculadoraonlinebr.com.br/api/indexnow
```

## 📚 Recursos Adicionais

- [Documentação oficial IndexNow](https://www.indexnow.org/documentation)
- [Microsoft Bing IndexNow](https://www.bing.com/indexnow)
- [Yandex IndexNow Support](https://yandex.com/support/webmaster/indexnow.html)

## 🤝 Contribuição

Para contribuir com melhorias no sistema IndexNow:

1. Teste em ambiente de desenvolvimento com `NODE_ENV=production`
2. Adicione logs adequados para debugging
3. Documente novas funcionalidades
4. Execute testes de submissão antes do PR

---

**Nota**: O IndexNow está ativo apenas em produção (`NODE_ENV=production`) para evitar submissões desnecessárias durante o desenvolvimento.
