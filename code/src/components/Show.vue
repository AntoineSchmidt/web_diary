<template>
    <v-card v-if="entry" class="mx-auto">
        <Navigation :title="`My entry from ${entry.date.toLocaleDateString()}`"></Navigation>
        <v-list-item>
            <v-spacer></v-spacer>
            <v-img :src="entry.image">
            </v-img>
            <v-spacer></v-spacer>
        </v-list-item>
        <v-list-item>
            <v-spacer></v-spacer>
            <span>Location: N {{ entry.location[0] }}° E {{ entry.location[1] }}°</span>
            <v-spacer></v-spacer>
        </v-list-item>
        <v-list-item>
            <v-spacer></v-spacer>
            <textarea v-model="comment" placeholder="Don't you wanna write something?" cols=100 rows=2></textarea>
            <v-spacer></v-spacer>
        </v-list-item>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save">Save</v-btn>
        </v-card-actions>
    </v-card>
    <v-card v-else class="mx-auto">
        <Navigation title="Entry not found"></Navigation>
    </v-card>
</template>

<script>
import { computed, watch } from 'vue'
import Navigation from './Navigation.vue'
import { useAppStore } from '@/store/app'

export default {
    name: 'Show',
    components: {
        Navigation,
    },
    setup () {
        const store = useAppStore()
        return { store }
    },
    data() {
        const entry = computed(() => this.store.getEntryById(this.$route.params.id));
        var comment = entry.value? entry.value.comment : null
        return { entry, comment }
    },
    methods: {
        save() {
            this.store.update(this.entry, this.comment);
            this.$router.push({ name: 'home' });
        }
    },
    watch: {
        entry(value) {
            console.log(value);
            this.comment = value.comment;
        }
    }
}
</script>