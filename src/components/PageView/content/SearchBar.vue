<template>
    <div class="content">

        <input v-model="bookNm" type="text" placeholder="도서명을 입력하세요" @keyup.enter="search" />

        <button class="search-btn" @click="search">
            조회
        </button>

        <button class="search-btn" @click="openAddBook">
            책 등록
        </button>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const bookNm = computed({
    get() {
        return store.state.searchParams.bookNm
    },
    set(value) {
        store.dispatch('setState_', {
            key: 'searchParams',
            value: {
                ...store.state.searchParams,
                bookNm: value
            }
        })
    }
})

const search = async () => {

    await store.dispatch(
        'search_',
        {
            bookNm: bookNm.value
        }
    )

}

const openAddBook = () => {

    store.dispatch('setState_', {
        key: 'AddModal',
        value: {
            isOpen: true
        }
    })

}
</script>

<style scoped>
.content {
    margin-bottom: 20px;
}

input {
    width: 300px;
    height: 35px;
    padding-left: 10px;
}

.search-btn {
    margin-left: 10px;
    width: 80px;
    height: 40px;
}
</style>