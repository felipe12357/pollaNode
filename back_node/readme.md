## Librerias
  express: servidor rest
  express-validator: validacion de parametros en las rutas
  prisma: gestor de BD


### recapitulacion
  El comando: docker compose up -d ejecuta la configuracion del archivo compose,
  por lo tanto genera la base de datos y conexion segun las especificaciones del archivo .env

  el comando: npx prisma migrate dev --name init
  genera la carperta src/generated/prisma

  #### prisma
  para ejecutar cambios en la bd se corren migraciones, para ello se cambia el archivo: schema.prisma
  y leugo el comando: npx prisma migrate dev --name match_user, donde "match_user" es el nombre de la migracion

  documentacion manejo de datos: https://www.prisma.io/docs/orm/prisma-schema/data-model/models

  Generar esquema relacion:
    npx prisma studio => Esto abre http://localhost:5555 con una UI para explorar tus datos y relaciones.
    npm install -D prisma-erd-generator @mermaid-js/mermaid-cli

   Abre tu schema.prisma y agrega un generador:
    generator erd {
      provider = "prisma-erd-generator"
    }
  
  npx prisma generate


  ### Ejemplo leftJoin

  const result = await prisma.match.findMany({
      include: {
        foreCast: {
          where: { userId }
        },
      },
    });

  ### ejemplo innerJoin

  const result = await prisma.match.findMany({
      where: {
        foreCast: { some: { userId } } 
      },
      include: {
        foreCast: {
          where: { userId } 
        }
      }
    });

  ### Join (todos los datos)
    const result = await prisma.match.findMany({
      include: {
        foreCast: true
      },
    });