-- base de datos

create database ventilacion;
use ventilacion;

create table pacientes(
	id_paciente int unsigned not null auto_increment,
	nombre varchar(100) not null default "desconocido",
	peso float(6,2) not null default 0,
	estatura smallint not null default 0,
	genero varchar(3) not null default "I",
	frecuenciaRespiratoria smallint not null default 0,
	vt smallint not null default 0,
	presionPico smallint not null default 0,
	presionMeseta smallint not null default 0,
	peep smallint not null default 0,
	fio2 float(8,2) not null default 0,
	poderMecanico float(8,2) not null default 0,
	status tinyint not null default 1,
	PRIMARY KEY (id_paciente)
)engine=innodb, charset=utf8;