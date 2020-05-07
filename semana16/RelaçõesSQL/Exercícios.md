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
Criação de Relações Movies e Rating
```
INSERT INTO Rating VALUES ('001', 'Comentário do Filme Se Eu Fosse Você', '001');
INSERT INTO Rating VALUES ('002', 'Comentário do Filme O Auto da Compadecida', '004');
INSERT INTO Rating VALUES ('003', 'Comentário do Filme Doce de Mãe', '002');
```
c) **Tentativa**
```
INSERT INTO Rating VALUES ('004', 'Comentário do Filme Inexistente', '003');
```
**Erro:** *Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (\`sagan_danilo_db\`.\`Rating\`, CONSTRAINT \`Rating_ibfk_1\` FOREIGN KEY (\`movie_id\`) REFERENCES \`Movies\` (\`id\`))* - Não é possivel criar a linha pois a relação não encontrou o id na tabela Movies.
d) **Comando**
```
ALTER TABLE Movies DROP COLUMN rating;
```
e) **Comando**
```
DELETE FROM Movies WHERE id='001';
``` 
**Erro**
```
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`sagan_danilo_db`.`Rating`, CONSTRAINT `Rating_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`id`))
``` 
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

### Exercício 3
a) **Comando**
```
SELECT * FROM Movies 
INNER JOIN Rating ON Movies.id = Rating.movie_id;
```
Seleciona tudo da tabela *Movies* juntamente com a tabela *Rating*, juntando dados onde o valor da coluna ID de Movies se encontra no movie_id de Rating.
Operador ```ON``` é o que vai fazer a comparação da *FOREIGN KEY*.
b) **Comando**
```
SELECT m.name as Nome, m.id as ID, r.rate as Rate FROM Movies m 
INNER JOIN Rating r ON m.id = r.movie_id;
```

### Exercício 4
a) **Comando**
```
SELECT m.name as Nome, m.id as ID, r.rate as Rate, r.comment as Comentário FROM Movies m 
LEFT JOIN Rating r ON m.id = r.movie_id;
```
b) **Comando**
```
SELECT m.id as ID, m.name as Título, mc.actor_id as Ator_ID FROM Movies m
RIGHT JOIN MovieCast mc ON m.id = mc.movie_id;
```
c) **Comando**
```
SELECT AVG(r.rate), m.name FROM Movies m 
LEFT JOIN Rating r ON m.id = r.movie_id GROUP BY m.id;
```

