# AirCnC - Code and Coffee
Developed in Omnistack Week from @RocketSeat

## Offer Spots and Devs to have a chance to connect

Imagine if companies that has empty spaces in their workplace would have the change to offer it (putting a price or not)
to other developers, based on which technologies they are interested?

Freelance devs may have a chance to work in other companies and talk about code during coffee time.
Companies may have a chance to understand new uses and discuss product with people that are developing
other products with the same tecnology they use.

In this MVP:
* __Companies__ may access the website and register their __spots__ available,
informing the technologies they are interested. It could be done with a price or not.
* __Devs__ may access the Mobile App and can filter based on technology they're interested. By seaching, the can check all
companies that are using it and book a day to work inside the company.
* __In realtime__, the company will receive a notification if a dev had tried to work in their spot,
and approve or not this booking. 

## Techonologies used:

* __POC__: once the Rest API (that serves both clients) is on, it will be able to connect in realtime the devs using the app and interested
in spots to the user form company in website. In the other end, once new spots are registered, devs will be able to see in realtime, if they keep
the same technologies as filters for spot searching. They can also change the technologies and search for other spots anytime.

* __Techonogies__:
  * __backend__: node.js, express, websocket and mongoose to connect to a MongoDB server.
  * __web frontend__: was builded with ReactJS
  * __mobile app__: was created using React Native + Expo.
