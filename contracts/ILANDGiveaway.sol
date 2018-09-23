pragma solidity ^0.4.25;

contract ILANDGiveaway {
    
    function availableLand() public returns (int[] x, int[] y);
    
    function getLand(int x, int y) public;
    
    function reclaimableLand() public returns (int[] x, int[] y);
    
    function reclaimLand(int x, int y) public;
    
    function rentedLand() public returns (int[] x, int[] y);
}
