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
        scrollbar-width: none;
	}
	.card-title{
		padding:5px;
		background-color:#F9F9FA;
        color: #6c757d;
        cursor: pointer;
    }
    .card-bottom{
		padding:5px;
		background-color:#F9F9FA;
        color: #6c757d;
    }
	.content-wrapper{
        margin:auto;
        overflow:auto;
        scrollbar-width:none;
        width:100%;
        transition:1s;
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
    .label-delete-button{
        cursor: pointer;
        padding: 0;
        background-color: transparent;
        border: 0;
        -moz-appearance: none;
        font-weight: 700;
        line-height: 1;
        color: white;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
    }
    .label-delete-button:hover{
        text-shadow: 0 1px 0 #fff;
        box-shadow: 0 .25rem .75rem rgba(0,0,0,.2);
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
    .empty-card{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        color:white;
    }
	.add-new-button{
		width:100%;
		background-color:#23ad2a;
		color:white;
		cursor: pointer;
		border:none;
	}
	.add-new-button:hover{
		background-color:#17731c;
    }
    .float-right{
        float: right;
        cursor: pointer;
    }
    .card-selected-title{
        font-size:2rem;
        margin:5px;
    }
    .percentages-box{
        border-radius:15px; 
        padding:10px; 
        border:1px solid green; 
        margin:10px
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
        transition:0.5s;
        font-size:1em;
    }
</style>

<script>
    import CardList from './CardList.svelte'
    import Modal from './Modal.svelte'
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import {afterUpdate} from 'svelte'

    export let data
    export let addListDatas
    export let index
    export let deleteData
    export let deleteListData
    export let getListDetails
    export let setCheckedChecklist
    export let addChecklistDatas
    export let editListDetails

    const progress = tweened(0, {
		duration: 700,
		easing: cubicOut
    });

    afterUpdate(()=>{
        if(selectedCard !== null){
            newCardContent = selectedCard
        }
    })

    let inputValue = ''
    let inputCheckboxValue = ''
    let visible = false
    let selectedCard = null
    let newCardContent = {
        content:'',
        description:'',
        labels:[]
    }
    let listIndex = null
    let allCheckedDataLength = 0
    let checkedData = 0
    let editableMode = true
    let labelInput = ''
    let labelColor = ''

    const inputHandler = (e) =>{
        inputValue = e.target.value
    }

    const inputCheckboxHandler = (e) =>{
        inputCheckboxValue = e.target.value
    }

    const submitListCheckboxHandler = (index,listIndex) =>{
        console.log('index',index)
        console.log('listIndex',listIndex)
        if(inputCheckboxValue.length > 0){
            let newDate = new Date()
            let newData = {
                key:newDate.getTime(),
                done:false,
                content:inputCheckboxValue
            }
            addChecklistDatas(index,listIndex,newData)
            selectedCard = data.lists[listIndex]
            percentagesCounting(selectedCard)
            inputCheckboxValue = ''
        }
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
                labels:[],
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
        console.log(selectedCard)
        console.log(data)
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
        
        // karena jika penyebut berupa 0, maka hasilnya akan tak hingga
        if(allCheckedDataLength === 0){
            progress.set(0)
        }
        else{
            progress.set(checkedData/allCheckedDataLength)
        }
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
        selectedCard = data.lists[listIndex]
        percentagesCounting(data.lists[listIndex])
    }
    const deleteLabelList = (index) =>{
        let cloneContent = newCardContent
        cloneContent.labels =  cloneContent.labels.filter((label,i) => i !== index)
        
        newCardContent = cloneContent
        console.log(newCardContent)
    }
    const addNewLabel = () =>{
        if(labelInput.length > 0 && labelColor.length > 0){
            let cloneContent = newCardContent
            cloneContent.labels =  [...cloneContent.labels,{
                label:labelInput,
                color:labelColor
            }]
            newCardContent = cloneContent
        }
        else{
            alert('please fill label and color fields!')
        }
    }
    const editCard = () =>{
        // perlu callback
        editListDetails(newCardContent,index,listIndex)
        let newData = data
        newData.lists[listIndex] = newCardContent
        console.log('data',newData)

        data = newData
        selectedCard = newCardContent
        editableMode = false
        console.log('data',data)
    }
    const editableToogle = () =>{
        editableMode = !editableMode
    }
    const dropEventHandler = (e,i) =>{
        console.log('eventGetData ListIndex:',e.dataTransfer.getData('listIndex'))
        console.log('eventGetData CardIndex:',e.dataTransfer.getData('cardIndex'))
        console.log('index:',i)
    }
    const dragStartEvent = (e,cardIndex,listIndex) =>{
        console.log('Y')
        console.log(cardIndex)
        console.log(listIndex)
        e.preventDefault()
        e.dataTransfer.setData('cardIndex',cardIndex)
        e.dataTransfer.setData('listIndex',listIndex)
    }
    const dragOverEvent = (e) =>{
        console.log(e)
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }
</script>

<div class="card inline">
    <div class="card-title" on:click={()=>getListDetails(data)}>
        <span class="card-list-title">{data.title}</span>
        <button class="content-delete-button" on:click={deleteListHandler}>&times;</button>
    </div>
    <div class="content-wrapper" style={data.lists.length > 5 && `height:${window.innerHeight*70/100}px;`} on:drop={(e)=>dropEventHandler(e,index)} on:dragover={dragOverEvent}>
    {#if data.lists.length > 0}
        {#each data.lists as list,i}
            <CardList 
            list={list} 
            deleteListData={deleteListData} 
            cardIndex={index} 
            index={i} 
            modalOpenHandler={modalOpenHandler} 
            dragStartEvent={dragStartEvent}
            />
        {/each}
    {:else}
        <span class="empty-card">Card is empty.</span>
    {/if}
    </div>
    <div class="card-bottom">
        <input type="text" placeholder="Add Card .." on:change={inputHandler} bind:value={inputValue}/>
        <button class="add-button" on:click={submitListHandler}>+ Add</button>
    </div>
    <Modal
        visible={visible}
        closeHandler={modalCloseHandler}
        title="Card Details"
    >
        {#if editableMode}
            <button class="float-right" on:click={()=>editableToogle()}>Back to Details</button>
            <div>Change Title:</div>
            <input type="text" style="width:100%" placeholder="Change Title" bind:value={newCardContent.content} />

            <div>Change Description:</div>
            <textarea style="width:100%" placeholder="Description Card" bind:value={newCardContent.description} />

            <div>Labels:</div>
            <div style="margin:10px">
                {#each newCardContent.labels as label,i}
                    <span class="labels" style="background-color:{label.color}">
                    {label.label}
                    <button class="label-delete-button" on:click={()=>deleteLabelList(i)}>&times;</button>
                    </span>
                {/each}
            </div>
            <input type="text" placeholder="Add Label" bind:value={labelInput} />
            <select bind:value={labelColor}>
                <option value="">-- COLOR --</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="blue">blue</option>
            </select>
            <button on:click={()=>addNewLabel()}>+ Add Label</button>
            <button class="add-new-button" on:click={()=>editCard()}>Edit</button>
        {:else}
            <button class="float-right" on:click={()=>editableToogle()}>Edit Details</button>
            <div>Labels:</div>
            <div style="margin:10px">
                {#each selectedCard.labels as label}
                    <span class="labels" style="background-color:{label.color}">{label.label}</span>
                {/each}
            </div>
            <div class="card-selected-title">{selectedCard.content}</div>

            {#if selectedCard.description.length > 0}
            <div>Description:</div>
            <div class="description-box">{selectedCard.description}</div>
            {/if}
            
            {#if selectedCard.checklist.length > 0}
                <div class="percentages-box">
                    <div>Checklist Progress:</div>
                    <progress value={$progress}></progress>
                    <div>Percentages: {(checkedData/allCheckedDataLength)*100} %</div>
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
                </div>
            {/if}
            <input type="text" placeholder="Add New Checklist" on:change={inputCheckboxHandler} bind:value={inputCheckboxValue} />
            <button on:click={()=>submitListCheckboxHandler(index,listIndex)}>+ Add</button>
        {/if}
    </Modal>
</div>