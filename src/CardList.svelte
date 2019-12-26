<script>
    export let list
    export let deleteListData
    export let index
    export let cardIndex
    export let modalOpenHandler
    export let dragStartEvent

    $: textConverter = () =>{
        let result
        if(list.content.length > 30){
            result = list.content.substring(0,30) + '...'
        }
        else{
            result = list.content
        }
        return result
    }
</script>

<style>
    .card-list{
        display: block;
        opacity: 1;
        max-width: 350px;
        overflow: hidden;
        font-size: .875rem;
        background-color: rgba(255,255,255,.85);
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.1);
        box-shadow: 0 .25rem .75rem rgba(0,0,0,.1);
        border-radius: .25rem;
        transition: opacity .15s linear;
        margin:10px;
    }
    .card-list-header{
        display: flex;
        align-items: center;
        padding: .25rem .75rem;
        color: #6c757d;
        background-color: rgba(255,255,255,.85);
        background-clip: padding-box;
        border-bottom: 1px solid rgba(0,0,0,.05);
        cursor:move;
    }
    .card-list-title{
        flex: 1;
    }
    .content-delete-button{
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
    .content-delete-button:hover{
        color:red
    }
	.card-list-body{
		padding:.75rem;
        cursor: pointer;
    }
    .labels{
        color:white;
        padding:5px;
        border-radius:20px;
        margin-right:.5rem;
        font-size:.75em;
        transition:0.5s;
    }
    .labels:hover{
        text-shadow: 0 1px 0 #fff;
        box-shadow: 0 .25rem .75rem rgba(0,0,0,.2);
        transition:1s;
    }
</style>

<div class="card-list">
    <div class="card-list-header" draggable={true} on:dragstart={(e)=>dragStartEvent(e,index,cardIndex)}>
        <div class="card-list-title">
            {#each list.labels as label,i}
                {#if i < 3}
                <span class="labels" style="background-color:{label.color}">{label.label}</span>
                {/if}
            {/each}
        </div>
        <button class="content-delete-button" on:click={()=>deleteListData(cardIndex,index)}>&times;</button>
    </div>
    <div class="card-list-body" on:click={()=>modalOpenHandler(list,index)}>
        {textConverter()}
    </div>
</div>