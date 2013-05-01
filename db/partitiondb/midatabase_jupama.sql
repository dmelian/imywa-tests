create table documento(
	id integer not null auto_increment,
	name varchar(30) not null,
	categoria varchar(20),
	primary key(id),
	foreign key(categoria) references midatabase.categoria(id) on delete restrict on update restrict
) engine InnoDB, default character set utf8;
