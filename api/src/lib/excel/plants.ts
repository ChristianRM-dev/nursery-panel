import { Workbook } from 'exceljs'

type PresentationType = 'BAG' | 'HANGING' | 'POT'

const formatPlantPresentationType = (type: PresentationType): string => {
  switch (type) {
    case 'BAG':
      return 'BOLSA'
    case 'HANGING':
      return 'COLGANTE'
    case 'POT':
      return 'MACETA'
    default:
      return 'Presentación no válida'
  }
}

export const generatePlantsExcel = async (plants) => {
  const workbook = new Workbook()
  const worksheet = workbook.addWorksheet('Plantas')

  // Definir columnas
  worksheet.columns = [
    { header: 'Nombre', key: 'name' },
    { header: 'Tipo', key: 'presentationType' },
    { header: 'Total', key: 'stock' },
  ]

  // Aplicar estilo a los headers (primera fila)
  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD0F0C0' }, // Verde claro
    }
    cell.font = {
      bold: true,
      color: { argb: 'FF000000' }, // Letras negras
    }
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    }
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFDDDDDD' } },
      left: { style: 'thin', color: { argb: 'FFDDDDDD' } },
      bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
      right: { style: 'thin', color: { argb: 'FFDDDDDD' } },
    }
  })

  // Agregar datos (formateando `presentationType`)
  plants.forEach((plant) => {
    worksheet.addRow({
      ...plant,
      presentationType: formatPlantPresentationType(plant.presentationType),
    })
  })

  // Generar y retornar buffer base64
  const buffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(buffer).toString('base64')
}
