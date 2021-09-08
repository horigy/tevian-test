<template>
    <div class="modal">
        <div class="modal-content">

            <!-- modal icons -->
            <div class="check" v-if="checkCross">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <path style="fill:#1E90FF;" d="M225.882,331.294c-7.981-0.03-15.616-3.223-21.233-8.885l-45.176-45.176
                    c-11.761-11.761-11.761-30.856,0-42.616s30.856-11.761,42.616,0l25.449,25.449l84.179-72.132
                    c13.809-9.276,32.527-5.587,41.788,8.222c7.695,11.475,6.611,26.699-2.635,36.954l-105.412,90.353
                    C240.083,328.343,233.141,331.128,225.882,331.294z"/>
                    <path style="fill:#166CBF;" d="M256,512C114.613,512,0,397.387,0,256S114.613,0,256,0s256,114.613,256,256S397.387,512,256,512z
                    M256,60.235C147.878,60.235,60.235,147.878,60.235,256S147.878,451.765,256,451.765S451.765,364.122,451.765,256
                    S364.122,60.235,256,60.235z"/>
                </svg>
            </div>
            <div class="cross" v-else>
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0" fill="#f44336"/>
                    <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" fill="#fafafa"/>
                </svg>
            </div>

            <!-- modal message -->
            <p>
               {{changeMessage()}}
            </p>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        created: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            checkCross: null
        }
    },
    methods: {
        //insert modal message
        changeMessage() {
            if(this.created == 'success') {
                this.checkCross = true
                setTimeout(() => this.$router.push('login'), 3000)
                return 'New user created! Login now.'
            } else if (this.created == 'fail') {
                this.checkCross = false
                setTimeout(() => this.$emit('fail'), 3000)
                return 'Invalid data! Try again'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;

    & svg {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
    }
}
</style>