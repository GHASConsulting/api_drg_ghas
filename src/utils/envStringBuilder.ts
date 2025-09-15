import * as fs from 'fs';

interface EnvVariable {
  key: string;
  value: string;
  originalValue: string;
}

export class EnvStringBuilder {
  private envPath: string;

  constructor(envPath: string = '.env') {
    this.envPath = envPath;
  }

  /**
   * Escapa caracteres especiais para uso seguro em strings
   */
  private escapeSpecialChars(value: string): string {
    // Caracteres que precisam ser escapados em diferentes contextos
    const specialChars = {
      '\\': '\\\\',  // Backslash
      "'": "\\'",    // Aspa simples
      '"': '\\"',    // Aspa dupla
      '\n': '\\n',   // Nova linha
      '\r': '\\r',   // Retorno de carro
      '\t': '\\t',   // Tab
      '$': '\\$',    // Dólar (para evitar expansão de variáveis)
      '`': '\\`',    // Backtick
    };

    let escaped = value;
    for (const [char, escape] of Object.entries(specialChars)) {
      escaped = escaped.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), escape);
    }

    return escaped;
  }

  /**
   * Remove aspas do início e fim de uma string
   */
  private removeQuotes(value: string): string {
    return value.replace(/^['"]|['"]$/g, '');
  }

  /**
   * Lê o arquivo .env e retorna todas as variáveis como um array
   */
  private readEnvFile(): EnvVariable[] {
    try {
      const envContent = fs.readFileSync(this.envPath, 'utf8');
      const lines = envContent.split('\n');
      const variables: EnvVariable[] = [];

      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Ignora linhas vazias, comentários e linhas que não contêm '='
        if (trimmedLine && !trimmedLine.startsWith('#') && trimmedLine.includes('=')) {
          const equalIndex = trimmedLine.indexOf('=');
          const key = trimmedLine.substring(0, equalIndex).trim();
          const originalValue = trimmedLine.substring(equalIndex + 1).trim();
          const cleanValue = this.removeQuotes(originalValue);
          
          variables.push({ 
            key, 
            value: cleanValue,
            originalValue 
          });
        }
      }

      return variables;
    } catch (error) {
      console.error('Erro ao ler arquivo .env:', error);
      return [];
    }
  }

  /**
   * Cria uma string formatada com todas as variáveis do .env
   */
  public buildEnvString(format: 'bracket' | 'parenthesis' | 'custom' | 'safe' = 'bracket'): string {
    const variables = this.readEnvFile();
    
    if (variables.length === 0) {
      return '';
    }

    switch (format) {
      case 'bracket':
        return this.buildBracketFormat(variables);
      case 'parenthesis':
        return this.buildParenthesisFormat(variables);
      case 'custom':
        return this.buildCustomFormat(variables);
      case 'safe':
        return this.buildSafeFormat(variables);
      default:
        return this.buildBracketFormat(variables);
    }
  }

  /**
   * Formato com colchetes: [KEY=value]
   */
  private buildBracketFormat(variables: EnvVariable[]): string {
    return variables
      .map(v => `[${v.key}='${this.escapeSpecialChars(v.value)}']`)
      .join(' ');
  }

  /**
   * Formato com parênteses: (KEY=value)
   */
  private buildParenthesisFormat(variables: EnvVariable[]): string {
    return variables
      .map(v => `(${v.key}='${this.escapeSpecialChars(v.value)}')`)
      .join(' ');
  }

  /**
   * Formato customizado similar ao seu exemplo
   */
  private buildCustomFormat(variables: EnvVariable[]): string {
    return variables
      .map(v => `${v.key}='${this.escapeSpecialChars(v.value)}'`)
      .join(' ');
  }

  /**
   * Formato seguro para caracteres especiais (usando aspas duplas)
   */
  private buildSafeFormat(variables: EnvVariable[]): string {
    return variables
      .map(v => `[${v.key}="${this.escapeSpecialChars(v.value)}"]`)
      .join(' ');
  }

  /**
   * Filtra variáveis específicas e cria a string
   */
  public buildFilteredEnvString(
    filterKeys: string[], 
    format: 'bracket' | 'parenthesis' | 'custom' | 'safe' = 'bracket'
  ): string {
    const variables = this.readEnvFile();
    const filteredVariables = variables.filter(v => filterKeys.includes(v.key));
    
    if (filteredVariables.length === 0) {
      return '';
    }

    switch (format) {
      case 'bracket':
        return this.buildBracketFormat(filteredVariables);
      case 'parenthesis':
        return this.buildParenthesisFormat(filteredVariables);
      case 'custom':
        return this.buildCustomFormat(filteredVariables);
      case 'safe':
        return this.buildSafeFormat(filteredVariables);
      default:
        return this.buildBracketFormat(filteredVariables);
    }
  }

  /**
   * Atualiza uma variável específica no arquivo .env
   */
  public updateEnvStringVariable(variableName: string, newString: string): boolean {
    try {
      const envContent = fs.readFileSync(this.envPath, 'utf8');
      const lines = envContent.split('\n');
      const updatedLines: string[] = [];

      let found = false;
      for (const line of lines) {
        if (line.trim().startsWith(`${variableName}=`)) {
          updatedLines.push(`${variableName}='${newString}'`);
          found = true;
        } else {
          updatedLines.push(line);
        }
      }

      if (!found) {
        // Se a variável não existir, adiciona no final
        updatedLines.push(`${variableName}='${newString}'`);
      }

      fs.writeFileSync(this.envPath, updatedLines.join('\n'));
      return true;
    } catch (error) {
      console.error(`Erro ao atualizar variável ${variableName} no arquivo .env:`, error);
      return false;
    }
  }

  /**
   * Cria uma string com escape adequado para caracteres especiais
   */
  public createSafeString(variables: string[], format: 'bracket' | 'parenthesis' | 'custom' | 'safe' = 'safe'): string {
    const envVars = this.readEnvFile();
    const filteredVars = envVars.filter(v => variables.includes(v.key));
    
    if (filteredVars.length === 0) {
      return '';
    }

    switch (format) {
      case 'bracket':
        return this.buildBracketFormat(filteredVars);
      case 'parenthesis':
        return this.buildParenthesisFormat(filteredVars);
      case 'custom':
        return this.buildCustomFormat(filteredVars);
      case 'safe':
        return this.buildSafeFormat(filteredVars);
      default:
        return this.buildSafeFormat(filteredVars);
    }
  }

  /**
   * Mostra informações sobre caracteres especiais encontrados
   */
  public analyzeSpecialChars(): void {
    const variables = this.readEnvFile();
    
    console.log('🔍 Análise de caracteres especiais no arquivo .env:\n');
    
    const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '`', '~'];
    
    variables.forEach(v => {
      const foundChars = specialChars.filter(char => v.value.includes(char));
      if (foundChars.length > 0) {
        console.log(`📝 ${v.key}:`);
        console.log(`   Valor original: ${v.originalValue}`);
        console.log(`   Caracteres especiais encontrados: ${foundChars.join(', ')}`);
        console.log(`   Valor escapado: ${this.escapeSpecialChars(v.value)}`);
        console.log('');
      }
    });
  }
}

// Função utilitária simples
export function createSafeEnvString(
  variables: string[], 
  format: 'bracket' | 'parenthesis' | 'custom' | 'safe' = 'safe'
): string {
  const builder = new EnvStringBuilder();
  return builder.createSafeString(variables, format);
}

export function updateEnvVariable(variableName: string, newString: string): boolean {
  const builder = new EnvStringBuilder();
  return builder.updateEnvStringVariable(variableName, newString);
}

// Exemplo de uso
export function exemploComCaracteresEspeciais() {
  const builder = new EnvStringBuilder();
  
  console.log('🚀 Exemplo com caracteres especiais:\n');
  
  // Analisar caracteres especiais
  builder.analyzeSpecialChars();
  
  // Criar string com variáveis que contêm caracteres especiais
  const variaveis = ['API_USER', 'API_PASSWORD', 'ESTABELECIMENTO'];
  
  console.log('📋 Strings formatadas:');
  
  console.log('\n1. Formato bracket:');
  console.log(builder.buildFilteredEnvString(variaveis, 'bracket'));
  
  console.log('\n2. Formato safe (recomendado para caracteres especiais):');
  console.log(builder.buildFilteredEnvString(variaveis, 'safe'));
  
  console.log('\n3. Formato custom:');
  console.log(builder.buildFilteredEnvString(variaveis, 'custom'));
  
  // Atualizar variável no .env
  const safeString = builder.buildFilteredEnvString(variaveis, 'safe');
  console.log('\n4. Atualizando STRING_ESTABELECIMENTO_DRG_A no .env...');
  const success = builder.updateEnvStringVariable('STRING_ESTABELECIMENTO_DRG_A', safeString);
  console.log(success ? '✅ Atualizado com sucesso!' : '❌ Erro ao atualizar');
}

// Executar exemplo se o arquivo for executado diretamente
if (require.main === module) {
  exemploComCaracteresEspeciais();
}





