export type Photo = {
  id: number
  image: string
}

export type Comment = {
  id: number
  author: string
  text: string
}

export type PhotoDetail = {
  id: number
  image: string
  largeImage: string
  comments: Comment[]
}

export async function getPhotos(): Promise<Photo[]> {
  const resp = await fetch('http://test-backend.itdelta.agency/api/images')

  return resp.json()
}

export async function getPhotoDetails(id: number): Promise<PhotoDetail> {
  const resp = await fetch(`http://test-backend.itdelta.agency/api/image/${id}`)

  return resp.json()
}

export async function addComment(id: number, comment: string) {
  const resp = await fetch(`http://test-backend.itdelta.agency/api/image/${id}/comments`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      comment
    })
  })

  if (resp.ok) {
    return { status: 'ok' }
  }

  return { status: 'error' }
}
