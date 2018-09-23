pragma solidity ^0.4.25;

interface ILANDGiveaway {
    
    function availableLand() public view returns (int[] memory x, int[] memory y);
    
    function getLand(int x, int y) public;
    
    function reclaimableLand() public view returns (uint);
    
    function reclaimLand(int x, int y) public;
    
    function rentedLand() public view returns (int[] memory x, int[] memory y);
}
