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
	"dt_exec" TIMESTAMP ,
	"crm_medico_procedimento" varchar,
	"uf_medico_procedimento" varchar,
	"tp_atuacao_medico_procedimento" varchar,
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
	"nr_registro_rn" varchar,
	"nr_atendimento_rn" varchar,
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






