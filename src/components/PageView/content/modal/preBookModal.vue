<template>
    <div v-if="isOpen" class="modal-overlay">

        <div class="modal-content">

            <h2>도서 상세정보</h2>
            <table>
                <tbody>
                    <tr>
                        <th>도서번호</th>
                        <td>{{ detail.bookNo }}</td>
                    </tr>
                    <tr>
                        <th>도서명</th>
                        <td>{{ detail.title }}</td>
                    </tr>

                    <tr>
                        <th>저자</th>
                        <td>{{ detail.author }}</td>
                    </tr>

                    <tr>
                        <th>출판사</th>
                        <td>{{ detail.publisher }}</td>
                    </tr>

                    <tr>
                        <th>발행년도</th>
                        <td>{{ detail.pubDate }}</td>
                    </tr>

                    <tr>
                        <th>등록일</th>
                        <td>{{ detail.regDate }}</td>
                    </tr>

                    <tr>
                        <th>상태</th>
                        <!-- <td :class="getStateClass(detail.state)">
                            {{ convertState(detail.state) }}
                        </td> -->
                        <td>
                            <select v-model="editData.state">
                                <option value="B">대출가능</option>
                                <option value="C">대출중</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

        
            <div class="btnArea">
                <!-- <button style="background-color: #00bfff; border: 1px solid #00bfff;" @click="updateBook">
                    자료 찾기
                </button> -->
                <button @click="closeModal">
                    닫기
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const isOpen = computed(() =>
    store.state.preModal.isOpen
)

const detail = computed(() =>
    store.state.resultDetail.detailData || {}
)

// 수정용 데이터
const editData = ref({})

// 상세조회 결과가 바뀔 때 editData에 복사
watch(detail, (newVal) => {
    editData.value = { ...newVal }
}, { immediate: true })

const closeModal = () => {

    store.dispatch('setState_', {
        key: 'preModal',
        value: {
            isOpen: false
        }
    })

    store.dispatch(
        'search_',
        {
            bookNm: ''
        }
    )

}

const updateBook = () => {
    store.dispatch('update_', {
        ...editData.value
    })
}

const deleteBook = () => {
    store.dispatch('delete_', {
        bookNo: detail.value.bookNo
    })
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
}

.modal-content {
    padding: 1%;
    width: 90%;
    max-width: 1400px;
    max-height: 95vh;
    background-color: white;
    border: 1px solid black;
    overflow-y: auto;
    overflow-x: auto;

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

.inputBar{
    text-align: center;
    width: 100px
}

.btnArea {
    gap: 2%;
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
</style>