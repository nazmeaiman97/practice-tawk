<template>
    <div class="space-y-10 mx:12 md:mx-20">
        <tawk-header></tawk-header>
        <search-input v-model="searchCategory" />
        <div class="border grid grid-cols-1 gap-10 justify-center bg-gray-100 p-10 md:grid-cols-2 lg:grid-cols-3">
            <card-category v-for="category in displayedArticles" @click.native="goToArticle(category.id)" :key="category.id"
                :title="category.title" :icon="category.icon" :articleCount="category.totalArticle"
                :lastUpdated="category.updatedOn" />
        </div>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
import Header from '../components/Header.vue'
import SearchInput from '../components/SearchInput.vue';
import { getCategories } from '../services/getCategoriesServices'

export default {
    components: {
        "tawk-header": Header,
        "card-category": Card,
        "search-input": SearchInput,
    },

    data() {
        return {
            searchCategory: '',
            categories: [],
        }
    },

    mounted() {
        getCategories().then((res) => {
            this.categories = res.data
                .filter(item => item.enabled)
                .sort((a, b) => a.order - b.order);
        }).catch((error) => {
            console.log(error)
        })
    },
    computed: {
        displayedArticles() {
            const searchTerm = this.searchCategory.toLowerCase();
            if (!searchTerm) {
                return this.categories;
            }
            return this.categories.filter(category => {
                const title = category.title.toLowerCase();
                return title.includes(searchTerm);
            });
        },
    },
    methods: {
        goToArticle(id) {
            return this.$router.push(`/article/${id}`)
        }
    }
}
</script>

<style lang="scss" scoped></style>