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
  var solCounter = function(n){

    if (n === 1){
      return 1;
    } else {
      return n * solCounter(n-1);
    }
    //loop over whole first row
      //call findNrooksSolution


    //if n=1, return 1

    //if n=2, return 2 * result of solCounter(1)
    //if n=3, return 3 * result of solCounter(2)
  };

  // for(var i =0; i < n; i++){
  //   thisSol = this.findNRooksSolution(n, i);
  //   if (!_.contains(sols, thisSol)){
  //     sols.push(thisSol);
  //     solutionCount++;
  //   }
  // }
  solutionCount = solCounter(n);



  
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
