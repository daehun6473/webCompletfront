<template>

<div class="container">
    <div style="display: flex; flex-direction: row-reverse;">
        <button @click="downloadExcel">엑셀 다운로드</button>
    </div>
    <table>

        <thead>
            <tr>
                <th>No.</th>
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
                <td colspan="8">
                    조회된 데이터가 없습니다.
                </td>
            </tr>

            <tr
                v-for="(book, index) in books"
                :key="book.bookNo"
                class="selectBook"
                @click="getBookDetail(book.bookNo)"
            >
                <td>{{ index + 1 }}</td>
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
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import * as XLSX from 'xlsx';

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

const downloadExcel = () => {
    const excelData = books.value.map((book, index) => ({
        No: index + 1,
        도서번호: book.bookNo,
        도서명: book.title,
        저자: book.author,
        출판사: book.publisher,
        발행년도: book.pubDate,
        자료구분: convertType(book.dataType),
        상태: convertState(book.state)
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,'도서목록');

    XLSX.writeFile(workbook, '도서목록.xlsx');
}

onMounted(() => {
    store.dispatch(
        'search_', {
            bookNm: ''
        }
    )
})

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
    background:#d6d0d0;
}

.available{
    color:blue;
}

.borrowed{
    color:red;
    font-weight:bold;
}



</style>