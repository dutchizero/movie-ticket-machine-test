import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Summary extends React.Component {
  // Rending Html
  	link(){
  		window.location.assign('/');
  	}
	render() {
      	//console.log(this.props.data.isInputCorrect);
      	let ObjDisplay = [];
      	if(this.props.data.Exchange==0){
      		ObjDisplay=this.props.data.ArrChange;
      	}else{
      		ObjDisplay=this.props.data.ArrObjChange;
      	}
      	const list=ObjDisplay;
	    const listData=list.map((list=>{
	      	if(ObjDisplay[0]!='-'){
	      		return (<tr>{list.BankOrCoin} x {list.NumberOfBankOrCoin}</tr>)
	      	}else{
	      		return '-';
	      	}
	      }
	    ));
      	let isInputCorrect=this.props.data.isInputCorrect;
      	if(!isInputCorrect){
      		return(<div>Loading...{this.redirect()}</div>);
      	}else{
	      	return (
	      		<div>
		      		<h1 style={{textAlign:'center'}}>สรุปรายการซื้อ</h1>
		      		<div class="row">
		      			<div class="col-sm-12">
				      		<div class="col-sm-4" style={{marginLeft:50}}>
				      			<img src={this.props.data.Image}/>
				      		</div>
				      		<div class="col-sm-7" style={{marginTop:50}}>
						        {this.props.data.MovieName} x {this.props.data.Ticket}<br/>
						        Total price : {this.props.data.Price} baht <br/>
						        Money received : {this.props.data.MoneyReceived} baht<br/>
						        Exchange money : {this.props.data.ExchangeMoney} baht<br/><br/>
						        <table>
						        	<tr><th>Exchange banknote or coin</th></tr>
						        	{listData}
						        </table><br/><br/>
						     	<button style={{fontSize:16,height:'auto',width:'auto',textAlign:'right'}} class="btn btn-success" type = "submit" onClick={this.link}>กลับไปยังหน้าแรก</button>
					        </div>
				        </div>
			        </div>
			    </div>
		    );
      	}
	}
	redirect(){
		//alert("Plase complete input fill")
		window.location = '/';
	}
}

const mapStatetoProps=(state)=>{
    return {
      data:state.data
    }
}


export default connect(mapStatetoProps)(Summary);