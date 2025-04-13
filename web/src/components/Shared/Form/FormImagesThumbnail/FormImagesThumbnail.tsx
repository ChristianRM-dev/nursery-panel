// web/src/components/Shared/Form/FormImagesThumbnail/FormImagesThumbnail.tsx
import { Box, Text, Image, ActionIcon } from '@mantine/core'
import { IconTrash, IconZoomIn } from '@tabler/icons-react'

type PhotoObject = { url?: string; name?: string } | File

interface FormImagesThumbnailProps {
  photos: PhotoObject[]
  description: string
  loading?: boolean
  onRemove: (index: number) => void
  onPreview: (index: number) => void
}

export const FormImagesThumbnail: React.FC<FormImagesThumbnailProps> = ({
  photos,
  loading = false,
  onRemove,
  onPreview,
  description,
}) => {
  if (photos.length === 0) return null

  return (
    <Box mt="md">
      <Text size="md" mb="sm">
        {description}
      </Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {photos.map((photo, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Image
              src={
                photo instanceof File ? URL.createObjectURL(photo) : photo.url
              }
              alt={`Vista previa ${index}`}
              style={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => onPreview(index)}
            />
            <ActionIcon
              style={{ position: 'absolute', top: 5, right: 5 }}
              color="red"
              size="sm"
              variant="filled"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(index)
              }}
              disabled={loading}
            >
              <IconTrash size={16} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              size="sm"
              style={{
                position: 'absolute',
                top: 5,
                left: 5,
                zIndex: 2,
              }}
              onClick={(e) => {
                e.stopPropagation()
                onPreview(index)
              }}
            >
              <IconZoomIn size={16} />
            </ActionIcon>
          </div>
        ))}
      </div>
    </Box>
  )
}
