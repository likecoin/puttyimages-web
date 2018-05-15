# Puttyimage Components Overview

This document provide overview of programming component and their relationship that will build up Puttyimage.

### Web backend/Frontend

- Universal Vue.js Applications
  - Express
  - Nuxt
  - Vue/Vuex
- Coordinate with Like.co API for user authentication (Signup/Login), see login flow
- Responsbile for uploading image, resizing and all others user interaction on puttyimage web interfaces
- Creating IPLD object, via JS IPLD implementation found in https://ipld.io/implementations/
- Upload the IPLD object onto IPFS, by interacting with the ipfs daemon.
Submitting record onto Like.co on after the object is on IPFS, Like.co will send it to LikeChain.
- Assuming the browser have MetaMask installed, will use web3 as provider
Directly work with like.co for Super Like, see Super Like Flow

### DB
- RDBMS, postgreSQL
- Storing the IPLD image in relation manner for easy display
- Only store minimal user data in favor of privacy. Fetch user data from like.co API when the performance is acceptable.
- Data on Ethereum/LikeChain is always overriding when there is conflict

### IPFS Daemon

- Will use the ipfs/go-ipfs daemon
- Serving the content for HTTP
- Control logic by JS API client library ipfs/js-ipfs-api, controller will assume there are more than one puttyimage ipfs node
- Pinning the puttysimages content according to DB records

### Widget
- Standalone embed code for user to include puttyimage with Like button.
- Whole SuperLike flow will complete in JS client side and interact with Like.co API and/or MetaMask, no interaction with puttyimage during the SuperLike flow.
