### Exercício 1
a) Uma chave estrangeira é um valor que existe em uma outra tabela e será usada para relacionar essas duas tabelas entre si
b) Criação da tabela
```
CREATE TABLE Rating (
	id VARCHAR(255) PRIMARY KEY,
    comment TEXT NOT NULL,
    movie_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);
```
```INSERT INTO Rating VALUES ('001', 'Comentário do Filme Se Eu Fosse Você', '001');```
```INSERT INTO Rating VALUES ('002', 'Comentário do Filme O Auto da Compadecida', '004');```
```INSERT INTO Rating VALUES ('003', 'Comentário do Filme Doce de Mãe', '002');```
c) Tentativa ```INSERT INTO Rating VALUES ('004', 'Comentário do Filme Inexistente', '003');```
**Erro:** *Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`sagan_danilo_db`.`Rating`, CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`id`))* - Não é possivel criar a linha pois a relação não encontrou o id na tabela Movies.
d) ```ALTER TABLE Movies DROP COLUMN rating;```
e) **Comando**
```DELETE FROM Movies WHERE id='001';``` 
**Erro**
```Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`sagan_danilo_db`.`Rating`, CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`id`))``` 
Não pode apagar uma linha parental relacionada a outra tabela.

### Exercício 2
a) É a tabela que fará um 'link' entre as outras duas tabelas (Movies e Actor)
b) **Comandos**
```
INSERT INTO MovieCast VALUES ('001', '001');
INSERT INTO MovieCast VALUES ('001', '002');
INSERT INTO MovieCast VALUES ('002', '003');
INSERT INTO MovieCast VALUES ('002', '009');
INSERT INTO MovieCast VALUES ('002', '008');
INSERT INTO MovieCast VALUES ('004', '007');
INSERT INTO MovieCast VALUES ('004', '008');
```
c) **Comando**
```
INSERT INTO MovieCast VALUES ('003', '008');
```
**Erro**
```
Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`sagan_danilo_db`.`MovieCast`, CONSTRAINT `MovieCast_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`id`))
```
Erro por não conseguir relacionar o movie_id uma vez que o valor passado não existe na tabela Movies.
c) **Comando**
```
INSERT INTO MovieCast VALUES ('002', '010');
```
**Erro**
```
Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`sagan_danilo_db`.`MovieCast`, CONSTRAINT `MovieCast_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `Actor` (`id`))
```
Erro por não conseguir relacionar o actor_id uma vez que o valor passado não existe na tabela Actor.
d) **Comando**
```
DELETE FROM Actor WHERE id='009'
```
**Erro**
```
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`sagan_danilo_db`.`MovieCast`, CONSTRAINT `MovieCast_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `Actor` (`id`))
```
Erro por não poder remover uma linha com relação parental com outra tabela.