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
                        <td :class="getStateClass(detail.state)">
                            {{ convertState(detail.state) }}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>기관번호</th>
                        <th>별치기호</th>
                        <th>분류기호</th>
                        <th>도서기호</th>
                        <th>권책기호</th>
                        <th>가격</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{{ detail.libNo }}</td>
                        <td>{{ detail.posi }}</td>
                        <td>{{ detail.clas }}</td>
                        <td>{{ detail.auth }}</td>
                        <td>{{ detail.vol }}</td>
                        <td>{{ detail.price }}</td>
                    </tr>
                </tbody>
            </table>


            <div class="btnArea">
                <button @click="closeModal">
                    닫기
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const isOpen = computed(() =>
    store.state.modal.isOpen
)

const detail = computed(() =>
    store.state.resultDetail.detailData || {}
)

const closeModal = () => {

    store.dispatch('setState_', {
        key: 'modal',
        value: {
            isOpen: false
        }
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
    height: 65%;
    background-color: white;
    border: 1px solid black;
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
    display: flex;
    justify-content: center;
}

button {
    background-color: #2c3e50;
    color: white;
    margin-top: 20px;
}

.available{
    color:blue;
}

.borrowed{
    color:red;
    font-weight:bold;
}
</style>