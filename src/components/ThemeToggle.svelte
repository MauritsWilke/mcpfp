<script>
    function toggle() {
        window.document.body.classList.toggle("dark-mode");
    }
</script>

<button on:click={toggle}>
    <img src="/darkMode.png" alt="moon" id="moon" />
    <img src="/lightMode.png" alt="sun" id="sun" />
    <slot />
</button>

<style lang="scss">
    button {
        background-color: transparent;
        border: none;

        height: 6rem;
        width: 6rem;

        #moon {
            display: none;

            height: 100%;
            width: auto;
        }

        #sun {
            display: block;

            height: 100%;
            width: auto;
        }
    }

    :global(body.dark-mode) button {
        #sun {
            display: none;
        }

        #moon {
            display: block;
        }
    }
</style>
