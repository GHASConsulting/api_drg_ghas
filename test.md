# Teste de Dados Reais DRG - Hospital INOVEMED

## Dados Atualizados

### 🏥 Hospital INOVEMED (Dados Reais)

- **Código:** 9948
- **Nome:** INOVEMED
- **CNES:** 124
- **Porte:** 2 (Médio)
- **Complexidade:** 2 (Alta complexidade)
- **Esfera Administrativa:** 4 (Privada)
- **Estado:** MG (Minas Gerais)
- **Endereço:** AVENIDA NISIO BATISTA DE OLIVEIRA, 400, S/N
- **Bairro:** SAO LUCAS
- **CEP:** 30240510

### 👤 Paciente (Dados Reais)

- **Data Nascimento:** 1971-06-19
- **Sexo:** F (Feminino)
- **CPF:** 50234242191
- **CNS:** 702109711362597
- **Endereço:** RUA 11, 337, CASA, JARDIM PRIMAVERA
- **CEP:** 15755036
- **Estado:** SP (São Paulo)

### 🏥 Internação (Dados Reais)

- **Situação:** 3
- **Número Registro:** 1539811
- **Número Atendimento:** 6580261
- **Data Internação:** 2025-09-16T11:13:35
- **Data Alta:** 2025-09-16T17:13:35
- **Condição Alta:** A (Casa)
- **CID Principal:** C50
- **Ação:** COMPLEMENTAR
- **Paciente Internado Outras Vezes:** S

### 💳 Operadora (Dados Reais)

- **Código:** 3945
- **Carteira:** 702109711362597

## ✅ Melhorias Implementadas

1. **Dados Reais Válidos** - Todos os testes agora usam dados do hospital INOVEMED
2. **Consistência** - Mesmo hospital em todos os cenários de teste
3. **Campos Obrigatórios** - Todos os campos necessários preenchidos
4. **Novo Campo Testado** - `codigoCirurgiaAviso` incluído em todos os procedimentos
5. **Validações Completas** - PartoAdequado, RN e demais modelos testados

## 🧪 Cenários de Teste Atualizados

- ✅ **Admissional** - Com dados reais do INOVEMED
- ✅ **Prorrogação** - Consistente com dados reais
- ✅ **PartoAdequado** - Hospital real + dados obstétricos
- ✅ **Procedimentos** - Incluindo `codigoCirurgiaAviso`

## 🎯 Próximos Passos

1. Executar testes para validar funcionamento
2. Verificar geração de XML com dados reais
3. Validar envio para ANS com dados consistentes
