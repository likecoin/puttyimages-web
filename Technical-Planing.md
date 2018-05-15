Puttyimage Technical Planning

This document provide overview of programming component and their relationship that will build up Puttyimage.

Components:
Web backend/Frontend
Universal Vue.js Applications
Express
Nuxt
Vue/Vuex
Coordinate with Like.co API for user authentication (Signup/Login), see login flow
Responsbile for uploading image, resizing and all others user interaction on puttyimage web interfaces
Creating IPLD object, via JS IPLD implementation found in https://ipld.io/implementations/
Upload the IPLD object onto IPFS, by interacting with the ipfs daemon.
Submitting record onto Like.co on after the object is on IPFS, Like.co will send it to LikeChain.
Assuming the browser have MetaMask installed, will use web3 as provider
Directly work with like.co for Super Like, see Super Like Flow
DB
RDBMS, postgreSQL
Storing the IPLD image in relation manner for easy display
Only store minimal user data in favor of privacy. Fetch user data from like.co API when the performance is acceptable.
Data on Ethereum/LikeChain is always overriding when there is conflict
IPFS
Will use the ipfs/go-ipfs daemon
Serving the content for HTTP
Control logic by JS API client library ipfs/js-ipfs-api, controller will assume there are more than one puttyimage ipfs node
Pinning the puttysimages content according to DB records
Widget
Standalone embed code for user to include puttyimage with Like button.
Whole SuperLike flow will complete in JS client side and interact with Like.co API, no interaction with puttyimage during the SuperLike flow.

Login flow
User click login at puttyimage
JS get the ethereum address from MetaMask and send to puttyimage
puttyimage send login request to Like.co API
{address: 0x4c9d… }
Like.co API return a challenge
{address: 0x4c9d…, challenge: whateverlikecolike }
puttyimage record and send challenge
JS/MetaMask sign the challenge and return to puttyimage
{address: 0x4c9d…, challenge: whateverlikecolike, signature: signedbytheuser }
puttyimage verify the signing return to Like.co API
Like.co API confirm it actually the user approve the signin and return the user infomation
{address: 0x4c9d…, likeId: username, email: user@like.co, …}
Puttyimages login the user at puttyimage

Super Like Flow

JS will gather the information on the article address and the address of content used in the article and send to Like.co API.
{article: 0x123, images: [0x23.., 0x45..], audio: []}
Like.co API return the distribution ratio
{distribution: [{ to: 0xd34..., ratio: 0.12}, {to: 0x345, ratio: 0.05 }], minFee: 3}
JS popup for user to set number of LikeCoin to pay
User confirm and sign a transferMultipleDelegated call data in MetaMask
Client JS send the details back to like.co API
Like.co do the actual transactions by calling transferMultipleDeletaged, (TBC on LikeChain or Public Chain)


Wordpress plugin
The plugin allow user to search and put puttyimage content at wordpress
Widget panel
Input of LikeCoin ID, plugin will fill in the ethereum address.
The pugin will get the Ethereum addredd from Like.co provided restfulAPI.
User Like the widget will trigger JS to like all puttyimage in the pages
Editor helper to search and insert puttyimage in to the content
The editor helper will insert the widget from puttyimage, see puttyimage widget section.
Whole Like or SuperLike flow will be handle in the JS side in the Widget, assuming user have MetaMask installed if it involve Ethereum
