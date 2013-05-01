create table customer(
	id varchar(20) not null,
	name varchar(30),
	primary key(id)
) engine InnoDB, default character set utf8;

insert into customer(id, name) values('jupama', 'Jupama S.A.');
insert into customer(id, name) values('pama', 'Pama e Hijos S.A.');
insert into customer(id, name) values('quesada', 'Juan de Quesada S.A.');
insert into customer(id, name) values('melimpillo', 'Melimpillo S.A.');
insert into customer(id, name) values('pesanro', 'PESANRO S.A.');
insert into customer(id, name) values('panlopez', 'Panadería López S.A.');

create table categoria(
	id varchar(20) not null,
	name varchar (30),
	primary key (id)
) engine InnoDB, default character set utf8;

insert into categoria(id) values('carta');
insert into categoria(id) values('factcopra');
insert into categoria(id) values('factventa');
insert into categoria(id) values('escritura');
insert into categoria(id) values('registro');
