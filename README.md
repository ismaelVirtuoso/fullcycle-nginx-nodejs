# fullcycle-nginx-nodejs

```
CONTAINER ID   IMAGE                                   COMMAND                  CREATED         STATUS         PORTS                               NAMES
762c4099af1a   nginx:latest                            "/docker-entrypoint.…"   6 minutes ago   Up 6 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp   nginx
4da065df948f   ismaelvirtuoso/fullcycle-nginx-nodejs   "dockerize -wait tcp…"   6 minutes ago   Up 6 minutes   3000/tcp                            app2
fe671eb4410d   ismaelvirtuoso/fullcycle-nginx-nodejs   "dockerize -wait tcp…"   6 minutes ago   Up 6 minutes   3000/tcp                            app1
5450b8294544   mysql:5.7                               "docker-entrypoint.s…"   6 minutes ago   Up 5 minutes   3306/tcp, 33060/tcp                 db
```

## OBS
Para praticar algo a mais com o nginx, no .conf inseri um upstream loadbalancer onde o app node possui dois containers, para fazer o teste do funcionamento faça um `docker stop app1` e veja que a aplicação não deixa de funcionar por ser redirecionada para o app2.
