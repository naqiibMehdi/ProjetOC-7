import { createStore } from 'vuex'
import axios from "axios"

// Create a new store instance.
const store = createStore({
  state() {
    return {
      blogs: [],
      errorBlog: "",
      errorsSignUp: {}
    }
  },

  actions: {
    //signUp
    signUp({commit}, dataPost){
      return axios.post("http://localhost:3000/api/auth/signup", dataPost)
      .then((res) => {
        return res
      })
      .catch(err => { 
        commit("errorsSignUp", err.response.data)
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
        
      }
    },

  mutations: {
    errorsSignUp(state, errors){
      state.errorsSignUp = errors
    },

    setBlogs(state, blogs){
      state.blogs = blogs
    },

    createBlog(state, blog){
      state.blogs.unshift(blog)
    },
    errorBlog(state, error){
      state.errorBlog = error
    }
  },

  getters: {
    getBlogs(state){
      return state.blogs
    }
  }
})

export default store