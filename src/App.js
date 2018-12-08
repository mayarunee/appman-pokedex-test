import React, { Component } from 'react'
import CardList from './CardList/CardList'
import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}
const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: '0',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '41%',
    paddingTop: '0'
  }
};
const Card = {
  AllList: [],
  AddList: [],
  ShowList: []
}


class App extends Component {
  constructor() {
    super();
 
    this.state = {
      modalOpen: 'close',
      allList: [],
      selectedList: [],
      list: []
    }
 
   
  }
  componentDidMount() {
    this.fetchHandle()
  }
 
  openListHandler = () => {
    this.setState({allList: this.state.list})
    this.openModal()
  }
  openModal = () => {
    this.setState({
      modalOpen: (this.state.modalOpen === 'close')? 'open': 'close'
    })
  }
  addItem = (itemIndex) => {
    const arrAll = [...this.state.allList]
    let arrSelect = [...this.state.list]
    let arrSelected = [...this.state.selectedList]
    
    arrAll.map((value,i )=> {
      if (value.id === itemIndex){
        arrSelected.push(value)
      }
    })
    arrSelect = arrSelect.filter(v => {
      return (v.id !== itemIndex)
    })

    this.setState({selectedList: arrSelected, list: arrSelect})
  }
  removeItem = (itemIndex) => {
    const arrAll = [...this.state.allList]
    let arrSelect = [...this.state.list]
    let arrSelected = [...this.state.selectedList]
    
    arrAll.map((value,i )=> {
      if (value.id === itemIndex){
        arrSelect.push(value)
      }
    })
    arrSelected = arrSelected.filter(v => {
      return (v.id !== itemIndex)
    })
  
    this.setState({selectedList: arrSelected, list: arrSelect})
  }
  fetchHandle(name,type) {
    let url = "http://localhost:3030/api/cards"
    let _limit = '?limit=20'
    let _name = (name)? '&name='+name : ''
    let _type = (type)? '&type='+type : ''

    fetch(`${url}${_limit}${_name}${_type}`)
    .then((res) => res.json())
    .then(data => { 
      this.setState({list: data.cards})
      })
  }
  onSearchChange(e) {
    this.fetchHandle(e.target.value)
  }

 
  
  render() {

    let list = null
    let selectedList = null
    if(this.state.list) {
      list = (
        this.state.list.map((v,i)=> {
          return <CardList key={i} listIndex={i} item={v} showAdd={true} addItem={() => this.addItem(v.id)} />
        })
      )
    }
    if(this.state.selectedList) {
      selectedList = (
        this.state.selectedList.map((v,i)=> {
          return <CardList key={i} listIndex={i} item={v} showRemove={true} removeItem={() => this.removeItem(v.id)} className="grid"/>
        })
      )
    }

    return (
      <div className="App">
        <div className="header"><h1>My Pokedex</h1></div>
        <div className="card-list">
        {selectedList}
        </div>

        <div className={this.state.modalOpen+" modal"} onClick={this.openModal}></div>
        <div className={this.state.modalOpen+" modal-dialog"}>
          <div className="modal-header">Card List <span onClick={this.openModal}>x</span></div>
          <div className="modal-body">
            <div className="search">
            <input
                  onChange={(e) => { this.setState({ searchText: e.target.value }); this.onSearchChange(e) }}
                  value={this.state.searchText}
                  ref={(input) => this.searchInput = input}
                  style={{ borderRadius: 8}} className="form-control" name="searchText" type="text" placeholder="Find pokedex"></input>
            </div>
            <div className="box">{list}</div>  
          </div>
        </div>

        <div className="bottomBar"><div className="plus" onClick={this.openListHandler}>+</div></div>
      </div>
    )
  }
}

export default App

