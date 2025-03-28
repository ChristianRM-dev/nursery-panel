import { db } from 'api/src/lib/db'

export default async () => {
  try {
    // Create categories first with Spanish names and images
    const categories = [
      {
        name: 'Plantas de Interior',
        description: 'Plantas que prosperan en interiores',
        image: 'https://example.com/images/interior.jpg',
      },
      {
        name: 'Plantas de Exterior',
        description: 'Plantas que prosperan en exteriores',
        image: 'https://example.com/images/exterior.jpg',
      },
      {
        name: 'Suculentas',
        description: 'Plantas resistentes a la sequía',
        image: 'https://example.com/images/suculentas.jpg',
      },
      {
        name: 'Plantas con Flores',
        description: 'Plantas que producen flores',
        image: 'https://example.com/images/flores.jpg',
      },
    ]

    await db.category.createMany({ data: categories })

    // Fetch created categories to associate with plants
    const createdCategories = await db.category.findMany()

    // Create plants with Spanish names
    const plants = [
      {
        name: 'Monstera Deliciosa',
        price: '29.99',
        stock: 10,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Ficus Lyrata',
        price: '49.99',
        stock: 5,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Lengua de Suegra',
        price: '19.99',
        stock: 20,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Poto',
        price: '14.99',
        stock: 15,
        categoryId: createdCategories[0].id,
        presentationType: 'HANGING',
      },
      {
        name: 'Planta ZZ',
        price: '24.99',
        stock: 8,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Árbol del Caucho',
        price: '34.99',
        stock: 12,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Espatifilo',
        price: '22.99',
        stock: 7,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Sábila',
        price: '12.99',
        stock: 25,
        categoryId: createdCategories[2].id,
        presentationType: 'POT',
      },
      {
        name: 'Planta de Jade',
        price: '18.99',
        stock: 10,
        categoryId: createdCategories[2].id,
        presentationType: 'POT',
      },
      {
        name: 'Echeveria',
        price: '9.99',
        stock: 30,
        categoryId: createdCategories[2].id,
        presentationType: 'POT',
      },
      {
        name: 'Rosal',
        price: '39.99',
        stock: 6,
        categoryId: createdCategories[3].id,
        presentationType: 'POT',
      },
      {
        name: 'Lavanda',
        price: '16.99',
        stock: 18,
        categoryId: createdCategories[3].id,
        presentationType: 'POT',
      },
      {
        name: 'Hortensia',
        price: '29.99',
        stock: 9,
        categoryId: createdCategories[3].id,
        presentationType: 'POT',
      },
      {
        name: 'Tulipán',
        price: '14.99',
        stock: 22,
        categoryId: createdCategories[3].id,
        presentationType: 'BAG',
      },
      {
        name: 'Girasol',
        price: '19.99',
        stock: 14,
        categoryId: createdCategories[3].id,
        presentationType: 'BAG',
      },
      {
        name: 'Orquídea',
        price: '49.99',
        stock: 4,
        categoryId: createdCategories[3].id,
        presentationType: 'POT',
      },
      {
        name: 'Cactus',
        price: '11.99',
        stock: 20,
        categoryId: createdCategories[2].id,
        presentationType: 'POT',
      },
      {
        name: 'Helecho',
        price: '17.99',
        stock: 12,
        categoryId: createdCategories[0].id,
        presentationType: 'HANGING',
      },
      {
        name: 'Bambú',
        price: '24.99',
        stock: 8,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
      {
        name: 'Dracaena',
        price: '27.99',
        stock: 10,
        categoryId: createdCategories[0].id,
        presentationType: 'POT',
      },
    ]

    // Use the correct enum type for presentationType
    await db.plant.createMany({
      data: plants.map((plant) => ({
        ...plant,
        presentationType: plant.presentationType as 'BAG' | 'POT' | 'HANGING',
      })),
    })

    // Fetch created plants to associate with photos
    const createdPlants = await db.plant.findMany()

    // Create photos for each plant
    const photos = createdPlants.map((plant) => ({
      url: `https://example.com/photos/${plant.id}.jpg`,
      plantId: plant.id,
    }))

    await db.photo.createMany({ data: photos })

    console.info('\n  Base de datos sembrada exitosamente!\n')
  } catch (error) {
    console.error('Error sembrando la base de datos:', error)
  }
}
