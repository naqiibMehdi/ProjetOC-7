import { createStore } from 'vuex'
import axios from "axios"

// Create a new store instance.
const store = createStore({
  state() {
    return {
      blogs: [],
      comments: [],
      errorBlog: "",
      errorsSignUp: {},
      errorLogin: "",
      errorComment: ""
    }
  },

  actions: {
    //signUp
    signUp({commit}, dataPost){
      return axios.post("http://localhost:3000/api/auth/signup", dataPost, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        return res
      })
      .catch(err => { 
        commit("errorsSignUp", err.response.data)
        return Promise.reject(err)
      })
    },

    //login
    login({commit}, data){
      return axios.post("http://localhost:3000/api/auth/login", data, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => res)
      .catch(err => {
        commit("errorLogin", err.response.data)
        return Promise.reject(err)
      })
    },

    //get all blogs
    setBlogs({commit}){
      return axios.get("http://localhost:3000/api/blogs", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          commit("setBlogs", res.data)
        })
        .catch((err) => {
          return Promise.reject(err)
        });
      },

      //create one blog
      createBlog({commit}, payload){
        return axios.post("http://localhost:3000/api/blogs",
          payload,
          {
            withCredentials: true, 
            headers: {"Content-Type": "multipart/form-data"}
          })
        .then((res) => {
          commit("createBlog", res.data)
        })
        .catch(err => {
          commit("errorBlog", err.response.data);
          return Promise.reject(err)
        })
      },

      //get all comments
      setComments({commit}, idBlog){
        return axios.get(`http://localhost:3000/api/blogs/${idBlog}/comment`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(res => {
          commit("setComments", res.data)
        })
      },

      createComment({commit}, {idBlog, description}){
        return axios.post(`http://localhost:3000/api/blogs/${idBlog}/comment`, description,
        {
          withCredentials: true
        })
        .then(res => {
          commit("createComment", res.data)
        })
        .catch(err => {
          commit("errorComment", err.response.data)
          return Promise.reject(err)
        })
      }
    },

  mutations: {
    errorsSignUp(state, errors){
      state.errorsSignUp = errors
    },

    errorLogin(state, error){
      state.errorLogin = error
    },
    //section of blogs
    setBlogs(state, blogs){
      state.blogs = blogs
    },

    createBlog(state, blog){
      state.blogs.unshift(blog)
    },

    errorBlog(state, error){
      state.errorBlog = error
    },

    //section of comments
    setComments(state, comments){
      state.comments = comments
    },

    createComment(state, comment){
      state.comments.push(comment)
    },

    errorComment(state, error){
      state.errorComment = error
    }
  },

  getters: {
    getBlogs(state){
      return state.blogs
    },

    getComments(state){
      return state.comments
    }
  }
})

export default store