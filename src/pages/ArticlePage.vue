<template>
    <div class="space-y-2 mx:4 md:mx-20">
        <tawk-header></tawk-header>
        <search-input v-model="searchArticle" />
        <div v-if="dataReady" class="bg-gray-100">
            <div class="border-b-2 justify-center p-4 md:p-20">
                <div class="flex mb-4">
                    <navigation-text firstText="All Categories" :secondText="category.title"
                        :onClickFirstText="onClickAllCategories" />
                </div>
                <div class="grid grid-cols-1 gap-10 justify-center lg:grid-cols-2">
                    <div>
                        <div>
                            <card-category :title="category.title" :icon="category.icon"
                                :articleCount="category.totalArticle" useArticleCountIcon
                                :lastUpdated="category.updatedOn" />
                            <div class="flex flex-col bg-white space-y-10 py-6 px-12 border border-gray-200 justify-center">
                                <font-awesome-icon :icon="['fasl', 'circle-info']" class="text-primary text-2xl" />
                                <p class="text-sm text-gray-400 text-center font-light">{{ category.description }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="space-y-5 h-[500px]">
                            <div class="space-y-10 h-20" v-for="article in displayedArticles" :key="article.id">
                                <article-card :title="article.title" :icon="article.icon"
                                    :lastUpdated="article.updatedOn" />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <custom-pagination :current-page="articleMetaInfo.currentPage" :total-pages="totalPages"
                                @page-change="handlePageChange" />
                        </div>
                    </div>
                </div>
                <hr class="my-2 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            </div>
            <div class="flex flex-col justify-center mb-20 space-y-8 pt-2">
                <p class="text-2xl font-semibold mt-10 mb-2 text-center text-gray-400">Other categories</p>
                <swiper class="relative w-[100%] justify-center items-center content-fit" ref="swiperRef"
                    :slides-per-view="3" :watch-overflow="true" :loop="false" :breakpoints="{
                        1400: { slidesPerView: 3, spaceBetween: 10 },
                        1300: { slidesPerView: 2, spaceBetween: 10 },
                        900: { slidesPerView: 2, spaceBetween: 10 },
                        700: { slidesPerView: 1, spaceBetween: 30 },
                        370: { slidesPerView: 1, spaceBetween: 30 }
                    }" :pagination="true" :navigation="true">
                    <swiper-slide v-for="(category, index) in categories" :key="category.id" :virtualIndex="index">
                        <div class="flex mx-20 justify-center my-10">
                            <card-category @click.native="goToArticle(category.id)" :title="category.title"
                                :icon="category.icon" :articleCount="category.totalArticle"
                                :lastUpdated="category.updatedOn" :width="500" :height="200" />
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>
  
<script>
import ArticleCard from '../components/ArticleCard.vue';
import Card from '../components/Card.vue';
import Header from '../components/Header.vue';
import Pagination from '../components/Pagination.vue';
import SearchInput from '../components/SearchInput.vue';
import { getCategories, getArticles } from '../services/getCategoriesServices';
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2';
import NavigationText from "../components/NavigationText.vue";

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Pagination]);

export default {
    components: {
        "tawk-header": Header,
        "card-category": Card,
        "search-input": SearchInput,
        "article-card": ArticleCard,
        "custom-pagination": Pagination,
        Swiper,
        SwiperSlide,
        NavigationText,
    },
    data() {
        return {
            dataReady: false,
            searchArticle: '',
            categories: [],
            category: {},
            articles: [],
            filterArticles: [],
            articleMetaInfo: {
                totalArticle: 0,
                currentPage: 1,
                articlePerPage: 5,
            },
        };
    },
    async mounted() {
        try {
            const res = await getCategories();
            const findCategory = res.data.find(category => this.$route.params.id === category.id);
            this.category = findCategory;
            this.categories = res.data
                .filter(category => this.$route.params.id !== category.id && category.enabled)
                .sort((a, b) => a.order - b.order);
            const articlesRes = await getArticles(this.category.id);
            this.articles = articlesRes.data.filter(article => article.status === 'published');
            this.filterArticles = this.articles.slice(0, this.articleMetaInfo.articlePerPage);
            this.dataReady = true;
        } catch (error) {
            console.log(error);
        }
    },
    computed: {
        totalPages() {
            if (!this.searchArticle) {
                return Math.ceil(this.articles.length / this.articleMetaInfo.articlePerPage);
            }
            return Math.ceil(this.articleMetaInfo.totalArticle / this.articleMetaInfo.articlePerPage);
        },
        displayedArticles() {
            const searchTerm = this.searchArticle.toLowerCase();
            const startIndex = (this.articleMetaInfo.currentPage - 1) * this.articleMetaInfo.articlePerPage;
            const endIndex = startIndex + this.articleMetaInfo.articlePerPage;
            if (!searchTerm) {
                return this.articles.slice(startIndex, endIndex);
            }
            const filterArticles = this.articles.filter(article => {
                const title = article.title.toLowerCase();
                return title.includes(searchTerm);
            });
            this.articleMetaInfo.totalArticle = filterArticles.length;
            return filterArticles.slice(startIndex, endIndex);
        },
    },
    methods: {
        handlePageChange(page) {
            const searchTerm = this.searchArticle.toLowerCase();
            this.articleMetaInfo.currentPage = page;
            const startIndex = (this.articleMetaInfo.currentPage - 1) * this.articleMetaInfo.articlePerPage;
            const endIndex = startIndex + this.articleMetaInfo.articlePerPage;
            this.displayedArticles = this.displayedArticles.slice(startIndex, endIndex);
        },
        goToArticle(id) {
            this.$router.push(`/article/${id}`);
        },
        onClickAllCategories() {
            this.$router.push(`/`);
        },
    },
};
</script>
  
<style lang="scss">
.swiper-button-prev,
.swiper-button-next {
    color: grayscale($color: #d5d5d5);
}
</style>
  