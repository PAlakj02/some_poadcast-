import { describe, expect, it } from 'vitest'
import { parseDriveLink } from '@/lib/recordings'

const id = '1AbCdEfGhIjKlMnOpQrStUvWxYz_-123'

describe('Google Drive links', () => {
  it.each([
    `https://drive.google.com/file/d/${id}/view?usp=sharing`,
    `https://drive.google.com/file/d/${id}/view?usp=drive_link`,
    `https://drive.google.com/open?id=${id}`,
    `https://drive.google.com/uc?export=download&id=${id}`,
    `  https://drive.google.com/file/d/${id}  `,
  ])('reads the file id from %s', link => {
    expect(parseDriveLink(link)).toEqual({ id })
  })
  it('asks for a single file instead of a folder', () => {
    expect(parseDriveLink(`https://drive.google.com/drive/folders/${id}`)).toHaveProperty('error')
  })
  it('rejects links that are not Google Drive', () => {
    expect(parseDriveLink(`https://example.com/file/d/${id}/view`)).toHaveProperty('error')
    expect(parseDriveLink('')).toHaveProperty('error')
  })
})
