<template>
    <a href="https://github.com/AntoineSchmidt/web_diary">
        <img id="forkme" src="/forkme.svg?url" alt="See the sourcecode" decoding="async" loading="lazy" data-recalc-dims="1">
    </a>
    <v-card class="mx-auto">
        <v-toolbar>
            <v-spacer></v-spacer>
            <v-toolbar-title>My Diary</v-toolbar-title>
            <v-spacer></v-spacer>
            <span id="tip" v-if="entries.length == 0">
                Create your first entry =>
            </span>
            <v-btn icon @click="$router.push({name: 'create'})">
                <v-icon>mdi-plus-thick</v-icon>
            </v-btn>
        </v-toolbar>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in entries" :key="card.id">
                    <v-card class="entry" @click="$router.push({name: 'show', params: { id: card.id }})">
                        <v-card-title v-text="card.date.toLocaleDateString()"></v-card-title>
                        <v-img :src="card.image"></v-img>
                        <v-card-text v-text="card.comment"></v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'

export default {
    name: 'Home',
    setup () {
        const store = useAppStore()
        return { store }
    },
    data: function() {
        return {
            entries: computed(() => this.store.entries)
        }
    }
}
</script>

<style>
#tip {
    color: white;
    margin-left: 10px;
    font-weight: bold;
}
#forkme {
    width: 150px;
    height: 150px;
    position: absolute;
    z-index: 100;
}
.entry {
    width: 500px;
}
</style>