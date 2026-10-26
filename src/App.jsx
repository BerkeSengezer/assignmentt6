import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { initialState, postsReducer } from './reducer/postsReducer.js';
import FilterForm from './components/FilterForm.jsx';
import PostList from './components/PostList.jsx';

export default function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });

      try {
        const posts = await fetchPosts(controller.signal);

        if (active) {
          dispatch({ type: 'FETCH_SUCCESS', payload: posts });
        }
      } catch (error) {
        if (active && error.name !== 'AbortError') {
          dispatch({
            type: 'FETCH_ERROR',
            payload: error.message || 'Unable to load posts.',
          });
        }
      }
    }

    loadPosts();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <main>
      <header>
        <h1>Post Explorer</h1>
        <p>Browse posts and filter them by title.</p>
      </header>

      <FilterForm filter={filter} onFilterChange={setFilter} />

      {state.loading ? (
        <p role="status">Loading posts...</p>
      ) : state.error ? (
        <p className="error" role="alert">{state.error}</p>
      ) : filteredPosts.length === 0 ? (
        <p role="status">No posts found.</p>
      ) : (
        <>
          <p className="count" role="status">
            Showing {filteredPosts.length} of {state.posts.length} posts
          </p>
          <PostList posts={filteredPosts} />
        </>
      )}
    </main>
  );
}
