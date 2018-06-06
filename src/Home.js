import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class Home extends React.Component {
  //Declare State
  constructor(){
    super();
    this.state = {
      Data: [],
      isLoaded: false,
      ArrMoney: [1000, 500, 100, 50, 20, 10, 5, 2, 1],
      TicketMessage: '',
      MoneyReceivedMessage: '',
      isTicketCorrect: false,
      isMoneyReceivedCorrect: false,
      isBtnDisable: true,
    }
    this.ValidateInput = this.ValidateInput.bind(this);
  }

  async componentDidMount() {
    // Get data from API and Assign to state
    await fetch("http://www.mocky.io/v2/5af178123000003700ba7ff2",{method:'get'})
      .then(res=>res.json())
      .then(
        (result)=>{
          //console.log(result.data);
          var temp=result.data;
          var isFirstData=1;
          for (var i = 0; i < temp.length; i++) {
            // console.log(result.data[i].now_showing);
            // Set default movie Data
            if(result.data[i].now_showing===true){
              if(isFirstData===1){
                this.props.setPricePerTicket(result.data[i].price);
                this.props.setMovie(result.data[i].name);
                this.props.setImgage(result.data[i].image);
                result.data[i].className="demo w3-hover-opacity-off";
                isFirstData=0;
              }else{
                result.data[i].className="demo w3-opacity w3-hover-opacity-off";
              }
              this.state.Data.push(result.data[i]);
            }
          }
          this.setState({isLoaded:true});
        });
      // console.log(this.state.Data);
  }

  //Calulate total price if there're any change on input tag
  setTicket(event){
    //console.log('setTicket'+event.target.value);
    let TempTicket = parseInt(event.target.value);
    this.props.setTicket(TempTicket);
    let PricePerOne=this.props.data.PricePerTicket;
    let ticket=event.target.value;
    if(isNaN(event.target.value)){
      this.props.setTicket(0);
      ticket=0;
    }
    var Price=ticket*PricePerOne;
    // console.log(PricePerOne);
    this.props.setPrice(Price);
    this.ValidateInput(TempTicket,this.props.data.MoneyReceived,this.props.data.ExchageMoney,Price);
  }

  //Set movie to state and calulate total price 
  setMovie(event){
    // console.log(event.target.value);
    let TempArr = this.state.Data;
    for (var i = 0; i < this.state.Data.length; i++) {
      if(this.state.Data[i].id==event.target.value){
        this.props.setMovie(this.state.Data[i].name);
        this.props.setPricePerTicket(this.state.Data[i].price);
        let ticket=this.props.data.Ticket;
        let PricePerOne=this.state.Data[i].price;
        var Price=ticket*PricePerOne;
        this.props.setPrice(Price);
        this.props.setImgage(this.state.Data[i].image);
        TempArr[i].className="demo w3-hover-opacity-off";
        this.ValidateInput(this.props.data.Ticket,this.props.data.MoneyReceived,this.props.data.ExchageMoney,Price);
      }else{
        TempArr[i].className="demo w3-opacity w3-hover-opacity-off";
      }
    }
    this.setState({Data:TempArr});
  }

  //Sending data to Summary page

  //Set received money to state
  setReceivedMoney(event){
    //this.setState({MoneyReceived:event.target.value});
    let TempMoney=parseInt(event.target.value);
    this.props.setReceivedMoney(TempMoney);
    let ExchageMoney = TempMoney-this.props.data.Price;
    this.props.setExchaneMoney(ExchageMoney);
    this.ValidateInput(this.props.data.Ticket,event.target.value,this.props.data.ExchageMoney,this.props.data.Price);
  }

  //Choose movie from poster
  ClickPicture(event){
    let TempArr = this.state.Data;
    for (var i = 0; i < this.state.Data.length; i++) {
      if(this.state.Data[i].id==event.target.id){
        //console.log("found"+event.target.id+"and data[i]"+this.state.Data[i].id);
        this.props.setMovie(this.state.Data[i].name);
        this.props.setPricePerTicket(this.state.Data[i].price);
        let ticket=this.props.data.Ticket;
        if(isNaN(ticket)){
          this.props.setTicket(0);
          ticket=0;
        }
        let PricePerOne=this.state.Data[i].price;
        var Price=ticket*PricePerOne;
        this.props.setPrice(Price);
        this.props.setImgage(this.state.Data[i].image);
        document.getElementById("Selector").value = this.state.Data[i].id;
        // console.log(TempArr[i].className);
        TempArr[i].className="demo w3-hover-opacity-off";
        this.ValidateInput(this.props.data.Ticket,this.props.data.MoneyReceived,this.props.data.ExchageMoney,Price);
      }else{
        TempArr[i].className="demo w3-opacity w3-hover-opacity-off";
      }
    }
    //Update state
    this.setState({Data:TempArr});
  }

  ValidateInput(Ticket,MoneyReceived,ExchangeMoney,Price){
    this.setState({isBtnDisable:false});
    ExchangeMoney = MoneyReceived - Price;
    let isMoneyReceivedCorrect = this.state.isMoneyReceivedCorrect;
    let isTicketCorrect = this.state.isTicketCorrect;
    if((ExchangeMoney<0)||(Price>MoneyReceived)){
      if(MoneyReceived!=0){
        this.setState({MoneyReceivedMessage:'จำนวนเงินต้องไม่น้อยกว่า Total Price',isMoneyReceivedCorrect:false});
        this.setState({isBtnDisable:true});
        isMoneyReceivedCorrect = false;
      }else{

      }      
    }else{
      this.setState({MoneyReceivedMessage:'',isMoneyReceivedCorrect:true});
      isMoneyReceivedCorrect = true;
    }

    if((Ticket<0)){
      this.setState({TicketMessage:'กรุณากรอกเฉพาะจำนวนมากกว่า 0',isTicketCorrect:false});
      this.setState({isBtnDisable:true});
      this.props.setPrice(0);
      isTicketCorrect = false;
    }else{
      if((Ticket!=0)&&(isNaN(Ticket))==0){
        this.setState({TicketMessage:'',isTicketCorrect:true});
        isTicketCorrect = true;
      }
    }

    if(isNaN(Ticket)){
      isTicketCorrect = false;
    }

    if(((isMoneyReceivedCorrect===true)&&(isTicketCorrect==true))&&(Ticket!=0)&&(MoneyReceived!=0)){
      this.props.setExchaneMoney(ExchangeMoney);
      this.setState({isBtnDisable:false});
      this.props.setInputCorrect(true);
      let IndexArrMoney = 0;
      let ArrChange = [];
      if(ExchangeMoney===0){
        //If input money is equal to total price push "-" to Array
        let tempArrChange=["-"]
        this.props.setArrChange(tempArrChange);
        this.props.setArrObjChange(tempArrChange);
      }else{
        //Loop until all exchange money is a banknote or coin
        this.props.setExchaneMoney(ExchangeMoney);
        let tempArrObjChange=[];
        let count = 0;
        while(ExchangeMoney>0){
          //Check exchange money can separate into which banknote or coin
          if(parseInt((ExchangeMoney/this.state.ArrMoney[IndexArrMoney]),10)>0){
            //Push that banknote or coin into array
            ExchangeMoney = ExchangeMoney-this.state.ArrMoney[IndexArrMoney];
            ArrChange.push(this.state.ArrMoney[IndexArrMoney]);
            count++;
          }else{
            //If can't separate into this banknote or coin,Let move to next index
            //console.log("Arrmoney:"+this.state.ArrMoney[IndexArrMoney]);
            //console.log("count:"+count);
            if(count>0){
              let TempObj={
                BankOrCoin:this.state.ArrMoney[IndexArrMoney],
                NumberOfBankOrCoin:count
              }
              tempArrObjChange.push(TempObj);
            }
            IndexArrMoney++;
            count=0;
          }
        }
        //Make sure that last ChangeObject has been add
        if(count>0){
          let TempObj={
            BankOrCoin:this.state.ArrMoney[IndexArrMoney],
            NumberOfBankOrCoin:count
          }
          tempArrObjChange.push(TempObj);
        }else{
          count=0;
        }
        this.props.setArrObjChange(tempArrObjChange);
        this.props.setArrChange(ArrChange);
      }
    }else{
      this.setState({isBtnDisable:true});
      this.props.setInputCorrect(false);
    }
  }

  // Rending Html
  render() {
    const list=this.state.Data;
    const listData=list.map((list=>
      <option key={list.id} id = {list.id} name="movie" value={list.id}>{list.name}</option>
    ));
    const list2=this.state.Data;
    const listSmallImage=list2.map((list2=>
      <div class="col-sm-3">
        <input type="hidden" value = {list2.id}/>
        <img onClick={this.ClickPicture.bind(this)} name={"img"+list2.id} className={list2.className} id ={list2.id} style={{ cursor: 'pointer' }}  src={list2.image}/>
      </div>
    ));
    if(this.state.isLoaded===true){
      return (
        <div>
          <h1 style={{textAlign:'center'}}>Welcome to Movie Ticket Machine</h1>
          <div class="row" style={{marginTop :50,marginButtom:50}}>
            <div class="col-sm-12">
              {listSmallImage}
            </div>
            <div class="col-sm-12">
              <div class="col-sm-4">
                
              </div>
              <div class="col-sm-4">
                <br/>
                <form style={{fontSize:20}}>
                  Please select movie
                  <select id="Selector" style={{fontSize:16,height:35}} class="form-control" onChange={this.setMovie.bind(this)}>
                    {listData}
                  </select>
                  Please input number of ticket 
                  <input style={{fontSize:16,height:35}} class="form-control" id = "ticket" type="number" min = "0" onChange={this.setTicket.bind(this)}/>
                  <p style={{color:'red'}}>{this.state.TicketMessage}</p>
                  Total price {this.props.data.Price} baht <br/><br/><input type="hidden" value={this.props.data.Price} id="Price"/>
                  Money received 
                  <input style={{fontSize:16,height:30}} class="form-control" id = "received" type="number" min = "0" onChange={this.setReceivedMoney.bind(this)}/><br/>
                  <p style={{color:'red'}}>{this.state.MoneyReceivedMessage}</p>
                  <Link to="Summary"><button style={{fontSize:16,height:40,width:70}} disabled={this.state.isBtnDisable} class="btn btn-success" type = "submit">ซื้อ</button></Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return(<div>Loading...</div>);
    }
  }
}

const mapStatetoProps=(state)=>{
    return {
      data:state.data
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return {
      setPricePerTicket:(inputdata)=>{
        dispatch({
          type:"setPricePerTicket",
          payload:inputdata
        });
      },setTicket:(inputdata)=>{
        dispatch({
          type:"setTicket",
          payload:inputdata
        });
      },setMovie:(inputdata)=>{
        dispatch({
          type:"setMovie",
          payload:inputdata
        });
      },setMovieID:(inputdata)=>{
        dispatch({
          type:"setMovieID",
          payload:inputdata
        });
      },setPrice:(inputdata)=>{
        dispatch({
          type:"setPrice",
          payload:inputdata
        });
      },setReceivedMoney:(inputdata)=>{
        dispatch({
          type:"setReceivedMoney",
          payload:inputdata
        });
      },setArrChange:(inputdata)=>{
        dispatch({
          type:"setArrChange",
          payload:inputdata
        });
      },setExchaneMoney:(inputdata)=>{
        dispatch({
          type:"setExchaneMoney",
          payload:inputdata
        });
      },setInputCorrect:(inputdata)=>{
        dispatch({
          type:"setInputCorrect",
          payload:inputdata
        });
      },setImgage:(inputdata)=>{
        dispatch({
          type:"setImgage",
          payload:inputdata
        });
      },setArrObjChange:(inputdata)=>{
        dispatch({
          type:"setArrObjChange",
          payload:inputdata
        });
      }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Home);