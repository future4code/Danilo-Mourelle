### Exercício 1
a) Iria apagar toda a coluna *salary* da tabela **Actor.**
b) Renomeia a coluna *gender* por *sex.*
c) Renomeia a coluna *gender* para *gender* e muda sua constrain para *VARCHAR(255)* - Poderia trocar o comando ```CHANGE``` por ```MODIFY``` e com isso não precisaria colocar duas vezes o nome da coluna.
d) *alter table Actor modify gender varchar(100);*

### Execício 2
a) *update Actor set name = 'Nandinha Montescuro', birth_date = '1930-10-19' where id='003';*
b) *update Actor set name = 'JULIANA PÃES' where id='005';* / *update Actor set name = 'Juliana Paes' where name='JULIANA PÃES';*
c) *update Actor set name = 'Pedro Cardoso', salary="350000", birth_date = "1962-12-31", gender = 'male' where id='005';* 
d) *update Actor set name = 'Pedro Cardoso', salary="350000", birth_date = "1962-12-31", gender = 'male' where id='008';*
```
0 row(s) affected Rows matched: 0  Changed: 0  Warnings: 0
```
Aceitou o comando, mas sem afetar nenhuma linha.

### Exercício 3
a) *delete from Actor where name ="Fenanda Montenegro";*
b) *delete from Actor where gender='male' and salary > 1000000;*

### Exercício 4
a) *select max(salary) from Actor;*
b) *select min(salary) from Actor where gender='female'*;
c) *select count(\*) from Actor where gender='female';*
d) *select sum(salary) from Actor;*

### Exercício 5
a) Ela agrupou a tabela pelos valores da coluna ```gender``` que nesse caso são *female* e *male* e contou os grupos separadamente.
b) *select id, name from Actor order by name desc;*
c) *select * from Actor order by salary;*
d) *select * from Actor order by salary desc limit 3;*
e) *select avg(salary), gender from Actor group by gender;*

### Exercício 6
a) *alter table Filmes add playing_limit_date date;*
b) *alter table Filmes add playing_limit_date date;*
c) *update Filmes set playing_limit_date = '2020-07-28' where id='001';* | *update Filmes set playing_limit_date = '2019-07-28' where id='002';*
d) *delete from Filmes where id='003';* | *update Filmes set sinopse='exercicio 6 - d' where id='003';* - Novamente aceitou o comando mas afetou 0 linhas.

### Exercício 7
a) *select count(\*) from Filmes where avaliacao > 7.5 and playing_limit_date > current_date();*
b) *select avg(avaliacao) from Filmes;*
c) *select count(\*) from Filmes where playing_limit_date > current_date();*
d) *select count(\*) from Filmes where data_lancamento > current_date();*
e) *select max(avaliacao) from Filmes;*
f) *select min(avaliacao) from Filmes;*

### Exercício 8 
a) *select * from Filmes order by nome;*
b) *select * from Filmes order by nome desc limit 5;*
c) *select * from Filmes where playing_limit_date > current_date() and data_lancamento < current_date() order by data_lancamento limit 3;*
d) *select * from Filmes order by avaliacao limit 3;*
