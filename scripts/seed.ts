// import { db } from 'api/src/lib/db'

export default async () => {
  try {
    // // Create categories first with Spanish names and images
    // const categories = []

    // await db.category.createMany({ data: categories })

    // // Fetch created categories to associate with plants
    // const createdCategories = await db.category.findMany()

    // // Create plants with Spanish names
    // const plants = []

    // // Use the correct enum type for presentationType
    // await db.plant.createMany({
    //   data: plants.map((plant) => ({
    //     ...plant,
    //     presentationType: plant.presentationType as 'BAG' | 'POT' | 'HANGING',
    //   })),
    // })

    // // Fetch created plants to associate with photos
    // const createdPlants = await db.plant.findMany()

    // // Create photos for each plant
    // const photos = createdPlants.map((plant) => ({
    //   url: `https://example.com/photos/${plant.id}.jpg`,
    //   plantId: plant.id,
    // }))

    // await db.photo.createMany({ data: photos })

    console.info('\n  Base de datos sembrada exitosamente!\n')
  } catch (error) {
    console.error('Error sembrando la base de datos:', error)
  }
}
