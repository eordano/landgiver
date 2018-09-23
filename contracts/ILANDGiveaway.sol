pragma solidity ^0.4.24;

interface ILANDGiveaway {
    
    function availableLand() external view returns (int[] memory x, int[] memory y);
    
    function getLand(int x, int y) external;
    
    function reclaimableLand() external view returns (uint);
    
    function reclaimLand(int x, int y) external;
    
    function rentedLand() external view returns (int[] memory x, int[] memory y);
}
