<template>
    <div>
        <SearchBar />
        <TableMgmt />
        <BookModal />
        <AddBookModal/>
    </div>
</template>

<script setup>
import SearchBar from './content/SearchBar.vue';
import TableMgmt from './content/TableMgmt.vue';
import BookModal from './content/modal/BookModal.vue';
import AddBookModal from './content/modal/AddBookModal.vue';
</script>