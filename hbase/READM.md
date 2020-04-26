## EXERCICIO 1

**1. Crie a tabela com 2 famílias de colunas:**

a. personal-data

b. professional-data

> create 'italians', 'personal-data', 'professional-data'

**2. Importe o arquivo via linha de comando**

> docker cp C:\**\italians.txt hbase-furb:/tmp

> docker exec -it hbase-furb /bin/bash

> ls -l /tmp

> cat /tmp/italians.txt

> hbase shell /tmp/italians.txt

Agora execute as seguintes operações:
<ol>
<li> Adicione mais 2 italianos mantendo adicionando informações como data de nascimento nas informações pessoais e um atributo de anos de experiência nas informações profissionais;

> put 'italians', '11', 'personal-data:name',  'Marcos'

> put 'italians', '11', 'personal-data:city',  'Indaial'

> put 'italians', '11', 'personal-data:born',  '1981'

> put 'italians', '11', 'professional-data:role',  'Student'

> put 'italians', '11', 'professional-data:salary',  '0'

> put 'italians', '11', 'professional-data:experience',  '1'

> put 'italians', '12', 'personal-data:name',  'Marcio'

> put 'italians', '12', 'personal-data:city',  'Blumenau'

> put 'italians', '12', 'personal-data:born',  '1980'

> put 'italians', '12', 'professional-data:role',  'Teacher'

> put 'italians', '12', 'professional-data:salary',  '17000'

> put 'italians', '12', 'professional-data:experience',  '12'

</li>

<li> Adicione o controle de 5 versões na tabela de dados pessoais.

> alter 'italians', NAME => 'personal-data', VERSIONS => 5
</li>

</ol>

**3. Faça 5 alterações em um dos italianos.**
> put 'italians', '5', 'personal-data:name',  'Rosalia'

> put 'italians', '5', 'personal-data:city',  'Florence'

> put 'italians', '5', 'professional-data:role',  'Biotecnologia'

> put 'italians', '5', 'professional-data:salary',  '10000'

> put 'italians', '5', 'professional-data:role',  'Developer'

**4. Com o operador get, verifique como o HBase armazenou o histórico.**
> get 'italians', '5'
```nodejs
personal-data:city              timestamp=1587241570883, value=Florence
personal-data:name              timestamp=1587241466781, value=Rosalia
professional-data:role          timestamp=1587241600589, value=Developer
professional-data:salary        timestamp=1587241589051, value=10000
```

**5. Utilize o scan para mostrar apenas o nome e profissão dos italianos.**
> scan 'italians', {COLUMNS => ['personal-data:name','professional-data:role']}
 
**6. Apague os italianos com row id ímpar.**
> deleteall 'italians','1'
> deleteall 'italians','11'
> deleteall 'italians','3'
> deleteall 'italians','5'
> deleteall 'italians','7'
> deleteall 'italians','9'

**7. Crie um contador de idade 55 para o italiano de row id 5.**
> incr 'italians', '5', 'personal-data:age' , 55

**8. Incremente a idade do italiano em 1.**
> incr 'italians', '5', 'personal-data:age' , 1

## EXERCICIO 2
Com base no script de italianos utilizado no exercício de MongoDB, altere ele para uma versão do HBase. Você pode transformar ele para Ruby ou gerar os comandos para HBase a partir do JavaScript mesmo.

Modifique para inserir os dados com a seguinte estrutura:

**Família de coluna: personal-data**
 <p>firstname</p>
 <p>surname</p>
 <p>age</p>
 <p>bloodType</p>
 <p>city</p>
 <p>father</p>
 <p>mother</p>
 
 **Familia de colunas: app-data**
 <p>id_num</p>
 <p>email</p>
 <p>registerDate</p>
 <p>ticketNumber</p>
 <p>username</p>

 **Familia de Colunas: professional-data**
 <p>jobs</p>
 <p>salary</p>

 **Familia de Colunas: miscelaneous**
 <p>favFruits</p>
 <p>movies</p>
 <p>cat</p>
 <p>dog</p>
 
 
 Utilizando o MapReduce, faça um relatório ou mais de um indicando as seguintes informações:
 
 
**1. Quantidade de gatos e cachorros na amostra**

**2. Média de gatos e cachorros na população**

**3. Quantidade de pais e mães**

**4. Média de pais e mães**

**5. Média de frutas e filmes por italiano**

**6. Salário médio dos italianos**
