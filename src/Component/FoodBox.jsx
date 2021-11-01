import React, {Component} from 'react'

export default class FoodBox extends Component{
    constructor(props){
        super(props);
        this.state = {
          foods:[
            {name: "banana", calories: "89", img: "https://media.istockphoto.com/photos/bananas-picture-id488725861?k=20&m=488725861&s=612x612&w=0&h=1FfL61-FGQkXAJek6ZPKZaEN-cv9_Amcep_bRoU5ZCQ="},
            {name: "apple", calories: "52", img: "https://images.unsplash.com/photo-1584306670957-acf935f5033c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"},
            {name: "noodles", calories: "138", img:"https://images.immediate.co.uk/production/volatile/sites/2/2019/08/OLI0719-Healthy_GazpachoSauceSpaghetti_32486-65c6c58.jpg?quality=90"},
            {name: "milk", calories:"42", img: "https://assets3.thrillist.com/v1/image/1694700/1584x1056/crop;jpeg_quality=60;progressive.jpg"}, 
            {name: "orange", calories:"47", img: "https://media.istockphoto.com/photos/orange-picture-id185284489?k=20&m=185284489&s=612x612&w=0&h=LLY2os0YTG2uAzpBKpQZOAC4DGiXBt1jJrltErTJTKI="}, 
            {name: "fried rice", calories:"163", img: "https://b.zmtcdn.com/data/reviews_photos/7ca/00f5d9d3f4ddb66a6d1fb23aad24c7ca_1555308843.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"}, 
            {name: "chapathi", calories:" 71", img: "https://b.zmtcdn.com/data/pictures/5/19138865/1d6d7416903822f9d53ed7823d70a9c2.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"}, 
            {name: "dosa", calories:"170", img: "https://b.zmtcdn.com/data/pictures/3/19283723/e5fa4483e41768f0ba59b451f032e42c.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"}, 
            {name: "rice", calories:"130", img: "https://b.zmtcdn.com/data/reviews_photos/f5c/59e5a7012c2f8082d6d055fbf402ef5c_1631890416.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"}, 
            {name: "idly", calories:"90", img: "https://b.zmtcdn.com/data/pictures/6/19034676/acc9f2667de660d583c066a3a09b344d.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*"}
            ],
        searchTxt: "",
        totalCals: 0,
        selectedFood: []
    }
}

searchFood = (event) => {
  this.setState({
    searchTxt: event.target.value
  })
}

capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

addFood = (event) => {
  let count = document.getElementById(event.target.value).value;
  let cal = this.state.foods.filter((food) => {
      return food.name === event.target.value;
  })
  let foodObj = {
      id: event.target.value,
      text: `${count} ${event.target.value} = ${(cal[0].calories) * count}`,
      btn_id: `${event.target.value}R`,
      calo: cal[0].calories * count
  }
  this.setState({
      selectedFood: this.state.selectedFood.concat(foodObj),
      totalCals: this.state.totalCals + (cal[0].calories * count)
  })
  console.log(this.state.selectedFood);
}


removeFood = (event) => {
  document.getElementById(event.target.value).remove();
  let calorie = this.state.selectedFood.filter((food) => {
      return `${food.id}R` === event.target.value
  })
  this.setState({
      totalCals: this.state.totalCals - calorie[0].calo
  })
}

render() 
{
    return(
      <div className="container">
        <div className="header"> 
        <h3>Pro-Nutritions</h3>
        </div>
        <div className="media-left">
          <h4>Search</h4>
          <input type="text" id="search" onChange={this.searchFood} placeholder="Find a Food.." />
          <div className="box">
            
            
            {
            this.state.foods.filter((food) => {
                  return food.name.includes(this.state.searchTxt)
            }) 

            .map((food) => {
                return <div className="content" key={food.name}>
                <img src={food.img} alt="" />
                <div className="detail">
                <h4>{this.capitalize(food.name)}</h4>
                <p>{food.calories}</p>
                </div>
                <div className="count">
                <input type="number" defaultValue="1" id={food.name} min="0" />
                <button onClick={this.addFood} value={food.name} className="addItems">+</button>
                </div>
                </div>
              })} 
          </div>
        </div>


        <div className="media-right">
        <h4>Today's Food {this.state.totalCals} cal</h4>
        <div className="foodDisplay">
        {
                            this.state.selectedFood.filter((food) => {
                                return food.text !== "";
                            })
                                .map((food) => {
                                    return <div key={food.id} className="item" id={food.btn_id}>
                                        <span>{food.text}</span>
                                        <button onClick={this.removeFood} value={food.btn_id}>X</button>
                                    </div>
                                })
                        }
        </div>
      </div>
    </div>
  )}
}

