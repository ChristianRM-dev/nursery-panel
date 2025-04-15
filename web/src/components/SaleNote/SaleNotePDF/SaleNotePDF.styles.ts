// web/src/components/SaleNote/SaleNotePDF/SaleNotePDF.styles.ts
import { StyleSheet } from '@react-pdf/renderer'

export const SaleNotePDFStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },

  // Encabezado con 3 columnas
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLogoColumn: {
    width: '20%',
    alignItems: 'flex-start',
  },
  headerInfoColumn: {
    width: '60%',
    alignItems: 'center',
  },
  headerFolioColumn: {
    width: '20%',
    alignItems: 'flex-end',
  },

  folioTable: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
  expedidoEnRow: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  folioTableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 3,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  folioTableHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  folioTableData: {
    textAlign: 'center',
    fontSize: 10,
  },
  headerLogo: {
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
  },
  nurseryName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  // Resto de estilos (mantén los que ya tienes)
  folioText: {
    fontWeight: 'bold',
  },
  issuanceInfo: {
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },
  customerTableContainer: {
    marginBottom: 15,
    width: '100%',
  },
  customerTable: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
  customerTableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  customerLabel: {
    fontWeight: 'bold',
  },

  customerRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  customerHeader: {
    width: '20%',
    fontWeight: 'bold',
  },
  customerData: {
    width: '80%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  productsTableContainer: {
    marginBottom: 15,
    width: '100%',
  },
  productsTable: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
  productsTableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
  },
  productsTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  colQuantity: {
    width: '15%',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  colDescription: {
    width: '55%',
    paddingHorizontal: 5,
  },
  colPrice: {
    width: '15%',
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  colTotal: {
    width: '15%',
    textAlign: 'right',
    paddingHorizontal: 5,
  },

  totalContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  legalText: {
    marginTop: 30,
    fontSize: 8,
    lineHeight: 1.2,
    textAlign: 'justify',
  },
  signatureContainer: {
    marginTop: 40,
    alignItems: 'center', // Centrado horizontal
    width: '100%',
  },
  signatureLineContainer: {
    width: 300, // Ancho del espacio para firmar
    marginBottom: 5,
    alignItems: 'center',
  },
  signatureLine: {
    width: 200, // Ancho de la línea de firma
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
  },
})
