# Super Like Flow

- JS will gather the information on the article address and the address of content used in the article and send to Like.co API.

```
{article: 0x123, images: [0x23.., 0x45..], audio: []}
```

- Like.co API return the distribution ratio

```
{distribution: [{ to: 0xd34..., ratio: 0.12}, {to: 0x345, ratio: 0.05 }], minFee: 3}
```

- JS popup for user to set number of LikeCoin to pay

- User confirm and sign a transferMultipleDelegated call data in MetaMask

- Client JS send the details back to like.co API

- Like.co do the actual transactions by calling transferMultipleDeletaged, (TBC on LikeChain or Public Chain)
