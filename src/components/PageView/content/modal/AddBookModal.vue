<template>
    <div v-if="isOpen" class="modal-overlay">

        <div class="modal-content">

            <h2>자료 등록</h2>
            <table>
                <tbody>
                    <tr>
                        <th>자료명</th>
                        <td><input v-model="book.title" type="text"></td>
                    </tr>

                    <tr>
                        <th>저자명</th>
                        <td><input v-model="book.author" type="text"></td>
                    </tr>

                    <tr>
                        <th>발행처</th>
                        <td><input v-model="book.publisher" type="text"></td>
                    </tr>

                    <tr>
                        <th>발행년도</th>
                        <td><input v-model="book.pubDate" type="text"></td>
                    </tr>
                    <tr>
                        <th>기관번호</th>
                        <td><input v-model="book.libNo"></td>
                    </tr>

                    <tr>
                        <th>자료마크넘버</th>
                        <td><input v-model="book.markNo"></td>
                    </tr>

                    <tr>
                        <th>별치기호</th>
                        <td><input v-model="book.posi"></td>
                    </tr>
                    <tr>
                        <th>분류기호</th>
                        <td><input v-model="book.clas"></td>
                    </tr>
                    <tr>
                        <th>도서기호</th>
                        <td><input v-model="book.auth"></td>
                    </tr>

                    <tr>
                        <th>권책기호</th>
                        <td><input v-model="book.vol"></td>
                    </tr>
                    <tr>
                        <th>가격</th>
                        <td><input v-model="book.price"></td>
                    </tr>

                    <tr>
                        <th>소장 상태</th>
                        <td>
                            <select v-model="book.state">
                                <option 
                                    v-for="state in bookState"
                                    :key="state.value" 
                                    :value="state.value">
                                    {{ state.label }}
                                </option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>고유 아이디</th>
                        <td><input v-model="book.bookId"></td>
                    </tr>

                    <tr>
                        <th>관리구분</th>
                        <td><input v-model="book.bookSec"></td>
                    </tr>

                    <tr>
                        <th>자료 구분</th>
                        <td>
                            <select v-model="book.dataType">
                                <option v-for="dataType in bookOptions" :key="dataType.value" :value="dataType.value">
                                    {{ dataType.label }}
                                </option>
                            </select>
                        </td>
                    </tr>

                </tbody>
            </table>

            <div class="btnArea">
                <button @click="insertBook">
                    자료 등록
                </button>
                <button @click="closeModal">
                    닫기
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const book = ref({
    bookNo: '',
    title: '',
    author: '',
    publisher: '',
    pubDate: '',
    state: 'B',
    dataType: 'BOOK',
    libNo: '',
    posi: '',
    clas: '',
    auth: '',
    vol: '',
    price: '',
    markNo: '',
    bookId: '',
    bookSec: ''
})


const bookState = computed(() => {
    return [
        { value: 'B', label: '대출가능' },
        { value: 'C', label: '대출불가능' }
    ]
})

const bookOptions = computed(() => {
    return [
        { value: 'BOOK', label: '책' },
        { value: 'Magazine', label: '잡지' },
        { value: 'e-BOOK', label: '전자책' }
    ]
})


const isOpen = computed(() =>
    store.state.AddModal.isOpen
)


const closeModal = () => {

    store.dispatch('setState_', {
        key: 'AddModal',
        value: {
            isOpen: false
        }
    })
}

const insertBook = async () => {
    await store.dispatch(
        'insertBook_', {
        ...book.value
    }
    )
    closeModal()
}

const getStateClass = (state) => {
    if (state === 'B') {
        return 'available'
    } else if (state === 'C') {
        return 'borrowed'
    } else {
        return ''
    }
}


const convertState = (state) => {

    const stateMap = {
        'B': '대출가능',
        'C': '대출중'
    }

    return stateMap[state] || state
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.modal-content {
    padding: 1%;
    width: 90%;
    max-width: 1400px;
    max-height: 95vh;
    background-color: white;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
}

.modal {
    background: white;
    width: 700px;
    border-radius: 10px;
    padding: 30px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 10px;
}

td {
    text-align: center;
}

.btnArea {
    gap: 1%;
    display: flex;
    justify-content: center;
}

button {
    background-color: #2c3e50;
    color: white;
    margin-top: 20px;
}

.available {
    color: blue;
}

.borrowed {
    color: red;
    font-weight: bold;
}

input,
select {
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
}
</style>