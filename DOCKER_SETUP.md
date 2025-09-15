# 🐳 Configuração Docker DRG - Melhorias Implementadas

## 📋 Resumo das Melhorias

Este projeto foi atualizado com as seguintes melhorias:

1. **📁 Logs na pasta de origem**: Os logs agora são armazenados na pasta `logs/` do projeto
2. **🔄 Reinício automático**: Container é reiniciado automaticamente 1h antes de cada envio programado
3. **🎛️ Gerenciamento simplificado**: Script de gerenciamento para facilitar operações

## 🚀 Como Usar

### Iniciar os Serviços
```bash
./docker-manager.sh start
```

### Verificar Status
```bash
./docker-manager.sh status
```

### Ver Logs da Aplicação
```bash
./docker-manager.sh logs
```

### Ver Logs do Scheduler de Reinício
```bash
./docker-manager.sh logs-restart
```

### Parar Serviços
```bash
./docker-manager.sh stop
```

### Reiniciar Serviços
```bash
./docker-manager.sh restart
```

### Reconstruir Imagens
```bash
./docker-manager.sh build
```

### Limpar Docker
```bash
./docker-manager.sh clean
```

## 📁 Estrutura de Arquivos

```
.
├── docker-compose.yml          # Configuração principal dos serviços
├── Dockerfile                  # Imagem da aplicação principal
├── Dockerfile.restart          # Imagem do scheduler de reinício
├── docker-manager.sh           # Script de gerenciamento
├── start.sh                    # Script de inicialização da aplicação
├── restart-container.sh        # Script do scheduler de reinício
├── .env                        # Configurações (incluindo HORARIOS_CRON)
└── logs/                       # Pasta onde os logs são armazenados
```

## ⏰ Configuração de Horários

Os horários de reinício são configurados automaticamente baseados na variável `HORARIOS_CRON` no arquivo `.env`.

**Exemplo de configuração no .env:**
```env
HORARIOS_CRON = '08:00;12:00;16:00;'
```

**Resultado:**
- Envios programados: 08:00, 12:00, 16:00
- Reinícios automáticos: 07:00, 11:00, 15:00 (1h antes)

## 🔧 Serviços Docker

### 1. Aplicação Principal (`app`)
- **Container**: `drg_alta`
- **Porta**: 3434
- **Função**: Aplicação principal DRG
- **Logs**: Armazenados em `./logs/`

### 2. Scheduler de Reinício (`restart-scheduler`)
- **Container**: `drg_restart_scheduler`
- **Função**: Monitora horários e reinicia container automaticamente
- **Dependência**: Acesso ao Docker daemon

## 📊 Monitoramento

### Verificar Status dos Containers
```bash
docker-compose ps
```

### Ver Logs em Tempo Real
```bash
# Logs da aplicação
docker-compose logs -f app

# Logs do scheduler
docker-compose logs -f restart-scheduler
```

### Verificar Pasta de Logs
```bash
ls -la logs/
```

## 🛠️ Troubleshooting

### Container não inicia
```bash
# Verificar logs de erro
docker-compose logs app

# Reconstruir imagem
./docker-manager.sh build
```

### Scheduler não funciona
```bash
# Verificar logs do scheduler
./docker-manager.sh logs-restart

# Verificar configuração do .env
grep HORARIOS_CRON .env
```

### Logs não aparecem
```bash
# Verificar permissões da pasta logs
ls -la logs/

# Recriar pasta se necessário
mkdir -p logs && chmod 755 logs
```

## 🔄 Reinício Automático

O sistema de reinício automático funciona da seguinte forma:

1. **Leitura dos horários**: Lê a variável `HORARIOS_CRON` do arquivo `.env`
2. **Cálculo dos horários de reinício**: Subtrai 1h de cada horário de envio
3. **Configuração do cron**: Configura tarefas cron para executar nos horários calculados
4. **Execução do reinício**: Reinicia o container `drg_alta` nos horários programados

### Exemplo de Funcionamento
```
Horários de envio: 08:00, 12:00, 16:00
Horários de reinício: 07:00, 11:00, 15:00
```

## 📝 Logs

Os logs são armazenados na pasta `logs/` do projeto, permitindo:
- Persistência dos logs mesmo após reinicialização do container
- Fácil acesso aos logs sem precisar entrar no container
- Backup e análise dos logs

## 🔐 Segurança

- O scheduler de reinício tem acesso limitado ao Docker daemon
- Logs são armazenados localmente, não expostos externamente
- Timezone configurado para America/Sao_Paulo

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs: `./docker-manager.sh logs`
2. Verifique o status: `./docker-manager.sh status`
3. Reconstrua as imagens: `./docker-manager.sh build`

