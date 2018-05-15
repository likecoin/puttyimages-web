# IPLD objects

Following are the example of IPLD object that will be signed and put in IPFS server.

### Creator

Represent a content creator

address: `zdpuAs9eusyqoLxszGD7T84dGWKZ44sykrwnJv24uPcBZjge1`

```
{
    "description": "HK Photographer",
    "email": "bob@banana.com",
    "likeId": "bob1337",
    "likeAddress": "0x4c9d6342f3979755bfb5b7080fc3ffb155d39abb",
    "likeKeybase": "bob",
    "likeUport": "0xe70588a87626882921b68dc398609222dada71ad",
    "name": "Bob",
    "type": "Person"
}
```

### Provider

address: `zdpuAsfvd8y7BBj5QgpKCSy4Edm36pqNMDMozH7Dve7owNEQR`

```
{
    "description": "Global stock image on blockchain",
    "likeAddress": "0xbdc788efe0abc48a5d72fe9d15ac4b2000e0b2da",
    "name": "Banana",
    "type": "Organization",
    "url": "banana.com"
}
```

### Media

Represent a media that ia likable by user

address: `zdpuB32GQjUrmPbWmjPzEj3biUBg6ESaE95svrM6pozyaZ5Bo`

```
{
    "creator": ["bob1337"],
    "escrow": [],
    "dateCreated": "2017-09-07T17:05:38Z",
    "description": "Beautiful sunset in Yangon",
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "likeFingerprint": "0xf71ce651a525fd4e746b6bed8d8e1db4052912d88313a93d076e27540a8ecd4f",
    "likeFootprint": [],
    "likeIpfs": "QmPs3LyZFEuMscttMnkNM2GweTUc2JkdJqWVheF6aEMu7h",
    "likePreviousVersion": null,
    "likeProviderShare": 30,
    "type": "ImageObject",
    "uploadDate": "2017-09-07T17:08:38Z"
}
```