// web/src/components/Shared/Form/FormImagePreview/FormImagePreview.tsx
import React from 'react'

import { Modal, Image, ActionIcon, Box, Group, Text } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

type PhotoObject = { url?: string; name?: string } | File

interface FormImagePreviewProps {
  openedIndex: number | null
  onClose: () => void
  onChangeIndex: (newIndex: number) => void
  photos: PhotoObject[]
  previewSize?: number
}

export const FormImagePreview: React.FC<FormImagePreviewProps> = ({
  openedIndex,
  onClose,
  onChangeIndex,
  photos,
}) => {
  const [currentImageUrl, setCurrentImageUrl] = React.useState<string>('')

  React.useEffect(() => {
    if (openedIndex === null) return

    const currentPhoto = photos[openedIndex]
    let url: string

    if (currentPhoto instanceof File) {
      url = URL.createObjectURL(currentPhoto)
    } else {
      url = currentPhoto.url
    }

    setCurrentImageUrl(url)

    return () => {
      if (currentPhoto instanceof File) {
        URL.revokeObjectURL(url)
      }
    }
  }, [openedIndex, photos])

  if (openedIndex === null) return null

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (openedIndex > 0) {
      onChangeIndex(openedIndex - 1)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (openedIndex < photos.length - 1) {
      onChangeIndex(openedIndex + 1)
    }
  }

  return (
    <Modal
      opened={openedIndex !== null}
      onClose={onClose}
      fullScreen
      size="xl"
      title={
        <Group justify="space-between" w="100%">
          <Text>{`Imagen ${openedIndex + 1} de ${photos.length}`}</Text>
        </Group>
      }
      withCloseButton={true}
      overlayProps={{ backgroundOpacity: 0.7, blur: 1 }}
      styles={{
        header: { width: '100%' },
        title: { width: '100%', fontWeight: 500 },
      }}
    >
      <Box
        pos="relative"
        h="89vh"
        bg="dark.8"
        style={{ borderRadius: 'var(--mantine-radius-md)' }}
      >
        <Image
          src={currentImageUrl}
          alt="Vista previa ampliada"
          fit="contain"
          style={{ maxHeight: '100%', width: '100%' }}
          fallbackSrc="https://placehold.co/600x400?text=Error+al+cargar+imagen"
        />

        {/* Navigation buttons */}
        <ActionIcon
          variant="white"
          color="gray"
          size="xl"
          radius="xl"
          style={{
            position: 'absolute',
            left: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
          onClick={handlePrevious}
          disabled={openedIndex === 0}
        >
          <IconChevronLeft size={24} />
        </ActionIcon>

        <ActionIcon
          variant="white"
          color="gray"
          size="xl"
          radius="xl"
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
          }}
          onClick={handleNext}
          disabled={openedIndex === photos.length - 1}
        >
          <IconChevronRight size={24} />
        </ActionIcon>
      </Box>
    </Modal>
  )
}
