import { del, put } from '@vercel/blob'

/**
 * Checks if a URL is a valid Vercel Blob URL
 */
export function isVercelBlobUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname.endsWith('blob.vercel-storage.com')
  } catch {
    return false
  }
}

/**
 * Uploads a file to Vercel Blob with standard folder structure
 */
export async function uploadToBlob(
  folder: string,
  id: string,
  fileInfo: { content: string; path: string }
): Promise<string> {
  const binaryData = Buffer.from(fileInfo.content, 'base64')
  const file = new File([binaryData], fileInfo.path, { type: 'image/jpeg' })

  const blob = await put(`${folder}/${id}/image/${fileInfo.path}`, file, {
    access: 'public',
  })

  return blob.url
}

/**
 * Safely deletes a file from Vercel Blob if it's a valid Blob URL
 */
export async function safeDeleteFromBlob(url: string | null): Promise<void> {
  if (url && isVercelBlobUrl(url)) {
    try {
      await del(url)
    } catch (error) {
      console.warn(`Failed to delete blob at ${url}:`, error)
    }
  }
}
