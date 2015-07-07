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
  var thisSol;
  var idx;
  var tempBoard;
  var numSols;
  var tempRow = [];
  var board;


  var solCounter = function(x, solutionsSoFar){
    var tempSols = solutionsSoFar.slice();
    var newSols = solutionsSoFar.slice();

    if (x > n) {
      return tempSols; 
    } else {
      numSols = tempSols.length;
      debugger;
      for (var i = 0; i < numSols; i++){
        tempBoard = tempSols[i];
        
        for (var j = 0; j < tempBoard.length; j++){
          tempBoard[j].push(0);
          tempRow.push(0);
        }
        tempRow.push(0);
        tempBoard.push(tempRow);
      }
      if (!tempBoard){
        tempBoard = [[0]];
      }
      board = new Board(tempBoard);
      for (i= 0; i < x; i++){
        board.togglePiece(i, x - 1);
        if (!board.hasAnyRooksConflicts()){      
          newSols.push(board.rows().slice());
          board.togglePiece(i, x - 1)
        }
      }
      for (i = 0; i < x - 1; i++){
        board.togglePiece(x - 1, i);
        if(!board.hasAnyRooksConflicts()){
          newSols.push(board.rows().slice());
          board.togglePiece(x - 1, i);
        }
      }
      return solCounter(x + 1, newSols);
    }
  };
  
  //solutions[i] is array of rows that comprise a solution (length = num of solutions)
  //solutions[i][i] is a row within a giving solution
  //solutions[i][i][i] is the status of a piece within a given row of a given solution

  sols = solCounter(1, sols)
  solutionCount = sols.length
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
