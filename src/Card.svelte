<style>
	.inline{
		display: inline-block;
		white-space: normal;
		vertical-align: top;
	}
	.card{
		border-radius:.25rem;
		box-shadow: 0 .25rem .75rem rgba(0,0,0,.2);
		width:300px;
        margin-right:1rem;
        background-color:rgba(255, 255, 255, 0.4);
	}
	.card-title{
		padding:5px;
		background-color:#F9F9FA;
        color: #6c757d;
        cursor: pointer;
	}
	.content-wrapper{
		padding:5px
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
    .add-button{
        cursor: pointer;
    }
    .description-box{
        padding:10px;
        margin-top:10px;
        height:150px;
        overflow:auto;
        border-radius: .25rem;
        background-color: rgba(228, 228, 228, 0.4);
    }
    progress {
		display: block;
        width: 100%;
        border:none;
	}
</style>

<script>
    import CardList from './CardList.svelte'
    import Modal from './Modal.svelte'
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    
    export let data
    export let addListDatas
    export let index
    export let deleteData
    export let deleteListData
    export let getListDetails
    export let setCheckedChecklist

    const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
    });

    let inputValue = ''
    let visible = false
    let selectedCard = null
    let listIndex = null
    let allCheckedDataLength = 0
    let checkedData = 0

    const inputHandler = (e) =>{
        inputValue = e.target.value
    }

    const deleteListHandler = () =>{
        deleteData(index)
    }

    const submitListHandler = () =>{
        if(inputValue.length > 0){
            let newDate = new Date()
            let newData = {
                key:newDate.getTime(),
                content:inputValue,
                description:'',
                checklist:[],
                comments:[]
            }
            addListDatas(index, newData)
            inputValue = ''
        }
    }

    const modalOpenHandler = (list,i) =>{
        visible=true
        selectedCard=list
        listIndex=i
        console.log(list)
        percentagesCounting(list)
    }

    const percentagesCounting = (list) =>{
        allCheckedDataLength = list.checklist.length
        let tempLength = 0
        list.checklist.map(item => {
            if(item.done){
                tempLength+=1
            }
        })
        checkedData = tempLength

        console.log(allCheckedDataLength)
        console.log(checkedData)

        progress.set(checkedData/allCheckedDataLength)
    }

    const modalCloseHandler = () =>{
        visible=false
        selectedCard=null
        listIndex=null
        progress.set(0)
    }

    const setChecklist = (e,listIndex,index,i) =>{
        e.preventDefault();
        setCheckedChecklist(e.target.checked,listIndex,index,i)
        console.log(index)
        console.log(listIndex)
        console.log(i)
        console.log(data.lists)
        percentagesCounting(data.lists[listIndex])
    }
</script>

<div class="card inline">
    <div class="card-title" on:click={()=>getListDetails(data)}>
        <span class="card-list-title">{data.title}</span>
        <button class="content-delete-button" on:click={deleteListHandler}>&times;</button>
    </div>
    <div class="content-wrapper">
    {#if data.lists.length > 0}
        {#each data.lists as list,i}
            <CardList list={list} deleteListData={deleteListData} cardIndex={index} index={i} modalOpenHandler={()=>modalOpenHandler(list,i)} />
        {/each}
    {:else}
        <span>Card is empty.</span>
    {/if}
    </div>
    <div class="card-title">
        <input type="text" placeholder="Add new List .." on:change={inputHandler} bind:value={inputValue}/>
        <button class="add-button" on:click={submitListHandler}>+ Add</button>
    </div>
    <Modal
        visible={visible}
        closeHandler={modalCloseHandler}
        title="Card Details"
    >
        <div>{selectedCard.content}</div>

        {#if selectedCard.description.length > 0}
        <div>Description:</div>
        <div class="description-box">{selectedCard.description}</div>
        {/if}
        
        {#if selectedCard.checklist.length > 0}
            <div>Checklist:</div>
            <progress value={$progress}></progress>
            <div>
                {#each selectedCard.checklist as list,i}
                <div>
                    <input type="checkbox" checked={list.done} on:change={(e)=>setChecklist(e,listIndex,index,i)}/> 
                    {#if list.done} 
                    <strike>{list.content}</strike> 
                    {:else} 
                    {list.content} 
                    {/if}
                </div>
                {/each}
            </div>
        {/if}
    </Modal>
</div>