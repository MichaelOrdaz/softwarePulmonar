-- base de datos

create database ventilacion;
use ventilacion;

create table pacientes(
	id_paciente int unsigned not null auto_increment,
	nombre varchar(100) not null default "desconocido",
	peso smallint not null,
	estatura smallint not null,
	genero varchar(3) not null,
	frecuenciaRespiratoria smallint not null,
	vt smallint not null,
	presionPico smallint not null,
	presionMeseta smallint not null,
	peep smallint not null,
	PRIMARY KEY (id_paciente)
)engine=innodb, charset=utf8;