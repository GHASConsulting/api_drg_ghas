CREATE TABLE "tbl_dti_atendimento" (
	"situacao_internacao" integer,
	"carater_internacao" integer,
	"nr_atendimento" integer,
	"nr_autorizacao" integer,
	"dt_internacao" TIMESTAMP,
	"dt_alta" TIMESTAMP,
	"condicao_alta" varchar,
	"dt_autorizacao" TIMESTAMP,
	"cd_cid_principal" varchar,
	"internado_outras_vezes" varchar,
	"reiternacao" varchar,
	"recaida" varchar,
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
	"uf_pac" varchar,
	"cidade_pac" varchar,
	"tp_logradouro_pac" varchar,
	"logradouro_pac" varchar,
	"nr_logradouro" varchar,
	"complemento_logradouro_pac" varchar,
	"bairro_pac" varchar,
	"cep_pac" varchar,
	"vulnerabilidade_social_pac" varchar,
	"recem_nascio_pac" varchar,
	"cns_pac" varchar,
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
	"dt_inicial_cti" TIMESTAMP  ,
	"dt_final_cti" TIMESTAMP  ,
	"cd_cid_principal" varchar  ,
	"condicao_alta_cti" varchar,
	"uf_cti" varchar  ,
	"crm_cti" varchar  ,
	"cd_hospital" varchar  ,
	"nm_hospital" varchar  ,
	"id_atendimento" integer
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tbl_dti_medico" ADD CONSTRAINT "tbl_dti_medico_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cid" ADD CONSTRAINT "tbl_dti_cid_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_procedimento" ADD CONSTRAINT "tbl_dti_procedimento_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");

ALTER TABLE "tbl_dti_cti" ADD CONSTRAINT "tbl_dti_cti_fk0" FOREIGN KEY ("id_atendimento") REFERENCES "tbl_dti_atendimento"("id_atendimento");






