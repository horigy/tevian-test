<template>
    <div class="person-wrapper">

        <!-- person photo -->
        <div class="person-img" :id="photoID">

        </div>

        <!-- person data -->
        <div class="person-data">
            <span>First Name: {{person.data.name}}</span>
            <span>Surname: {{person.data.surname}}</span>
            <span>Last Name: {{person.data.lastname}}</span>
            <span>Gender: {{person.data.gender}}</span>
        </div>

        <!-- update/delete -->
        <div class="controls">
            <button class="change" @click="changePerson">Change</button>
            <button class="delete" @click="deletePerson">Delete</button>
        </div>

        <!-- modal for updating person data -->
        <div class="person-modal" v-if="showModal">

            <!-- update form -->
            <form @submit.prevent="savePerson">
                <h5>Person:</h5>
                <label>Name</label>
                <input type="text" v-model="newPerson.name" required>
                <label>Surname</label>
                <input type="text" v-model="newPerson.surname" required>
                <label>Last Name</label>
                <input type="text" v-model="newPerson.lastname" required>
                <label>Gender</label>
                <input type="text" v-model="newPerson.gender" required>
                <div class="btns">
                    <button class="save" type="submit">Save</button>
                    <button class="close" @click="close">Close</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        person: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showModal: false,
            newPerson: {},
            photoID: null,
        }
    },
    //get list of photos
    created() {
        console.log(this.person.id)
        axios.get(`/api/v1/persons/${this.person.id}/photos?page=0&per_page=1`, {headers: {
                "Content-Type": "application/json"}
            })
            .then(res => {
                let picData = res.data.data[0]
                if(picData) {
                    this.photoID = picData.id
                    this.getPicById()
                }
            })
            .catch( err => console.log("err get person pic", err))
    },
    methods: {
        //show modal to change person data
        changePerson() {
            this.newPerson = {
                name: this.person.data.name,
                surname: this.person.data.surname,
                lastname: this.person.data.lastname,
                gender: this.person.data.gender
            }
            this.showModal = true
        },
        //save updated person data
        savePerson() {
            console.log(this.newPerson)
            axios.post(`api/v1/persons/${this.person.id}`,
                    {data: this.newPerson},
                    {headers: {
                        "Content-Type": "application/json"}
                })
                .then(res => {
                    console.log('person changed', res)
                    this.showModal = false
                    this.newPerson = {}
                    this.$emit('refresh')
                })
                .catch(err => {
                    console.log("person change err", err)
                })
        },
        //delete person from server
        deletePerson() {
            axios.delete(`api/v1/persons/${this.person.id}`)
                .then(res => {
                    console.log('person deleted', res)
                    this.showModal = false
                    this.newPerson = {}
                    this.$emit('refresh')
                })
                .catch(err => {
                    console.log("person change err", err)
                })
        },
        //close modal without updating data
        close() {
            this.showModal = false
            this.newPerson = {}
        },
        //get person image from server
        getPicById() {
            let photoId = this.photoID
            console.log('ph id 2', photoId)
            axios.get(`/api/v1/photos/${photoId}/image/face`, {headers: {
                    "Content-Type": "application/json"}
                })
                .then(res => {
                    let imgsrc = "data:image/jpeg;base64," + res.data;
                    let newImg = new Image();
                    newImg.src = imgsrc;
                    document.getElementById(`${this.photoID}`).appendChild(newImg);
                })
                .catch( err => console.log("err get person pic img", err))
        }
    },
}
</script>

<style lang="scss" scoped>
.person-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
}
.person-img {
    width: 300px;
    height: 300px;
}
.person-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-left: 20px;
    align-items: flex-start;

    & span {
        margin-bottom: 15px;
    }
}
.controls {
    display: flex;
    flex-direction: column;
}
button {
    font-size: 16px;
    font-weight: 500;
    width: 100px;
    padding: 5px;
    margin-bottom: 15px;
}
form {
    width: 300px;
    height: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: white;
    border: 1px solid blue;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;

    & h5 {
        font-weight: 600;
        font-size: 18px;
    }

    & * {
        margin-bottom: 5px;
        width: 100%;

        &:last-child {
            margin-bottom: 0;
        }
    }

    & input {
        border: 1px solid blue;
        border-radius: 5px;
        padding: 3px;
    }

    & .btns {
        margin-top: 10px;
    }

    & button {
        padding: 3px;
        width: 70%;
        margin: 3px auto;
        background-color: blue;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
    }
}
</style>