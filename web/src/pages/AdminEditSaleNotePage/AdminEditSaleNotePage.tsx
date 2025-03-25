// web/src/pages/AdminEditSaleNotePage/AdminEditSaleNotePage.tsx
import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { SaleNoteForm } from 'src/components/SaleNote/SaleNoteForm/SaleNoteForm'
import { SaleNoteFormValues } from 'src/components/SaleNote/SaleNoteForm/SaleNoteForm.schema'
import { useGetSaleNoteById } from 'src/hooks/SaleNotes/useGetSaleNoteById'
import { useUpdateSaleNote } from 'src/hooks/SaleNotes/useUpdateSaleNote'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapSaleNoteFormValuesToUpdateSaleNoteInput } from 'src/utils/Mappers/SaleNoteMappers'

const AdminEditSaleNotePage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    saleNote,
    loading: loadingSaleNote,
    error: errorSaleNote,
  } = useGetSaleNoteById({ id })

  const { updateSaleNote, loading: updatingSaleNote } = useUpdateSaleNote({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Nota de venta "${data.folio}" actualizada correctamente!`
      )
      navigate(routes.adminSaleNotes())
    },
    onError: (error) => {
      showErrorNotification(
        'Error al actualizar la nota de venta. Por favor, inténtelo de nuevo.'
      )
      console.error('Error updating sale note:', error)
    },
  })

  const defaultValues: SaleNoteFormValues = saleNote
    ? {
        customerId: saleNote.customer.id,
        nurseryId: saleNote.nursery.id,
        saleDetails: saleNote.saleDetails.map((detail) => ({
          plantId: detail.plant.id,
          price: detail.price,
          quantity: detail.quantity,
        })),
      }
    : {
        customerId: '',
        nurseryId: '',
        saleDetails: [],
      }

  const handleSubmit = async (values: SaleNoteFormValues) => {
    try {
      const input = mapSaleNoteFormValuesToUpdateSaleNoteInput(values)
      await updateSaleNote(id, input)
    } catch (error) {
      console.error('Error al actualizar la nota de venta:', error)
    }
  }

  if (loadingSaleNote) {
    return <LoadingOverlay visible />
  }

  if (errorSaleNote) {
    return <div>Error al cargar la nota de venta: {errorSaleNote.message}</div>
  }

  return (
    <>
      <Metadata
        title="AdminEditSaleNote"
        description="Página de Edición de Notas de Venta"
      />
      <Container size="xl" py="xs">
        <Group justify="space-between" mb="md">
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminSaleNotes())}
          >
            Volver
          </Button>
        </Group>

        <Title order={1} mb="xl">
          Editar Nota de Venta
        </Title>

        <SaleNoteForm
          onSubmit={handleSubmit}
          loading={updatingSaleNote}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminEditSaleNotePage
