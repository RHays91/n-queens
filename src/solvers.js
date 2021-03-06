/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  //place a rook in first available space in first row
  var board = new Board({n: n});
  var pieces = 0;
  

  for (var i = 0; i < n; i++){
    for (var j = 0; j < n; j++){
      board.togglePiece(i,j);
      pieces++;
      if (board.hasAnyRooksConflicts()){
        board.togglePiece(i, j);
        pieces--;
      }
    }
  }
  //then place a rook in first available space in second row that doesnt create a conflict
  //do the same for the 3rd to nth rows
  if (pieces = n){
    solution = board.rows();
  } else{
    solution = 'SOLUTION NOT FOUND';
  }


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var sols = [];
  var newRow;


  var createNewRow = function(n){
  //creates new row of n length with a 1 in the last index
    var row = _(_.range(n)).map(function() {
      return 0;
    });
    row[n-1] = 1;
    return row;
  };

  var solCounter = function(currentN, board){

    if (currentN <= n){
      var boardMatrix = board.rows();
      for (var i = 0; i < currentN; i++){
        newRow = createNewRow(currentN);

        for (var j = 0; j < boardMatrix.length; j++){
          boardMatrix[j].push(0);
        }

        debugger;
        boardMatrix.splice(i, 0, newRow)
        var tempBoard = new Board(boardMatrix);
        if (!tempBoard.hasAnyRooksConflicts() && currentN === n && !_.contains(sols, boardMatrix.toString())){
          sols.push(boardMatrix.toString());
        } else if (!tempBoard.hasAnyRooksConflicts() && currentN < n) {
          solCounter(currentN + 1, tempBoard)
        }
        debugger;
        boardMatrix.splice(i, 1);
        var length = boardMatrix.length
        for(j = 0; j < length; j++){
          if(boardMatrix[j]){
            boardMatrix[j].pop();
          }
        }
      }


    } else {
      return;
    }
  };
  
  //solutions[i] is array of rows that comprise a solution (length = num of solutions)
  //solutions[i][i] is a row within a giving solution
  //solutions[i][i][i] is the status of a piece within a given row of a given solution
  solCounter(1, new Board({n: 0}))
  solutionCount = sols.length
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var createNewRow = function(n){
  //creates new row of n length with a 1 in the last index
    var row = _(_.range(n)).map(function() {
      return 0;
    });
    return row;
  };
  var solution = []; //fixme
  //place a rook in first available space in first row
  var colTrack = 0;
  var pieces = 0;
  var found = false;
  var rowBuilder = function(n, boardSoFar){
    var rowIndex = boardSoFar ? boardSoFar.length : 0;
    if (n === 0 || n === 2 || n === 3){
      var temp = new Board({n: n})
      solution = temp.rows();
      return;
    }
 
    boardSoFar = boardSoFar || createNewRow(n)
    for (var i = rowIndex; i < n; i++){
      boardSoFar[i] = createNewRow(n);
    }
    var board = new Board(boardSoFar);
    for (var i = 0; i < n; i++){
      board.togglePiece(rowIndex, i);
      pieces++;
      if(!board.hasAnyQueensConflicts()){
        if (pieces === n){
          for(var j = 0; j < n; j++){
            solution[j] = board.get(j);
            found = true;
          }
          return;
        } else {
          var tempBoard = [];
          for(var j = 0; j <= rowIndex; j++){
            tempBoard.push(board.get(j));
          }
          rowBuilder(n, tempBoard);
          if (!found){
            board.togglePiece(rowIndex, i);
            pieces--;
          }
        }
      } else {
        board.togglePiece(rowIndex, i);
        pieces--;
      }
    }
  };
  rowBuilder(n);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var sols = []; //fixme
  var createNewRow = function(n){
    var row = _(_.range(n)).map(function() {
      return 0;
    });
    return row;
  };
  var colTrack = 0;
  var pieces = 0;
  var found = false;
  var rowBuilder = function(n, boardSoFar){
    var rowIndex = boardSoFar ? boardSoFar.length : 0;
    if (n === 0){
      sols = [0];
      return;
    } else if (n === 2 || n === 3){
      return;
    }
  
    boardSoFar = boardSoFar || createNewRow(n)
    for (var i = rowIndex; i < n; i++){
      boardSoFar[i] = createNewRow(n);
    }
    var board = new Board(boardSoFar);
    for (var i = 0; i < n; i++){
      board.togglePiece(rowIndex, i);
      pieces++;
      if(!board.hasAnyQueensConflicts()){
        if (pieces === n){
          debugger;
          sols.push(board.rows().toString())
          board.togglePiece(rowIndex, i);
          pieces--;
        } else {
          var tempBoard = [];
          for(var j = 0; j <= rowIndex; j++){
            tempBoard.push(board.get(j));
          }
          rowBuilder(n, tempBoard);
          if (!found){
            board.togglePiece(rowIndex, i);
            pieces--;
          }
        }
      } else {
        board.togglePiece(rowIndex, i);
        pieces--;
      }
    }
  };

  rowBuilder(n);
  solutionCount = sols.length;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
