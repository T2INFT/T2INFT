<template>
    <div class="profile">
        <Navmenu />
        <ProfileHeader />
    </div>
</template>

<script>
// import TheWelcome from '../components/TheWelcome.vue'
import Navmenu from '../components/Navmenu.vue'
import ProfileHeader from '../components/ProfileHeader.vue'

export default {
    name: 'Profile',
    components: {
        Navmenu,
        ProfileHeader
    }
}
</script>
