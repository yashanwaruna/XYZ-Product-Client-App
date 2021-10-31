<template>
  <div class="mt-3">
    <div class="container mt-5">
       <h1>Admin</h1> 
       <h6>Posts</h6> 
        <div class="d-flex justify-content-center row card">
            <div class="col-md-12" v-for="post in posts" :key="post.id">
                <div class="d-flex flex-column comment-section">
                    <div class="bg-white p-2">
                        <div class="d-flex flex-row user-info">
                            <div class="d-flex flex-column justify-content-start ml-2">
                              <span class="d-block font-weight-bold name">{{post.user.name}}</span>
                              <span class="date text-black-50">Created At -{{post.created_at}}</span>
                            </div>
                        </div>
                        <div class="mt-2">
                            <p class="comment-text">{{post.description}}</p>
                            <label v-if="post.status == 0">Status: <span class="btn btn-sm btn-secondary">Pending</span></label>
                            <label v-if="post.status == 1">Status: <span class="btn btn-sm btn-success">Approved</span></label>
                            <label v-if="post.status == 2">Status: <span class="btn btn-sm btn-warning">Rejected</span></label>
                        </div>
                        <hr/>
                        <div class="mt-2">
                          <button v-if="post.status == 0" class="btn btn-primary btn-sm shadow-none m-2" type="button" @click='approveRejectPost(post.id,1)'>Approve</button>
                          <button v-if="post.status == 0" class="btn btn-warning btn-sm shadow-none m-2" type="button" @click='approveRejectPost(post.id,2)'>Reject</button>
                          <button v-if="post.is_editable" class="btn btn-danger btn-sm shadow-none m-2" type="button" @click='deletePost(post.id)'>Delete</button>
                        </div>        
                    </div>
                </div>
                <hr/>
            </div>
            <div class="pt-4">
        <div class="d-flex flex-row user-info">
          <div class="d-flex flex-column justify-content-start ml-2">
            <b class="d-block font-weight-bold name">Add New Post</b>
          </div>
        </div>
        <div class="bg-light p-2">
          <div class="d-flex flex-row align-items-start">
            <textarea class="form-control ml-1 shadow-none textarea" id="newpost"></textarea>
          </div>
          <div class="mt-2 text-right">
            <button class="btn btn-primary btn-sm shadow-none m-2" type="button" @click='addPost()'>Post</button>
          </div>
        </div>
      </div>
        </div>    
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios";
import $ from "jquery";
import Swal from 'sweetalert2'

export default {
  name: "Admin",  
  computed: {
    ...mapGetters(['user'])
  },
  data() {  
    return {      
      posts: []
    }
  },
  mounted(){
    this.getPosts();
  },
  methods: {
    getPosts() {
      axios.get('posts').then((response) => {
        this.posts = response.data.data;
      }).catch(error => {
        console.log(error)
      })
    },  
    addPost(){
      axios.post('posts',{
        description:$('#newpost').val()
      }).then((response) => {
        if(response.status == 200){
          this.getPosts();
          $('#newpost').val('')
        }
      }).catch(error => {
        console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Validation Error.',
            text: 'Please add a post.'          
          })
      })
    },
    deletePost(postId){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('posts/'+postId).then((response) => {
            if(response.status == 200){
              this.getPosts();            
            }
          }).catch(error => {
            console.log(error)
          })        
        }
      })
    },
    approveRejectPost(postId,status){
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put('posts/'+postId,{
            status:status
          }).then((response) => {
            if(response.status == 200){
              this.getPosts();            
            }
          }).catch(error => {
            console.log(error)
          })        
        }
      })
    }
  }
}
</script>

<style scoped>

</style>