<template>

<div class="container">

    <table>

        <thead>
            <tr>
                <th>도서번호</th>
                <th>도서명</th>
                <th>저자</th>
                <th>출판사</th>
                <th>발행년도</th>
                <th>자료구분</th>
                <th>상태</th>
            </tr>
        </thead>

        <tbody>

            <tr v-if="books.length === 0">
                <td colspan="7">
                    조회된 데이터가 없습니다.
                </td>
            </tr>

            <tr
                v-for="book in books"
                :key="book.bookNo"
                class="selectBook"
                @click="getBookDetail(book.bookNo)"
            >
                <td>{{ book.bookNo }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.publisher }}</td>
                <td>{{ book.pubDate }}</td>
                <td>{{ convertType(book.dataType) }}</td>
                <td :class="getStateClass(book.state)">
                    {{ convertState(book.state) }}
                </td>
            </tr>

        </tbody>

    </table>

</div>

</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const books = computed(() => {

    return store.state.resultData.mainData || []

})

const getStateClass = (state) => {
    if(state === 'B'){
        return 'available'
    } else if(state === 'C'){
        return 'borrowed'
    }else{
        return ''
    }
}

const convertState = (state) => {

    const stateMap = {
        'B':'대출가능',
        'C':'대출중'
    }

    return stateMap[state] || state
}

const convertType = (type) => {
    const stateMap = {
        'BOOK':'책'
    }

    return stateMap[type] || type
}

const getBookDetail = async(bookNo) =>{
    console.log(bookNo);
    
    await store.dispatch(
        'searchBookDetail_',
        {
            bookNo: bookNo
        }
    )
}

</script>

<style scoped>

.container{
    margin-top:20px;
}

table{
    width:100%;
    border-collapse:collapse;
}

th{
    background:#2c3e50;
    color:white;
}

th,td{
    border:1px solid #ddd;
    padding:10px;
    text-align:center;
}

.selectBook:hover{
    cursor:pointer;
    background:#f5f5f5;
}

.available{
    color:blue;
}

.borrowed{
    color:red;
    font-weight:bold;
}



</style>