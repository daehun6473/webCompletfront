<template>
    <div>
        <SearchBar />
        <TableMgmt />
        <BookModal />
        <AddBookModal/>
        <preBookModal/>
    </div>
</template>

<script setup>
import SearchBar from './content/SearchBar.vue';
import TableMgmt from './content/TableMgmt.vue';
import BookModal from './content/modal/BookModal.vue';
import AddBookModal from './content/modal/AddBookModal.vue';
import preBookModal from './content/modal/preBookModal.vue';
</script>