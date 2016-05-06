'use strict';
if (this.MorbidData === undefined) this.MorbidData = {};

(function(context) {
  var statesUl;
  var apiData;

  function stateButtonBuilder(obj) {
    console.log(obj);
    obj.data.forEach(function (item, index) {
      var stateButton = document.createElement('li');
      stateButton.setAttribute('data-state-id', index);
      stateButton.textContent = item[8];
      statesUl.appendChild(stateButton);
    })
  }

  function start() {

    statesUl = document.querySelector('.state-buttons');

    $.ajax('https://data.cdc.gov/api/views/k9ai-xgx2/rows.json?accessType=DOWNLOAD').done(function(result) {
      console.log('got the obj!', result);
      apiData = result;
      stateButtonBuilder(apiData);

      statesUl.addEventListener('click', clicked);



      function clicked(evt) {

        if (evt.target !== statesUl) {

        var stateNameSpan = document.querySelector('#state-name');
        var ages0_20Span = document.querySelector('#ages-0-20');
        var ages21_34Span = document.querySelector('#ages-21-34');
        var ages35AndUpSpan = document.querySelector('#ages-35-and-up');
        var maleDeathsSpan = document.querySelector('#male-deaths');
        var femaleDeathsSpan = document.querySelector('#female-deaths');

        var index = evt.target.attributes['data-state-id'].value;
        var state = apiData.data[index];

        var stateName = state[8];
        var ages0_20_deaths = state[10];
        var ages21_34_deaths = state[11];
        var ages35_and_up_deaths = state[12];
        var darwin_award_nominees = state[13];
        var female_deaths = state[14];

        stateNameSpan.textContent = stateName;
        ages0_20Span.textContent = ages0_20_deaths;
        ages21_34Span.textContent = ages21_34_deaths;
        ages35AndUpSpan.textContent = ages35_and_up_deaths;
        maleDeathsSpan.textContent = darwin_award_nominees;
        femaleDeathsSpan.textContent = female_deaths;
        }
      }
    })
    //Call your code here
    console.log('starting!', context);

  }

  window.MorbidData.start = start;

})(window.MorbidData);
