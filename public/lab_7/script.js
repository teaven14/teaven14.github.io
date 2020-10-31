function convertRestaurantsToCategories(restaurantList) {
  console.log('testfunctionresturant');
  const categoryArray = [];
  const result = {};
  for (let i = 0; i < restaurantList.length; i += 1) {
    categoryArray.push(restaurantList[i].category);
  }
  for (let i = 0; i < categoryArray.length; i += 1) {
    if (!result[categoryArray[i]]) {
      result[categoryArray[i]] = 0;
    }
    result[categoryArray[i]] += 1;
  }
  const list = Object.keys(result).map((category) => ({
    y: result[category],
    label: category
  }));

  console.log('list', list);
  return list;
}


function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  console.log('testfunctionmakeyouroptionsobject');
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
    '#42f595',
    '#42c2f5',
    '#f5da42',
    '#f56c42',
    '#d442f5',
    '#e942f5',
    '#42f5b3',
    '#96f542',
    '#f59642',
    '#42eff5'
  ]);

  const canvasJSConfigObject = {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Resturants by Category',
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [{
          startValue: 40,
          endValue: 50,
          color: 'orange',
          type: 'zigzag' },
        {
          startValue: 85,
          endValue: 100,
          color: 'orange',
          type: 'wavy' },
        {
          startValue: 140,
          endValue: 175,
          color: 'orange',
          type: 'zigzag' }]
      },
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
return canvasJSConfigObject;
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    console.log('testfunctioneventlistener');
});