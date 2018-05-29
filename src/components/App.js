import React,{Component} from 'react';
import {connect} from 'react-redux';
import {onClick,onClickConcat} from '../actions'
import '../style/index.css';


 class APP extends Component {

      loading = () => {
        if(this.props.loading){
          return 'loading'
        }
        if(!this.props.loading && this.props.list1 && this.props.list2) {
          return (
            <div>
              <p>{this.props.list1.title}</p>
              <p>{this.props.list2.title}</p>
              <p>{this.props.error}</p>
            </div>
          )
        }
      }




    render() {
        return (
            <div className="App container mx-auto p-8 flex justify-center">
                <button
                  className='
                  bg-red-dark
                  rounded-sm
                  p-4
                  text-white
                  text-center
                  hover:bg-green
                  '
                  onClick={this.props.onClick}
                  >button to fetch</button>
                  <div>
                    {this.loading()}
                  </div>

                  <button
                    className='
                    bg-red-dark
                    rounded-sm
                    p-4
                    text-white
                    text-center
                    hover:bg-green
                    '
                    onClick={this.props.onClickConcat}
                    >button to concatMap</button>
            </div>
        );
    }
}

const mapStateToProps = ({fetch})  => {
  const {loading,list1,list2,error} = fetch;
  return{loading,list1,list2,error}
}

export default connect(mapStateToProps,{onClick,onClickConcat})(APP)
