pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Receiver.sol";

import "./ILANDGiveaway.sol";

contract LAND721 is ERC721 {
    function encodeTokenId(int x, int y) external pure returns (uint256);
    function decodeTokenId(uint value) external pure returns (int, int);
    function setUpdateOperator(uint tokenId, address beneficiary) external pure;
}

contract LANDGiveaway is ILANDGiveaway, Ownable, ERC721Receiver {

    mapping (int => mapping (int => address)) public rentedTo;
    mapping (int => mapping (int => uint)) public expires;

    uint256 public rentedLands;
    uint256 public rentTime = 60 * 60 * 24;

    LAND721 public land = LAND721(0x09eA84f780CFC6B10bAFE7B26c8F7B1f3D2DA112);

    function availableLand() external view returns (int[] memory, int[] memory) {
        uint balance = land.balanceOf(this);
        uint amount = balance - rentedLands;

        int x;
        int y;

        int[] memory xs = new int[](amount);
        int[] memory ys = new int[](amount);

        uint count = 0;
        for (uint index = 0; index < balance; index++) {
            (x, y) = land.decodeTokenId(land.tokenOfOwnerByIndex(this, index));
            if (rentedTo[x][y] == 0) {
                xs[count] = x;
                ys[count] = y;
                count++;
            }
        }
        return (xs, ys);
    }

    function getLand(int x, int y) external {
        _getLand(x, y, msg.sender);
    }
    function getLand(int x, int y, address beneficiary) external {
        _getLand(x, y, beneficiary);
    }

    function _getLand(int x, int y, address beneficiary) internal {
        if (rentedTo[x][y] != 0) {
            if (expires[x][y] < now) {
                _reclaimLand(x, y);
            }
            revert('Already rented');
        }
        uint tokenId = land.encodeTokenId(x, y);

        rentedTo[x][y] = beneficiary;
        expires[x][y] = now + rentTime;
        rentedLands += 1;
        land.setUpdateOperator(tokenId, beneficiary);
    }

    function setRentTime(uint time) external onlyOwner {
        rentTime = time;
    }

    function reclaimableLand() external view returns (uint) {
        uint balance = land.balanceOf(this);

        int x;
        int y;

        uint count = 0;
        for (uint index = 0; index < balance; index++) {
            (x, y) = land.decodeTokenId(land.tokenOfOwnerByIndex(this, index));
            if (rentedTo[x][y] != 0 && expires[x][y] < now) {
                count++;
            }
        }
        return count;
    }

    function reclaimLand(int x, int y) external {
        _reclaimLand(x, y);
    }

    function _reclaimLand(int x, int y) internal {
        if (rentedTo[x][y] != 0 && expires[x][y] < now) {
            rentedTo[x][y] = 0;
            expires[x][y] = 0;
            land.setUpdateOperator(land.encodeTokenId(x, y), 0);
            rentedLands -= 1;
        }
    }

    function rentedLand() external view returns (int[] memory xs, int[] memory ys) {
        uint balance = land.balanceOf(this);
        uint amount = balance - rentedLands;

        uint count = 0;
        int x;
        int y;

        xs = new int[](amount);
        ys = new int[](amount);

        for (uint index = 0; index < balance; index++) {
            (x, y) = land.decodeTokenId(land.tokenOfOwnerByIndex(this, index));
            if (rentedTo[x][y] != 0 && expires[x][y] > now) {
                xs[count] = x;
                ys[count] = y;
                count++;
            }
        }
        return (xs, ys);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes
    )
        public
        returns (bytes4)
    {
        require(msg.sender == address(land));
        return ERC721_RECEIVED;
    }
}
