# Sistema de Logs DRG

## 📋 Visão Geral

O sistema de logs DRG foi implementado para fornecer visibilidade completa sobre o funcionamento do sistema de campos flexíveis. Ele registra todas as operações importantes, desde a criação de validadores até a validação de dados.

## 🚀 Funcionalidades

### **1. Logger Estruturado**
- **Níveis de Log**: DEBUG, INFO, WARN, ERROR
- **Contexto Rico**: Situação, hospital, seção, campo, validador
- **Timestamp Automático**: Todas as entradas são timestampadas
- **Histórico**: Mantém os últimos 1000 logs em memória

### **2. Logs Específicos do DRG**
- **Configuração Carregada**: Log quando a configuração DRG é inicializada
- **Validação de Dados**: Logs detalhados de validação com erros
- **Seções Habilitadas**: Log quando seções são habilitadas/desabilitadas
- **Campos Obrigatórios**: Log de campos presentes/faltando
- **Variáveis de Ambiente**: Log de resolução de variáveis de ambiente

### **3. Configuração Dinâmica**
- **Variáveis de Ambiente**: Controla se os logs estão habilitados
- **Níveis Configuráveis**: Pode alterar o nível mínimo de log
- **Console/Arquivo**: Suporte para output em console e arquivo

## 🔧 Configuração

### **Variáveis de Ambiente**

```bash
# Habilitar logs
LOG_CAMPOS_ENVIADOS=true

# Nível de log (debug, info, warn, error)
LOG_LEVEL=debug

# Configurações específicas do DRG
INCLUIR_CID_SECUNDARIO=true
INCLUIR_PROCEDIMENTO=false
HOSPITAL_123_INCLUIR_CID_SECUNDARIO=false
```

### **Configuração Programática**

```typescript
import { drgLogger, LogLevel } from './utils/logger';

// Alterar nível de log
drgLogger.updateConfig({ level: LogLevel.WARN });

// Desabilitar logs
drgLogger.updateConfig({ enabled: false });

// Limpar histórico
drgLogger.clearHistory();
```

## 📊 Tipos de Logs

### **1. Logs de Configuração**
```typescript
// Log quando configuração é carregada
logDRGConfigLoaded();
// Output: [INFO] Configuração DRG carregada com sucesso | Situação: 1, Hospital: 123
```

### **2. Logs de Validação**
```typescript
// Log de validação de dados
logDataValidation(SituacaoInternacao.ADMISSIONAL, 123, true, []);
// Output: [INFO] Validação de dados bem-sucedida | Situação: 1, Hospital: 123
```

### **3. Logs de Seções**
```typescript
// Log de seção habilitada
logSecaoStatus(SecaoDRG.CID_SECUNDARIO, SituacaoInternacao.ADMISSIONAL, 123, true);
// Output: [DEBUG] Seção cidSecundario habilitada para situação 1 | Seção: cidSecundario, Hospital: 123
```

### **4. Logs de Campos**
```typescript
// Log de campos obrigatórios
logRequiredFields(SituacaoInternacao.ADMISSIONAL, ['numeroInternacao'], ['numeroInternacao']);
// Output: [INFO] Todos os 1 campos obrigatórios estão presentes | Situação: 1
```

## 🎯 Exemplos de Uso

### **Exemplo 1: Validação Básica**
```typescript
import { validateDRGData, SituacaoInternacao } from './interface';

const dados = {
  numeroInternacao: '12345',
  dataInternacao: '2024-01-15'
};

const resultado = validateDRGData(dados, SituacaoInternacao.ADMISSIONAL, 123);
// Logs automáticos serão gerados durante a validação
```

### **Exemplo 2: Verificação de Seções**
```typescript
import { isSecaoHabilitada, SecaoDRG, SituacaoInternacao } from './interface';

const habilitada = isSecaoHabilitada(SecaoDRG.CID_SECUNDARIO, SituacaoInternacao.ADMISSIONAL, 123);
// Log automático será gerado sobre a resolução da seção
```

### **Exemplo 3: Criação de Validador**
```typescript
import { createDRGValidator, SituacaoInternacao } from './interface';

const validator = createDRGValidator(SituacaoInternacao.ADMISSIONAL, 123);
// Log automático será gerado sobre a criação do validador
```

## 📈 Monitoramento

### **Histórico de Logs**
```typescript
import { drgLogger } from './utils/logger';

// Obter histórico completo
const historico = drgLogger.getLogHistory();
console.log(`Total de logs: ${historico.length}`);

// Últimos 10 logs
const ultimosLogs = historico.slice(-10);
ultimosLogs.forEach(log => {
  console.log(`[${log.level}] ${log.message}`);
});
```

### **Logs por Contexto**
```typescript
// Filtrar logs por situação
const logsSituacao1 = historico.filter(log => 
  log.context?.situacao === SituacaoInternacao.ADMISSIONAL
);

// Filtrar logs por hospital
const logsHospital123 = historico.filter(log => 
  log.context?.hospitalCode === 123
);
```

## 🔍 Debugging

### **Logs de Debug**
```typescript
import { drgLogger } from './utils/logger';

// Log detalhado para debug
drgLogger.debug('Processando dados de internação', {
  situacao: SituacaoInternacao.ADMISSIONAL,
  hospitalCode: 123,
  validator: 'DataProcessor',
  dataKeys: Object.keys(dados).length
});
```

### **Logs de Erro**
```typescript
// Log de erro com contexto
drgLogger.error('Falha na validação de dados', {
  situacao: SituacaoInternacao.ADMISSIONAL,
  hospitalCode: 123,
  validator: 'DataValidator',
  error: error.message
});
```

## 🚨 Troubleshooting

### **Problema: Logs não aparecem**
```bash
# Verificar variáveis de ambiente
echo $LOG_CAMPOS_ENVIADOS
echo $LOG_LEVEL

# Configurar se necessário
export LOG_CAMPOS_ENVIADOS=true
export LOG_LEVEL=debug
```

### **Problema: Muitos logs**
```typescript
// Aumentar nível mínimo
drgLogger.updateConfig({ level: LogLevel.WARN });

// Ou desabilitar temporariamente
drgLogger.updateConfig({ enabled: false });
```

### **Problema: Logs muito verbosos**
```typescript
// Limitar contexto
drgLogger.updateConfig({ includeContext: false });

// Ou limpar histórico regularmente
drgLogger.clearHistory();
```

## 📋 Checklist de Implementação

- [x] ✅ Logger estruturado implementado
- [x] ✅ Níveis de log configuráveis
- [x] ✅ Contexto rico nos logs
- [x] ✅ Histórico de logs em memória
- [x] ✅ Logs específicos do DRG
- [x] ✅ Integração com sistema de validação
- [x] ✅ Integração com configuração DRG
- [x] ✅ Funções de conveniência com logs
- [x] ✅ Configuração via variáveis de ambiente
- [x] ✅ Arquivo de demonstração criado

## 🎯 Próximos Passos

1. **Testes Unitários**: Criar testes para o sistema de logs
2. **Logs em Arquivo**: Implementar escrita em arquivo
3. **Métricas**: Adicionar métricas de performance
4. **Dashboard**: Criar interface para visualizar logs
5. **Alertas**: Implementar sistema de alertas baseado em logs

## 📚 Referências

- [Documentação de Implementação](../docs/README_IMPLEMENTACAO_CAMPOS_FLEXIVEIS.md)
- [Sistema de Validação](./utils/validation.ts)
- [Configuração DRG](./config/drg-config.ts)
- [Arquivo de Demonstração](./demo-logs.ts)
