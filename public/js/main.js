$.getJSON("https://galvanize-eats-api.herokuapp.com/menu").then(function(data){

  data.menu.forEach(function(item){

    if (item.type === "burger") {
      $('.burgers').append(
        '<span class="menuSpan"> <p class="firstP">' + item.name + '</p>' + '<p class="secondP">' + item.price + '</p> </span>'
      );
    }

    if (item.type === "pizza") {
      $('.pizzas').append(
        '<span class="menuSpan"> <p class="firstP">' + item.name + '</p>' + '<p class="secondP">' + item.price + '</p> </span>'
      );
    }


  })
}).then(function(){

  $(".amountInput").val(1);

  var currItem;
  var currItemPrice = 0;

  $('.menuSpan').on('click', function(){
    var spanArr = $('.menuSpan');


    $('.menuSpan').each(function(index, item){
      $(item).css('background', 'none');
    })

    $(this).css('background', 'rgb(186,195,214)');

    currItem = $(this).children(":first").text();
    currItemPrice = Number($(this).children(":first").next().text());
  })

  var currSubTotal = 0;
  var currTax = 0;
  var currGrandTotal = 0;
  var orderArr = [];

  $('.addButton').on('mousedown', function(){
    for (var i = 0; i < Number($(".amountInput").val()); i++) {

      $('.grandTotal').append('<span class="totalSpan"> <p class="firstTotalP">' + currItem + '</p>' + '<p class="secondTotalP">' + currItemPrice + '</p> </span>')




    }



  })

  $('.addButton').on('mouseup', function(){

    currSubTotal = 0;
    currTax = 0;
    currGrandTotal = 0;

    $('.grandTotal').children().each(function(index, item){
      var tempItemObj = {};
      tempItemObj.type = $(this).children(":first").text();

      orderArr.push(tempItemObj);

      currSubTotal += Number($(this).children(":first").next().text());
      currTax = Math.round((currSubTotal * 0.029) * 100) / 100;
      currGrandTotal = Math.round((currSubTotal + currTax) * 100) / 100;

      $('.subTotal').html("<p>Subtotal: " + currSubTotal+ "</p>");
      $('.tax').html("<p>Tax: " + currTax + "</p>");
      $('.grandTotalP').html("<p>Grand Total: " + currGrandTotal + "</p>");
    })

  })

  $('.deliverButton').on('click', function(){
    var orderData = {};
    orderData.name = $('.name').val();
    orderData.phoneNum = $('.phoneNum').val();
    orderData.address = $(".address").val();
    orderData.items = orderArr;
    console.log(orderData);

    // $.post('https://galvanize-eats-api.herokuapp.com/orders', data ,function(response) {
    //   // Do something with the request
    //   console.log(response);
    // }, 'json');

    $.ajax({
      type: 'POST',
      url: "https://galvanize-eats-api.herokuapp.com/orders",
      success: function(resultData) {
        alert(resultData)
      }
    });




  })



})
