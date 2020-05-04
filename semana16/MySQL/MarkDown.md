### Exercício 1
a) A resposta da pergunta é: sim, porque sim.
b) A query é:
```
SELECT * FROM Table;
```


### Exercício 2
a) A resposta é: Blablabla, porque:
1. Bleus
2. Blius
3. Blos

b) Isso está errado, pelos motivos:
* Óbvio
* Sem dúvida

### Exercício 1
a) Demais comandos:
1. **id:** É a primary key, ou seja, a coluna que deve ser diferente entre todas as linhas. Seu conteúdo é uma string de até 255 caracteres.
2. **name:** É o campo que guardará o nome do ator com até 255 caracteres. Este campo não aceitar *NULL* como entrada.
3. **birth_date:** É a coluna que conterá as informações de data de nascimento, por isso tipo date, e nome em snake_case para garantir palavra única. Este campo não aceitar *NULL* como entrada.
4. **gender:** É o campo onde conterá o gênero do ator. É um campo string e aceita apenas 6 caracteres. Este campo não aceitar *NULL* como entrada.

b) **SHOW DATABASE** trouxe uma lista de banco de dados (nesse caso apenas um mesmo).
**SHOW TABLES** trouxe as duas tabelas existentes (Actor e PROFESSORES_LABENU).

C) O comando **SHOW Actor** estava dando um erro genérico de sintaxe, mas o comando **DESCRIBE Actor** retornou os campos da tabela coom os tipos de cada um e identificando a PRIMARY KEY.

### Exercício 2
*Nota: O exercício já começa com erro na inclusão do Tony Ramos por faltar a indicação de que será incluído um valor para gender*

a) 
```
INSERT INTO Actor (id, name, salary, birth_date,gender)
    VALUES(
        "002", 
        "Glória Pires",
        1200000,
        "1963-08-23", 
        "female"
    );
```
b)
```
INSERT INTO Actor (id, name, salary, birth_date,gender)
VALUES(
  "002", 
  "Isis Valverde",
  200000,
  "1987-02-17", 
  "female"
);
```
Foi obtido o erro ``` Erro 1062: Entrada duplicada '002' para chave 'PRIMARY'```

c)```Erro 1136: contagem de colunas não combina com linha 1``` Erro acontece devido ao fato que o comando diz que ira inserir apenas tres campos, mas são passados 5 valores ao todo.

d)```Erro1364: Campo 'name' não tem um valor padrão``` Erro acontece porque o comando indica que não irá inserir o valor para name, mas o fato do campo ser **NOT NULL** impede que não seja passado nada.

e)```Erro 1292: Valor de data incorreto. '1950' para a coluna 'birth_date" na linha 1``` Erro acontece porque os valores precisam estar entre aspas.

### Exercício 3
a) *SELECT * FROM Actor WHERE gender = "female";*

b) *SELECT salary FROM Actor WHERE name = "Tony Ramos";*

c) *SELECT * FROM Actor WHERE gender IS NULL;* Retornou uma linha com todos os campos em **NULL**, não sei bem o porque.

d) *SELECT id, name, salary FROM Actor WHERE salary<50000;*

e) ```Erro 1054: Coluna desconhecida 'nome' na lista de campos.```
**CORREÇÃO:** *SELECT id, name from Actor WHERE id = "002";*

### Exercício 4
a) Trás todas as infos dos atores que tenham nome começando com J **OU** A, **E** com salários acima de 300.000. No caso retornando Antônio Fagundes e Juliana Paes.

b) *SELECT * FROM Actor WHERE name NOT LIKE "A%" AND salary > 350000;*

c) *SELECT * FROM Actor WHERE name LIKE "%G%" OR name LIKE "%g%";*

d) *SELECT * FROM Actor WHERE (name LIKE "%A%" OR name LIKE "%a%" OR name LIKE "%g%" OR name LIKE "%G%") AND salary BETWEEN 350000 AND 900000;*

e)

### Exercício 5
a) 
```
CREATE TABLE Filmes (
    id VARCHAR(255) PRIMARY KEY,
    nome VARCHAR (255) NOT NULL,
    sinopse TEXT NOT NULL,
    data_lancamento DATE NOT NULL,
	avaliacao TINYINT NOT NULL
);
```

### Exercício 6
a) *SELECT id, nome, avaliacao FROM Filmes WHERE id = '004';*

b) *SELECT * FROM Filmes WHERE nome = 'Dona Flor e Seus Dois Maridos';*

c) *SELECT id, nome, sinopse FROM Filmes WHERE avaliacao >= 7;*

### Exercício 7
a) *SELECT * FROM Filmes WHERE nome LIKE "%vida%";*

b) *SELECT * FROM Filmes WHERE nome OR sinopse LIKE "%Chicó%";*

c) *SELECT * FROM Filmes WHERE data_lancamento < '2020-05-04';*

d) *SELECT * FROM Filmes WHERE data_lancamento < '2020-05-04' AND nome OR sinopse LIKE "%Chicó%" AND avaliacao > 7;*
