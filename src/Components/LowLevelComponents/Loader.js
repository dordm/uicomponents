import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import styled from 'styled-components'
import Utils from '../js/Utils'
import Button from '@material-ui/core/Button';
import {MyButton} from './StyledComponents'

const StyledDivDialog = styled.div`
  display: flex;
  justify-content: center;
  width: 230px;
  text-align: center;
`;

class Loader extends Component {
  constructor(props){
      super(props);
      this.state={
          showErrorModal:false,
          stopLoader:false
      }
  }
  componentDidMount(){
      if (this.props.open) {
          this.loader = setInterval(() => {
              if(this.props.open)
              {
                  clearInterval(this.loader);
                  this.setState({stopLoader:true, showErrorModal: true});
              }
          }, 30000);
      }
  }
  componentDidUpdate(prevProps, prevState){
     if(prevProps.open === false && this.props.open === true){
         this.loader = setInterval(() => {
             if(this.props.open)
             {
                 clearInterval(this.loader);
                 this.setState({stopLoader:true, showErrorModal: true});
             }
         }, 30000);
     }
      if(prevProps.open === true && this.props.open === false) {
         clearInterval(this.loader);
         this.setState({stopLoader:false})
      }
  }
  componentWillUnmount(){
      clearInterval(this.loader);
  }

    errorDialog() {
        return (
            <Dialog
                open={this.state.showErrorModal}
                onClose={() => this.setState({ showErrorModal: false })}
            >
                <DialogContent>
                    <StyledDivDialog style={{ marginTop: 48 }}>
                        <img
                            style={{height:96, width:96}}
                            alt={"info"}
                            src={Utils.getImage("remove.svg")}
                        />
                    </StyledDivDialog>
                    <StyledDivDialog
                        style={{ marginTop: 48 }}
                        className={"fontStyle3"}
                    >
                        Oops!
                    </StyledDivDialog>
                    <StyledDivDialog
                        style={{ marginTop: 16 }}
                        className={"fontStyle7"}
                    >
                        Something went wrong on the page!
                    </StyledDivDialog>
                    <div style={{marginTop: 25,
                        display: "flex",
                        marginBottom: 10
                    }}>
                        <div style={{ width: "80%" }}>
                            <Button
                                style={{
                                    position: "initial",
                                    justifySelf: "left",
                                    height: 36,
                                    width: 91,
                                    textTransform: "none",
                                    borderRadius: 100 }}
                                onClick={() =>
                                    this.setState({
                                        showErrorModal: false
                                    })
                                }
                                className={"fontStyle1"}
                            >
                                Cancel
                            </Button>
                        </div>
                        <div>
                            <MyButton
                                onClick={() => window.location.reload()}
                                style={{ justifySelf: "right" }}
                                width={92}
                                height={36}
                            >
                                Reload
                            </MyButton>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

  render() {
    return (
        <div>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden"
          }
        }}
        open={this.props.open && ! this.state.stopLoader}
      >
        <div
          style={{
            height: this.props.size + 20,
            width: this.props.size + 20,
            opacity: 1
          }}
        >
          <CircularProgress size={this.props.size} />
        </div>
      </Dialog>
            {this.errorDialog()}
        </div>
    );
  }
}

export default Loader;
