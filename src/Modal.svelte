<style>
    .background-modal{
        position: absolute;
        width:100%;
        height:100%;
        z-index: 1;
        background-color:rgba(0, 0, 0, 0.8);
        top:0;
        left:0;
        overflow:auto;
    }
    .modal-box{
        background-color:white;
        z-index: 2;
        margin-top:5%;
        margin-bottom:5%;
        margin-left:auto;
        margin-right:auto;
    }
    .card{
		border-radius:.25rem;
		box-shadow: 0 .25rem .75rem rgba(0,0,0,.2);
		width:800px;
	}
	.card-title{
		border-radius:.25rem .25rem 0 0;
		padding:15px;
		background-color:#F9F9FA;
		color: #6c757d;
	}
	.content-wrapper{
		padding:15px
	}
    .card-close-button{
        cursor: pointer;
        padding: 0;
        background-color: transparent;
        border: 0;
        -moz-appearance: none;
        float: right;
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
        margin-bottom: .25rem;
    }
</style>

<script>
    import { fade, fly, crossfade, scale } from 'svelte/transition';
    export let visible = false
    export let closeHandler
    export let title

    const [send, receive] = crossfade({
		duration: 200,
		fallback: scale
	});

    
</script>

{#if visible}
<div in:fade out:fade class="background-modal">
    <div in:receive out:send class="modal-box card">
        <div class="card-title">
            {#if title}
            <span class="card-list-title">{title}</span>
            {/if}
            <button class="card-close-button" on:click={closeHandler}>&times;</button>
        </div>
        <div class="content-wrapper">
            <slot></slot>
        </div>
    </div>
</div>
{/if}