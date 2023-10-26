## Artillery

```bash
artillery quick --count 40 --num 50 "http://localhost:9090/api/performance/operation/simple" -o resultadosSencilla.json
```

## Ejecucion de script .yml

```bash
artillery run config.yml --output test01.js
```

## Generacion de reporte .html

```bash
artillery report testUsers.json -o resultUser.html
```
