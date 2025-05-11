import httpRequest from "@/utils/httpRequest";

export const getAllPosts = async () => {
  const res = await httpRequest.get("/posts");
  return res;
};

export const getOnePost = async (id) => {
  const res = await httpRequest.get(`/posts/${id}`);
  return res;
};

export const createPost = async (data) => {
  const res = await httpRequest.post("/posts", data);
  return res;
};

export const updatePost = async (id, data) => {
  const res = await httpRequest.put(`/posts/${id}`, data);
  return res;
};

export const deletePost = async (id) => {
  const res = await httpRequest.remove(`/posts/${id}`);
  console.log(res);
  return res.data.exists;
};

export default {
    getAllPosts, getOnePost, createPost, updatePost, deletePost
};
