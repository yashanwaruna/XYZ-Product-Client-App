<template> 
  <div class="container mt-5">
   <h5>Posts</h5>
   <div class="bg-light p-2">
		<div class="d-flex flex-row align-items-start col-md-8">
			<input type="text" class="form-control ml-1 shadow-none" v-model="search_text"/>
			<button class="btn btn-primary btn-sm shadow-none m-2" type="button" @click='search()'>Search</button>
		</div>		
	</div>	
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
                    </div>
                    <div class="mt-2" v-if="post.is_editable">
						<button class="btn btn-danger btn-sm shadow-none m-2" type="button" @click='deletePost(post.id)'>Delete</button>
					</div>
                    <h6>Comments</h6>
                    <div class="card">						
						<div class="col-md-12" v-for="comment in post.comments" :key="comment.id">
							<div class="bg-white p-2">
								<div class="d-flex flex-row user-info">
									<div class="d-flex flex-column justify-content-start ml-2">
										<span class="d-block font-weight-bold name">{{comment.user.name}}</span>
										<span class="date text-black-50">Created At -{{comment.created_at}}</span>
									</div>
								</div>
								<div class="mt-2">
									<p class="comment-text">{{comment.description}}</p>
								</div>
								<div class="mt-2" v-if="comment.is_editable">
									<button class="btn btn-danger btn-sm shadow-none m-2" type="button" @click='deleteComment(comment.id)'>Delete</button>
								</div>
								<hr/>					
							</div>						
						</div>
					</div>      					
                </div>                         
                <div class="bg-light p-2">
                    <div class="d-flex flex-row align-items-start">
						<textarea class="form-control ml-1 shadow-none textarea" :id="'comment'+post.id"></textarea>
                    </div>
                    <div class="mt-2 text-right">
						<button class="btn btn-primary btn-sm shadow-none m-2" type="button" @click='addComment(post.id)'>Comment</button>
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
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios";
import $ from "jquery";
import Swal from 'sweetalert2'

export default {
  name: "User",
  computed: {
    ...mapGetters(['user'])
  },
  data() {	
    return {      
      posts: [],
      search_text:''
    }
  },
  mounted(){
	this.getPosts();
  },
  methods: {
    getPosts(text='') {
      axios.get('posts/?param='+text).then((response) => {
        this.posts = response.data.data;
      }).catch(error => {
        console.log(error)
      })
    },
	addComment(postId){
		axios.post('comments',{
			description:$('#comment'+postId).val(),
			post_id:postId
		}).then((response) => {
			if(response.status == 200){
				this.getPosts();
				$('#comment'+postId).val('')
			}
		}).catch(error => {
			console.log(error)
			Swal.fire({
				icon: 'error',
				title: 'Validation Error.',
				text: 'Please add a comment'          
			})
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
				text: 'Please add a post'          
			})
		})
	},
	deleteComment(commentId){
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
				axios.delete('comments/'+commentId).then((response) => {
					if(response.status == 200){
						this.getPosts();						
					}
				}).catch(error => {
					console.log(error)
				})				
			}
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
	search(){
		this.getPosts(this.search_text);
	}
  }
}
</script>

<style scoped>

</style>