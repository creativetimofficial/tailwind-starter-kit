<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      <button
        class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <a
        class="md:block md:text-center md:pb-4 text-gray-900 mr-0 inline-block whitespace-no-wrap text-xl"
        href="javascript:void(0)"
      >
        <img
          src="../assets/img/blue.png"
          class="max-w-full md:h-10 h-8 align-middle border-none inline-block"
          alt="..."
        />
      </a>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown-component></notification-dropdown-component>
        </li>
        <li class="inline-block relative">
          <user-dropdown-component></user-dropdown-component>
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <a href="javascript:void(0)">
                <img
                  alt="..."
                  src="../assets/img/blue.png"
                  class="align-middle border-none"
                />
              </a>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>
        <!-- Navigation -->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="inline-flex">
            <a
              class="text-gray-900 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fas fa-tv text-indigo-500 w-8"></i> Dashboard
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fas fa-globe text-blue-500 w-8"></i> Lading Page
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fas fa-user text-yellow-500 w-8"></i> User Profile
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fas fa-user-secret text-teal-500 w-8"></i> Login
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug opacity-50"
              href="javascript:void(0)"
            >
              <i class="fas fa-sign-in-alt text-pink-500 w-8"></i> Register
              (Soon)
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug opacity-50"
              href="javascript:void(0)"
            >
              <i class="fas fa-cogs text-red-500 w-8"></i> Settings (Soon)
            </a>
          </li>
        </ul>
        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="md:min-w-full py-1 uppercase text-gray-600 text-sm font-medium"
        >
          Documentation
        </h6>
        <!-- Navigation -->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fas fa-paint-brush w-8"></i> Styles
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fab fa-css3-alt w-8"></i> CSS
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fab fa-vuejs w-8"></i> VueJS
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fab fa-react w-8"></i> React
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fab fa-angular w-8"></i> Angular
            </a>
          </li>
          <li class="inline-flex">
            <a
              class="text-gray-600 text-base py-3 font-normal leading-snug"
              href="javascript:void(0)"
            >
              <i class="fab fa-js-square w-8"></i> JavaScript
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NotificationDropdownComponent from "./NotificationDropdown.vue";
import UserDropdownComponent from "./UserDropdown.vue";
export default {
  data() {
    return {
      collapseShow: "hidden"
    };
  },
  methods: {
    toggleCollapseShow: function(classes) {
      this.collapseShow = classes;
    }
  },
  components: {
    NotificationDropdownComponent,
    UserDropdownComponent
  }
};
</script>
