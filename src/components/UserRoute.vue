<template>
  <section
    class="h-full w-full relative flex flex-col items-center justify-center md:py-0 py-11"
  >
    <div
      class="rounded h-fit w-full relative px-5 py-4 bg-white mb-16 flex big-div xmd:flex-row flex-col items-center"
    >
      <div
        class="relative h-full flex sm:flex-row flex-col justify-center items-start w-fit md:mr-5"
      >
        <div
          class="relative sm:w-40 sm:h-40 w-36 h-36 bg-gray-200 rounded-full flex justify-center items-center"
        >
          <input
            type="file"
            name="inputTag"
            id="inputTag"
            class="inputTag hidden"
            ref="photoTweet"
            @change="FileChanged()"
            accept=".jpg, .png, .jpeg"
          />
          <label for="inputTag">
            <i
              v-if="!$store.state.User.profileImage"
              class="fas fa-user relative text-white sm:text-8xl text-7xl cursor-pointer"
            ></i>
            <img
              :src="$store.state.User.profileImage"
              alt=""
              v-else
              class="relative sm:w-40 sm:h-40 w-36 h-36 object-cover rounded-full"
            />

            <i
              class="fas fa absolute fa-camera bg-gray-300 text-white px-2 py-1 cursor-pointer text-xl rounded-full right-3 bottom-0"
            ></i>
          </label>
        </div>

        <div
          class="relative sm:h-40 h-20 flex justify-center items-center ml-4 sm:items-start flex-col"
        >
          <h4 class="username md:text-2xl sm:text-xl">
            {{ $store.state.User.userName }}
          </h4>
          <p class="text-xs font-bold">User</p>
        </div>
      </div>
      <div
        class="xmd:border-x border-x-0 border-y xmd:border-y-0 h-full relative profile-detail flex py-5 xmd:py-0 px-4 mt-4 xmd:mt-0 flex-col justify-center"
      >
        <p class="text-xs mb-5">
          <span><i class="fas fa-envelope text-black mr-3"></i> </span>
          {{ $store.state.User.userEmail }}
        </p>
        <p @click="edit()" class="cursor-pointer text-xs mb-5">
          <span><i class="fas fa-phone text-black mr-3"></i> </span> Phone
          number : {{ $store.state.User.phoneNumber }}
        </p>
        <p class="text-xs mb-5">
          <span><i class="fas fa-user text-black mr-3"></i> </span>
          {{ $store.state.User.matricNom }}
        </p>
        <p
          @click="edit()"
          class="cursor-pointer hover:tracking-wider text-xs mb-5"
        >
          <span><i class="fas fa-light fa-gear text-black mr-3"></i> </span>
          Edit Profile
        </p>
      </div>

      <div class="h-full relative">
        <div class="xmd:w-56 w-full relative"></div>
      </div>
    </div>
    <!-- profile -->
    <Profile />
    <!-- setting -->
    <p v-if="$store.state.saved" class="text-green-600 font-bold mb-3"> saved data</p>
    <div
      v-if="$store.state.settings"
      class="card-div flex w-full justify-between h-1/2"
    >
      <div
        class="profile relative flex w-full bg-white h-fit items-center justify-center"
      >
        <div
          class="px-5 flex flex-col justify-center mb-10 items-center w-full md:w-3/4"
        >
          <h1
            class="md:text-2xl sm:text-xl text-sm text-dark tracking-wider flex justify-center mt-3"
          >
            Account Setting
          </h1>
          <div class="bg-gray-200 rounded p-4 mt-4 w-full relative">
            <div class="flex items-center justify-center flex-col">
              <div
                class="bg-dark text-white p-1 mb-2 rounded-full w-fit h-fit cursor-pointer"
              >
                <span>{{ $store.state.UserInitials }}</span>
              </div>
              <div
                class="bg-dark text-white px-2 py-1 mb-2 rounded w-fit h-fit cursor-pointer"
              >
                <h1 class="text-white font-semibold text-sm">
                  <i class="fas fa-user mr-2 text-white text-sm"></i>User
                </h1>
              </div>
            </div>
            <div
              class="flex w-full relative flex-col items-center justify-center"
            >
              <div
                class="mb-4 relative flex w-full sm:flex-row flex-col items-center justify-between"
              >
                <div class="left w-full sm:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Username</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    v-model="$store.state.User.userName"
                    type="text"
                  />
                </div>
                <div class="right w-full sm:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Phone number</label
                  >
                  <input

                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    v-model="$store.state.User.phoneNumber"
                  />
                </div>
              </div>

              <div
                class="mb-4 relative flex w-full sm:flex-row flex-col items-center justify-between"
              >
                <div class="left w-full sm:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Email</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="$store.state.User.userEmail"
                    disabled
                    type="text"
                  />
                </div>
                <div class="right w-full sm:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Matric Number</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                    disabled
                    v-model="$store.state.User.matricNom"
                  />
                </div>
              </div>
              <div
                class="mb-4 relative flex w-full sm:flex-row flex-col items-center justify-between"
              >
                <div class="left w-full">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                  >
                    Upload Profile Picture</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    accept=".jpg, .png, .jpeg"

                    ref="photoTweet2"
                    @change="FileChanged2()"
                  />
                </div>
              </div>
              <button
                @click="changeUserDetails()"
                class="mb-4 relative text-black hover:tracking-wider px-6 py-3 bg-white text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- completeDonations -->
    <div
      v-if="$store.state.completeDonations"
      class="card-div flex w-full justify-between h-1/2"
    >
      <div
        class="profile relative flex w-full bg-white h-fit sm:items-center items-start justify-center pb-6"
      >
        <div
          class="px-5 flex flex-col justify-center items-center w-full md:w-3/4"
        >
          <h1
            class="md:text-2xl sm:text-xl text-sm text-dark tracking-wider flex justify-center mt-3"
          >
            Donate
          </h1>
          <div class="bg-gray-200 rounded p-4 mt-4 w-full relative">
            <div class="flex items-center justify-center flex-col"></div>
            <div
              class="flex w-full relative flex-col items-center justify-center"
            >
              <div
                class="mb-4 relative flex w-full md:flex-row flex-col items-center justify-between"
              >
                <div class="left w-full md:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Username</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    v-model="$store.state.User.userName"
                    type="text"
                  />
                </div>
                <div class="right w-full md:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Phone number</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    v-model="this.$store.state.User.phoneNumber"
                    type="number"
                  />
                </div>
              </div>

              <div
                class="mb-4 relative flex w-full md:flex-row flex-col items-center justify-between"
              >
                <div class="left w-full md:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Email</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    v-model="this.$store.state.User.userEmail"
                    type="text"
                  />
                </div>
                <div class="right w-full md:w-1/2">
                  <label
                    class="font-light sm:text-sm text-xs text-dark tracking-wider"
                    for="username"
                    >Amount</label
                  >
                  <input
                    class="bg-gray-100 appearance-none border rounded relative w-full py-2 px-2 text-dark leading-tight focus:outline-none focus:shadow-outline"
                    v-model="number"
                    type="number"
                  />
                </div>
              </div>

              <button
                @click="pay()"
                class="mb-4 relative uppercase text-white hover:tracking-wider px-3 sm:px-6 sm:py-3 py-2 bg-black text-xs"
              >
                Make Payments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- contactUs -->
    <ContactUs />
    <!-- makeDonations -->
 
  </section>
</template>

<script>
import CardThree from "@/components/cardThree.vue";
import VueApexCharts from "vue-apexcharts";
import Profile from "./Profile.vue";
import ContactUs from "./ContactUs.vue";
import Sbchart from "./Sbchart.vue";

export default {
  components: { CardThree, VueApexCharts, Sbchart, Profile, ContactUs },
  data() {
    return {
      file: null,
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
  methods: {
    methods: {
    payWithPaystack(e) {
      let handler = PaystackPop.setup({
        key: "pk_test_b76ad5b6fb6c5e5eb2542439c62606b8bc99f359",
        email: "",
        amount: 5 * 7000,
        ref: "" + Math.floor(Math.random() * 1000000000 + 1),
        onClose: function () {
        },
        callback: function (response) {
          let message = "Payment complete! Reference: " + response.reference;
          // alert(message);
                    localStorage.setItem("receiptItems", JSON.stringify(this.localItems));


        },
      });

      handler.openIframe();
     this.$router.push("/User");

    },
  },
    edit() {
      this.$store.state.settings = true;
      this.$store.state.completeDonations = false;
      this.$store.state.profile = false;
    },
    changeUserDetails(){
      this.$store.commit('changeUserDetails')
    },
    FileChanged() {
      this.file = this.$refs.photoTweet.files[0];
      const filename = this.file.name;
      this.$store.commit("filenameChanged", filename),
        this.$store.commit("createFileUrl", this.file);
      // URL.createObjectURL
    }, FileChanged2() {
      this.file = this.$refs.photoTweet2.files[0];
      const filename2 = this.file.name;
      this.$store.commit("filenameChanged", filename2),
        this.$store.commit("createFileUrl", this.file);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
section {
  min-height: fit-content;
  overflow: visible;
  @media (max-width: 1000px) {
    flex-direction: column;
    display: flex;
    margin-top: 2rem;
  }
}
.big-div {
  display: flex;
  flex-direction: row;
  height: 33%;
  @media (max-width: 1000px) {
    flex-direction: column;
    height: fit-content;
  }
}
.profile-detail {
  width: 14rem;
  @media (max-width: 1000px) {
    width: 100%;
  }
}
.card {
  background: #fff;
  height: 250px;
  transition: all 0.2s ease-in;

  &:last-child {
    margin-right: 0;
  }
}
@media (max-width: 350px) {
  p {
    font-size: 0.6rem;
  }
  .username {
    font-size: 1rem;
  }
}
.vue-apexcharts {
  position: relative;
  min-height: 100% !important;
  height: 100% !important;
}
.apexcharts-canvas {
  width: 100% !important;
  height: 100% !important;
  position: relative;
}
.apexcharts-svg {
  max-width: 100% !important;
  position: relative;
  max-height: 100% !important;
}
.btn-border {
  margin-top: auto;
  &:hover {
    border: 1px solid #000;
  }
}
</style>
