import { createStore } from 'vuex'
import axios from "axios"

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: {},
      oneBlog: {},
      blogs: [],
      comments: [],
      listUsersAdmin: [],
      errorBlog: "",
      errorsSignUp: {},
      errorLogin: "",
      errorComment: "",
      errorsUpdatePwd: {}
    }
  },

  actions: {
    //user managed by admin
    setAllUserForAdmin({commit}){
      return axios.get("http://localhost:3000/api/auth/admin/user", {withCredentials: true})
      .then((res) => {
        commit("setAllUserForAdmin", res.data)
      })
      .catch(err => Promise.reject(err))
    },

    updateStatusUser({commit}, userId){
      return axios.put(`http://localhost:3000/api/auth/admin/user/${userId}`, {}, {withCredentials: true})
      .then(() => {
        commit("updateStatusUser", userId)
      })
      .catch(err => Promise.reject(err))
    },

    deleteUserLIstAdmin({commit}, userId){
      return axios.delete(`http://localhost:3000/api/auth/admin/user/${userId}`, {withCredentials: true})
      .then(() => {
        commit("deleteUserLIstAdmin", userId)
      })
      .catch(err => Promise.reject(err))
    },

    //get only one user
    setUserProfile({commit}){
      return axios.get("http://localhost:3000/api/auth/user/profile",
        {withCredentials: true}
      )
      .then(res => {
        commit("oneUser", res.data)
      })
      .catch(err => Promise.reject(err))
    },

    updateImageProfile({commit}, data){
      return axios.put("http://localhost:3000/api/auth/user/profile/image", data,
        {
          withCredentials: true,
          headers: {"Content-Type": "multipart/form-data"}
        })
        .then(res => {
          commit("updateImageProfile", res.data)
        })
        .catch(err => Promise.reject(err))
    },

    deleteUserProfile(){
      return axios.delete("http://localhost:3000/api/auth/user/profile", {withCredentials: true})
              .then(res => res)
    },

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

    //update forget password
    errorsForgetPwd({commit}, data){
      return axios.post("http://localhost:3000/api/auth/updatepassword", data, 
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(res => res)
      .catch(err => {
        commit("errorsForgetPwd", err.response.data)
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

      //get one blog
      setOneBlog({commit}, id){
        return axios.get(`http://localhost:3000/api/blogs/${id}`, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          commit("setOneBlog", res.data)
        })
      },

      updateOneBlog({commit}, {id, datas}){
        return axios.put(`http://localhost:3000/api/blogs/${id}`, datas,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
        .then(res => res)
        .catch(err => {
          commit("errorBlog", err.response.data)
          return Promise.reject(err)
        });
      },

      deleteOneBlog(context, id){
        return axios.delete(`http://localhost:3000/api/blogs/${id}`, 
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
            .then(res => res)
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
      },

      updateComment({ commit }, {id, data}){
        return axios.put(`http://localhost:3000/api/comment/${id}`, data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then(() => {
          commit("updateComment", {id, data})
        })
        .catch((err) => {
          commit("errorComment", err.response.data)
          return Promise.reject(err)
        });
      },

      deleteComment({ commit }, id){
        return axios.delete(`http://localhost:3000/api/comment/${id}`, 
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then(() => {
            commit("deleteComment", id)
          })
      }
    },

  mutations: {
    // errors of forget pasword
    errorsForgetPwd(state, errors){
      state.errorsUpdatePwd = errors
    },

    //function for Admin part
    setAllUserForAdmin(state, data){
      state.listUsersAdmin = data
    },

    updateStatusUser(state, idUser){
      const user = state.listUsersAdmin.find(user => user.id === idUser)
      user.isadmin = !user.isadmin
    },

    deleteUserLIstAdmin(state, userId){
      const newListUsers = state.listUsersAdmin.filter(user => user.id !== userId)
      state.listUsersAdmin = newListUsers
    },

    oneUser(state, data){
      state.user = data
    },

    updateImageProfile(state, data){
      state.user.imageProfile = data.imageProfile
    },

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

    setOneBlog(state, data){
      state.oneBlog.name = data.user.name
      state.oneBlog.firstname = data.user.firstname
      state.oneBlog.description = data.description
      state.oneBlog.imageUrl = data.imageUrl
      state.oneBlog.userId = data.userId
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

    updateComment(state, {id, data}){
      const comment = state.comments.find(comm => comm.id === id)
      comment.description = data.description
    },

    deleteComment(state, id){
      const comments = state.comments.filter(comment => comment.id !== id)
      state.comments = comments
    },

    errorComment(state, error){
      state.errorComment = error
    }
  },

  getters: {
    getUsersForAdmin(state){
      return state.listUsersAdmin
    },

    getUser(state){
      return state.user
    },

    getBlogs(state){
      return state.blogs
    },

    getOneBlog(state){
        return state.oneBlog
    },

    getComments(state){
      return state.comments
    }
  }
})

export default store