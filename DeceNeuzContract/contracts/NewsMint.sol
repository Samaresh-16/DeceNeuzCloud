// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NewsMint is ERC721, Ownable {
    uint256 public tokenIdCounter;

    // News structure
    struct News {
        string title;
        string desc;
        uint256 created;
        string userId;
    }

    // Mapping from token ID to News article
    mapping(uint256 => News) private _newsArticles;

    // Mapping to track token existence
    mapping(uint256 => bool) private _tokenExists;

    // Mapping from username to array of token IDs
    mapping(string => uint256[]) private _userArticles;

    constructor() ERC721("NewsMint", "DCN") Ownable(msg.sender) {
        tokenIdCounter = 1;
    }

    // Mint a new NFT with a news article
    function mint(
        string memory title,
        string memory desc,
        string memory userId
    ) external onlyOwner {
        uint256 tokenId = tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        _setNewsArticle(tokenId, title, desc, userId);
        tokenIdCounter++;
    }

    // Retrieve details of a specific NFT
    function getNewsArticle(
        uint256 tokenId
    )
        external
        view
        returns (
            string memory title,
            string memory desc,
            uint256 created,
            string memory userId
        )
    {
        require(_tokenExists[tokenId], "Token does not exist");
        News memory newsArticle = _newsArticles[tokenId];
        return (
            newsArticle.title,
            newsArticle.desc,
            newsArticle.created,
            newsArticle.userId
        );
    }

    // Retrieve all articles of a particular user
    function getArticlesByUser(
        string memory userId
    ) external view returns (News[] memory) {
        uint256[] memory userTokens = _userArticles[userId];
        News[] memory userArticles = new News[](userTokens.length);

        for (uint256 i = 0; i < userTokens.length; i++) {
            uint256 tokenId = userTokens[i];
            userArticles[i] = _newsArticles[tokenId];
        }

        return userArticles;
    }

    // Retrieve all articles
    function getAllArticles() external view returns (News[] memory) {
        News[] memory allArticles = new News[](tokenIdCounter - 1);

        for (uint256 i = 1; i < tokenIdCounter; i++) {
            allArticles[i - 1] = _newsArticles[i];
        }

        return allArticles;
    }

    // Internal function to set news article details
    function _setNewsArticle(
        uint256 tokenId,
        string memory title,
        string memory desc,
        string memory userId
    ) internal {
        require(!_tokenExists[tokenId], "Token already exists");
        _newsArticles[tokenId] = News(
            title,
            desc,
            block.timestamp,
            userId
        );
        _tokenExists[tokenId] = true;
        _userArticles[userId].push(tokenId);
    }
}
