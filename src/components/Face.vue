<template>
    <div class="face-wrapper">

        <!-- face frame -->
        <div class="face" :id="id" @click="inputData"></div>

        <!-- modal for data -->
        <div class="face-modal" v-if="showInput">

            <!-- form for face data -->
            <form @submit.prevent="savePerson">
                <h5>Person:</h5>
                <label>Name</label>
                <input type="text" v-model="faceData.name" required>
                <label>Surname</label>
                <input type="text" v-model="faceData.surname" required>
                <label>Last Name</label>
                <input type="text" v-model="faceData.lastname" required>
                <label>Gender</label>
                <select v-model="faceData.gender">
                    <option value="male">male</option>
                    <option value="female">female</option>
                </select>
                <div class="btns">
                    <button class="save" type="submit">Save</button>
                    <button class="close" @click="close">Close</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        face: {
            type: Object,
            requred: true
        },
        index: {
            requred: true
        }
    },
    data() {
        return {
            id: null,
            showInput: false,
            faceData: {
                name: "",
                surname: "",
                lastname: "",
                gender: "",
            },
            faceArr: []
        }
    },
    //set id for face positioning
    created() {
        this.id = this.index + 1
    },
    //set face position and size
    mounted() {
        let newEl = document.getElementById(this.id)
        let h = this.face.bbox.height
        let w = this.face.bbox.width
        let posX = this.face.bbox.x
        let posY = this.face.bbox.y
        this.faceArr = [posX, posY, w, h]
        newEl.style.position = 'absolute'
        newEl.style.left = posX + "px"
        newEl.style.top = posY + "px"
        newEl.style.width = w + "px"
        newEl.style.height = h + "px"
        newEl.style.border = "1px solid yellow"
    },
    methods: {
        //display modal to input data
        inputData() {
            this.faceData.gender = this.face.demographics.gender
            this.showInput = true
        },
        //save data from form and upload
        savePerson() {
            this.$store.dispatch('setFace', this.faceData)
            console.log('face setcoords', this.faceArr)
            this.$store.dispatch('setFaceCoord', this.faceArr)
            this.$emit('savePerson')
            this.showInput = false
            this.faceData = {
                name: "",
                surname: "",
                lastname: "",
                gender: ""
            }
            this.faceArr = []
        },
        //close modal and reset form
        close() {
            this.showInput = false
            this.faceData = {
                name: "",
                surname: "",
                lastname: "",
                gender: ""
            }
            this.faceArr = []
        }
    }
}
</script>

<style lang="scss" scoped>
.face {
    cursor: pointer;
}


form {
    width: 300px;
    height: 370px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: white;
    border: 1px solid #1C8EF9;
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
        border: 1px solid #1C8EF9;
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
        background-color: #1C8EF9;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
    }
}
</style>