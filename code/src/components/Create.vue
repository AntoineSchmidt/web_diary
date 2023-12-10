<template>
    <v-card class="mx-auto">
        <Navigation :title="`New entry for ${entry.date.toLocaleDateString()}`"></Navigation>
        <v-list-item>
            <v-spacer></v-spacer>
            <video autoplay id="video"></video>
            <v-spacer></v-spacer>
        </v-list-item>
        <v-list-item>
            <v-spacer></v-spacer>
            <span>Location: N {{ entry.location[0] }}° E {{ entry.location[1] }}°</span>
            <v-spacer></v-spacer>
        </v-list-item>
        <v-list-item>
            <v-spacer></v-spacer>
            <textarea v-model="entry.comment" placeholder="My thoughts and impressions" cols=100 rows=2></textarea>
            <v-spacer></v-spacer>
        </v-list-item>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="save">Save</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import Navigation from './Navigation.vue'
import { useAppStore } from '@/store/app'

export default {
    name: 'Create',
    components: {
        Navigation,
    },
    setup () {
        const store = useAppStore()
        return { store }
    },
    data: () => ({
        entry: { id: crypto.randomUUID(), date: new Date(), image: null, location: [0, 0], comment: null}
    }),
    methods: {
        setPosition(position) {
            this.entry.location = [position.coords.latitude, position.coords.longitude];
        },
        async getVideo() {
            const video = document.querySelector("#video");
            const constraints = {
                video: {
                    width: 400,
                    height: 400
                },
            };
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia(constraints);
                video.srcObject = videoStream;
            } catch (e) {
                alert("No Camera Access")
            }
        },
        save() {
            // draw current video-frame on canvas
            const video = document.querySelector("#video");
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            this.entry.image = canvas.toDataURL("image/png");

            this.store.add(this.entry);
            this.$router.push({ name: 'home' });
        }
    },
    mounted() {
        this.getVideo();
        navigator.geolocation.getCurrentPosition(this.setPosition);
    }
}
</script>