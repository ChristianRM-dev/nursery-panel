import { Document, Page, View, Text, Image } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { GetSaleNoteById } from 'types/graphql'

import { SaleNotePDFStyles } from './SaleNotePDF.styles'

// No font registration needed - using built-in Helvetica

interface SaleNotePDFProps {
  saleNote: GetSaleNoteById['saleNote']
}

const SaleNotePDF = ({ saleNote }: SaleNotePDFProps) => {
  const formattedDate = format(new Date(saleNote.createdAt), 'PPP', {
    locale: es,
  })
  const day = format(new Date(saleNote.createdAt), 'dd', { locale: es })
  const month = format(new Date(saleNote.createdAt), 'MMMM', { locale: es })
  const year = format(new Date(saleNote.createdAt), 'yyyy', { locale: es })

  return (
    <Document title={`Nota de Venta ${saleNote.folio}`}>
      <Page size="A4" style={SaleNotePDFStyles.page}>
        {/* Folio alineado a la derecha */}
        <View style={SaleNotePDFStyles.folioContainer}>
          <Text style={SaleNotePDFStyles.folioText}>
            Folio: {saleNote.folio}
          </Text>
        </View>

        {/* Logo centrado */}
        <View style={SaleNotePDFStyles.logoContainer}>
          {saleNote.nursery.logo && (
            <Image src={saleNote.nursery.logo} style={SaleNotePDFStyles.logo} />
          )}
        </View>

        {/* Información del vivero */}
        <View style={SaleNotePDFStyles.nurseryInfo}>
          <Text>RFC: {saleNote.nursery.rfc}</Text>
          <Text>Dirección: {saleNote.nursery.address}</Text>
          <Text>Teléfono: {saleNote.nursery.phone}</Text>
        </View>

        {/* Lugar y fecha */}
        <View style={SaleNotePDFStyles.issuanceInfo}>
          <Text>Expedido en Coquimatlán, Colima el {formattedDate}</Text>
        </View>

        {/* Datos del cliente */}
        <Text style={SaleNotePDFStyles.sectionTitle}>DATOS DEL CLIENTE</Text>
        <View style={SaleNotePDFStyles.customerTable}>
          <View style={SaleNotePDFStyles.customerRow}>
            <Text style={SaleNotePDFStyles.customerHeader}>Nombre:</Text>
            <Text style={SaleNotePDFStyles.customerData}>
              {saleNote.customer.name}
            </Text>
          </View>
          <View style={SaleNotePDFStyles.customerRow}>
            <Text style={SaleNotePDFStyles.customerHeader}>Teléfono:</Text>
            <Text style={SaleNotePDFStyles.customerData}>
              {saleNote.customer.phone}
            </Text>
          </View>
        </View>

        {/* Productos */}
        <Text style={SaleNotePDFStyles.sectionTitle}>DETALLE DE LA VENTA</Text>
        <View>
          <View style={SaleNotePDFStyles.tableHeader}>
            <Text style={SaleNotePDFStyles.colDescription}>Descripción</Text>
            <Text style={SaleNotePDFStyles.colPrice}>P. Unit.</Text>
            <Text style={SaleNotePDFStyles.colQuantity}>Cantidad</Text>
            <Text style={SaleNotePDFStyles.colTotal}>Importe</Text>
          </View>
          {saleNote.saleDetails.map((detail) => (
            <View key={detail.id} style={SaleNotePDFStyles.tableRow}>
              <Text style={SaleNotePDFStyles.colDescription}>
                {detail.plant.name}
              </Text>
              <Text style={SaleNotePDFStyles.colPrice}>
                ${detail.price.toFixed(2)}
              </Text>
              <Text style={SaleNotePDFStyles.colQuantity}>
                {detail.quantity}
              </Text>
              <Text style={SaleNotePDFStyles.colTotal}>
                ${(detail.price * detail.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={SaleNotePDFStyles.totalContainer}>
          <Text style={SaleNotePDFStyles.totalText}>
            TOTAL: ${saleNote.total.toFixed(2)} MXN
          </Text>
        </View>

        {/* Texto legal - Using Times-Roman for better readability */}
        <Text style={SaleNotePDFStyles.legalText}>
          Debo (emos) y pagaré (mos) a la orden de{' '}
          {saleNote.nursery.ownerName || '[Nombre del dueño]'} en esta ciudad o
          cualquiera otra que se requiera pago el día {day} de {month} de {year}{' '}
          la cantidad de ${saleNote.total.toFixed(2)} MXN valor del servicio
          recibido a mi (nuestra) entera satisfacción, de no hacerlo así causará
          un interés del 15% mensual, a partir de la fecha de vencimiento. Este
          pagaré es mercantil y está regido por la ley general de títulos y
          operaciones de crédito en su artículo 173 parte final demás artículos
          correlativos por no ser pagaré domiciliario.
        </Text>

        {/* Firma */}
        <View style={SaleNotePDFStyles.signatureContainer}>
          <View style={SaleNotePDFStyles.signatureLine} />
          <Text style={SaleNotePDFStyles.signatureText}>Firma del Cliente</Text>
        </View>
      </Page>
    </Document>
  )
}

export default SaleNotePDF
