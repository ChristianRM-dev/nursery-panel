// web/src/hooks/SaleNotes/useGetSaleNotesReport.ts
import type {
  GetSaleNotesReport,
  GetSaleNotesReportVariables,
} from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

const GET_SALE_NOTES_REPORT = gql`
  query GetSaleNotesReport($startDate: DateTime!, $endDate: DateTime!) {
    saleNotesReport(startDate: $startDate, endDate: $endDate) {
      folio
      createdAt
      customer {
        name
        phone
      }
      total
      saleDetails {
        plant {
          name
          category {
            name
          }
        }
        quantity
        price
        total
      }
    }
  }
`

interface UseGetSaleNotesReportProps {
  startDate: string
  endDate: string
}

export const useGetSaleNotesReport = ({
  startDate,
  endDate,
}: UseGetSaleNotesReportProps) => {
  const { data, loading, error, refetch } = useQuery<
    GetSaleNotesReport,
    GetSaleNotesReportVariables
  >(GET_SALE_NOTES_REPORT, {
    variables: { startDate, endDate },
    skip: !startDate || !endDate,
    fetchPolicy: 'network-only',
  })

  return {
    reportData: data?.saleNotesReport,
    loading,
    error,
    refetch,
  }
}
