# Sagi
Sagi (詐欺) [Japanese] => Scam [English]

A *free* Chrome extension that uses deep text analysis to determine if an ICO is a scam or not. Trained against a dataset of confirmed "legit" ICOs and confirmed "scam" ICOs. Not quite AI, but a hacky version of it. It uses a version of LSI (Latent Semantic Index) to determine deep similarity between bodies of text. It runs similarity analysis against dataset of confirmed "scam" ICOs, then likewise with confirmed "legit" ICOs. It then produces a score of which one it's closer to. This is pre-pre-pre-beta so I'm not entirely sure how accurate it will be, but it's worth a shot.
  
## Donate
regular, boring money: https://buymeacoff.ee/hi  
BTC: 1oqMn1YLMg7tPad2atd1e3fT8UB2usY76  
BCH: qpvrdhx2hxtht9eha4ga9l5mumztw62rpg6fxzn0r3  
ETH: 0x4832c55e2Cc51e11d7496b4Ea355bB4EC6832370  
LTC: LMxDyPFyo7tAFag2ps2esXP9pyeS4S4Az2  



 
## To-do  
- [x] Create Boilerplate chrome extension code (javascript)    
- [x] Create datasets in JSON format (words as key, word counts as values)  
- [x] Create UI (React maybe) with a button to analyze text, and two cards that show similarity score to scam, and similarity score to legit  
- [x] Capture all text on any given website (this will be the ICO website user wants to "test")  
- [ ] Count words in text body, store in dictionary along with word counts  
- [ ] Calculate euclidean distance between current website, and scam/legit datasets, produce scores for each  
- [ ] Show Results to user  
- [ ] Create landing page on personal website for chrome extension  
- [ ] Publish to Chrome store
