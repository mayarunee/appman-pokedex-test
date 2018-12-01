import React, { Component } from 'react'
import CardList from './CardList/CardList'
import './App.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        list: [],
        searchText: '',
    }
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    let url = "http://localhost:3030/api/cards"
    let limit = 10
    let name = "picha"
    let type = "normal"
   // let list = []
   // console.log(`http://localhost:3030/api/cards?type=${limit}&name=${name}&type=${type}`)

    fetch('http://localhost:3030/api/cards' )
            .then(res => res.json())
            .then(
                (result) => {
                  
                  this.setState({
                    list: result.cards
                  })
                },
                (error) => {
                    this.setState({
                        error: "error"
                    })
                }
            )
  }
  onSearchChange(e) {
    
    this.setState({
        searchText: e.target.value
    })
  }

  toggle() {
    this.setState({
        modal: !this.state.modal
    })
    
  }
  renderList() {
    var mapped = this.state.list.map((b,i) => {
        return ( 
        <div key={i} className="card-box">
          <div className="image"><img src={b.imageUrl} /></div>
          <div className="details">
            <div className="name">{b.name}</div>
            <div className="hp">{b.hp}</div>
          </div>
        </div>)
        })
    return mapped
  }
  
  render() {
    return (
      <div className="App">
        <div className="header"><h1>My Pokedex</h1></div>
        <CardList />
        <div className="bottomBar"><div className="plus" onClick={this.toggle}>+</div></div>

        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody> <div className="card-list">
          <input
              onChange={(e) => { this.setState({ searchText: e.target.value });  }}
              value={this.state.searchText}
              ref={(input) => this.searchInput = input}
              style={{ marginLeft: 15, marginRight: 60, borderRadius: 8, position: 'relative', marginBottom: 20, }} className="form-control" name="searchText" type="text" placeholder="search"></input>

            {  this.renderList()}</div>
          </ModalBody>
          <ModalFooter>
         
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default App

