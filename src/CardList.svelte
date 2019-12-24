<script>
    export let list
    export let deleteListData
    export let index
    export let cardIndex
    export let modalOpenHandler

    const textConverter = () =>{
        let result
        if(list.content.length > 35){
            result = list.content.substring(0,35) + '...'
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
        margin-bottom:10px;
        cursor: pointer;
    }
    .card-list-header{
        display: flex;
        align-items: center;
        padding: .25rem .75rem;
        color: #6c757d;
        background-color: rgba(255,255,255,.85);
        background-clip: padding-box;
        border-bottom: 1px solid rgba(0,0,0,.05);
    }
    .card-list-title{
        flex: 1
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
		padding:.75rem
	}
</style>

<div class="card-list" on:click={()=>modalOpenHandler(list)}>
    <div class="card-list-header">
        <span class="card-list-title">Warna</span>
        <button class="content-delete-button" on:click={()=>deleteListData(cardIndex,index)}>&times;</button>
    </div>
    <div class="card-list-body">
        {textConverter()}
    </div>
</div>