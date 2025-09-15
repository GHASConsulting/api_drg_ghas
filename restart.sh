#!/bin/bash

# Lendo o arquivo .env e extraindo as horas da variável HORARIOS_CRON
horarios_cron=$(grep "HORARIOS_CRON" .env | cut -d '=' -f2 | tr -d "'" | tr -d ' ')

# Separando as horas usando o ponto e vírgula como delimitador
IFS=';' read -ra horas <<< "$horarios_cron"

# Construindo a string de horas para o comando pm2 restart
horas_pm2=""
for hora in "${horas[@]}"; do
    hora=$(echo "$hora" | cut -d ':' -f1)
    hora=$((10#$hora)) # Removendo zeros à esquerda
    hora=$((hora - 1)) # Diminuindo 1 da hora
    horas_pm2+="$hora,"
done
horas_pm2=${horas_pm2%,} # Removendo a última vírgula

# Mostrando o comando pm2 restart na tela
# echo "Comando a ser executado:"
# echo "pm2 restart producao --cron \"00 $horas_pm2 * * *\""


npm run build

pm2 start ./dist/server.js --name api_drg_prd -f

# Executando o comando pm2 restart
pm2 restart api_drg_prd --cron "00 $horas_pm2 * * *"
