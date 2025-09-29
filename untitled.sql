-- Script PostgreSQL para criar estrutura DRG completa
-- Estrutura ATUALIZADA com todas as colunas e tabelas corrigidas
-- Baseado na estrutura normalizada do SQLite e modelos TypeScript
-- Inclui: campos de Parto Adequado completos, cd_cirurgia_aviso, tabelas de condições adquiridas
-- Campos técnicos: cd_dti_atendimento, campos de identificação faltantes

CREATE TABLE "tbl_dti_atendimento" (
	"situacao_internacao" integer,
	"carater_internacao" integer,
	"procedencia_paciente" varchar,
	"leito" varchar,
	"nr_operadora_fonte_pagadora" varchar,
	"nr_registro" varchar,
	"nr_atendimento" integer,
	"nr_autorizacao" integer,
	"dt_internacao" TIMESTAMP,
	"dt_alta" TIMESTAMP,
	"condicao_alta" varchar,
	"dt_autorizacao" TIMESTAMP,
	"cd_cid_principal" varchar,
	"paciente_internado_outras_vezes" varchar,
	"hospital_internacao_anterior" varchar,
	"ultima_internacao_30_dias" varchar,
	"internacao_complicacao_recaida" varchar,
	"acao" varchar,
	"nenhum_dispositivo_terapeutico" varchar,
	"nota" text,
	"tipo_nota" varchar,
	"dt_nota" TIMESTAMP,
	"cd_hospital" integer,
	"nm_hospital" varchar,
	"cnes_hospital" integer,
	"porte_hospital" integer,
	"complexidade_hospital" integer,
	"esfera_adm_hospital" integer,
	"uf_hospital" varchar,
	"cidade_hospital" varchar,
	"tp_logradouro_hospital" varchar,
	"logradouro_hospital" varchar,
	"nr_logradouro_hospital" integer,
	"complemento_logradouro_hospital" varchar,
	"bairro_hospital" varchar,
	"cep_hospital" varchar,
	"dt_nasc_pac" TIMESTAMP,
	"sexo_pac" varchar,
	"cpf_pac" varchar,
	"cns_pac" varchar,
	"recem_nascido_pac" varchar,
	"particular_pac" varchar,
	"vulnerabilidade_social_pac" varchar,
	"uf_pac" varchar,
	"cidade_pac" varchar,
	"tp_logradouro_pac" varchar,
	"logradouro_pac" varchar,
	"nr_logradouro_pac" varchar,
	"complemento_logradouro_pac" varchar,
	"bairro_pac" varchar,
	"cep_pac" varchar,
	"cd_operadora" varchar,
	"plano_operadora" varchar,
	"nr_carteira" varchar,
	"dt_validade_operadora" TIMESTAMP,
	"tp_sup_vent" varchar,
	"local_sup_vent" varchar,
	"tp_invasivo_sup_vent" varchar,
	"dt_inicial_sup_vent" TIMESTAMP,
	"dt_final_sup_vent" varchar,
	"cd_condicao_adquirida" varchar,
	"dt_ocorrencia_sup" varchar,
	"nr_atend_alta_adm" varchar,
	"nr_autorizacao_alta_adm" varchar,
	"cesariana_parto_adequado" varchar,
	"medicacao_inducao_parto" varchar,
	"nr_partos_anteriores" varchar,
	-- Campos completos de Parto Adequado conforme DRG
	"antecedentes_obstetricos" varchar,
	"numero_cesareas_anteriores" varchar,
	"apresentacao_fetal_rn1" varchar,
	"apresentacao_fetal_rn2" varchar,
	"apresentacao_fetal_rn3" varchar,
	"apresentacao_fetal_rn4" varchar,
	"apresentacao_fetal_rn5" varchar,
	"inicio_trabalho_parto" varchar,
	"ruptura_uterina" varchar,
	"laceracao_perineal" varchar,
	"transfusao_sanguinea" varchar,
	"morte_materna" varchar,
	"morte_fetal_intraparto" varchar,
	"admissao_materna_uti" varchar,
	"retorno_sala_parto" varchar,
	"indice_satisfacao_hospital" varchar,
	"indice_satisfacao_equipe" varchar,
	"houve_contato_pele" varchar,
	"posicao_parto" varchar,
	"uso_ocitocina_misoprostol" varchar,
	"parturiente_acompanhada" varchar,
	"presenca_doula" varchar,
	"realizada_episiotomia" varchar,
	"houve_aleitamento_materno" varchar,
	"quando_ocorreu_clampamento" varchar,
	"houve_metodos_analgesia" varchar,
	"metodo_analgesia" varchar,
	"perimetro_cefalico_rn1" varchar,
	"perimetro_cefalico_rn2" varchar,
	"perimetro_cefalico_rn3" varchar,
	"perimetro_cefalico_rn4" varchar,
	"perimetro_cefalico_rn5" varchar,
	-- Campos de identificação que estavam faltando
	"codigo_municipio_hospital" varchar,       -- Código do município (12 chars numérico)
	"codigo_identificacao" varchar,            -- Código ID do beneficiário (15 chars)
	"codigo_municipio_pac" varchar,            -- Código do município do paciente (12 chars numérico)
	"cd_dti_atendimento" varchar,              -- Código DTI para referência
	"tp_status" varchar,
	"ds_erro" varchar,
	"id_atendimento" serial NOT NULL,
	CONSTRAINT "tbl_dti_atendimento_pk" PRIMARY KEY ("id_atendimento")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_dti_medico" (
	"nm_medico" varchar,
	"ddd_medico" varchar,
	"nr_telefone_medico" varchar,
	"email_medico" varchar,
	"uf_medico" varchar,
	"crm_medico" varchar,
	"especialidade_medico" varchar,
	"medico_responsavel" varchar,
	"tp_atuacao_medico" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_dti_cid" (
	"cd_cid" varchar,
	"id_atendimento" integer 
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_dti_procedimento" (
	"cd_procedimento" varchar,
	"dt_exec" TIMESTAMP,
	"dt_solic" TIMESTAMP,                      -- Data da solicitação
	"dt_fim_exec" TIMESTAMP,                   -- Data final da execução
	"cd_cirurgia_aviso" varchar,               -- Código da cirurgia aviso (opcional)
	"crm_medico_procedimento" varchar,
	"uf_medico_procedimento" varchar,
	"tp_atuacao_medico_procedimento" varchar,
	"cd_dti_atendimento" varchar,              -- Código DTI para referência
	"id_atendimento" integer  
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tbl_dti_cti" (
	"leito_cti" varchar,
	"dt_inicial_cti" TIMESTAMP,
	"dt_final_cti" TIMESTAMP,
	"cd_cid_principal" varchar,
	"condicao_alta_cti" varchar,
	"uf_cti" varchar,
	"crm_cti" varchar,
	"cd_hospital" varchar,
	"nm_hospital" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Causa Externa
CREATE TABLE "tbl_dti_causa_externa" (
	"descricao_causa_externa" varchar,
	"tempo_causa_externa" TIMESTAMP,
	"dt_inicial_causa_externa" TIMESTAMP,
	"dt_final_causa_externa" TIMESTAMP,
	"origem_causa_externa" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Diagnóstico
CREATE TABLE "tbl_dti_diagnostico" (
	"cd_cid_diagnostico" varchar,
	"tipo_diagnostico" varchar,
	"dt_diagnostico" TIMESTAMP,
	"descricao_diagnostico" varchar,
	"tipo_internacao" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Procedimento
CREATE TABLE "tbl_dti_procedimento_detalhado" (
	"descricao_procedimento" varchar,
	"urgencia_procedimento" varchar,
	"dt_procedimento" TIMESTAMP,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Diária
CREATE TABLE "tbl_dti_diaria" (
	"cd_diaria" varchar,
	"descricao_diaria" varchar,
	"valor_diaria" decimal(10,2),
	"quantidade_diaria" integer,
	"dt_inicial_diaria" TIMESTAMP,
	"dt_final_diaria" TIMESTAMP,
	"dt_autorizacao_diaria" TIMESTAMP,
	"acao_diaria" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Taxa
CREATE TABLE "tbl_dti_taxa" (
	"cd_taxa" varchar,
	"descricao_taxa" varchar,
	"valor_taxa" decimal(10,2),
	"quantidade_taxa" integer,
	"dt_autorizacao_taxa" TIMESTAMP,
	"acao_taxa" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Insumo
CREATE TABLE "tbl_dti_insumo" (
	"cd_insumo" varchar,
	"descricao_insumo" varchar,
	"valor_insumo" decimal(10,2),
	"quantidade_insumo" integer,
	"dt_autorizacao_insumo" TIMESTAMP,
	"acao_insumo" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Serviço
CREATE TABLE "tbl_dti_servico" (
	"cd_servico" varchar,
	"descricao_servico" varchar,
	"valor_servico" decimal(10,2),
	"quantidade_servico" integer,
	"dt_autorizacao_servico" TIMESTAMP,
	"acao_servico" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Profissional Executante
CREATE TABLE "tbl_dti_profissional_executante" (
	"nm_profissional" varchar,
	"cd_conselho" varchar,
	"conselho" varchar,
	"uf_conselho" varchar,
	"especialidade" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Medicamento
CREATE TABLE "tbl_dti_medicamento" (
	"cd_medicamento" varchar,
	"nm_medicamento" varchar,
	"unidade_medicamento" varchar,
	"quantidade_medicamento" integer,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para DRG
CREATE TABLE "tbl_dti_drg" (
	"descricao_drg" varchar,
	"versao_drg" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para DRG Comorbidades
CREATE TABLE "tbl_dti_drg_comorbidades" (
	"descricao_comorbidade" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para DRG Complicações
CREATE TABLE "tbl_dti_drg_complicacoes" (
	"descricao_complicacao" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para RN (Recém Nascido)
CREATE TABLE "tbl_dti_rn" (
	"peso_nascimento" integer,                  -- Peso em gramas
	"idade_gestacional" varchar,               -- Em semanas (99.9)
	"comprimento" varchar,                     -- Em cm (99.9)
	"sexo_rn" varchar,                         -- M/F/I
	"nascido_vivo" varchar,                    -- S/N
	"tocotraumatismo" varchar,                 -- S/N/I
	"apgar" varchar,                           -- S/N/I
	"apgar_quinto_minuto" integer,             -- 0-10
	"alta_48_horas" varchar,                   -- S/N
	"nr_autorizacao_mae" varchar,              -- 25 chars
	"nr_atendimento_mae" varchar,              -- 25 chars
	"nr_carteira_mae" varchar,                 -- 30 chars
	"cd_dti_atendimento" varchar,              -- Código DTI para referência
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Parto Adequado
CREATE TABLE "tbl_dti_parto_adequado" (
	"tipo_inducao_parto" varchar,
	"medicacao_inducao_parto" varchar,
	"nr_cesareas_anteriores" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Urgência/Emergência
CREATE TABLE "tbl_dti_urgencia_emergencia" (
	"cd_urgencia_emergencia" varchar,
	"dt_entrada_urgencia_emergencia" TIMESTAMP,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Dispositivo Terapêutico
CREATE TABLE "tbl_dti_dispositivo_terapeutico" (
	"local_dispositivo" varchar,               -- C/F/S
	"tipo_dispositivo" varchar,                -- BIA2, IVA1, MCC2, etc.
	"dt_inicial_dispositivo" TIMESTAMP,
	"dt_final_dispositivo" TIMESTAMP,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Alta Administrativa
CREATE TABLE "tbl_dti_alta_administrativa" (
	"nr_atendimento_alta" varchar,             -- 25 chars
	"nr_autorizacao_alta" varchar,             -- 25 chars
	"dt_autorizacao_alta" TIMESTAMP,
	"dt_inicial_atendimento" TIMESTAMP,
	"dt_final_atendimento" TIMESTAMP,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Análise Crítica
CREATE TABLE "tbl_dti_analise_critica" (
	"dt_analise" TIMESTAMP,
	"analise_critica" text,                    -- 1200 chars
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Causa Externa Permanência (atualizada)
CREATE TABLE "tbl_dti_causa_externa_permanencia" (
	"descricao_causa" varchar,                 -- 250 chars
	"tempo_causa" varchar,                     -- 8 chars
	"dt_inicial_causa" TIMESTAMP,
	"dt_final_causa" TIMESTAMP,
	"origem_causa" varchar,                    -- A/H/R
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Suporte Ventilatório
CREATE TABLE "tbl_dti_suporte_ventilatorio" (
	"tp_sup_vent" varchar,
	"local_sup_vent" varchar,
	"tp_invasivo_sup_vent" varchar,
	"dt_inicial_sup_vent" TIMESTAMP,
	"dt_final_sup_vent" varchar,
	"dt_inicial_sup_ventilatorio" TIMESTAMP,
	"dt_final_sup_ventilatorio" TIMESTAMP,
	"cd_cid_cond_adq_vent" varchar,
	"dt_cond_adq_vent" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Cateter Vascular Central
CREATE TABLE "tbl_dti_cateter_vascular_central" (
	"local_cat_vas" varchar,
	"dt_inicio_cat_vas" varchar,
	"dt_fim_cat_vas" varchar,
	"cd_cid_cat_vas" varchar,
	"dt_cat_vas" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Sonda Vesical de Demora
CREATE TABLE "tbl_dti_sonda_vesical_demora" (
	"local_son_ves" varchar,
	"dt_inicio_son_ves" varchar,
	"dt_fim_son_ves" varchar,
	"cd_cid_cond_adq_sonda" varchar,
	"dt_cond_adq_sonda" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Condição Adquirida
CREATE TABLE "tbl_dti_condicao_adquirida" (
	"cd_cid_cond_adq" varchar,
	"dt_ocorrencia_cond_adq" varchar,
	"dt_manifestacao_cond_adq" varchar,
	"uf_med_cond_adq" varchar,
	"crm_med_cond_adq" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Médico Procedimento
CREATE TABLE "tbl_dti_medico_procedimento" (
	"uf_medico_proc" varchar,                  -- 2 chars
	"crm_medico_proc" varchar,                 -- 20 chars
	"tp_atuacao_medico_proc" varchar,          -- A/A2/A3/R
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Condição Adquirida Suporte Ventilatório
CREATE TABLE "tbl_dti_cond_adq_sup_vent" (
	"cd_cid_cond_adq_vent" varchar,
	"dt_ocorrencia_cond_adq_vent" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Condição Adquirida Sonda Vesical
CREATE TABLE "tbl_dti_cond_adq_sonda" (
	"cd_cid_cond_adq_sonda" varchar,
	"dt_ocorrencia_cond_adq_sonda" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Tabela para Condição Adquirida Cateter Vascular
CREATE TABLE "tbl_dti_cond_adq_cat_vas" (
	"cd_cid_cond_adq_cat_vas" varchar,
	"dt_ocorrencia_cond_adq_cat_vas" varchar,
	"cd_dti_atendimento" varchar,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);

-- Constraints de Chave Estrangeira
ALTER TABLE "tbl_dti_medico" ADD CONSTRAINT "tbl_dti_medico_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cid" ADD CONSTRAINT "tbl_dti_cid_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_procedimento" ADD CONSTRAINT "tbl_dti_procedimento_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cti" ADD CONSTRAINT "tbl_dti_cti_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

-- Constraints para as novas tabelas
ALTER TABLE "tbl_dti_causa_externa" ADD CONSTRAINT "tbl_dti_causa_externa_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_diagnostico" ADD CONSTRAINT "tbl_dti_diagnostico_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_procedimento_detalhado" ADD CONSTRAINT "tbl_dti_procedimento_detalhado_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_diaria" ADD CONSTRAINT "tbl_dti_diaria_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_taxa" ADD CONSTRAINT "tbl_dti_taxa_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_insumo" ADD CONSTRAINT "tbl_dti_insumo_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_servico" ADD CONSTRAINT "tbl_dti_servico_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_profissional_executante" ADD CONSTRAINT "tbl_dti_profissional_executante_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_medicamento" ADD CONSTRAINT "tbl_dti_medicamento_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_drg" ADD CONSTRAINT "tbl_dti_drg_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_drg_comorbidades" ADD CONSTRAINT "tbl_dti_drg_comorbidades_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_drg_complicacoes" ADD CONSTRAINT "tbl_dti_drg_complicacoes_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_rn" ADD CONSTRAINT "tbl_dti_rn_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_parto_adequado" ADD CONSTRAINT "tbl_dti_parto_adequado_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_urgencia_emergencia" ADD CONSTRAINT "tbl_dti_urgencia_emergencia_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

-- Constraints para as novas tabelas adicionadas
ALTER TABLE "tbl_dti_dispositivo_terapeutico" ADD CONSTRAINT "tbl_dti_dispositivo_terapeutico_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_alta_administrativa" ADD CONSTRAINT "tbl_dti_alta_administrativa_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_analise_critica" ADD CONSTRAINT "tbl_dti_analise_critica_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_causa_externa_permanencia" ADD CONSTRAINT "tbl_dti_causa_externa_permanencia_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_suporte_ventilatorio" ADD CONSTRAINT "tbl_dti_suporte_ventilatorio_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cateter_vascular_central" ADD CONSTRAINT "tbl_dti_cateter_vascular_central_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_sonda_vesical_demora" ADD CONSTRAINT "tbl_dti_sonda_vesical_demora_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_condicao_adquirida" ADD CONSTRAINT "tbl_dti_condicao_adquirida_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_medico_procedimento" ADD CONSTRAINT "tbl_dti_medico_procedimento_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cond_adq_sup_vent" ADD CONSTRAINT "tbl_dti_cond_adq_sup_vent_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cond_adq_sonda" ADD CONSTRAINT "tbl_dti_cond_adq_sonda_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cond_adq_cat_vas" ADD CONSTRAINT "tbl_dti_cond_adq_cat_vas_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");
