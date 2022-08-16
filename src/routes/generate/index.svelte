<script lang="ts">
    // @ts-ignore else svelte gets errored? dk why tbh
    import { onMount } from "svelte";
    import SaveButton from "@components/SaveButton.svelte";
    import ArrowButton from "@components/ArrowButton.svelte";
    import Popup from "@components/Popup.svelte";
    import SEO from "@components/SEO.svelte";
    import changeGradient from "@scripts/gradients";
    import generatePfp from "@scripts/generateProfile";
    import { mergeCanvases } from "@scripts/utils";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    const urlSearchParamIGN = $page.url.searchParams.get("ign") || null;

    let username = "";
    let firefoxPopup = false;

    let gradientCanvas: HTMLCanvasElement;
    let gradientCtx: CanvasRenderingContext2D;
    let profileCanvas: HTMLCanvasElement;
    let profileCtx: CanvasRenderingContext2D;
    onMount(async () => {
        if (!urlSearchParamIGN) goto("/generate?ign=I_Like_Cats__", { replaceState: false });
        else username = urlSearchParamIGN.replace(/[^a-z0-9_]/gi, "");

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

        await generatePfp(`https://minotar.net/skin/${username || "I_Like_Cats__"}.png`, profileCtx);
    });

    async function savePicture() {
        const merged = await mergeCanvases([gradientCanvas, profileCanvas]);
        const link = document.createElement("a");
        link.download = `mcpfp - ${username || "unknown"}.png`;
        link.href = merged.toDataURL();
        link.click();
    }

    async function copyPicture() {
        if (navigator.userAgent.indexOf("Firefox") != -1) {
            if (!firefoxPopup) {
                firefoxPopup = true;
                setTimeout(() => (firefoxPopup = false), 5000);
            }
        } else {
            const merged = await mergeCanvases([gradientCanvas, profileCanvas]);
            merged.toBlob(function (blob) {
                const item = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([item]);
            });
        }
    }

    let timeout;
    async function validateInput(e) {
        username = username.replace(/[^a-z0-9_]/gi, "");

        try {
            await generatePfp(`https://minotar.net/skin/${username}.png`, profileCtx);

            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                await generatePfp(`https://minotar.net/skin/${username}.png`, profileCtx);
                goto(`/generate?ign=${username}`, { replaceState: true, keepfocus: true });
            }, 300);
        } catch (e) {
            await generatePfp(null, profileCtx);
        }
    }
</script>

<SEO description="Generate a free profile picture for {urlSearchParamIGN}!" username={urlSearchParamIGN} />

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

    {#if firefoxPopup}
        <Popup type="failed" message="Firefox does not support this :(" />
    {/if}
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

    @media only screen and (max-width: 810px) {
        #wrapper {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        #preview {
            margin-left: 0;
            margin-right: 0;

            #canvasWrapper {
                #profileCanvas {
                    position: absolute;

                    left: 0;
                    top: 0;
                }

                canvas {
                    $scale-factor: 1.4;
                    width: calc(320px / $scale-factor);
                    height: calc(320px / $scale-factor);
                }
            }

            #SaveButtonWrapper {
                margin-top: 1rem;
                gap: 1rem;
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
    }
</style>
