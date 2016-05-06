'use strict';
if (this.MorbidData === undefined) this.MorbidData = {};

(function(context) {
  var statesUl;
  var apiData;

  function stateButtonBuilder(obj) {
    for (var state of obj.data) {
      var stateButton = document.createElement('li');
      stateButton.setAttribute('data-state-id', state);
      stateButton.textContent = state[8];
      statesUl.appendChild(stateButton);
    }
  }

  function start() {

    statesUl = document.querySelector('.state-buttons');

    $.ajax('https://data.cdc.gov/api/views/k9ai-xgx2/rows.json?accessType=DOWNLOAD').done(function(result) {
      console.log('got the obj!', result);
      apiData = result;
      stateButtonBuilder(apiData);

      statesUl.addEventListener('click', clicked);

      function clicked(evt) {
        console.log('clicky', evt.target.attributes['data-state-id'].value);

        var index = evt.target.attributes['data-state-id'].value;
        var stateIndex = apiData.data[index];
        console.log('state', stateIndex);
      }
    })
    //Call your code here
    console.log('starting!', context);

  }

  window.MorbidData.start = start;

})(window.MorbidData);
