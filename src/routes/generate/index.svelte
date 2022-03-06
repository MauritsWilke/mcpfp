<script lang="ts">
    // @ts-ignore else svelte gets errored? dk why tbh
    import { onMount } from "svelte";
    import SaveButton from "../../components/SaveButton.svelte";
    import ArrowButton from "../../components/ArrowButton.svelte";
    import changeGradient from "../../lib/gradients";
    import generatePfp from "../../lib/generateProfile";
    import { mergeCanvases } from "../../lib/utils";

    let username = "";

    let gradientCanvas: HTMLCanvasElement;
    let gradientCtx: CanvasRenderingContext2D;
    let profileCanvas: HTMLCanvasElement;
    let profileCtx: CanvasRenderingContext2D;
    onMount(async () => {
        gradientCanvas = window.document.getElementById("gradientCanvas") as HTMLCanvasElement;
        gradientCanvas.width = 300;
        gradientCanvas.height = 300;
        gradientCtx = gradientCanvas.getContext("2d");
        gradientCtx.scale(16, 16);
        gradientCtx.imageSmoothingEnabled = false;
        changeGradient(gradientCtx);

        profileCanvas = window.document.getElementById("profileCanvas") as HTMLCanvasElement;
        profileCanvas.width = 300;
        profileCanvas.height = 300;
        profileCtx = profileCanvas.getContext("2d");
        profileCtx.scale(16, 16);
        profileCtx.imageSmoothingEnabled = false;

        await generatePfp("I_Like_Cats__", profileCtx);
    });

    async function savePicture() {
        const merged = await mergeCanvases([gradientCanvas, profileCanvas]);
        const link = document.createElement("a");
        link.download = `mcpfp - ${username ?? "I_Like_Cats__"}.png`;
        link.href = merged.toDataURL();
        link.click();
    }

    async function copyPicture() {
        const merged = await mergeCanvases([gradientCanvas, profileCanvas]);

        if (navigator.userAgent.indexOf("Firefox") != -1) {
            navigator.clipboard.writeText("firefox doesn't support this :(");
        } else {
            merged.toBlob(function (blob) {
                const item = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([item]);
            });
        }
    }

    let timeout;
    async function validateInput(e) {
        if (!e.target.value.match(/^[a-z0-9_]*$/i)) {
            username = username.replace(/[^a-z0-9_]/gi, "");
        } else {
            timeout = setTimeout(async () => {
                await generatePfp(username, profileCtx);
            }, 100);
        }
    }
</script>

<div id="wrapper">
    <div id="preview">
        <div id="inputWrapper">
            <input type="text" spellcheck="false" maxlength="16" pattern="[a-zA-Z0-9_]+" bind:value={username} on:input={validateInput} placeholder="Enter username" />
        </div>

        <div id="uiWrapper">
            <ArrowButton on:click={() => changeGradient(gradientCtx, "left")} orientation="left" />

            <div id="canvasWrapper">
                <canvas id="gradientCanvas" />
                <canvas id="profileCanvas" />
            </div>

            <ArrowButton on:click={() => changeGradient(gradientCtx, "right")} orientation="right" />
        </div>

        <div id="SaveButtonWrapper">
            <SaveButton on:click={savePicture} text="save" />
            <SaveButton on:click={copyPicture} text="copy" />
        </div>
    </div>
</div>

<style lang="scss">
    $background-color: #1b2531;
    $background-color-dark: #191f27;
    $coloured-text: #da4167;

    $lightMode-background-color: #fff;
    $lightMode-background-color-dark: #fff;

    #wrapper {
        height: calc(100vh - 9rem - 5rem);
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #preview {
        display: inline-block;
        width: auto;
        height: auto;

        margin-left: 5rem;
        margin-bottom: 5rem;

        #uiWrapper {
            display: flex;
            align-items: center;
        }

        #canvasWrapper {
            position: relative;

            z-index: 5;

            #profileCanvas {
                position: absolute;

                left: 0;
                top: 0;
            }

            canvas {
                width: 300px;
                height: 300px;

                background-color: transparent;
                filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));

                border-radius: 20px;
            }
        }

        #SaveButtonWrapper {
            margin-top: 2rem;
            display: flex;
            flex-direction: row;

            gap: 2rem;

            justify-content: center;
        }

        #inputWrapper {
            display: flex;
            align-self: center;

            input {
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 1rem;

                color: $lightMode-background-color;
                filter: drop-shadow(7px 7px 4px rgba(0, 0, 0, 0.25));

                background-color: transparent;
                border: none;

                font-size: 2rem;
                text-align: center;

                &:focus {
                    outline: none !important;
                }

                &:invalid {
                    color: #ff5555;
                }
            }
        }
    }

    :global(body.dark-mode) #preview #inputWrapper input {
        color: $background-color-dark;
    }
</style>
