# Assignment 6 — Post Explorer

A React application that fetches posts from JSONPlaceholder and filters them by title.

## Running the project

Install Node.js 22 LTS, then open a terminal in the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

Production build:

```bash
npm run build
```

## File organization

- src/api/postsApi.js: Fetches posts, checks HTTP errors, and returns parsed JSON.
- src/reducer/postsReducer.js: Manages posts, loading, and error with immutable state updates.
- src/components/Post.jsx: Displays a post title and body.
- src/components/PostList.jsx: Renders posts with map and stable ID keys.
- src/components/FilterForm.jsx: Displays a controlled search input.
- src/App.jsx: Coordinates fetching, reducer state, and title filtering.
- src/main.jsx: Mounts App and imports the stylesheet.
- src/styles.css: Provides responsive styling.

## Challenges and solutions

Handling asynchronous requests requires cleanup. The effect uses AbortController to cancel the request and an active flag to prevent dispatching after cleanup.

Fetch does not automatically reject HTTP error responses, so the API function checks response.ok and throws a readable error.

Filtered posts are derived during rendering instead of being stored in separate state. This keeps the source data and search results synchronized.

## Verification checklist

- Loading message appears while fetching.
- Posts display after a successful request.
- Searching filters titles without case sensitivity.
- An unmatched search displays "No posts found."
- Clearing the search restores all posts.
- A failed request displays an error without crashing.

node_modules and dist are excluded through .gitignore.
