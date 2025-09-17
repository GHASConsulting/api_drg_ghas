Campos que temos que enviar como obrigatório 



Paciente 				 TBL\_INM\_ATENDIMENTO 



Data de Nascimento  			: DT\_NASC\_PAC

Número da Carteira  			: NR\_CARTEIRA 

Sexo 	            			: SEXO\_PAC

Particular 				: Isso é setado na mão , no caso particular = N 

UF 					: UF\_PAC

Ação 					: 





Dados da internação 			TBL\_INM\_ATENDIMENTO



Situação ( Admissional ) 		: SITUACAO\_INTERNACAO   1 amissional , 2 diária e 3 alta 

Leito 					: DS\_LEITO

Caráter da internação 			: CARATER\_INTERNACAO

Número Registro 			: NUMEROREGISTRO

Número do atendimento 			: NR\_ATENDIMENTO

Data da Internação 			: DT\_INTERNACAO

Hospital internação 			: CD\_HOSPITAL





Diagnostico 				TBL\_INM\_ATENDIMENTO



CID principal 				: CD\_CID\_PRINCIPAL





Equipe médica     vem da tabela tbl\_inm\_DRG\_medico 



Nome do médico 				: **NOME\_MEDICO**

UF do CRM : MG 				: UF\_MEDICO

Número do CRM 				: CRM\_MEDICO

Especialidade 				: ESPECIALIDADE\_MEDICO

Tipo de atuação 			: TIPOATUACAO\_MEDICO

Responsável pela internação 		: MEDICORESPONSAVEL\_MEDICO





Readmissão 				TBL\_INM\_ATENDIMENTO

Paciente internado outras vezes 	: INTERNADO\_OUTRAS\_VEZES

