import React, { Component } from 'react';
import './App.css';
import {Button, DataTable, TableHeader, Cell, Grid} from 'react-mdl';

class App extends Component {
    
  constructor(props){
        super(props);
        this.state = {
            legitScore: 0,
            scamScore: 0
        }
      
        this.onPress = this.onPress.bind(this);
  }
    
  onPress() {
      this.setState({
            legitScore: 55,
            scamScore: 55
        })
  }
    
  render() {
    return (
        <div className="App">
            <Grid>
            <Cell col={12}>
                <Button raised accent ripple onClick={this.onPress}>
                    Analyze
                </Button>
            </Cell>
            <Cell col={12}>
                <DataTable style={{width: '80%', margin: 'auto'}}
                    shadow={0}
                    rows={[
                        {class: 'Legit', score: this.state.legitScore},
                        {class: 'Scam', score: this.state.scamScore}
                    ]}
                >
                    <TableHeader name="class" tooltip="Classification, scam or legit">Class</TableHeader>
                    <TableHeader numeric name="score" tooltip="Euclidean Distance Average against these datasets">Score</TableHeader>
                </DataTable>
            </Cell>
            </Grid>
            <Cell col={12}>
                <a href="https://www.buymeacoffee.com/hi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style={{height: 'auto', width: 'auto'}}>
                </img></a>
            </Cell>
        </div>
    );
  }
}

export default App;
