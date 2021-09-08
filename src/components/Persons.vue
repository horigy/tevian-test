<template>
    <div class="persons-wrapper">

        <!-- list of saved persons -->
        <ul class="persons-list">

            <!-- components with person data -->
            <Person v-for="(person, index) in persons" :key="index" :person="person" @refresh="listPersons"/>

        </ul>

    </div>
</template>

<script>
import axios from 'axios'
import Person from '@/components/Person'
export default {
    components: {
        Person
    },
    data() {
        return {
            persons: []
        }
    },
    methods: {
        //request to get saved persons from DB
        listPersons() {
            console.log('listing persons')
            let dbID = this.$store.getters.getDB
            axios.get(`/api/v1/databases/${dbID}/persons`,
                {headers: {
                    "Content-Type": "application/json"}
                })
                .then(res => {
                    this.persons = res.data.data
                })
                .catch( err => console.log("err-getPersons", err))
        }
    },
}
</script>

<style lang="scss" scoped>
.persons-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    min-height: 50vh;
}
.persons-list {
    width: 100%;
}
</style>