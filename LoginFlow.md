# Login flow

- User click login at puttyimage
JS get the ethereum address from MetaMask and send to puttyimage
puttyimage send login request to Like.co API

```
{address: 0x4c9d… }
```

- Like.co API return a challenge

```
{address: 0x4c9d…, challenge: whateverlikecolike }
```

- Puttyimage record and send challenge
JS/MetaMask sign the challenge and return to puttyimage

```
{address: 0x4c9d…, challenge: whateverlikecolike, signature: signedbytheuser }
```

- Puttyimage verify the signing return to Like.co API

- Like.co API confirm it actually the user approve the signin and return the user infomation

```
{address: 0x4c9d…, likeId: username, email: user@like.co, …}
```

- Puttyimages login the user at puttyimage