import { PresentationType } from 'types/graphql'

export const formatPlantPresentationType = (type: PresentationType): string => {
  switch (type) {
    case 'BAG':
      return 'BOLSA'
    case 'HANGING':
      return 'COLGANTE'
    case 'POT':
      return 'MACETA'

    default:
      return 'Presentacion no valida'
  }
}
