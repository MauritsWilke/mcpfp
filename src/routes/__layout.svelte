<script lang="ts">
    import ThemeToggle from "../components/ThemeToggle.svelte";
</script>

<nav id="navBar">
    <a href="/">
        <img src="/PFP/I_Like_Cats__.png" alt="logo" />
    </a>

    <a href="/">
        <h1>Minecraft PFP</h1>
    </a>

    <div id="themeToggle">
        <ThemeToggle />
    </div>
</nav>

<footer id="footer">
    <a href="https://github.com/MauritsWilke/mcpfp" target="blank">
        <p>View me on GitHub!</p>
    </a>

    <a href="https://www.mauritswilke.com/donate" target="blank">
        <p>Buy me a coffee!</p>
    </a>
</footer>

<slot />

<style lang="scss">
    $background-color: #1b2531;
    $background-color-dark: #191f27;
    $coloured-text: #da4167;

    $lightMode-background-color: #fff;
    $lightMode-background-color-dark: #fff;

    :root {
        font-size: 10px;
    }

    :global(*) {
        margin: 0;
        padding: 0;

        transition: all 0.3s;
        font-family: Minecraftia;
    }

    :global(body) {
        background-color: $background-color;
    }

    :global(body.dark-mode) {
        background-color: $lightMode-background-color;
    }

    a {
        text-decoration: none;
    }

    #navBar {
        width: 100vw;
        height: 9rem;

        display: flex;

        background-color: $background-color-dark;
        box-shadow: 0px 1px 3px rgba(255, 255, 255, 0.25);

        img {
            height: 6rem;
            width: auto;
            margin: 1.5rem;
            border-radius: 5px;
        }

        h1 {
            color: $coloured-text;
            font-size: 5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        #themeToggle {
            margin-left: auto;
            margin-right: 1.5rem;
            margin-bottom: 1.5rem;
            margin-top: 1.5rem;

            height: 6rem;
            width: 6rem;
        }
    }

    :global(body.dark-mode) #navBar {
        background-color: $lightMode-background-color-dark;
        box-shadow: 0px 1px 3px rgba(25, 31, 39, 0.25);
    }

    #footer {
        position: fixed;
        bottom: 0;

        height: 5rem;
        width: 100vw;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        // padding: 2px 1rem 0px;

        p {
            font-size: 2rem;
            margin-top: 1rem;
            margin-left: 1rem;
            margin-right: 1rem;

            color: #fff;
        }

        background-color: $background-color-dark;
        box-shadow: 0px -1px 3px rgba(255, 255, 255, 0.25);
    }

    :global(body.dark-mode) #footer {
        background-color: $lightMode-background-color-dark;
        box-shadow: 0px -1px 3px rgba(25, 31, 39, 0.25);

        p {
            color: $background-color-dark;
        }
    }
</style>
