// web/src/pages/AdminAddPaymentToSaleNotePage/AdminAddPaymentToSaleNotePage.tsx
import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { PaymentForm } from 'src/components/Payment/PaymentForm/PaymentForm'
import { PaymentFormValues } from 'src/components/Payment/PaymentForm/PaymentForm.schema'
import { useCreatePayment } from 'src/hooks/Payments/useCreatePayment'
import { useGetSaleNoteById } from 'src/hooks/SaleNotes/useGetSaleNoteById'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapPaymentFormValuesToCreatePaymentInput } from 'src/utils/Mappers/PaymentMappers'

const AdminAddPaymentToSaleNotePage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    saleNote,
    loading: loadingSaleNote,
    error: errorSaleNote,
  } = useGetSaleNoteById({ id })

  const { createPayment, loading: creatingPayment } = useCreatePayment({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Pago de $${data.amount} agregado correctamente a la nota ${data.saleNote.folio}!`
      )
      navigate(routes.adminSaleNoteDetails({ id: data.saleNote.id }))
    },
    onError: (error) => {
      showErrorNotification(
        'Error al registrar el pago. Por favor, inténtelo de nuevo.'
      )
      console.error('Error creating payment:', error)
    },
  })

  const handleSubmit = async (values: PaymentFormValues) => {
    try {
      const input = mapPaymentFormValuesToCreatePaymentInput(values, id)
      await createPayment(input)
    } catch (error) {
      console.error('Error al registrar el pago:', error)
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
        title="AdminAddPaymentToSaleNote"
        description="Página para agregar pagos a notas de venta"
      />
      <Container size="xl" py="xs">
        <Group justify="space-between" mb="md">
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() => navigate(routes.adminSaleNoteDetails({ id }))}
          >
            Volver
          </Button>
        </Group>

        <Title order={1} mb="xl">
          Agregar Pago a Nota #{saleNote?.folio}
        </Title>

        <PaymentForm
          onSubmit={handleSubmit}
          loading={creatingPayment}
          saleNote={saleNote}
          defaultValues={{
            amount: 0,
            method: '',
            reference: '',
            notes: '',
          }}
        />
      </Container>
    </>
  )
}

export default AdminAddPaymentToSaleNotePage
