import { StyleSheet } from '@react-pdf/renderer'

export const SaleNotePDFStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica', // Using built-in PDF font
    fontSize: 12,
  },
  folioContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  folioText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 150,
    height: 80,
  },
  nurseryInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    lineHeight: 1.5,
  },
  issuanceInfo: {
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic', // Helvetica supports italic
  },
  customerTable: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  customerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  customerHeader: {
    width: '30%',
    padding: 5,
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  customerData: {
    width: '70%',
    padding: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  colDescription: {
    width: '50%',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  colPrice: {
    width: '15%',
    padding: 5,
    textAlign: 'right',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  colQuantity: {
    width: '15%',
    padding: 5,
    textAlign: 'right',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  colTotal: {
    width: '20%',
    padding: 5,
    textAlign: 'right',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  legalText: {
    marginTop: 30,
    marginBottom: 40,
    textAlign: 'justify',
    lineHeight: 1.5,
    fontSize: 10,
    fontFamily: 'Times-Roman', // Better for long text
  },
  signatureContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 50,
  },
  signatureLine: {
    width: '60%',
    borderTopWidth: 1,
    borderTopColor: '#000',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
  },
})
