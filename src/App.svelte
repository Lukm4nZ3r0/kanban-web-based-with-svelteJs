<style>
	.container{
		background-image:url(http://getwallpapers.com/wallpaper/full/d/7/3/369465.jpg);
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: cover;
		height:100%;
		overflow: hidden;
	}
	.header{
		background-color:white;
		padding:15px;
	}
	.wrapper{
		overflow: auto;
		white-space: nowrap;
		vertical-align: top;
		padding: 15px;
		height:100%;
		/* scrollbar-width: none; */
	}
	.inline{
		display: inline-block;
	}
	.label{
		padding: 5px;
		color: white;
		border-radius: .25rem;
	}
	.list-selected-title{
		font-size:2rem
	}
	.add-new-card{
		border-radius:.25rem;
		box-shadow: 0 .25rem .75rem rgba(0,0,0,.2);
		width:300px;
		margin-right:1rem;
		padding:10px;
		border:none;
		cursor: pointer;
		transition:0.3s;
	}
	.add-new-card:hover{
		background-color:rgba(221, 221, 221, 0.7);
		transition:0.3s;
	}
	.add-new-list-button{
		width:100%;
		background-color:#23ad2a;
		color:white;
		cursor: pointer;
		border:none;
	}
	.add-new-list-button:hover{
		background-color:#17731c;
	}
</style>

<script>
	import Card from './Card.svelte'
	import Modal from './Modal.svelte'
	import DummyData from './DataDummy'
	export let name;

	let datas = DummyData
	let listSelected = null
	let inputNewList=''

	let visible = false
	let addListModalVisible = false

	const inputNewListHandler = (e) =>{
		inputNewList = e.target.value
	}

	const addNewListHandler = () =>{
		let newDate = new Date()
		let newData = {
			key:newDate.getTime(),
			labels:[],
			title:inputNewList,
			lists:[]
		}
		datas = [...datas, newData]
		inputNewList = ''
		addListModalVisible = false
	}

	const addListDatas = (index, newListData) =>{
		console.log(index)
		console.log(newListData)
		datas[index].lists = [...datas[index].lists, newListData]
		console.log(datas)
	}

	const addChecklistDatas = (index,listIndex,newListData) =>{
		let newData = datas
		newData[index].lists[listIndex].checklist = [...newData[index].lists[listIndex].checklist, newListData]
		datas = newData
		console.log(datas)
	}

	const deleteData = (index) =>{
		let newData = datas
		newData.splice(index,1)

		datas = newData
		console.log(datas)
	}

	const deleteListData = (cardIndex,index) =>{
		console.log('cardIndex',cardIndex)
		console.log('index',index)
		let newData = datas
		newData[cardIndex].lists.splice(index,1)
		datas = newData
		console.log(datas)
	}

	const getListDetails = (data) =>{
		listSelected = data
		visible = true
		console.log(data)
	}

	const editListDetails = (newData,index, cardIndex) =>{
		let newDatas = datas
		newDatas[index].lists[cardIndex] = newData

		datas = newDatas
		console.log(datas)
	}

	const closeModalHandler = () =>{
		listSelected = null
		visible = false
	}

	const setCheckedChecklist = (value,listIndex,cardIndex,checkboxIndex) =>{
		let newData = datas
		newData[cardIndex].lists[listIndex].checklist[checkboxIndex].done = value
		datas = newData
	}
	const openAddNewListModal = () =>{
		addListModalVisible = true
	}
	const closeAddNewListModal = () =>{
		addListModalVisible = false
	}
</script>

<div class="container">
	<div class="header">{name}</div>
	<div class="wrapper">
		{#each datas as data, i}
			<Card 
				data={data} 
				deleteData={deleteData}
				addListDatas={addListDatas} 
				index={i} 
				deleteListData={deleteListData}
				getListDetails={getListDetails}
				setCheckedChecklist={setCheckedChecklist}
				addChecklistDatas={addChecklistDatas}
				editListDetails={editListDetails}
			/>
		{/each}
		<button class="inline add-new-card" on:click={openAddNewListModal}>
			+ Add New List
		</button>
	</div>
	<Modal
		visible={visible}
		closeHandler={closeModalHandler}
		title="List Details"
	>
		<div class="list-selected-title">{listSelected.title}</div>
		{#if listSelected.labels.length > 0}
			<span>Label :</span>
			<div style="margin:10px">
				{#each listSelected.labels as label}
					<span class="label" style="background-color:{label.bgColor}">{label.label}</span>
				{/each}
			</div>
		{/if}
	</Modal>
	<Modal
		visible={addListModalVisible}
		closeHandler={closeAddNewListModal}
		title="Add New List"
	>
		<div>List Title:</div>
		<input type="text" placeholder="Title" style="width:100%" bind:value={inputNewList} on:change={inputNewListHandler} />
		<button class="add-new-list-button" on:click={addNewListHandler}>+ Add</button>
	</Modal>
</div>