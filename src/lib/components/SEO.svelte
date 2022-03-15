<script lang="ts">
    export let title = "minecraftpfp.com";
    export let description = "minecraftpfp.com";
    export let username = "I_Like_Cats__";
    const imgURL = `https://minecraftpfp.com/api/pfp/${username}.png`;
</script>

<svelte:head>
    <meta name="title" content={title} />

    <meta name="description" content={description} />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:standard" />
    <meta property="og:image" content={imgURL} />
    <meta name="keywords" content="minecraft,minecraft profile picture,free minecraft profile picture,fiverr minecraft profile picture,free fiverr minecraft profile picture,profile picture,free profile picture,mc profile picture,free mc profile picture,mc pfp,free mc pfp,minecraft pfp,free minecraft pfp,no watermark,watermark free," />
</svelte:head>
