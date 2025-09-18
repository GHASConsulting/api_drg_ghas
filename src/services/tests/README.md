# 🧪 Testes do Sistema DRG

Este diretório contém os testes para o sistema de campos flexíveis DRG.

## 📁 Estrutura dos Testes

```
tests/
├── test-config.ts          # Configuração centralizada dos testes
├── simple-demo.ts          # Demonstração funcional do sistema
└── README.md              # Este arquivo
```

## 🚀 Como Executar os Testes

### Pré-requisitos

1. **Node.js** instalado (versão 16 ou superior)
2. **npm** instalado
3. **TypeScript** instalado globalmente

### Instalação das Dependências

```bash
# Instalar TypeScript e ts-node globalmente
npm install -g typescript ts-node

# Ou usar npx (recomendado)
npx typescript --version
npx ts-node --version
```

### Executar a Demonstração

```bash
# Navegar para o diretório de testes
cd src/services/tests

# Executar demonstração completa
npx ts-node simple-demo.ts
```

## 📊 O que é Testado

A demonstração testa todas as funcionalidades principais:

- ✅ **Criação de Validador**
  - Validador DRG com situação e hospital
  - Configuração dinâmica

- ✅ **Verificação de Seções**
  - Seções habilitadas/desabilitadas
  - Configuração por variáveis de ambiente
  - Precedência hospital vs global

- ✅ **Configuração de Situação**
  - Campos obrigatórios por situação
  - Seções configuradas
  - Estrutura da configuração

- ✅ **Validação de Dados**
  - Validação de campos obrigatórios
  - Detecção de campos faltando
  - Relatório de erros

- ✅ **Sistema de Logs**
  - Diferentes níveis de log
  - Contexto estruturado
  - Histórico de logs

## 🔧 Configuração dos Testes

### Variáveis de Ambiente para Teste

A demonstração usa estas variáveis de ambiente:

```bash
# Configuração do logger
LOG_CAMPOS_ENVIADOS=true
LOG_LEVEL=debug

# Configuração de seções (global)
INCLUIR_CID_SECUNDARIO=true
INCLUIR_PROCEDIMENTO=false

# Configuração específica por hospital
HOSPITAL_123_INCLUIR_CID_SECUNDARIO=false
```

### Dados de Teste

Os dados de teste estão em `test-config.ts`:

- **TEST_CONFIG**: Configuração padrão dos testes
- **HOSPITAL_TEST_CONFIG**: Configuração específica por hospital
- **TEST_DATA_SETS**: Conjuntos de dados para diferentes cenários

## 📝 Exemplo de Saída

```
🚀 Iniciando demonstração do sistema DRG...

📋 TESTE 1: Criação de Validador
================================
✅ Validador criado com sucesso!
   Situação: 1
   Hospital: 123

📋 TESTE 2: Verificação de Seções Habilitadas
==============================================
Seção hospital: ✅ Habilitada
Seção cidSecundario: ❌ Desabilitada
Seção procedimento: ❌ Desabilitada
Seção cti: ❌ Desabilitada

📋 TESTE 3: Configuração de Situação
====================================
Campos obrigatórios da situação 1: 6
Seções configuradas: 22

📋 TESTE 4: Seções Habilitadas
==============================
Seções habilitadas para situação 1: 4
  - hospital
  - beneficiario
  - operadora
  - medico

📋 TESTE 5: Validação de Dados
==============================
Validação: ❌ Inválida
Erros encontrados: 18
  - Campo obrigatório 'situacao' não está presente ou está vazio
  - Campo obrigatório 'caraterInternacao' não está presente ou está vazio
  - Campo obrigatório 'codigoCidPrincipal' não está presente ou está vazio

📊 RESUMO FINAL
===============
✅ Sistema DRG funcionando perfeitamente!
✅ Validação de dados funcionando
✅ Configuração dinâmica funcionando
✅ Sistema de logs funcionando
✅ Todas as funcionalidades testadas

🎯 Sistema pronto para uso em produção!
```

## 🔄 Personalizando os Testes

### Modificar Dados de Teste

Edite `simple-demo.ts` para testar cenários específicos:

```typescript
// Alterar situação de teste
const validator = createDRGValidator(SituacaoInternacao.ADMISSIONAL, 123);

// Alterar dados de validação
const dadosTeste = {
  numeroInternacao: '12345',
  dataInternacao: '2024-01-15',
  // ... adicionar mais campos
};
```

### Adicionar Novos Testes

```typescript
// Adicionar novo teste na demonstração
console.log('📋 TESTE 8: Novo Teste');
console.log('=====================');

// Seu código de teste aqui
const resultado = suaFuncao();
console.log(`Resultado: ${resultado ? '✅ Sucesso' : '❌ Falha'}`);
```

## 🐛 Debugging

### Ver Logs Detalhados

```bash
# Habilitar logs de debug
LOG_LEVEL=debug npx ts-node simple-demo.ts

# Habilitar logs de campos enviados
LOG_CAMPOS_ENVIADOS=true npx ts-node simple-demo.ts
```

### Verificar Configuração

```bash
# Verificar se TypeScript está funcionando
npx tsc --version

# Verificar se ts-node está funcionando
npx ts-node --version
```

## 📚 Próximos Passos

1. **Executar demonstração**: `npx ts-node simple-demo.ts`
2. **Verificar saída**: Confirmar que todos os testes passaram
3. **Personalizar testes**: Modificar dados conforme necessário
4. **Integrar ao CI/CD**: Adicionar à pipeline de deploy

---

**✅ Sistema de testes simples e funcional!**