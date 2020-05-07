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
Operador ```ON``` é o que vai fazer a comparação da ```FOREIGN KEY```.
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

### Exercício 5
a) É uma estrutura de pipeline, onde o primeiro ```JOIN``` relaciona a primeira tabela independente com a tabela de junção, gerando uma tabela resultante e o segundo ```JOIN``` relaciona essa tabela resultande com a outra tabela independente.
b) **Comando**
```
SELECT m.id as Movie_ID, m.name as Título, a.id as Actor_ID, a.name as Ator FROM Movies m
LEFT JOIN MovieCast mc ON m.id = mc.movie_id
JOIN Actor a ON a.id = mc.actor_id;
```
c)**Comando**
```
SELECT m.id as movie_id, m,title, a.id as actor_id, a.name FROM Movies m
LEFT JOIN MovieCast mc ON m.id = mc.movie_id
JOIN Actor a ON a.id = mc.actor_id;
```
**Erro**
```
Error Code: 1054. Unknown column 'm' in 'field list'
```
Não sei se era esse o erro que deveria reportar, mas é o ```m,title``` que falhou por tem uma ```,``` no lugar de ```.```
d)**Comando**
```
SELECT m.id as Movie_ID, m.name as Título, a.id as Actor_ID, a.name as Ator, r.rate as Nota, r.comment as Cometário 
FROM Movies m
LEFT JOIN MovieCast mc ON m.id = mc.movie_id
JOIN Actor a ON a.id = mc.actor_id
JOIN Rating r ON m.id = r.movie_id
```

### Exercício 6
a) O tipo da relação é N:N, uma vez que um filme pode ganhar mais de 1 oscar, e esse oscar pode ser ganho por mais de um filme (desde que em anos distintos)
b) **Comando**
```
CREATE TABLE Oscars (
  id VARCHAR(255) PRIMARY KEY,
  oscar_name VARCHAR(255) NOT NULL,
)
```
Para criar a tabelas com os tipos de oscar e um id para servir de chave primária, embora o próprio nome servisse uma vez que não há prêmios de mesmo nome.
c) **Comando**
```
INSERT INTO OscarsWinners VALUES ('001', '002', 2020);
INSERT INTO OscarsWinners VALUES ('001', '003', 2020);
INSERT INTO OscarsWinners VALUES ('002', '001', 2012);
INSERT INTO OscarsWinners VALUES ('002', '005', 2012);
INSERT INTO OscarsWinners VALUES ('003', '004', 2003);
INSERT INTO OscarsWinners VALUES ('003', '003', 2003);
INSERT INTO OscarsWinners VALUES ('004', '001', 2000);
INSERT INTO OscarsWinners VALUES ('004', '004', 2000);
INSERT INTO OscarsWinners VALUES ('005', '003', 2003);
INSERT INTO OscarsWinners VALUES ('005', '005', 2003);
```
d) **Comando**
```
SELECT m.name as Filme, o.oscar_name as Oscar, ow.year as Ano 
FROM Movies m
LEFT JOIN OscarsWinners ow ON m.id = ow.movie_id
JOIN Oscars o ON ow.oscar_id = o.id;
```