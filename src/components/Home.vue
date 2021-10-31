<template>
  <div class="mt-3">
    <div v-if="this.role == 1">
		<Admin/>
    </div>
    <div v-if="this.role == 2">
		<User/>
    </div>
  </div>
</template>

<script>
//import {mapGetters} from 'vuex'
import Admin from "@/components/Admin";
import User from "@/components/User";
export default {
  name: "Home", 
  components: {
    Admin,
    User,
  },
  data() {
	return {
		role:localStorage.getItem('role')
	}
  }
}
</script>

<style scoped>

</style>