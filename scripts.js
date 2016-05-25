'use strict';
if (this.MorbidData === undefined) this.MorbidData = {};

(function(context) {
  let statesUl;
  let apiData;
  let statsHolder = $('#stats-holder');

  function stateButtonBuilder(obj) {
    let stateButtonList = '';
    console.log(obj);
    obj.data.forEach(function (item, index) {
      let stateButtonConstructor = _.template('<li data-state-id = "<%= index %>"> <%= stateName %> </li>');
      let stateButton = stateButtonConstructor({'index': index,'stateName': item[8]});
      stateButtonList += stateButton;
    })
      console.log(stateButtonList);
    statesUl.html(stateButtonList);
    console.log()
  }

  function clicked(evt) {

    if (evt.target !== statesUl) {
      console.log('clicked a thing!');
      let statsTemplate = $('#stats-template');
      let index = evt.target.attributes['data-state-id'].value;
      let state = apiData.data[index];

      let statsListConstructor = _.template(statsTemplate.html());

      let statsList = statsListConstructor({'stateName': state[8], 'ages0_20_deaths': state[10], 'ages21_34_deaths': state[11], 'ages35_and_up_deaths': state[12], 'darwin_award_nominees': state[13], 'female_deaths': state[14]});

      statsHolder.html(statsList);
    }
  }

  function start() {

    statesUl = $('.state-buttons');

    $.ajax('https://data.cdc.gov/api/views/k9ai-xgx2/rows.json?accessType=DOWNLOAD').done(data => {
      stateButtonBuilder(data);
      apiData = data;
      statesUl.click('click', clicked);
    })
    //Call your code here
    console.log('starting!', context);

  }

  window.MorbidData.start = start;

})(window.MorbidData);
