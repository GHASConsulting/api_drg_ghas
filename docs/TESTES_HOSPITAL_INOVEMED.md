# 🏥 Testes DRG - Hospital INOVEMED

## 📋 Visão Geral

Os testes DRG foram atualizados para usar dados reais do **Hospital INOVEMED** extraídos do arquivo CSV fornecido. Agora você pode testar os envios para o DRG com dados verdadeiros do hospital.

## 🎯 Dados do Hospital INOVEMED

### Informações Básicas

- **Código**: 9948
- **Nome**: INOVEMED
- **CNES**: 124
- **UF**: MG (Minas Gerais)
- **Cidade**: Minas Gerais

### Endereço

- **Tipo**: AVENIDA
- **Logradouro**: NISIO BATISTA DE OLIVEIRA
- **Número**: 400
- **Complemento**: S/N
- **Bairro**: SAO LUCAS
- **CEP**: 30240510

### Características

- **Porte**: 2
- **Complexidade**: 2
- **Esfera Administrativa**: 1

## 🚀 Como Executar os Testes

### 1. Validação dos Dados

```bash
# Testa se os dados do hospital estão corretos
node test-hospital-data.js

# Executa apenas validações (sem envio para DRG)
node run-drg-tests.js validate
```

### 2. Testes Completos

```bash
# Executa todos os testes (24 cenários)
node run-drg-tests.js all

# Executa testes offline (sem dependência do banco)
node run-drg-tests.js offline

# Executa testes com envio real para DRG
node run-drg-tests.js send
```

### 3. Testes por Situação

```bash
# Apenas testes de Admissional (8 cenários)
node run-drg-tests.js admissional

# Apenas testes de Prorrogação (8 cenários)
node run-drg-tests.js prorrogacao

# Apenas testes de Suplementar (8 cenários)
node run-drg-tests.js suplementar
```

## 📊 Cenários de Teste Disponíveis

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

## 🔧 Configuração

### Dados Base

Os dados do Hospital INOVEMED estão configurados no arquivo:

- `src/tests/testDataGenerator.ts` - Método `createRealHospitalData()`

### Validação

O sistema de validação verifica:

- ✅ Campos obrigatórios
- ✅ Formatos de CPF, CNS, CEP, CID, UF
- ✅ Datas e sequências
- ✅ Regras de negócio

## 📈 Resultados dos Testes

### Exemplo de Saída

```
🏥 Executando testes DRG com dados do Hospital INOVEMED...

📦 Compilando TypeScript...

🔍 Executando testes: VALIDATE
🚀 Inicializando DRG Test Suite...
✅ Dados reais do Hospital INOVEMED carregados para teste
✅ DRG Test Suite inicializado com sucesso!
🔍 Executando apenas validações...
  📋 Admissional Básico: ✅ Válido (Score: 96)
  📋 Prorrogação Básica: ✅ Válido (Score: 96)
  📋 Suplementar Básico: ✅ Válido (Score: 100)
✅ Validações executadas!

✅ Testes concluídos com sucesso!
🎯 Os testes foram executados com dados reais do Hospital INOVEMED.
```

## 🎯 Próximos Passos

1. **Execute os testes de validação** para verificar se tudo está funcionando
2. **Execute testes específicos** por situação conforme necessário
3. **Execute testes com envio real** quando estiver pronto para testar com o DRG
4. **Monitore os logs** para identificar possíveis problemas

## 📝 Notas Importantes

- Os dados do Hospital INOVEMED são reais e extraídos do arquivo CSV fornecido
- Todos os testes usam IDs únicos gerados automaticamente
- Os testes podem ser executados independentemente do banco de dados
- Os logs são salvos automaticamente para análise posterior

## 🆘 Suporte

Se encontrar problemas:

1. Verifique se o TypeScript foi compilado corretamente
2. Execute primeiro `node test-hospital-data.js` para validar os dados
3. Verifique os logs de erro para identificar problemas específicos
4. Execute testes de validação antes de tentar envios reais para o DRG
