# node_challenge
This is a challenge made with NodeJs

## Front-End Part
Para correr el front-end necesitaras yarn en tu maquina luego sigue los siguientes comandos:

```
cd front-end
yarn install
yarn serve
```

Te recomendamos hacer esto en una tab aparte, ya que necesitaras otra para el back-end.

Ademas necesitaras el archivo `.env.development` para poder correrlo correctamente.

## Back-End Part
Correremos comandos parecidos:

```
cd back-end
npm install
npm run dev
```

Ademas necesitaras el archivo `.json` con las keys para conectarte por auth a la base de datos.

## Test back and front
Para poder testear el front visitaremos la url que aparece en la consola al correr `yarn serve`, generalmente este url sera:

```
http://localhost:8080
```

Para el backend al correrlo lo tendremos habilitado en el puerto 3000, esta configuracion se puede cambiar en el codigo o usando un .env file con la palabra `PORT` seguido del valor.

Si usted quiere testear las rutas tendria las siguientes:

### Rutas con GET method
`${url}/getAllEmployees`

response
```
{
    "status":200,
    "data":{
        "1234":{
            "department":"IT",
            "email":"enrique@gmail.com",
            "name":"Moises Moran",
            "rol":"Admin",
            "voteDepartment":["IT","Sales"],
            "votes":2
        },.......
    }
}
```

`${url}/getNumberEmployee`

response
```
{
    "status":200,
    "value":4
}
```

`${url}/getMostVotedByDepartment`

response
```
{
    "status":200,
    "data":{
        "IT":[{"name":"Moises Moran","votes":2}],
        ........
    }
}
```

`${url}/getMostVotedByDepartment`

response
```
La misma respuesta que la ruta getAllEmployees.
```

Estas dos rutas son usadas por la UI para ingresar usuario nuevos y actualizar los campos de la base:

`/insertUser`

body: 
```
{
    data :{
        department: ...
        email: ... 
        name: ...
        pass: ...
        rol: ...
        voteDepartment: ...
        votes: ...
    }
}
```

`/updateField` esta opcion tambien puede ser usada para ingresar nuevo datos

body:
```
{
	"data" : { 
	    "1234":{
		    "department":"IT",
		    "name":"Moises Moran",
		    "voteDepartment":["IT","Sales"],
		    "votes":2
	    },...
	}
}
```
