import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (event) => {
    event.preventDefault();

    //addPost();

    if (editingPost) {
      editPost();
    } else {
      addPost();
    }

    //To reset these values after we submit the post
    setTitle("");
    setBody("");
    //To reset after edit
    setEditingPost(null);
  };

  const addPost = () => {
    createPost({ title, body })
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editPost = () => {
    updatePost(editingPost.id, { title, body })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? response.data : post
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div>Body</div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        {/* <button type="submit">Add Post</button> */}
        <button type="submit">{editingPost ? "Edit Post" : "Add Post"}</button>
      </div>
    </form>
  );
}
