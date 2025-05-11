import { Link } from "react-router-dom";

import { useGetAllPostsQuery } from "@/features/posts/postAPI";

function Posts() {
  const { data, isLoading, error } = useGetAllPostsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts.</div>;
  const allPosts = data?.data || []; 
  return (
    <>
      <h2>Post List</h2>
      {allPosts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
          <button>Edit</button>
          <button>Delete</button>
          <br />
        </div>
      ))}
      <button>Add Post</button>
    </>
  );
}

export default Posts;