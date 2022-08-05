<template>
  <div>
<commonListVue :API="getFavList" :params="{user_id:$store.state.uid}">
     <template #default="{list}">
            <li v-for="item in list" :key="item"> 
            {{item}}
            </li>
     </template>
</commonListVue>

  </div>
</template>

<script>
import commonListVue from '@/components/commonList.vue'
import {getFavList} from '@/api/api'
export default {
    components:{
commonListVue
    },
   data(){
    return {
        getFavList
    }
   }
}
</script>

<style>

</style>