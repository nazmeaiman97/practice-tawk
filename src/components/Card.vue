<template>
    <div class="flex flex-col bg-white border border-gray-200 justify-center py-10 space-y-4 cursor-pointer box-border"
        :class="[width ? `w-[${width}px]` : '', height ? `h-[${height}px]` : '']">
        <div v-if="useArticleCountIcon" class="flex space-x-2 mr-6 justify-end text-primary">
            <font-awesome-icon :icon="['fas', 'file-lines']"></font-awesome-icon>
            <p class="font-thin text-xs text-gray-400">5</p>
        </div>
        <div class="flex justify-center">
            <font-awesome-icon class="fontawesome-icons" :icon="['fas', icon]"></font-awesome-icon>

        </div>
        <div class="flex justify-center">
            <p class="font-semibold text-xl text-center text-gray-700 md-w-[100%]" :class="width ? 'w-32 truncate' : ''">{{
                title }}</p>
        </div>
        <div>
            <p v-if="!useArticleCountIcon" class="text-sm text-primary text-center">{{ articleCount }} articles</p>
            <p class="text-xs font-thin text-gray-500 text-center">{{ calculateLastUpdatedDate(lastUpdated) }}</p>
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
        articleCount: {
            type: Number,
            required: true
        },
        useArticleCountIcon: {
            type: Boolean,
            required: false,
            default: false,
        },
        lastUpdated: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: false,
        },
        height: {
            type: Number,
            required: false,
        }
    },
    methods: {
        calculateLastUpdatedDate(targetDate) {
            return moment(targetDate).fromNow();
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
    font-size: 68px;
    color: $green;
}
</style>
