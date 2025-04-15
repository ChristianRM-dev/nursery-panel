// web/src/components/SaleNote/SaleNotePDF/SaleNotePDF.tsx
import { Document, Page, View, Text, Image } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { GetSaleNoteById } from 'types/graphql'

import { SaleNotePDFStyles } from './SaleNotePDF.styles'

interface SaleNotePDFProps {
  saleNote: GetSaleNoteById['saleNote']
}

const SaleNotePDF: React.FC<SaleNotePDFProps> = ({ saleNote }) => {
  const formattedDate = format(new Date(saleNote.createdAt), 'PPP', {
    locale: es,
  })
  const day = format(new Date(saleNote.createdAt), 'dd', { locale: es })
  const month = format(new Date(saleNote.createdAt), 'MMMM', { locale: es })
  const year = format(new Date(saleNote.createdAt), 'yyyy', { locale: es })

  return (
    <Document title={`Nota de Venta ${saleNote.folio}`}>
      <Page size="A4" style={SaleNotePDFStyles.page}>
        {/* Encabezado con 3 columnas: Logo, Info Vivero, Folio */}
        <View style={SaleNotePDFStyles.headerContainer}>
          {/* Columna 1: Logo */}
          <View style={SaleNotePDFStyles.headerLogoColumn}>
            {saleNote.nursery.logo && (
              <Image
                src={saleNote.nursery.logo}
                style={SaleNotePDFStyles.headerLogo}
              />
            )}
          </View>

          {/* Columna 2: Información del vivero (en columna) */}
          <View style={SaleNotePDFStyles.headerInfoColumn}>
            <Text style={SaleNotePDFStyles.nurseryName}>
              {saleNote.nursery.ownerName}
            </Text>
            <Text>R.F.C: {saleNote.nursery.rfc}</Text>
            <Text>Dirección: {saleNote.nursery.address}</Text>
            <Text>Teléfono: {saleNote.nursery.phone}</Text>
          </View>

          {/* Columna 3: Folio y expedición */}
          <View style={SaleNotePDFStyles.headerFolioColumn}>
            {/* Tabla del folio */}
            <View style={SaleNotePDFStyles.folioTable}>
              <View style={SaleNotePDFStyles.folioTableRow}>
                <Text style={SaleNotePDFStyles.folioTableHeader}>PEDIDO</Text>
              </View>
              <View style={SaleNotePDFStyles.folioTableRow}>
                <Text style={SaleNotePDFStyles.folioTableData}>
                  {saleNote.folio}
                </Text>
              </View>
            </View>

            {/* Tabla de expedición */}
            <View style={[SaleNotePDFStyles.folioTable, { marginTop: 10 }]}>
              <View style={SaleNotePDFStyles.folioTableRow}>
                <Text style={SaleNotePDFStyles.folioTableHeader}>
                  EXPEDIDO EN
                </Text>
                <Text style={SaleNotePDFStyles.folioTableData}>
                  COQUIMATLÁN, COL.
                </Text>
              </View>
              <View style={SaleNotePDFStyles.expedidoEnRow}>
                <Text style={SaleNotePDFStyles.folioTableData}>
                  {formattedDate}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Datos del cliente */}
        <View style={SaleNotePDFStyles.customerTableContainer}>
          <View style={SaleNotePDFStyles.customerTable}>
            {/* Fila Nombre */}
            <View style={SaleNotePDFStyles.customerTableRow}>
              <Text>
                <Text style={SaleNotePDFStyles.customerLabel}>Nombre: </Text>
                <Text>{saleNote.customer.name}</Text>
              </Text>
            </View>

            {/* Fila Teléfono */}
            <View style={SaleNotePDFStyles.customerTableRow}>
              <Text>
                <Text style={SaleNotePDFStyles.customerLabel}>Teléfono: </Text>
                <Text>{saleNote.customer.phone || 'N/A'}</Text>
              </Text>
            </View>

            {/* Fila Correo */}
            <View style={SaleNotePDFStyles.customerTableRow}>
              <Text>
                <Text style={SaleNotePDFStyles.customerLabel}>Correo: </Text>
                <Text>{saleNote.customer.phone || 'N/A'}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Productos */}
        <View style={SaleNotePDFStyles.productsTableContainer}>
          <View style={SaleNotePDFStyles.productsTable}>
            {/* Encabezados */}
            <View style={SaleNotePDFStyles.productsTableHeader}>
              <Text
                style={[
                  SaleNotePDFStyles.colQuantity,
                  SaleNotePDFStyles.tableHeaderText,
                ]}
              >
                Cantidad
              </Text>
              <Text
                style={[
                  SaleNotePDFStyles.colDescription,
                  SaleNotePDFStyles.tableHeaderText,
                ]}
              >
                Descripción
              </Text>
              <Text
                style={[
                  SaleNotePDFStyles.colPrice,
                  SaleNotePDFStyles.tableHeaderText,
                ]}
              >
                P. Unitario
              </Text>
              <Text
                style={[
                  SaleNotePDFStyles.colTotal,
                  SaleNotePDFStyles.tableHeaderText,
                ]}
              >
                Total
              </Text>
            </View>

            {/* Filas de productos */}
            {saleNote.saleDetails.map((detail) => (
              <View key={detail.id} style={SaleNotePDFStyles.productsTableRow}>
                <Text style={SaleNotePDFStyles.colQuantity}>
                  {detail.quantity}
                </Text>
                <Text style={SaleNotePDFStyles.colDescription}>
                  {detail.plant.name}
                </Text>
                <Text style={SaleNotePDFStyles.colPrice}>
                  ${detail.price.toFixed(2)}
                </Text>
                <Text style={SaleNotePDFStyles.colTotal}>
                  ${(detail.price * detail.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            {/* Filas de plantas externas */}
            {saleNote.externalPlants.map((externalPlant, index) => (
              <View key={index} style={SaleNotePDFStyles.productsTableRow}>
                <Text style={SaleNotePDFStyles.colQuantity}>
                  {externalPlant.quantity}
                </Text>
                <Text style={SaleNotePDFStyles.colDescription}>
                  {externalPlant.name}
                </Text>
                <Text style={SaleNotePDFStyles.colPrice}>
                  ${externalPlant.price.toFixed(2)}
                </Text>
                <Text style={SaleNotePDFStyles.colTotal}>
                  ${(externalPlant.price * externalPlant.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Total */}
        <View style={SaleNotePDFStyles.totalContainer}>
          <Text style={SaleNotePDFStyles.totalText}>
            TOTAL: ${saleNote.total.toFixed(2)} MXN
          </Text>
        </View>

        {/* Texto legal */}
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
          <View style={SaleNotePDFStyles.signatureLineContainer}>
            <View style={SaleNotePDFStyles.signatureLine} />
          </View>
          <Text style={SaleNotePDFStyles.signatureText}>Firma del Cliente</Text>
        </View>
      </Page>
    </Document>
  )
}

export default SaleNotePDF
