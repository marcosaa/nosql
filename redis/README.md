## REDISGO
O Redinsgo é basicamente um bingo com estruturas em um banco chave/valor.
Você deve instalar o Redis em sua máquina ou usar um as a service. 

As informações de cada participante são armazenadas em HASH.

> user:01 -> name: “user01”, bcartela: “cartela:01”, bscore: “score:01”
> user:02 -> name: “user02”, bcartela: “cartela:02”, bscore: “score:02”

As cartelas são armazenadas em HASH nesse caso, com sets de 15 números aleatórios de 1 a 99

> cartela:01 -> [10, 23, ..., 58]
> cartela:02 -> [3, 16, ..., 65]

A cartela é pontuada pelo set score. O primeiro jogador que somar 15 pontos, é o vencedor

### Tecnologias envolvidas

 * NodeJs 
 * Redis
 * loadash
 
### Evidências

https://github.com/marcosaa/nosql/blob/master/redis/evidenciaBingo.png
