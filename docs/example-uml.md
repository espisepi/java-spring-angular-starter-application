# UML de entidades del paquete example

Este diagrama representa las entidades JPA principales del módulo example y sus relaciones de dominio.

```mermaid
classDiagram
    class Item {
        +Long id
        +String name
        +LocalDateTime createdOn
        +setDetail(ItemDetail)
        +setCategory(ItemCategory)
        +addImage(ItemImage)
        +addTag(ItemTag)
        +addRelatedItem(Item)
    }

    class ItemDetail {
        +Long id
        +String description
    }

    class ItemImage {
        +Long id
        +String url
        +setItem(Item)
    }

    class ItemCategory {
        +Long id
        +String name
    }

    class ItemTag {
        +Long id
        +String name
    }

    Item "1" --> "1" ItemDetail : detail
    Item "many" --> "1" ItemCategory : category
    Item "1" --> "0..*" ItemImage : images
    Item "0..*" --> "0..*" ItemTag : tags
    Item "0..*" --> "0..*" Item : relatedItems

    ItemCategory "1" --> "0..*" Item : items
    ItemTag "0..*" --> "0..*" Item : items

    note for Item "Tabla: items\nRelación many-to-many con tags en item_tags\nRelación self-reference en related_items"
    note for ItemImage "Tabla: item_images\nFK: item_id"
    note for ItemDetail "Tabla: item_details\nFK: detail_id en Item"
    note for ItemCategory "Tabla: item_categories"
    note for ItemTag "Tabla: tags"
```

## Descripción de relaciones

- Item tiene un ItemDetail obligatorio: relación one-to-one.
- Item pertenece a una ItemCategory: relación many-to-one.
- Item puede tener muchas imágenes: relación one-to-many.
- Item puede tener muchos tags: relación many-to-many mediante la tabla item_tags.
- Item puede tener otros items relacionados: relación many-to-many self-reference mediante la tabla related_items.
- ItemCategory tiene varios items asociados.
- ItemTag puede estar asociado a varios items.
