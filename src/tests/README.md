# 🧪 Sistema de Testes DRG - Documentação Completa

## 📋 Visão Geral

O Sistema de Testes DRG foi desenvolvido para testar de forma abrangente todos os tipos de envios para o sistema DRG (Diagnosis Related Groups), incluindo:

- **Internação (Admissional)**
- **Prorrogação**
- **Suplementar**

O sistema utiliza dados reais de sucesso como base e gera cenários de teste variados para garantir que todos os XMLs sejam gerados e enviados corretamente.

## 🚀 Funcionalidades Implementadas

### ✅ 1. Geração de Dados de Teste

- **Base de dados real**: Utiliza casos de sucesso existentes no banco
- **Dados únicos**: Gera IDs únicos para cada teste
- **Cenários variados**: 24 cenários diferentes (8 por situação)
- **Campos obrigatórios e opcionais**: Testa todos os campos necessários

### ✅ 2. Validação Completa

- **Validação de campos obrigatórios**: Verifica todos os campos necessários
- **Validação de formatos**: CPF, CNS, CEP, CID, UF, datas, etc.
- **Validação de regras de negócio**: Datas, sequências, etc.
- **Score de qualidade**: Sistema de pontuação para cada teste

### ✅ 3. Execução de Testes

- **Testes básicos**: Execução de todos os cenários
- **Testes por situação**: Foco em um tipo específico
- **Testes por cenário**: Execução individual de cenários
- **Validação apenas**: Sem envio para DRG
- **Envio real**: Inclui envio para o sistema DRG

### ✅ 4. Relatórios Detalhados

- **Relatório em texto**: Formato legível para humanos
- **Relatório JSON**: Dados estruturados para análise
- **Estatísticas**: Taxa de sucesso, tempos, distribuição
- **Logs detalhados**: XML gerado, respostas DRG, erros

### ✅ 5. API REST

- **Endpoints completos**: 10 endpoints para diferentes operações
- **Validação de parâmetros**: Schemas Zod para validação
- **Configuração flexível**: Parâmetros personalizáveis
- **Respostas estruturadas**: JSON padronizado

### ✅ 6. Limpeza Automática

- **Limpeza por tempo**: Remove dados antigos automaticamente
- **Limpeza manual**: Via API ou código
- **Configurável**: Horas para limpeza personalizáveis

## 📁 Estrutura de Arquivos

```
src/tests/
├── index.ts                    # Arquivo principal e funções de conveniência
├── testDataGenerator.ts        # Gerador de dados de teste
├── testValidator.ts            # Validador de dados
├── testRunner.ts               # Executor de testes
├── testReporter.ts             # Gerador de relatórios
├── testRoutes.ts               # Rotas da API REST
├── config.ts                   # Configurações e constantes
├── example.ts                  # Exemplos de uso
├── README.md                   # Documentação detalhada
└── scenarios/
    ├── admissional.test.ts     # Cenários de Admissional
    └── prorrogacao.test.ts     # Cenários de Prorrogação
```

## 🎯 Cenários de Teste Implementados

### 🏥 Admissional (Situação 1)

1. **Admissional Básica** - Dados mínimos obrigatórios
2. **Admissional Completa** - Todos os campos obrigatórios e opcionais
3. **Admissional Emergência** - Admissão de emergência
4. **Admissional Recém-nascido** - Admissão de recém-nascido
5. **Admissional Reinternação** - Reinternação de paciente
6. **Admissional Recaída** - Admissão por recaída
7. **Admissional Particular** - Paciente particular
8. **Admissional Vulnerabilidade** - Paciente em vulnerabilidade

### ⏰ Prorrogação (Situação 2)

1. **Prorrogação Básica** - Dados mínimos obrigatórios
2. **Prorrogação com Alta** - Prorrogação seguida de alta
3. **Prorrogação Emergência** - Prorrogação de emergência
4. **Prorrogação Recém-nascido** - Prorrogação de recém-nascido
5. **Prorrogação Reinternação** - Prorrogação de reinternação
6. **Prorrogação Recaída** - Prorrogação por recaída
7. **Prorrogação Particular** - Prorrogação de paciente particular
8. **Prorrogação Vulnerabilidade** - Prorrogação de paciente vulnerável

### 📋 Suplementar (Situação 3)

1. **Suplementar Básica** - Dados mínimos obrigatórios
2. **Suplementar Completa** - Todos os campos obrigatórios e opcionais
3. **Suplementar Emergência** - Suplementar de emergência
4. **Suplementar Recém-nascido** - Suplementar de recém-nascido
5. **Suplementar Reinternação** - Suplementar de reinternação
6. **Suplementar Recaída** - Suplementar por recaída
7. **Suplementar Particular** - Suplementar de paciente particular
8. **Suplementar Vulnerabilidade** - Suplementar de paciente vulnerável

## 🛠️ Como Usar

### 1. Via Script (Recomendado)

```bash
# Executar todos os testes
node run-tests.js all

# Executar apenas validações
node run-tests.js validate

# Executar testes com envio para DRG
node run-tests.js send
```

### 2. Via API REST

```bash
# Listar cenários disponíveis
curl -X GET http://localhost:3000/tests/scenarios

# Executar todos os testes
curl -X POST http://localhost:3000/tests/run-all

# Executar testes para situação específica
curl -X POST http://localhost:3000/tests/run-situacao/1

# Executar cenário específico
curl -X POST http://localhost:3000/tests/run-scenario/1/1

# Executar apenas validações
curl -X POST http://localhost:3000/tests/validate

# Executar testes com envio para DRG
curl -X POST http://localhost:3000/tests/run-with-send

# Obter estatísticas
curl -X GET http://localhost:3000/tests/stats

# Limpar dados de teste
curl -X DELETE http://localhost:3000/tests/cleanup

# Obter relatório
curl -X GET http://localhost:3000/tests/report
```

### 3. Via Código TypeScript

```typescript
import { DRGTestSuite } from "./src/tests";

// Executar todos os testes
const testSuite = new DRGTestSuite();
await testSuite.initialize();
await testSuite.runAllTests();
await testSuite.generateAndDisplayReport();

// Executar testes para situação específica
await testSuite.runTestsForSituacao(1); // Admissional

// Executar cenário específico
await testSuite.runSpecificScenario(1, 1); // Admissional Básica

// Executar apenas validações
await testSuite.runValidationOnly();

// Executar testes com envio para DRG
await testSuite.runTestsWithDRGSend();
```

## 📊 Relatórios e Estatísticas

### Exemplo de Relatório

```
📊 RESUMO DOS TESTES DRG
========================

📈 Estatísticas Gerais:
  • Total de testes: 24
  • Sucessos: 22 (91.7%)
  • Falhas: 2 (8.3%)
  • Tempo médio de execução: 1250.50ms

📋 Por Situação:
  • Admissional (1): 8
  • Prorrogação (2): 8
  • Suplementar (3): 8

⏱️ Tempo de Execução:
  • Mais rápido: 850ms
  • Mais lento: 2100ms
  • Média: 1250.50ms

🎯 Taxa de Sucesso por Situação:
  • Admissional: 100.0%
  • Prorrogação: 87.5%
  • Suplementar: 87.5%
```

### Estatísticas Detalhadas

- **Total de testes executados**
- **Taxa de sucesso geral e por situação**
- **Tempos de execução (mínimo, máximo, médio)**
- **Distribuição por cenário**
- **Detalhes de cada teste individual**
- **Erros e avisos de validação**
- **Respostas do sistema DRG**

## 🔧 Configuração

### Configurações Disponíveis

```typescript
interface TestConfig {
  saveToDatabase: boolean; // Salvar dados no banco
  sendToDRG: boolean; // Enviar para DRG
  validateOnly: boolean; // Apenas validação
  hospitalCode: number; // Código do hospital
  hospitalName: string; // Nome do hospital
  strictValidation: boolean; // Validação rigorosa
  allowOptionalFields: boolean; // Permitir campos opcionais
  generateReport: boolean; // Gerar relatório
  saveReport: boolean; // Salvar relatório
  reportFormat: "text" | "json" | "both"; // Formato do relatório
  autoCleanup: boolean; // Limpeza automática
  cleanupAfterHours: number; // Horas para limpeza
  requestTimeout: number; // Timeout de requisição
  validationTimeout: number; // Timeout de validação
}
```

### Configuração por Situação

```typescript
// Configuração para Admissional
const config = getConfigForSituacao(1);

// Configuração para cenário específico
const config = getConfigForScenario(1, 1); // Admissional Básica
```

## 🗄️ Banco de Dados

### Tabelas Utilizadas

- **TBL_ATENDIMENTO**: Armazena dados de teste
- **TBL_HOSPITAL**: Informações do hospital
- **TBL_OPERADORA**: Informações da operadora

### Campos de Teste Adicionados

- **ID_TESTE**: Identificador único do teste
- **TIPO_TESTE**: Nome do cenário de teste
- **STATUS_TESTE**: Status da execução
- **DT_CRIACAO_TESTE**: Data de criação do teste

## 🧹 Limpeza de Dados

### Limpeza Automática

- Remove dados de teste antigos (padrão: 24 horas)
- Configurável via parâmetros
- Execução automática após testes

### Limpeza Manual

```bash
# Via API
curl -X DELETE http://localhost:3000/tests/cleanup

# Via código
await testSuite.cleanupTestData();
```

## 📝 Logs e Monitoramento

### Tipos de Log

- **XML gerado**: Log do XML criado para cada teste
- **Resposta DRG**: Log da resposta do sistema DRG
- **Relatórios**: Logs dos relatórios gerados
- **Erros**: Logs de erros durante execução

### Estrutura de Logs

```
logs/
├── 2025-01-XX/
│   ├── estabelecimento_1/
│   │   ├── test_xml_YYYY-MM-DD_HH-mm-ss.log
│   │   ├── test_drg_response_YYYY-MM-DD_HH-mm-ss.log
│   │   └── test_report_YYYY-MM-DD_HH-mm-ss.log
│   └── ...
```

## 🚨 Tratamento de Erros

### Tipos de Erro Tratados

1. **Erros de validação**

   - Campos obrigatórios ausentes
   - Formatos inválidos (CPF, CNS, CEP, etc.)
   - Regras de negócio violadas

2. **Erros de conexão**

   - Problemas de rede com DRG
   - Timeouts de requisição
   - Falhas de autenticação

3. **Erros de banco**

   - Problemas de conexão
   - Falhas de inserção
   - Dados corrompidos

4. **Erros de XML**
   - Problemas na geração
   - Estrutura inválida
   - Codificação incorreta

### Estratégias de Recuperação

- **Retry automático**: Tentativas de reconexão
- **Fallback**: Dados alternativos em caso de falha
- **Logging detalhado**: Rastreamento completo de erros
- **Notificações**: Alertas para problemas críticos

## 🔍 Validações Implementadas

### Campos Obrigatórios por Situação

#### Admissional (Situação 1)

- NR_ATENDIMENTO, ID_PACIENTE, ID_INTERNACAO
- SITUACAO_INTERNACAO, DT_ADMISSAO, DT_ATENDIMENTO
- CODIGO_HOSPITAL, CODIGO_OPERADORA

#### Prorrogação (Situação 2)

- Todos os campos de Admissional +
- DT_PRORROGACAO, MOTIVO_PRORROGACAO

#### Suplementar (Situação 3)

- Todos os campos de Admissional +
- DT_ALTA, MOTIVO_ALTA

### Validações de Formato

- **CPF**: Formato XXX.XXX.XXX-XX e dígitos verificadores
- **CNS**: 15 dígitos numéricos
- **CEP**: 8 dígitos (XXXXX-XXX)
- **CID**: Formato A00.0 ou A00
- **UF**: Código de 2 letras válido
- **Data**: Formato YYYY-MM-DD
- **Sexo**: M ou F

### Validações de Negócio

- **Datas**: Admissão ≤ Atendimento ≤ Alta
- **Prorrogação**: Data de prorrogação > Data de admissão
- **Alta**: Data de alta > Data de admissão
- **Sequência**: Validação de sequência lógica de eventos

## 📈 Métricas e Monitoramento

### Métricas Disponíveis

- **Taxa de sucesso**: Porcentagem de testes bem-sucedidos
- **Tempo médio**: Tempo médio de execução
- **Distribuição**: Por situação e cenário
- **Tendências**: Evolução ao longo do tempo

### Alertas Configurados

- **Falhas críticas**: Problemas que impedem execução
- **Validações**: Campos obrigatórios ausentes
- **Timeouts**: Requisições que excedem tempo limite
- **Erros DRG**: Problemas de comunicação com DRG

## 🚀 Próximos Passos

### Melhorias Planejadas

1. **Integração contínua**

   - Execução automática de testes
   - Integração com CI/CD
   - Notificações automáticas

2. **Dashboard web**

   - Interface gráfica para monitoramento
   - Visualização de métricas em tempo real
   - Controle de execução de testes

3. **Notificações avançadas**

   - Alertas por email
   - Integração com Slack
   - Notificações push

4. **Métricas avançadas**

   - Análise de tendências
   - Comparação histórica
   - Relatórios executivos

5. **Testes de carga**
   - Simulação de alto volume
   - Testes de performance
   - Análise de gargalos

### Expansões Futuras

- **Novos tipos de teste**: Outras situações DRG
- **Testes de integração**: Com sistemas externos
- **Testes de regressão**: Validação de mudanças
- **Testes de segurança**: Validação de dados sensíveis

## 📞 Suporte e Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**

   - Verificar configurações de conexão
   - Validar credenciais
   - Testar conectividade

2. **Falha na validação**

   - Verificar dados de entrada
   - Validar formatos
   - Consultar logs de erro

3. **Problemas com DRG**

   - Verificar conectividade de rede
   - Validar autenticação
   - Testar endpoint manualmente

4. **Erros de XML**
   - Verificar estrutura de dados
   - Validar codificação
   - Testar geração manual

### Logs de Debug

```bash
# Verificar logs de teste
tail -f logs/2025-01-XX/estabelecimento_1/test_*.log

# Verificar logs de erro
grep -r "ERROR" logs/

# Verificar logs de sucesso
grep -r "SUCCESS" logs/
```

### Contato

Para suporte técnico ou dúvidas:

1. **Verificar documentação**: Consulte este arquivo e README.md
2. **Analisar logs**: Verifique logs de erro e execução
3. **Executar validações**: Use testes de validação para diagnóstico
4. **Contatar equipe**: Entre em contato com a equipe de desenvolvimento

## 🎉 Conclusão

O Sistema de Testes DRG foi desenvolvido para fornecer uma solução completa e robusta para testar todos os aspectos dos envios DRG. Com 24 cenários de teste, validação abrangente, relatórios detalhados e API REST, o sistema garante que todos os XMLs sejam gerados e enviados corretamente.

### Principais Benefícios

- ✅ **Cobertura completa**: Todos os tipos de situação DRG
- ✅ **Dados reais**: Baseados em casos de sucesso existentes
- ✅ **Validação rigorosa**: Campos obrigatórios e opcionais
- ✅ **Relatórios detalhados**: Análise completa de resultados
- ✅ **API REST**: Integração fácil com outros sistemas
- ✅ **Limpeza automática**: Manutenção automática de dados
- ✅ **Configuração flexível**: Adaptável a diferentes necessidades
- ✅ **Tratamento de erros**: Recuperação robusta de falhas

O sistema está pronto para uso em produção e pode ser facilmente expandido para atender novas necessidades de teste.
