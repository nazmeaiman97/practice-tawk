<template>
    <div class="flex flex-row bg-white justify-between py-4 px-5 space-x-10 cursor-pointer shadow-sm">
        <div class="flex items-center">
            <font-awesome-icon class="fontawesome-icons" :icon="['fas', icon]"></font-awesome-icon>
        </div>
        <div class="flex flex-col justify-center flex-grow">
            <div class="flex items-center justify-between">
                <div class="flex-col">
                    <p class="font-semibold text-md text-gray-700 truncate w-40 md:w-60">{{ title }}</p>
                    <p class="text-xs font-thin text-gray-500">Updated: {{ dateFormat(lastUpdated) }}</p>
                </div>
                <font-awesome-icon class="green" :icon="['fas', 'chevron-right']"></font-awesome-icon>
            </div>
        </div>
    </div>
</template>
    
<script>
import moment from 'moment';
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        lastUpdated: {
            type: String,
            required: true
        },

    },
    methods: {
        dateFormat(targetDate) {
            return moment(targetDate).format('MMMM, DD YYYY');
        }
    }
}
</script>
    
<style lang="scss" scoped>
@import '../scss/variables';

p {
    font-family: $font-family;
}

.fontawesome-icons {
    font-size: 30px;
    color: $green;
}

.green {
    color: $green;
}
</style>
