<template>
    <div class="flex items-center mx-10 lg:mx-52">
        <label class="sr-only">Search</label>
        <div class="relative w-full">
            <input v-model="searchResult" type="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary focus:border-primary block w-full h-12 pl-10 p-2.5"
                :placeholder="placeholder" required />
        </div>
        <button type="submit"
            class="p-3 w-12 h-12 my-10 text-xs font-medium text-white bg-primary order border-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span class="sr-only">Search</span>
        </button>
    </div>
</template>
  
<script>
export default {
    props: {
        value: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: "Search for answers"
        }
    },
    computed: {
        searchResult: {
            get() {
                return this.value;
            },
            set(newValue) {
                this.$emit("input", newValue);
            }
        }
    }
};
</script>
  