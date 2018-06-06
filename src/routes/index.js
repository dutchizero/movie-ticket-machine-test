import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from '../Home';
import Summary from '../Summary';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers} from "redux";

const initialState={
	PricePerTicket: 0,
	Price: 0,
	Ticket: 0,
	MovieName: '',
	MoneyReceived: 0,
	ArrChange:[],
	ExchangeMoney: 0,
	isInputCorrect: false,
	Image: '',
	ArrObjChange: []
}

const DataReducer = (state=initialState,action)=>{
	switch(action.type){
		case "setPricePerTicket":
			state={
				...state,
				PricePerTicket:action.payload
			}
		break;
		case "setTicket":
			state={
				...state,
				Ticket:action.payload
			}
		break;
		case "setMovie":
			state={
				...state,
				MovieName:action.payload
			}
		break;
		case "setMovieID":
			state={
				...state,
				MovieID:action.payload
			}
		break;
		case "setPrice":
			state={
				...state,
				Price:action.payload
			}
		break;
		case "setReceivedMoney":
			state={
				...state,
				MoneyReceived:action.payload
			}
		break;
		case "setArrChange":
			state={
				...state,
				ArrChange:action.payload
			}
		break;
		case "setExchaneMoney":
			state={
				...state,
				ExchangeMoney:action.payload
			}
		break;
		case "setInputCorrect":
			state={
				...state,
				isInputCorrect:action.payload
			}
		break;
		case "setImgage":
			state={
				...state,
				Image:action.payload
			}
		break;
		case "setArrObjChange":
			state={
				...state,
				ArrObjChange:action.payload
			}
		break;
		default: 
	}
	return state;
}


const mylogger=(store)=>(next)=>(action)=>{
	// console.log("LogAction",action);
	next(action);
}

const store=createStore(combineReducers({data:DataReducer}),applyMiddleware(mylogger));
store.subscribe(()=>{
	// console.log("Update Store:",store.getState());
})


export default()=>(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact render={props=><Home {...props}/>}/>
				<Route path="/Summary" exact render={props=><Summary/>}/>
			</Switch>
		</BrowserRouter>
	</Provider>
);