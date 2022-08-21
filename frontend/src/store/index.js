import { createStore } from 'vuex'
import axios from "axios"

// Create a new store instance.
const store = createStore({
  state() {
    return {
      blogs: [],
      errorBlog: "",
      open: false
    }
  },

  actions: {
    //get all blogs
    setBlogs({commit}){
      axios.get("http://localhost:3000/api/blogs", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          commit("setBlogs", res.data)
        })
        .catch((err) => {
          console.log(err)
          const code = [401, 403]
          if(code.includes(err.response.status)){
            this.$router.push("/")
          }
        });
      },

      //create one blog
      createBlog({commit, state}, {payload, open, desc}){
        axios.post("http://localhost:3000/api/blogs",
          payload,
          {
            withCredentials: true, 
            headers: {"Content-Type": "multipart/form-data"}
          })
        .then((res) => {
          open
          desc = ""
          state.errorBlog = ""
          commit("createBlog", res.data) 
        })
        .catch(err => {
          commit("errorBlog", err.response.data);
        })
        
      }
    },

  mutations: {
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