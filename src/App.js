import React, { Component } from 'react';
import './App.css';
import {Button, DataTable, TableHeader, Cell, Grid} from 'react-mdl';
import Textfield from 'react-mdl/lib/Textfield';
import { HashLoader } from 'react-spinners';

class App extends Component {

  constructor(props){
        super(props);
        this.state = {
            legitScore: 0,
            scamScore: 0,
            textFieldValue: '',
            loading: false
        }

        this.onPress = this.onPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
  }

  _handleTextFieldChange(e) {
        this.setState({
            textFieldValue: e.target.value
        });
   }

  handleClick() {
    //set state to loading, for spinner animation
    this.setState({
        loading: true
    })
    this.onPress();
  }

  onPress() {
      var dict = {};

      //parse words from text body by stripping whitespaces
      var arr = this.state.textFieldValue.split(/[ \t]+/);

      //iterate over word array
      for (var i = 0, len = arr.length; i < len; i++) {
        //current word in array
        var word = arr[i];
        //convert to lowercase
        word = word.toLowerCase();
        //strip punctuation
        word = word.replace(/[^\w\s]/, "")
        //check if key is already in dict
        if (dict[word] !== undefined) {
            dict[word] = dict[word] + 1
        } else {
            //key is not in dict, give it a word count of 1
            dict[word] = 1;
        }
      }

      //open legit.json into dictionary
      var legitDict = require('./legit.json');

      //variable for total score
      var legit_score = 0;

      //iterate over each coin in dataset
      for (var coin in legitDict) {
          //sum totals for cosine similarity
          var abSum1 = 0
          var aSum1 = 0
          var bSum1 = 0
          for (var word1 in dict) {
            if (word1 in legitDict[coin]) {
              //intersection of word-to-analyze and word-in-dataset
              abSum1 = abSum1 + (dict[word1] * legitDict[coin][word1])
              aSum1 = aSum1 + dict[word1]
              bSum1 = bSum1 + legitDict[coin][word1]
            }
          }
          legit_score = legit_score + ((abSum1) / (aSum1 * bSum1))
      }

      //we want average of all cosine similarities
      legit_score = legit_score / (Object.keys(legitDict).length)

      var legit_score_euc = 0
      for (coin in legitDict) {
        //current euclidean distance
        var euc_distance = 0
        for (word in dict) {
          if (word in legitDict[coin]) {
            //add squared difference of normalized frequences to euc distance
            euc_distance = euc_distance + (Math.pow((dict[word] - legitDict[coin][word]),2))
          }
        }

        //square euclidean distance
        euc_distance = Math.sqrt(euc_distance)
        legit_score_euc = legit_score_euc + euc_distance
      }

      legit_score = legit_score / (legit_score_euc / Object.keys(legitDict).length)

      //open scam.json into dictionary
      var scamDict = require('./scam.json');

      //variable for total euclidean distance
      var scam_score = 0;

      //iterate over each coin in dataset
      for (coin in scamDict) {
        //sum totals for cosine similarity
        var abSum2 = 0
        var aSum2 = 0
        var bSum2 = 0
        for (var word2 in dict) {
          if (word2 in scamDict[coin]) {
            //intersection of word-to-analyze and word-in-dataset
            abSum2 = abSum2 + (dict[word2] * scamDict[coin][word2])
            aSum2 = aSum2 + dict[word2]
            bSum2 = bSum2 + scamDict[coin][word2]
          }
        }
        scam_score = scam_score + ((abSum2) / (aSum2 * bSum2))
      }

      //we want average of all cosine similarities
      scam_score = scam_score / (Object.keys(scamDict).length)

      var scam_score_euc = 0
      for (coin in scamDict) {
        //current euclidean distance
        euc_distance = 0
        for (word in dict) {
          if (word in scamDict[coin]) {
            //add squared difference of normalized frequences to euc distance
            euc_distance = euc_distance + (Math.pow((dict[word] - scamDict[coin][word]),2))
          }
        }

        //square euclidean distance
        euc_distance = Math.sqrt(euc_distance)
        scam_score_euc = scam_score_euc + euc_distance
      }

      scam_score = scam_score / (scam_score_euc / Object.keys(scamDict).length)


      this.setState({
            legitScore: legit_score,
            scamScore: scam_score,
            loading: false
      })
  }

  render() {
    return (
        <div className="App">
            <Grid>
            <Cell col={12}>
                <Textfield
                    value={this.state.textFieldValue}
                    onChange={e => this.setState({ textFieldValue: e.target.value })}
                    label="Text Body..."
                    floatingLabel
                    style={{width: '200px'}}
                />
            </Cell>
            <Cell col={12}>
                <Button raised accent ripple onClick={this.handleClick}>
                    Analyze
                </Button>
            </Cell>
            <Cell col={12}>
            <div style={{width: '50px', margin: 'auto'}}>
            <HashLoader
              color={'#CD4770'}
              loading={this.state.loading}
            />
            </div>
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
