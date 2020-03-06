import React, { Component } from 'react'

export default class Converter extends Component {
    state={
        currencies:['USD','AUD','SCD','PHP','EUR','INR'],
        base:'USD',
        amount:'',
        convertTo:'',
        result:'',
        date:''
    }
    handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value,
            result:null
        },this.calculate)
    }
    handleInput = e => {
        this.setState({
            amount:e.target.value,
            result:null
        },this.calculate)   
    }
    handleSwap = e =>{
        e.preventDefault();
        const base = this.state.base
        const convertTo = this.state.convertTo
        this.setState({
            convertTo:base,
            base:convertTo,
            result:null
        },this.calculate)
    }
    calculate=()=>{
        const amount = this.state.amount
        if(amount === isNaN){
            return
        }else{
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
            .then(res=>res.json())
            .then(data=>{
                const date = data.date
                //console.log(data,'date')
                const result = (data.rates[this.state.convertTo] * amount).toFixed(4)
                //console.log(result,'result')
                this.setState({
                    result,date
                })
            })
        }
    }
    render() {
        const{currencies,base,amount,convertTo,result,date}=this.state
        return <div className='container my-5'>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                <div className='card card-body'>
                <h5>{amount} {base} is equivalent to</h5>
                <h6>{result === null ? ' calculating' :result} {convertTo}</h6>
                <p>as of {date}</p>
                <div className='row'>
                    <div className='col-lg-10 col-md-10 col-sm-10'>
                        <form className='form-inline mb-4'>
                            <input className='form-control form-control-lg mx-3' type='number' value={amount} onChange={this.handleInput}/>
                            <select className='form-control form-contral-lg' name='base' value={base} onChange={this.handleChange}>
                                {
                                    currencies.map(currency =>
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    )
                                }
                            </select>
                        </form>
                        <form className='form-inline mb4'>
                            <input className='form-control form-control-lg mx-3' disabled={true} value={result === null ? ' calculating' : result}/>
                            <select className='form-control form-contral-lg' name='convertTo' value={convertTo} onChange={this.handleChange}>
                                {
                                    currencies.map(currency =>
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    )
                                }
                            </select>
                        </form>
                    </div>
                    <div className='col-lg-2 col-md-2 col-sm-2 align-self-center'>
                        <h1 className='swap' style={{color:'red',cursor:'pointer'}} onClick={this.handleSwap}>&#8595;&#8593;</h1>
                    </div>
                </div>
            </div>  
                </div>
            </div>
        </div>     
    }
}