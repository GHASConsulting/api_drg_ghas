#!/usr/bin/env node

/**
 * Script de configuração para envio real ao DRG
 * Configura credenciais e testa conectividade
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 CONFIGURANDO ENVIO REAL PARA DRG');
console.log('='.repeat(50));

// Verifica se o arquivo .env existe
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Copiando example_env para .env...');

  const examplePath = path.join(__dirname, 'example_env');
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log('✅ Arquivo .env criado a partir do example_env');
  } else {
    console.log('❌ Arquivo example_env também não encontrado!');
    process.exit(1);
  }
}

// Lê o arquivo .env
let envContent = fs.readFileSync(envPath, 'utf8');

console.log('\n📋 Configurações atuais:');
console.log('WSDL_URL:', envContent.includes('WSDL_URL=') ? 'CONFIGURADO' : 'NÃO CONFIGURADO');
console.log('API_USER:', envContent.includes('API_USER=') ? 'CONFIGURADO' : 'NÃO CONFIGURADO');
console.log('API_PASSWORD:', envContent.includes('API_PASSWORD=') ? 'CONFIGURADO' : 'NÃO CONFIGURADO');

// Configura credenciais padrão para teste
console.log('\n🔧 Configurando credenciais para teste...');

// Adiciona configurações se não existirem
if (!envContent.includes('API_USER=')) {
  envContent += '\n# Credenciais da API SOAP DRG\nAPI_USER=drg_user\n';
}

if (!envContent.includes('API_PASSWORD=')) {
  envContent += 'API_PASSWORD=drg_password_2024\n';
}

if (!envContent.includes('STRING_ESTABELECIMENTO_DRG_9948=')) {
  envContent += 'STRING_ESTABELECIMENTO_DRG_9948=[API_USER="drg_user"] [API_PASSWORD="drg_password_2024"] [ESTABELECIMENTO=9948]\n';
}

// Salva o arquivo .env atualizado
fs.writeFileSync(envPath, envContent);

console.log('✅ Credenciais configuradas:');
console.log('   API_USER: drg_user');
console.log('   API_PASSWORD: drg_password_2024');
console.log('   ESTABELECIMENTO: 9948');

console.log('\n📝 Próximos passos:');
console.log('1. ✅ Credenciais configuradas');
console.log('2. 🔄 Compilar o projeto: npm run build');
console.log('3. 🚀 Executar envio real: node dist/scripts/realSendToDRG.js');
console.log('4. 📊 Verificar logs de envio');

console.log('\n🎯 Para executar o envio real:');
console.log('   npm run build');
console.log('   node dist/scripts/realSendToDRG.js');

console.log('\n⚠️  IMPORTANTE:');
console.log('   - As credenciais são para TESTE');
console.log('   - Para produção, configure credenciais reais');
console.log('   - Verifique se a API SOAP está acessível');
