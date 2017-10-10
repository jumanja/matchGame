var numeroClicks = 0;
var board = [];
var maxRows = 7;
var maxCols = 7;
var toClean = [];
var puntaje = 0;
var movimientos = 0;
var nroVecesCheck = 0;

function inicioJuego(){
  //hideAll();
  //bloqueHandler();
  //ordenarBloques();

  //Populate Board
  emptyBoard();
  populateBoard();
  //checkMatch();
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
          //$(".col-" + (col+1) ).prepend("<img alt='"+("candy_"+row+col)+"' class='elemento' src='image/"+board[row][col]+".png'>");
          //.attr("title", "_"+(row+1)+(col+1))

          $(".col-" + (col+1) ).prepend(
              newCandy(candyType+1)
          );

      }
      //console.log("board["+row+"]" + board[row]);
    }

    //just for debug
    /*for (var row = maxRows-1; row >= 0; row--) {
      console.log("populateBoard board["+row+"]" + board[row]);
    }*/

}

function newCandy(candyType){
  return  $("<img/>")
                .attr("src", "image/"+candyType+".png")
                .attr("title", candyType)
                .addClass("elemento")
                .draggable()
                .droppable({
                    accept: "elemento",
                     drop: function(event, ui){
                       console.log("dropped! " )
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

function checkMatch(){
  //try{
    updateBoard();
    //just for debug
    /*for (var row = maxRows-1; row >= 0; row--) {
      console.log("checkMatch board["+row+"]" + board[row]);
    }*/

    nroVecesCheck++;
    console.log("checkmatch: " + nroVecesCheck);

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

                //Adding 1 as :nth-last-child(xx) uses index starting 1
                toClean.push( "_" + (row+1) + (col+1) );
                toClean.push( "_" + (row+1) + (col+1+1) );
                toClean.push( "_" + (row+1) + (col+2+1) );

                if(board[row][col+3] !== undefined &&
                  board[row][col] === board[row][col+3]){
                  toClean.push( "_" + (row+1) + (col+3+1) );

                  if(board[row][col+4] !== undefined &&
                    board[row][col] === board[row][col+4]){
                    toClean.push( "_" + (row+1) + (col+4+1) );

                    if(board[row][col+5] !== undefined &&
                      board[row][col] === board[row][col+5]){
                      toClean.push( "_" + (row+1) + (col+5+1) );

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

                //Adding 1 as :nth-last-child(xx) uses index starting 1
                toClean.push( "_" + (row+1) + (col+1) );
                toClean.push( "_" + (row+1+1) + (col+1) );
                toClean.push( "_" + (row+2+1) + (col+1) );

                if(board[row+3] !== undefined &&
                  board[row+3][col] !== undefined &&
                  board[row][col] === board[row+3][col]){

                  toClean.push( "_" + (row+3+1) + (col+1) );

                  if(board[row+4] !== undefined &&
                    board[row+4][col] !== undefined &&
                    board[row][col] === board[row+4][col]){
                    toClean.push( "_" + (row+4+1) + (col+1) );

                    if(board[row+5] !== undefined &&
                      board[row+5][col] !== undefined &&
                      board[row][col] === board[row+5][col]){
                      toClean.push( "_" + (row+5+1) + (col+1) );

                    }
                  }
                }
              }

          } //end if
        } // end col for
        //console.log("checkMatch board["+row+"]" + board[row]);

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
      var fila    = value.charAt(1);
      var columna = value.charAt(2);
      //$("#candy" + row+col).toogle("pulsate");

      $(".col-"+columna+" img:nth-last-child(" + fila + ")")
          .fadeOut(100).fadeIn(300)
          .fadeOut(100).fadeIn(300)
          .fadeOut(100).fadeIn(300)
          .fadeOut(100).fadeIn(300)
          .animate({
            opacity: 0
          }, 600, "linear", function(){
            //$(this).addClass("removeMe");
            $(this).remove();

            //new element
            var candyType = Math.floor(Math.random() * 4);
            var row = parseInt(fila) - 1;
            var col = parseInt(col) - 1;

            newCandy(candyType+1).hide().prependTo(".col-"+columna).fadeIn();
          });


      puntaje += 10;
          $("#score-text").text(puntaje);

    });


}

function updateBoard(){
  board = [];
  // First declare rows
  for (var row = 0; row < maxRows; row++) {
        board.push([]);
  }
  // Second, items for cols
  for (var row = 0; row < maxRows; row++) {
      for (var col = 0; col < maxCols; col++) {
          board[row].push(parseInt(
            $(".col-"+(col+1)+" img:nth-last-child("+(row+1)+")").attr("title") )
          );
      }
  }

};
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

      //inicio Juego
      inicioJuego();

      //inicio timer
      inicio();

    } else {
      reinicio();
      location.reload();
    }
  })

});
