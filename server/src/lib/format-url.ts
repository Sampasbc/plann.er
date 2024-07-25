export const formatRemoveHTTP = (url: string, protocol: string) => {
  if (protocol == 'http') {
    return url.slice(7)
  } else if (protocol == 'https') {
    return url.slice(8)
  }
}