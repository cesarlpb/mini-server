# CRUD 

## Leer datos: SELECT 

`SELECT * FROM posts;` 
```javascript
  Post.findAll().then(res => {
    console.log(res) // console.log de todos los objetos Post de Sequelize
    // Filtrando por campos (solo las columnas solicitadas):
    // res.map(post => console.log(post.dataValues))
}).catch((error) => {
    console.error('No se encontraron los datos: ', error);
});
```

`SELECT title FROM posts;` 
```javascript
  Post.findAll({attributes: ['title']}).then(res => {
    console.log(res) // console.log de todos los objetos Post de Sequelize
    // Filtrando por campos (solo las columnas solicitadas):
    // res.map(post => console.log(post.dataValues))
}).catch((error) => {
    console.error('No se encontraron los datos: ', error);
});
```

Encontrar un registro por id:
```javascript
  Post.findOne({
    where: {
        id : "1"
    }
  }).then(res => {
      console.log(res?.dataValues)
  }).catch((error) => {
      console.error('No se encontró el registro: ', error);
  });
```

**Observación:** Si el id no existe no arroja error, el response saldría `undefined`.

## Crear 1 Post
```javascript
const nuevoPost = {
  title: "Viajes a mitad de precio", 
  subtitle: "Aprende como ahorrar dinero este verano", 
  img: "playa.jpg", 
  sectionId: 1}
// Dentro de sequelize.sync().then(() => {
// ...
  Post.create(nuevoPost)
// ...}
```
## Crear varios

Se pasa un array a bulkCreate.

```javascript
// Dentro de sequelize.sync()...
  Post.bulkCreate(posts)
// ...
```

## Editar un Post o varios

Se puede editar uno o varios cambiando la condición del `where`.

```javascript
  Post.update({ title: "Viaje a Roma editado"}, {
    where: {
      id: 1
    }
  })
```

## Borrar Post

Borrado por id:

```javascript
Post.destroy({
    where: {
      id: 1
    }
  })
```

Borrado en masa:

Truncando la tabla -> `truncate: true`
Y los de id mayor o igual a 1.

```javascript
  Post.destroy(
    { 
      truncate: true,
      where: {
        id: { [Op.gte]: 1 }
      }
    }
  )
```