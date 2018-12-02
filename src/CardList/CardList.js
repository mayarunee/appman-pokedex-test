import React, { Component } from 'react'

class CardList extends Component {
  constructor() {
    super();
 
    this.state = {
      hp: 100,
      str: 0,
      weal: 0
    };

    
  }
  componentDidMount() {
    this.props.list.map((b,i) => {
      if(b.hp <= 100 ) {
        console.log(b.hp)
        this.setState({
          hp: b.hp
        })
      }
    })
  }
    calcHp(hp) {
      let percent = 0
      if(parseInt(hp) <= 100 ) {
        percent = hp
      } else {
        percent = 100
      }
      return percent + '%'
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
    return (
      <div className="card-list">
       
          {this.props.list.map((b,i) => {
           card = this.calc(b)
            return ( 
            <div key={i} className={this.props.className +" card-box"}>
              <div className="image"><img src={b.imageUrl} /></div>
              <div className="details">
                {this.props.addlist && <div className="add" onClick={() => this.props.addlist(b)}>Add</div>}
                {this.props.removelist && <div className="remove" onClick={() => this.props.removelist(b)}>x</div>}
                <div className="name">{b.name}</div>

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
            </div>)
            })}
         
       
      </div>
    )
  }
}

export default CardList
