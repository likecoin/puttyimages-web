# Image Upload flow

- User submit an image file and metadata (description, license, etc) via the web interface of puttyimages

- PuttyImage put and pin the image file onto IPFS and get image file 
IPFS address

- PuttyImage create a Media IPLD object (see [[Media IPLD object|IPLDFormat]])

- PuttyImage put and pin the Media IPLD object onto IPFS and get Media IPLD object address

- PuttyImage get the actual address of the LikeCoin ID and ask for a signature of the data

- Puttyimage submit signed IPLD object to Like.co, which will put the record onto blockchain

- User is told upload completed