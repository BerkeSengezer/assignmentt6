export async function fetchPosts(signal) {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts',
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Could not load posts (HTTP ${response.status}).`);
  }

  const posts = await response.json();

  if (!Array.isArray(posts)) {
    throw new Error('The server returned an unexpected response.');
  }

  return posts;
}
