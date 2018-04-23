-- base de datos

create database ventilacion;
use ventilacion;

create table pacientes(
	id_paciente int unsigned not null auto_increment,
	nombre varchar(100) not null default "desconocido",
	expediente varchar(20) default 'desconocido',
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
	vt2 decimal(6,2) not null default 0,
	create_at timestamp default current_timestamp,
	status tinyint not null default 1,
	PRIMARY KEY (id_paciente)
)engine=innodb, charset=utf8;




create database empresa;
use empresa;

create table empleados(
	id int not null auto_increment,
	num_empleado int not null,
	fecha_cambio datetime not null,
	area_cambio varchar(50) not null,
	PRIMARY KEY (id)
)engine=innodb, charset=utf8;

insert into empleados values
(default, 1, '2018-12-10', 'area1'),
(default, 1, '2017-10-12', 'area8'),
(default, 1, '2016-12-10', 'area6'),
(default, 2, '2018-05-24', 'area2'),
(default, 2, '2015-11-28', 'area4'),
(default, 3, '2016-05-05', 'area7'),
(default, 3, '2018-01-20', 'area5'),
(default, 4, '2017-09-03', 'area5'),
(default, 4, '2017-10-29', 'area7'),
(default, 4, '2018-12-10', 'area6');

select * from empleados t1 where fecha_cambio = ( select max(fecha_cambio) from empleados t2 where t1.num_empleado=t2.num_empleado);