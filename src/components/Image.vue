<template>
    <div class="image-wrapper">

        <!-- upload input -->
        <div class="upload" v-if="!image">
            <input type="file" @change="onFileChange" accept=".jpeg" class="custom-input">
        </div>

        <!-- image container -->
        <div v-else class="image-block">
            <div class="img-wrapper" id="wrapper">

                <!-- image -->
                <img :src="image" class="img"/>

                <!-- faces -->
                <Face v-for="(item, index) in faces" :key="index" :index="index" :face="item" @savePerson="loadPerson"/>
            </div>

            <!-- delete image -->
            <button @click="removeImage" class="delete-btn">Remove image</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Face from '@/components/Face'
export default {
    components: {
        Face
    },
    data() {
        return {
            image: null,
            imageFile: null,
            faces: null
        }
    },
    methods: {
        //image input listener
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        //set image files
        createImage(file) {
            var reader = new FileReader();
            this.imageFile = file;
            reader.onload = (e) => {
                this.image = e.target.result;
            };
            this.uploadImage();
            reader.readAsDataURL(file);
        },
        //delete image
        removeImage() {
            this.image = null,
            this.imageFile = null,
            this.faces = null
        },
        //send image to server
        uploadImage() {
            let file = this.imageFile
            axios.post('api/v1/detect?demographics=true', file, {headers: {
                        "Content-Type": "image/jpeg"}
                })
                .then(res => {
                    console.log('image uploaded', res)
                    this.faces = res.data.data
                })
                .catch(err => {
                    console.log("upload err", err)
                })
        },
        //upload person data to server
        loadPerson() {
            let person = this.$store.getters.getFace
            let dbID = this.$store.getters.getDB
            axios.post('api/v1/persons',
                    {
                        data: person,
                        database_id: dbID
                    },
                    {headers: {
                        "Content-Type": "application/json"}
                })
                .then(res => {
                    console.log('person uploaded')
                    let id = res.data.data.id
                    console.log('person id', id)
                    this.loadCoords(id)
                })
                .catch(err => {
                    console.log("person upload err", err)
                })
        },
        //upload face coordinates to server
        loadCoords(id) {
            let coords = this.$store.getters.getFaceCoord
            console.log('loadCoords', coords)
            let file = this.imageFile
            axios.post(`api/v1/photos?face=${coords}&person_id=${id}`,
                    file,
                    {headers: {
                        "Content-Type": "image/jpeg"}
                })
                .then(res => {
                    console.log('person image uploaded')
                    this.$emit('refresh')
                })
                .catch(err => {
                    console.log("upload err coords", err)
                })
        }
    },
}
</script>

<style lang="scss" scoped>
.image-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    min-height: 50vh;
}

.image-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.img-wrapper {
    position: relative;
    width: max-content;
    height: max-content;
}

.img {
    width: 100%;
    box-sizing: border-box;
}

.custom-input {
    width: 130px;
}
.custom-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-input::before {
  content: 'Select some files';
  display: inline-block;
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-input:hover::before {
  border-color: black;
}
.custom-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

.delete-btn {
    font-size: 16px;
    font-weight: 500;
    padding: 5px 20px;
}
</style>