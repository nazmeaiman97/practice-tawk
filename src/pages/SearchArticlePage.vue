<template>
    <div>
        <h1 v-if="articles.length === 0">
            No Data
        </h1>
        <div v-else>
            <h1 v-for="article in articles" :key="article.id">
                {{ article.title }}
            </h1>
        </div>

    </div>
</template>

<script>
import { searchArticles } from '../services/getCategoriesServices';
export default {
    data() {
        return {
            articles: [],
        };
    },
    async mounted() {
        // return console.log(this.$route.params.title);
        try {
            const res = await searchArticles();
            this.articles = res.data.filter(article => {
                const title = article.title.toLowerCase();
                return title.includes(this.$route.params.title) && article.status === 'published'
            })
            // this.category = findCategory;
            // this.categories = res.data
            //     .filter(category => this.$route.params.id !== category.id && category.enabled)
            //     .sort((a, b) => a.order - b.order);
            // const articlesRes = await getArticles(this.category.id);
            // this.articles = articlesRes.data.filter(article => article.status === 'published');
            // this.filterArticles = this.articles.slice(0, this.articleMetaInfo.articlePerPage);
            // this.dataReady = true;
        } catch (error) {
            console.log(error);
        }
    },
};

</script>