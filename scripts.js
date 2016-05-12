'use strict';
if (this.MorbidData === undefined) this.MorbidData = {};

(function(context) {
  var statesUl;
  var apiData;
  var statsHolder = document.querySelector('#stats-holder');

  function stateButtonBuilder(obj) {
    var stateButtonList = '';
    console.log(obj);
    obj.data.forEach(function (item, index) {
      var stateButtonConstructor = _.template('<li data-state-id = "<%= index %>"> <%= stateName %> </li>');
      var stateButton = stateButtonConstructor({'index': index,'stateName': item[8]});
      stateButtonList += stateButton;
    })
    statesUl.innerHTML = stateButtonList;
  }

  function clicked(evt) {

    if (evt.target !== statesUl) {

      var statsTemplate = document.querySelector('#stats-template');
      var index = evt.target.attributes['data-state-id'].value;
      var state = apiData.data[index];

      var statsListConstructor = _.template(statsTemplate.innerHTML);

      var statsList = statsListConstructor({'stateName': state[8], 'ages0_20_deaths': state[10], 'ages21_34_deaths': state[11], 'ages35_and_up_deaths': state[12], 'darwin_award_nominees': state[13], 'female_deaths': state[14]});

      statsHolder.innerHTML = statsList;
    }
  }

  function start() {

    statesUl = document.querySelector('.state-buttons');

    $.ajax('https://data.cdc.gov/api/views/k9ai-xgx2/rows.json?accessType=DOWNLOAD').done(function(result) {
      console.log('got the obj!', result);
      apiData = result;
      stateButtonBuilder(apiData);

      statesUl.addEventListener('click', clicked);

    })
    //Call your code here
    console.log('starting!', context);

  }

  window.MorbidData.start = start;

})(window.MorbidData);
