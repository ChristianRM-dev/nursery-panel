// web/src/components/ImageGallery/ImageGallery.tsx
import ImageGalleryOriginal from 'react-image-gallery'
import type {
  ReactImageGalleryItem,
  ReactImageGalleryProps,
} from 'react-image-gallery'

// Workaround for TypeScript error
const ImageGallery =
  ImageGalleryOriginal as unknown as React.FC<ReactImageGalleryProps>

interface ImageGalleryProps {
  images: ReactImageGalleryItem[]
}

const CustomImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <ImageGallery
      items={images}
      showPlayButton={false}
      showFullscreenButton={true}
      showThumbnails={true}
      lazyLoad={true}
    />
  )
}

export default CustomImageGallery
