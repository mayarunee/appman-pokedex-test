import React, { Component } from 'react'

class CardList extends Component {
  constructor() {
    super();
    
  }
 

  calc(card) {
  let Output = {
      hp: 100,
      atk: 0,
      weak: 0,
      damage: 0,
      level: 0
    }

    if(parseInt(card.hp) <= 100 ) {
      Output.hp = card.hp
    } 
   
    if(card.attacks) { 
      card.attacks.map((v) => {
        let removedText =  v.damage.replace(/[^0-9]/, '');
        Output.damage += parseInt(removedText)
     })
    
    }

    if(card.weaknesses) {
      if(card.weaknesses.value === '1'){
       
        Output.weak = 100
      }
    }
    
    Output.level = Math.round(((Output.hp/10) + (Output.damage/10) + 10 - (Output.weak)) / 5)

    return Output 
  }
  render() {
    let card = null
    card = this.calc(this.props.item)
    return (
      <div  className={this.props.className +" card-box"}>
        <div className="image"><img src={this.props.item.imageUrl} /></div>
        <div className="details">
        
          {this.props.showAdd && <div className="add" onClick={this.props.addItem}>Add</div>}
          {this.props.showRemove && <div className="remove" onClick={this.props.removeItem}>X</div>}
          <div className="name">{this.props.item.name}</div>

          <div className="bar">
            <div className="label">HP</div>
            <div className="value light-grey">
              <div className="level" style={{width:card.hp+"%"}}>&nbsp;</div>
            </div>
          </div>
          <div className="bar">
            <div className="label">STR</div>
            <div className="value light-grey">
              {card.atk !== "0" &&  <div className="level" style={{width:card.atk+"%"}}>&nbsp;</div>}
              {card.atk === "0" && <div className="nolevel">&nbsp;</div>}
            </div>
          </div>
          <div className="bar">
            <div className="label">WEAK</div>
            <div className="value light-grey">
              {card.weak !== 0 && <div className="level" style={{width:card.weak+"%"}}></div>}
              {card.weak === 0 && <div className="nolevel">&nbsp;</div>}
            </div>
          </div>
          <div className="bar">
            <div className={"happy" + card.level}>
              <div className="level-hap">&nbsp;</div>
            </div>
          </div>

        </div>
      </div>
      )
  
  }
}

export default CardList
