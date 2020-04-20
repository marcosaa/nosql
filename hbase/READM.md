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

**7. Crie um contador de idade 55 para o italiano de row id 5.**
> incr 'italians', '5', 'personal-data:age' , 55

**8. Incremente a idade do italiano em 1.**
> incr 'italians', '5', 'personal-data:age' , 1
