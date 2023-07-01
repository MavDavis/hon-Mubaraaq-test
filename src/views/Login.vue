
<template>
  <div class="body">
    <div class="light x1"></div>
    <div class="light x2"></div>
    <div class="light x3"></div>
    <div class="light x4"></div>
    <div class="light x5"></div>
    <div class="light x6"></div>
    <div class="light x7"></div>
    <div class="light x8"></div>
    <div class="light x9"></div>

    <Loading v-if="$store.state.loading" />
    <div
      class="py-7 login flex justify-center sm:justify-between items-center min-h-screen relative z-50"
    >
     
 <div class="w-full md:w-1/2">
  <div class="w-full md:w-3/4">
    <p class="text-sm text-white text-center">
       Don't have an account?
        <router-link
          class="text-lg ml-1 z-50 text-white font-semibold underline hover:tracking-wider"
          :to="{ name: 'Register' }"
          >Register
        </router-link>
      </p>
      <h1 class="font-semibold tracking-wider text-white text-xl text-center">
Login          </h1>
  </div>
      <div class="w-full">
      <form class="px-5 pt-6 pb-8 mb-4 w-full md:w-3/4">
        <p
          v-if="$store.state.error"
          class="
            error
            text-center text-white
            mb-2
            text-sm
            tracking-wide
            font-semibold
          "
        >
          {{ $store.state.errMssg }}
        </p>
        <div class="mb-4 relative">
          <i class="fas fa-envelope absolute top-3 left-3 text-dark z-10"></i>
          <input
            class="
              bg-gray-100
              appearance-none
              border
              rounded
              w-full
              py-2
              px-8
              text-black
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            v-model="$store.state.User.userEmail"
            type="email"
            required
            placeholder="Email"
          />
        </div>
        <div class="mb-4 relative">
          <i class="fas fa-lock absolute top-3 left-3 text-dark z-10"></i>
          <input
            type="checkbox"
            @click="toggledInputField"
            class="absolute top-3 right-3 z-10"
          />
          <input
            class="
              appearance-none
              bg-gray-100
              rounded
              w-full
              py-2
              px-8
              text-dark
              mb-3
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            v-model="$store.state.User.userPassWord"
            :type="inputField"
            placeholder="Password"
          />
        </div>
        <div class="flex flex-col items-center justify-between">
          <button
            @click="Login()"
            class="
              bg-black
              hover:tracking-wider
              text-white
              font-bold
              py-2
              px-4
              rounded-full
              focus:outline-none focus:shadow-outline
            "
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div> 
      <div class="hidden sm:block w-1/2 bg-img">
        <div class="w-full h-full relative"></div>
      </div>
    </div>
  </div>
</template>
  
 
<script>

import Loading from "../components/Loading.vue";
export default {
    data() {
        return {
          loading:false,
            inputField:'password'
        };
    },
    components:{
      Loading
    },
//     created(){
// if(localStorage.getItem('userid') != undefined){
// this.$router.push('/user')
// }
    // },
    methods: {
      toggledInputField() {
            if (this.inputField == "password") {
                this.inputField = "text";
            }
            else {
                this.inputField = "password";
            }},
       Login() {
         
           this.$store.commit('Login')
            
        
           
           
    },
  },
}
</script>
  
<style scoped>

.body {
  margin: 0;
  height: 100vh;
  width:100vw;
  font-weight: 100;
  background: skyblue;
  -webkit-overflow-y: hidden;
  -moz-overflow-y: hidden;
  -o-overflow-y: hidden;
  overflow-y: hidden;
  -webkit-animation: fadeIn 1 1s ease-out;
  -moz-animation: fadeIn 1 1s ease-out;
  -o-animation: fadeIn 1 1s ease-out;
  animation: fadeIn 1 1s ease-out;
}

.light {
  position: absolute;
  width: 0px;
  opacity: 0.75;
  background-color: #fff;
  box-shadow: #fff 0px 0px 20px 2px;
  opacity: 0;
  top: 100vh;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
}

.x1 {
  -webkit-animation: floatUp 4s infinite linear;
  -moz-animation: floatUp 4s infinite linear;
  -o-animation: floatUp 4s infinite linear;
  animation: floatUp 4s infinite linear;
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}

.x2 {
  -webkit-animation: floatUp 7s infinite linear;
  -moz-animation: floatUp 7s infinite linear;
  -o-animation: floatUp 7s infinite linear;
  animation: floatUp 7s infinite linear;
  -webkit-transform: scale(1.6);
  -moz-transform: scale(1.6);
  -o-transform: scale(1.6);
  transform: scale(1.6);
  left: 15%;
}

.x3 {
  -webkit-animation: floatUp 2.5s infinite linear;
  -moz-animation: floatUp 2.5s infinite linear;
  -o-animation: floatUp 2.5s infinite linear;
  animation: floatUp 2.5s infinite linear;
  -webkit-transform: scale(0.5);
  -moz-transform: scale(0.5);
  -o-transform: scale(0.5);
  transform: scale(0.5);
  left: -15%;
}

.x4 {
  -webkit-animation: floatUp 4.5s infinite linear;
  -moz-animation: floatUp 4.5s infinite linear;
  -o-animation: floatUp 4.5s infinite linear;
  animation: floatUp 4.5s infinite linear;
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
  left: -34%;
}

.x5 {
  -webkit-animation: floatUp 8s infinite linear;
  -moz-animation: floatUp 8s infinite linear;
  -o-animation: floatUp 8s infinite linear;
  animation: floatUp 8s infinite linear;
  -webkit-transform: scale(2.2);
  -moz-transform: scale(2.2);
  -o-transform: scale(2.2);
  transform: scale(2.2);
  left: -57%;
}

.x6 {
  -webkit-animation: floatUp 3s infinite linear;
  -moz-animation: floatUp 3s infinite linear;
  -o-animation: floatUp 3s infinite linear;
  animation: floatUp 3s infinite linear;
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  transform: scale(0.8);
  left: -81%;
}

.x7 {
  -webkit-animation: floatUp 5.3s infinite linear;
  -moz-animation: floatUp 5.3s infinite linear;
  -o-animation: floatUp 5.3s infinite linear;
  animation: floatUp 5.3s infinite linear;
  -webkit-transform: scale(3.2);
  -moz-transform: scale(3.2);
  -o-transform: scale(3.2);
  transform: scale(3.2);
  left: 37%;
}

.x8 {
  -webkit-animation: floatUp 4.7s infinite linear;
  -moz-animation: floatUp 4.7s infinite linear;
  -o-animation: floatUp 4.7s infinite linear;
  animation: floatUp 4.7s infinite linear;
  -webkit-transform: scale(1.7);
  -moz-transform: scale(1.7);
  -o-transform: scale(1.7);
  transform: scale(1.7);
  left: 62%;
}

.x9 {
  -webkit-animation: floatUp 4.1s infinite linear;
  -moz-animation: floatUp 4.1s infinite linear;
  -o-animation: floatUp 4.1s infinite linear;
  animation: floatUp 4.1s infinite linear;
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
  -o-transform: scale(0.9);
  transform: scale(0.9);
  left: 85%;
}

button:focus {
  outline: none;
}

@-webkit-keyframes floatUp {
  0% {
    top: 100vh;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    top: 0vh;
    opacity: 0.8;
  }
  75% {
    opacity: 1;
  }
  100% {
    top: -100vh;
    opacity: 0;
  }
}
@-moz-keyframes floatUp {
  0% {
    top: 100vh;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    top: 0vh;
    opacity: 0.8;
  }
  75% {
    opacity: 1;
  }
  100% {
    top: -100vh;
    opacity: 0;
  }
}
@-o-keyframes floatUp {
  0% {
    top: 100vh;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    top: 0vh;
    opacity: 0.8;
  }
  75% {
    opacity: 1;
  }
  100% {
    top: -100vh;
    opacity: 0;
  }
}
@keyframes floatUp {
  0% {
    top: 100vh;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    top: 0vh;
    opacity: 0.8;
  }
  75% {
    opacity: 1;
  }
  100% {
    top: -100vh;
    opacity: 0;
  }
}

.header {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Roboto", sans-serif;
  font-weight: 200;
  color: #fff;
  font-size: 2em;
}

#head1,
#head2,
#head3,
#head4,
#head5 {
  opacity: 0;
}

#head1 {
  -webkit-animation: fadeOut 1 5s ease-in;
  -moz-animation: fadeOut 1 5s ease-in;
  -o-animation: fadeOut 1 5s ease-in;
  animation: fadeOut 1 5s ease-in;
}

#head2 {
  -webkit-animation: fadeOut 1 5s ease-in;
  -moz-animation: fadeOut 1 5s ease-in;
  -o-animation: fadeOut 1 5s ease-in;
  animation: fadeOut 1 5s ease-in;
  -webkit-animation-delay: 6s;
  -moz-animation-delay: 6s;
  -o-animation-delay: 6s;
  animation-delay: 6s;
}

#head3 {
  -webkit-animation: fadeOut 1 5s ease-in;
  -moz-animation: fadeOut 1 5s ease-in;
  -o-animation: fadeOut 1 5s ease-in;
  animation: fadeOut 1 5s ease-in;
  -webkit-animation-delay: 12s;
  -moz-animation-delay: 12s;
  -o-animation-delay: 12s;
  animation-delay: 12s;
}

#head4 {
  -webkit-animation: fadeOut 1 5s ease-in;
  -moz-animation: fadeOut 1 5s ease-in;
  -o-animation: fadeOut 1 5s ease-in;
  animation: fadeOut 1 5s ease-in;
  -webkit-animation-delay: 17s;
  -moz-animation-delay: 17s;
  -o-animation-delay: 17s;
  animation-delay: 17s;
}

#head5 {
  -webkit-animation: finalFade 1 5s ease-in;
  -moz-animation: finalFade 1 5s ease-in;
  -o-animation: finalFade 1 5s ease-in;
  animation: finalFade 1 5s ease-in;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  -webkit-animation-delay: 22s;
  -moz-animation-delay: 22s;
  -o-animation-delay: 22s;
  animation-delay: 22s;
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-o-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}

@-o-keyframes fadeOut {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes finalFade {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes finalFade {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes finalFade {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

@keyframes finalFade {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  80% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}

#footer {
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  color: white;
  position: fixed;
  -webkit-transform: translate(95vw, 90vh);
  -moz-transform: translate(95vw, 90vh);
  transform: translate(95vw, 90vh);
  transform: translate(95vw, 90vh);
}
.absolute {
}
.absolute-two {
  position: absolute;

  background: rgba(0, 0, 0, 0.6);
}
</style>
