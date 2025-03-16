import { db } from 'api/src/lib/db'

export default async () => {
  try {
    // Create categories first
    const categories = [
      { name: 'Indoor Plants', description: 'Plants that thrive indoors' },
      { name: 'Outdoor Plants', description: 'Plants that thrive outdoors' },
      { name: 'Succulents', description: 'Drought-resistant plants' },
      { name: 'Flowering Plants', description: 'Plants that produce flowers' },
    ]

    await db.category.createMany({ data: categories })

    // Fetch created categories to associate with plants
    const createdCategories = await db.category.findMany()

    // Create plants
    const plants = [
      { name: 'Monstera Deliciosa', price: '29.99', stock: 10, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Fiddle Leaf Fig', price: '49.99', stock: 5, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Snake Plant', price: '19.99', stock: 20, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Pothos', price: '14.99', stock: 15, categoryId: createdCategories[0].id, presentationType: 'HANGING' },
      { name: 'ZZ Plant', price: '24.99', stock: 8, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Rubber Plant', price: '34.99', stock: 12, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Peace Lily', price: '22.99', stock: 7, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Aloe Vera', price: '12.99', stock: 25, categoryId: createdCategories[2].id, presentationType: 'POT' },
      { name: 'Jade Plant', price: '18.99', stock: 10, categoryId: createdCategories[2].id, presentationType: 'POT' },
      { name: 'Echeveria', price: '9.99', stock: 30, categoryId: createdCategories[2].id, presentationType: 'POT' },
      { name: 'Rose Bush', price: '39.99', stock: 6, categoryId: createdCategories[3].id, presentationType: 'POT' },
      { name: 'Lavender', price: '16.99', stock: 18, categoryId: createdCategories[3].id, presentationType: 'POT' },
      { name: 'Hydrangea', price: '29.99', stock: 9, categoryId: createdCategories[3].id, presentationType: 'POT' },
      { name: 'Tulip', price: '14.99', stock: 22, categoryId: createdCategories[3].id, presentationType: 'BAG' },
      { name: 'Sunflower', price: '19.99', stock: 14, categoryId: createdCategories[3].id, presentationType: 'BAG' },
      { name: 'Orchid', price: '49.99', stock: 4, categoryId: createdCategories[3].id, presentationType: 'POT' },
      { name: 'Cactus', price: '11.99', stock: 20, categoryId: createdCategories[2].id, presentationType: 'POT' },
      { name: 'Fern', price: '17.99', stock: 12, categoryId: createdCategories[0].id, presentationType: 'HANGING' },
      { name: 'Bamboo', price: '24.99', stock: 8, categoryId: createdCategories[0].id, presentationType: 'POT' },
      { name: 'Dracaena', price: '27.99', stock: 10, categoryId: createdCategories[0].id, presentationType: 'POT' },
    ]

    // Use the correct enum type for presentationType
    await db.plant.createMany({
      data: plants.map(plant => ({
        ...plant,
        presentationType: plant.presentationType as 'BAG' | 'POT' | 'HANGING', // Cast to enum type
      })),
    })

    // Fetch created plants to associate with photos
    const createdPlants = await db.plant.findMany()

    // Create photos for each plant
    const photos = createdPlants.map(plant => ({
      url: `https://example.com/photos/${plant.id}.jpg`,
      plantId: plant.id,
    }))

    await db.photo.createMany({ data: photos })

    console.info('\n  Database seeded successfully!\n')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}