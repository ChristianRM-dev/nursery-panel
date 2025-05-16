// web/src/hooks/useDownloadPlantsExcel.ts
import { useLazyQuery, gql } from '@apollo/client'
import {
  DownloadPlantsExcel,
  DownloadPlantsExcelVariables,
} from 'types/graphql'

const DOWNLOAD_PLANTS_EXCEL = gql`
  query DownloadPlantsExcel {
    downloadPlantsExcel {
      content
    }
  }
`

export const useDownloadPlantsExcel = () => {
  const [downloadExcelQuery, { loading, error }] = useLazyQuery<
    DownloadPlantsExcel,
    DownloadPlantsExcelVariables
  >(DOWNLOAD_PLANTS_EXCEL, {
    onCompleted: (data) => {
      console.log('onCompleted', data)
      const base64 = data.downloadPlantsExcel.content

      // Convertir base64 a Blob
      const byteCharacters = atob(base64)
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i))
      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      // Crear enlace para descargar
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'catalogo-plantas.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  })

  const download = () => {
    downloadExcelQuery()
  }

  return {
    download,
    loading,
    error,
  }
}
