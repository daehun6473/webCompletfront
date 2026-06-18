<template>
    <div class="content">
        <input v-model="bookNm" type="text" placeholder="도서명을 입력하세요" @keyup.enter="search" />
        
        <!-- <select v-model="count">
            <option v-for="item in stateValue" :key="item.value" :value="item.value">
                {{ item.label }}
            </option>
        </select>  -->
        <button class="search-btn" @click="search">
            조회
        </button>

        <button class="search-btn" @click="openAddBook">
            자료 등록
        </button>

        <button class="search-btn" @click="openPreBook">
            이전 열람
        </button>
        <div>
            총 {{ totalCount }}건
        </div>
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

const count = computed({
    get() {
        return store.state.searchParams.count
    },
    set(value) {
        store.dispatch('setState_', {
            key: 'searchParams',
            value: {
                ...store.state.searchParams,
                count: value
            }
        })
    }
})

const stateValue = computed(() => {
    return [
        { value: '', label: '전체' },
        { value: 'B', label: '대출가능' },
        { value: 'C', label: '대출중' }
    ]
})

const totalCount = computed(() => {
    return store.state.resultData.totalCount;
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

const openPreBook = () => {
    store.dispatch('setState_', {
        key: 'preModal',
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