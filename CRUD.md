# CRUD 

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