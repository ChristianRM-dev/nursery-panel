// web/src/utils/Mappers/NurseryMappers.ts
import { CreateNurseryInput, UpdateNurseryInput } from 'types/graphql'

import { NurseryFormValues } from 'src/components/Nursery/NurseryForm/NurseryForm.schema'
import { NurseryTableRow } from 'src/components/Nursery/NurseryTable/NurseryTable.types'
import { GetPaginatedNurseriesItem } from 'src/hooks/Nurseries/useGetPaginatedNurseries'

import { fileToBase64 } from '../Converters'

/**
 * Maps `GetPaginatedNurseriesItem` to the `NurseryTableRow` expected by the PaginatedTable<NurseryTableRow> component.
 */
export const mapGetPaginatedNurseriesItemToNurseryTableRow = (
  nurseries: GetPaginatedNurseriesItem
): NurseryTableRow[] => {
  return nurseries.map((nursery) => ({
    ...nursery,
  }))
}

/**
 * Maps `NurseryFormValues` to the `CreateNurseryInput` expected by the mutation.
 */
export const mapNurseryFormValuesToCreateNurseryInput = async (
  values: NurseryFormValues
): Promise<CreateNurseryInput> => {
  let logoInput: CreateNurseryInput['logo'] = null

  // Handle logo upload if provided
  if (values.logo) {
    // New logo (File object)
    const file = values.logo as File
    const content = await fileToBase64(file) // Convert file to base64
    logoInput = {
      path: file.name, // Use file name as path
      content, // Add base64-encoded file content
    }
  }
  return {
    name: values.name,
    address: values.address,
    phone: values.phone,
    email: values.email,
    ownerName: values.ownerName,
    rfc: values.rfc,
    logo: logoInput,
  }
}

/**
 * Maps `NurseryFormValues` to the `UpdateNurseryInput` expected by the mutation.
 */
export const mapNurseryFormValuesToUpdateNurseryInput = async (
  values: NurseryFormValues
): Promise<UpdateNurseryInput> => {
  let logoInput: UpdateNurseryInput['logo'] = null

  // Handle logo upload if provided
  if (values.logo) {
    // New logo (File object)
    const file = values.logo
    if (file instanceof File) {
      const content = await fileToBase64(file) // Convert file to base64
      logoInput = {
        path: file.name, // Use file name as path
        content, // Add base64-encoded file content
      }
    }
  }
  return {
    name: values.name,
    address: values.address,
    phone: values.phone,
    email: values.email,
    ownerName: values.ownerName,
    rfc: values.rfc,
    logo: logoInput,
  }
}
