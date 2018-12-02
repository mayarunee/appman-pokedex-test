import React, { Component } from 'react'
import CardList from './CardList/CardList'
import './App.css'
import Modal from 'react-modal';

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
      modalIsOpen: false,
      searchText: '',
      selectedList: []
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({modalIsOpen: true, searchText: ''});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
    this.displayAll()
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }   
  

  onSearchChange(e) {
 
    this.displayAll(e.target.value)
  }

  toggle() {
    this.setState({
        modal: !this.state.modal
    })
    
  }
  displayAll(val){
    let allList = Card.AllList
    let row = null
    let url = "http://localhost:3030/api/cards"
    let limit = 20
    let name = val || ''
    let type = ''

    fetch(url + "?limit="+limit +"&name=" + name +"&type=" + type)
      .then(res => res.json())
      .then(
          (result) => {
            if(result.cards.length > 0) {
              this.setState({
                list: result.cards
              })
              return
            } else {
              type = name
              name = ''
              fetch(url + "?limit="+limit +"&name=" + name +"&type=" + type)
              .then(res => res.json())
              .then(
                  (result) => {
                    if(result.cards.length > 0) {
                      this.setState({
                        list: result.cards
                      })
                    } 
                  }
              )
              
            }
            
          }
      )
    

  }
  displaySelected(id) {
    let list = [...this.state.list] 
    this.setState({
      selectedList: [...this.state.selectedList, id],
      list: this.arrayRemove(list, id)
    })
  }
  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }
  deleteList(id) {
    let list = [...this.state.selectedList] 
 
    this.setState({
      selectedList: this.arrayRemove(list, id)
    })
  }
  renderList(list) {
    let allList = Card.AllList
   
    allList.map((b,i) => {
        return (
           <div key={i} className="card-box">
            <div className="image"><img src={b.imageUrl} /></div>
            <div className="details">
              <div className="name">{b.name}</div>
              <div className="hp">{b.hp}</div>
            </div>
          </div>
        )
     
      })
     
  }
  
  render() {
  //  console.log('render' ,Card.ShowList)
   // this.listHandler()
   
    return (
      <div className="App">
        <div className="header"><h1>My Pokedex</h1></div>
        <div>
        {this.state.selectedList.length > 0 && <CardList list={this.state.selectedList} removelist={(id) => this.deleteList(id)} className="grid" />}
        </div>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >
 
          <div className="search">
            <input
                  onChange={(e) => { this.setState({ searchText: e.target.value }); this.onSearchChange(e) }}
                  value={this.state.searchText}
                  ref={(input) => this.searchInput = input}
                  style={{ borderRadius: 8}} className="form-control" name="searchText" type="text" placeholder="Find pokedex"></input>
          </div>
        
          {this.state.list && <CardList list={this.state.list} addlist={(id) => this.displaySelected(id)} className="list"/>}
        </Modal>
        <div className="bottomBar"><div className="plus" onClick={this.openModal}>+</div></div>
      </div>
    )
  }
}

export default App

