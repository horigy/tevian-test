<template>

  <div class="wrapper">

    <!-- add & analize images -->
    <ImageBlock @refresh="updatePersons"/>

    <!-- list data from DB -->
    <Persons ref="persons"/>
  </div>
</template>

<script>
import axios from 'axios'
import ImageBlock from '@/components/Image'
import Persons from '@/components/Persons'
export default {
  components: {
    ImageBlock,
    Persons
  },
  data() {
    return {
      token: "",
      user: "",
      database: "",
      image: "",
      imageFile: null,
      faces: null
    }
  },
  //get user token and DB id
  created() {
    this.database = ""
    this.user = localStorage.getItem('tevian-user')
    if(this.user) {
      this.listDB()
    }

  },
  methods: {
    //get DB id
    listDB() {
      axios.get('/api/v1/databases?page=0&per_page=1', {headers: {
                "Content-Type": "application/json"}
        })
        .then(res => {
          let a = res.data.pagination.total_items
          console.log('db-num', a)
          if(!a) {
            console.log('creating DB')
            this.createDB()
          } else {
            console.log('db id', res.data.data[0].id)
            this.database = res.data.data[0].id
            this.$store.dispatch('setDB', this.database)
            this.updatePersons()
          }
        })
        .catch( err => console.log("err get DB", err))
    },
    // create DB if not found
    createDB() {
      axios.post('api/v1/databases', {"data": {}}, {headers: {
                "Content-Type": "application/json"}
        })
        .then(res => {
          console.log('new db id', res.data.data.id)
          this.database = res.data.data.id
          this.$store.dispatch('setDB', this.database)
          this.updatePersons()
        })
        .catch( err => console.log("err create DB", err))
    },
    // request persons data from DB
    updatePersons() {
      this.$refs.persons.listPersons()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
