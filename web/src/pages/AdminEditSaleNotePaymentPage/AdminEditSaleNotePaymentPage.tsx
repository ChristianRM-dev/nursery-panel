import { Title, Container, Group, Button, LoadingOverlay } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

import { navigate, routes, useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { PaymentForm } from 'src/components/Payment/PaymentForm/PaymentForm'
import { PaymentFormValues } from 'src/components/Payment/PaymentForm/PaymentForm.schema'
import { useGetPaymentById } from 'src/hooks/Payments/useGetPaymentById'
import { useUpdatePayment } from 'src/hooks/Payments/useUpdatePayment'
import { useNotifications } from 'src/hooks/useNotifications'
import { mapPaymentFormValuesToUpdatePaymentInput } from 'src/utils/Mappers/PaymentMappers'

const AdminEditSaleNotePaymentPage: React.FC = () => {
  const { id } = useParams()
  const { showSuccessNotification, showErrorNotification } = useNotifications()

  const {
    payment,
    loading: loadingPayment,
    error: errorPayment,
  } = useGetPaymentById({ id })

  const { updatePayment, loading: updatingPayment } = useUpdatePayment({
    onCompleted: (data) => {
      showSuccessNotification(
        `¡Pago de $${data.amount} actualizado correctamente!`
      )
      navigate(routes.adminSaleNoteDetails({ id: data.saleNote.id }))
    },
    onError: (error) => {
      showErrorNotification(
        'Error al actualizar el pago. Por favor, inténtelo de nuevo.'
      )
      console.error('Error updating payment:', error)
    },
  })

  const handleSubmit = async (values: PaymentFormValues) => {
    try {
      const input = mapPaymentFormValuesToUpdatePaymentInput(values)
      await updatePayment(id, input)
    } catch (error) {
      console.error('Error al actualizar el pago:', error)
    }
  }

  if (loadingPayment) {
    return <LoadingOverlay visible />
  }

  if (errorPayment) {
    return <div>Error al cargar el pago: {errorPayment.message}</div>
  }

  if (!payment) {
    return <div>Pago no encontrado</div>
  }

  // Map payment data to form values
  const initialFormValues: PaymentFormValues = {
    amount: payment.amount,
    method: payment.method,
    reference: payment.reference || '',
    notes: payment.notes || '',
  }

  return (
    <>
      <Metadata
        title="AdminEditPayment"
        description="Página para editar pagos de notas de venta"
      />
      <Container size="xl" py="xs">
        <Group justify="space-between" mb="md">
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
            onClick={() =>
              navigate(routes.adminSaleNoteDetails({ id: payment.saleNote.id }))
            }
          >
            Volver
          </Button>
        </Group>

        <Title order={1} mb="xl">
          Editar Pago #{payment.id}
        </Title>

        <PaymentForm
          onSubmit={handleSubmit}
          loading={updatingPayment}
          saleNote={payment.saleNote}
          defaultValues={initialFormValues}
        />
      </Container>
    </>
  )
}

export default AdminEditSaleNotePaymentPage
