// web/src/pages/AdminSaleNotePDFPage/AdminSaleNotePDFPage.tsx
import { LoadingOverlay } from '@mantine/core'
import { PDFViewer } from '@react-pdf/renderer'

import { useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import SaleNotePDF from 'src/components/SaleNote/SaleNotePDF/SaleNotePDF'
import { useGetSaleNoteById } from 'src/hooks/SaleNotes/useGetSaleNoteById'

const AdminSaleNotePdfPage: React.FC = () => {
  const { id } = useParams()
  const {
    saleNote,
    loading: loadingSaleNote,
    error: errorSaleNote,
  } = useGetSaleNoteById({ id })

  if (loadingSaleNote) {
    return <LoadingOverlay visible />
  }

  if (errorSaleNote) {
    return <div>Error al cargar la nota de venta: {errorSaleNote.message}</div>
  }

  if (!saleNote) {
    return <div>No se encontró la nota de venta</div>
  }

  return (
    <>
      <Metadata title="AdminSaleNotePdf" description="AdminSaleNotePdf page" />

      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <PDFViewer
          width="100%"
          height="100%"
          showToolbar
          style={{ border: '0px' }}
        >
          <SaleNotePDF saleNote={saleNote} />
        </PDFViewer>
      </div>
    </>
  )
}

export default AdminSaleNotePdfPage
