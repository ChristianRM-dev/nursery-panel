// web/src/pages/AdminNewSaleNotePage/AdminNewSaleNotePage.tsx
import { Title, Container, Group, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { SaleNoteForm } from 'src/components/SaleNote/SaleNoteForm/SaleNoteForm'
import { SaleNoteFormValues } from 'src/components/SaleNote/SaleNoteForm/SaleNoteForm.schema'
import { useCreateSaleNote } from 'src/hooks/SaleNotes/useCreateSaleNote'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapSaleNoteFormValuesToCreateSaleNoteInput } from 'src/utils/Mappers/SaleNoteMappers'

const AdminNewSaleNotePage: React.FC = () => {
  const defaultValues: SaleNoteFormValues = {
    customerId: '',
    nurseryId: '',
    saleDetails: [],
    externalPlants: [],
  }

  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const { createSaleNote, loading } = useCreateSaleNote({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Nota de venta "${data.folio}" creada correctamente!`
      )
      navigate(routes.adminSaleNotes())
    },
    onError: (error) => {
      console.error('Error creating sale note:', error)
      showErrorNotification(
        'Error al crear la nota de venta. Por favor, inténtelo de nuevo.'
      )
    },
  })

  const handleSubmit = async (values: SaleNoteFormValues) => {
    try {
      const input = await mapSaleNoteFormValuesToCreateSaleNoteInput(values)
      await createSaleNote(input)
    } catch (error) {
      console.error('Error creating sale note:', error)
    }
  }

  return (
    <>
      <Metadata
        title="AdminSaleNotesNew"
        description="Página de Creación de Notas de Venta"
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
          Crear Nota de Venta
        </Title>

        <SaleNoteForm
          onSubmit={handleSubmit}
          loading={loading}
          defaultValues={defaultValues}
        />
      </Container>
    </>
  )
}

export default AdminNewSaleNotePage
