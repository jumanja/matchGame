var numeroClicks = 0;
var board = [];
var maxRows = 7;
var maxCols = 7;
var toClean = [];
var puntaje = 0;
var movimientos = 0;
function inicioJuego(){
  //hideAll();
  //bloqueHandler();
  //ordenarBloques();

  //Populate Board
  emptyBoard();
  populateBoard();
  checkMatch();
  numeroClicks=0;
}
function emptyBoard() {
  $(".col-1").empty();
  $(".col-2").empty();
  $(".col-3").empty();
  $(".col-4").empty();
  $(".col-5").empty();
  $(".col-6").empty();
  $(".col-7").empty();
}

function populateBoard() {
    // First declare rows
    for (var row = 0; row < maxRows; row++) {
          board.push([]);
    }
    // Second, items for cols
    for (var row = 0; row < maxRows; row++) {
      for (var col = 0; col < maxCols; col++) {

          var candyType = Math.floor(Math.random() * 4);
          board[row].push(candyType+1);
          $(".col-" + (col+1) ).append("<img id='"+("candy_"+row+col)+"' class='elemento' src='image/"+board[row][col]+".png'>");
          $("#candy_"+row+col).draggable();
          $("#candy_"+row+col).droppable({
            accept: "elemento",
             drop: function(event, ui){
               console.log("drop " + row+col)
               var otherSrc = ui.draggable.attr("src");
               var otherId = ui.draggable.attr("id");
               ui.draggable.attr("src", $(this).attr("src"));
               ui.draggable.attr("id", $(this).attr("id"));
               $this.attr("src") = otherSrc;
               $this.attr("id") = otherId;
               movimientos++;
               $("#movimientos-text").text(movimientos);

             }

          });

      }
      console.log("board["+row+"]" + board[row]);
    }
}

function checkMatch(){
  //try{
    //Horizontal and Vertical
    toClean = [];
    for (var row = 0; row < maxRows; row++) {
      for (var col = 0; col < maxCols; col++) {
          if(board[row][col] !== 0){
              //Check Horizontal
              if(
                (board[row][col+1] !== undefined &&
                board[row][col] === board[row][col+1]) &&
                (board[row][col+2] !== undefined &&
                board[row][col] === board[row][col+2])
                )
                {

                toClean.push( "_" + row + col );
                toClean.push( "_" + row + (col+1) );
                toClean.push( "_" + row + (col+2) );

                if(board[row][col+3] !== undefined &&
                  board[row][col] === board[row][col+3]){
                  toClean.push( "_" + row + (col+3) );

                  if(board[row][col+4] !== undefined &&
                    board[row][col] === board[row][col+4]){
                    toClean.push( "_" + row + (col+4) );

                    if(board[row][col+5] !== undefined &&
                      board[row][col] === board[row][col+5]){
                      toClean.push( "_" + row + (col+5) );

                    }
                  }
                }
              }

              //Check Vertical
              if(
                (board[row+1] !== undefined &&
                  board[row+1][col] !== undefined &&
                board[row][col] === board[row+1][col]) &&
                (board[row+2] !== undefined &&
                  board[row+2][col] !== undefined &&
                board[row][col] === board[row+2][col])
                )
                {

                toClean.push( "_" + row + col );
                toClean.push( "_" + (row+1) + col );
                toClean.push( "_" + (row+2) + col );

                if(board[row+3] !== undefined &&
                  board[row+3][col] !== undefined &&
                  board[row][col] === board[row+3][col]){
                  toClean.push( "_" + (row+3) + col );

                  if(board[row+4] !== undefined &&
                    board[row+4][col] !== undefined &&
                    board[row][col] === board[row+4][col]){
                    toClean.push( "_" + (row+4) + col );

                    if(board[row+5] !== undefined &&
                      board[row+5][col] !== undefined &&
                      board[row][col] === board[row+5][col]){
                      toClean.push( "_" + (row+5) + col );

                    }
                  }
                }
              }

          } //end if
        } // end col for
        console.log("checkMatch board["+row+"]" + board[row]);

      } //end row for

    var uniqueToClean = toClean.filter(function(itm, i, a) {
        return i == a.indexOf(itm);
    });
    console.log("toClean:");
    /*$.each(toClean, function( index, value ) {
      console.log( index + ": " + value );
      //$("#candy" + value).toggle("pulsate");

    }); */

    console.log("toUniqueClean:");
    $.each(uniqueToClean, function( index, value ) {
      console.log( index + ": " + value );
      //$("#candy" + row+col).toogle("pulsate");
      $("#candy" + value)
          .fadeOut(100).fadeIn(300)
          .fadeOut(100).fadeIn(300)
          .fadeOut(100).fadeIn(300)
          .fadeOut(100).fadeIn(300)
          .fadeOut(600);

      puntaje += 10;
          $("#score-text").text(puntaje);

    });

    //nothing to clean, ok, but if there is something to clean, checkMatch again
    if(uniqueToClean.length === 0){
      refill();
      checkMatch();
    }
  /*} catch (err){

  }*/

  //fillCols();
}

function refill() {
  for (var row = 0; row < maxRows; row++) {
    for (var col = 0; col < maxCols; col++) {
        //prepend one candy on this column if position is zero
        if(board[row][col] == 0) {
          //then add new one
          var candyType = Math.floor(Math.random() * 4);
          board[row][col] = candyType+1;
          $(".col-" + (row+1) ).prepend("<img id='"+("candy_"+row+col)+"' class='elemento' src='image/"+board[row][col]+".png'>");
        }
    }
  }

  for (var row = 0; row < maxRows; row++) {
    for (var col = 0; col < maxCols; col++) {
      //
    }
  }
}

//
function aBlanco(elemento){

  $(elemento).animate(
    {
      top: 0
    },
    {
      duration: 1000,
      step: function(now) {
        $(this).css("color", "#FFFFFF");
      },
      complete: function(){
        aAmarillo(elemento)
      }
    }
  )

}

function aAmarillo(elemento){
  $(elemento).animate(
    {
      top: 0
    },
    {
      duration: 1000,
      step: function(now) {
        $(this).css("color", "#FFFF00");
      },
      complete: function(){
        aBlanco(elemento)
      }
    }
  )
}

$( document ).ready(function() {
  //console.log("document ready");
  aBlanco($(".main-titulo"));
  $(".btn-reinicio").click(function(){
    console.log("reinicio called, " + this.innerHTML);
    if(this.innerHTML == "Iniciar") {
      this.innerHTML = "Reiniciar";
      //inicio timer
      inicio();

      //inicio Juego
      inicioJuego();

    } else {
      reinicio();
      location.reload();
    }
  })

});
