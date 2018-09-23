pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Receiver.sol";

import "./ILANDGiveaway.sol";


contract LANDGiveaway is ILANDGiveaway, Ownable, ERC721Receiver {

    mapping (int => mapping (int => address)) public rentedTo;
    mapping (int => mapping (int => uint)) public expires;

    uint256 public rentedLands;
    uint256 public rentTime = 60 * 60 * 24;

    ERC721 public land = ERC721(0x09ea84f780cfc6b10bafe7b26c8f7b1f3d2da112);
    
    function availableLand() public view returns (int[] memory xs, int[] memory ys) {
        uint balance = land.balanceOf(this);
        uint amount = balance - rentedLands;

        int x;
        int y;
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
    
    function getLand(int x, int y) public {
        getLand(x, y, msg.sender);
    }
    
    function getLand(int x, int y, address beneficiary) public {
        if (rentedTo[x][y] != 0) {
            if (expires[x][y] < now) {
                reclaimLand(x, y);
            }
        }
        uint tokenId = land.encodeTokenId(x, y);

        rentedTo[x][y] = beneficiary;
        expires[x][y] = now + rentTime;
        rentedLands += 1;
        land.setUpdateOperator(tokenId, beneficiary);
    }

    function setRentTime(uint time) public onlyOwner {
        rentTime = time;
    }
    
    function reclaimableLand() public view returns (int[] memory xs, int[] memory ys) {
        uint balance = land.balanceOf(this);
        uint amount = balance - rentedLands;

        int x;
        int y;
        uint count = 0;
        for (uint index = 0; index < balance; index++) {
            (x, y) = land.decodeTokenId(land.tokenOfOwnerByIndex(this, index)); 
            if (rentedTo[x][y] != 0 && expires[x][y] < now) {
                xs[count] = x;
                ys[count] = y;
                count++;
            }
        }
        return (xs, ys);
    }
    
    function reclaimLand(int x, int y) public {
        if (rentedTo[x][y] != 0 && expires[x][y] < now) {
            rentedTo[x][y] = 0;
            expires[x][y] = 0;
            land.setUpdateOperator(land.encodeTokenId(x, y), 0);
            rentedLands -= 1;
        }
    }
    
    function rentedLand() public view returns (int[] memory xs, int[] memory ys) {
        uint balance = land.balanceOf(this);
        uint amount = balance - rentedLands;

        uint count = 0;
        int x;
        int y;
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
        address _operator,
        address _from,
        uint256 _tokenId,
        bytes _data
    )
        public
        returns (bytes4)
    {
        require(msg.sender == address(land));
        return ERC721_RECEIVED;
    }
}

