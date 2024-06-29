//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract BlogPosts{
    struct Post{
        uint256 id;
        string title;
        string content;
        string image;
    }
    Post[] posts;
    uint256 pid=1;
    function addPost(string calldata _title,string calldata _content,string calldata _image) public payable{
        require(msg.value== 1 gwei,"You must pass 1 gwei atleast");

        posts.push(Post(pid,_title,_content,_image));
        pid++;
    }
    function getAllPosts() public view  returns (Post[] memory){
        return posts;
    }
    function getPost(uint256 _id) public view returns (Post memory){
        return posts[_id-1];
    }
    function updatePost(uint256 _id,string calldata _title,string calldata _content,string calldata _image) public payable {
        require(msg.value==1 gwei, "You must pass 1 gwei atleast");
        posts[_id-1].title=_title;
        posts[_id-1].content=_content;
        posts[_id-1].image=_image;
    }
    function deletePost(uint256 _id) public payable{
        require(msg.value==2 gwei, "You must pass 2 gwei atleast");
        for(uint256 i=_id-1;i<posts.length-1;i++){
            posts[i]=posts[i+1];
        }
        posts.pop();
    }
}