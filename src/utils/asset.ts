/* Everything under public/ is resolved against BASE_URL rather than
   written as a root-absolute path like '/pictures/x.jpg'. On the user
   site BASE_URL is just '/', but keeping this indirection means the
   site still works unchanged if it ever moves to a project subpath. */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
