import React from 'react'

import { TextInput, Button, Group, Text, Box, ActionIcon } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { IconUpload, IconPhoto, IconX, IconTrash } from '@tabler/icons-react'

import FormOverlay from 'src/components/Shared/Form/Overlay/FormOverlay'

import { NurseryFormValues, nurserySchema } from './NurseryForm.schema'

interface NurseryFormProps {
  onSubmit: (values: NurseryFormValues) => void
  loading: boolean
  defaultValues: NurseryFormValues
}

export const NurseryForm: React.FC<NurseryFormProps> = ({
  onSubmit,
  loading,
  defaultValues,
}) => {
  const form = useForm<NurseryFormValues>({
    initialValues: {
      name: defaultValues?.name || '',
      address: defaultValues?.address || '',
      phone: defaultValues?.phone || '',
      email: defaultValues?.email || '',
      ownerName: defaultValues?.ownerName || '',
      rfc: defaultValues?.rfc || '',
      logo: defaultValues?.logo || null,
    },
    validate: (values) => {
      const result = nurserySchema.safeParse(values)
      if (!result.success) {
        return result.error.formErrors.fieldErrors
      }
      return {}
    },
  })

  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      form.setFieldValue('logo', files[0]) // Only allow one logo file
    }
  }

  const handleRemoveLogo = () => {
    form.setFieldValue('logo', null)
  }

  return (
    <Box style={{ position: 'relative' }}>
      {loading && <FormOverlay />}

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          label="Nombre"
          placeholder="Nombre del vivero"
          {...form.getInputProps('name')}
          disabled={loading}
          required
          mb="md"
        />
        <TextInput
          label="Dirección"
          placeholder="Dirección del vivero"
          {...form.getInputProps('address')}
          disabled={loading}
          required
          mb="md"
        />
        <TextInput
          label="Teléfono"
          placeholder="Teléfono del vivero"
          {...form.getInputProps('phone')}
          disabled={loading}
          required
          mb="md"
        />
        <TextInput
          label="Email"
          placeholder="Email del vivero"
          {...form.getInputProps('email')}
          disabled={loading}
          required
          mb="md"
        />
        <TextInput
          label="Nombre del propietario"
          placeholder="Nombre del propietario"
          {...form.getInputProps('ownerName')}
          disabled={loading}
          required
          mb="md"
        />
        <TextInput
          label="RFC"
          placeholder="RFC del vivero"
          {...form.getInputProps('rfc')}
          disabled={loading}
          required
          mb="md"
        />

        {/* Logo Upload */}
        <Dropzone
          onDrop={handleDrop}
          onReject={() => {}}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          disabled={loading}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={52}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={52}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Arrastre el logo aquí o haga clic para seleccionar un archivo
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                El archivo no debe exceder 5 MB
              </Text>
            </div>
          </Group>
        </Dropzone>

        {form.errors.logo && (
          <Text color="red" size="sm" mt="xs">
            {form.errors.logo}
          </Text>
        )}

        {form.values.logo && (
          <Box mt="md">
            <Text size="md" mb="sm">
              Logo seleccionado:
            </Text>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src={
                  form.values.logo instanceof File
                    ? URL.createObjectURL(form.values.logo)
                    : form.values.logo.url
                }
                alt="Logo del vivero"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <ActionIcon
                style={{ position: 'absolute', top: 5, right: 5 }}
                color="red"
                variant="filled"
                onClick={handleRemoveLogo}
                disabled={loading}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          </Box>
        )}

        <Group justify="flex-end" mt="md">
          <Button type="submit" disabled={loading}>
            Enviar
          </Button>
        </Group>
      </form>
    </Box>
  )
}
